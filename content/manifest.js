// Lista de episódios disponíveis. Para incluir um novo episódio:
// 1. crie content/epNN/source.json
// 2. rode: python3 tools/build_episode.py content/epNN <pasta-dos-modelos>
// 3. rode: python3 tools/build_downloads.py content/epNN  (gera os MP3 para baixar)
// 4. acrescente o episódio abaixo, com a lista de downloads impressa no passo 3.
window.COURSE = {
  title: "Next Stop: Manchester",
  episodes: [
    {
      id: "ep01",
      file: "content/ep01/episode.js",
      downloads: [
        { file: "content/ep01/downloads/ep01-first-morning-dialogo-clara.mp3", label: "Diálogo — versão clara", duration: 60, size: 716144 },
        { file: "content/ep01/downloads/ep01-first-morning-dialogo-natural.mp3", label: "Diálogo — versão natural", duration: 47, size: 568690 },
        { file: "content/ep01/downloads/ep01-first-morning-frases-de-pratica.mp3", label: "Frases de prática (2 vezes cada, com pausa para repetir)", duration: 92, size: 1103218 }
      ]
    }
  ]
};
