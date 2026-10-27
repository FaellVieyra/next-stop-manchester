"""Gera os áudios (Kokoro) e o arquivo de dados de um episódio.

Uso:
    python3 tools/build_episode.py content/ep01 /caminho/para/modelos

O diretório de modelos precisa conter kokoro-v1.0.onnx e voices-v1.0.bin
(https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0).
Saída: <episódio>/audio/*.mp3 e <episódio>/episode.js
"""
import json
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

CLEAR = {"speed": 0.85, "gap": 0.75}
NATURAL = {"speed": 1.0, "gap": 0.3}
SLOW = 0.8


def to_mp3(samples, sr, dest: Path):
    with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
        sf.write(tmp.name, samples, sr)
        subprocess.run(
            ["ffmpeg", "-loglevel", "error", "-y", "-i", tmp.name,
             "-ac", "1", "-b:a", "80k", str(dest)],
            check=True,
        )
    return round(len(samples) / sr, 2)


def main(ep_dir: str, models: str):
    ep = Path(ep_dir)
    src = json.loads((ep / "source.json").read_text(encoding="utf-8"))
    out = ep / "audio"
    out.mkdir(exist_ok=True)
    k = Kokoro(f"{models}/kokoro-v1.0.onnx", f"{models}/voices-v1.0.bin")
    voices = {c["id"]: c["voice"] for c in src["characters"]}

    def say(text, voice, speed):
        return k.create(text, voice=voice, speed=speed, lang="en-gb")

    audio = {"lines": {}, "dialogue": {}, "prompts": {}, "models": {}, "pron": {}}

    # Diálogo completo nas duas versões, com marcação de tempo por fala.
    for name, cfg in (("clear", CLEAR), ("natural", NATURAL)):
        parts, cues, t, sr = [], [], 0.4, 24000
        parts.append(np.zeros(int(sr * 0.4), dtype=np.float32))
        for line in src["lines"]:
            a, sr = say(line["en"], voices[line["s"]], cfg["speed"])
            dur = len(a) / sr
            cues.append({"line": line["id"], "start": round(t, 2), "end": round(t + dur, 2)})
            parts += [a, np.zeros(int(sr * cfg["gap"]), dtype=a.dtype)]
            t += dur + cfg["gap"]
            if name == "clear":
                d = to_mp3(a, sr, out / f"{line['id']}.mp3")
                audio["lines"][line["id"]] = {"src": f"audio/{line['id']}.mp3", "duration": d}
        d = to_mp3(np.concatenate(parts), sr, out / f"dialogue-{name}.mp3")
        audio["dialogue"][name] = {"src": f"audio/dialogue-{name}.mp3", "duration": d, "cues": cues}

    # Perguntas e respostas-modelo da simulação.
    for p in src["simulation"]["prompts"]:
        a, sr = say(p["en"], voices[p["speaker"]], CLEAR["speed"])
        audio["prompts"][p["id"]] = {"src": f"audio/{p['id']}-q.mp3", "duration": to_mp3(a, sr, out / f"{p['id']}-q.mp3")}
        a, sr = say(p["model"], voices["D"], CLEAR["speed"])
        audio["models"][p["id"]] = {"src": f"audio/{p['id']}-model.mp3", "duration": to_mp3(a, sr, out / f"{p['id']}-model.mp3")}

    # Frases de pronúncia, um pouco mais lentas.
    for p in src["pronunciation"]:
        a, sr = say(p["phrase"], voices["D"], SLOW)
        audio["pron"][p["id"]] = {"src": f"audio/{p['id']}.mp3", "duration": to_mp3(a, sr, out / f"{p['id']}.mp3")}

    # Frases curtas para ouvir, pausar e repetir: clara e mais lenta.
    audio["repeat"] = {}
    for r in src.get("repeat", []):
        a, sr = say(r["en"], voices["D"], CLEAR["speed"])
        b, sr2 = say(r["en"], voices["D"], 0.7)
        audio["repeat"][r["id"]] = {
            "src": f"audio/{r['id']}.mp3", "duration": to_mp3(a, sr, out / f"{r['id']}.mp3"),
            "slow": f"audio/{r['id']}-slow.mp3", "slowDuration": to_mp3(b, sr2, out / f"{r['id']}-slow.mp3"),
        }

    # Frases úteis dos cartões "Na prática".
    audio["practice"] = {}
    for card in src.get("practice", []):
        for ph in card.get("phrases", []):
            a, sr = say(ph["en"], voices[ph.get("voice", "D")], CLEAR["speed"])
            audio["practice"][ph["id"]] = {"src": f"audio/{ph['id']}.mp3", "duration": to_mp3(a, sr, out / f"{ph['id']}.mp3")}

    data = dict(src, base=f"content/{ep.name}/", audio=audio)
    js = (
        "// Gerado por tools/build_episode.py a partir de source.json. Não edite à mão.\n"
        "window.EPISODES = window.EPISODES || {};\n"
        f"window.EPISODES[{json.dumps(src['id'])}] = {json.dumps(data, ensure_ascii=False, indent=1)};\n"
    )
    (ep / "episode.js").write_text(js, encoding="utf-8")
    print(f"ok: {len(audio['lines'])} falas, clara {audio['dialogue']['clear']['duration']}s, "
          f"natural {audio['dialogue']['natural']['duration']}s")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
