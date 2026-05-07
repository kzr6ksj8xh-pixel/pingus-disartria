import { useState, useEffect, useRef } from "react";
import "./index.css";


/* ─── DATA ─────────────────────────────────────────────── */
const MODULES = [
  { id:"respiracion", title:"Respiración", emoji:"🌬️", color:"#4FC3F7", bg:"#E1F5FE", dark:"#0277BD",
    lessons:[
      { id:"r1", title:"Respiración profunda", xp:10, steps:[
        { instruction:"Pon la mano en tu barriga", visual:"belly",   tip:"Siente cómo sube y baja", action:"Inhala 4 seg…",  duration:4 },
        { instruction:"Aguanta el aire",            visual:"hold",   tip:"Hombros relajados",        action:"Aguanta 2 seg…", duration:2 },
        { instruction:"Exhala lento por la boca",  visual:"exhale", tip:"Como enfriar una sopa",    action:"Exhala 6 seg…",  duration:6 },
      ]},
      { id:"r2", title:"Soplar la vela", xp:15, steps:[
        { instruction:"Sopla sin apagar la vela",  visual:"candle",     tip:"Labios juntos, soplo suave", action:"Sopla 5 seg…",          duration:5 },
        { instruction:"¡Apágala de un soplo!",      visual:"candle_off", tip:"Inhala profundo antes",      action:"¡Un soplo fuerte! 3 seg", duration:3 },
      ]},
    ],
  },
  { id:"labios", title:"Labios", emoji:"👄", color:"#F06292", bg:"#FCE4EC", dark:"#AD1457",
    lessons:[
      { id:"l1", title:"Sonrisa y fruncir", xp:10, steps:[
        { instruction:"Gran sonrisa mostrando dientes", visual:"smile",    tip:"¡Muestra todos los dientes!", action:"Mantén 5 seg",  duration:5 },
        { instruction:"Frunce labios al frente",         visual:"pucker",   tip:"Como dar un beso",           action:"Mantén 5 seg",  duration:5 },
        { instruction:"Alterna: sonrisa ↔ fruncir",     visual:"alternate",tip:"10 veces seguidas",           action:"¡A ritmo! 8 seg",duration:8 },
      ]},
      { id:"l2", title:"Motor de labios", xp:15, steps:[
        { instruction:"Vibra labios como motor",  visual:"motor", tip:"Relaja completamente los labios", action:"Brrrrr 5 seg",  duration:5 },
        { instruction:"Repite PA-PA-PA",          visual:"pa",    tip:"Acentúa con fuerza",              action:"PA-PA-PA × 10", duration:6 },
        { instruction:"Repite BA-BA-BA",          visual:"ba",    tip:"Siente la vibración",             action:"BA-BA-BA × 10", duration:6 },
      ]},
    ],
  },
  { id:"lengua", title:"Lengua", emoji:"👅", color:"#FF8A65", bg:"#FBE9E7", dark:"#BF360C",
    lessons:[
      { id:"le1", title:"Movimientos básicos", xp:10, steps:[
        { instruction:"Lengua hacia arriba",               visual:"tongue_up",   tip:"Sin mover la cabeza",    action:"× 5 rep",       duration:6 },
        { instruction:"Lengua hacia la barbilla",          visual:"tongue_down", tip:"Lo más abajo posible",   action:"× 5 rep",       duration:6 },
        { instruction:"Lengua de lado a lado",             visual:"tongue_side", tip:"Como limpiaparabrisas",  action:"× 10 mov",      duration:8 },
      ]},
      { id:"le2", title:"Sílabas clave", xp:15, steps:[
        { instruction:"Repite TA-TA-TA", visual:"ta",     tip:"Lengua toca paladar", action:"TA-TA-TA × 10",  duration:6 },
        { instruction:"Repite LA-LA-LA", visual:"la",     tip:"Voz musical y clara", action:"LA-LA-LA × 10",  duration:6 },
        { instruction:"PA-TA-KA",        visual:"pataka", tip:"Ejercicio esencial ⭐",action:"PA-TA-KA × 5",   duration:10 },
      ]},
    ],
  },
  { id:"mandibula", title:"Mandíbula", emoji:"🦷", color:"#81C784", bg:"#E8F5E9", dark:"#2E7D32",
    lessons:[
      { id:"m1", title:"Abrir y cerrar", xp:10, steps:[
        { instruction:"Abre la boca lo más que puedas", visual:"open_wide", tip:"Lento y controlado",     action:"Mantén 5 seg",  duration:5 },
        { instruction:"Cierra muy suavemente",           visual:"close",     tip:"Sin apretar los dientes",action:"× 5 rep",       duration:7 },
        { instruction:"Mandíbula de lado a lado",        visual:"jaw_side",  tip:"Como masticando chicle", action:"× 10 mov",      duration:8 },
      ]},
    ],
  },
  { id:"voz", title:"Voz", emoji:"🎤", color:"#CE93D8", bg:"#F3E5F5", dark:"#6A1B9A", isVoice:true,
    lessons:[
      { id:"v1", title:"Sostener vocal AAA", xp:15,
        audioText:"Aaaaaaa",
        example:"Inhala profundo y di Aaaaaaa lo más que puedas, con voz constante y uniforme. Luego sube y baja el tono.",
        steps:[
          { instruction:"Escucha, luego imita: Aaaaaa", visual:"aaa",        tip:"Voz constante y uniforme",          action:"¡Aguanta! 8 seg",  duration:8 },
          { instruction:"Sube tono: do-re-mi-fa-sol",   visual:"scale_up",   tip:"Como escalera musical ascendente",  action:"Sube cantando…",   duration:6 },
          { instruction:"Baja tono: sol-fa-mi-re-do",   visual:"scale_down", tip:"Suave y controlado",                action:"Baja cantando…",   duration:6 },
        ],
      },
      { id:"v2", title:"Volumen y ritmo", xp:20,
        audioText:"ma ma MA MA",
        example:"Di ma suave y luego MA fuerte. Controla tu volumen de manera consciente.",
        steps:[
          { instruction:"ma suave → MA FUERTE",        visual:"volume",    tip:"Controla tu volumen",       action:"ma-ma-MA-MA × 5", duration:8 },
          { instruction:"Lee lento: Ca-sa / Me-sa",    visual:"slow_read", tip:"Exagera cada sílaba",       action:"Muy despacio…",    duration:10 },
        ],
      },
      { id:"v3", title:"PA-TA-KA con voz", xp:25,
        audioText:"pa ta ka, pa ta ka, pa ta ka",
        example:"PA-TA-KA. Repite claro y a ritmo. Es el ejercicio más importante para la disartria.",
        steps:[
          { instruction:"Escucha y repite: PA-TA-KA", visual:"pataka",      tip:"Coordinación labios-lengua", action:"PA-TA-KA × 5",       duration:10 },
          { instruction:"Más rápido: PA-TA-KA",       visual:"pataka_fast", tip:"Mantén la claridad",         action:"PA-TA-KA × 8 rápido",duration:10 },
        ],
      },
    ],
  },
];

