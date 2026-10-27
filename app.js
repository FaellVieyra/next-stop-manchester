/* Next Stop: Manchester — plataforma de estudo (v1.1).
   Uma atividade por tela; pode parar e retomar a qualquer momento.
   Sem dependências. O progresso fica em localStorage, neste navegador. */
(function () {
  "use strict";

  const KEY = "nsm.progress.v1";
  const app = document.getElementById("app");
  const EPISODES = () => window.EPISODES || {};
  const ILL = () => window.ILLUSTRATIONS || {};
  const ASSESS = window.ASSESSMENT;

  // ---------- utilidades ----------
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const now = () => new Date().toISOString();
  const fmtDate = (iso) => { try { return new Date(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso + "T12:00:00" : iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }); } catch { return iso; } };
  const fmtTime = (s) => { s = Math.max(0, Math.round(s || 0)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
  const letters = "abcdef";
  const ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5.5v13l11-6.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M4 12a8 8 0 1 0 3-6.2M4 4v4h4"/></svg>',
    mic: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-2.1a7 7 0 0 0 6-6.9z"/></svg>',
    stop: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/></svg>',
  };

  let toastTimer;
  function toast(msg) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 2600);
  }
  async function copyText(text, host) {
    try { await navigator.clipboard.writeText(text); toast("Copiado."); return; } catch (e) { /* modo manual */ }
    if (host) {
      host.innerHTML = `<p class="small muted">Não foi possível copiar automaticamente. Selecione o texto abaixo e copie.</p><textarea readonly id="manual-copy">${esc(text)}</textarea>`;
      const ta = host.querySelector("textarea"); ta.focus(); ta.select();
    }
  }

  // ---------- progresso ----------
  function defaults() { return { audio: "clear", translations: false, speech: false, theme: "light", size: 0, rate: 1 }; }
  function blank() { return { version: 1, created: now(), updated: now(), settings: defaults(), episodes: {} }; }
  let storageOk = true;
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p && p.version === 1) { p.settings = Object.assign(defaults(), p.settings || {}); p.episodes = p.episodes || {}; return p; }
      }
    } catch (e) { storageOk = false; }
    return blank();
  }
  let P = load();
  function save() {
    P.updated = now();
    try { localStorage.setItem(KEY, JSON.stringify(P)); storageOk = true; } catch (e) { storageOk = false; }
  }
  function epState(id) {
    if (!P.episodes[id]) {
      P.episodes[id] = { acts: {}, cur: null, answers: {}, listens: {}, transcriptRevealed: null, expressions: {},
        repeat: {}, productions: {}, difficulty: null, reflection: "", completedAt: null, startedAt: now() };
    }
    return migrate(P.episodes[id]);
  }
  // Converte o progresso da versão em blocos (v1.0) para atividades, sem perder respostas.
  function migrate(st) {
    st.acts = st.acts || {}; st.repeat = st.repeat || {}; st.answers = st.answers || {}; st.listens = st.listens || {};
    st.expressions = st.expressions || {}; st.productions = st.productions || {};
    if (st.blocks && !st.migratedFrom) {
      const map = { antes: ["p1-cena"], escuta1: ["p1-escuta", "p1-situacao"], escuta2: ["p1-detalhes-1", "p1-detalhes-2"],
        texto: ["p1-texto"], expressoes: ["p1-expr-1", "p1-expr-2", "p1-lugar", "p1-costumes"] };
      Object.entries(map).forEach(([b, acts]) => {
        if (st.blocks[b] && st.blocks[b].done) acts.forEach((a) => { st.acts[a] = { done: true, at: st.blocks[b].at, migrated: true }; });
      });
      st.migratedFrom = "blocos-v1.0";
      delete st.open; delete st.mode;
      save();
    }
    return st;
  }

  // ---------- aparência ----------
  function applyLook() {
    const r = document.documentElement;
    r.dataset.theme = P.settings.theme === "dark" ? "dark" : "light";
    r.dataset.size = String(P.settings.size || 0);
    const tb = document.querySelector('[data-look="theme"]');
    if (tb) { tb.textContent = P.settings.theme === "dark" ? "Claro" : "Escuro"; tb.setAttribute("aria-label", P.settings.theme === "dark" ? "Mudar para o tema claro" : "Mudar para o tema escuro"); }
    const sizes = ["normal", "grande", "maior"];
    const sm = document.querySelector('[data-look="smaller"]'), lg = document.querySelector('[data-look="bigger"]');
    if (sm) { sm.disabled = (P.settings.size || 0) === 0; sm.setAttribute("aria-label", "Diminuir letra (atual: " + sizes[P.settings.size || 0] + ")"); }
    if (lg) { lg.disabled = (P.settings.size || 0) === 2; lg.setAttribute("aria-label", "Aumentar letra (atual: " + sizes[P.settings.size || 0] + ")"); }
  }
  document.addEventListener("click", (ev) => {
    const b = ev.target.closest("[data-look]");
    if (!b) return;
    if (b.dataset.look === "theme") P.settings.theme = P.settings.theme === "dark" ? "light" : "dark";
    if (b.dataset.look === "bigger") P.settings.size = Math.min(2, (P.settings.size || 0) + 1);
    if (b.dataset.look === "smaller") P.settings.size = Math.max(0, (P.settings.size || 0) - 1);
    save(); applyLook();
    if (location.hash === "#ajustes") viewSettings();
  });

  // ---------- estrutura do episódio: atividades pequenas ----------
  const PARTS = [
    { n: 1, name: "Compreender", about: "Ouvir a história, entender a situação e conhecer as expressões." },
    { n: 2, name: "Ouvir, pausar e repetir", about: "Frases curtas, com o texto à vista e sem pressa." },
    { n: 3, name: "Responder", about: "Respostas simples suas, com um começo de frase como apoio." },
    { n: 4, name: "Na prática", about: "Cartões opcionais sobre o cotidiano: como agir nas situações da história. Explore quando quiser." },
  ];
  function buildActs(e) {
    const A = [];
    const add = (part, id, name, guide, type, extra = {}) => A.push(Object.assign({ part, id, name, guide, type }, extra));
    add(1, "p1-cena", "A situação", "Leia a situação e conheça os personagens. Ainda não há áudio.", "scene");
    add(1, "p1-escuta", "Primeira escuta", "Leia a pergunta. Depois ouça o diálogo inteiro, sem texto. Pode pausar e ouvir de novo quantas vezes quiser.", "listen");
    add(1, "p1-situacao", "Perguntas sobre a situação", "Duas perguntas gerais, uma por vez. Ouça o diálogo e responda. Pode ouvir de novo quantas vezes quiser.", "gist");
    add(1, "p1-detalhes-1", "Detalhes, parte 1", "Três perguntas, uma por vez. Leia a pergunta, ouça procurando essa informação e responda.", "detail", { qs: e.detail.slice(0, 3) });
    add(1, "p1-detalhes-2", "Detalhes, parte 2", "Mais três perguntas, uma por vez, do mesmo jeito: ler a pergunta, ouvir, responder.", "detail", { qs: e.detail.slice(3) });
    add(1, "p1-texto", "Revisão do diálogo", "Fala por fala: ouça e leia. A tradução e as explicações abrem só quando você quiser, e lá você pode marcar o que foi difícil.", "dialog");
    add(1, "p1-expr-1", "Expressões, parte 1", "Quatro expressões da história. Ouça cada uma e diga como ela está para você.", "expr", { xs: e.expressions.slice(0, 4) });
    add(1, "p1-expr-2", "Expressões, parte 2", "Mais quatro expressões.", "expr", { xs: e.expressions.slice(4) });
    if (e.place) add(1, "p1-lugar", "Lugar real", "Um lugar de verdade que aparece na história.", "place");
    add(1, "p1-costumes", "Costumes", "Duas observações culturais curtas. Leitura opcional.", "culture", { optional: true });

    add(2, "p2-como", "Como vamos repetir", "Ouça, pause e repita. Sem cronômetro: a próxima frase só vem quando você tocar em Próxima atividade.", "howto");
    (e.repeat || []).forEach((r, i) => add(2, "p2-" + r.id, "Frase " + (i + 1), r.focus, "repeat", { r }));
    if (e.pronFocus) add(2, "p2-som", "Um ponto de pronúncia", "Um único ponto de som. Ouça devagar, depois repita.", "pron");
    add(2, "p2-mais", "Mais sons e shadowing", "Para quando quiser ir além. Não é necessário para seguir.", "more", { optional: true });

    const prompts = e.simulation.prompts;
    prompts.forEach((p, i) => {
      if (p.grammar) {
        const g = e.grammar.find((x) => x.id === p.grammar);
        if (g) add(3, "p3-foco-" + p.id, "Foco: " + g.title, "Uma regra curta, só para a próxima resposta.", "grammar", { g, optional: !!p.optional });
      }
      add(3, "p3-" + p.id, (p.optional ? "Resposta extra" : "Resposta " + (i + 1)), "Ouça a Sam. Pense com calma e responda em voz alta usando o começo de frase. Depois escreva o que disse.", "answer", { p, optional: !!p.optional });
    });
    add(3, "p3-retomada", "Retomada", "Um resumo do que você fez e o próximo passo sugerido.", "review");
    (e.practice || []).forEach((c) => add(4, "p4-" + c.id, c.title, `${c.kind} · ${c.city}. Opcional, no seu ritmo.`, "practice", { card: c, optional: true }));
    return A;
  }
  const actsCache = {};
  const actsOf = (e) => actsCache[e.id] || (actsCache[e.id] = buildActs(e));
  const isDone = (st, a) => !!(st.acts[a.id] && st.acts[a.id].done);
  function nextAct(e, st) {
    const acts = actsOf(e);
    return acts.find((a) => !a.optional && !isDone(st, a)) || null;
  }

  // ---------- áudio ----------
  let current = null;
  const recordings = {}; // gravações só em memória
  function stopAll() {
    clearTimeout(loopTimer); loopTimer = null;
    document.querySelectorAll('[data-role="loopinfo"]').forEach((x) => { if (x.dataset.wait) { x.textContent = ""; delete x.dataset.wait; } });
    if (current && current.audio) current.audio.pause();
    document.querySelectorAll(".play-big").forEach((b) => { b.innerHTML = ICON.play; b.setAttribute("aria-label", "Tocar"); });
    current = null;
  }
  // Velocidade: preferência da pessoa, nunca alterada automaticamente nem usada na avaliação.
  const RATES = [0.75, 0.9, 1, 1.1, 1.25];
  const rateLabel = (r) => String(r).replace(".", ",") + "×" + (r === 1 ? " (original)" : "");
  function applyRate(audio, rate) {
    audio.preservesPitch = true; audio.mozPreservesPitch = true; audio.webkitPreservesPitch = true;
    audio.playbackRate = rate; audio.defaultPlaybackRate = rate;
  }
  function rateSelect(id) {
    const r = P.settings.rate || 1;
    return `<label class="rate-pick small" for="${id}">Velocidade
      <select id="${id}" data-action="setrate">${RATES.map((x) => `<option value="${x}" ${x === r ? "selected" : ""}>${rateLabel(x)}</option>`).join("")}</select></label>`;
  }
  const players = new Set();
  // Repetir (escuta livre): não é salvo, não conta na avaliação, desliga com um toque.
  let loopOn = false, loopTimer = null;
  const loopLabel = () => loopOn ? "Repetir: ligado" : "Repetir: desligado";
  // Bloco único de controles para atividades sem o diálogo completo: botões de ouvir + velocidade.
  const audioBox = (buttons, note) => `<div class="player audio-box">${buttons ? `<div class="row">${buttons}</div>` : ""}
      ${note ? `<p class="small muted">${note}</p>` : ""}<div class="row">${rateSelect("rate-act")}</div></div>`;
  const clip = new Audio();
  function playClip(src, onEnd, own) {
    stopAll();
    clip.onended = onEnd || null;
    clip.src = src; clip.currentTime = 0;
    clip.dataset.own = own ? "1" : "";
    applyRate(clip, own ? 1 : (P.settings.rate || 1));
    clip.play().catch(() => toast("Toque de novo para ouvir."));
    current = { audio: clip };
  }
  function playerHTML(key, opts = {}) {
    const ver = P.settings.audio;
    return `<div class="player" data-player="${key}" ${opts.karaoke ? 'data-karaoke="1"' : ""} ${opts.count ? 'data-count="1"' : ""}>
      <div class="player-row">
        <button class="play-big" data-action="pp" aria-label="Tocar">${ICON.play}</button>
        <div class="bar">
          <input type="range" min="0" max="1000" value="0" aria-label="Posição no áudio" data-role="seek">
          <div class="row" style="justify-content:space-between"><span class="time" data-role="time">0:00 / 0:00</span>
          ${opts.count ? `<span class="listens" data-role="listens"></span>` : ""}</div>
        </div>
      </div>
      <div class="row">
        <button class="btn small ghost" data-action="rewind" aria-label="Voltar 5 segundos">${ICON.back} 5 s</button>
        <div class="seg" role="group" aria-label="Versão do áudio">
          <button data-action="ver" data-ver="clear" aria-pressed="${ver === "clear"}">Clara</button>
          <button data-action="ver" data-ver="natural" aria-pressed="${ver === "natural"}">Natural</button>
        </div>
        ${rateSelect("rate-act")}
      </div>
      <div class="row loop-row">
        <button class="btn small ${loopOn ? "primary" : ""}" data-action="loop" aria-pressed="${loopOn}">${loopLabel()}</button>
        <span class="small muted" data-role="loopinfo" aria-live="polite"></span>
      </div>
    </div>`;
  }
  function mountPlayers(root, e, st) {
    players.clear();
    root.querySelectorAll(".player[data-player]").forEach((el) => {
      const audio = new Audio(); audio.preload = "metadata";
      let ver = P.settings.audio;
      const key = el.dataset.player;
      const setSrc = () => { audio.src = e.base + e.audio.dialogue[ver].src; applyRate(audio, P.settings.rate || 1); };
      setSrc();
      players.add(audio);
      const seek = el.querySelector('[data-role="seek"]'), time = el.querySelector('[data-role="time"]');
      const lis = el.querySelector('[data-role="listens"]'), btn = el.querySelector(".play-big");
      const showListens = () => { if (lis) { const n = st.listens[key] || 0; lis.textContent = n === 1 ? "1 escuta" : n + " escutas"; } };
      showListens();
      const update = () => {
        const d = audio.duration || e.audio.dialogue[ver].duration;
        time.textContent = fmtTime(audio.currentTime) + " / " + fmtTime(d);
        if (!seek.matches(":active")) seek.value = d ? Math.round((audio.currentTime / d) * 1000) : 0;
        if (el.dataset.karaoke) {
          const cue = e.audio.dialogue[ver].cues.find((c) => audio.currentTime >= c.start && audio.currentTime < c.end + 0.3);
          document.querySelectorAll(".line.now").forEach((l) => l.classList.remove("now"));
          if (cue && !audio.paused) { const l = document.querySelector(`.line[data-line="${cue.line}"]`); if (l) l.classList.add("now"); }
        }
      };
      audio.addEventListener("timeupdate", update);
      audio.addEventListener("loadedmetadata", update);
      const info = el.querySelector('[data-role="loopinfo"]');
      const showFree = () => { const n = (st.freeListens || {})[key] || 0; if (info && !info.dataset.wait) info.textContent = loopOn ? `Escuta livre: ${n} volta${n === 1 ? "" : "s"}, fora da avaliação.` : ""; };
      showFree();
      audio.addEventListener("play", () => {
        if (el.dataset.looping === "1") { el.dataset.looping = ""; el.dataset.counted = "playing"; return; }
        if (el.dataset.count && audio.currentTime < 0.6 && el.dataset.counted !== "playing") { st.listens[key] = (st.listens[key] || 0) + 1; save(); showListens(); }
        el.dataset.counted = "playing";
      });
      audio.addEventListener("ended", () => {
        el.dataset.counted = "";
        document.querySelectorAll(".line.now").forEach((l) => l.classList.remove("now"));
        if (loopOn) {
          if (info) { info.dataset.wait = "1"; info.textContent = "Pausa de 3 segundos. Recomeça em seguida."; }
          loopTimer = setTimeout(() => {
            loopTimer = null; if (info) delete info.dataset.wait;
            if (!loopOn) { btn.innerHTML = ICON.play; return; }
            st.freeListens = st.freeListens || {}; st.freeListens[key] = (st.freeListens[key] || 0) + 1; save(); showFree();
            el.dataset.looping = "1"; audio.currentTime = 0; applyRate(audio, P.settings.rate || 1); current = { audio };
            audio.play().catch(() => { btn.innerHTML = ICON.play; });
          }, 3000);
          return;
        }
        btn.innerHTML = ICON.play; btn.setAttribute("aria-label", "Tocar");
      });
      el._loop = () => {
        loopOn = !loopOn;
        if (!loopOn) { clearTimeout(loopTimer); loopTimer = null; if (info) delete info.dataset.wait; if (audio.paused) btn.innerHTML = ICON.play; }
        app.querySelectorAll('[data-action="loop"]').forEach((b) => { b.textContent = loopLabel(); b.setAttribute("aria-pressed", String(loopOn)); b.classList.toggle("primary", loopOn); });
        showFree();
        toast(loopOn ? "Repetir ligado: o diálogo recomeça após 3 segundos." : "Repetir desligado.");
      };
      seek.addEventListener("input", () => { const d = audio.duration || 0; if (d) audio.currentTime = (seek.value / 1000) * d; });
      el._toggle = () => {
        if (!audio.paused || loopTimer) { audio.pause(); clearTimeout(loopTimer); loopTimer = null; if (info) { delete info.dataset.wait; showFree(); } btn.innerHTML = ICON.play; btn.setAttribute("aria-label", "Tocar"); return; }
        stopAll(); current = { audio };
        if (audio.ended) { audio.currentTime = 0; el.dataset.counted = ""; }
        audio.play().then(() => { btn.innerHTML = ICON.pause; btn.setAttribute("aria-label", "Pausar"); }).catch(() => toast("Toque de novo para ouvir."));
      };
      el._rewind = () => { audio.currentTime = Math.max(0, audio.currentTime - 5); };
      el._ver = (v) => {
        if (v === ver) return;
        audio.pause(); ver = v; setSrc(); el.dataset.counted = ""; btn.innerHTML = ICON.play;
        el.querySelectorAll('[data-action="ver"]').forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.ver === v)));
        update();
      };
    });
  }

  // ---------- gravação (só no aparelho) ----------
  let rec = null;
  const canRecord = () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  async function toggleRecord(key, btn, host) {
    if (rec && rec.key === key) { rec.mr.stop(); return; }
    if (rec) rec.mr.stop();
    if (!canRecord()) { recUnavailable(host); return; }
    stopAll();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream); const chunks = [];
      mr.ondataavailable = (ev) => { if (ev.data.size) chunks.push(ev.data); };
      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        if (recordings[key]) URL.revokeObjectURL(recordings[key]);
        recordings[key] = URL.createObjectURL(new Blob(chunks, { type: mr.mimeType || "audio/webm" }));
        clearTimeout(rec && rec.timer); rec = null;
        btn.innerHTML = ICON.mic + " Gravar de novo";
        host.querySelectorAll('[data-action="mine"],[data-action="compare"]').forEach((b) => { b.disabled = false; });
      };
      mr.start();
      rec = { key, mr, timer: setTimeout(() => { if (mr.state === "recording") mr.stop(); }, 90000) };
      btn.innerHTML = ICON.stop + " Parar gravação";
    } catch (err) { recUnavailable(host); }
  }
  function recUnavailable(host) {
    const box = host.querySelector('[data-role="recmsg"]');
    if (box) { box.hidden = false; box.textContent = "A gravação não está disponível aqui. Na prévia aberta dentro do Claude o microfone é bloqueado; na versão publicada no GitHub Pages o navegador pede permissão. Por enquanto, use o gravador do celular."; }
  }
  function recBox(key, modelSrc) {
    const has = !!recordings[key];
    return `<details><summary>Gravar para comparar (opcional)</summary><div class="stack">
      <div class="row">
        <button class="btn small" data-action="rec" data-key="${key}">${ICON.mic} ${has ? "Gravar de novo" : "Gravar"}</button>
        <button class="btn small" data-action="mine" data-key="${key}" ${has ? "" : "disabled"}>Ouvir minha gravação</button>
        ${modelSrc ? `<button class="btn small" data-action="compare" data-key="${key}" data-src="${modelSrc}" ${has ? "" : "disabled"}>Modelo, depois a minha</button>` : ""}
      </div>
      <p class="small muted" data-role="recmsg" hidden></p>
      <p class="small muted">A gravação fica só neste aparelho e some quando você recarrega a página.</p></div></details>`;
  }

  // ---------- reconhecimento de voz (opcional) ----------
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function dictate(target) {
    if (!SR) { toast("Este navegador não oferece reconhecimento de voz."); return; }
    const r = new SR(); r.lang = "en-GB"; r.interimResults = false; r.maxAlternatives = 1;
    r.onresult = (ev) => {
      const t = Array.from(ev.results).map((x) => x[0].transcript).join(" ");
      target.value = (target.value ? target.value.trim() + " " : "") + t;
      target.dispatchEvent(new Event("input", { bubbles: true }));
      toast("Texto reconhecido. Confira se é o que você quis dizer.");
    };
    r.onerror = () => toast("O reconhecimento não funcionou desta vez.");
    try { r.start(); toast("Pode falar."); } catch (e) { toast("O reconhecimento não funcionou desta vez."); }
  }

  // ---------- perguntas ----------
  function qHTML(e, st, q) {
    const a = st.answers[q.id];
    const answered = a && a.last != null;
    const right = answered && a.last === q.answer;
    const opts = q.options.map((o, i) => {
      let cls = "";
      if (answered && i === a.last) cls = right ? "right" : "wrong";
      return `<button class="opt ${cls}" data-action="answer" data-q="${q.id}" data-i="${i}" ${right ? "disabled" : ""}><span class="key">${letters[i]})</span><span>${esc(o)}</span></button>`;
    }).join("");
    let fb = "";
    if (answered) {
      fb = right ? `<span class="chip ok">Certo${a.first === q.answer ? " na primeira" : ""}</span>` : `<span class="chip bad">Ainda não</span><span>Ouça o trecho e tente outra opção.</span>`;
      fb += ` <button class="btn small ghost" data-action="clip" data-line="${q.line}">${ICON.play} Ouvir o trecho</button>`;
      if (a.lineShown) fb += `<span class="small">“${esc(e.lines.find((l) => l.id === q.line).en)}”</span>`;
      else fb += ` <button class="btn small ghost" data-action="showline" data-q="${q.id}">Mostrar a fala</button>`;
    }
    return `<div class="q" data-qbox="${q.id}"><p class="q-text">${esc(q.q)}</p><div class="opts">${opts}</div><div class="q-fb">${fb}</div></div>`;
  }
  function firstScore(st, qs) {
    const done = qs.filter((q) => st.answers[q.id]);
    const right = done.filter((q) => st.answers[q.id].first === q.answer);
    return { done: done.length, total: qs.length, right: right.length, helped: right.filter((q) => st.answers[q.id].hintBefore).length };
  }
  const allQs = (e) => [e.prelisten, ...e.gist, ...e.detail];
  const helpOpen = {}; // só nesta visita
  const qList = (e, a) => a.type === "listen" ? [e.prelisten] : a.type === "gist" ? e.gist : a.qs;
  // Uma pergunta por vez, com navegação interna e ajuda ("Não entendi ainda").
  function qFlow(e, st, a) {
    const qs = qList(e, a);
    st.qIdx = st.qIdx || {}; st.hints = st.hints || {};
    const i = Math.min(Math.max(st.qIdx[a.id] || 0, 0), qs.length - 1), q = qs[i];
    const ans = st.answers[q.id], hint = st.hints[q.id], open = helpOpen[q.id] || !!hint;
    const help = q.hint ? `<div class="help">
        <button class="btn small ghost" data-action="helpopen" data-q="${q.id}" aria-expanded="${open}">Não entendi ainda</button>
        <div class="help-panel" ${open ? "" : "hidden"}>
          <div class="row"><button class="btn small" data-action="replayq" data-q="${q.id}" data-line="${q.line}">${ICON.play} Ouvir o trecho de novo</button>
          ${hint ? "" : `<button class="btn small" data-action="hint" data-q="${q.id}">Ver uma pista</button>`}</div>
          ${hint ? `<p class="note small"><b>Pista:</b> ${esc(q.hint)}</p>` : `<p class="small muted">Se usar a pista antes de responder, a resposta fica registrada como “com pista”.</p>`}
        </div></div>` : "";
    const nav = qs.length > 1 ? `<div class="row qnav">
        ${i > 0 ? `<button class="btn small ghost" data-action="qgo" data-act="${a.id}" data-i="${i - 1}">← Pergunta anterior</button>` : ""}
        ${i < qs.length - 1 ? `<button class="btn small ${ans ? "primary" : ""}" data-action="qgo" data-act="${a.id}" data-i="${i + 1}">Próxima pergunta →</button>` : `<span class="small muted">Última pergunta. Para seguir, use “Próxima atividade”.</span>`}
      </div>` : "";
    return `<div class="qflow" data-qflow="${a.id}">
      ${qs.length > 1 ? `<p class="eyebrow">Pergunta ${i + 1} de ${qs.length}</p>` : ""}
      ${qHTML(e, st, q)}${help}${nav}</div>`;
  }
  function pendingText(e, st, a) {
    const n = qList(e, a).filter((q) => !st.answers[q.id]).length;
    if (!n) return "Todas as perguntas desta atividade foram respondidas.";
    return `Ainda há ${n} pergunta${n > 1 ? "s" : ""} sem resposta nesta atividade. Você pode seguir assim mesmo e voltar depois.`;
  }
  function rerenderFlow(e, st) {
    const box = app.querySelector("[data-qflow]"); if (!box) return;
    const a = actsOf(e).find((x) => x.id === box.dataset.qflow);
    const tmp = document.createElement("div"); tmp.innerHTML = qFlow(e, st, a); box.replaceWith(tmp.firstElementChild);
    const pend = app.querySelector('[data-role="pending"]'); if (pend) pend.textContent = pendingText(e, st, a);
  }
  // Pontuação legível: separa pendentes de erradas; nada respondido = "Ainda não respondido".
  function scoreText(s) {
    if (!s.done) return "Ainda não respondido";
    const wrong = s.done - s.right, pend = s.total - s.done;
    const free = s.right - (s.helped || 0);
    const parts = [`${free} certa${free === 1 ? "" : "s"} sem apoio`];
    if (s.helped) parts.push(`${s.helped} certa${s.helped === 1 ? "" : "s"} com pista`);
    parts.push(`${wrong} errada${wrong === 1 ? "" : "s"}`);
    if (pend) parts.push(`${pend} pendente${pend === 1 ? "" : "s"}`);
    return parts.join(", ") + " (primeira tentativa)";
  }

  // ---------- conteúdo de cada tipo de atividade ----------
  function stressMark(s) { return esc(s).replace(/([A-ZÁÉÍÓÚ]{2,})/g, "<mark>$1</mark>"); }
  function lineHTML(e, l, tr) {
    const who = e.characters.find((c) => c.id === l.s).name;
    return `<div class="line" data-line="${l.id}"><span class="who">${esc(who)}</span>
      <div class="txt"><p>${esc(l.en)}</p>${tr ? `<p class="tr">${esc(l.pt)}</p>` : ""}</div>
      <button class="icon-btn" data-action="clip" data-line="${l.id}" aria-label="Ouvir esta fala">${ICON.play}</button></div>`;
  }
  function person(id, name, about) {
    return `<div class="person">${ILL()[id] || ""}<div><b>${esc(name)}</b><br><span class="small muted">${esc(about)}</span></div></div>`;
  }
  const rateGroup = (field, id, val, opts) => `<div class="rate" role="group">${opts.map(([v, t]) => `<button data-action="rate" data-field="${field}" data-id="${id}" data-v="${v}" aria-pressed="${val === v}">${t}</button>`).join("")}</div>`;

  // ---------- revisão do diálogo: tradução, explicações e marcações ----------
  const MARK_TYPES = [["significado", "Não entendi o significado"], ["escuta", "Não reconheci ao ouvir"], ["pronuncia", "Tive dificuldade para pronunciar"], ["uso", "Não consegui usar numa resposta"]];
  const trVisible = new Set(), dlgOpen = new Set(), allWords = new Set(); const dlgSel = {};
  const markKey = (lineId, term) => lineId + "|" + term;
  const wordsOf = (l) => [...new Set(l.en.split(/\s+/).map((w) => w.replace(/^[^A-Za-z']+|[^A-Za-z']+$/g, "")).filter(Boolean))];
  function lineMarks(st, lineId) { return Object.values(st.marks || {}).filter((m) => m.line === lineId && MARK_TYPES.some(([k]) => m.types && m.types[k])); }
  function dlgLine(e, st, l) {
    const who = e.characters.find((c) => c.id === l.s).name;
    const d = (st.dlg || {})[l.id] || {}, show = trVisible.has(l.id), open = dlgOpen.has(l.id), n = lineMarks(st, l.id).length;
    return `<div class="line dline" data-line="${l.id}"><span class="who">${esc(who)}</span>
      <div class="txt"><p class="en">${esc(l.en)}</p>${show ? `<p class="tr">${esc(l.pt)}</p>` : ""}
        <div class="row line-actions">
          <button class="btn small" data-action="clip" data-line="${l.id}">${ICON.play} Ouvir</button>
          <button class="btn small ghost" data-action="trline" data-line="${l.id}">${show ? "Esconder tradução" : "Tradução"}</button>
          <button class="btn small ghost" data-action="explain" data-line="${l.id}" aria-expanded="${open}">Explicar e marcar${n ? ` · ${n} marcada${n > 1 ? "s" : ""}` : ""}</button>
        </div>
        ${open ? explainPanel(e, st, l, d) : ""}
      </div></div>`;
  }
  function explainPanel(e, st, l, d) {
    const notes = (e.notes || {})[l.id] || [];
    const extra = Object.values(st.marks || {}).filter((m) => m.line === l.id).map((m) => m.term);
    const terms = [...new Set([...notes.map((x) => x.term), ...extra, ...(allWords.has(l.id) ? wordsOf(l) : [])])];
    const sel = dlgSel[l.id];
    const m = sel ? (st.marks || {})[markKey(l.id, sel)] : null;
    return `<div class="explain">
      <label class="check small"><input type="checkbox" id="heard-${l.id}" data-action="heard" data-line="${l.id}" ${d.heard ? "checked" : ""}> <span>Já tinha entendido esta fala só ouvindo</span></label>
      ${notes.length ? `<div class="stack">${notes.map((x) => `<p class="small"><b>${esc(x.term)}</b> · ${esc(x.explain)}</p>`).join("")}</div>` : ""}
      <p class="small"><b>Marcar uma dificuldade.</b> Toque na palavra ou expressão:</p>
      <div class="chips">${terms.map((t) => { const mk = (st.marks || {})[markKey(l.id, t)]; const on = mk && MARK_TYPES.some(([k]) => mk.types[k]);
        return `<button class="chip-btn ${on ? "marked" : ""} ${sel === t ? "sel" : ""}" data-action="termsel" data-line="${l.id}" data-term="${esc(t)}">${esc(t)}</button>`; }).join("")}</div>
      <div class="row">${allWords.has(l.id) ? "" : `<button class="btn small ghost" data-action="allwords" data-line="${l.id}">Ver todas as palavras</button>`}
        <input type="text" id="other-${l.id}" class="other" placeholder="Outra palavra" aria-label="Outra palavra ou expressão">
        <button class="btn small ghost" data-action="addterm" data-line="${l.id}">Marcar esta</button></div>
      ${sel ? `<div class="mark-panel"><p class="small"><b>${esc(sel)}</b>: marque uma ou mais opções.</p>
        ${MARK_TYPES.map(([k, t]) => `<label class="check small"><input type="checkbox" id="mk-${l.id}-${k}" data-action="marktype" data-line="${l.id}" data-type="${k}" ${m && m.types[k] ? "checked" : ""}> <span>${t}</span></label>`).join("")}</div>` : ""}
    </div>`;
  }
  function rerenderLine(e, st, id) {
    const row = app.querySelector(`.dline[data-line="${id}"]`); if (!row) return;
    const tmp = document.createElement("div"); tmp.innerHTML = dlgLine(e, st, e.lines.find((x) => x.id === id)); row.replaceWith(tmp.firstElementChild);
  }
  function dlgStats(e, st) {
    const d = st.dlg || {}, ids = e.lines.map((l) => l.id);
    return { total: ids.length, heard: ids.filter((i) => d[i] && d[i].heard).length, tr: ids.filter((i) => d[i] && d[i].tr).length, ex: ids.filter((i) => d[i] && d[i].ex).length };
  }
  function marksList(e, st) {
    return Object.values(st.marks || {}).filter((m) => MARK_TYPES.some(([k]) => m.types[k]))
      .map((m) => ({ term: m.term, line: m.line, en: (e.lines.find((l) => l.id === m.line) || {}).en || "", types: MARK_TYPES.filter(([k]) => m.types[k]).map(([, t]) => t) }));
  }

  const R = {
    scene(e) {
      return `<figure class="figure">${ILL().kitchen || ""}</figure>
        <p>${esc(e.setting)}</p>
        <div class="cast">${e.characters.map((c) => person(c.id === "S" ? "sam" : "davi", c.name, c.about)).join("")}</div>`;
    },
    listen(e, st, a) {
      return `${playerHTML("escuta1", { count: true })}
        <div class="note"><b>Pergunta para guiar a escuta.</b> ${esc(e.prelisten.q.replace(/^Antes de ouvir: /, ""))}</div>
        <p class="small muted">Quando terminar de ouvir, responda:</p>
        ${qFlow(e, st, a)}`;
    },
    gist(e, st, a) {
      return `${playerHTML("escuta1", { count: true })}${qFlow(e, st, a)}`;
    },
    detail(e, st, a) {
      return `${playerHTML("escuta2", { count: true })}${qFlow(e, st, a)}`;
    },
    dialog(e, st) {
      const all = e.lines.every((l) => trVisible.has(l.id));
      return `${playerHTML("texto", { karaoke: true })}
        <div class="row"><button class="btn small" data-action="trall">${all ? "Esconder toda a tradução" : "Mostrar toda a tradução"}</button></div>
        <div class="script">${e.lines.map((l) => dlgLine(e, st, l)).join("")}</div>
        <p class="small muted">Abrir a tradução ou a explicação faz parte do aprendizado. O registro só separa o que você entendeu ouvindo do que entendeu com apoio do texto.</p>`;
    },
    practice(e, st, a) {
      const c = a.card;
      const img = c.image ? `<figure class="figure">
          <img src="${esc(c.image.img)}" alt="${esc(c.image.alt)}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false">
          <div class="photo-fallback" hidden><span class="small muted">A foto não pode ser exibida nesta prévia. No site publicado ela aparece aqui.</span><a href="${esc(c.image.page)}" target="_blank" rel="noopener">Ver a foto</a></div>
          <figcaption>${esc(c.image.credit)}. Licença <a href="${esc(c.image.licenseUrl)}" target="_blank" rel="noopener">${esc(c.image.license)}</a>.${c.image.note ? " " + esc(c.image.note) : ""}</figcaption></figure>`
        : c.illustration && ILL()[c.illustration] ? `<figure class="figure">${ILL()[c.illustration]}</figure>` : "";
      return `${audioBox("", "Cada frase útil tem o seu botão de ouvir.")}
        ${img}<p>${esc(c.intro)}</p>
        <div class="stack"><h3>Como agir</h3><ol class="steps-list">${c.steps.map((x) => `<li><p>${esc(x)}</p></li>`).join("")}</ol></div>
        <div class="stack"><h3>Frases úteis</h3>${c.phrases.map((ph) => `<div class="phrase-row">
            <button class="icon-btn" data-action="say" data-noturn="1" data-src="${e.audio.practice[ph.id].src}" aria-label="Ouvir">${ICON.play}</button>
            <div><p><b>${esc(ph.en)}</b></p><p class="small muted">${esc(ph.pt)}</p></div></div>`).join("")}</div>
        ${c.manchester ? `<div class="note"><b>Em Manchester:</b> ${esc(c.manchester)}</div>` : ""}
        <div class="stack"><p class="small muted">Fontes, consultadas em ${esc(c.sources[0].checked)}. Regras e preços mudam: confira antes de viajar.</p>
          <ul class="small">${c.sources.map((x) => `<li><a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.title)}</a></li>`).join("")}</ul></div>`;
    },
    expr(e, st, a) {
      const opts = [["nao", "Ainda não reconheço"], ["reconheco", "Reconheço"], ["usar", "Acho que consigo usar"]];
      return `${audioBox("", "Toque no botão de cada expressão para ouvir o trecho da história.")}<div class="cards">${a.xs.map((x) => `<div class="card">
          <div class="row" style="justify-content:space-between;flex-wrap:nowrap"><span class="en">${esc(x.en)}</span>
          <button class="icon-btn" data-action="clip" data-line="${x.line}" aria-label="Ouvir na história">${ICON.play}</button></div>
          <span class="pt">${esc(x.pt)}</span><p class="small">${esc(x.use)}</p>
          ${rateGroup("expressions", x.id, st.expressions[x.id], opts)}</div>`).join("")}</div>
        <p class="small muted">É a sua percepção. “Consigo usar” só vira uso verificado depois de respostas revisadas em dois contextos.</p>`;
    },
    place(e) {
      const p = e.place, tube = e.culture.find((c) => c.title === "The Tube");
      return `<figure class="figure">
          <img src="${esc(p.img)}" alt="${esc(p.alt)}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false">
          <div class="photo-fallback" hidden><b>${esc(p.title)}</b><span class="small muted">A foto não pode ser exibida nesta prévia. No site publicado ela aparece aqui.</span><a href="${esc(p.page)}" target="_blank" rel="noopener">Ver a foto no Geograph</a></div>
          <figcaption>${esc(p.credit)}. Licença <a href="${esc(p.licenseUrl)}" target="_blank" rel="noopener">${esc(p.license)}</a>. <a href="${esc(p.page)}" target="_blank" rel="noopener">Página da foto</a>.</figcaption>
        </figure>
        <h3>${esc(p.title)}</h3><p>${esc(p.caption)}</p>
        ${tube ? `<p>${esc(tube.body)}</p>` : ""}
        <p class="small muted">Fonte do trajeto: <a href="${esc(e.sources[0].url)}" target="_blank" rel="noopener">${esc(e.sources[0].title)}</a></p>`;
    },
    culture(e) {
      return e.culture.filter((c) => c.title !== "The Tube").map((c) => `<div class="stack"><h3>${esc(c.title)}</h3><p>${esc(c.body)}</p></div>`).join("");
    },
    howto() {
      return `<ol class="steps-list">
          <li><p><b>Ouça a frase.</b> O texto fica à vista o tempo todo.</p></li>
          <li><p><b>O áudio para sozinho.</b> Não há cronômetro.</p></li>
          <li><p><b>Repita em voz alta</b> quando estiver pronto. Pode ouvir de novo e repetir quantas vezes quiser.</p></li>
          <li><p><b>Diga como foi</b> e toque em Continuar para a próxima frase.</p></li>
        </ol>
        <div class="note">Nesta parte, o foco é só dizer a frase inteira. Pronúncia fica para outra atividade, um ponto de cada vez.</div>`;
    },
    repeat(e, st, a) {
      const r = a.r, au = e.audio.repeat[r.id], tr = P.settings.translations;
      return `${audioBox(`<button class="btn primary" data-action="say" data-src="${au.src}">${ICON.play} Ouvir</button>
          <button class="btn" data-action="say" data-src="${au.slow}">Ouvir devagar</button>
          <button class="btn ghost small" data-action="clip" data-line="${r.line}">Na história</button>`)}
        <div class="stack"><p class="phrase" data-role="phrase">${esc(r.en)}</p>
          <p class="phrase-pt" ${tr ? "" : "hidden"} data-role="pt">${esc(r.pt)}</p></div>
        <p class="note" data-role="yourturn" hidden>Agora repita em voz alta, no seu tempo. Pode ouvir de novo.</p>
        <div class="row">
          <button class="btn small ghost" data-action="togglept">${tr ? "Esconder tradução" : "Ver tradução"}</button>
          <button class="btn small ghost" data-action="hidephrase">Tentar sem olhar (opcional)</button>
        </div>
        ${recBox("rep-" + r.id, au.src)}
        <div class="stack"><p class="small"><b>Como foi?</b></p>
        ${rateGroup("repeat", r.id, st.repeat[r.id], [["ok", "Consegui dizer"], ["dificil", "Ainda difícil"]])}</div>`;
    },
    pron(e, st) {
      const p = e.pronunciation.find((x) => x.id === e.pronFocus);
      return `${audioBox(`<button class="btn primary" data-action="say" data-src="${e.audio.pron[p.id].src}">${ICON.play} Ouvir devagar</button>
          <button class="btn ghost" data-action="clip" data-line="${p.line}">Na história</button>`)}
        <div class="stack"><p class="phrase">${esc(p.phrase)}</p><p class="sounds">${stressMark(p.sounds)}</p></div>
        <p>${esc(p.tip)}</p>
        <p class="note" data-role="yourturn" hidden>Repita prestando atenção só neste ponto. O resto pode sair como sair.</p>
        ${recBox("pron-" + p.id, e.audio.pron[p.id].src)}
        ${rateGroup("repeat", "pron-" + p.id, st.repeat["pron-" + p.id], [["ok", "Consegui"], ["dificil", "Ainda difícil"]])}`;
    },
    more(e) {
      const others = e.pronunciation.filter((x) => x.id !== e.pronFocus);
      return `${audioBox("", "Cada item abaixo tem o seu botão de ouvir.")}<details><summary>Outros pontos de pronúncia</summary><div class="stack-lg">${others.map((p) => `<div class="stack">
          <b>${esc(p.phrase)}</b><span class="sounds">${stressMark(p.sounds)}</span><p class="small">${esc(p.tip)}</p>
          <div class="row"><button class="btn small" data-action="say" data-noturn="1" data-src="${e.audio.pron[p.id].src}">${ICON.play} Devagar</button>
          <button class="btn small ghost" data-action="clip" data-line="${p.line}">Na história</button></div></div>`).join("")}</div></details>
        <details><summary>Shadowing: falar junto com o áudio</summary><div class="stack">
          <p class="small">Toque em ouvir e fale ao mesmo tempo que a voz, olhando o texto, em voz baixa. Quando ficar confortável, tente meio segundo atrás da voz, sem olhar. Se travar, volte para ouvir, pausar e repetir.</p>
          ${e.shadowing.lines.map((id) => { const l = e.lines.find((x) => x.id === id); return `<div class="row" style="justify-content:space-between;flex-wrap:nowrap"><span>${esc(l.en)}</span><button class="icon-btn" data-action="clip" data-line="${id}" aria-label="Ouvir">${ICON.play}</button></div>`; }).join("")}
        </div></details>`;
    },
    grammar(e, st, a) {
      const g = a.g;
      return `<p>${esc(g.body)}</p>
        <div class="table-wrap"><table><tbody>${g.examples.map((r) => `<tr>${r.filter((c) => c !== "").map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
        <div class="note">${esc(g.note)}</div>`;
    },
    answer(e, st, a) {
      const p = a.p, pr = st.productions[p.id] || {}, saved = !!pr.savedAt, tr = P.settings.translations;
      const speech = P.settings.speech && SR;
      return `${audioBox(`<button class="btn primary" data-action="say" data-noturn="1" data-src="${e.audio.prompts[p.id].src}">${ICON.play} Ouvir a Sam</button>`)}
        <div class="speaker">${ILL().sam || ""}<div class="stack">
          <p><b>Sam:</b> ${esc(p.en)}</p>
          <p class="small muted" data-role="qpt" ${tr ? "" : "hidden"}>${esc(p.pt)}</p>
          <div class="row"><button class="btn small ghost" data-action="qpt">${tr ? "Esconder tradução" : "Ver tradução"}</button></div></div></div>
        <div class="stack"><p class="small"><b>Foco desta resposta:</b> ${esc(p.focus)}.</p>
          <p class="starter">${esc(p.starter)}</p>
          <p class="small muted">Complete o começo de frase com as suas informações. Diga em voz alta quantas vezes quiser, sem pressa.</p></div>
        <div class="stack"><label class="small" for="ans-${p.id}"><b>Escreva o que você disse</b>, do jeito que saiu:</label>
          <textarea id="ans-${p.id}" data-action="answertext" data-p="${p.id}" placeholder="${esc(p.starter)}">${esc(pr.draft ?? pr.text ?? "")}</textarea>
          <div class="row"><button class="btn" data-action="saveprod" data-p="${p.id}">${saved ? "Atualizar resposta" : "Salvar resposta"}</button>
          ${speech ? `<button class="btn small ghost" data-action="dictate" data-p="${p.id}">${ICON.mic} Reconhecer fala (serviço externo)</button>` : ""}</div></div>
        ${recBox("sim-" + p.id, e.audio.models[p.id].src)}
        <div data-role="model" ${saved || pr.modelSeen ? "" : "hidden"}>${modelHTML(e, p, pr)}</div>
        ${saved || pr.modelSeen ? "" : `<button class="btn small ghost" data-action="model" data-p="${p.id}">Ver o exemplo sem responder</button>`}
        <div data-role="copyhost"></div>`;
    },
    review(e, st) {
      return `<div class="stack"><h3>Seu registro neste episódio</h3>${summaryTable(e, st)}</div>
        <div class="stack"><h3>Como foi para você?</h3>
          <div class="seg" role="group" aria-label="Dificuldade de 1 a 5">${[1, 2, 3, 4, 5].map((n) => `<button data-action="diff" data-v="${n}" aria-pressed="${st.difficulty === n}">${n}</button>`).join("")}</div>
          <p class="small muted">1 = muito fácil, 5 = muito difícil.</p>
          <label for="reflection" class="small">O que ficou difícil ou precisa de reforço?</label>
          <textarea id="reflection" data-action="reflection" placeholder="Ex.: os números no áudio; dizer a frase do rio inteira">${esc(st.reflection)}</textarea></div>
        <div class="stack"><h3>Próximo passo sugerido</h3><ul>${recommend(e, st).map((r) => `<li>${r}</li>`).join("")}</ul></div>
        <div class="row"><button class="btn" data-action="copysummary">Copiar resumo para o Claude</button>
          <button class="btn ghost" data-action="complete">${st.completedAt ? "Episódio concluído em " + fmtDate(st.completedAt) : "Marcar episódio como concluído"}</button></div>
        <div data-role="copyhost"></div>
        <p class="small muted">Concluir registra que você fez as atividades. Não marca domínio: isso depende da compreensão e das respostas revisadas.</p>`;
    },
  };
  function modelHTML(e, p, pr) {
    const fc = p.focusCheck ?? 0;
    return `<div class="model"><p class="eyebrow">Exemplo de resposta</p><p>${esc(p.model)}</p>
      <div class="row"><button class="btn small" data-action="say" data-noturn="1" data-src="${e.audio.models[p.id].src}">${ICON.play} Ouvir o exemplo</button></div>
      <p class="small muted">O exemplo usa informações genéricas: mostra a forma, não o que você deveria ter dito.</p>
      <label class="check"><input type="checkbox" id="ck-${p.id}" data-action="check" data-p="${p.id}" data-j="${fc}" ${(pr.checklist || [])[fc] ? "checked" : ""}> <span>${esc(p.checklist[fc])}</span></label>
      <div class="row"><button class="btn small" data-action="copyprod" data-p="${p.id}">Copiar para revisão do Claude</button></div></div>`;
  }

  // ---------- registros e recomendação ----------
  function records(e, st) {
    const acts = actsOf(e).filter((a) => !a.optional);
    const actsDone = acts.filter((a) => isDone(st, a)).length;
    const g = firstScore(st, e.gist), d = firstScore(st, e.detail);
    const beforeText = e.detail.filter((q) => st.answers[q.id] && st.answers[q.id].beforeTranscript).length;
    const prods = e.simulation.prompts.map((p) => ({ p, pr: st.productions[p.id] || {} }));
    return { actsDone, actsTotal: acts.length, g, d, beforeText, rated: Object.values(st.expressions), prods };
  }
  const prodState = (pr) => !pr.savedAt ? "sem resposta" : (!pr.review || pr.review.status === "pendente") ? "aguardando revisão" : pr.review.status === "adequada" ? "revisada: adequada" : "revisada: com ajustes";
  function prodChip(pr) {
    const s = prodState(pr);
    const cls = s === "sem resposta" ? "" : s === "aguardando revisão" ? "warn" : s === "revisada: adequada" ? "ok" : "info";
    return `<span class="chip ${cls}">${s[0].toUpperCase() + s.slice(1)}</span>`;
  }
  function summaryTable(e, st) {
    const r = records(e, st);
    const cnt = (v) => r.rated.filter((x) => x === v).length;
    const rep = Object.values(st.repeat || {});
    return `<div class="table-wrap"><table><thead><tr><th>Registro</th><th>Situação</th></tr></thead><tbody>
      <tr><td>Atividade concluída</td><td>${r.actsDone} de ${r.actsTotal} atividades${st.completedAt ? " · episódio concluído" : ""}</td></tr>
      <tr><td>Compreensão</td><td>Situação: ${scoreText(r.g)} · detalhes: ${scoreText(r.d)} · escutas ${st.listens.escuta1 || 0} + ${st.listens.escuta2 || 0}${r.d.done ? ` · ${r.beforeText} de ${r.d.done} antes de ver o texto` : ""}</td></tr>
      <tr><td>Revisão do diálogo</td><td>${(() => { const d = dlgStats(e, st); return `${d.heard} de ${d.total} falas entendidas só ouvindo (marcado por você) · tradução aberta em ${d.tr} · explicação aberta em ${d.ex}`; })()}</td></tr>
      <tr><td>Marcações</td><td>${marksList(e, st).map((m) => `<b>${esc(m.term)}</b>: ${m.types.join(", ").toLowerCase()}`).join("<br>") || "Nenhuma ainda"}</td></tr>
      <tr><td>Sua autoavaliação</td><td>Dificuldade: ${st.difficulty || "não informada"} · expressões: ${cnt("usar")} “consigo usar”, ${cnt("reconheco")} “reconheço”, ${cnt("nao")} “ainda não” · repetição: ${rep.filter((v) => v === "ok").length} “consegui”, ${rep.filter((v) => v === "dificil").length} “ainda difícil”</td></tr>
      <tr><td>Produção revisada</td><td>${r.prods.map(({ p, pr }) => `${p.optional ? "Extra" : "Resposta"} (${esc(p.focus)}): ${prodState(pr)}`).join("<br>")}<br><span class="muted small">Pronúncia: não verificada.</span></td></tr>
      </tbody></table></div>`;
  }
  function recommend(e, st) {
    const out = [];
    const d = firstScore(st, e.detail), g = firstScore(st, e.gist);
    const beforeAll = e.detail.every((q) => st.answers[q.id] && st.answers[q.id].beforeTranscript);
    if (!g.done && !d.done) out.push("Comece pela primeira escuta. As respostas de compreensão orientam o próximo passo.");
    else if (d.done < d.total) out.push(`Termine as perguntas de detalhe (${d.done} de ${d.total}).`);
    else if (d.right >= 5 && beforeAll && (st.listens.escuta2 || 0) <= 2) out.push("Compreensão forte neste episódio. Numa próxima escuta, experimente a versão <b>natural</b>.");
    else if (d.right >= 3) out.push("Em outro dia, ouça a versão clara de novo sem texto e depois com o texto aberto.");
    else out.push("Em outro dia, repita só a primeira escuta da versão clara, antes de abrir o texto.");
    const weak = e.expressions.filter((x) => st.expressions[x.id] === "nao").map((x) => `<b>${esc(x.en)}</b>`);
    if (weak.length) out.push(`Expressões para retomar: ${weak.join(", ")}. Elas voltam no próximo episódio.`);
    const hard = (e.repeat || []).filter((r) => st.repeat[r.id] === "dificil").map((r) => `“${esc(r.en)}”`);
    if (hard.length) out.push(`Repita outra vez, ouvindo devagar: ${hard.join(" ")}.`);
    const missing = e.simulation.prompts.filter((p) => !p.optional && !(st.productions[p.id] || {}).savedAt).length;
    const pending = e.simulation.prompts.filter((p) => { const pr = st.productions[p.id]; return pr && pr.savedAt && (!pr.review || pr.review.status === "pendente"); }).length;
    if (missing) out.push(`Falta${missing > 1 ? "m" : ""} ${missing} resposta${missing > 1 ? "s" : ""} na parte 3. Pode ficar para outro dia.`);
    if (pending) out.push("Copie suas respostas e envie ao Claude para revisão. Depois registre o resultado em Progresso.");
    out.push("Se cansar, pare. Tudo fica salvo e você retoma da mesma atividade.");
    return out;
  }
  function expressionStatus(id) {
    const ctx = new Set();
    Object.entries(P.episodes).forEach(([eid, st]) => Object.entries(st.productions || {}).forEach(([pid, pr]) => {
      if (pr.review && pr.review.status === "adequada" && (pr.review.targetsOk || []).includes(id)) ctx.add(eid + ":" + pid);
    }));
    return ctx.size;
  }

  // ---------- telas ----------
  function setNav(name) {
    document.querySelectorAll("[data-nav]").forEach((a) => { if (a.dataset.nav === name) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  }
  let flash = "";

  function viewHome() {
    setNav("inicio");
    const list = (window.COURSE.episodes || []).map((m) => EPISODES()[m.id]).filter(Boolean);
    app.innerHTML = `<section class="hero"><span class="eyebrow">Inglês britânico · Londres → Manchester</span>
        <h1>Next Stop: Manchester</h1>
        <p class="lede">Uma história contínua para treinar escuta e fala. Cada episódio é dividido em atividades curtas: faça uma, pare quando quiser e continue depois do mesmo ponto.</p></section>
      ${!storageOk ? `<p class="note warn">Este navegador não está deixando salvar o progresso. Exporte em Progresso antes de sair.</p>` : ""}
      ${list.map((e) => {
        const st = P.episodes[e.id] ? epState(e.id) : null;
        const r = st ? records(e, st) : null;
        const nx = st ? nextAct(e, st) : actsOf(e)[0];
        return `<article class="ep-card">
          <div class="row"><span class="eyebrow">Episódio ${e.number} · ${esc(e.arc)}</span>
          ${st ? `<span class="chip ${st.completedAt ? "ok" : "info"}">${r.actsDone} de ${r.actsTotal} atividades</span>` : `<span class="chip">Não iniciado</span>`}</div>
          <div><h2>${esc(e.title)}</h2><p class="pt">${esc(e.titlePt)}</p></div>
          <p>${esc(e.objective)}</p>
          <div class="row">${nx ? `<a class="btn primary" href="#${e.id}-${nx.id}">${st ? "Continuar" : "Começar"}: ${esc(nx.name)}</a>` : ""}
          <a class="btn" href="#${e.id}">Ver todas as atividades</a></div></article>`;
      }).join("")}
      <p class="small muted">Os próximos episódios são preparados a partir do seu progresso. Exporte em Progresso ou copie o resumo da Retomada e envie ao Claude.</p>`;
  }

  function viewOverview(e) {
    setNav("");
    const st = epState(e.id);
    const acts = actsOf(e);
    const nx = nextAct(e, st);
    const msg = flash; flash = "";
    app.innerHTML = `<section class="hero"><span class="eyebrow">Episódio ${e.number} · ${esc(e.arc)}</span>
        <div><h1>${esc(e.title)}</h1><p class="pt">${esc(e.titlePt)}</p></div>
        <p><b>Objetivo:</b> ${esc(e.objective)}</p></section>
      ${msg ? `<div class="note">${msg}</div>` : ""}
      ${nx ? `<div class="row"><a class="btn primary" href="#${e.id}-${nx.id}">${Object.keys(st.acts).length ? "Continuar" : "Começar"}: ${esc(nx.name)}</a></div>` : `<div class="note">Todas as atividades principais estão feitas. Veja a <a href="#${e.id}-p3-retomada">Retomada</a>.</div>`}
      <div class="parts">${PARTS.map((pt) => {
        const list = acts.filter((a) => a.part === pt.n);
        const req = list.filter((a) => !a.optional);
        const done = req.filter((a) => isDone(st, a)).length;
        return `<section class="part"><div class="part-head"><h2>Parte ${pt.n} · ${esc(pt.name)}</h2>${req.length ? `<span class="chip ${done === req.length ? "ok" : ""}">${done} de ${req.length}</span>` : `<span class="chip">opcional</span>`}</div>
          <p class="small muted">${esc(pt.about)}</p>
          <ul class="acts">${list.map((a) => `<li><a href="#${e.id}-${a.id}" class="${isDone(st, a) ? "done" : ""} ${nx && nx.id === a.id ? "next" : ""}">
            <span class="mark" aria-hidden="true">${isDone(st, a) ? "✓" : ""}</span><span>${esc(a.name)}</span>${a.optional ? `<span class="opt">opcional</span>` : isDone(st, a) ? `<span class="opt">feito</span>` : ""}</a></li>`).join("")}</ul></section>`;
      }).join("")}</div>
      ${downloadsHTML(e)}
      <p class="small muted">Não há tempo mínimo nem ordem obrigatória. A sequência sugerida é a de cima para baixo.</p>`;
  }

  function downloadsHTML(e) {
    const m = (window.COURSE.episodes || []).find((x) => x.id === e.id);
    if (!m || !m.downloads || !m.downloads.length) return "";
    const mb = (b) => (b / 1048576).toFixed(1).replace(".", ",") + " MB";
    return `<section class="part" id="mp3"><div class="part-head"><h2>Ouvir fora da aula (MP3)</h2><span class="chip">escuta livre</span></div>
      <p class="small">Para ouvir no banho, no caminho ou no fone, com o player de música do celular. Escutas fora do site não entram na avaliação.</p>
      <ul class="acts">${m.downloads.map((d) => `<li><a href="${esc(d.file)}" download><span class="mark" aria-hidden="true">↓</span><span>${esc(d.label)}</span><span class="opt">${fmtTime(d.duration)} · ${mb(d.size)}</span></a></li>`).join("")}</ul>
      <p class="small muted">Os arquivos tocam sempre na velocidade original (1×). A velocidade escolhida no site não muda o MP3 baixado; ajuste no app de música, se ele permitir.</p></section>`;
  }

  function viewAct(e, actId) {
    setNav("");
    const st = epState(e.id);
    const acts = actsOf(e);
    const i = acts.findIndex((a) => a.id === actId);
    if (i < 0) { viewOverview(e); return; }
    const a = acts[i];
    const partActs = acts.filter((x) => x.part === a.part);
    const k = partActs.indexOf(a);
    const prev = acts[i - 1];
    st.cur = a.id;
    if (a.type === "read" && !st.transcriptRevealed) st.transcriptRevealed = now();
    save();
    const done = isDone(st, a);
    app.innerHTML = `<article class="act">
      <header class="act-head">
        <span class="eyebrow">Parte ${a.part} · ${esc(PARTS[a.part - 1].name)} · ${k + 1} de ${partActs.length}${a.optional ? " · opcional" : ""}</span>
        <h1>${esc(a.name)}</h1>
        <p class="guide">${esc(a.guide)}</p>
      </header>
      <div class="act-body">${R[a.type](e, st, a)}</div>
      <footer class="act-foot">
        <div class="row">${prev ? `<a class="btn ghost small" href="#${e.id}-${prev.id}">← Atividade anterior</a>` : ""}
          <a class="btn ghost small" href="#${e.id}" data-action="stop">Parar aqui</a></div>
        <div class="right">${a.type === "review" ? "" : `<button class="btn primary" data-action="continue" data-act="${a.id}">Próxima atividade →</button>`}</div>
        ${["listen", "gist", "detail"].includes(a.type) ? `<p class="small muted pending" data-role="pending">${pendingText(e, st, a)}</p>` : ""}
      </footer></article>`;
    mountPlayers(app, e, st);
  }

  function viewProgress() {
    setNav("progresso");
    const eps = (window.COURSE.episodes || []).map((m) => EPISODES()[m.id]).filter(Boolean);
    const sections = eps.map((e) => {
      if (!P.episodes[e.id]) return `<div class="panel"><h2>Episódio ${e.number}: ${esc(e.title)}</h2><p class="muted">Ainda não iniciado.</p></div>`;
      const st = epState(e.id), r = records(e, st);
      const pct = Math.round((r.actsDone / r.actsTotal) * 100);
      const rep = Object.values(st.repeat || {});
      const prods = r.prods.map(({ p, pr }) => `<div class="panel">
          <div class="row" style="justify-content:space-between"><b>${esc(p.en)}</b>${prodChip(pr)}</div>
          ${pr.savedAt ? `<p class="small">“${esc(pr.text || "")}”</p>
          <details><summary class="small">Registrar o resultado da revisão do Claude</summary><div class="stack">
            <div class="seg" role="group" aria-label="Resultado">${[["pendente", "Pendente"], ["ajustes", "Com ajustes"], ["adequada", "Adequada"]].map(([v, t]) => `<button data-action="revstatus" data-ep="${e.id}" data-p="${p.id}" data-v="${v}" aria-pressed="${((pr.review && pr.review.status) || "pendente") === v}">${t}</button>`).join("")}</div>
            <p class="small muted">Expressões que o Claude confirmou como usadas corretamente:</p>
            ${p.targets.filter((t) => t.startsWith("e")).map((t) => { const x = e.expressions.find((y) => y.id === t); return `<label class="check small"><input type="checkbox" id="rv-${p.id}-${t}" data-action="revtarget" data-ep="${e.id}" data-p="${p.id}" data-t="${t}" ${((pr.review && pr.review.targetsOk) || []).includes(t) ? "checked" : ""}> <span>${esc(x.en)}</span></label>`; }).join("")}
            <label class="small" for="rvn-${p.id}">Observação da revisão</label>
            <textarea id="rvn-${p.id}" data-action="revnote" data-ep="${e.id}" data-p="${p.id}">${esc((pr.review && pr.review.note) || "")}</textarea>
          </div></details>` : `<p class="small muted">Sem resposta salva.</p>`}</div>`).join("");
      const exprRows = e.expressions.map((x) => {
        const n = expressionStatus(x.id);
        const self = { nao: "Ainda não reconheço", reconheco: "Reconheço", usar: "Acho que consigo usar" }[st.expressions[x.id]] || "—";
        return `<tr><td><b>${esc(x.en)}</b></td><td>${self}</td><td>${n >= 2 ? `<span class="chip ok">Verificado</span>` : `${n} de 2 contextos`}</td></tr>`;
      }).join("");
      return `<section class="stack-lg">
        <div class="row" style="justify-content:space-between"><h2>Episódio ${e.number}: ${esc(e.title)}</h2><a class="btn small" href="#${e.id}">Abrir</a></div>
        <div class="records">
          <div class="panel record"><h3>Atividade concluída <span class="chip">${r.actsDone}/${r.actsTotal}</span></h3>
            <div class="meter" aria-hidden="true"><i style="width:${pct}%"></i></div>
            <p class="small muted">Mostra o que você fez, não o que você domina.${st.migratedFrom ? " Inclui atividades feitas na versão anterior." : ""}</p></div>
          <div class="panel record"><h3>Compreensão</h3><dl class="kv">
            <dt>Situação</dt><dd>${scoreText(r.g)}</dd>
            <dt>Detalhes</dt><dd>${scoreText(r.d)}</dd>
            <dt>Escutas</dt><dd>${st.listens.escuta1 || 0} gerais, ${st.listens.escuta2 || 0} de detalhe</dd>
            <dt>Apoio</dt><dd>${Object.keys(st.hints || {}).length} pista${Object.keys(st.hints || {}).length === 1 ? "" : "s"} usada${Object.keys(st.hints || {}).length === 1 ? "" : "s"} · ${Object.values(st.replays || {}).reduce((x, y) => x + y, 0)} trecho(s) reouvido(s) em “Não entendi ainda”</dd>
            <dt>Sem texto</dt><dd>${r.d.done ? `${r.beforeText} de ${r.d.done} respostas de detalhe antes de ver o texto` : "—"}</dd></dl></div>
          <div class="panel record"><h3>Sua autoavaliação</h3><dl class="kv">
            <dt>Dificuldade</dt><dd>${st.difficulty ? st.difficulty + " de 5" : "não informada"}</dd>
            <dt>Repetição</dt><dd>${rep.filter((v) => v === "ok").length} “consegui”, ${rep.filter((v) => v === "dificil").length} “ainda difícil”</dd>
            ${st.reflection ? `<dt>Nota</dt><dd>${esc(st.reflection)}</dd>` : ""}</dl></div>
          <div class="panel record"><h3>Produção revisada</h3>
            <p class="small">${r.prods.filter(({ pr }) => pr.review && pr.review.status !== "pendente").length} de ${r.prods.length} respostas revisadas.</p>
            <p class="small muted">Pronúncia: <b>não verificada</b>. A plataforma não ouve nem avalia sua voz.</p></div>
        </div>
        <div class="stack"><h3>Expressões</h3><div class="table-wrap"><table><thead><tr><th>Expressão</th><th>Sua avaliação</th><th>Uso verificado</th></tr></thead><tbody>${exprRows}</tbody></table></div>
          <p class="small muted">Uso verificado exige respostas revisadas como adequadas, com a expressão usada corretamente, em dois contextos diferentes.</p></div>
        <div class="stack"><h3>Marcações de dificuldade</h3>
          ${(() => { const ms = marksList(e, st); const d = dlgStats(e, st);
            return `<p class="small muted">Revisão do diálogo: ${d.heard} de ${d.total} falas entendidas só ouvindo · tradução aberta em ${d.tr} · explicação aberta em ${d.ex}.</p>` +
              (ms.length ? `<div class="table-wrap"><table><thead><tr><th>Palavra ou expressão</th><th>Na fala</th><th>Dificuldade</th></tr></thead><tbody>${ms.map((m) => `<tr><td><b>${esc(m.term)}</b></td><td class="small">${esc(m.en)}</td><td class="small">${m.types.map(esc).join("<br>")}</td></tr>`).join("")}</tbody></table></div>`
                : `<p class="small muted">Nenhuma marcação ainda. Elas são feitas na Revisão do diálogo, em “Explicar e marcar”.</p>`); })()}
          <p class="small muted">Essas marcações orientam as próximas histórias: algumas voltam em situações novas.</p></div>
        <div class="stack"><h3>Respostas</h3>${prods}</div></section>`;
    }).join("");
    const a = ASSESS;
    app.innerHTML = `<section class="hero"><span class="eyebrow">Acompanhamento</span><h1>Progresso</h1>
        <p class="lede">Quatro registros separados: o que você fez, o que entendeu, como você se avalia e o que foi revisado.</p></section>
      ${sections}
      <section class="stack"><h2>Avaliação inicial</h2><p class="small muted">${fmtDate(a.date)}. Registro fixo do ponto de partida.</p>
        <div class="table-wrap"><table><thead><tr><th>Habilidade</th><th>Atividade</th><th>Resultado</th><th>Observação</th></tr></thead><tbody>
        ${a.items.map((i) => `<tr><td>${esc(i.skill)}</td><td>${esc(i.activity)}</td><td>${esc(i.result)}</td><td class="small">${esc(i.note)}</td></tr>`).join("")}</tbody></table></div>
        <p class="note small">${esc(a.summary)}</p></section>
      <section class="panel"><h2>Seus dados</h2>
        <p class="small">O progresso fica guardado só neste navegador${P.updated ? ` (última alteração em ${fmtDate(P.updated)})` : ""}. Ele não passa sozinho para outro aparelho. Para guardar uma cópia, mudar de aparelho ou enviar ao Claude, exporte o arquivo.</p>
        <div class="row"><button class="btn primary" data-action="export">Exportar progresso (.json)</button>
          <button class="btn" data-action="exporttext">Ver como texto</button>
          <label class="btn" for="import-file">Importar arquivo</label><input type="file" id="import-file" accept=".json,application/json" hidden>
          <button class="btn ghost" data-action="reset">Apagar progresso</button></div>
        <div data-role="datahost"></div></section>`;
  }

  function viewSettings() {
    setNav("ajustes");
    const s = P.settings;
    app.innerHTML = `<section class="hero"><span class="eyebrow">Ajustes</span><h1>Aparência, áudio e privacidade</h1></section>
      <section class="panel"><h2>Aparência</h2>
        <p class="small">Tema</p>
        <div class="seg" role="group" aria-label="Tema"><button data-action="settheme" data-v="light" aria-pressed="${s.theme !== "dark"}">Claro</button><button data-action="settheme" data-v="dark" aria-pressed="${s.theme === "dark"}">Escuro</button></div>
        <p class="small">Tamanho da letra</p>
        <div class="seg" role="group" aria-label="Tamanho da letra">${["Normal", "Grande", "Maior"].map((t, i) => `<button data-action="setsize" data-v="${i}" aria-pressed="${(s.size || 0) === i}">${t}</button>`).join("")}</div>
        <p class="small muted">Os botões no topo da página fazem o mesmo.</p></section>
      <section class="panel"><h2>Áudio</h2>
        <p class="small">Versão que abre primeiro nos players. Você pode trocar dentro de cada atividade.</p>
        <div class="seg" role="group" aria-label="Versão padrão"><button data-action="setaudio" data-v="clear" aria-pressed="${s.audio === "clear"}">Clara</button><button data-action="setaudio" data-v="natural" aria-pressed="${s.audio === "natural"}">Natural</button></div>
        <div class="row">${rateSelect("rate-set")}</div>
        <p class="small muted">1× é a velocidade original da versão escolhida (clara ou natural). A escolha fica salva, vale para todos os áudios da aula e mantém o tom da voz. Ela não muda sozinha e não entra na avaliação. Suas gravações tocam sempre na velocidade real.</p>
        <p class="small muted">Vozes sintéticas (Kokoro), sotaque britânico padrão. Para outras vozes, incluindo Manchester, os episódios indicam gravações reais como complemento.</p></section>
      <section class="panel"><h2>Tradução</h2>
        <label class="switch"><input type="checkbox" id="set-tr" data-action="settr" ${s.translations ? "checked" : ""}> <span>Mostrar a tradução por padrão</span></label></section>
      <section class="panel"><h2>Gravação da sua voz</h2>
        <p>Quando você toca em Gravar, o navegador pede permissão para o microfone. O áudio fica só na memória desta página, neste aparelho. Não é enviado a nenhum servidor, não entra no arquivo exportado e some quando você recarrega ou fecha a página.</p>
        <p class="small muted">Na prévia aberta dentro do Claude, o microfone é bloqueado pela plataforma. Na versão publicada no GitHub Pages, funciona com a sua permissão.</p></section>
      <section class="panel"><h2>Reconhecimento de voz</h2>
        <p>Transforma sua fala em texto na parte de respostas. <b>Diferente da gravação, este recurso pode enviar o seu áudio a um serviço externo:</b> no Chrome, normalmente aos servidores do Google; no Safari, à Apple ou ao próprio aparelho, conforme a versão. Cada empresa segue a sua política de privacidade.</p>
        <p class="small">O texto reconhecido mostra se uma máquina entendeu as palavras. Não é avaliação de pronúncia.</p>
        <label class="switch"><input type="checkbox" id="set-sr" data-action="setsr" ${s.speech ? "checked" : ""} ${SR ? "" : "disabled"}> <span>Ativar o botão “Reconhecer fala”${SR ? "" : " (indisponível neste navegador)"}</span></label></section>
      <section class="panel"><h2>Créditos</h2>
        <ul class="small">
          <li>Vozes: modelo Kokoro-82M (licença Apache 2.0), gerado com <a href="https://github.com/thewh1teagle/kokoro-onnx" target="_blank" rel="noopener">kokoro-onnx</a> (MIT).</li>
          <li>Ilustrações: originais, feitas para este projeto.</li>
          <li>Fotos: Geograph, licença <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noopener">CC BY-SA 2.0</a>: N Chadwick (<a href="https://www.geograph.org.uk/photo/6590812" target="_blank" rel="noopener">Heathrow Terminal 2 &amp; 3</a>) e Robin Stott (<a href="https://www.geograph.org.uk/photo/3940789" target="_blank" rel="noopener">catracas em Marylebone</a>).</li>
          <li>Fontes tipográficas: Atkinson Hyperlegible, Bricolage Grotesque e IBM Plex Mono, via Google Fonts.</li>
          <li>Informações de transporte e costumes: as fontes ficam em cada cartão, com a data da consulta.</li>
        </ul></section>`;
  }

  // ---------- roteamento ----------
  function parseHash() {
    const h = (location.hash || "#inicio").slice(1);
    const m = h.match(/^(ep\d+)(?:-(.+))?$/);
    return m ? { ep: m[1], act: m[2] || null } : { page: h };
  }
  function route() {
    stopAll();
    const r = parseHash();
    if (r.page === "progresso") viewProgress();
    else if (r.page === "ajustes") viewSettings();
    else if (r.ep && EPISODES()[r.ep]) { if (r.act) viewAct(EPISODES()[r.ep], r.act); else viewOverview(EPISODES()[r.ep]); }
    else viewHome();
    window.scrollTo(0, 0);
  }
  const currentEp = () => { const r = parseHash(); return r.ep ? EPISODES()[r.ep] : null; };
  function refreshAct() { const r = parseHash(); const e = currentEp(); if (e && r.act) { const y = window.scrollY; viewAct(e, r.act); window.scrollTo(0, y); } }

  // ---------- ações ----------
  app.addEventListener("click", async (ev) => {
    const t = ev.target.closest("[data-action]");
    if (!t || t.tagName === "TEXTAREA" || (t.tagName === "INPUT" && t.type !== "checkbox")) return;
    const act = t.dataset.action;
    const e = currentEp();
    const st = e ? epState(e.id) : null;
    switch (act) {
      case "continue": {
        const acts = actsOf(e); const i = acts.findIndex((a) => a.id === t.dataset.act);
        st.acts[t.dataset.act] = { done: true, at: now() }; save();
        const next = acts[i + 1];
        if (!next) { location.hash = e.id; return; }
        if (next.part !== acts[i].part) { flash = `<b>Parte ${acts[i].part} concluída.</b> Pode parar aqui. Na próxima vez, toque em Continuar para começar a parte ${next.part}.`; location.hash = e.id; return; }
        location.hash = e.id + "-" + next.id; return;
      }
      case "stop": stopAll(); return;
      case "pp": { const p = t.closest(".player"); if (p._toggle) p._toggle(); return; }
      case "rewind": { const p = t.closest(".player"); if (p._rewind) p._rewind(); return; }
      case "ver": { const p = t.closest(".player"); if (p._ver) p._ver(t.dataset.ver); return; }
      case "loop": { const p = t.closest(".player"); if (p._loop) p._loop(); return; }
      case "answer": {
        const q = allQs(e).find((x) => x.id === t.dataset.q), i = Number(t.dataset.i);
        const a = st.answers[q.id] || (st.answers[q.id] = { first: i, at: now(), beforeTranscript: !st.transcriptRevealed,
          hintBefore: !!(st.hints && st.hints[q.id]), replaysBefore: (st.replays && st.replays[q.id]) || 0 });
        a.last = i; save(); rerenderFlow(e, st);
        return;
      }
      case "showline": {
        const a = st.answers[t.dataset.q]; if (a) { a.lineShown = true; save(); }
        rerenderFlow(e, st);
        return;
      }
      case "helpopen": helpOpen[t.dataset.q] = !helpOpen[t.dataset.q]; rerenderFlow(e, st); return;
      case "hint": {
        st.hints = st.hints || {};
        if (!st.hints[t.dataset.q]) st.hints[t.dataset.q] = { at: now(), beforeAnswer: !st.answers[t.dataset.q] };
        save(); rerenderFlow(e, st); return;
      }
      case "replayq": {
        st.replays = st.replays || {}; st.replays[t.dataset.q] = (st.replays[t.dataset.q] || 0) + 1; save();
        playClip(e.base + e.audio.lines[t.dataset.line].src); return;
      }
      case "qgo": { st.qIdx = st.qIdx || {}; st.qIdx[t.dataset.act] = Number(t.dataset.i); save(); rerenderFlow(e, st); return; }
      case "clip": playClip(e.base + e.audio.lines[t.dataset.line].src); return;
      case "say": {
        const turn = t.dataset.noturn ? null : app.querySelector('[data-role="yourturn"]');
        if (turn) turn.hidden = true;
        playClip(e.base + t.dataset.src, () => { if (turn) turn.hidden = false; });
        return;
      }
      case "trline": {
        const id = t.dataset.line; st.dlg = st.dlg || {}; st.dlg[id] = st.dlg[id] || {};
        if (trVisible.has(id)) trVisible.delete(id); else { trVisible.add(id); if (!st.dlg[id].tr) { st.dlg[id].tr = true; st.dlg[id].trAt = now(); save(); } }
        rerenderLine(e, st, id); return;
      }
      case "trall": {
        const all = e.lines.every((l) => trVisible.has(l.id)); st.dlg = st.dlg || {};
        e.lines.forEach((l) => { if (all) trVisible.delete(l.id); else { trVisible.add(l.id); st.dlg[l.id] = st.dlg[l.id] || {}; if (!st.dlg[l.id].tr) { st.dlg[l.id].tr = true; st.dlg[l.id].trAt = now(); } } });
        save(); e.lines.forEach((l) => rerenderLine(e, st, l.id)); t.textContent = all ? "Mostrar toda a tradução" : "Esconder toda a tradução"; return;
      }
      case "explain": {
        const id = t.dataset.line; st.dlg = st.dlg || {}; st.dlg[id] = st.dlg[id] || {};
        if (dlgOpen.has(id)) dlgOpen.delete(id); else { dlgOpen.add(id); if (!st.dlg[id].ex) { st.dlg[id].ex = true; st.dlg[id].exAt = now(); save(); } }
        rerenderLine(e, st, id); return;
      }
      case "heard": { const id = t.dataset.line; st.dlg = st.dlg || {}; st.dlg[id] = st.dlg[id] || {}; st.dlg[id].heard = t.checked; save(); return; }
      case "termsel": { const id = t.dataset.line; dlgSel[id] = dlgSel[id] === t.dataset.term ? null : t.dataset.term; rerenderLine(e, st, id); return; }
      case "allwords": allWords.add(t.dataset.line); rerenderLine(e, st, t.dataset.line); return;
      case "addterm": {
        const id = t.dataset.line, inp = app.querySelector(`#other-${id}`), term = (inp.value || "").trim().slice(0, 60);
        if (!term) { toast("Digite a palavra ou expressão."); return; }
        st.marks = st.marks || {}; const k = markKey(id, term);
        if (!st.marks[k]) st.marks[k] = { line: id, term, types: {}, at: now() };
        dlgSel[id] = term; save(); rerenderLine(e, st, id); return;
      }
      case "marktype": {
        const id = t.dataset.line, term = dlgSel[id]; if (!term) return;
        st.marks = st.marks || {}; const k = markKey(id, term);
        const m = st.marks[k] || (st.marks[k] = { line: id, term, types: {}, at: now() });
        m.types[t.dataset.type] = t.checked; m.updated = now(); save();
        const btn = app.querySelector(`.dline[data-line="${id}"] [data-action="explain"]`); const n = lineMarks(st, id).length;
        if (btn) btn.textContent = "Explicar e marcar" + (n ? ` · ${n} marcada${n > 1 ? "s" : ""}` : "");
        app.querySelectorAll(`.dline[data-line="${id}"] .chip-btn`).forEach((c) => { const mk = st.marks[markKey(id, c.dataset.term)]; c.classList.toggle("marked", !!(mk && MARK_TYPES.some(([x]) => mk.types[x]))); });
        return;
      }
      case "trtoggle": {
        P.settings.translations = t.checked; save();
        app.querySelector(".script").innerHTML = e.lines.map((l) => lineHTML(e, l, t.checked)).join("");
        return;
      }
      case "togglept": { const el = app.querySelector('[data-role="pt"]'); el.hidden = !el.hidden; t.textContent = el.hidden ? "Ver tradução" : "Esconder tradução"; return; }
      case "qpt": { const el = app.querySelector('[data-role="qpt"]'); el.hidden = !el.hidden; t.textContent = el.hidden ? "Ver tradução" : "Esconder tradução"; return; }
      case "hidephrase": {
        const el = app.querySelector('[data-role="phrase"]'); const hid = el.style.visibility === "hidden";
        el.style.visibility = hid ? "" : "hidden"; t.textContent = hid ? "Tentar sem olhar (opcional)" : "Mostrar o texto de novo"; return;
      }
      case "rate": {
        const f = t.dataset.field, id = t.dataset.id;
        st[f] = st[f] || {};
        st[f][id] = st[f][id] === t.dataset.v ? undefined : t.dataset.v; save();
        t.parentElement.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(st[f][id] === b.dataset.v)));
        return;
      }
      case "rec": toggleRecord(t.dataset.key, t, t.closest("details")); return;
      case "mine": if (recordings[t.dataset.key]) playClip(recordings[t.dataset.key], null, true); return;
      case "compare": { const mine = recordings[t.dataset.key]; if (mine) playClip(e.base + t.dataset.src, () => setTimeout(() => playClip(mine, null, true), 500)); return; }
      case "saveprod": {
        const txt = app.querySelector(`#ans-${t.dataset.p}`).value.trim();
        if (!txt) { toast("Escreva o que você disse antes de salvar."); return; }
        const pr = st.productions[t.dataset.p] || (st.productions[t.dataset.p] = {});
        pr.text = txt; pr.draft = txt; pr.savedAt = now(); pr.modelSeen = true;
        if (!pr.review) pr.review = { status: "pendente" };
        save(); refreshAct(); toast("Resposta salva. Compare com o exemplo.");
        return;
      }
      case "model": {
        const pr = st.productions[t.dataset.p] || (st.productions[t.dataset.p] = {});
        if (!pr.savedAt) pr.modelBeforeAnswer = true;
        pr.modelSeen = true; save(); refreshAct(); return;
      }
      case "check": {
        const pr = st.productions[t.dataset.p] || (st.productions[t.dataset.p] = {});
        pr.checklist = pr.checklist || []; pr.checklist[Number(t.dataset.j)] = t.checked; save(); return;
      }
      case "dictate": dictate(app.querySelector(`#ans-${t.dataset.p}`)); return;
      case "copyprod": {
        const p = e.simulation.prompts.find((x) => x.id === t.dataset.p), pr = st.productions[p.id] || {};
        const fc = p.focusCheck ?? 0;
        const txt = `Revisão — Episódio ${e.number} (${e.title})\nPergunta da Sam: ${p.en}\nFoco: ${p.focus}\nMinha resposta: ${pr.text || "(sem resposta salva)"}\n${pr.modelBeforeAnswer ? "Vi o exemplo antes de responder.\n" : ""}Minha conferência: ${(pr.checklist || [])[fc] ? "[x]" : "[ ]"} ${p.checklist[fc]}`;
        copyText(txt, app.querySelector('[data-role="copyhost"]')); return;
      }
      case "diff": {
        st.difficulty = Number(t.dataset.v); save();
        t.parentElement.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.v) === st.difficulty)));
        return;
      }
      case "complete": st.completedAt = st.completedAt ? null : now(); save(); refreshAct(); return;
      case "copysummary": {
        const r = records(e, st);
        const txt = [
          `Resumo — Episódio ${e.number}: ${e.title}`,
          `Atividades: ${r.actsDone}/${r.actsTotal}${st.completedAt ? ", episódio concluído" : ""}`,
          `Compreensão: situação: ${scoreText(r.g)}; detalhes: ${scoreText(r.d)}; escutas ${st.listens.escuta1 || 0}+${st.listens.escuta2 || 0}${r.d.done ? `; ${r.beforeText} de ${r.d.done} respostas de detalhe antes do texto` : ""}`,
          `Autoavaliação: dificuldade ${st.difficulty || "não informada"}; ` + e.expressions.map((x) => `${x.en} = ${({ nao: "ainda não", reconheco: "reconheço", usar: "consigo usar" })[st.expressions[x.id]] || "—"}`).join("; "),
          "Repetição: " + (e.repeat || []).map((x) => `${x.en} = ${({ ok: "consegui", dificil: "ainda difícil" })[st.repeat[x.id]] || "—"}`).join("; "),
          ...e.simulation.prompts.map((p) => { const pr = st.productions[p.id] || {}; return `Resposta (${p.en}): ${pr.text || "sem resposta"}`; }),
          (() => { const d = dlgStats(e, st); return `Revisão do diálogo: ${d.heard}/${d.total} falas entendidas só ouvindo; tradução aberta em ${d.tr}; explicação aberta em ${d.ex}`; })(),
          "Marcações de dificuldade:" + (marksList(e, st).map((m) => `\n- ${m.term} (“${m.en}”): ${m.types.join("; ").toLowerCase()}`).join("") || " nenhuma"),
          st.reflection ? `Nota: ${st.reflection}` : "",
        ].filter(Boolean).join("\n");
        copyText(txt, app.querySelector('[data-role="copyhost"]')); return;
      }
      case "revstatus": {
        const pr = epState(t.dataset.ep).productions[t.dataset.p]; pr.review = pr.review || {};
        pr.review.status = t.dataset.v; pr.review.at = now(); save(); viewProgress(); return;
      }
      case "revtarget": {
        const pr = epState(t.dataset.ep).productions[t.dataset.p]; pr.review = pr.review || { status: "pendente" };
        const set = new Set(pr.review.targetsOk || []); if (t.checked) set.add(t.dataset.t); else set.delete(t.dataset.t);
        pr.review.targetsOk = [...set]; save(); return;
      }
      case "export": exportData(); return;
      case "exporttext": {
        app.querySelector('[data-role="datahost"]').innerHTML = `<textarea readonly id="export-text" style="min-height:180px">${esc(exportJSON())}</textarea><div class="row"><button class="btn small" data-action="copyexport">Copiar</button></div>`;
        return;
      }
      case "copyexport": copyText(exportJSON(), app.querySelector('[data-role="datahost"]')); return;
      case "reset": {
        app.querySelector('[data-role="datahost"]').innerHTML = `<div class="confirm"><span>Apagar todo o progresso deste navegador? Exporte antes se quiser guardar.</span>
          <button class="btn small" data-action="resetyes">Apagar</button><button class="btn small ghost" data-action="cancel">Cancelar</button></div>`;
        return;
      }
      case "resetyes": { const s = P.settings; P = blank(); P.settings = s; save(); toast("Progresso apagado."); viewProgress(); return; }
      case "cancel": app.querySelector('[data-role="datahost"]').innerHTML = ""; return;
      case "importyes": if (pendingImport) { P = pendingImport; P.settings = Object.assign(defaults(), P.settings || {}); pendingImport = null; save(); applyLook(); toast("Progresso importado."); viewProgress(); } return;
      case "settheme": P.settings.theme = t.dataset.v; save(); applyLook(); viewSettings(); return;
      case "setsize": P.settings.size = Number(t.dataset.v); save(); applyLook(); viewSettings(); return;
      case "setaudio": P.settings.audio = t.dataset.v; save(); viewSettings(); return;
      case "settr": P.settings.translations = t.checked; save(); return;
      case "setsr": P.settings.speech = t.checked; save(); toast(t.checked ? "Reconhecimento ativado." : "Reconhecimento desativado."); return;
    }
  });

  let saveTimer;
  app.addEventListener("input", (ev) => {
    const t = ev.target, e = currentEp();
    const later = () => { clearTimeout(saveTimer); saveTimer = setTimeout(save, 400); };
    if (t.dataset.action === "answertext" && e) { const st = epState(e.id); (st.productions[t.dataset.p] || (st.productions[t.dataset.p] = {})).draft = t.value; later(); }
    else if (t.dataset.action === "reflection" && e) { epState(e.id).reflection = t.value; later(); }
    else if (t.dataset.action === "revnote") { const pr = epState(t.dataset.ep).productions[t.dataset.p]; pr.review = pr.review || { status: "pendente" }; pr.review.note = t.value; later(); }
  });

  // ---------- exportar / importar ----------
  function exportJSON() { return JSON.stringify({ app: "next-stop-manchester", exportedAt: now(), progress: P }, null, 2); }
  async function exportData() {
    const json = exportJSON();
    const name = `progresso-ingles-${new Date().toISOString().slice(0, 10)}.json`;
    const blob = new Blob([json], { type: "application/json" });
    if (window.claude && typeof window.claude.use === "function") {
      try {
        const dl = await window.claude.use("downloads");
        if (dl) { await dl.save({ filename: name, data: blob }); toast("Arquivo salvo."); return; }
      } catch (err) { if (err && err.code === "declined") { toast("Download cancelado."); return; } }
      toast("Use “Ver como texto” para copiar o progresso."); return;
    }
    try {
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name;
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      toast("Arquivo exportado.");
    } catch (err) { toast("Use “Ver como texto” para copiar o progresso."); }
  }
  let pendingImport = null;
  app.addEventListener("change", (ev) => {
    const t = ev.target;
    if (t.dataset.action === "setrate") {
      P.settings.rate = Number(t.value); save();
      players.forEach((a) => applyRate(a, P.settings.rate));
      if (current && current.audio === clip && !clip.dataset.own) applyRate(clip, P.settings.rate);
      toast("Velocidade: " + rateLabel(P.settings.rate));
      return;
    }
    if (t.id !== "import-file" || !t.files || !t.files[0]) return;
    const fr = new FileReader();
    fr.onload = () => {
      const host = app.querySelector('[data-role="datahost"]');
      try {
        const data = JSON.parse(fr.result), p = data && data.progress;
        if (!p || p.version !== 1 || typeof p.episodes !== "object") throw new Error("formato");
        pendingImport = p;
        host.innerHTML = `<div class="confirm"><span>Substituir o progresso atual pelo do arquivo${data.exportedAt ? ` exportado em ${fmtDate(data.exportedAt)}` : ""}?</span>
          <button class="btn small" data-action="importyes">Substituir</button><button class="btn small ghost" data-action="cancel">Cancelar</button></div>`;
      } catch (err) { host.innerHTML = `<p class="note warn small">Este arquivo não é um progresso exportado por esta plataforma. Escolha o .json gerado pelo botão Exportar.</p>`; }
      t.value = "";
    };
    fr.readAsText(t.files[0]);
  });

  // ---------- início ----------
  function loadScripts() {
    const list = ((window.COURSE && window.COURSE.episodes) || []).map((m) => m.file);
    if (!window.ILLUSTRATIONS) list.push("assets/illustrations.js");
    return Promise.all(list.map((src) => new Promise((res) => {
      const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = res; document.body.appendChild(s);
    })));
  }
  applyLook();
  window.addEventListener("hashchange", route);
  loadScripts().then(route);
})();
