import { useState, useEffect, useRef } from "react";

const CSS = `
  *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
  body{background:#e5e5e5;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Nunito',sans-serif}
  .btn-duo{display:block;width:100%;padding:16px;border-radius:16px;font-size:17px;font-weight:900;color:#fff;border:none;border-bottom:5px solid rgba(0,0,0,.25);transition:transform .1s,border-bottom-width .1s;letter-spacing:.3px;cursor:pointer;font-family:'Nunito',sans-serif}
  .btn-duo:active{transform:translateY(3px);border-bottom-width:2px}
  .duo-progress{height:16px;background:#e5e5e5;border-radius:8px;overflow:hidden;flex:1}
  .duo-progress-fill{height:100%;background:linear-gradient(90deg,#58cc02,#78e002);border-radius:8px;transition:width .7s cubic-bezier(.34,1.56,.64,1);box-shadow:0 2px 4px rgba(88,204,2,.4)}
  .duo-card{background:#fff;border:2.5px solid #e5e5e5;border-radius:20px;border-bottom:5px solid #e5e5e5;transition:transform .1s,border-bottom-width .1s}
  .duo-card:active{transform:translateY(3px);border-bottom-width:2px}
  .mod-icon{width:68px;height:68px;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:32px;flex-shrink:0}
  .screen{position:absolute;inset:0;display:flex;flex-direction:column;overflow:hidden;background:#fff}
  .scroll{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch}
  @keyframes bounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-18px)}70%{transform:translateY(-8px)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes pop{0%{transform:scale(1)}45%{transform:scale(1.22)}100%{transform:scale(1)}}
  @keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
  @keyframes blink{0%,89%,100%{transform:scaleY(1)}93%{transform:scaleY(.05)}}
  @keyframes wingL{0%,100%{transform:rotate(-14deg)}50%{transform:rotate(-26deg)}}
  @keyframes wingR{0%,100%{transform:rotate(14deg)}50%{transform:rotate(26deg)}}
  @keyframes flameFlick{0%,100%{transform:scaleY(1) skewX(0)}33%{transform:scaleY(1.25) skewX(6deg)}66%{transform:scaleY(.8) skewX(-5deg)}}
  @keyframes breathe{0%{transform:scale(1)}100%{transform:scale(1.22)}}
  @keyframes ringOut{0%{r:4;opacity:.9}100%{r:46;opacity:0}}
  @keyframes tongueMoveU{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
  @keyframes tongueMoveD{0%,100%{transform:translateY(0)}50%{transform:translateY(14px)}}
  @keyframes tongueWipe{0%{transform:translateX(-16px)}50%{transform:translateX(16px)}100%{transform:translateX(-16px)}}
  @keyframes motorShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
  @keyframes jawDrop{0%,100%{transform:translateY(0)}50%{transform:translateY(11px)}}
  @keyframes waveFlow{0%{stroke-dashoffset:50}100%{stroke-dashoffset:0}}
  @keyframes noteRise{0%{transform:scaleY(.2);opacity:.2}100%{transform:scaleY(1);opacity:1}}
  @keyframes confetti{0%{transform:translateY(-10px) rotate(0) scale(1);opacity:1}100%{transform:translateY(110px) rotate(900deg) scale(.3);opacity:0}}
  @keyframes star{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.3) rotate(180deg)}}
  @keyframes xpUp{from{transform:scale(.4);opacity:0}to{transform:scale(1);opacity:1}}
  @keyframes glowPulse{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.5)}70%{box-shadow:0 0 0 14px rgba(239,68,68,0)}}
  @keyframes waveBar{0%,100%{transform:scaleY(.2)}50%{transform:scaleY(1)}}
  @keyframes timerPop{0%{transform:scale(1)}50%{transform:scale(1.18)}100%{transform:scale(1)}}
`;

const MODULES=[
  {id:"respiracion",title:"Respiración",emoji:"🌬️",color:"#4FC3F7",dark:"#0277BD",bg:"#E1F5FE",
    lessons:[
      {id:"r1",title:"Respiración profunda",xp:10,steps:[
        {instruction:"Pon la mano en tu barriga",visual:"belly",tip:"Siente cómo sube y baja",action:"Inhala 4 seg…",duration:4},
        {instruction:"Aguanta el aire",visual:"hold",tip:"Hombros relajados",action:"Aguanta 2 seg…",duration:2},
        {instruction:"Exhala muy lento",visual:"exhale",tip:"Como enfriar una sopa",action:"Exhala 6 seg…",duration:6},
      ]},
      {id:"r2",title:"Soplar la vela",xp:15,steps:[
        {instruction:"Sopla sin apagar la vela",visual:"candle",tip:"Soplo suave",action:"Sopla 5 seg…",duration:5},
        {instruction:"¡Apágala de un soplo!",visual:"candle_off",tip:"Inhala profundo antes",action:"¡Un soplo!",duration:3},
      ]},
    ]},
  {id:"labios",title:"Labios",emoji:"👄",color:"#F06292",dark:"#AD1457",bg:"#FCE4EC",
    lessons:[
      {id:"l1",title:"Sonrisa y fruncir",xp:10,steps:[
        {instruction:"Gran sonrisa mostrando dientes",visual:"smile",tip:"¡Muestra todos los dientes!",action:"Mantén 5 seg",duration:5},
        {instruction:"Frunce los labios",visual:"pucker",tip:"Como dar un beso",action:"Mantén 5 seg",duration:5},
        {instruction:"Alterna: sonrisa ↔ fruncir",visual:"alternate",tip:"10 veces seguidas",action:"¡A ritmo!",duration:8},
      ]},
      {id:"l2",title:"Motor de labios",xp:15,steps:[
        {instruction:"Vibra los labios",visual:"motor",tip:"Relaja los labios",action:"Brrrrr 5 seg",duration:5},
        {instruction:"Repite PA-PA-PA",visual:"pa",tip:"Acentúa con fuerza",action:"PA-PA-PA × 10",duration:6},
        {instruction:"Repite BA-BA-BA",visual:"ba",tip:"Siente la vibración",action:"BA-BA-BA × 10",duration:6},
      ]},
    ]},
  {id:"lengua",title:"Lengua",emoji:"👅",color:"#FF8A65",dark:"#BF360C",bg:"#FBE9E7",
    lessons:[
      {id:"le1",title:"Movimientos básicos",xp:10,steps:[
        {instruction:"Lengua hacia arriba",visual:"tongue_up",tip:"Sin mover la cabeza",action:"× 5 rep",duration:6},
        {instruction:"Lengua a la barbilla",visual:"tongue_down",tip:"Lo más abajo posible",action:"× 5 rep",duration:6},
        {instruction:"Lengua de lado a lado",visual:"tongue_side",tip:"Como limpiaparabrisas",action:"× 10 mov",duration:8},
      ]},
      {id:"le2",title:"Sílabas clave",xp:15,steps:[
        {instruction:"Repite TA-TA-TA",visual:"ta",tip:"Lengua toca el paladar",action:"TA-TA-TA × 10",duration:6},
        {instruction:"Repite LA-LA-LA",visual:"la",tip:"Voz musical y clara",action:"LA-LA-LA × 10",duration:6},
        {instruction:"PA-TA-KA coordinación",visual:"pataka",tip:"¡Ejercicio esencial! ⭐",action:"PA-TA-KA × 5",duration:10},
      ]},
    ]},
  {id:"mandibula",title:"Mandíbula",emoji:"🦷",color:"#81C784",dark:"#2E7D32",bg:"#E8F5E9",
    lessons:[
      {id:"m1",title:"Abrir y cerrar",xp:10,steps:[
        {instruction:"Abre la boca al máximo",visual:"open_wide",tip:"Lento y controlado",action:"Mantén 5 seg",duration:5},
        {instruction:"Cierra muy suavemente",visual:"close",tip:"Sin apretar los dientes",action:"× 5 rep",duration:7},
        {instruction:"Mandíbula de lado a lado",visual:"jaw_side",tip:"Como masticando chicle",action:"× 10 mov",duration:8},
      ]},
    ]},
  {id:"voz",title:"Voz",emoji:"🎤",color:"#CE93D8",dark:"#6A1B9A",bg:"#F3E5F5",isVoice:true,
    lessons:[
      {id:"v1",title:"Sostener vocal AAA",xp:15,audioText:"Aaaaaaa",
        example:"Inhala profundo y di Aaaaaaa lo más que puedas, con voz constante y uniforme.",
        steps:[
          {instruction:"Escucha y luego imita: Aaaaaa",visual:"aaa",tip:"Voz constante",action:"¡Aguanta!",duration:8},
          {instruction:"Sube el tono: do-re-mi-fa-sol",visual:"scale_up",tip:"Como escalera musical",action:"Sube…",duration:6},
          {instruction:"Baja el tono: sol-fa-mi-re-do",visual:"scale_down",tip:"Suave y controlado",action:"Baja…",duration:6},
        ]},
      {id:"v2",title:"Volumen y ritmo",xp:20,audioText:"ma ma MA MA",
        example:"Di ma suave y luego MA fuerte. Controla tu volumen conscientemente.",
        steps:[
          {instruction:"ma suave → MA FUERTE",visual:"volume",tip:"Controla tu volumen",action:"ma-ma-MA-MA × 5",duration:8},
          {instruction:"Lee lento: Ca-sa / Me-sa",visual:"slow_read",tip:"Exagera cada sílaba",action:"Muy despacio…",duration:10},
        ]},
      {id:"v3",title:"PA-TA-KA con voz",xp:25,audioText:"pa ta ka, pa ta ka, pa ta ka",
        example:"PA-TA-KA. Repite claro y a ritmo. Es el ejercicio más importante.",
        steps:[
          {instruction:"Escucha y repite: PA-TA-KA",visual:"pataka",tip:"Coordinación",action:"PA-TA-KA × 5",duration:10},
          {instruction:"Más rápido: PA-TA-KA",visual:"pataka_fast",tip:"Mantén la claridad",action:"PA-TA-KA × 8",duration:10},
        ]},
    ]},
];

