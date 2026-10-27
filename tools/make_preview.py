"""Gera preview/index.html (sem doctype/head) para a prévia como Artifact no claude.ai.
O site publicado no GitHub Pages usa o index.html normal."""
import re
from pathlib import Path
root = Path(__file__).resolve().parent.parent
html = (root / "index.html").read_text(encoding="utf-8")
head = re.search(r"<head>(.*?)</head>", html, re.S).group(1)
body = re.search(r"<body>(.*?)</body>", html, re.S).group(1)
head = re.sub(r'<meta charset[^>]*>\s*|<meta name="viewport"[^>]*>\s*', "", head)
out = root / "preview"; out.mkdir(exist_ok=True)
(out / "index.html").write_text(head.strip() + "\n" + body.strip() + "\n", encoding="utf-8")
print("preview/index.html ok")
