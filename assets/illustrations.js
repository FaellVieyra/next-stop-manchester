// Ilustrações originais (SVG), desenhadas para o projeto. As cores vêm dos
// tokens --ill-* em styles.css, então acompanham o tema claro e o escuro.
window.ILLUSTRATIONS = {
  kitchen: `<svg viewBox="0 0 640 360" role="img" aria-labelledby="ill-k-t">
  <title id="ill-k-t">Cozinha do apartamento em Londres, de manhã. Sam, em pé perto do balcão, segura uma caneca. Davi está sentado à mesa. Pela janela, telhados e chuva.</title>
  <rect width="640" height="360" fill="var(--ill-wall)"/>
  <rect x="70" y="36" width="210" height="150" rx="4" fill="var(--ill-countertop)"/>
  <rect x="78" y="44" width="194" height="134" fill="var(--ill-sky)"/>
  <path d="M78 150 L78 132 L104 132 L104 120 L112 120 L112 132 L138 132 L150 118 L176 118 L176 108 L184 108 L184 118 L214 118 L214 128 L246 128 L246 114 L254 114 L254 128 L272 128 L272 178 L78 178 Z" fill="var(--ill-roof)"/>
  <g stroke="var(--ill-rain)" stroke-width="1.6" stroke-linecap="round">
    <path d="M96 56 l-6 16M128 62 l-6 16M160 52 l-6 16M196 60 l-6 16M232 54 l-6 16M258 66 l-6 16M112 92 l-6 16M146 86 l-6 16M182 94 l-6 16M216 88 l-6 16M246 96 l-6 16"/>
  </g>
  <rect x="173" y="44" width="4" height="134" fill="var(--ill-countertop)"/>
  <rect x="78" y="109" width="194" height="4" fill="var(--ill-countertop)"/>
  <rect x="0" y="350" width="640" height="10" fill="var(--ill-floor)"/>
  <rect x="0" y="236" width="206" height="114" fill="var(--ill-counter)"/>
  <rect x="0" y="228" width="210" height="10" rx="2" fill="var(--ill-countertop)"/>
  <path d="M84 228 L88 198 Q104 188 120 198 L124 228 Z" fill="var(--ill-mug)" stroke="var(--ill-line)" stroke-width="2"/>
  <path d="M120 204 Q134 206 132 220" fill="none" stroke="var(--ill-line)" stroke-width="3" stroke-linecap="round"/>
  <path d="M86 202 L74 196" stroke="var(--ill-line)" stroke-width="4" stroke-linecap="round"/>
  <rect x="98" y="186" width="12" height="6" rx="2" fill="var(--ill-line)"/>
  <rect x="34" y="210" width="18" height="18" rx="3" fill="var(--sam-top)"/>
  <rect x="236" y="268" width="14" height="82" rx="5" fill="var(--ill-trousers)"/>
  <rect x="254" y="268" width="14" height="82" rx="5" fill="var(--ill-trousers)"/>
  <rect x="226" y="172" width="52" height="104" rx="20" fill="var(--sam-top)"/>
  <rect x="246" y="156" width="12" height="20" fill="var(--skin-a)"/>
  <circle cx="252" cy="140" r="20" fill="var(--skin-a)"/>
  <path d="M231 144 C228 116 276 114 273 142 C266 130 240 128 231 144 Z" fill="var(--hair-a)"/>
  <circle cx="270" cy="124" r="9" fill="var(--hair-a)"/>
  <path d="M232 192 L220 232 L238 234" fill="none" stroke="var(--sam-top)" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="234" y="220" width="18" height="18" rx="3" fill="var(--ill-mug)" stroke="var(--ill-line)" stroke-width="2"/>
  <rect x="356" y="244" width="160" height="10" rx="2" fill="var(--ill-wood)"/>
  <rect x="366" y="254" width="8" height="96" fill="var(--ill-wood)"/>
  <rect x="404" y="226" width="18" height="18" rx="3" fill="var(--ill-mug)" stroke="var(--ill-line)" stroke-width="2"/>
  <rect x="552" y="186" width="10" height="164" rx="3" fill="var(--ill-wood)"/>
  <rect x="476" y="282" width="86" height="8" rx="3" fill="var(--ill-wood)"/>
  <rect x="440" y="270" width="72" height="18" rx="9" fill="var(--ill-trousers2)"/>
  <rect x="440" y="280" width="15" height="70" rx="6" fill="var(--ill-trousers2)"/>
  <rect x="488" y="182" width="54" height="100" rx="20" fill="var(--davi-top)"/>
  <rect x="508" y="166" width="12" height="20" fill="var(--skin-b)"/>
  <circle cx="514" cy="150" r="20" fill="var(--skin-b)"/>
  <g fill="var(--hair-b)"><circle cx="497" cy="142" r="7"/><circle cx="505" cy="134" r="8"/><circle cx="515" cy="131" r="8"/><circle cx="525" cy="135" r="8"/><circle cx="531" cy="144" r="6"/></g>
  <path d="M494 202 L462 238 L430 236" fill="none" stroke="var(--davi-top)" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  sam: `<svg viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="36" fill="var(--ill-sky)"/><rect x="14" y="50" width="44" height="30" rx="16" fill="var(--sam-top)"/><rect x="31" y="40" width="10" height="14" fill="var(--skin-a)"/><circle cx="36" cy="30" r="14" fill="var(--skin-a)"/><path d="M21 33 C19 12 54 11 51 31 C46 22 28 21 21 33 Z" fill="var(--hair-a)"/><circle cx="49" cy="18" r="6" fill="var(--hair-a)"/></svg>`,
  davi: `<svg viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="36" fill="var(--ill-sky)"/><rect x="14" y="50" width="44" height="30" rx="16" fill="var(--davi-top)"/><rect x="31" y="40" width="10" height="14" fill="var(--skin-b)"/><circle cx="36" cy="30" r="14" fill="var(--skin-b)"/><g fill="var(--hair-b)"><circle cx="25" cy="23" r="5"/><circle cx="31" cy="18" r="6"/><circle cx="38" cy="16" r="6"/><circle cx="45" cy="19" r="6"/><circle cx="49" cy="25" r="4.5"/></g></svg>`,
  poster: `<svg viewBox="0 0 800 420" role="img" aria-labelledby="ill-p-t">
  <title id="ill-p-t">Cartaz da viagem: à esquerda, o sertão em barro com um mandacaru feito de blocos, que se desfazem em pixels; no centro, Londres com a torre do relógio e uma cúpula; à direita, Manchester com casas de tijolo e a chaminé de uma antiga fábrica. Um trem atravessa tudo da esquerda para a direita.</title>
  <rect width="800" height="420" fill="var(--pst-sky)"/>
  <rect y="250" width="800" height="90" fill="var(--pst-sky2)"/>
  <circle cx="236" cy="92" r="46" fill="var(--pst-sun)"/>
  <!-- sertão -->
  <path d="M0 262 H40 V250 H92 V240 H150 V252 H196 V264 H240 V276 H290 V340 H0 Z" fill="var(--pst-clay)"/>
  <g fill="var(--pst-cactus)"><rect x="92" y="104" width="24" height="150"/><rect x="58" y="170" width="34" height="16"/><rect x="58" y="122" width="16" height="64"/><rect x="116" y="152" width="30" height="16"/><rect x="130" y="90" width="16" height="78"/></g>
  <g fill="var(--pst-clay)"><rect x="150" y="238" width="14" height="14" opacity="1"/><rect x="176" y="214" width="12" height="12" opacity="0.9"/><rect x="204" y="196" width="10" height="10" opacity="0.8"/><rect x="230" y="184" width="10" height="10" opacity="0.7"/><rect x="258" y="176" width="8" height="8" opacity="0.6"/><rect x="284" y="172" width="8" height="8" opacity="0.5"/><rect x="310" y="170" width="6" height="6" opacity="0.4"/><rect x="166" y="190" width="8" height="8" opacity="0.6"/><rect x="198" y="168" width="6" height="6" opacity="0.5"/></g>
  <!-- Londres -->
  <g fill="var(--pst-city)">
    <rect x="300" y="236" width="44" height="104"/>
    <rect x="352" y="146" width="26" height="194"/><path d="M350 146 L365 108 L380 146 Z"/>
    <rect x="386" y="214" width="40" height="126"/>
    <path d="M432 340 V228 a42 42 0 0 1 84 0 V340 Z"/><rect x="470" y="168" width="8" height="20"/>
    <rect x="522" y="248" width="34" height="92"/>
  </g>
  <circle cx="365" cy="170" r="8" fill="var(--pst-window)"/>
  <!-- Manchester -->
  <g fill="var(--pst-brick)">
    <rect x="574" y="232" width="96" height="108"/>
    <rect x="690" y="120" width="18" height="220"/>
    <path d="M676 340 V262 L700 244 L724 262 L748 244 L772 262 L800 244 V340 Z"/>
  </g>
  <rect x="686" y="120" width="26" height="8" fill="var(--pst-brick-dark)"/>
  <g fill="var(--pst-window)">
    <rect x="584" y="246" width="12" height="16"/><rect x="606" y="246" width="12" height="16"/><rect x="628" y="246" width="12" height="16"/><rect x="650" y="246" width="12" height="16"/>
    <rect x="584" y="276" width="12" height="16"/><rect x="606" y="276" width="12" height="16"/><rect x="628" y="276" width="12" height="16"/><rect x="650" y="276" width="12" height="16"/>
    <rect x="692" y="284" width="10" height="14"/><rect x="740" y="282" width="10" height="14"/><rect x="782" y="282" width="10" height="14"/>
  </g>
  <!-- placa -->
  <rect x="592" y="176" width="2" height="56" fill="var(--pst-sign)"/>
  <rect x="520" y="150" width="150" height="34" rx="3" fill="var(--pst-sign)"/>
  <text x="595" y="173" text-anchor="middle" font-family="Bricolage Grotesque, Segoe UI, sans-serif" font-weight="700" font-size="16" letter-spacing="2" fill="var(--pst-sign-ink)">MANCHESTER</text>
  <!-- trilho e trem -->
  <rect y="340" width="800" height="110" fill="var(--pst-ground)"/>
  <rect y="352" width="800" height="4" fill="var(--pst-rail)"/>
  <g fill="var(--pst-rail)" opacity="0.55"><rect x="6" y="358" width="18" height="5"/><rect x="38" y="358" width="18" height="5"/><rect x="70" y="358" width="18" height="5"/><rect x="102" y="358" width="18" height="5"/><rect x="134" y="358" width="18" height="5"/><rect x="166" y="358" width="18" height="5"/><rect x="198" y="358" width="18" height="5"/><rect x="230" y="358" width="18" height="5"/><rect x="262" y="358" width="18" height="5"/><rect x="294" y="358" width="18" height="5"/><rect x="326" y="358" width="18" height="5"/><rect x="358" y="358" width="18" height="5"/><rect x="390" y="358" width="18" height="5"/><rect x="422" y="358" width="18" height="5"/><rect x="454" y="358" width="18" height="5"/><rect x="486" y="358" width="18" height="5"/><rect x="518" y="358" width="18" height="5"/><rect x="550" y="358" width="18" height="5"/><rect x="582" y="358" width="18" height="5"/><rect x="614" y="358" width="18" height="5"/><rect x="646" y="358" width="18" height="5"/><rect x="678" y="358" width="18" height="5"/><rect x="710" y="358" width="18" height="5"/><rect x="742" y="358" width="18" height="5"/><rect x="774" y="358" width="18" height="5"/></g>
  <g>
    <rect x="236" y="300" width="300" height="48" rx="8" fill="var(--pst-train)"/>
    <path d="M536 300 H556 a22 22 0 0 1 22 22 V348 H536 Z" fill="var(--pst-train-nose)"/>
    <g fill="var(--pst-window)"><rect x="252" y="310" width="34" height="16" rx="2"/><rect x="298" y="310" width="34" height="16" rx="2"/><rect x="344" y="310" width="34" height="16" rx="2"/><rect x="390" y="310" width="34" height="16" rx="2"/><rect x="436" y="310" width="34" height="16" rx="2"/><rect x="482" y="310" width="34" height="16" rx="2"/><rect x="546" y="310" width="22" height="16" rx="3"/></g>
    <rect x="236" y="334" width="342" height="5" fill="var(--pst-train-stripe)"/>
    <g fill="var(--pst-rail)"><circle cx="270" cy="350" r="6"/><circle cx="330" cy="350" r="6"/><circle cx="460" cy="350" r="6"/><circle cx="530" cy="350" r="6"/></g>
  </g>
  <text x="40" y="398" font-family="Bricolage Grotesque, Segoe UI, sans-serif" font-weight="700" font-size="22" fill="var(--pst-ground-ink)">Cotegipe → London → Manchester</text>
</svg>`,
  gallery: `<svg viewBox="0 0 640 240" role="img" aria-labelledby="ill-g-t">
  <title id="ill-g-t">Parede de galeria com três obras: um mandacaru em blocos cor de barro, uma composição de círculos e uma paisagem de faixas. Um banco à frente e uma pequena placa de legenda.</title>
  <rect width="640" height="240" fill="var(--ill-wall)"/>
  <rect y="204" width="640" height="36" fill="var(--ill-floor)"/>
  <rect y="200" width="640" height="4" fill="var(--ill-countertop)"/>
  <!-- obra 1 -->
  <rect x="58" y="40" width="130" height="120" fill="var(--ill-line)"/>
  <rect x="64" y="46" width="118" height="108" fill="var(--pst-sky)"/>
  <rect x="64" y="128" width="118" height="26" fill="var(--pst-clay)"/>
  <g fill="var(--pst-cactus)"><rect x="118" y="62" width="12" height="75"/><rect x="101" y="95" width="17" height="8"/><rect x="101" y="71" width="8" height="32"/><rect x="130" y="86" width="15" height="8"/><rect x="137" y="55" width="8" height="39"/></g>
  <!-- obra 2 -->
  <rect x="252" y="28" width="136" height="148" fill="var(--ill-line)"/>
  <rect x="258" y="34" width="124" height="136" fill="var(--ill-mug)"/>
  <circle cx="300" cy="84" r="30" fill="var(--pst-sun)"/><circle cx="342" cy="124" r="22" fill="var(--pst-brick)"/><circle cx="292" cy="140" r="12" fill="var(--pst-sign)"/>
  <!-- obra 3 -->
  <rect x="452" y="52" width="130" height="96" fill="var(--ill-line)"/>
  <rect x="458" y="58" width="118" height="84" fill="var(--pst-sky2)"/>
  <rect x="458" y="100" width="118" height="14" fill="var(--pst-city)"/><rect x="458" y="114" width="118" height="28" fill="var(--pst-brick)"/>
  <!-- legenda e banco -->
  <rect x="396" y="112" width="34" height="22" rx="2" fill="var(--ill-mug)" stroke="var(--ill-line)" stroke-width="1.5"/>
  <rect x="402" y="119" width="20" height="2.5" fill="var(--ill-line)"/><rect x="402" y="125" width="14" height="2.5" fill="var(--ill-line)"/>
  <rect x="236" y="178" width="168" height="12" rx="3" fill="var(--ill-wood)"/>
  <rect x="250" y="190" width="8" height="18" fill="var(--ill-line)"/><rect x="382" y="190" width="8" height="18" fill="var(--ill-line)"/>
</svg>`
};
