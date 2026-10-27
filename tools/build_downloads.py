"""Gera os MP3 para baixar de um episódio, a partir dos áudios já gerados.

Uso:
    python3 tools/build_downloads.py content/ep01

Saída em <episódio>/downloads/:
  epNN-<titulo>-dialogo-clara.mp3
  epNN-<titulo>-dialogo-natural.mp3
  epNN-<titulo>-frases-de-pratica.mp3  (cada frase 2 vezes, com pausas para repetir)
E imprime a lista para colar em content/manifest.js.
"""
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path


def run(*args):
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", *args], check=True)


def slug(t):
    return re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")


def tags(title, track):
    return ["-metadata", f"title={title}", "-metadata", "album=Next Stop: Manchester",
            "-metadata", "artist=Next Stop: Manchester", "-metadata", f"track={track}"]


def main(ep_dir):
    ep = Path(ep_dir)
    src = json.loads((ep / "source.json").read_text(encoding="utf-8"))
    out = ep / "downloads"
    out.mkdir(exist_ok=True)
    n = src["number"]
    base = f"ep{n:02d}-{slug(src['title'])}"
    title = f"Ep. {n} {src['title']}"
    files = []

    for i, (ver, label) in enumerate((("clear", "clara"), ("natural", "natural")), 1):
        name = f"{base}-dialogo-{label}.mp3"
        run("-i", str(ep / "audio" / f"dialogue-{ver}.mp3"), "-c:a", "libmp3lame", "-b:a", "96k",
            *tags(f"{title} — diálogo ({label})", i), str(out / name))
        files.append((name, f"Diálogo — versão {label}"))

    # Frases de prática: repetição + frases úteis dos cartões "Na prática".
    clips = [ep / "audio" / f"{r['id']}.mp3" for r in src.get("repeat", [])]
    for card in src.get("practice", []):
        clips += [ep / "audio" / f"{ph['id']}.mp3" for ph in card.get("phrases", [])]
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        run("-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", "2.5", str(tmp / "gap.wav"))
        run("-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", "3.5", str(tmp / "gap2.wav"))
        seq = []
        for k, c in enumerate(clips):
            w = tmp / f"c{k}.wav"
            run("-i", str(c), "-ar", "24000", "-ac", "1", str(w))
            seq += [w, tmp / "gap.wav", w, tmp / "gap2.wav"]
        lst = tmp / "list.txt"
        lst.write_text("".join(f"file '{p}'\n" for p in seq))
        name = f"{base}-frases-de-pratica.mp3"
        run("-f", "concat", "-safe", "0", "-i", str(lst), "-c:a", "libmp3lame", "-b:a", "96k",
            *tags(f"{title} — frases de prática", 3), str(out / name))
        files.append((name, "Frases de prática (cada frase 2 vezes, com pausa para repetir)"))

    entries = []
    for name, label in files:
        p = out / name
        dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)],
                                   capture_output=True, text=True).stdout.strip())
        entries.append({"file": f"content/{ep.name}/downloads/{name}", "label": label,
                        "duration": round(dur), "size": p.stat().st_size})
    print(json.dumps(entries, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main(sys.argv[1])