function Ring({cx,cy,c,d,active}){
  if(!active)return null;
  return <circle cx={cx} cy={cy} r="0" fill="none" stroke={c} strokeWidth="5" opacity="0"
    style={{animation:"ringOut 1.8s ease-out infinite",animationDelay:`${d||0}s`}}/>;
}

function Visual({type,active:t}){
  const R=(cx,cy,c,d)=><Ring cx={cx} cy={cy} c={c} d={d} active={t}/>;
  const V={
    belly:<svg viewBox="0 0 120 130" style={{width:"100%",height:"100%"}}>
      <R cx={60} cy={50} c="#FF8A65"/>
      <g style={t?{animation:"breathe 3.5s ease-in-out infinite alternate"}:{}}>
        <circle cx="60" cy="50" r="36" fill="#FFE0B2" stroke="#FF8A65" strokeWidth="2.5"/>
        <circle cx="44" cy="42" r="6" fill="#4E342E"/><circle cx="76" cy="42" r="6" fill="#4E342E"/>
        <circle cx="46" cy="40" r="2.5" fill="white"/><circle cx="78" cy="40" r="2.5" fill="white"/>
        <path d="M46 62 Q60 75 74 62" stroke="#E64A19" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </g>
      <ellipse cx="60" cy="104" rx="30" ry="19" fill="#FFCCBC" stroke="#FF8A65" strokeWidth="2"
        style={t?{animation:"breathe 3.5s ease-in-out infinite alternate"}:{}}/>
      <text x="60" y="110" textAnchor="middle" fontSize="16" fill="#FF8A65" fontWeight="900" fontFamily="Nunito">↕</text>
      <text x="60" y="127" textAnchor="middle" fontSize="11" fill="#BF360C" fontWeight="800" fontFamily="Nunito">BARRIGA</text>
    </svg>,
    hold:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <R cx={60} cy={54} c="#29B6F6" d={0}/><R cx={60} cy={54} c="#4FC3F7" d={.6}/><R cx={60} cy={54} c="#B3E5FC" d={1.2}/>
      <circle cx="60" cy="54" r="38" fill="#B3E5FC" stroke="#0288D1" strokeWidth="2.5" style={t?{animation:"pop 2s ease-in-out infinite"}:{}}/>
      <circle cx="44" cy="45" r="5.5" fill="#01579B"/><circle cx="76" cy="45" r="5.5" fill="#01579B"/>
      <circle cx="46" cy="43" r="2" fill="white"/><circle cx="78" cy="43" r="2" fill="white"/>
      <rect x="42" y="63" width="36" height="7" rx="3.5" fill="#01579B"/>
      <text x="60" y="106" textAnchor="middle" fontSize="11" fill="#0277BD" fontWeight="800" fontFamily="Nunito">⏸ AGUANTA</text>
    </svg>,
    exhale:<svg viewBox="0 0 155 120" style={{width:"100%",height:"100%"}}>
      <circle cx="48" cy="52" r="34" fill="#FFE0B2" stroke="#FF8A65" strokeWidth="2"/>
      <circle cx="36" cy="43" r="5" fill="#4E342E"/><circle cx="60" cy="43" r="5" fill="#4E342E"/>
      <path d="M34 64 Q48 74 62 64" stroke="#FF8A65" strokeWidth="2.5" fill="#FFCCBC" strokeLinecap="round"/>
      {[0,1,2,3,4].map(i=><path key={i} d={`M80 ${40+i*9} Q108 ${40+i*8} 144 ${36+i*10}`}
        stroke={["#4FC3F7","#29B6F6","#81D4FA","#4DD0E1","#B2EBF2"][i]} strokeWidth={3.5-i*.5}
        fill="none" strokeLinecap="round" strokeDasharray="8 5"
        style={t?{animation:`waveFlow ${.7+i*.13}s linear infinite`,animationDelay:`${i*.1}s`}:{}}/>)}
      <text x="78" y="112" textAnchor="middle" fontSize="11" fill="#0288D1" fontWeight="800" fontFamily="Nunito">💨 EXHALA LENTO</text>
    </svg>,
    candle:<svg viewBox="0 0 120 130" style={{width:"100%",height:"100%"}}>
      {t&&<ellipse cx="60" cy="68" rx="24" ry="12" fill="#FF6F00" opacity="0.18" style={{animation:"pop .8s ease-in-out infinite"}}/>}
      <rect x="46" y="72" width="28" height="48" rx="6" fill="#FFF9C4" stroke="#F9A825" strokeWidth="2"/>
      <ellipse cx="60" cy="70" rx="14" ry="5" fill="#F9A825"/>
      <g style={t?{animation:"flameFlick .5s ease-in-out infinite",transformOrigin:"60px 65px"}:{}}>
        <path d="M60 68 Q50 50 57 36 Q64 26 60 16 Q72 28 67 46 Q69 58 60 68" fill="#FF6F00"/>
        <path d="M60 68 Q55 52 58 40 Q63 32 60 22 Q68 34 64 50 Q65 62 60 68" fill="#FFC107"/>
        <path d="M60 68 Q57 55 60 46 Q63 55 60 68" fill="#FFEB3B"/>
      </g>
      <text x="60" y="128" textAnchor="middle" fontSize="10" fill="#E65100" fontWeight="800" fontFamily="Nunito">SOPLA DESPACIO</text>
    </svg>,
    candle_off:<svg viewBox="0 0 120 130" style={{width:"100%",height:"100%"}}>
      <rect x="46" y="72" width="28" height="48" rx="6" fill="#FFF9C4" stroke="#BDBDBD" strokeWidth="2"/>
      <ellipse cx="60" cy="70" rx="14" ry="5" fill="#BDBDBD"/>
      {[0,1,2].map(i=><path key={i} d={`M${56+i*3} 68 Q${52+i*6} ${50-i*5} ${60+i*3} ${36-i*8}`}
        stroke={`rgba(144,164,174,${.8-i*.25})`} strokeWidth="2" fill="none" strokeDasharray="3 2"
        style={t?{animation:`tongueMoveU ${1.2+i*.3}s ease-out infinite`,animationDelay:`${i*.22}s`}:{}}/>)}
      <text x="68" y="48" textAnchor="middle" fontSize="26">💨</text>
      <text x="60" y="128" textAnchor="middle" fontSize="11" fill="#E65100" fontWeight="800" fontFamily="Nunito">¡APAGADA! 🎉</text>
    </svg>,
    smile:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <g style={t?{animation:"pop 1.1s ease-in-out infinite",transformOrigin:"60px 57px"}:{}}>
        <circle cx="60" cy="57" r="44" fill="#FFF9C4" stroke="#F9A825" strokeWidth="3"/>
        <circle cx="42" cy="47" r="7" fill="#5D4037"/><circle cx="78" cy="47" r="7" fill="#5D4037"/>
        <circle cx="44" cy="45" r="2.5" fill="white"/><circle cx="80" cy="45" r="2.5" fill="white"/>
        <path d="M28 66 Q60 102 92 66" stroke="#E91E63" strokeWidth="5" fill="#F48FB1" strokeLinecap="round"/>
        {[0,1,2,3].map(i=><rect key={i} x={33+i*14} y="66" width="11" height={12+i%2*5} rx="2" fill="white"/>)}
      </g>
      <text x="60" y="115" textAnchor="middle" fontSize="11" fill="#AD1457" fontWeight="900" fontFamily="Nunito">SONRISA AMPLIA</text>
    </svg>,
    pucker:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <circle cx="60" cy="55" r="42" fill="#FCE4EC" stroke="#F06292" strokeWidth="2.5"/>
      <circle cx="42" cy="45" r="6" fill="#5D4037"/><circle cx="78" cy="45" r="6" fill="#5D4037"/>
      <circle cx="44" cy="43" r="2" fill="white"/><circle cx="80" cy="43" r="2" fill="white"/>
      <R cx={60} cy={72} c="#F06292"/>
      <g style={t?{animation:"pop 1s ease-in-out infinite",transformOrigin:"60px 72px"}:{}}>
        <ellipse cx="60" cy="72" rx="15" ry="13" fill="#F48FB1" stroke="#E91E63" strokeWidth="3"/>
        <circle cx="60" cy="72" r="7" fill="#C2185B"/>
      </g>
      <text x="60" y="113" textAnchor="middle" fontSize="11" fill="#AD1457" fontWeight="900" fontFamily="Nunito">FRUNCIR LABIOS</text>
    </svg>,
    alternate:<svg viewBox="0 0 130 120" style={{width:"100%",height:"100%"}}>
      <g style={t?{animation:"pop .75s ease-in-out infinite",transformOrigin:"32px 58px"}:{}}>
        <circle cx="32" cy="58" r="28" fill="#FFF9C4" stroke="#F9A825" strokeWidth="2"/>
        <circle cx="22" cy="50" r="4.5" fill="#5D4037"/><circle cx="42" cy="50" r="4.5" fill="#5D4037"/>
        <path d="M18 66 Q32 82 46 66" stroke="#E91E63" strokeWidth="3" fill="#F48FB1" strokeLinecap="round"/>
      </g>
      <text x="65" y="63" textAnchor="middle" fontSize="24" fill="#E91E63" style={t?{animation:"pop .7s infinite"}:{}}>⟷</text>
      <g style={t?{animation:"pop .75s ease-in-out infinite .38s",transformOrigin:"98px 58px"}:{}}>
        <circle cx="98" cy="58" r="28" fill="#FCE4EC" stroke="#F06292" strokeWidth="2"/>
        <circle cx="88" cy="50" r="4.5" fill="#5D4037"/><circle cx="108" cy="50" r="4.5" fill="#5D4037"/>
        <ellipse cx="98" cy="68" rx="12" ry="9" fill="#F48FB1" stroke="#E91E63" strokeWidth="2"/>
      </g>
      <text x="65" y="110" textAnchor="middle" fontSize="10" fill="#AD1457" fontWeight="900" fontFamily="Nunito">ALTERNA × 10</text>
    </svg>,
    motor:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <g style={t?{animation:"motorShake .1s linear infinite"}:{}}>
        <circle cx="60" cy="50" r="36" fill="#FFE0B2" stroke="#FF8A65" strokeWidth="2.5"/>
        <circle cx="44" cy="41" r="5.5" fill="#4E342E"/><circle cx="76" cy="41" r="5.5" fill="#4E342E"/>
        <circle cx="46" cy="39" r="2" fill="white"/><circle cx="78" cy="39" r="2" fill="white"/>
        <path d="M34 62 Q60 57 86 62" stroke="#FF8A65" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {[0,1,2,3,4,5].map(i=><path key={i} d={`M${34+i*10} 62 Q${40+i*10} 70 ${46+i*10} 62`}
          stroke="#FF8A65" strokeWidth="2.5" fill="none"
          style={t?{animation:`pop .1s infinite`,animationDelay:`${i*.015}s`}:{}}/>)}
      </g>
      <text x="60" y="100" textAnchor="middle" fontSize="15" fill="#BF360C" fontWeight="900" fontFamily="Nunito"
        style={t?{animation:"pop .12s infinite"}:{}}>Brrrrrr…</text>
    </svg>,
    pa:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <R cx={60} cy={48} c="#F06292" d={0}/><R cx={60} cy={48} c="#E91E63" d={.5}/>
      <circle cx="60" cy="48" r="34" fill="#FCE4EC" stroke="#F06292" strokeWidth="2"/>
      <circle cx="44" cy="40" r="5" fill="#5D4037"/><circle cx="76" cy="40" r="5" fill="#5D4037"/>
      <g style={t?{animation:"pop .45s ease-in-out infinite"}:{}}>
        <ellipse cx="60" cy="63" rx="20" ry="10" fill="#E91E63" opacity=".95"/>
        <text x="60" y="68" textAnchor="middle" fontSize="13" fill="white" fontWeight="900" fontFamily="Nunito">PA</text>
      </g>
      <text x="60" y="98" textAnchor="middle" fontSize="26" fill="#E91E63" fontWeight="900" fontFamily="Nunito"
        style={t?{animation:"pop .45s ease-in-out infinite"}:{}}>PA-PA-PA</text>
      <text x="60" y="114" textAnchor="middle" fontSize="10" fill="#F06292" fontFamily="Nunito">× 10 veces</text>
    </svg>,
    ba:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <R cx={60} cy={48} c="#C2185B" d={0}/><R cx={60} cy={48} c="#AD1457" d={.5}/>
      <circle cx="60" cy="48" r="34" fill="#FCE4EC" stroke="#C2185B" strokeWidth="2"/>
      <circle cx="44" cy="40" r="5" fill="#5D4037"/><circle cx="76" cy="40" r="5" fill="#5D4037"/>
      <g style={t?{animation:"pop .45s ease-in-out infinite .22s"}:{}}>
        <ellipse cx="60" cy="63" rx="20" ry="10" fill="#C2185B" opacity=".95"/>
        <text x="60" y="68" textAnchor="middle" fontSize="13" fill="white" fontWeight="900" fontFamily="Nunito">BA</text>
      </g>
      <text x="60" y="98" textAnchor="middle" fontSize="26" fill="#C2185B" fontWeight="900" fontFamily="Nunito"
        style={t?{animation:"pop .45s ease-in-out infinite .22s"}:{}}>BA-BA-BA</text>
      <text x="60" y="114" textAnchor="middle" fontSize="10" fill="#F06292" fontFamily="Nunito">× 10 veces</text>
    </svg>,
    tongue_up:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <circle cx="60" cy="52" r="36" fill="#FFE0B2" stroke="#FF8A65" strokeWidth="2"/>
      <circle cx="44" cy="43" r="5" fill="#4E342E"/><circle cx="76" cy="43" r="5" fill="#4E342E"/>
      <path d="M42 66 Q60 75 78 66" stroke="#FF8A65" strokeWidth="2" fill="#FFCCBC" strokeLinecap="round"/>
      <g style={t?{animation:"tongueMoveU 1s ease-in-out infinite"}:{}}>
        <ellipse cx="60" cy="58" rx="9" ry="18" fill="#EF9A9A"/>
        <ellipse cx="60" cy="48" rx="7" ry="7" fill="#EF9A9A"/>
      </g>
      <text x="60" y="108" textAnchor="middle" fontSize="11" fill="#BF360C" fontWeight="900" fontFamily="Nunito">↑ HACIA ARRIBA</text>
    </svg>,
    tongue_down:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <circle cx="60" cy="50" r="36" fill="#FFE0B2" stroke="#FF8A65" strokeWidth="2"/>
      <circle cx="44" cy="41" r="5" fill="#4E342E"/><circle cx="76" cy="41" r="5" fill="#4E342E"/>
      <path d="M42 62 Q60 70 78 62" stroke="#FF8A65" strokeWidth="2" fill="#FFCCBC" strokeLinecap="round"/>
      <g style={t?{animation:"tongueMoveD 1s ease-in-out infinite"}:{}}>
        <ellipse cx="60" cy="78" rx="9" ry="17" fill="#EF9A9A"/>
      </g>
      <text x="60" y="112" textAnchor="middle" fontSize="11" fill="#BF360C" fontWeight="900" fontFamily="Nunito">↓ HACIA ABAJO</text>
    </svg>,
    tongue_side:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <circle cx="60" cy="50" r="36" fill="#FFE0B2" stroke="#FF8A65" strokeWidth="2"/>
      <circle cx="44" cy="41" r="5" fill="#4E342E"/><circle cx="76" cy="41" r="5" fill="#4E342E"/>
      <path d="M42 62 Q60 70 78 62" stroke="#FF8A65" strokeWidth="2" fill="#FFCCBC" strokeLinecap="round"/>
      <g style={t?{animation:"tongueWipe .9s ease-in-out infinite",transformOrigin:"60px 65px"}:{}}>
        <ellipse cx="60" cy="65" rx="20" ry="9" fill="#EF9A9A"/>
      </g>
      <text x="60" y="108" textAnchor="middle" fontSize="20" fill="#BF360C">⟵⟶</text>
      <text x="60" y="118" textAnchor="middle" fontSize="9" fill="#BF360C" fontWeight="800" fontFamily="Nunito">DE LADO A LADO</text>
    </svg>,
    ta:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <circle cx="60" cy="50" r="34" fill="#FFF3E0" stroke="#FF8A65" strokeWidth="2"/>
      <circle cx="44" cy="42" r="5" fill="#4E342E"/><circle cx="76" cy="42" r="5" fill="#4E342E"/>
      <path d="M42 62 Q60 78 78 62" stroke="#FF8A65" strokeWidth="2" fill="#FFCCBC"/>
      <ellipse cx="60" cy="54" rx="8" ry="6" fill="#EF9A9A" transform="rotate(-20,60,54)"
        style={t?{animation:"pop .38s ease-in-out infinite"}:{}}/>
      <text x="60" y="100" textAnchor="middle" fontSize="26" fill="#FF8A65" fontWeight="900" fontFamily="Nunito"
        style={t?{animation:"pop .38s ease-in-out infinite"}:{}}>TA-TA-TA</text>
      <text x="60" y="116" textAnchor="middle" fontSize="10" fill="#BF360C" fontFamily="Nunito">lengua al paladar</text>
    </svg>,
    la:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <circle cx="60" cy="50" r="34" fill="#E8F5E9" stroke="#66BB6A" strokeWidth="2"/>
      <circle cx="44" cy="42" r="5" fill="#4E342E"/><circle cx="76" cy="42" r="5" fill="#4E342E"/>
      <path d="M42 62 Q60 78 78 62" stroke="#66BB6A" strokeWidth="2" fill="#C8E6C9"/>
      <ellipse cx="60" cy="62" rx="8" ry="15" fill="#A5D6A7" transform="rotate(10,60,62)"
        style={t?{animation:"tongueMoveU .75s ease-in-out infinite"}:{}}/>
      <text x="60" y="100" textAnchor="middle" fontSize="26" fill="#388E3C" fontWeight="900" fontFamily="Nunito"
        style={t?{animation:"pop .75s ease-in-out infinite"}:{}}>LA-LA-LA</text>
      <text x="60" y="116" textAnchor="middle" fontSize="10" fill="#2E7D32" fontFamily="Nunito">voz musical</text>
    </svg>,
    pataka:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <rect x="4" y="4" width="112" height="112" rx="16" fill="#F3E5F5" stroke="#CE93D8" strokeWidth="2"/>
      <text x="60" y="30" textAnchor="middle" fontSize="12" fill="#7B1FA2" fontWeight="900" fontFamily="Nunito">COORDINACIÓN ⭐</text>
      {["PA","TA","KA"].map((s,i)=><g key={s} style={t?{animation:`pop .5s ease-in-out infinite`,animationDelay:`${i*.17}s`}:{}}>
        <rect x={14+i*34} y="38" width="28" height="32" rx="8" fill={["#E91E63","#FF9800","#4CAF50"][i]}/>
        <text x={28+i*34} y="59" textAnchor="middle" fontSize="16" fill="white" fontWeight="900" fontFamily="Nunito">{s}</text>
      </g>)}
      <text x="60" y="96" textAnchor="middle" fontSize="13" fill="#7B1FA2" fontWeight="800" fontFamily="Nunito">PA-TA-KA × 5</text>
      <text x="60" y="112" textAnchor="middle" fontSize="10" fill="#9C27B0" fontFamily="Nunito">Ejercicio esencial</text>
    </svg>,
    pataka_fast:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <rect x="4" y="4" width="112" height="112" rx="16" fill="#EDE7F6" stroke="#7E57C2" strokeWidth="2"/>
      <text x="60" y="28" textAnchor="middle" fontSize="12" fill="#4527A0" fontWeight="900" fontFamily="Nunito">¡MÁS RÁPIDO! 🚀</text>
      {["PA","TA","KA"].map((s,i)=><g key={s} style={t?{animation:`pop .22s ease-in-out infinite`,animationDelay:`${i*.07}s`}:{}}>
        <rect x={14+i*34} y="36" width="28" height="32" rx="8" fill={["#9C27B0","#673AB7","#3F51B5"][i]}/>
        <text x={28+i*34} y="57" textAnchor="middle" fontSize="16" fill="white" fontWeight="900" fontFamily="Nunito">{s}</text>
      </g>)}
      <text x="60" y="94" textAnchor="middle" fontSize="12" fill="#4527A0" fontWeight="800" fontFamily="Nunito">PA-TA-KA × 8</text>
      <text x="60" y="110" textAnchor="middle" fontSize="10" fill="#7E57C2" fontFamily="Nunito">¡Mantén la claridad!</text>
    </svg>,
    open_wide:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <circle cx="60" cy="47" r="36" fill="#FFF9C4" stroke="#F9A825" strokeWidth="2"/>
      <circle cx="42" cy="38" r="5.5" fill="#4E342E"/><circle cx="78" cy="38" r="5.5" fill="#4E342E"/>
      <circle cx="44" cy="36" r="2" fill="white"/><circle cx="80" cy="36" r="2" fill="white"/>
      <g style={t?{animation:"jawDrop 1.4s ease-in-out infinite",transformOrigin:"60px 60px"}:{}}>
        <path d="M26 57 Q60 102 94 57" stroke="#E65100" strokeWidth="3" fill="#FFCCBC"/>
        <ellipse cx="60" cy="82" rx="24" ry="15" fill="#C62828" opacity=".7"/>
        <ellipse cx="60" cy="89" rx="13" ry="8" fill="#EF9A9A"/>
      </g>
      <text x="60" y="116" textAnchor="middle" fontSize="10" fill="#E65100" fontWeight="900" fontFamily="Nunito">BOCA MUY ABIERTA</text>
    </svg>,
    close:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <circle cx="60" cy="55" r="36" fill="#FFF9C4" stroke="#F9A825" strokeWidth="2"/>
      <circle cx="42" cy="46" r="5.5" fill="#4E342E"/><circle cx="78" cy="46" r="5.5" fill="#4E342E"/>
      <circle cx="44" cy="44" r="2" fill="white"/><circle cx="80" cy="44" r="2" fill="white"/>
      <g style={t?{animation:"pop 2s ease-in-out infinite",transformOrigin:"60px 68px"}:{}}>
        <path d="M40 68 Q60 74 80 68" stroke="#E65100" strokeWidth="4" fill="#FFCCBC" strokeLinecap="round"/>
      </g>
      <text x="60" y="107" textAnchor="middle" fontSize="10" fill="#E65100" fontWeight="900" fontFamily="Nunito">CIERRA SUAVE</text>
    </svg>,
    jaw_side:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <circle cx="60" cy="51" r="36" fill="#FFF9C4" stroke="#F9A825" strokeWidth="2"/>
      <circle cx="42" cy="42" r="5" fill="#4E342E"/><circle cx="78" cy="42" r="5" fill="#4E342E"/>
      <g style={t?{animation:"tongueWipe 1.1s ease-in-out infinite",transformOrigin:"60px 65px"}:{}}>
        <path d="M34 65 Q60 72 86 65" stroke="#E65100" strokeWidth="4.5" fill="#FFCCBC" strokeLinecap="round"/>
      </g>
      <text x="60" y="101" textAnchor="middle" fontSize="22" fill="#E65100">⟵⟶</text>
      <text x="60" y="116" textAnchor="middle" fontSize="10" fill="#E65100" fontWeight="900" fontFamily="Nunito">LADO A LADO</text>
    </svg>,
    aaa:<svg viewBox="0 0 120 130" style={{width:"100%",height:"100%"}}>
      {t&&[0,1,2,3].map(i=><circle key={i} cx="60" cy="50" r="0" fill="none" stroke="#CE93D8" strokeWidth={5-i} opacity="0"
        style={{animation:`ringOut ${2+i*.4}s ease-out infinite`,animationDelay:`${i*.5}s`}}/>)}
      <g style={t?{animation:"breathe 2s ease-in-out infinite alternate"}:{}}>
        <circle cx="60" cy="50" r="38" fill="#F3E5F5" stroke="#CE93D8" strokeWidth="2.5"/>
      </g>
      <circle cx="42" cy="40" r="6" fill="#4A148C"/><circle cx="78" cy="40" r="6" fill="#4A148C"/>
      <circle cx="44" cy="38" r="2" fill="white"/><circle cx="80" cy="38" r="2" fill="white"/>
      <path d="M32 58 Q60 96 88 58" stroke="#9C27B0" strokeWidth="4.5" fill="#E1BEE7"/>
      <ellipse cx="60" cy="75" rx="20" ry="14" fill="#7B1FA2" opacity=".7"
        style={t?{animation:"breathe 2s ease-in-out infinite alternate"}:{}}/>
      <text x="60" y="108" textAnchor="middle" fontSize="24" fill="#6A1B9A" fontWeight="900" fontFamily="Nunito">Aaaaaaa</text>
      <text x="60" y="124" textAnchor="middle" fontSize="10" fill="#9C27B0" fontFamily="Nunito">¡Lo más que puedas!</text>
    </svg>,
    scale_up:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      {["DO","RE","MI","FA","SOL"].map((n,i)=><g key={n} style={t?{animation:`noteRise ${.35+i*.1}s ease-out infinite`,transformOrigin:`${17+i*21}px 108px`,animationDelay:`${i*.13}s`}:{}}>
        <rect x={7+i*21} y={90-i*13} width="20" height={13+i*13} rx="5" fill={`hsl(${270+i*12},70%,${60-i*5}%)`}/>
        <text x={17+i*21} y="108" textAnchor="middle" fontSize="8" fill="#4A148C" fontWeight="800" fontFamily="Nunito">{n}</text>
      </g>)}
      <path d="M17 87 L38 74 L59 61 L80 48 L101 35" stroke="#9C27B0" strokeWidth="2.5" strokeDasharray="5 3" fill="none"/>
      <text x="60" y="118" textAnchor="middle" fontSize="10" fill="#6A1B9A" fontWeight="800" fontFamily="Nunito">↑ SUBE EL TONO</text>
    </svg>,
    scale_down:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      {["SOL","FA","MI","RE","DO"].map((n,i)=><g key={n} style={t?{animation:`noteRise ${.35+i*.1}s ease-out infinite`,transformOrigin:`${17+i*21}px 108px`,animationDelay:`${i*.13}s`}:{}}>
        <rect x={7+i*21} y={28+i*12} width="20" height={72-i*12} rx="5" fill={`hsl(${300-i*12},65%,${55+i*5}%)`}/>
        <text x={17+i*21} y="108" textAnchor="middle" fontSize="8" fill="#4A148C" fontWeight="800" fontFamily="Nunito">{n}</text>
      </g>)}
      <path d="M17 30 L38 42 L59 54 L80 66 L101 78" stroke="#CE93D8" strokeWidth="2.5" strokeDasharray="5 3" fill="none"/>
      <text x="60" y="118" textAnchor="middle" fontSize="10" fill="#6A1B9A" fontWeight="800" fontFamily="Nunito">↓ BAJA EL TONO</text>
    </svg>,
    volume:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <g style={t?{animation:"pop 1.8s ease-in-out infinite",transformOrigin:"30px 62px"}:{}}>
        <circle cx="30" cy="62" r="22" fill="#E8F5E9" stroke="#66BB6A" strokeWidth="2"/>
        <text x="30" y="68" textAnchor="middle" fontSize="15" fill="#388E3C" fontWeight="800" fontFamily="Nunito">ma</text>
      </g>
      <text x="62" y="66" textAnchor="middle" fontSize="20" fill="#9E9E9E" style={t?{animation:"pop .9s infinite"}:{}}>→</text>
      <g style={t?{animation:"pop 1.8s ease-in-out infinite .9s",transformOrigin:"92px 58px"}:{}}>
        <circle cx="92" cy="58" r="30" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="3"/>
        <text x="92" y="65" textAnchor="middle" fontSize="22" fill="#1B5E20" fontWeight="900" fontFamily="Nunito">MA</text>
      </g>
      <R cx={92} cy={58} c="#81C784" d={0}/><R cx={92} cy={58} c="#4CAF50" d={.5}/><R cx={92} cy={58} c="#2E7D32" d={1}/>
      <text x="60" y="106" textAnchor="middle" fontSize="11" fill="#2E7D32" fontWeight="800" fontFamily="Nunito">ma-ma-MA-MA</text>
    </svg>,
    slow_read:<svg viewBox="0 0 120 120" style={{width:"100%",height:"100%"}}>
      <rect x="12" y="18" width="96" height="72" rx="12" fill="#FFFDE7" stroke="#F9A825" strokeWidth="2"/>
      {[["Ca","sa"],["Me","sa"],["Lu","na"]].map(([a,b],i)=><g key={i} style={t?{animation:`pop ${.9+i*.3}s ease-in-out infinite`,animationDelay:`${i*.38}s`}:{}}>
        <text x="35" y={40+i*18} textAnchor="middle" fontSize="15" fill="#5D4037" fontWeight="800" fontFamily="Nunito">{a}</text>
        <text x="50" y={40+i*18} textAnchor="middle" fontSize="15" fill="#BDBDBD" fontFamily="Nunito">·</text>
        <text x="68" y={40+i*18} textAnchor="middle" fontSize="15" fill="#5D4037" fontWeight="800" fontFamily="Nunito">{b}</text>
      </g>)}
      <text x="60" y="108" textAnchor="middle" fontSize="14" fill="#F9A825" fontWeight="900" fontFamily="Nunito">🐢 ¡DESPACIO!</text>
    </svg>,
  };
  return V[type]||<div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",fontSize:48}}>❓</div>;
}

