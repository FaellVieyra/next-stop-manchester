"""Gera os áudios (Kokoro) e o arquivo de dados do glossário Art Talk.

Uso:
    python3 tools/build_glossary.py /caminho/para/modelos

O diretório de modelos precisa conter kokoro-v1.0.onnx e voices-v1.0.bin
(https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0).
Lê content/glossary/source.json.
Saída: content/glossary/audio/*.mp3 e content/glossary/glossary.js

Para incluir termos: acrescente-os ao source.json e rode de novo.
Termos já gerados com o mesmo texto não são refeitos.
"""
import json
import subprocess
import sys
import tempfile
from pathlib import Path

import soundfile as sf
from kokoro_onnx import Kokoro

WORD_SPEED = 0.8      # palavra isolada, mais lenta
EXAMPLE_SPEED = 0.85  # frase de exemplo, versão clara
ROOT = Path(__file__).resolve().parent.parent
DIR = ROOT / "content" / "glossary"


def to_mp3(samples, sr, dest: Path):
    with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
        sf.write(tmp.name, samples, sr)
        subprocess.run(
            ["ffmpeg", "-loglevel", "error", "-y", "-i", tmp.name,
             "-ac", "1", "-b:a", "80k", str(dest)],
            check=True,
        )
    return round(len(samples) / sr, 2)


def main(models: str):
    src = json.loads((DIR / "source.json").read_text(encoding="utf-8"))
    out = DIR / "audio"
    out.mkdir(exist_ok=True)
    k = Kokoro(f"{models}/kokoro-v1.0.onnx", f"{models}/voices-v1.0.bin")
    voice = src.get("voice", "bm_lewis")

    old = {}
    js = DIR / "glossary.js"
    if js.exists():
        raw = js.read_text(encoding="utf-8")
        old = {t["id"]: t for t in json.loads(raw[raw.index("{"):raw.rindex("}") + 1])["terms"]}

    def clip(text, speed, name, prev):
        dest = out / name
        if prev and prev.get("text") == text and dest.exists():
            return prev
        a, sr = k.create(text, voice=voice, speed=speed, lang="en-gb")
        return {"src": f"audio/{name}", "duration": to_mp3(a, sr, dest), "text": text}

    for t in src["terms"]:
        o = old.get(t["id"], {}).get("audio", {})
        t["audio"] = {
            "word": clip(t["en"], WORD_SPEED, f"{t['id']}-word.mp3", o.get("word")),
            "example": clip(t["example"], EXAMPLE_SPEED, f"{t['id']}-example.mp3", o.get("example")),
        }
        print("ok", t["id"], t["en"])

    src["base"] = "content/glossary/"
    js.write_text(
        "// Gerado por tools/build_glossary.py a partir de source.json. Não editar.\n"
        "window.GLOSSARY = " + json.dumps(src, ensure_ascii=False, indent=1) + ";\n",
        encoding="utf-8",
    )
    print(f"{len(src['terms'])} termos em {js.relative_to(ROOT)}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