/* ─── ANIMATED SVG VISUALS ─────────────────────────────── */
function Visual({ type, active:t }) {
  const V = {
    belly:(
      <svg viewBox="0 0 120 130" className="w-full h-full">
        <g style={t?{animation:"breatheIn 3s ease-in-out infinite alternate"}:{}}>
          <circle cx="60" cy="50" r="36" fill="#FFE0B2" stroke="#FF8A65" strokeWidth="2.5"/>
          <circle cx="44" cy="42" r="6" fill="#4E342E"/><circle cx="76" cy="42" r="6" fill="#4E342E"/>
          <circle cx="46" cy="40" r="2" fill="white"/><circle cx="78" cy="40" r="2" fill="white"/>
          <path d="M46 62 Q60 74 74 62" stroke="#E64A19" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </g>
        <ellipse cx="60" cy="102" rx="30" ry="20" fill="#FFCCBC" stroke="#FF8A65" strokeWidth="2"
          style={t?{animation:"breatheIn 3s ease-in-out infinite alternate"}:{}}/>
        <text x="60" y="107" textAnchor="middle" fontSize="14" fill="#FF8A65" fontWeight="900">↕</text>
        <text x="60" y="128" textAnchor="middle" fontSize="10" fill="#BF360C" fontWeight="800">BARRIGA</text>
      </svg>
    ),
    hold:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="54" r="38" fill="#B3E5FC" stroke="#0288D1" strokeWidth="2.5"
          style={t?{animation:"holdPulse 1.5s ease-in-out infinite"}:{}}/>
        {t&&<circle cx="60" cy="54" r="38" fill="none" stroke="#29B6F6" strokeWidth="7" opacity="0"
          style={{animation:"ringPop 2s ease-out infinite"}}/>}
        <circle cx="44" cy="45" r="5.5" fill="#01579B"/><circle cx="76" cy="45" r="5.5" fill="#01579B"/>
        <circle cx="46" cy="43" r="2" fill="white"/><circle cx="78" cy="43" r="2" fill="white"/>
        <rect x="42" y="63" width="36" height="7" rx="3.5" fill="#01579B"/>
        <text x="60" y="106" textAnchor="middle" fontSize="11" fill="#0277BD" fontWeight="800">⏸ AGUANTA</text>
      </svg>
    ),
    exhale:(
      <svg viewBox="0 0 150 120" className="w-full h-full">
        <circle cx="50" cy="52" r="34" fill="#FFE0B2" stroke="#FF8A65" strokeWidth="2"/>
        <circle cx="38" cy="43" r="5" fill="#4E342E"/><circle cx="62" cy="43" r="5" fill="#4E342E"/>
        <path d="M36 64 Q50 74 64 64" stroke="#FF8A65" strokeWidth="2.5" fill="#FFCCBC" strokeLinecap="round"/>
        {[0,1,2,3].map(i=>(
          <path key={i} d={`M84 ${44+i*9} Q108 ${44+i*9} 138 ${40+i*11}`}
            stroke="#4FC3F7" strokeWidth={3-i*0.5} fill="none" strokeLinecap="round" strokeDasharray="7 4"
            style={t?{animation:`waveFlow ${0.8+i*0.15}s linear infinite`,animationDelay:`${i*0.13}s`}:{}}/>
        ))}
        <text x="74" y="112" textAnchor="middle" fontSize="11" fill="#0288D1" fontWeight="800">💨 EXHALA LENTO</text>
      </svg>
    ),
    candle:(
      <svg viewBox="0 0 120 130" className="w-full h-full">
        <rect x="46" y="72" width="28" height="48" rx="6" fill="#FFF9C4" stroke="#F9A825" strokeWidth="2"/>
        <ellipse cx="60" cy="70" rx="14" ry="5" fill="#F9A825"/>
        <g style={t?{animation:"flameFlick 0.55s ease-in-out infinite",transformOrigin:"60px 68px"}:{}}>
          <path d="M60 68 Q52 52 58 38 Q64 28 60 18 Q70 30 66 48 Q68 60 60 68" fill="#FF6F00"/>
          <path d="M60 68 Q56 54 59 42 Q63 34 60 24 Q66 36 63 52 Q64 62 60 68" fill="#FFC107"/>
          <path d="M60 68 Q58 57 60 48 Q62 57 60 68" fill="#FFEB3B"/>
        </g>
        <text x="60" y="128" textAnchor="middle" fontSize="10" fill="#E65100" fontWeight="800">SOPLA DESPACIO</text>
      </svg>
    ),
    candle_off:(
      <svg viewBox="0 0 120 130" className="w-full h-full">
        <rect x="46" y="72" width="28" height="48" rx="6" fill="#FFF9C4" stroke="#BDBDBD" strokeWidth="2"/>
        <ellipse cx="60" cy="70" rx="14" ry="5" fill="#BDBDBD"/>
        {[0,1,2].map(i=>(
          <path key={i} d={`M${57+i*3} 68 Q${55+i*5} ${52-i*4} ${59+i*3} ${40-i*7}`}
            stroke="#90A4AE" strokeWidth="1.5" fill="none" strokeDasharray="3 2"
            style={t?{animation:`smokeRise ${1+i*0.3}s ease-out infinite`,animationDelay:`${i*0.2}s`}:{}}/>
        ))}
        <text x="68" y="50" textAnchor="middle" fontSize="22">💨</text>
        <text x="60" y="128" textAnchor="middle" fontSize="10" fill="#E65100" fontWeight="800">¡APAGADA! 🎉</text>
      </svg>
    ),
    smile:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <g style={t?{animation:"smilePulse 1.2s ease-in-out infinite",transformOrigin:"60px 58px"}:{}}>
          <circle cx="60" cy="57" r="44" fill="#FFF9C4" stroke="#F9A825" strokeWidth="3"/>
          <circle cx="42" cy="47" r="7" fill="#5D4037"/><circle cx="78" cy="47" r="7" fill="#5D4037"/>
          <circle cx="44" cy="45" r="2.5" fill="white"/><circle cx="80" cy="45" r="2.5" fill="white"/>
          <path d="M30 67 Q60 100 90 67" stroke="#E91E63" strokeWidth="5" fill="#F48FB1" strokeLinecap="round"/>
          {[0,1,2,3].map(i=><rect key={i} x={36+i*14} y="67" width="10" height={12+i%2*4} rx="2" fill="white"/>)}
        </g>
        <text x="60" y="115" textAnchor="middle" fontSize="11" fill="#AD1457" fontWeight="900">SONRISA AMPLIA</text>
      </svg>
    ),
    pucker:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="55" r="42" fill="#FCE4EC" stroke="#F06292" strokeWidth="2.5"/>
        <circle cx="42" cy="45" r="6" fill="#5D4037"/><circle cx="78" cy="45" r="6" fill="#5D4037"/>
        <circle cx="44" cy="43" r="2" fill="white"/><circle cx="80" cy="43" r="2" fill="white"/>
        <g style={t?{animation:"pop 1s ease-in-out infinite",transformOrigin:"60px 73px"}:{}}>
          <ellipse cx="60" cy="73" rx="14" ry="12" fill="#F48FB1" stroke="#E91E63" strokeWidth="3"/>
          <circle cx="60" cy="73" r="6" fill="#C2185B"/>
        </g>
        <text x="60" y="113" textAnchor="middle" fontSize="11" fill="#AD1457" fontWeight="900">FRUNCIR LABIOS</text>
      </svg>
    ),
    alternate:(
      <svg viewBox="0 0 130 120" className="w-full h-full">
        <g style={t?{animation:"pop 0.8s ease-in-out infinite",transformOrigin:"32px 58px"}:{}}>
          <circle cx="32" cy="58" r="28" fill="#FFF9C4" stroke="#F9A825" strokeWidth="2"/>
          <circle cx="22" cy="50" r="4.5" fill="#5D4037"/><circle cx="42" cy="50" r="4.5" fill="#5D4037"/>
          <path d="M18 66 Q32 82 46 66" stroke="#E91E63" strokeWidth="3" fill="#F48FB1" strokeLinecap="round"/>
        </g>
        <text x="65" y="62" textAnchor="middle" fontSize="22" fill="#E91E63"
          style={t?{animation:"pulse 0.8s infinite"}:{}}>⟷</text>
        <g style={t?{animation:"pop 0.8s ease-in-out infinite 0.4s",transformOrigin:"98px 58px"}:{}}>
          <circle cx="98" cy="58" r="28" fill="#FCE4EC" stroke="#F06292" strokeWidth="2"/>
          <circle cx="88" cy="50" r="4.5" fill="#5D4037"/><circle cx="108" cy="50" r="4.5" fill="#5D4037"/>
          <ellipse cx="98" cy="68" rx="11" ry="8" fill="#F48FB1" stroke="#E91E63" strokeWidth="2"/>
        </g>
        <text x="65" y="110" textAnchor="middle" fontSize="10" fill="#AD1457" fontWeight="900">ALTERNA × 10</text>
      </svg>
    ),
    motor:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <g style={t?{animation:"motorVib 0.11s linear infinite"}:{}}>
          <circle cx="60" cy="50" r="36" fill="#FFE0B2" stroke="#FF8A65" strokeWidth="2.5"/>
          <circle cx="44" cy="41" r="5.5" fill="#4E342E"/><circle cx="76" cy="41" r="5.5" fill="#4E342E"/>
          <circle cx="46" cy="39" r="2" fill="white"/><circle cx="78" cy="39" r="2" fill="white"/>
          <path d="M36 62 Q60 58 84 62" stroke="#FF8A65" strokeWidth="3" fill="none" strokeLinecap="round"/>
          {[0,1,2,3,4].map(i=>(
            <path key={i} d={`M${36+i*12} 62 Q${42+i*12} 70 ${48+i*12} 62`}
              stroke="#FF8A65" strokeWidth="2.5" fill="none"
              style={t?{animation:`waveBar .12s linear infinite`,animationDelay:`${i*0.02}s`}:{}}/>
          ))}
        </g>
        <text x="60" y="100" textAnchor="middle" fontSize="15" fill="#BF360C" fontWeight="900">Brrrrrr…</text>
      </svg>
    ),
    pa:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="48" r="34" fill="#FCE4EC" stroke="#F06292" strokeWidth="2"/>
        <circle cx="44" cy="40" r="5" fill="#5D4037"/><circle cx="76" cy="40" r="5" fill="#5D4037"/>
        <g style={t?{animation:"pop .5s ease-in-out infinite"}:{}}>
          <ellipse cx="60" cy="63" rx="19" ry="9" fill="#E91E63" opacity=".9"/>
          <text x="60" y="68" textAnchor="middle" fontSize="13" fill="white" fontWeight="900">PA</text>
        </g>
        <text x="60" y="98" textAnchor="middle" fontSize="24" fill="#E91E63" fontWeight="900"
          style={t?{animation:"pop .5s ease-in-out infinite"}:{}}>PA-PA-PA</text>
        <text x="60" y="114" textAnchor="middle" fontSize="10" fill="#F06292">× 10 veces</text>
      </svg>
    ),
    ba:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="48" r="34" fill="#FCE4EC" stroke="#F06292" strokeWidth="2"/>
        <circle cx="44" cy="40" r="5" fill="#5D4037"/><circle cx="76" cy="40" r="5" fill="#5D4037"/>
        <g style={t?{animation:"pop .5s ease-in-out infinite .25s"}:{}}>
          <ellipse cx="60" cy="63" rx="19" ry="9" fill="#C2185B" opacity=".9"/>
          <text x="60" y="68" textAnchor="middle" fontSize="13" fill="white" fontWeight="900">BA</text>
        </g>
        <text x="60" y="98" textAnchor="middle" fontSize="24" fill="#C2185B" fontWeight="900"
          style={t?{animation:"pop .5s ease-in-out infinite .25s"}:{}}>BA-BA-BA</text>
        <text x="60" y="114" textAnchor="middle" fontSize="10" fill="#F06292">× 10 veces</text>
      </svg>
    ),
    tongue_up:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="52" r="36" fill="#FFE0B2" stroke="#FF8A65" strokeWidth="2"/>
        <circle cx="44" cy="43" r="5" fill="#4E342E"/><circle cx="76" cy="43" r="5" fill="#4E342E"/>
        <path d="M42 66 Q60 74 78 66" stroke="#FF8A65" strokeWidth="2" fill="#FFCCBC" strokeLinecap="round"/>
        <g style={t?{animation:"tongueUp 1.1s ease-in-out infinite"}:{}}>
          <ellipse cx="60" cy="58" rx="9" ry="18" fill="#EF9A9A"/>
          <ellipse cx="60" cy="49" rx="7" ry="7" fill="#EF9A9A"/>
        </g>
        <text x="60" y="108" textAnchor="middle" fontSize="11" fill="#BF360C" fontWeight="900">↑ HACIA ARRIBA</text>
      </svg>
    ),
    tongue_down:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="50" r="36" fill="#FFE0B2" stroke="#FF8A65" strokeWidth="2"/>
        <circle cx="44" cy="41" r="5" fill="#4E342E"/><circle cx="76" cy="41" r="5" fill="#4E342E"/>
        <path d="M42 62 Q60 70 78 62" stroke="#FF8A65" strokeWidth="2" fill="#FFCCBC" strokeLinecap="round"/>
        <g style={t?{animation:"tongueDown 1.1s ease-in-out infinite"}:{}}>
          <ellipse cx="60" cy="78" rx="9" ry="16" fill="#EF9A9A"/>
        </g>
        <text x="60" y="112" textAnchor="middle" fontSize="11" fill="#BF360C" fontWeight="900">↓ HACIA ABAJO</text>
      </svg>
    ),
    tongue_side:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="50" r="36" fill="#FFE0B2" stroke="#FF8A65" strokeWidth="2"/>
        <circle cx="44" cy="41" r="5" fill="#4E342E"/><circle cx="76" cy="41" r="5" fill="#4E342E"/>
        <path d="M42 62 Q60 70 78 62" stroke="#FF8A65" strokeWidth="2" fill="#FFCCBC" strokeLinecap="round"/>
        <g style={t?{animation:"tongueSide 1s ease-in-out infinite",transformOrigin:"60px 64px"}:{}}>
          <ellipse cx="60" cy="64" rx="19" ry="8" fill="#EF9A9A"/>
        </g>
        <text x="60" y="108" textAnchor="middle" fontSize="18" fill="#BF360C">⟵⟶</text>
        <text x="60" y="118" textAnchor="middle" fontSize="9" fill="#BF360C" fontWeight="800">DE LADO A LADO</text>
      </svg>
    ),
    ta:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="50" r="34" fill="#FFF3E0" stroke="#FF8A65" strokeWidth="2"/>
        <circle cx="44" cy="42" r="5" fill="#4E342E"/><circle cx="76" cy="42" r="5" fill="#4E342E"/>
        <path d="M42 62 Q60 78 78 62" stroke="#FF8A65" strokeWidth="2" fill="#FFCCBC"/>
        <ellipse cx="60" cy="54" rx="8" ry="6" fill="#EF9A9A"
          transform="rotate(-20,60,54)" style={t?{animation:"pop .4s ease-in-out infinite"}:{}}/>
        <text x="60" y="100" textAnchor="middle" fontSize="24" fill="#FF8A65" fontWeight="900"
          style={t?{animation:"pop .4s ease-in-out infinite"}:{}}>TA-TA-TA</text>
        <text x="60" y="116" textAnchor="middle" fontSize="10" fill="#BF360C">lengua al paladar</text>
      </svg>
    ),
    la:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="50" r="34" fill="#E8F5E9" stroke="#66BB6A" strokeWidth="2"/>
        <circle cx="44" cy="42" r="5" fill="#4E342E"/><circle cx="76" cy="42" r="5" fill="#4E342E"/>
        <path d="M42 62 Q60 78 78 62" stroke="#66BB6A" strokeWidth="2" fill="#C8E6C9"/>
        <ellipse cx="60" cy="62" rx="8" ry="14" fill="#A5D6A7"
          transform="rotate(10,60,62)" style={t?{animation:"tongueUp .8s ease-in-out infinite"}:{}}/>
        <text x="60" y="100" textAnchor="middle" fontSize="24" fill="#388E3C" fontWeight="900"
          style={t?{animation:"pop .8s ease-in-out infinite"}:{}}>LA-LA-LA</text>
        <text x="60" y="116" textAnchor="middle" fontSize="10" fill="#2E7D32">voz musical</text>
      </svg>
    ),
    pataka:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <rect x="4" y="4" width="112" height="112" rx="14" fill="#F3E5F5" stroke="#CE93D8" strokeWidth="2"/>
        <text x="60" y="30" textAnchor="middle" fontSize="12" fill="#7B1FA2" fontWeight="900">COORDINACIÓN ⭐</text>
        {["PA","TA","KA"].map((s,i)=>(
          <g key={s} style={t?{animation:`pop .5s ease-in-out infinite`,animationDelay:`${i*0.17}s`}:{}}>
            <rect x={14+i*34} y="38" width="28" height="32" rx="8"
              fill={["#E91E63","#FF9800","#4CAF50"][i]}/>
            <text x={28+i*34} y="59" textAnchor="middle" fontSize="16" fill="white" fontWeight="900">{s}</text>
          </g>
        ))}
        <text x="60" y="96" textAnchor="middle" fontSize="13" fill="#7B1FA2" fontWeight="800">PA-TA-KA × 5</text>
        <text x="60" y="112" textAnchor="middle" fontSize="10" fill="#9C27B0">Ejercicio esencial</text>
      </svg>
    ),
    pataka_fast:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <rect x="4" y="4" width="112" height="112" rx="14" fill="#EDE7F6" stroke="#7E57C2" strokeWidth="2"/>
        <text x="60" y="28" textAnchor="middle" fontSize="12" fill="#4527A0" fontWeight="900">¡MÁS RÁPIDO! 🚀</text>
        {["PA","TA","KA"].map((s,i)=>(
          <g key={s} style={t?{animation:`pop .25s ease-in-out infinite`,animationDelay:`${i*0.08}s`}:{}}>
            <rect x={14+i*34} y="36" width="28" height="32" rx="8"
              fill={["#9C27B0","#673AB7","#3F51B5"][i]}/>
            <text x={28+i*34} y="57" textAnchor="middle" fontSize="16" fill="white" fontWeight="900">{s}</text>
          </g>
        ))}
        <text x="60" y="94" textAnchor="middle" fontSize="12" fill="#4527A0" fontWeight="800">PA-TA-KA × 8</text>
        <text x="60" y="110" textAnchor="middle" fontSize="10" fill="#7E57C2">¡Mantén la claridad!</text>
      </svg>
    ),
    open_wide:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="47" r="36" fill="#FFF9C4" stroke="#F9A825" strokeWidth="2"/>
        <circle cx="42" cy="38" r="5.5" fill="#4E342E"/><circle cx="78" cy="38" r="5.5" fill="#4E342E"/>
        <circle cx="44" cy="36" r="2" fill="white"/><circle cx="80" cy="36" r="2" fill="white"/>
        <g style={t?{animation:"jawOpen 1.5s ease-in-out infinite",transformOrigin:"60px 60px"}:{}}>
          <path d="M28 57 Q60 100 92 57" stroke="#E65100" strokeWidth="3" fill="#FFCCBC"/>
          <ellipse cx="60" cy="80" rx="22" ry="14" fill="#C62828" opacity=".7"/>
          <ellipse cx="60" cy="87" rx="12" ry="7" fill="#EF9A9A"/>
        </g>
        <text x="60" y="116" textAnchor="middle" fontSize="10" fill="#E65100" fontWeight="900">BOCA MUY ABIERTA</text>
      </svg>
    ),
    close:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="55" r="36" fill="#FFF9C4" stroke="#F9A825" strokeWidth="2"/>
        <circle cx="42" cy="46" r="5.5" fill="#4E342E"/><circle cx="78" cy="46" r="5.5" fill="#4E342E"/>
        <circle cx="44" cy="44" r="2" fill="white"/><circle cx="80" cy="44" r="2" fill="white"/>
        <g style={t?{animation:"smilePulse 2s ease-in-out infinite",transformOrigin:"60px 68px"}:{}}>
          <path d="M40 68 Q60 73 80 68" stroke="#E65100" strokeWidth="4" fill="#FFCCBC" strokeLinecap="round"/>
        </g>
        <text x="60" y="107" textAnchor="middle" fontSize="10" fill="#E65100" fontWeight="900">CIERRA SUAVE</text>
      </svg>
    ),
    jaw_side:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="51" r="36" fill="#FFF9C4" stroke="#F9A825" strokeWidth="2"/>
        <circle cx="42" cy="42" r="5" fill="#4E342E"/><circle cx="78" cy="42" r="5" fill="#4E342E"/>
        <g style={t?{animation:"tongueSide 1.2s ease-in-out infinite",transformOrigin:"60px 65px"}:{}}>
          <path d="M36 65 Q60 71 84 65" stroke="#E65100" strokeWidth="4" fill="#FFCCBC" strokeLinecap="round"/>
        </g>
        <text x="60" y="101" textAnchor="middle" fontSize="20" fill="#E65100">⟵⟶</text>
        <text x="60" y="116" textAnchor="middle" fontSize="10" fill="#E65100" fontWeight="900">LADO A LADO</text>
      </svg>
    ),
    aaa:(
      <svg viewBox="0 0 120 130" className="w-full h-full">
        <g style={t?{animation:"breatheIn 2s ease-in-out infinite alternate"}:{}}>
          <circle cx="60" cy="50" r="38" fill="#F3E5F5" stroke="#CE93D8" strokeWidth="2.5"/>
          {t&&[0,1,2].map(i=>(
            <circle key={i} cx="60" cy="50" r="38" fill="none" stroke="#CE93D8" strokeWidth="5" opacity="0"
              style={{animation:`ringPop 2s ease-out infinite`,animationDelay:`${i*0.65}s`}}/>
          ))}
        </g>
        <circle cx="42" cy="40" r="6" fill="#4A148C"/><circle cx="78" cy="40" r="6" fill="#4A148C"/>
        <circle cx="44" cy="38" r="2" fill="white"/><circle cx="80" cy="38" r="2" fill="white"/>
        <path d="M34 58 Q60 94 86 58" stroke="#9C27B0" strokeWidth="4" fill="#E1BEE7"/>
        <ellipse cx="60" cy="74" rx="18" ry="12" fill="#7B1FA2" opacity=".7"
          style={t?{animation:"breatheIn 2s ease-in-out infinite alternate"}:{}}/>
        <text x="60" y="106" textAnchor="middle" fontSize="22" fill="#6A1B9A" fontWeight="900">Aaaaaaa</text>
        <text x="60" y="122" textAnchor="middle" fontSize="10" fill="#9C27B0">¡Lo más que puedas!</text>
      </svg>
    ),
    scale_up:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {["DO","RE","MI","FA","SOL"].map((n,i)=>(
          <g key={n} style={t?{animation:`scaleNote ${.4+i*.1}s ease-out infinite`,
              transformOrigin:`${18+i*21}px 108px`,animationDelay:`${i*.15}s`}:{}}>
            <rect x={8+i*21} y={90-i*13} width="19" height={13+i*13} rx="5"
              fill={`hsl(${270+i*12},65%,${62-i*6}%)`}/>
            <text x={17+i*21} y={108} textAnchor="middle" fontSize="8" fill="#4A148C" fontWeight="800">{n}</text>
          </g>
        ))}
        <path d="M17 87 L38 74 L59 61 L80 48 L101 35" stroke="#9C27B0" strokeWidth="2.5" strokeDasharray="5 3" fill="none"/>
        <text x="60" y="118" textAnchor="middle" fontSize="10" fill="#6A1B9A" fontWeight="800">↑ SUBE EL TONO</text>
      </svg>
    ),
    scale_down:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {["SOL","FA","MI","RE","DO"].map((n,i)=>(
          <g key={n} style={t?{animation:`scaleNote ${.4+i*.1}s ease-out infinite`,
              transformOrigin:`${18+i*21}px 108px`,animationDelay:`${i*.15}s`}:{}}>
            <rect x={8+i*21} y={28+i*12} width="19" height={72-i*12} rx="5"
              fill={`hsl(${300-i*12},65%,${55+i*5}%)`}/>
            <text x={17+i*21} y={108} textAnchor="middle" fontSize="8" fill="#4A148C" fontWeight="800">{n}</text>
          </g>
        ))}
        <path d="M17 30 L38 42 L59 54 L80 66 L101 78" stroke="#CE93D8" strokeWidth="2.5" strokeDasharray="5 3" fill="none"/>
        <text x="60" y="118" textAnchor="middle" fontSize="10" fill="#6A1B9A" fontWeight="800">↓ BAJA EL TONO</text>
      </svg>
    ),
    volume:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <g style={t?{animation:"pop 2s ease-in-out infinite",transformOrigin:"30px 62px"}:{}}>
          <circle cx="30" cy="62" r="22" fill="#E8F5E9" stroke="#66BB6A" strokeWidth="2"/>
          <text x="30" y="67" textAnchor="middle" fontSize="14" fill="#388E3C" fontWeight="800">ma</text>
        </g>
        <text x="62" y="66" textAnchor="middle" fontSize="18" fill="#9E9E9E" style={t?{animation:"pulse 1s infinite"}:{}}>→</text>
        <g style={t?{animation:"pop 2s ease-in-out infinite 1s",transformOrigin:"92px 58px"}:{}}>
          <circle cx="92" cy="58" r="30" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="3"/>
          <text x="92" y="64" textAnchor="middle" fontSize="20" fill="#1B5E20" fontWeight="900">MA</text>
        </g>
        {t&&[0,1,2].map(i=>(
          <circle key={i} cx="92" cy="58" r="30" fill="none" stroke="#81C784" strokeWidth="4" opacity="0"
            style={{animation:`ringPop 1.5s ease-out infinite`,animationDelay:`${i*.5}s`}}/>
        ))}
        <text x="60" y="106" textAnchor="middle" fontSize="11" fill="#2E7D32" fontWeight="800">ma-ma-MA-MA</text>
      </svg>
    ),
    slow_read:(
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <rect x="12" y="18" width="96" height="72" rx="10" fill="#FFFDE7" stroke="#F9A825" strokeWidth="2"/>
        {[["Ca","sa"],["Me","sa"],["Lu","na"]].map(([a,b],i)=>(
          <g key={i} style={t?{animation:`pop ${1+i*.3}s ease-in-out infinite`,animationDelay:`${i*.4}s`}:{}}>
            <text x="36" y={40+i*18} textAnchor="middle" fontSize="14" fill="#5D4037" fontWeight="800">{a}</text>
            <text x="50" y={40+i*18} textAnchor="middle" fontSize="14" fill="#BDBDBD">·</text>
            <text x="66" y={40+i*18} textAnchor="middle" fontSize="14" fill="#5D4037" fontWeight="800">{b}</text>
          </g>
        ))}
        <text x="60" y="108" textAnchor="middle" fontSize="13" fill="#F9A825" fontWeight="900">🐢 ¡DESPACIO!</text>
      </svg>
    ),
  };
  return V[type]||<div className="w-full h-full flex items-center justify-center text-5xl">❓</div>;
}