function Penguin({mood="happy",size=80,anim="float 2.2s ease-in-out infinite"}){
  const mouths={happy:<path d="M44 50 Q50 57 56 50" stroke="#FF8F00" strokeWidth="1.8" fill="none"/>,excited:<path d="M40 49 Q50 62 60 49" stroke="#FF8F00" strokeWidth="2.2" fill="none"/>,cheer:<path d="M37 48 Q50 65 63 48" stroke="#FF8F00" strokeWidth="2.5" fill="#FFD54F"/>};
  return <svg width={size} height={Math.round(size*1.1)} viewBox="0 0 100 110" style={{animation:anim}}>
    <ellipse cx="50" cy="108" rx="20" ry="4" fill="rgba(0,0,0,.12)"/>
    <ellipse cx="50" cy="75" rx="32" ry="36" fill="#1A237E"/>
    <ellipse cx="50" cy="81" rx="20" ry="24" fill="#F5F5F5"/>
    <circle cx="50" cy="38" r="29" fill="#1A237E"/>
    <ellipse cx="50" cy="43" rx="17" ry="15" fill="#F5F5F5"/>
    <g style={{animation:"blink 4s ease-in-out infinite"}}>
      <circle cx="42" cy="36" r="7" fill="white"/><circle cx="58" cy="36" r="7" fill="white"/>
      <circle cx="43" cy="36" r="4" fill="#111"/><circle cx="59" cy="36" r="4" fill="#111"/>
      <circle cx="44.5" cy="34.5" r="1.5" fill="white"/><circle cx="60.5" cy="34.5" r="1.5" fill="white"/>
    </g>
    <ellipse cx="50" cy="47" rx="7" ry="4.5" fill="#FF8F00"/>
    {mouths[mood]||mouths.happy}
    <ellipse cx="19" cy="78" rx="13" ry="23" fill="#1A237E" style={{transformOrigin:"19px 65px",animation:"wingL 2.2s ease-in-out infinite"}}/>
    <ellipse cx="81" cy="78" rx="13" ry="23" fill="#1A237E" style={{transformOrigin:"81px 65px",animation:"wingR 2.2s ease-in-out infinite"}}/>
    <rect x="22" y="60" width="56" height="11" rx="5.5" fill="#E53935"/>
    <rect x="44" y="63" width="12" height="19" rx="4" fill="#E53935"/>
    <rect x="26" y="62" width="22" height="3.5" rx="1.5" fill="rgba(255,255,255,.35)"/>
  </svg>;
}

