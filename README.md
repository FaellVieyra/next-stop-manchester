# Next Stop: Manchester

Percurso pessoal de inglês britânico. Uma história contínua passa por Londres e Manchester e treina principalmente escuta e fala. Site estático, pensado para o GitHub Pages.

## Estrutura

```
index.html            página do site
styles.css            visual (tema claro e escuro)
app.js                lógica: episódios, atividades, progresso
content/manifest.js   lista de episódios
content/assessment.js registro da avaliação inicial
content/epNN/
  source.json         texto do episódio (editável)
  episode.js          gerado a partir do source.json (não editar)
  audio/*.mp3         áudios gerados
tools/build_episode.py  gera áudios e episode.js
tools/make_preview.py   gera a prévia para o claude.ai
```

## Novo episódio

1. Escreva `content/epNN/source.json` seguindo o formato do `ep01`.
2. Gere os áudios: `python3 tools/build_episode.py content/epNN <pasta-dos-modelos>`
   - Requer `pip install kokoro-onnx soundfile` e `ffmpeg`.
   - Os modelos (`kokoro-v1.0.onnx`, `voices-v1.0.bin`) vêm de https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0 e não ficam no repositório.
3. Acrescente o episódio em `content/manifest.js`.

## Privacidade e dados

- **Progresso:** guardado só no `localStorage` do navegador. Não sincroniza entre aparelhos. Use Exportar/Importar em Progresso.
- **Gravações:** ficam na memória da página e somem ao recarregar. Não são enviadas nem exportadas.
- **Reconhecimento de voz:** desligado por padrão. Quando ativado, usa o recurso do navegador, que pode enviar o áudio a um serviço externo (Google no Chrome; Apple ou o próprio aparelho no Safari).
- Nenhuma chave, senha ou token faz parte do código.

## Áudio

Vozes sintéticas do modelo Kokoro-82M, com sotaque britânico padrão. Elas não representam o sotaque de Manchester; para isso, os episódios indicam gravações reais como complemento.
