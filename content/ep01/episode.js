// Gerado por tools/build_episode.py a partir de source.json. Não edite à mão.
window.EPISODES = window.EPISODES || {};
window.EPISODES["ep01"] = {
 "id": "ep01",
 "number": 1,
 "arc": "Londres",
 "title": "First morning",
 "titlePt": "Primeira manhã",
 "cefr": "A1–A2",
 "objective": "Contar como foi o seu dia e dizer o que você faz, numa primeira conversa com alguém que acabou de conhecer.",
 "setting": "Domingo de manhã, na cozinha do apartamento compartilhado em Londres. Davi chegou ontem do Brasil. Sam, que divide o apartamento, quer saber como foi o primeiro dia dele.",
 "characters": [
  {
   "id": "S",
   "name": "Sam",
   "voice": "bf_isabella",
   "about": "Divide o apartamento com Davi. Trabalha numa loja de molduras."
  },
  {
   "id": "D",
   "name": "Davi",
   "voice": "bm_lewis",
   "about": "Artista visual brasileiro, recém-chegado a Londres."
  }
 ],
 "lines": [
  {
   "id": "l01",
   "s": "S",
   "en": "So, how was your first day in London?",
   "pt": "Então, como foi o seu primeiro dia em Londres?"
  },
  {
   "id": "l02",
   "s": "D",
   "en": "Tiring, but good. I arrived at Heathrow at seven in the morning.",
   "pt": "Cansativo, mas bom. Cheguei em Heathrow às sete da manhã."
  },
  {
   "id": "l03",
   "s": "S",
   "en": "Seven! Did you get the Tube into town?",
   "pt": "Sete! Você pegou o metrô até o centro?"
  },
  {
   "id": "l04",
   "s": "D",
   "en": "Yes, I did. It was slow, but it was cheap.",
   "pt": "Sim, peguei. Foi demorado, mas foi barato."
  },
  {
   "id": "l05",
   "s": "S",
   "en": "And what did you do after that?",
   "pt": "E o que você fez depois?"
  },
  {
   "id": "l06",
   "s": "D",
   "en": "I was really tired, so I slept for three hours. Then I went for a walk by the river.",
   "pt": "Eu estava muito cansado, então dormi três horas. Depois fui dar uma volta perto do rio."
  },
  {
   "id": "l07",
   "s": "S",
   "en": "Lovely. Was it cold?",
   "pt": "Que bom. Estava frio?"
  },
  {
   "id": "l08",
   "s": "D",
   "en": "Freezing! And it rained, of course.",
   "pt": "Um gelo! E choveu, claro."
  },
  {
   "id": "l09",
   "s": "S",
   "en": "Welcome to London! So, what do you do back home?",
   "pt": "Bem-vindo a Londres! E o que você faz lá no Brasil?"
  },
  {
   "id": "l10",
   "s": "D",
   "en": "I'm a visual artist. I paint, and I also work as an administrative assistant.",
   "pt": "Sou artista visual. Eu pinto, e também trabalho como assistente administrativo."
  },
  {
   "id": "l11",
   "s": "S",
   "en": "Oh, interesting. I work in a frame shop. We frame paintings and photos. You should come and see it.",
   "pt": "Ah, interessante. Eu trabalho numa loja de molduras. A gente emoldura pinturas e fotos. Você devia ir conhecer."
  },
  {
   "id": "l12",
   "s": "D",
   "en": "I'd love to. Maybe tomorrow?",
   "pt": "Eu adoraria. Talvez amanhã?"
  },
  {
   "id": "l13",
   "s": "S",
   "en": "Tomorrow's good. I start at nine, so come at ten.",
   "pt": "Amanhã está ótimo. Eu começo às nove, então venha às dez."
  },
  {
   "id": "l14",
   "s": "D",
   "en": "Great. See you tomorrow, then.",
   "pt": "Ótimo. Até amanhã, então."
  }
 ],
 "prelisten": {
  "id": "pre",
  "q": "Antes de ouvir: Sam faz várias perguntas ao Davi. Sobre quais dois assuntos?",
  "options": [
   "O primeiro dia do Davi e o trabalho dele",
   "A família do Davi e a comida do Brasil",
   "O aluguel e as contas da casa"
  ],
  "answer": 0,
  "line": "l09",
  "hint": "A Sam faz duas perguntas principais: uma logo no começo e outra no meio da conversa. Preste atenção nelas."
 },
 "gist": [
  {
   "id": "g1",
   "q": "Como foi o primeiro dia do Davi?",
   "options": [
    "Cansativo, mas bom",
    "Ótimo, sem nenhum cansaço",
    "Ruim, ele quer voltar para o Brasil"
   ],
   "answer": 0,
   "line": "l02",
   "hint": "A resposta está na primeira fala do Davi, logo depois da pergunta da Sam."
  },
  {
   "id": "g2",
   "q": "No fim, Sam faz um convite. Qual?",
   "options": [
    "Tomar um café num bar",
    "Conhecer a loja onde ela trabalha",
    "Visitar um museu juntos"
   ],
   "answer": 1,
   "line": "l11",
   "hint": "Ouça o fim da conversa: a Sam fala do lugar onde trabalha e diz “You should come and see it”."
  }
 ],
 "detail": [
  {
   "id": "d1",
   "q": "A que horas Davi chegou em Heathrow?",
   "options": [
    "Às sete",
    "Às nove",
    "Às dez"
   ],
   "answer": 0,
   "line": "l02",
   "hint": "Procure um número logo depois da palavra Heathrow."
  },
  {
   "id": "d2",
   "q": "Como foi a viagem de metrô?",
   "options": [
    "Rápida e cara",
    "Demorada e barata",
    "Demorada e cara"
   ],
   "answer": 1,
   "line": "l04",
   "hint": "Ouça a resposta do Davi depois de “Yes, I did”. São duas palavras que descrevem a viagem, ligadas por but."
  },
  {
   "id": "d3",
   "q": "O que Davi fez depois de chegar?",
   "options": [
    "Foi direto trabalhar",
    "Fez compras no centro",
    "Dormiu e depois caminhou perto do rio"
   ],
   "answer": 2,
   "line": "l06",
   "hint": "Davi conta duas ações, uma depois da outra. A segunda começa com “Then”."
  },
  {
   "id": "d4",
   "q": "Como estava o tempo?",
   "options": [
    "Frio e chuvoso",
    "Quente e seco",
    "Frio, mas sem chuva"
   ],
   "answer": 0,
   "line": "l08",
   "hint": "A Sam pergunta “Was it cold?”. Ouça a resposta e o que vem depois de “And”."
  },
  {
   "id": "d5",
   "q": "Onde Sam trabalha?",
   "options": [
    "Numa galeria de arte",
    "Numa loja de molduras",
    "Num café"
   ],
   "answer": 1,
   "line": "l11",
   "hint": "Ouça a frase da Sam que começa com “I work in…”."
  },
  {
   "id": "d6",
   "q": "A que horas Davi deve ir amanhã?",
   "options": [
    "Às nove",
    "Às sete",
    "Às dez"
   ],
   "answer": 2,
   "line": "l13",
   "hint": "Aparecem dois horários na mesma frase: um é quando a Sam começa a trabalhar; o outro é para o Davi."
  }
 ],
 "expressions": [
  {
   "id": "e1",
   "en": "How was your…?",
   "pt": "Como foi o seu…?",
   "use": "Para perguntar sobre algo que já passou: How was your day? How was the flight?",
   "line": "l01"
  },
  {
   "id": "e2",
   "en": "I arrived at…",
   "pt": "Cheguei em / às…",
   "use": "Use at para lugar específico e para hora: I arrived at Heathrow at seven.",
   "line": "l02"
  },
  {
   "id": "e3",
   "en": "Did you…? — Yes, I did.",
   "pt": "Você…? — Sim.",
   "use": "Pergunta no passado. Depois de did, o verbo fica na forma básica: Did you get…? (não got). Resposta curta: Yes, I did / No, I didn't.",
   "line": "l03"
  },
  {
   "id": "e4",
   "en": "I went for a walk",
   "pt": "Fui dar uma volta",
   "use": "Go for a walk, go for a coffee, go for a run. No passado: went.",
   "line": "l06"
  },
  {
   "id": "e5",
   "en": "Freezing!",
   "pt": "Um gelo! / Muito frio!",
   "use": "Exagero comum para frio forte. Responde sozinho a Was it cold?",
   "line": "l08"
  },
  {
   "id": "e6",
   "en": "What do you do?",
   "pt": "O que você faz? (profissão)",
   "use": "A pergunta padrão sobre trabalho quando se conhece alguém. Não é sobre o que você está fazendo agora.",
   "line": "l09"
  },
  {
   "id": "e7",
   "en": "I'm a… / I work as a…",
   "pt": "Sou… / Trabalho como…",
   "use": "Profissão sempre com a ou an: I'm a visual artist. I work as an administrative assistant.",
   "line": "l10"
  },
  {
   "id": "e8",
   "en": "I'd love to.",
   "pt": "Eu adoraria.",
   "use": "Para aceitar um convite com entusiasmo, sem repetir o verbo.",
   "line": "l12"
  }
 ],
 "bonus": [
  {
   "en": "Lovely.",
   "pt": "Que bom / Que ótimo. Muito usado na Inglaterra."
  },
  {
   "en": "back home",
   "pt": "lá no seu país, na sua cidade de origem"
  },
  {
   "en": "See you tomorrow, then.",
   "pt": "Até amanhã, então."
  }
 ],
 "grammar": [
  {
   "id": "gr1",
   "title": "Contar o que aconteceu: o passado simples",
   "body": "Davi conta o dia de ontem usando verbos no passado. Alguns ganham -ed (arrive → arrived, rain → rained). Outros mudam de forma e precisam ser memorizados.",
   "examples": [
    [
     "be",
     "was",
     "I was really tired."
    ],
    [
     "sleep",
     "slept",
     "I slept for three hours."
    ],
    [
     "go",
     "went",
     "I went for a walk."
    ],
    [
     "get",
     "got",
     "I got the Tube."
    ]
   ],
   "note": "Para perguntar, use did + verbo na forma básica: Did you get the Tube? Na resposta afirmativa, o passado volta: Yes, I got the Tube."
  },
  {
   "id": "gr2",
   "title": "I'm ou I?",
   "body": "Na sua avaliação apareceu I'm work e I'm paint. I'm já significa I am, então não vem antes de outro verbo.",
   "examples": [
    [
     "I'm + profissão",
     "I'm a visual artist.",
     ""
    ],
    [
     "I'm + estado",
     "I'm tired.",
     ""
    ],
    [
     "I + ação",
     "I paint. I work as…",
     ""
    ],
    [
     "I + passado",
     "I was. I went.",
     ""
    ]
   ],
   "note": "Regra prática: se a palavra seguinte é uma ação, tire o 'm."
  }
 ],
 "culture": [
  {
   "title": "Falar do tempo",
   "body": "Comentar o tempo é o jeito mais comum de puxar conversa na Inglaterra. A resposta Freezing! And it rained, of course tem ironia: chuva em Londres é tão esperada que vira piada. Por isso Sam responde Welcome to London!"
  },
  {
   "title": "The Tube",
   "body": "É o metrô de Londres. De Heathrow ao centro, a linha Piccadilly do Tube é mais barata que a Elizabeth line e o Heathrow Express, porém mais demorada, por volta de 50 minutos até Piccadilly Circus. Manchester não tem Tube: lá o transporte sobre trilhos da cidade é o Metrolink, um sistema de bondes.",
   "source": "visitlondon"
  },
  {
   "title": "What do you do?",
   "body": "Ao conhecer alguém, é comum perguntar o trabalho logo no início. Uma resposta curta e clara (I'm a…, I work as…) seguida de uma pergunta de volta mantém a conversa andando: And you? / What about you?"
  }
 ],
 "pronunciation": [
  {
   "id": "p1",
   "phrase": "Did you get the Tube?",
   "sounds": "DI-dju get thə TUBE",
   "tip": "O d de did encontra o y de you e vira um som de dj, como em 'Djalma'. O the é fraco.",
   "line": "l03"
  },
  {
   "id": "p2",
   "phrase": "I went for a walk",
   "sounds": "ai WENT-fə-rə WÓK",
   "tip": "For e a quase desaparecem e se ligam: fə-rə. Em walk, o l não é pronunciado.",
   "line": "l06"
  },
  {
   "id": "p3",
   "phrase": "What do you do?",
   "sounds": "wɒ-də-jə DU",
   "tip": "Só o último do é forte. Os três primeiros sons saem rápidos e baixos.",
   "line": "l09"
  },
  {
   "id": "p4",
   "phrase": "I'm a visual artist",
   "sounds": "ai-mə VI-zhual AR-tist",
   "tip": "O a depois de I'm é fraco (mə), mas precisa estar lá. Em artist, o peso fica em AR.",
   "line": "l10"
  },
  {
   "id": "p5",
   "phrase": "I'd love to",
   "sounds": "aid LÓV-tə",
   "tip": "O to final é fraco, quase tə. O peso está em love.",
   "line": "l12"
  }
 ],
 "shadowing": {
  "lines": [
   "l02",
   "l04",
   "l06",
   "l10",
   "l12"
  ],
  "short": [
   "l10",
   "l12"
  ]
 },
 "simulation": {
  "intro": "Agora é você, não o Davi. A Sam faz uma pergunta por vez. Responda com as suas informações, usando o começo de frase como apoio.",
  "prompts": [
   {
    "id": "s2",
    "speaker": "S",
    "en": "And what do you do?",
    "pt": "E o que você faz?",
    "targets": [
     "e6",
     "e7"
    ],
    "hint": "I'm a… / I work as a… Lembre do a ou an antes da profissão. Termine com uma pergunta de volta.",
    "checklist": [
     "Usei a ou an antes da profissão",
     "Disse pelo menos duas coisas que faço",
     "Fiz uma pergunta de volta"
    ],
    "model": "I'm a visual artist and a singer. I also work as an administrative assistant in the public sector. What about you?",
    "short": true,
    "starter": "I'm a ____. I also work as ____. What about you?",
    "focus": "a/an antes da profissão",
    "focusCheck": 0,
    "grammar": "gr2"
   },
   {
    "id": "s1",
    "speaker": "S",
    "en": "So, how was your day yesterday?",
    "pt": "E aí, como foi o seu dia ontem?",
    "targets": [
     "e1",
     "gr1"
    ],
    "hint": "Diga como foi (tiring, busy, good) e conte duas coisas que fez, no passado: I was… I went… I worked…",
    "checklist": [
     "Disse como foi o dia",
     "Usei pelo menos dois verbos no passado",
     "Não usei I'm antes de outro verbo"
    ],
    "model": "It was busy, but good. I worked in the morning, and in the afternoon I went to the university. In the evening I was really tired, so I stayed at home.",
    "starter": "It was ____. In the morning I ____. Then I ____.",
    "focus": "verbos no passado",
    "focusCheck": 1,
    "grammar": "gr1"
   },
   {
    "id": "s3",
    "speaker": "S",
    "en": "Do you want to come to the shop tomorrow?",
    "pt": "Quer ir à loja amanhã?",
    "targets": [
     "e8"
    ],
    "hint": "Aceite o convite e combine um horário: I'd love to. What time…?",
    "checklist": [
     "Aceitei o convite com I'd love to",
     "Combinei ou perguntei o horário"
    ],
    "model": "I'd love to. What time is good for you? Is ten OK?",
    "starter": "I'd love to. What time ____?",
    "focus": "aceitar com I'd love to",
    "focusCheck": 0,
    "optional": true
   }
  ]
 },
 "sources": [
  {
   "id": "visitlondon",
   "title": "Visit London — London Heathrow Airport",
   "url": "https://visitlondon.com/traveller-information/travel-to-london/airport/heathrow",
   "note": "Opções de transporte de Heathrow ao centro, tempos e comparação de preço."
  },
  {
   "id": "geograph",
   "title": "Geograph — Heathrow Terminal 2 & 3 Underground Station (N Chadwick)",
   "url": "https://www.geograph.org.uk/photo/6590812",
   "note": "Foto CC BY-SA 2.0 usada na atividade de lugar real."
  }
 ],
 "external": [
  {
   "type": "complemento",
   "title": "British Council — A2 listening: Transport announcements",
   "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a2/transport-announcements",
   "use": "Retomar só depois deste episódio. Ouça com a transcrição aberta e marque palavras que você conhece no papel, mas não reconheceu no som. Não corresponde ao texto desta aula."
  }
 ],
 "repeat": [
  {
   "id": "r1",
   "en": "I'm a visual artist.",
   "pt": "Sou artista visual.",
   "focus": "Diga a frase inteira, com o a depois de I'm.",
   "line": "l10"
  },
  {
   "id": "r2",
   "en": "I went for a walk by the river.",
   "pt": "Fui dar uma volta perto do rio.",
   "focus": "Diga a frase inteira, sem pressa. Went é o passado de go.",
   "line": "l06"
  },
  {
   "id": "r3",
   "en": "I'd love to.",
   "pt": "Eu adoraria.",
   "focus": "Três palavras só. Use para aceitar um convite.",
   "line": "l12"
  }
 ],
 "pronFocus": "p4",
 "place": {
  "title": "Heathrow Terminals 2 & 3, estação do Tube",
  "caption": "Interior da estação da linha Piccadilly que atende os terminais 2 e 3 de Heathrow. É daqui que sai o trajeto mais barato e mais demorado até o centro de Londres, o mesmo que Davi fez.",
  "img": "https://s0.geograph.org.uk/geophotos/06/59/08/6590812_62c17089.jpg",
  "alt": "Interior de uma estação do metrô de Londres em Heathrow",
  "credit": "Foto: N Chadwick, 23 nov. 2019, Geograph",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
  "page": "https://www.geograph.org.uk/photo/6590812"
 },
 "notes": {
  "l01": [
   {
    "term": "How was…?",
    "explain": "Como foi…? Pergunta sobre algo que já passou. Was é o passado de is."
   },
   {
    "term": "So,",
    "explain": "No começo da frase, abre o assunto, como o nosso “Então,”."
   }
  ],
  "l02": [
   {
    "term": "Tiring",
    "explain": "Cansativo: descreve o que cansa. Tired descreve a pessoa: I'm tired."
   },
   {
    "term": "arrived at",
    "explain": "Arrive at + lugar ou hora: I arrived at Heathrow at seven."
   },
   {
    "term": "in the morning",
    "explain": "Da manhã. Também: in the afternoon, in the evening."
   }
  ],
  "l03": [
   {
    "term": "Did you get…?",
    "explain": "Pergunta no passado: did + verbo na forma básica (get, não got)."
   },
   {
    "term": "get the Tube",
    "explain": "Pegar o metrô. Também: get the bus, get a train."
   },
   {
    "term": "into town",
    "explain": "Até o centro da cidade."
   }
  ],
  "l04": [
   {
    "term": "Yes, I did.",
    "explain": "Resposta curta a uma pergunta com did. Negativa: No, I didn't."
   },
   {
    "term": "slow / cheap",
    "explain": "Demorado / barato. Opostos: fast / expensive."
   }
  ],
  "l05": [
   {
    "term": "what did you do",
    "explain": "O que você fez. Mesmo esquema: did + verbo básico (do)."
   },
   {
    "term": "after that",
    "explain": "Depois disso."
   }
  ],
  "l06": [
   {
    "term": "so",
    "explain": "Então, por isso: liga a causa (tired) à consequência (slept)."
   },
   {
    "term": "slept for three hours",
    "explain": "Slept é o passado de sleep. For + duração: for three hours."
   },
   {
    "term": "went for a walk",
    "explain": "Fui dar uma volta. Went é o passado de go."
   },
   {
    "term": "by the river",
    "explain": "Perto do rio, à beira do rio."
   }
  ],
  "l07": [
   {
    "term": "Lovely.",
    "explain": "Que bom. Muito usado na Inglaterra para reagir a algo positivo."
   },
   {
    "term": "Was it…?",
    "explain": "Estava…? Pergunta sobre como algo estava no passado."
   }
  ],
  "l08": [
   {
    "term": "Freezing!",
    "explain": "Muito frio. Exagero comum, responde sozinho a “Was it cold?”."
   },
   {
    "term": "it rained",
    "explain": "Choveu. Rain + -ed."
   },
   {
    "term": "of course",
    "explain": "Claro. Aqui com ironia: chover em Londres é esperado."
   }
  ],
  "l09": [
   {
    "term": "What do you do?",
    "explain": "Pergunta sobre profissão, não sobre o que a pessoa está fazendo agora."
   },
   {
    "term": "back home",
    "explain": "No seu país, na sua cidade de origem."
   }
  ],
  "l10": [
   {
    "term": "I'm a visual artist",
    "explain": "I'm a + profissão. O a é obrigatório."
   },
   {
    "term": "I paint",
    "explain": "Ação: I + verbo, sem I'm."
   },
   {
    "term": "also",
    "explain": "Também. Vem antes do verbo: I also work."
   },
   {
    "term": "work as an",
    "explain": "Trabalhar como. An antes de som de vogal: an administrative assistant."
   }
  ],
  "l11": [
   {
    "term": "frame shop",
    "explain": "Loja de molduras. Frame é moldura e também o verbo emoldurar."
   },
   {
    "term": "We frame",
    "explain": "A gente emoldura: frame como verbo."
   },
   {
    "term": "You should",
    "explain": "Você deveria: uma sugestão gentil."
   },
   {
    "term": "come and see",
    "explain": "Vir conhecer, vir ver."
   }
  ],
  "l12": [
   {
    "term": "I'd love to.",
    "explain": "I would love to: aceita um convite sem repetir o verbo."
   },
   {
    "term": "Maybe",
    "explain": "Talvez."
   }
  ],
  "l13": [
   {
    "term": "Tomorrow's good",
    "explain": "Tomorrow is good: amanhã está bom."
   },
   {
    "term": "I start at nine",
    "explain": "Start at + hora. Presente para rotina."
   },
   {
    "term": "come at ten",
    "explain": "Venha às dez: verbo sozinho no início é um pedido ou instrução."
   }
  ],
  "l14": [
   {
    "term": "See you tomorrow",
    "explain": "Até amanhã. Também: see you later, see you soon."
   },
   {
    "term": "then",
    "explain": "No fim da frase: então, nesse caso."
   }
  ]
 },
 "practice": [
  {
   "id": "pr1",
   "kind": "Prática",
   "city": "Londres",
   "title": "Do aeroporto ao centro pelo Tube",
   "intro": "Em Heathrow, a linha Piccadilly do Tube tem estações nos terminais 2 e 3, no 4 e no 5. É a opção mais barata e mais demorada até o centro: cerca de 50 minutos. Dá para pagar por aproximação, com cartão ou celular.",
   "steps": [
    "Siga as placas do Underground até a estação do seu terminal. Nos terminais 2 e 3, ela fica entre os dois, ligada por uma passagem subterrânea; no 4, abaixo do desembarque; no 5, no subsolo.",
    "Na catraca, encoste o cartão por aproximação ou o celular no leitor amarelo para entrar (touch in).",
    "Use o mesmo cartão ou aparelho na entrada e na saída, e mantenha outros cartões longe do leitor. Misturar pode gerar cobrança errada.",
    "Antes de embarcar, confira o destino do trem. Se tiver dúvida, pergunte a um funcionário.",
    "Na saída, encoste o mesmo cartão no leitor amarelo de novo (touch out). Há um limite de gasto por dia e por semana."
   ],
   "phrases": [
    {
     "id": "pr1a",
     "en": "Excuse me, where's the Underground?",
     "pt": "Com licença, onde fica o metrô?"
    },
    {
     "id": "pr1b",
     "en": "Is this the right platform for central London?",
     "pt": "Esta é a plataforma certa para o centro de Londres?"
    },
    {
     "id": "pr1c",
     "en": "Can I pay with my card here?",
     "pt": "Posso pagar com meu cartão aqui?"
    }
   ],
   "manchester": "Manchester não tem Tube. O bonde da cidade, o Metrolink, também aceita aproximação, mas os leitores ficam nas plataformas: encoste ao entrar e ao sair, com o mesmo cartão. Quem não encosta na saída em até 120 minutos paga uma tarifa de viagem incompleta.",
   "image": {
    "img": "https://s0.geograph.org.uk/geophotos/03/94/07/3940789_7dbcf59c.jpg",
    "alt": "Catracas de uma estação do metrô de Londres",
    "credit": "Foto: Robin Stott, 27 mai. 2013, Geograph (catracas da estação Marylebone)",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
    "page": "https://www.geograph.org.uk/photo/3940789",
    "note": "Foto de 2013: o visual das catracas pode ter mudado."
   },
   "sources": [
    {
     "title": "Heathrow — London Underground",
     "url": "https://www.heathrow.com/transport-and-directions/by-rail-or-train/london-underground",
     "checked": "27/10/2026"
    },
    {
     "title": "TfL — Contactless and mobile pay as you go",
     "url": "https://www.tfl.gov.uk/fares/how-to-pay-and-where-to-buy-tickets-and-oyster/pay-as-you-go/contactless-and-mobile-pay-as-you-go",
     "checked": "27/10/2026"
    },
    {
     "title": "TfL — Card clash",
     "url": "https://tfl.gov.uk/fares/how-to-pay-and-where-to-buy-tickets-and-oyster/pay-as-you-go/card-clash",
     "checked": "27/10/2026"
    },
    {
     "title": "TfGM — Contactless terms (Metrolink)",
     "url": "https://tfgm.com/ways-to-pay/contactless/terms",
     "checked": "27/10/2026"
    }
   ]
  },
  {
   "id": "pr2",
   "kind": "Curiosidade",
   "city": "Reino Unido",
   "title": "A cuppa: o chá na rotina",
   "intro": "Oferecer chá é um gesto comum de boas-vindas, em casa e no trabalho. Numa pesquisa do YouGov de 2018, cerca de 8 em cada 10 pessoas que tomam chá colocam leite, e a maioria coloca o leite depois do chá. Cerca de um quarto adiciona açúcar.",
   "steps": [
    "Quando alguém oferecer, aceite ou recuse de forma simples. Recusar não é falta de educação.",
    "Se aceitar, diga como prefere: com ou sem leite, com ou sem açúcar.",
    "Em muitos escritórios, quem vai preparar chá pergunta aos colegas se querem também. É um costume comum, não uma regra, e varia de lugar para lugar."
   ],
   "phrases": [
    {
     "id": "pr2a",
     "en": "Do you fancy a cuppa?",
     "pt": "Quer um chá?",
     "voice": "S"
    },
    {
     "id": "pr2b",
     "en": "Yes, please. Milk, no sugar.",
     "pt": "Sim, por favor. Com leite, sem açúcar."
    },
    {
     "id": "pr2c",
     "en": "I'm fine, thanks.",
     "pt": "Não precisa, obrigado."
    }
   ],
   "illustration": "kitchen",
   "sources": [
    {
     "title": "YouGov — Should milk go in a cup of tea first or last? (2018)",
     "url": "https://yougov.com/en-gb/articles/21255-should-milk-go-cup-tea-first-or-last",
     "checked": "27/10/2026"
    }
   ]
  }
 ],
 "base": "content/ep01/",
 "audio": {
  "lines": {
   "l01": {
    "src": "audio/l01.mp3",
    "duration": 2.52
   },
   "l02": {
    "src": "audio/l02.mp3",
    "duration": 4.39
   },
   "l03": {
    "src": "audio/l03.mp3",
    "duration": 2.69
   },
   "l04": {
    "src": "audio/l04.mp3",
    "duration": 3.33
   },
   "l05": {
    "src": "audio/l05.mp3",
    "duration": 2.22
   },
   "l06": {
    "src": "audio/l06.mp3",
    "duration": 6.31
   },
   "l07": {
    "src": "audio/l07.mp3",
    "duration": 1.88
   },
   "l08": {
    "src": "audio/l08.mp3",
    "duration": 2.47
   },
   "l09": {
    "src": "audio/l09.mp3",
    "duration": 3.14
   },
   "l10": {
    "src": "audio/l10.mp3",
    "duration": 5.97
   },
   "l11": {
    "src": "audio/l11.mp3",
    "duration": 5.95
   },
   "l12": {
    "src": "audio/l12.mp3",
    "duration": 2.39
   },
   "l13": {
    "src": "audio/l13.mp3",
    "duration": 3.26
   },
   "l14": {
    "src": "audio/l14.mp3",
    "duration": 2.15
   }
  },
  "dialogue": {
   "clear": {
    "src": "audio/dialogue-clear.mp3",
    "duration": 59.58,
    "cues": [
     {
      "line": "l01",
      "start": 0.4,
      "end": 2.92
     },
     {
      "line": "l02",
      "start": 3.67,
      "end": 8.06
     },
     {
      "line": "l03",
      "start": 8.81,
      "end": 11.5
     },
     {
      "line": "l04",
      "start": 12.25,
      "end": 15.58
     },
     {
      "line": "l05",
      "start": 16.33,
      "end": 18.55
     },
     {
      "line": "l06",
      "start": 19.3,
      "end": 25.61
     },
     {
      "line": "l07",
      "start": 26.36,
      "end": 28.24
     },
     {
      "line": "l08",
      "start": 28.99,
      "end": 31.46
     },
     {
      "line": "l09",
      "start": 32.21,
      "end": 35.35
     },
     {
      "line": "l10",
      "start": 36.1,
      "end": 42.07
     },
     {
      "line": "l11",
      "start": 42.82,
      "end": 48.77
     },
     {
      "line": "l12",
      "start": 49.52,
      "end": 51.91
     },
     {
      "line": "l13",
      "start": 52.66,
      "end": 55.93
     },
     {
      "line": "l14",
      "start": 56.68,
      "end": 58.83
     }
    ]
   },
   "natural": {
    "src": "audio/dialogue-natural.mp3",
    "duration": 47.29,
    "cues": [
     {
      "line": "l01",
      "start": 0.4,
      "end": 2.68
     },
     {
      "line": "l02",
      "start": 2.98,
      "end": 6.97
     },
     {
      "line": "l03",
      "start": 7.27,
      "end": 9.58
     },
     {
      "line": "l04",
      "start": 9.88,
      "end": 12.73
     },
     {
      "line": "l05",
      "start": 13.03,
      "end": 14.91
     },
     {
      "line": "l06",
      "start": 15.21,
      "end": 20.55
     },
     {
      "line": "l07",
      "start": 20.85,
      "end": 22.51
     },
     {
      "line": "l08",
      "start": 22.81,
      "end": 24.96
     },
     {
      "line": "l09",
      "start": 25.26,
      "end": 28.14
     },
     {
      "line": "l10",
      "start": 28.44,
      "end": 33.65
     },
     {
      "line": "l11",
      "start": 33.95,
      "end": 39.39
     },
     {
      "line": "l12",
      "start": 39.69,
      "end": 41.74
     },
     {
      "line": "l13",
      "start": 42.04,
      "end": 44.94
     },
     {
      "line": "l14",
      "start": 45.24,
      "end": 46.99
     }
    ]
   }
  },
  "prompts": {
   "s2": {
    "src": "audio/s2-q.mp3",
    "duration": 1.6
   },
   "s1": {
    "src": "audio/s1-q.mp3",
    "duration": 2.3
   },
   "s3": {
    "src": "audio/s3-q.mp3",
    "duration": 2.3
   }
  },
  "models": {
   "s2": {
    "src": "audio/s2-model.mp3",
    "duration": 8.11
   },
   "s1": {
    "src": "audio/s1-model.mp3",
    "duration": 10.92
   },
   "s3": {
    "src": "audio/s3-model.mp3",
    "duration": 4.25
   }
  },
  "pron": {
   "p1": {
    "src": "audio/p1.mp3",
    "duration": 1.81
   },
   "p2": {
    "src": "audio/p2.mp3",
    "duration": 1.66
   },
   "p3": {
    "src": "audio/p3.mp3",
    "duration": 1.24
   },
   "p4": {
    "src": "audio/p4.mp3",
    "duration": 1.92
   },
   "p5": {
    "src": "audio/p5.mp3",
    "duration": 1.37
   }
  },
  "repeat": {
   "r1": {
    "src": "audio/r1.mp3",
    "duration": 1.73,
    "slow": "audio/r1-slow.mp3",
    "slowDuration": 2.24
   },
   "r2": {
    "src": "audio/r2.mp3",
    "duration": 2.35,
    "slow": "audio/r2-slow.mp3",
    "slowDuration": 2.92
   },
   "r3": {
    "src": "audio/r3.mp3",
    "duration": 1.24,
    "slow": "audio/r3-slow.mp3",
    "slowDuration": 1.64
   }
  },
  "practice": {
   "pr1a": {
    "src": "audio/pr1a.mp3",
    "duration": 2.54
   },
   "pr1b": {
    "src": "audio/pr1b.mp3",
    "duration": 2.99
   },
   "pr1c": {
    "src": "audio/pr1c.mp3",
    "duration": 2.09
   },
   "pr2a": {
    "src": "audio/pr2a.mp3",
    "duration": 1.73
   },
   "pr2b": {
    "src": "audio/pr2b.mp3",
    "duration": 2.62
   },
   "pr2c": {
    "src": "audio/pr2c.mp3",
    "duration": 1.64
   }
  }
 }
};