function WaveBars({active,color}){
  return <div style={{display:"flex",alignItems:"center",gap:2,height:26,marginLeft:"auto"}}>
    {[.3,.8,1,.5,.9,.6,.8].map((h,i)=><div key={i} style={{width:4,borderRadius:2,background:color||"white",height:`${h*100}%`,animation:active?`waveBar ${.25+i*.04}s ease-in-out infinite alternate`:"none",animationDelay:`${i*.03}s`}}/>)}
  </div>;
}

function VoicePanel({lesson,m}){
  const [ttsOn,setTtsOn]=useState(false);
  const [recOn,setRecOn]=useState(false);
  const [recBlob,setRecBlob]=useState(null);
  const [recSec,setRecSec]=useState(0);
  const mrRef=useRef(null),chunkRef=useRef([]),timerRef=useRef(null);

  const speak=()=>{
    if(ttsOn){window.speechSynthesis?.cancel();setTtsOn(false);return;}
    if(!window.speechSynthesis)return;
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(lesson.audioText||lesson.example);
    u.lang="es-ES";u.rate=0.82;u.pitch=1.1;
    const sp=window.speechSynthesis.getVoices().find(v=>v.lang.startsWith("es"));
    if(sp)u.voice=sp;
    u.onstart=()=>setTtsOn(true);u.onend=()=>setTtsOn(false);u.onerror=()=>setTtsOn(false);
    window.speechSynthesis.speak(u);
  };
  const toggleRec=async()=>{
    if(recOn){if(mrRef.current?.state==="recording")mrRef.current.stop();clearInterval(timerRef.current);setRecOn(false);return;}
    try{
      const stream=await navigator.mediaDevices.getUserMedia({audio:true});
      chunkRef.current=[];
      const mr=new MediaRecorder(stream);
      mr.ondataavailable=e=>{if(e.data.size>0)chunkRef.current.push(e.data);};
      mr.onstop=()=>{setRecBlob(new Blob(chunkRef.current,{type:"audio/webm"}));stream.getTracks().forEach(t=>t.stop());setRecOn(false);};
      mr.start();mrRef.current=mr;setRecOn(true);setRecSec(0);
      timerRef.current=setInterval(()=>setRecSec(p=>p+1),1000);
    }catch{alert("No se pudo acceder al micrófono.");}
  };
  const playRec=()=>{if(!recBlob)return;const url=URL.createObjectURL(recBlob);const a=new Audio(url);a.play();a.onended=()=>URL.revokeObjectURL(url);};
  useEffect(()=>()=>{window.speechSynthesis?.cancel();clearInterval(timerRef.current);},[]);
  const fmt=s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  return <div style={{borderRadius:20,overflow:"hidden",border:`2.5px solid ${m.color}`,borderBottom:`5px solid ${m.color}`}}>
    <div style={{padding:"12px 14px",background:`${m.color}18`}}>
      <div style={{fontSize:10,fontWeight:900,textTransform:"uppercase",letterSpacing:2,color:m.dark,marginBottom:3}}>📖 Ejemplo</div>
      <div style={{fontSize:13,color:"#444",lineHeight:1.5}}>{lesson.example}</div>
    </div>
    <div style={{background:"#fff",padding:"12px 14px",display:"flex",flexDirection:"column",gap:8}}>
      <button className="btn-duo" onClick={speak} style={{background:ttsOn?m.dark:m.color,boxShadow:`0 4px 0 ${m.dark}`,fontSize:14,display:"flex",alignItems:"center",gap:10,padding:"12px 14px"}}>
        <span style={{fontSize:20}}>{ttsOn?"⏹":"🔊"}</span><span style={{flex:1,textAlign:"left"}}>{ttsOn?"Detener":"🔊 Escuchar ejemplo"}</span>
        {ttsOn&&<WaveBars active/>}
      </button>
      <button className="btn-duo" onClick={toggleRec} style={{background:recOn?"#EF4444":"#fff",color:recOn?"#fff":"#EF4444",border:"2.5px solid #EF4444",borderBottom:recOn?"2px solid #C62828":"5px solid #C62828",boxShadow:"none",fontSize:14,display:"flex",alignItems:"center",gap:10,padding:"12px 14px",animation:recOn?"glowPulse 1.5s infinite":"none"}}>
        <span style={{fontSize:20}}>{recOn?"⏹":"🎙️"}</span><span style={{flex:1,textAlign:"left"}}>{recOn?`Grabando… ${fmt(recSec)}`:"🎙️ Grabar mi voz"}</span>
        {recOn&&<WaveBars active/>}
      </button>
      {recBlob&&<button className="btn-duo" onClick={playRec} style={{background:"#F3E5F5",color:"#6A1B9A",border:"2.5px solid #CE93D8",borderBottom:"5px solid #6A1B9A",boxShadow:"none",fontSize:14,display:"flex",alignItems:"center",gap:10,padding:"12px 14px"}}>
        <span style={{fontSize:20}}>▶️</span><span>▶ Escuchar mi grabación</span>
      </button>}
    </div>
  </div>;
}