/* ─── PENGUIN ──────────────────────────────────────────── */
function Penguin({ mood="happy", size=80 }) {
  return (
    <svg width={size} height={size*1.1} viewBox="0 0 100 110"
      style={{animation:"float 2.2s ease-in-out infinite"}}>
      <ellipse cx="50" cy="75" rx="32" ry="36" fill="#1A237E"/>
      <ellipse cx="50" cy="81" rx="19" ry="23" fill="#F5F5F5"/>
      <circle cx="50" cy="38" r="29" fill="#1A237E"/>
      <ellipse cx="50" cy="43" rx="17" ry="15" fill="#F5F5F5"/>
      <circle cx="42" cy="36" r="6" fill="white"/><circle cx="58" cy="36" r="6" fill="white"/>
      <circle cx="43" cy="36" r="3.5" fill="#111"/><circle cx="59" cy="36" r="3.5" fill="#111"/>
      <circle cx="44" cy="35" r="1.2" fill="white"/><circle cx="60" cy="35" r="1.2" fill="white"/>
      <ellipse cx="50" cy="47" rx="7" ry="4" fill="#FF8F00"/>
      {mood==="happy"   &&<path d="M44 50 Q50 57 56 50" stroke="#FF8F00" strokeWidth="1.5" fill="none"/>}
      {mood==="excited" &&<path d="M40 49 Q50 60 60 49" stroke="#FF8F00" strokeWidth="2" fill="none"/>}
      {mood==="cheer"   &&<path d="M38 48 Q50 63 62 48" stroke="#FF8F00" strokeWidth="2.5" fill="#FFD54F"/>}
      <ellipse cx="19" cy="78" rx="13" ry="23" fill="#1A237E" transform="rotate(-14,19,78)"/>
      <ellipse cx="81" cy="78" rx="13" ry="23" fill="#1A237E" transform="rotate(14,81,78)"/>
      <ellipse cx="37" cy="109" rx="11" ry="5" fill="#FF8F00"/>
      <ellipse cx="63" cy="109" rx="11" ry="5" fill="#FF8F00"/>
      <rect x="21" y="60" width="58" height="10" rx="5" fill="#E53935"/>
      <rect x="44" y="63" width="12" height="18" rx="4" fill="#E53935"/>
    </svg>
  );
}

