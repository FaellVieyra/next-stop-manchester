"""Gera o leitor em português (áudio dos textos de apoio) de um episódio.

Uso:
    python3 tools/build_narration.py content/ep01 /caminho/para/modelos [voz-pt]

Lê "narration" em source.json: cada item é um texto em português, {"en": "..."}
(lido pela voz britânica do Davi) ou {"pause": segundos}.
Saída: <episódio>/audio/narr-<chave>.mp3 e <episódio>/narration.js
Não altera nenhum outro áudio do episódio.
"""
import json
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

SR = 24000


def main(ep_dir, models, voice_pt="pf_dora"):
    ep = Path(ep_dir)
    src = json.loads((ep / "source.json").read_text(encoding="utf-8"))
    voice_en = next(c["voice"] for c in src["characters"] if c["id"] == "D")
    k = Kokoro(f"{models}/kokoro-v1.0.onnx", f"{models}/voices-v1.0.bin")
    out = {}
    for key, items in src.get("narration", {}).items():
        parts = []
        for it in items:
            if isinstance(it, str):
                a, sr = k.create(it, voice=voice_pt, speed=1.0, lang="pt-br")
                parts += [a, np.zeros(int(sr * 0.35), dtype=np.float32)]
            elif "en" in it:
                a, sr = k.create(it["en"], voice=voice_en, speed=0.9, lang="en-gb")
                parts += [np.zeros(int(SR * 0.2), dtype=np.float32), a, np.zeros(int(SR * 0.45), dtype=np.float32)]
            elif "pause" in it:
                parts.append(np.zeros(int(SR * it["pause"]), dtype=np.float32))
        audio = np.concatenate(parts)
        dest = ep / "audio" / f"narr-{key}.mp3"
        with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
            sf.write(tmp.name, audio, SR)
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", tmp.name, "-ac", "1", "-b:a", "64k", str(dest)], check=True)
        out[key] = {"src": f"audio/narr-{key}.mp3", "duration": round(len(audio) / SR, 1), "voice": voice_pt}
        print(key, out[key]["duration"], "s")
    js = ("// Gerado por tools/build_narration.py. Não edite à mão.\n"
          "window.NARRATION = window.NARRATION || {};\n"
          f"window.NARRATION[{json.dumps(src['id'])}] = {json.dumps(out, ensure_ascii=False)};\n")
    (ep / "narration.js").write_text(js, encoding="utf-8")


if __name__ == "__main__":
    main(*sys.argv[1:])