function ProgBar({val,max,color}){
  return <div className="duo-progress"><div className="duo-progress-fill" style={{width:`${Math.min(100,(val/max)*100)}%`,background:color||"linear-gradient(90deg,#58cc02,#78e002)"}}/></div>;
}

function Timer({secs,color,onDone}){
  const [left,setLeft]=useState(secs);
  const isLow=left<=3;
  useEffect(()=>{
    setLeft(secs);
    const id=setInterval(()=>setLeft(p=>{if(p<=1){clearInterval(id);onDone();return 0;}return p-1;}),1000);
    return()=>clearInterval(id);
  },[secs]);
  return <div style={{position:"relative",width:108,height:108,margin:"0 auto"}}>
    <svg viewBox="0 0 108 108" style={{width:"100%",height:"100%",transform:"rotate(-90deg)"}}>
      <circle cx="54" cy="54" r="46" fill="none" stroke="#f0f0f0" strokeWidth="9"/>
      <circle cx="54" cy="54" r="46" fill="none" stroke={isLow?"#EF4444":color} strokeWidth="9"
        strokeDasharray={`${(left/secs)*289} 289`} strokeLinecap="round"
        style={{transition:"stroke-dasharray 1s linear,stroke .3s"}}/>
    </svg>
    <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <span style={{fontSize:34,fontWeight:900,color:isLow?"#EF4444":color,lineHeight:1,animation:isLow?"timerPop .5s ease-in-out infinite":"none"}}>{left}</span>
      <span style={{fontSize:11,color:"#afafaf"}}>seg</span>
    </div>
    {isLow&&<div style={{position:"absolute",inset:0,borderRadius:"50%",border:"4px solid #EF4444",animation:"glowPulse 1s infinite"}}/>}
  </div>;
}

