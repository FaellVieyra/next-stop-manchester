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
  davi: `<svg viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="36" fill="var(--ill-sky)"/><rect x="14" y="50" width="44" height="30" rx="16" fill="var(--davi-top)"/><rect x="31" y="40" width="10" height="14" fill="var(--skin-b)"/><circle cx="36" cy="30" r="14" fill="var(--skin-b)"/><g fill="var(--hair-b)"><circle cx="25" cy="23" r="5"/><circle cx="31" cy="18" r="6"/><circle cx="38" cy="16" r="6"/><circle cx="45" cy="19" r="6"/><circle cx="49" cy="25" r="4.5"/></g></svg>`
};