/* ─── WAVEFORM ─────────────────────────────────────────── */
function WaveformBars({ color="#CE93D8", active=false, n=11 }) {
  const heights = [0.4,0.8,1,0.6,0.9,0.5,0.7,1,0.4,0.8,0.6];
  return (
    <div className="flex items-center gap-0.5 h-8">
      {heights.slice(0,n).map((h,i)=>(
        <div key={i} className="rounded-full"
          style={{
            width:4, background:color,
            height: active?`${h*100}%`:"20%",
            transition:"height .15s",
            animation: active?`waveBar ${.28+i*.05}s ease-in-out infinite alternate`:"none",
            animationDelay:`${i*.04}s`,
          }}/>
      ))}
    </div>
  );
}

/* ─── VOICE PANEL ──────────────────────────────────────── */
function VoicePanel({ lesson, moduleColor, moduleDark }) {
  const [ttsOn,    setTtsOn]    = useState(false);
  const [recOn,    setRecOn]    = useState(false);
  const [recBlob,  setRecBlob]  = useState(null);
  const [playing,  setPlaying]  = useState(false);
  const [recSec,   setRecSec]   = useState(0);
  const [err,      setErr]      = useState("");
  const mrRef    = useRef(null);
  const chunkRef = useRef([]);
  const audRef   = useRef(null);
  const timerRef = useRef(null);

  const speak = () => {
    if(!window.speechSynthesis){setErr("Tu navegador no soporta texto a voz");return;}
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(lesson.audioText||lesson.example);
    u.lang="es-ES"; u.rate=0.82; u.pitch=1.1;
    const vs = window.speechSynthesis.getVoices();
    const sp = vs.find(v=>v.lang.startsWith("es")||v.lang.startsWith("ES"));
    if(sp) u.voice=sp;
    u.onstart=()=>setTtsOn(true);
    u.onend=()=>setTtsOn(false);
    u.onerror=()=>setTtsOn(false);
    window.speechSynthesis.speak(u);
  };
  const stopTts=()=>{window.speechSynthesis?.cancel();setTtsOn(false);};

  const startRec = async()=>{
    setErr(""); setRecBlob(null);
    try{
      const stream = await navigator.mediaDevices.getUserMedia({audio:true});
      chunkRef.current=[];
      const mr = new MediaRecorder(stream);
      mr.ondataavailable=e=>{if(e.data.size>0)chunkRef.current.push(e.data);};
      mr.onstop=()=>{
        setRecBlob(new Blob(chunkRef.current,{type:"audio/webm"}));
        stream.getTracks().forEach(t=>t.stop());
      };
      mr.start();
      mrRef.current=mr;
      setRecOn(true); setRecSec(0);
      timerRef.current=setInterval(()=>setRecSec(p=>p+1),1000);
    }catch{setErr("No se pudo acceder al micrófono. Permite el acceso.");}
  };
  const stopRec=()=>{
    if(mrRef.current?.state==="recording") mrRef.current.stop();
    clearInterval(timerRef.current); setRecOn(false);
  };
  const playRec=()=>{
    if(!recBlob)return;
    if(audRef.current){audRef.current.pause();audRef.current=null;setPlaying(false);return;}
    const url=URL.createObjectURL(recBlob);
    const a=new Audio(url); audRef.current=a; setPlaying(true);
    a.play(); a.onended=()=>{setPlaying(false);audRef.current=null;URL.revokeObjectURL(url);};
  };
  useEffect(()=>()=>{stopTts();stopRec();},[]);
  const fmt=s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  return (
    <div className="rounded-3xl overflow-hidden shadow-md" style={{border:`3px solid ${moduleColor}`}}>
      <div className="px-4 py-3" style={{background:`${moduleColor}20`}}>
        <p className="text-xs font-black uppercase tracking-widest mb-1" style={{color:moduleDark}}>📖 Ejemplo</p>
        <p className="text-sm text-gray-700 leading-relaxed">{lesson.example}</p>
      </div>
      <div className="bg-white px-4 py-3 space-y-2">
        {/* Listen */}
        <button onClick={ttsOn?stopTts:speak}
          className="w-full flex items-center gap-3 py-3 px-4 rounded-2xl font-black text-sm active:scale-95 transition-transform"
          style={{background:ttsOn?moduleDark:moduleColor,color:"white",boxShadow:`0 4px 0 ${moduleDark}`}}>
          <span className="text-xl">{ttsOn?"⏹":"🔊"}</span>
          <span className="flex-1 text-left">{ttsOn?"Detener ejemplo":"🔊 Escuchar ejemplo"}</span>
          {ttsOn&&<WaveformBars color="rgba(255,255,255,.9)" active/>}
        </button>
        {/* Record */}
        <button onClick={recOn?stopRec:startRec}
          className="w-full flex items-center gap-3 py-3 px-4 rounded-2xl font-black text-sm active:scale-95 transition-transform"
          style={{
            background:recOn?"#EF4444":"white",
            color:recOn?"white":"#EF4444",
            border:"3px solid #EF4444",
            boxShadow:recOn?"none":"0 4px 0 #FCA5A5",
            animation:recOn?"recPulse 1.5s infinite":"none",
          }}>
          <span className="text-xl">{recOn?"⏹":"🎙️"}</span>
          <span className="flex-1 text-left">{recOn?`Grabando… ${fmt(recSec)}`:"🎙️ Grabar mi voz"}</span>
          {recOn&&<WaveformBars color="rgba(255,255,255,.9)" active/>}
        </button>
        {/* Playback */}
        {recBlob&&(
          <button onClick={playRec}
            className="w-full flex items-center gap-3 py-3 px-4 rounded-2xl font-black text-sm active:scale-95 transition-transform"
            style={{
              background:playing?"#6A1B9A":"#F3E5F5",
              color:playing?"white":"#6A1B9A",
              border:"3px solid #CE93D8",
              boxShadow:"0 4px 0 #CE93D8",
            }}>
            <span className="text-xl">{playing?"⏹":"▶️"}</span>
            <span className="flex-1 text-left">{playing?"▶ Escuchando mi voz…":"▶ Escuchar mi grabación"}</span>
            {playing&&<WaveformBars color="rgba(255,255,255,.9)" active/>}
          </button>
        )}
        {err&&<p className="text-xs text-red-600 bg-red-50 rounded-xl p-2">{err}</p>}
      </div>
    </div>
  );
}