function HomeScreen({xp,streak,hearts,done,total,onSelect}){
  return <div className="screen" style={{background:"#fff"}}>
    <div style={{background:"#fff",padding:"16px 20px 12px",borderBottom:"2px solid #f0f0f0"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <Penguin mood="excited" size={44}/>
          <div>
            <div style={{fontSize:20,fontWeight:900,color:"#1A237E",lineHeight:1,letterSpacing:"-.5px"}}>Pingus</div>
            <div style={{fontSize:9,fontWeight:800,color:"#90CAF9",textTransform:"uppercase",letterSpacing:2}}>Disartria</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {[["🔥",streak,"#ff9600","#fff7e6","#ffd700"],["❤️",hearts,"#ff4b4b","#fff0f0","#ffb3b3"],["⚡",xp,"#58cc02","#f0faf0","#a0e0a0"]].map(([icon,val,tc,bg,bc])=>(
            <div key={icon} style={{display:"flex",alignItems:"center",gap:4,background:bg,padding:"6px 10px",borderRadius:12,border:`2px solid ${bc}`}}>
              <span style={{fontSize:18}}>{icon}</span>
              <span style={{fontSize:15,fontWeight:900,color:tc}}>{val}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <ProgBar val={done} max={total}/>
        <span style={{fontSize:12,fontWeight:900,color:"#afafaf"}}>{done}/{total}</span>
      </div>
    </div>
    <div className="scroll" style={{padding:14,display:"flex",flexDirection:"column",gap:10,background:"#f7f7f7"}}>
      {MODULES.map((m,i)=>{
        const d=m.lessons.filter(l=>done&&done.includes(l.id)||false).length;
        const pct=d/m.lessons.length;
        return <button key={m.id} className="duo-card" onClick={()=>onSelect(m)}
          style={{padding:14,display:"flex",alignItems:"center",gap:14,textAlign:"left",width:"100%",animation:`slideUp .45s cubic-bezier(.34,1.56,.64,1) ${i*.07}s both`}}>
          <div className="mod-icon" style={{background:m.bg,border:`2.5px solid ${m.color}`,animation:"float 2.5s ease-in-out infinite",animationDelay:`${i*.3}s`}}>{m.emoji}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3,flexWrap:"wrap"}}>
              <span style={{fontSize:16,fontWeight:900,color:"#333"}}>{m.title}</span>
              {m.isVoice&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:20,background:m.color,color:"white",fontWeight:800}}>🎙️</span>}
              {pct===1&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:20,background:"#58cc02",color:"white",fontWeight:800}}>✓</span>}
            </div>
            <div style={{fontSize:11,color:"#afafaf",marginBottom:6}}>{d}/{m.lessons.length} lecciones</div>
            <div style={{height:10,background:"#e5e5e5",borderRadius:5,overflow:"hidden"}}>
              <div style={{height:"100%",background:m.color,borderRadius:5,width:`${pct*100}%`}}/>
            </div>
          </div>
          <span style={{fontSize:22,fontWeight:900,color:m.color}}>{pct===1?"🏆":"›"}</span>
        </button>;
      })}
      <div style={{background:"#f0faf0",border:"2.5px solid #b8e0b8",borderRadius:18,borderBottom:"5px solid #b8e0b8",padding:14,display:"flex",gap:12,animation:"slideUp .45s cubic-bezier(.34,1.56,.64,1) .4s both"}}>
        <span style={{fontSize:24,animation:"float 3s ease-in-out infinite"}}>💡</span>
        <div><div style={{fontWeight:900,fontSize:13,color:"#2e7d32",marginBottom:3}}>Consejo del día</div><div style={{fontSize:12,color:"#388e3c",lineHeight:1.5}}>Practica 15 min diarios frente al espejo. ¡Graba tu voz para escuchar tu progreso!</div></div>
      </div>
    </div>
  </div>;
}

