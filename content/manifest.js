// Lista de episódios disponíveis. Para incluir um novo episódio:
// 1. crie content/epNN/source.json
// 2. rode: python3 tools/build_episode.py content/epNN <pasta-dos-modelos>
// 3. acrescente uma linha abaixo.
window.COURSE = {
  title: "Next Stop: Manchester",
  episodes: [
    { id: "ep01", file: "content/ep01/episode.js" }
  ]
};