/* ─── PROGRESS BAR ─────────────────────────────────────── */
function ProgressBar({ value, max, color }) {
  return (
    <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700"
        style={{width:`${Math.min(100,(value/max)*100)}%`,background:color}}/>
    </div>
  );
}

/* ─── TIMER ────────────────────────────────────────────── */
function Timer({ seconds, color, onDone }) {
  const [left,setLeft]=useState(seconds);
  useEffect(()=>{
    setLeft(seconds);
    const id=setInterval(()=>setLeft(p=>{if(p<=1){clearInterval(id);onDone();return 0;}return p-1;}),1000);
    return()=>clearInterval(id);
  },[seconds]);
  return (
    <div className="relative w-24 h-24 mx-auto">
      <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
        <circle cx="48" cy="48" r="40" fill="none" stroke="#E0E0E0" strokeWidth="8"/>
        <circle cx="48" cy="48" r="40" fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${(left/seconds)*251.3} 251.3`} strokeLinecap="round"
          style={{transition:"stroke-dasharray 1s linear"}}/>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black" style={{color}}>{left}</span>
        <span className="text-xs text-gray-400">seg</span>
      </div>
    </div>
  );
}

/* ─── LESSON ───────────────────────────────────────────── */
function LessonScreen({ lesson, module, onBack, onComplete }) {
  const [stepIdx,setStepIdx]=useState(0);
  const [phase,setPhase]=useState("intro");
  const step=lesson.steps[stepIdx];
  const next=()=>{ if(stepIdx<lesson.steps.length-1){setStepIdx(s=>s+1);setPhase("intro");}else onComplete(lesson.xp); };
  return (
    <div className="flex flex-col h-full" style={{background:module.bg}}>
      <div className="flex items-center gap-3 px-4 pt-6 pb-3">
        <button onClick={onBack} className="text-2xl text-gray-500">✕</button>
        <div className="flex-1"><ProgressBar value={stepIdx+(phase==="done"?1:0)} max={lesson.steps.length} color={module.color}/></div>
        <span className="text-xs font-black" style={{color:module.dark}}>{stepIdx+1}/{lesson.steps.length}</span>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-3">
        <div className="w-52 h-52 mx-auto" style={{filter:`drop-shadow(0 8px 24px ${module.color}55)`,animation:"slideIn .4s ease"}}>
          <Visual type={step.visual} active={phase==="active"}/>
        </div>
        <div className="rounded-3xl bg-white p-4 shadow text-center" style={{borderTop:`5px solid ${module.color}`}}>
          <p className="text-lg font-black mb-1" style={{color:module.dark}}>{step.instruction}</p>
          <p className="text-sm text-gray-500">{step.tip}</p>
        </div>
        {module.isVoice&&lesson.example&&(
          <VoicePanel lesson={lesson} moduleColor={module.color} moduleDark={module.dark}/>
        )}
        {phase==="intro"&&(
          <button onClick={()=>setPhase("active")}
            className="w-full py-4 rounded-2xl text-white font-black active:scale-95 transition-transform"
            style={{background:module.color,boxShadow:`0 6px 0 ${module.dark}`}}>
            ▶ Comenzar ejercicio
          </button>
        )}
        {phase==="active"&&(
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-2xl p-3 w-full text-center"
              style={{background:`${module.color}28`,border:`2px solid ${module.color}`}}>
              <p className="font-black text-base" style={{color:module.dark}}>{step.action}</p>
            </div>
            <Timer seconds={step.duration} color={module.color} onDone={()=>setPhase("done")}/>
          </div>
        )}
        {phase==="done"&&(
          <div className="flex flex-col items-center gap-3" style={{animation:"slideIn .3s ease"}}>
            <div className="text-center"><div className="text-5xl">⭐</div>
              <p className="font-black text-lg mt-1" style={{color:module.dark}}>¡Muy bien!</p></div>
            <button onClick={next}
              className="w-full py-4 rounded-2xl text-white font-black active:scale-95 transition-transform"
              style={{background:module.color,boxShadow:`0 6px 0 ${module.dark}`}}>
              {stepIdx<lesson.steps.length-1?"Siguiente ➜":"¡Terminar! 🎉"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── COMPLETE ─────────────────────────────────────────── */
function CompleteScreen({ xp, lessonTitle, module, onContinue }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center relative overflow-hidden"
      style={{background:`linear-gradient(150deg,${module.bg},white)`}}>
      {Array.from({length:14},(_,i)=>(
        <div key={i} className="absolute top-0 rounded-full"
          style={{left:`${(i/14)*100}%`,width:10,height:10,
            background:[module.color,module.dark,"#FFD54F","#F06292","#81C784"][i%5],
            animation:`confettiFall ${1.2+i*.1}s ease-in forwards`,animationDelay:`${i*.07}s`}}/>
      ))}
      <Penguin mood="cheer" size={120}/>
      <h2 className="text-3xl font-black mt-3 mb-1" style={{color:module.dark}}>¡Excelente!</h2>
      <p className="text-gray-400 mb-5 text-sm">{lessonTitle}</p>
      <div className="rounded-3xl p-5 w-full bg-white shadow-xl mb-5"
        style={{border:`3px solid ${module.color}`}}>
        <div className="flex justify-around">
          {[[`+${xp}`,"XP",module.color],["⭐","Logro","#F9A825"],["🔥","Racha","#FF7043"]].map(([v,l,c])=>(
            <div key={l}>
              <div className="text-3xl font-black" style={{color:c}}>{v}</div>
              <div className="text-xs text-gray-400 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={onContinue}
        className="w-full py-4 rounded-2xl text-white text-lg font-black active:scale-95 transition-transform"
        style={{background:module.color,boxShadow:`0 6px 0 ${module.dark}`}}>
        ¡Continuar! 🐧
      </button>
    </div>
  );
}

/* ─── MODULE DETAIL ────────────────────────────────────── */
function ModuleDetail({ module, completedLessons, onBack, onStart }) {
  return (
    <div className="flex flex-col h-full" style={{background:module.bg}}>
      <div className="p-6 pb-8 text-center relative"
        style={{background:`linear-gradient(135deg,${module.color},${module.dark})`}}>
        <button onClick={onBack} className="absolute left-4 top-6 text-white text-2xl font-black">←</button>
        <div className="text-5xl mb-2" style={{animation:"float 2s ease-in-out infinite"}}>{module.emoji}</div>
        <h2 className="text-2xl font-black text-white">{module.title}</h2>
        <p className="text-white/70 text-sm mt-0.5">{module.lessons.length} lecciones</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {module.lessons.map(lesson=>{
          const done=completedLessons.includes(lesson.id);
          return (
            <button key={lesson.id} onClick={()=>!done&&onStart(lesson)}
              className="w-full rounded-2xl p-4 flex items-center gap-4 text-left active:scale-95 transition-transform"
              style={{background:done?module.color+"33":"white",
                border:`3px solid ${done?module.color:"#E0E0E0"}`,
                boxShadow:done?"none":"0 4px 0 #E0E0E0"}}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{background:done?module.color:module.bg}}>
                {done?"✅":module.emoji}
              </div>
              <div className="flex-1">
                <div className="font-black text-gray-800">{lesson.title}</div>
                <div className="text-xs text-gray-400 mt-0.5">{lesson.steps.length} pasos · +{lesson.xp} XP</div>
                {module.isVoice&&<div className="text-xs mt-1" style={{color:module.color}}>🎙️ Escuchar · Grabar · Reproducir</div>}
              </div>
              <span className="font-black text-xl" style={{color:done?"#4CAF50":module.color}}>
                {done?"✓":"▶"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── HOME ─────────────────────────────────────────────── */
function HomeScreen({ totalXP, streak, completedLessons, onSelect }) {
  const total=MODULES.reduce((a,m)=>a+m.lessons.length,0);
  const done=completedLessons.length;
  return (
    <div className="flex flex-col h-full overflow-hidden" style={{background:"#F0F4FF"}}>
      <div className="px-5 pt-8 pb-5"
        style={{background:"linear-gradient(135deg,#1A237E 0%,#283593 100%)"}}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-3xl font-black text-white leading-none">Pingus</h1>
            <h1 className="text-3xl font-black leading-none" style={{color:"#90CAF9"}}>Disartria</h1>
            <p className="text-white/50 text-xs mt-1">Terapia del habla 🐧</p>
          </div>
          <Penguin mood="excited" size={76}/>
        </div>
        <div className="flex gap-2">
          {[["🔥",`${streak}`,"Racha","#FFF176"],["⚡",`${totalXP}`,"XP","#A5D6A7"],[`${done}/${total}`,"","Lecciones","#90CAF9"]].map(([icon,val,label,c])=>(
            <div key={label} className="flex-1 rounded-2xl p-2 text-center" style={{background:"rgba(255,255,255,.13)"}}>
              <div className="text-lg font-black" style={{color:c}}>{icon} {val}</div>
              <div className="text-xs text-white/55">{label}</div>
            </div>
          ))}
        </div>
        <div className="mt-3"><ProgressBar value={done} max={total} color="#4FC3F7"/></div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Módulos</p>
        {MODULES.map(mod=>{
          const d=mod.lessons.filter(l=>completedLessons.includes(l.id)).length;
          return (
            <button key={mod.id} onClick={()=>onSelect(mod)}
              className="w-full rounded-3xl p-4 flex items-center gap-4 text-left active:scale-95 transition-transform bg-white"
              style={{border:`3px solid ${d===mod.lessons.length?mod.color:"#F0F0F0"}`,
                boxShadow:`0 4px 0 ${d===mod.lessons.length?mod.dark+"44":"#E0E0E0"}`}}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{background:mod.bg,animation:"float 2.5s ease-in-out infinite"}}>
                {mod.emoji}
              </div>
              <div className="flex-1">
                <div className="font-black text-gray-800 flex items-center gap-2 flex-wrap">
                  {mod.title}
                  {mod.isVoice&&<span className="text-xs px-2 py-0.5 rounded-full text-white font-bold"
                    style={{background:mod.color}}>🎙️ Voz</span>}
                </div>
                <div className="text-xs text-gray-400 mb-2">{d}/{mod.lessons.length} completadas</div>
                <ProgressBar value={d} max={mod.lessons.length} color={mod.color}/>
              </div>
              <span className="text-2xl font-black" style={{color:mod.color}}>
                {d===mod.lessons.length?"🏆":"›"}
              </span>
            </button>
          );
        })}
        <div className="rounded-3xl p-4" style={{background:"linear-gradient(135deg,#E3F2FD,#F3E5F5)"}}>
          <div className="flex gap-3 items-start">
            <span className="text-2xl">💡</span>
            <div>
              <p className="font-bold text-sm text-gray-700">Consejo del día</p>
              <p className="text-xs text-gray-500 mt-1">Practica 15–20 min al día frente a un espejo y graba tu voz para escuchar tu progreso. ¡La constancia es la clave!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ROOT ─────────────────────────────────────────────── */
export default function App() {
  const [screen,setScreen]=useState("home");
  const [mod,setMod]=useState(null);
  const [lesson,setLesson]=useState(null);
  const [done,setDone]=useState([]);
  const [xp,setXp]=useState(0);
  const [lastXp,setLastXp]=useState(0);
  return (
    <div className="phone-wrap">
      <div className="phone">
        {screen==="home"&&<HomeScreen totalXP={xp} streak={3} completedLessons={done}
          onSelect={m=>{setMod(m);setScreen("module");}}/>}
        {screen==="module"&&<ModuleDetail module={mod} completedLessons={done}
          onBack={()=>setScreen("home")} onStart={l=>{setLesson(l);setScreen("lesson");}}/>}
        {screen==="lesson"&&<LessonScreen lesson={lesson} module={mod}
          onBack={()=>setScreen("module")} onComplete={x=>{setLastXp(x);setScreen("complete");}}/>}
        {screen==="complete"&&<CompleteScreen xp={lastXp} lessonTitle={lesson.title} module={mod}
          onContinue={()=>{setDone(p=>[...p,lesson.id]);setXp(p=>p+lastXp);setScreen("module");}}/>}
      </div>
    </div>
  );
}