function ModuleScreen({m,completed,onBack,onStart}){
  return <div className="screen" style={{background:"#f7f7f7"}}>
    <div style={{background:m.color,padding:"28px 20px 24px",position:"relative"}}>
      <button onClick={onBack} style={{position:"absolute",left:16,top:24,background:"rgba(255,255,255,.25)",border:"none",borderRadius:12,width:40,height:40,fontSize:20,fontWeight:900,color:"white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>←</button>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:52,animation:"bounce 1.2s ease-in-out infinite"}}>{m.emoji}</div>
        <div style={{fontSize:22,fontWeight:900,color:"white",marginTop:4}}>{m.title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.75)",marginTop:2}}>{m.lessons.length} lecciones</div>
      </div>
    </div>
    <div className="scroll" style={{padding:14,display:"flex",flexDirection:"column",gap:10}}>
      {m.lessons.map((l,i)=>{
        const done=completed.includes(l.id);
        return <button key={l.id} className="duo-card" onClick={()=>!done&&onStart(l)}
          style={{padding:14,display:"flex",alignItems:"center",gap:14,textAlign:"left",width:"100%",animation:`slideUp .45s cubic-bezier(.34,1.56,.64,1) ${i*.06}s both`,borderColor:done?m.color:undefined,cursor:done?"default":"pointer"}}>
          <div style={{width:52,height:52,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0,background:done?m.color:m.bg}}>{done?"✅":m.emoji}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:15,fontWeight:900,color:"#333",marginBottom:2}}>{l.title}</div>
            <div style={{fontSize:11,color:"#afafaf"}}>{l.steps.length} pasos · +{l.xp} XP</div>
            {m.isVoice&&<div style={{fontSize:11,color:m.color,fontWeight:700,marginTop:3}}>🎙️ Escuchar · Grabar · Reproducir</div>}
          </div>
          <span style={{fontSize:20,fontWeight:900,color:done?"#58cc02":m.color}}>{done?"✓":"▶"}</span>
        </button>;
      })}
    </div>
  </div>;
}

function LessonScreen({lesson,m,onBack,onDone}){
  const [si,setSi]=useState(0);
  const [phase,setPhase]=useState("intro");
  const step=lesson.steps[si];
  const next=()=>{if(si<lesson.steps.length-1){setSi(s=>s+1);setPhase("intro");}else onDone(lesson.xp);};
  return <div className="screen" style={{background:"#fff"}}>
    <div style={{display:"flex",alignItems:"center",gap:12,padding:"20px 16px 10px"}}>
      <button onClick={onBack} style={{background:"#f0f0f0",border:"none",borderRadius:10,width:36,height:36,fontSize:18,color:"#666",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>✕</button>
      <ProgBar val={si+(phase==="done"?1:0)} max={lesson.steps.length} color={m.color}/>
      <span style={{fontSize:11,fontWeight:900,color:"#afafaf",background:"#f0f0f0",padding:"3px 10px",borderRadius:20}}>{si+1}/{lesson.steps.length}</span>
    </div>
    <div className="scroll" style={{padding:"0 16px 24px",display:"flex",flexDirection:"column",gap:12}}>
      <div style={{width:210,height:210,margin:"0 auto",animation:"slideIn .45s cubic-bezier(.34,1.56,.64,1)",filter:`drop-shadow(0 8px 20px ${m.color}55)`}}>
        <Visual type={step.visual} active={phase==="active"}/>
      </div>
      <div className="duo-card" style={{padding:16,textAlign:"center"}}>
        <div style={{fontSize:19,fontWeight:900,color:m.dark,marginBottom:4}}>{step.instruction}</div>
        <div style={{fontSize:13,color:"#afafaf"}}>{step.tip}</div>
      </div>
      {m.isVoice&&lesson.example&&<VoicePanel lesson={lesson} m={m}/>}
      {phase==="intro"&&<button className="btn-duo" onClick={()=>setPhase("active")} style={{background:m.color,boxShadow:`0 5px 0 ${m.dark}`}}>▶&nbsp; Comenzar ejercicio</button>}
      {phase==="active"&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14,animation:"slideUp .3s ease"}}>
        <div style={{borderRadius:18,padding:"12px 20px",width:"100%",textAlign:"center",background:`${m.color}18`,border:`2.5px solid ${m.color}`}}>
          <div style={{fontWeight:900,fontSize:16,color:m.dark}}>{step.action}</div>
        </div>
        <Timer secs={step.duration} color={m.color} onDone={()=>setPhase("done")}/>
      </div>}
      {phase==="done"&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14,animation:"slideUp .4s cubic-bezier(.34,1.56,.64,1)"}}>
        <div style={{textAlign:"center"}}><div style={{fontSize:60,animation:"star 1s ease-in-out 1"}}>⭐</div><div style={{fontSize:22,fontWeight:900,color:m.dark,marginTop:4}}>¡Muy bien!</div></div>
        <button className="btn-duo" onClick={next} style={{background:m.color,boxShadow:`0 5px 0 ${m.dark}`}}>{si<lesson.steps.length-1?"Siguiente ➜":"¡Terminar! 🎉"}</button>
      </div>}
    </div>
  </div>;
}

function CompleteScreen({xp,title,m,onContinue}){
  const [shown,setShown]=useState(0);
  useEffect(()=>{let n=0;const id=setInterval(()=>{n+=2;setShown(Math.min(n,xp));if(n>=xp)clearInterval(id);},30);return()=>clearInterval(id);},[xp]);
  const colors=[m.color,m.dark,"#FFD54F","#F06292","#81C784","#FF8A65","#CE93D8","#4FC3F7"];
  return <div className="screen" style={{alignItems:"center",justifyContent:"center",padding:24,textAlign:"center",position:"relative",overflow:"hidden",background:"#fff"}}>
    {Array.from({length:26},(_,i)=><div key={i} style={{position:"absolute",top:-10,left:`${(i/26)*100}%`,width:8+i%4*4,height:8+i%4*4,borderRadius:i%3===0?"50%":i%3===1?"4px":"0",background:colors[i%colors.length],animation:`confetti ${1+i*.07}s cubic-bezier(.36,.07,.19,.97) forwards`,animationDelay:`${i*.05}s`}}/>)}
    {["✨","⭐","💫","✨","🎉"].map((e,i)=><div key={i} style={{position:"absolute",top:`${8+i*14}%`,left:i%2===0?`${4+i*3}%`:`${74+i*3}%`,fontSize:16+i%3*7,animation:`star ${1+i*.3}s ease-in-out infinite`,animationDelay:`${i*.2}s`}}>{e}</div>)}
    <div style={{animation:"xpUp .5s cubic-bezier(.34,1.56,.64,1)"}}><Penguin mood="cheer" size={130} anim="bounce 1s ease-in-out infinite"/></div>
    <div style={{fontSize:38,fontWeight:900,color:m.dark,margin:"8px 0 2px",animation:"slideUp .4s cubic-bezier(.34,1.56,.64,1) .2s both"}}>¡Excelente!</div>
    <div style={{fontSize:13,color:"#afafaf",marginBottom:20,animation:"slideUp .4s .3s both"}}>{title}</div>
    <div className="duo-card" style={{padding:18,width:"100%",marginBottom:20,animation:"slideUp .5s cubic-bezier(.34,1.56,.64,1) .35s both"}}>
      <div style={{display:"flex",justifyContent:"space-around"}}>
        {[[`+${shown}`,"XP",m.color,"#f0faf0"],[`⭐`,"Logro","#F9A825","#fffbf0"],["🔥","Racha","#FF7043","#fff5f0"]].map(([v,l,c,bg])=>(
          <div key={l} style={{background:bg,borderRadius:14,padding:"12px 16px",border:`2px solid ${c}40`}}>
            <div style={{fontSize:28,fontWeight:900,color:c}}>{v}</div>
            <div style={{fontSize:11,color:"#afafaf",marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
    <button className="btn-duo" onClick={onContinue} style={{background:"#58cc02",boxShadow:"0 6px 0 #46a302",fontSize:18,animation:"slideUp .5s cubic-bezier(.34,1.56,.64,1) .4s both"}}>¡Continuar! 🐧</button>
  </div>;
}

export default function App(){


  const [screen,setScreen]=useState("home");
  const [mod,setMod]=useState(null);
  const [lesson,setLesson]=useState(null);
  const [completed,setCompleted]=useState([]);
  const [xp,setXp]=useState(0);
  const [lastXp,setLastXp]=useState(0);
  const hearts=5,streak=3;
  const total=MODULES.reduce((a,m)=>a+m.lessons.length,0);

  return <>
    <style>{CSS}</style>
    <div style={{width:"100%",height:"100%",minHeight:"100vh",background:"#fff",position:"relative",overflow:"hidden"}}>
      {screen==="home"&&<HomeScreen xp={xp} streak={streak} hearts={hearts} done={completed} total={total} onSelect={m=>{setMod(m);setScreen("module");}}/>}
      {screen==="module"&&<ModuleScreen m={mod} completed={completed} onBack={()=>setScreen("home")} onStart={l=>{setLesson(l);setScreen("lesson");}}/>}
      {screen==="lesson"&&<LessonScreen lesson={lesson} m={mod} onBack={()=>setScreen("module")} onDone={x=>{setLastXp(x);setScreen("complete");}}/>}
      {screen==="complete"&&<CompleteScreen xp={lastXp} title={lesson.title} m={mod} onContinue={()=>{setCompleted(p=>[...p,lesson.id]);setXp(p=>p+lastXp);setScreen("module");}}/>}
    </div>
  </>;
}
