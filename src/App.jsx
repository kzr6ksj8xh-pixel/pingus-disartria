import { useState, useEffect, useRef } from "react";

/* ═══════ CSS ═══════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap');
*{box-sizing:border-box;font-family:'Nunito',sans-serif;-webkit-tap-highlight-color:transparent}
body{margin:0;padding:0;background:#F5F5F5}
.scroll{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch}
.btn{display:block;width:100%;padding:15px;border-radius:16px;font-size:16px;font-weight:900;
  color:#fff;border:none;border-bottom:5px solid rgba(0,0,0,.22);
  transition:transform .1s,border-bottom-width .1s;cursor:pointer;font-family:'Nunito',sans-serif}
.btn:active{transform:translateY(3px);border-bottom-width:2px}
.card{background:#fff;border-radius:18px;border:2px solid #E8E8E8;border-bottom:5px solid #DEDEDE}
@keyframes breatheIn  {0%{transform:scale(1)}100%{transform:scale(1.18)}}
@keyframes float      {0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes bounce     {0%,100%{transform:translateY(0)}40%{transform:translateY(-14px)}70%{transform:translateY(-6px)}}
@keyframes slideUp    {from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes pop        {0%{transform:scale(1)}45%{transform:scale(1.18)}100%{transform:scale(1)}}
@keyframes blink      {0%,89%,100%{transform:scaleY(1)}93%{transform:scaleY(.07)}}
@keyframes wingL      {0%,100%{transform:rotate(-14deg)}50%{transform:rotate(-26deg)}}
@keyframes wingR      {0%,100%{transform:rotate(14deg)}50%{transform:rotate(26deg)}}
@keyframes confetti   {0%{transform:translateY(-8px) rotate(0deg);opacity:1}100%{transform:translateY(100px) rotate(720deg);opacity:0}}
@keyframes star       {0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.3) rotate(180deg)}}
@keyframes xpIn       {from{transform:scale(.4);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes waveBar    {0%,100%{transform:scaleY(.2)}50%{transform:scaleY(1)}}
@keyframes glowRed    {0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.5)}70%{box-shadow:0 0 0 14px rgba(239,68,68,0)}}
@keyframes ringOut    {0%{r:4;opacity:.9}100%{r:52;opacity:0}}
@keyframes waveFlow   {0%{stroke-dashoffset:50}100%{stroke-dashoffset:0}}
@keyframes noteRise   {0%{transform:scaleY(.2);opacity:.2}100%{transform:scaleY(1);opacity:1}}
@keyframes timerTick  {0%{transform:scale(1)}50%{transform:scale(1.14)}100%{transform:scale(1)}}
@keyframes holdPulse  {0%,100%{opacity:1}50%{opacity:.38}}
@keyframes mouthOpen  {0%,100%{transform:scaleY(.1)}50%{transform:scaleY(1)}}
@keyframes lipsPucker {0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
@keyframes tongueUp   {0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
@keyframes tongueDown {0%,100%{transform:translateY(0)}50%{transform:translateY(16px)}}
@keyframes tongueSide {0%{transform:translateX(-18px)}50%{transform:translateX(18px)}100%{transform:translateX(-18px)}}
@keyframes jawDrop    {0%,100%{transform:translateY(0)}50%{transform:translateY(16px)}}
@keyframes shine      {0%{opacity:0;transform:translateX(-40px)}50%{opacity:.7}100%{opacity:0;transform:translateX(40px)}}
`;

/* ═══════ AFASIA LAB COLORS ═══════ */
const COLORS = {
  respiracion: { color:"#1565C0", dark:"#0D47A1", bg:"#E3F2FD", light:"#BBDEFB" },
  labios:      { color:"#C62828", dark:"#B71C1C", bg:"#FFEBEE", light:"#FFCDD2" },
  lengua:      { color:"#E65100", dark:"#BF360C", bg:"#FBE9E7", light:"#FFCCBC" },
  mandibula:   { color:"#2E7D32", dark:"#1B5E20", bg:"#E8F5E9", light:"#C8E6C9" },
  voz:         { color:"#6A1B9A", dark:"#4A148C", bg:"#F3E5F5", light:"#E1BEE7" },
  construccion:{ color:"#546E7A", dark:"#37474F", bg:"#ECEFF1", light:"#CFD8DC" },
};

/* ═══════ CARTOON MOUTH SVG ═══════ */
function Boca({ estado = "neutral", activa = false }) {
  const a = activa;

  // Common mouth shell
  const MouthBase = ({ children, label }) => (
    <svg viewBox="0 0 300 260" style={{ width: "100%", height: "100%" }}>
      {/* Outer glow */}
      {a && <ellipse cx="150" cy="148" rx="120" ry="90" fill="rgba(200,0,50,.08)"
        style={{ animation: "breatheIn 2s ease-in-out infinite alternate" }} />}
      {children}
      {label && <text x="150" y="248" textAnchor="middle" fontSize="16" fill="#555" fontWeight="900"
        fontFamily="Nunito">{label}</text>}
    </svg>
  );

  /* ── SONRISA AMPLIA ── */
  if (estado === "smile") return (
    <MouthBase label="SONRISA AMPLIA 😁">
      <g style={a ? { animation: "pop 1s ease-in-out infinite", transformOrigin: "150px 150px" } : {}}>
        {/* Oral cavity */}
        <path d="M 52 138 Q 150 220 248 138 Q 200 175 150 178 Q 100 175 52 138 Z" fill="#1a0408" />
        {/* Lower teeth group */}
        <g>
          <path d="M 70 155 Q 150 168 230 155 Q 200 175 150 177 Q 100 175 70 155 Z" fill="white" />
          {[0,1,2,3,4,5,6].map(i => <line key={i} x1={74+i*24} y1="155" x2={72+i*24} y2="170"
            stroke="#E0E0E0" strokeWidth="2" />)}
          <path d="M 70 155 Q 150 168 230 155" fill="none" stroke="#DDDDDD" strokeWidth="1" />
        </g>
        {/* Upper teeth */}
        <path d="M 52 138 Q 150 126 248 138 Q 220 153 150 155 Q 80 153 52 138 Z" fill="white" />
        {[0,1,2,3,4,5,6,7].map(i => <line key={i} x1={56+i*25} y1="138" x2={55+i*25} y2="155"
          stroke="#E0E0E0" strokeWidth="2" />)}
        {/* Upper lip */}
        <path d="M 40 130 Q 95 102 150 106 Q 205 102 260 130 Q 210 138 150 138 Q 90 138 40 130 Z"
          fill="#CC1133" />
        {/* Lower lip */}
        <path d="M 40 130 Q 95 220 150 224 Q 205 220 260 130 Q 220 155 150 158 Q 80 155 40 130 Z"
          fill="#CC1133" />
        {/* Lip shine */}
        <path d="M 80 116 Q 150 108 220 116" fill="none" stroke="rgba(255,180,180,.7)" strokeWidth="6" strokeLinecap="round"
          style={a ? { animation: "shine 2s ease-in-out infinite" } : {}} />
        {/* Corner highlights */}
        <circle cx="40" cy="130" r="8" fill="#E0304A" />
        <circle cx="260" cy="130" r="8" fill="#E0304A" />
      </g>
    </MouthBase>
  );

  /* ── FRUNCIR ── */
  if (estado === "pucker") return (
    <MouthBase label="FRUNCIR LABIOS 💋">
      {/* Cheeks pushing in */}
      <g style={a ? { animation: "lipsPucker .9s ease-in-out infinite", transformOrigin: "150px 150px" } : {}}>
        {/* Cheek dimples effect */}
        <ellipse cx="82" cy="148" rx="26" ry="20" fill="#FFBBCC" opacity={a?".45":".25"}/>
        <ellipse cx="218" cy="148" rx="26" ry="20" fill="#FFBBCC" opacity={a?".45":".25"}/>
        {/* Inner dark opening */}
        <ellipse cx="150" cy="150" rx="18" ry="15" fill="#220008" />
        {/* Lip ring - pucker shape */}
        <ellipse cx="150" cy="150" rx="46" ry="42" fill="#CC1133" />
        <ellipse cx="150" cy="150" rx="18" ry="15" fill="#220008" />
        {/* Upper lip roll */}
        <path d="M 104 132 Q 127 118 150 121 Q 173 118 196 132 Q 173 136 150 137 Q 127 136 104 132 Z"
          fill="#DD2244" />
        {/* Lower lip roll - fuller */}
        <path d="M 104 168 Q 127 182 150 185 Q 173 182 196 168 Q 173 172 150 174 Q 127 172 104 168 Z"
          fill="#DD2244" />
        {/* Center crease */}
        <ellipse cx="150" cy="150" rx="32" ry="4" fill="#BB0022" opacity=".5"/>
        {/* Highlight upper */}
        <path d="M 120 127 Q 150 120 180 127" fill="none" stroke="rgba(255,200,200,.8)" strokeWidth="5" strokeLinecap="round"
          style={a?{animation:"shine 1.8s ease-in-out infinite"}:{}}/>
        {/* Highlight lower */}
        <path d="M 118 175 Q 150 183 182 175" fill="none" stroke="rgba(255,200,200,.5)" strokeWidth="4" strokeLinecap="round"/>
      </g>
    </MouthBase>
  );

  /* ── LENGUA ARRIBA ── */
  if (estado === "tongue_up") return (
    <MouthBase label="LENGUA ↑ ARRIBA">
      <path d="M 45 128 Q 150 212 255 128 Q 205 185 150 192 Q 95 185 45 128 Z" fill="#1a0408" />
      <g style={a ? { animation: "tongueUp 1s ease-in-out infinite" } : {}}>
        {/* Tongue body - bigger */}
        <ellipse cx="150" cy="160" rx="50" ry="36" fill="#C84060" />
        <ellipse cx="150" cy="148" rx="38" ry="28" fill="#E0607A" />
        <ellipse cx="150" cy="136" rx="24" ry="20" fill="#F07090" />
        {/* Tongue tip */}
        <ellipse cx="150" cy="122" rx="16" ry="14" fill="#F080A0" />
        {/* Center groove */}
        <path d="M 150 118 Q 150 158 150 175" fill="none" stroke="#A03050" strokeWidth="3.5" strokeLinecap="round" />
        {/* Shine */}
        <ellipse cx="140" cy="138" rx="8" ry="12" fill="rgba(255,180,200,.35)" transform="rotate(-15,140,138)"/>
      </g>
      <path d="M 45 128 Q 150 116 255 128 Q 218 144 150 146 Q 82 144 45 128 Z" fill="white" />
      {[0,1,2,3,4,5,6,7].map(i => <line key={i} x1={50+i*26} y1="128" x2={49+i*26} y2="146" stroke="#DDD" strokeWidth="2.5" />)}
      <path d="M 30 118 Q 90 88 150 92 Q 210 88 270 118 Q 214 128 150 128 Q 86 128 30 118 Z" fill="#CC1133" />
      <path d="M 30 118 Q 90 215 150 220 Q 210 215 270 118 Q 218 152 150 154 Q 82 152 30 118 Z" fill="#CC1133" />
      <path d="M 76 104 Q 150 96 224 104" fill="none" stroke="rgba(255,180,180,.7)" strokeWidth="6" strokeLinecap="round" />
    </MouthBase>
  );

  /* ── LENGUA ABAJO ── */
  if (estado === "tongue_down") return (
    <MouthBase label="LENGUA ↓ ABAJO">
      <path d="M 45 128 Q 150 212 255 128 Q 205 185 150 192 Q 95 185 45 128 Z" fill="#1a0408" />
      <path d="M 45 128 Q 150 116 255 128 Q 218 144 150 146 Q 82 144 45 128 Z" fill="white" />
      {[0,1,2,3,4,5,6,7].map(i => <line key={i} x1={50+i*26} y1="128" x2={49+i*26} y2="146" stroke="#DDD" strokeWidth="2.5" />)}
      <g style={a ? { animation: "tongueDown 1s ease-in-out infinite" } : {}}>
        <ellipse cx="150" cy="175" rx="50" ry="32" fill="#C84060" />
        <ellipse cx="150" cy="183" rx="38" ry="24" fill="#E0607A" />
        <ellipse cx="150" cy="190" rx="24" ry="16" fill="#F07090" />
        <path d="M 150 170 Q 150 192 150 198" fill="none" stroke="#A03050" strokeWidth="3.5" strokeLinecap="round" />
        <ellipse cx="140" cy="178" rx="8" ry="10" fill="rgba(255,180,200,.35)" transform="rotate(-15,140,178)"/>
      </g>
      <path d="M 30 118 Q 90 88 150 92 Q 210 88 270 118 Q 214 128 150 128 Q 86 128 30 118 Z" fill="#CC1133" />
      <path d="M 30 118 Q 90 215 150 220 Q 210 215 270 118 Q 218 152 150 154 Q 82 152 30 118 Z" fill="#CC1133" />
      <path d="M 76 104 Q 150 96 224 104" fill="none" stroke="rgba(255,180,180,.7)" strokeWidth="6" strokeLinecap="round" />
    </MouthBase>
  );

    /* ── LENGUA LADO ── */
  if (estado === "tongue_side") return (
    <MouthBase label="LENGUA ⟵⟶ LADO A LADO">
      <path d="M 55 130 Q 150 200 245 130 Q 200 178 150 182 Q 100 178 55 130 Z" fill="#2a0810" />
      <g style={a ? { animation: "tongueSide .9s ease-in-out infinite", transformOrigin: "150px 162px" } : {}}>
        <ellipse cx="150" cy="162" rx="48" ry="24" fill="#E07090" />
        <path d="M 110 162 Q 150 156 190 162" fill="none" stroke="#C0506A" strokeWidth="2.5" />
      </g>
      <path d="M 55 130 Q 150 120 245 130 Q 215 145 150 147 Q 85 145 55 130 Z" fill="white" />
      {[0,1,2,3,4,5,6].map(i => <line key={i} x1={60+i*28} y1="130" x2={59+i*28} y2="147" stroke="#DDD" strokeWidth="2" />)}
      <path d="M 42 122 Q 96 96 150 100 Q 204 96 258 122 Q 208 130 150 130 Q 92 130 42 122 Z" fill="#CC1133" />
      <path d="M 42 122 Q 96 210 150 215 Q 204 210 258 122 Q 215 148 150 150 Q 85 148 42 122 Z" fill="#CC1133" />
      <path d="M 82 108 Q 150 101 218 108" fill="none" stroke="rgba(255,180,180,.6)" strokeWidth="5" strokeLinecap="round" />
    </MouthBase>
  );

  /* ── BOCA ABIERTA (mandíbula) ── */
  if (estado === "open") return (
    <MouthBase label="BOCA MUY ABIERTA">
      {/* Lower jaw drops */}
      <g style={a ? { animation: "jawDrop 1.4s ease-in-out infinite", transformOrigin: "150px 148px" } : {}}>
        <path d="M 52 148 Q 150 230 248 148 Q 205 200 150 208 Q 95 200 52 148 Z" fill="#2a0810" />
        {/* Lower teeth */}
        <path d="M 68 168 Q 150 183 232 168 Q 205 200 150 205 Q 95 200 68 168 Z" fill="white" />
        {[0,1,2,3,4,5,6].map(i => <line key={i} x1={72+i*25} y1="168" x2={71+i*25} y2="183" stroke="#DDD" strokeWidth="2" />)}
        {/* Tongue */}
        <ellipse cx="150" cy="195" rx="42" ry="20" fill="#D4607A" />
        <ellipse cx="150" cy="190" rx="28" ry="14" fill="#E07090" />
        <path d="M 150 185 Q 150 200 150 205" fill="none" stroke="#C0506A" strokeWidth="3" strokeLinecap="round" />
        {/* Lower lip */}
        <path d="M 52 148 Q 96 232 150 238 Q 204 232 248 148 Q 215 172 150 175 Q 85 172 52 148 Z" fill="#CC1133" />
      </g>
      {/* Upper teeth (static) */}
      <path d="M 52 148 Q 150 136 248 148 Q 215 162 150 164 Q 85 162 52 148 Z" fill="white" />
      {[0,1,2,3,4,5,6,7].map(i => <line key={i} x1={56+i*25} y1="148" x2={55+i*25} y2="164" stroke="#DDD" strokeWidth="2" />)}
      {/* Upper lip */}
      <path d="M 38 138 Q 94 108 150 112 Q 206 108 262 138 Q 212 148 150 148 Q 88 148 38 138 Z" fill="#CC1133" />
      <path d="M 78 120 Q 150 112 222 120" fill="none" stroke="rgba(255,180,180,.6)" strokeWidth="6" strokeLinecap="round" />
    </MouthBase>
  );

  /* ── BOCA CERRADA ── */
  if (estado === "close") return (
    <MouthBase label="CIERRA SUAVEMENTE">
      <path d="M 62 142 Q 100 130 150 132 Q 200 130 238 142 Q 200 152 150 154 Q 100 152 62 142 Z" fill="#CC1133" />
      <path d="M 62 142 Q 100 162 150 165 Q 200 162 238 142 Q 205 155 150 158 Q 95 155 62 142 Z" fill="#CC1133" />
      <path d="M 80 138 Q 150 130 220 138" fill="none" stroke="rgba(255,180,180,.6)" strokeWidth="5" strokeLinecap="round" />
      <path d="M 62 142 Q 150 148 238 142" fill="none" stroke="#AA0022" strokeWidth="2.5" />
    </MouthBase>
  );

  /* ── MANDÍBULA LADO ── */
  if (estado === "jaw_side") return (
    <MouthBase label="MANDÍBULA ⟵⟶ LADO">
      <g style={a ? { animation: "tongueSide 1.1s ease-in-out infinite", transformOrigin: "150px 158px" } : {}}>
        <path d="M 55 140 Q 150 195 245 140 Q 210 180 150 186 Q 90 180 55 140 Z" fill="#2a0810" />
        <path d="M 68 158 Q 150 172 232 158 Q 200 183 150 187 Q 100 183 68 158 Z" fill="white" />
        {[0,1,2,3,4,5,6].map(i => <line key={i} x1={72+i*25} y1="158" x2={71+i*25} y2="172" stroke="#DDD" strokeWidth="2" />)}
        <path d="M 55 140 Q 90 195 150 200 Q 210 195 245 140 Q 212 166 150 170 Q 88 166 55 140 Z" fill="#CC1133" />
      </g>
      <path d="M 55 140 Q 150 128 245 140 Q 212 154 150 156 Q 88 154 55 140 Z" fill="white" />
      {[0,1,2,3,4,5,6].map(i => <line key={i} x1={60+i*28} y1="140" x2={59+i*28} y2="156" stroke="#DDD" strokeWidth="2" />)}
      <path d="M 40 130 Q 95 102 150 106 Q 205 102 260 130 Q 212 140 150 140 Q 88 140 40 130 Z" fill="#CC1133" />
      <path d="M 78 114 Q 150 106 222 114" fill="none" stroke="rgba(255,180,180,.6)" strokeWidth="6" strokeLinecap="round" />
    </MouthBase>
  );

  /* ── PA / BA sílabas ── */
  if (estado === "pa" || estado === "ba") {
    const col = estado === "pa" ? "#C62828" : "#AD1457";
    const txt = estado === "pa" ? "PA-PA-PA" : "BA-BA-BA";
    return (
      <MouthBase label={txt + " × 10 veces"}>
        <g style={a ? { animation: "pop .5s ease-in-out infinite", transformOrigin: "150px 148px" } : {}}>
          <path d="M 55 145 Q 150 200 245 145 Q 200 175 150 180 Q 100 175 55 145 Z" fill="#1a0408" />
          <path d="M 55 145 Q 150 133 245 145 Q 210 158 150 160 Q 90 158 55 145 Z" fill="white" />
          {[0,1,2,3,4,5,6].map(i => <line key={i} x1={60+i*27} y1="145" x2={59+i*27} y2="160" stroke="#DDD" strokeWidth="2" />)}
          <path d="M 40 133 Q 95 104 150 108 Q 205 104 260 133 Q 212 145 150 145 Q 88 145 40 133 Z" fill={col} />
          <path d="M 40 133 Q 95 205 150 210 Q 205 205 260 133 Q 215 165 150 168 Q 85 165 40 133 Z" fill={col} />
          <path d="M 78 116 Q 150 108 222 116" fill="none" stroke="rgba(255,180,180,.6)" strokeWidth="5" strokeLinecap="round" />
        </g>
        <text x="150" y="230" textAnchor="middle" fontSize="28" fill={col} fontWeight="900" fontFamily="Nunito"
          style={a ? { animation: "pop .5s ease-in-out infinite" } : {}}>{txt}</text>
      </MouthBase>
    );
  }

  /* ── TA / LA ── */
  if (estado === "ta" || estado === "la") {
    const col = estado === "ta" ? "#E65100" : "#2E7D32";
    const txt = estado === "ta" ? "TA-TA-TA" : "LA-LA-LA";
    const sub = estado === "ta" ? "lengua al paladar" : "voz musical y clara";
    return (
      <MouthBase label="">
        <path d="M 55 135 Q 150 195 245 135 Q 200 175 150 180 Q 100 175 55 135 Z" fill="#2a0810" />
        {/* Tongue for TA */}
        {estado === "ta" && (
          <g style={a ? { animation: "pop .4s ease-in-out infinite" } : {}}>
            <ellipse cx="150" cy="128" rx="32" ry="16" fill="#E07090" />
          </g>
        )}
        {/* Tongue for LA */}
        {estado === "la" && (
          <g style={a ? { animation: "tongueUp .8s ease-in-out infinite" } : {}}>
            <ellipse cx="150" cy="140" rx="28" ry="20" fill="#E07090" />
            <ellipse cx="150" cy="128" rx="16" ry="12" fill="#E07090" />
          </g>
        )}
        <path d="M 55 135 Q 150 122 245 135 Q 212 148 150 150 Q 88 148 55 135 Z" fill="white" />
        {[0,1,2,3,4,5,6].map(i => <line key={i} x1={60+i*27} y1="135" x2={59+i*27} y2="150" stroke="#DDD" strokeWidth="2" />)}
        <path d="M 40 124 Q 95 96 150 100 Q 205 96 260 124 Q 212 135 150 135 Q 88 135 40 124 Z" fill={col} />
        <path d="M 40 124 Q 95 200 150 205 Q 205 200 260 124 Q 215 150 150 153 Q 85 150 40 124 Z" fill={col} />
        <path d="M 80 108 Q 150 100 220 108" fill="none" stroke="rgba(255,200,180,.6)" strokeWidth="5" strokeLinecap="round" />
        <text x="150" y="226" textAnchor="middle" fontSize="26" fill={col} fontWeight="900" fontFamily="Nunito"
          style={a ? { animation: "pop .45s ease-in-out infinite" } : {}}>{txt}</text>
        <text x="150" y="248" textAnchor="middle" fontSize="14" fill="#888" fontFamily="Nunito">{sub}</text>
      </MouthBase>
    );
  }

  /* ── PA-TA-KA ── */
  if (estado === "pataka" || estado === "pataka_fast") {
    const fast = estado === "pataka_fast";
    return (
      <svg viewBox="0 0 300 260" style={{ width: "100%", height: "100%" }}>
        <rect x="8" y="8" width="284" height="244" rx="24" fill={fast?"#EDE7F6":"#F3E5F5"} stroke={fast?"#7E57C2":"#CE93D8"} strokeWidth="2.5"/>
        <text x="150" y="42" textAnchor="middle" fontSize="15" fill={fast?"#4527A0":"#7B1FA2"} fontWeight="900" fontFamily="Nunito">
          {fast?"¡MÁS RÁPIDO! 🚀":"COORDINACIÓN ⭐"}
        </text>
        {["PA","TA","KA"].map((s,i)=>(
          <g key={s} style={a?{animation:`pop ${fast?.22:.5}s ease-in-out infinite`,animationDelay:`${i*(fast?.07:.17)}s`}:{}}>
            <rect x={24+i*86} y="58" width="72" height="60" rx="16" fill={["#C62828","#E65100","#2E7D32"][i]}/>
            <text x={60+i*86} y="97" textAnchor="middle" fontSize="28" fill="white" fontWeight="900" fontFamily="Nunito">{s}</text>
          </g>
        ))}
        <text x="150" y="148" textAnchor="middle" fontSize="15" fill={fast?"#4527A0":"#7B1FA2"} fontWeight="800" fontFamily="Nunito">
          {fast?"PA-TA-KA × 8":"PA-TA-KA × 5"}
        </text>
        <text x="150" y="168" textAnchor="middle" fontSize="12" fill="#888" fontFamily="Nunito">
          {fast?"¡Mantén la claridad!":"Ejercicio esencial para la disartria"}
        </text>
        {/* Small mouth illustration */}
        <path d="M 80 198 Q 150 240 220 198 Q 185 220 150 223 Q 115 220 80 198 Z" fill="#2a0810"/>
        <path d="M 80 198 Q 150 186 220 198 Q 185 210 150 212 Q 115 210 80 198 Z" fill="white"/>
        <path d="M 72 190 Q 115 166 150 170 Q 185 166 228 190 Q 192 198 150 198 Q 108 198 72 190 Z" fill={fast?"#9C27B0":"#CC1133"}/>
        <path d="M 72 190 Q 115 236 150 240 Q 185 236 228 190 Q 196 212 150 215 Q 104 212 72 190 Z" fill={fast?"#9C27B0":"#CC1133"}/>
      </svg>
    );
  }

  /* ── BREATHING VISUALS ── */
  if (estado === "belly") return (
    <svg viewBox="0 0 300 260" style={{ width: "100%", height: "100%" }}>
      <g style={a?{animation:"breatheIn 3s ease-in-out infinite alternate"}:{}}>
        <ellipse cx="150" cy="118" rx="110" ry="96" fill="#E3F2FD" stroke="#1565C0" strokeWidth="3"/>
        {[0,1,2].map(i=>(
          <circle key={i} cx="150" cy="118" r="0" fill="none" stroke="#4FC3F7" strokeWidth="5" opacity="0"
            style={a?{animation:`ringOut ${2+i*.5}s ease-out infinite`,animationDelay:`${i*.6}s`}:{}}/>
        ))}
        <ellipse cx="150" cy="118" rx="70" ry="60" fill="#BBDEFB" stroke="#1565C0" strokeWidth="2"/>
        <text x="150" y="128" textAnchor="middle" fontSize="36" fontFamily="Nunito">😮</text>
        <ellipse cx="150" cy="195" rx="44" ry="26" fill="#BBDEFB" stroke="#1565C0" strokeWidth="2"/>
        <text x="150" y="202" textAnchor="middle" fontSize="18" fill="#1565C0" fontWeight="900">↕</text>
      </g>
      <text x="150" y="244" textAnchor="middle" fontSize="13" fill="#0D47A1" fontWeight="900">RESPIRA CON LA BARRIGA</text>
    </svg>
  );

  if (estado === "hold") return (
    <svg viewBox="0 0 300 260" style={{ width: "100%", height: "100%" }}>
      {a&&[0,1,2].map(i=>(
        <circle key={i} cx="150" cy="118" r="0" fill="none" stroke="#4FC3F7" strokeWidth="5" opacity="0"
          style={{animation:`ringOut ${2+i*.5}s ease-out infinite`,animationDelay:`${i*.6}s`}}/>
      ))}
      <circle cx="150" cy="118" r="90" fill="#BBDEFB" stroke="#1565C0" strokeWidth="3"
        style={a?{animation:"holdPulse 2s ease-in-out infinite"}:{}}/>
      <text x="150" y="100" textAnchor="middle" fontSize="42" fontFamily="Nunito">😶</text>
      <rect x="106" y="126" width="88" height="14" rx="7" fill="#1565C0" opacity=".7"/>
      <text x="150" y="244" textAnchor="middle" fontSize="13" fill="#0D47A1" fontWeight="900">⏸ AGUANTA EL AIRE</text>
    </svg>
  );

  if (estado === "exhale") return (
    <svg viewBox="0 0 300 260" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="90" cy="118" rx="74" ry="62" fill="#BBDEFB" stroke="#1565C0" strokeWidth="2.5"/>
      <text x="90" y="108" textAnchor="middle" fontSize="36">😮</text>
      <path d="M 90 124 Q 120 132 150 130" stroke="#1565C0" strokeWidth="2.5" fill="none"/>
      {[0,1,2,3,4].map(i=>(
        <path key={i} d={`M172 ${88+i*14} Q220 ${88+i*13} 278 ${84+i*16}`}
          stroke={["#4FC3F7","#29B6F6","#0288D1","#01579B","#4DD0E1"][i]}
          strokeWidth={3.5-i*.5} fill="none" strokeLinecap="round" strokeDasharray="9 5"
          style={a?{animation:`waveFlow ${.7+i*.12}s linear infinite`,animationDelay:`${i*.1}s`}:{}}/>
      ))}
      <text x="150" y="244" textAnchor="middle" fontSize="13" fill="#0D47A1" fontWeight="900">💨 EXHALA MUY LENTO</text>
    </svg>
  );

  /* ── VOZ VISUALS ── */
  if (estado === "aaa") return (
    <svg viewBox="0 0 300 260" style={{ width: "100%", height: "100%" }}>
      {a&&[0,1,2,3].map(i=>(
        <circle key={i} cx="150" cy="110" r="0" fill="none" stroke="#9C27B0" strokeWidth="5" opacity="0"
          style={{animation:`ringOut ${2+i*.4}s ease-out infinite`,animationDelay:`${i*.5}s`}}/>
      ))}
      <g style={a?{animation:"breatheIn 2s ease-in-out infinite alternate"}:{}}>
        <circle cx="150" cy="110" r="84" fill="#F3E5F5" stroke="#9C27B0" strokeWidth="3"/>
      </g>
      {/* Open mouth singing */}
      <path d="M 80 108 Q 150 190 220 108 Q 185 155 150 160 Q 115 155 80 108 Z" fill="#2a0810"/>
      <ellipse cx="150" cy="145" rx="36" ry="24" fill="#D4607A"/>
      <path d="M 80 108 Q 150 96 220 108 Q 188 120 150 122 Q 112 120 80 108 Z" fill="white"/>
      {[0,1,2,3,4,5,6].map(i=><line key={i} x1={84+i*22} y1="108" x2={83+i*22} y2="122" stroke="#DDD" strokeWidth="2"/>)}
      <path d="M 66 98 Q 108 70 150 74 Q 192 70 234 98 Q 196 108 150 108 Q 104 108 66 98 Z" fill="#9C27B0"/>
      <path d="M 66 98 Q 108 178 150 183 Q 192 178 234 98 Q 200 130 150 133 Q 100 130 66 98 Z" fill="#9C27B0"/>
      <path d="M 95 80 Q 150 72 205 80" fill="none" stroke="rgba(230,180,240,.7)" strokeWidth="5" strokeLinecap="round"/>
      <text x="150" y="220" textAnchor="middle" fontSize="24" fill="#6A1B9A" fontWeight="900" fontFamily="Nunito">Aaaaaaa</text>
      <text x="150" y="244" textAnchor="middle" fontSize="12" fill="#9C27B0">¡Lo más que puedas!</text>
    </svg>
  );

  if (estado === "scale_up") return (
    <svg viewBox="0 0 300 260" style={{ width: "100%", height: "100%" }}>
      {["DO","RE","MI","FA","SOL"].map((n,i)=>(
        <g key={n} style={a?{animation:`noteRise ${.35+i*.1}s ease-out infinite`,transformOrigin:`${34+i*50}px 195px`,animationDelay:`${i*.13}s`}:{}}>
          <rect x={18+i*50} y={148-i*24} width="34" height={38+i*24} rx="7" fill={`hsl(${270+i*12},70%,${58-i*5}%)`}/>
          <text x={35+i*50} y="210" textAnchor="middle" fontSize="11" fill="#4A148C" fontWeight="800" fontFamily="Nunito">{n}</text>
        </g>
      ))}
      <path d="M35 146 L85 122 L135 98 L185 74 L235 50" stroke="#9C27B0" strokeWidth="3" strokeDasharray="6 3" fill="none"/>
      <text x="150" y="244" textAnchor="middle" fontSize="13" fill="#6A1B9A" fontWeight="900">↑ SUBE EL TONO</text>
    </svg>
  );

  if (estado === "scale_down") return (
    <svg viewBox="0 0 300 260" style={{ width: "100%", height: "100%" }}>
      {["SOL","FA","MI","RE","DO"].map((n,i)=>(
        <g key={n} style={a?{animation:`noteRise ${.35+i*.1}s ease-out infinite`,transformOrigin:`${34+i*50}px 195px`,animationDelay:`${i*.13}s`}:{}}>
          <rect x={18+i*50} y={44+i*20} width="34" height={148-i*20} rx="7" fill={`hsl(${300-i*12},65%,${52+i*5}%)`}/>
          <text x={35+i*50} y="210" textAnchor="middle" fontSize="11" fill="#4A148C" fontWeight="800" fontFamily="Nunito">{n}</text>
        </g>
      ))}
      <path d="M35 46 L85 66 L135 86 L185 106 L235 126" stroke="#CE93D8" strokeWidth="3" strokeDasharray="6 3" fill="none"/>
      <text x="150" y="244" textAnchor="middle" fontSize="13" fill="#6A1B9A" fontWeight="900">↓ BAJA EL TONO</text>
    </svg>
  );

  if (estado === "volume") return (
    <svg viewBox="0 0 300 260" style={{ width: "100%", height: "100%" }}>
      <g style={a?{animation:"pop 1.8s ease-in-out infinite",transformOrigin:"72px 128px"}:{}}>
        <circle cx="72" cy="128" r="50" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="2.5"/>
        <text x="72" y="136" textAnchor="middle" fontSize="22" fill="#388E3C" fontWeight="800">ma</text>
      </g>
      <text x="150" y="134" textAnchor="middle" fontSize="26" fill="#9E9E9E" style={a?{animation:"pop .9s infinite"}:{}}>→</text>
      <g style={a?{animation:"pop 1.8s ease-in-out infinite .9s",transformOrigin:"228px 120px"}:{}}>
        <circle cx="228" cy="120" r="64" fill="#E8F5E9" stroke="#1B5E20" strokeWidth="3"/>
        <text x="228" y="129" textAnchor="middle" fontSize="28" fill="#1B5E20" fontWeight="900">MA</text>
      </g>
      {a&&[0,1,2].map(i=>(
        <circle key={i} cx="228" cy="120" r="0" fill="none" stroke="#81C784" strokeWidth="4" opacity="0"
          style={{animation:`ringOut 1.5s ease-out infinite`,animationDelay:`${i*.5}s`}}/>
      ))}
      <text x="150" y="222" textAnchor="middle" fontSize="14" fill="#2E7D32" fontWeight="800">ma-ma-MA-MA</text>
      <text x="150" y="244" textAnchor="middle" fontSize="12" fill="#888">Controla tu volumen</text>
    </svg>
  );

  if (estado === "slow_read") return (
    <svg viewBox="0 0 300 260" style={{ width: "100%", height: "100%" }}>
      <rect x="22" y="22" width="256" height="164" rx="18" fill="#FFFDE7" stroke="#F9A825" strokeWidth="2.5"/>
      {[["Ca","·","sa"],["Me","·","sa"],["Lu","·","na"]].map(([a2,d,b],i)=>(
        <g key={i} style={a?{animation:`pop ${.9+i*.3}s ease-in-out infinite`,animationDelay:`${i*.38}s`}:{}}>
          <text x="94" y={68+i*34} textAnchor="middle" fontSize="21" fill="#5D4037" fontWeight="800" fontFamily="Nunito">{a2}</text>
          <text x="124" y={68+i*34} textAnchor="middle" fontSize="21" fill="#BDBDBD" fontFamily="Nunito">{d}</text>
          <text x="160" y={68+i*34} textAnchor="middle" fontSize="21" fill="#5D4037" fontWeight="800" fontFamily="Nunito">{b}</text>
        </g>
      ))}
      <text x="150" y="222" textAnchor="middle" fontSize="18" fill="#F9A825" fontWeight="900">🐢 ¡DESPACIO!</text>
      <text x="150" y="248" textAnchor="middle" fontSize="12" fill="#888">Exagera cada sílaba</text>
    </svg>
  );

  // Neutral/default
  return (
    <svg viewBox="0 0 300 260" style={{ width: "100%", height: "100%" }}>
      <path d="M 62 148 Q 110 128 150 130 Q 190 128 238 148 Q 195 160 150 162 Q 105 160 62 148 Z" fill="#CC1133"/>
      <path d="M 62 148 Q 110 172 150 175 Q 190 172 238 148 Q 198 162 150 165 Q 102 162 62 148 Z" fill="#CC1133"/>
      <path d="M 80 138 Q 150 128 220 138" fill="none" stroke="rgba(255,180,180,.6)" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  );
}

/* ═══════ DATA ═══════ */
const MODULES = [
  {
    id:"respiracion", title:"Respiración", emoji:"🌬️", ...COLORS.respiracion,
    desc:"Control de la respiración para el habla",
    lessons:[
      {
        id:"r1", title:"Respiración profunda", xp:15,
        isBreathing:true, totalSeconds:180,
        sequence:[
          {label:"INHALA",  duration:6, visual:"belly",  tip:"Siente cómo sube la barriga", color:"#1565C0"},
          {label:"AGUANTA", duration:4, visual:"hold",   tip:"Mantén el aire con calma",    color:"#29B6F6"},
          {label:"EXHALA",  duration:6, visual:"exhale", tip:"Sopla muy lento por la boca", color:"#0288D1"},
        ],
      },
    ],
  },
  {
    id:"labios", title:"Labios", emoji:"👄", ...COLORS.labios,
    desc:"Fuerza y coordinación de los labios",
    lessons:[
      {
        id:"l1", title:"Sonrisa y fruncir", xp:10,
        isContinuous:true, totalSeconds:120,
        phases:[
          {label:"SONRISA AMPLIA",  visual:"smile",  duration:5, tip:"¡Muestra todos los dientes!"},
          {label:"FRUNCIR LABIOS", visual:"pucker", duration:5, tip:"Como dar un beso"},
        ],
      },
      {
        id:"l2", title:"Motor de labios", xp:15,
        steps:[
          {instruction:"Escucha el ejemplo y vibra los labios",visual:"pa", tip:"Relaja completamente los labios", action:"Brrrrr — 5 repeticiones", duration:20, hasAudio:true, audioText:"brrrr... brrrr... brrrr... brrrr... brrrr"},
          {instruction:"Repite PA-PA-PA", visual:"pa", tip:"Acentúa con fuerza labial", action:"PA-PA-PA × 10", duration:8},
          {instruction:"Repite BA-BA-BA", visual:"ba", tip:"Siente la vibración", action:"BA-BA-BA × 10", duration:8},
        ],
      },
    ],
  },
  {
    id:"lengua", title:"Lengua", emoji:"👅", ...COLORS.lengua,
    desc:"Movilidad y precisión de la lengua",
    lessons:[
      {
        id:"le1", title:"Movimientos básicos", xp:10,
        isContinuous:true, totalSeconds:120,
        phases:[
          {label:"ARRIBA ↑",  visual:"tongue_up",   duration:4, tip:"Sin mover la cabeza"},
          {label:"ABAJO ↓",   visual:"tongue_down", duration:4, tip:"Lo más abajo posible"},
          {label:"LADO ⟵⟶", visual:"tongue_side", duration:4, tip:"Como limpiaparabrisas"},
        ],
      },
      {
        id:"le2", title:"Sílabas clave", xp:15,
        hasSyllableAudio:true,
        steps:[
          {instruction:"Escucha y repite: TA-TA-TA", visual:"ta",     tip:"Lengua toca el paladar duro", action:"TA-TA-TA × 10", duration:8, audio:"ta... ta... ta... ta... ta... ta... ta... ta... ta... ta"},
          {instruction:"Escucha y repite: LA-LA-LA", visual:"la",     tip:"Voz musical y clara",          action:"LA-LA-LA × 10", duration:8, audio:"la... la... la... la... la... la... la... la... la... la"},
          {instruction:"PA-TA-KA coordinación",      visual:"pataka", tip:"El ejercicio más importante ⭐", action:"PA-TA-KA × 5",  duration:15,audio:"pa ta ka... pa ta ka... pa ta ka... pa ta ka... pa ta ka"},
        ],
      },
    ],
  },
  {
    id:"mandibula", title:"Mandíbula", emoji:"🦷", ...COLORS.mandibula,
    desc:"Control y movimiento de la mandíbula",
    lessons:[
      {
        id:"m1", title:"Abrir y cerrar", xp:10,
        steps:[
          {instruction:"Abre la boca al máximo", visual:"open",     tip:"Lento y controlado",     action:"Mantén 5 seg",  duration:5},
          {instruction:"Cierra muy suavemente",  visual:"close",    tip:"Sin apretar los dientes",action:"× 5 rep",       duration:7},
          {instruction:"Mandíbula de lado",      visual:"jaw_side", tip:"Como masticando chicle", action:"× 10 mov",      duration:8},
        ],
      },
    ],
  },
  {
    id:"voz", title:"Voz", emoji:"🎤", ...COLORS.voz,
    desc:"Volumen, tono y calidad de la voz",
    isVoice:true,
    lessons:[
      {
        id:"v1", title:"Sostener vocal AAA", xp:15,
        audioText:"Aaaaaaa aaaaaaa aaaaaaa",
        example:"Inhala profundo y di Aaaaaaa lo más que puedas, con voz constante y uniforme.",
        steps:[
          {instruction:"Escucha el ejemplo, luego imita", visual:"aaa",        tip:"Voz constante y uniforme",       action:"¡Aguanta! 8 seg",   duration:8},
          {instruction:"Sube el tono: do-re-mi-fa-sol",  visual:"scale_up",   tip:"Como escalera musical ascendente",action:"Sube… 6 seg",       duration:6},
          {instruction:"Baja el tono: sol-fa-mi-re-do",  visual:"scale_down", tip:"Suave y controlado al bajar",    action:"Baja… 6 seg",       duration:6},
        ],
      },
      {
        id:"v2", title:"Volumen y ritmo", xp:20,
        audioText:"ma... ma... MA... MA... ma... ma... MA... MA",
        example:"Di ma suave y luego MA fuerte. Controla tu volumen conscientemente.",
        steps:[
          {instruction:"ma suave → MA FUERTE",     visual:"volume",    tip:"Controla tu volumen",    action:"ma-ma-MA-MA × 5",duration:10},
          {instruction:"Lee lento: Ca-sa / Me-sa", visual:"slow_read", tip:"Exagera cada sílaba",    action:"Muy despacio…",  duration:12},
        ],
      },
      {
        id:"v3", title:"PA-TA-KA con voz", xp:25,
        audioText:"pa... ta... ka... pa... ta... ka... pa... ta... ka... pa... ta... ka... pa... ta... ka",
        example:"PA-TA-KA. Repite claro y despacio. Es el ejercicio más importante para la disartria.",
        steps:[
          {instruction:"Escucha y repite: PA-TA-KA",  visual:"pataka",      tip:"Coordinación labios-lengua",action:"PA-TA-KA × 5",      duration:15},
          {instruction:"Más rápido: PA-TA-KA",        visual:"pataka_fast", tip:"Mantén la claridad",       action:"PA-TA-KA × 8",      duration:12},
        ],
      },
    ],
  },
  {
    id:"construccion", title:"Próximamente", emoji:"🔧", ...COLORS.construccion,
    desc:"Nuevo módulo en desarrollo",
    isComingSoon:true,
    lessons:[],
  },
];

/* ═══════ HELPERS ═══════ */
function doSpeak(text, rate=0.52, onEnd) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang="es-ES"; u.rate=rate; u.pitch=1.0;
  const sp = window.speechSynthesis.getVoices().find(v=>v.lang.startsWith("es")||v.lang.startsWith("ES"));
  if (sp) u.voice = sp;
  if (onEnd) u.onend = onEnd;
  window.speechSynthesis.speak(u);
}

function Penguin({mood="happy",size=80,anim="float 2.2s ease-in-out infinite"}){
  const M={happy:<path d="M44 50 Q50 57 56 50" stroke="#FF8F00" strokeWidth="1.8" fill="none"/>,
    excited:<path d="M40 49 Q50 62 60 49" stroke="#FF8F00" strokeWidth="2.2" fill="none"/>,
    cheer:<path d="M37 48 Q50 65 63 48" stroke="#FF8F00" strokeWidth="2.5" fill="#FFD54F"/>};
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
    {M[mood]||M.happy}
    <ellipse cx="19" cy="78" rx="13" ry="23" fill="#1A237E" style={{transformOrigin:"19px 65px",animation:"wingL 2.2s ease-in-out infinite"}}/>
    <ellipse cx="81" cy="78" rx="13" ry="23" fill="#1A237E" style={{transformOrigin:"81px 65px",animation:"wingR 2.2s ease-in-out infinite"}}/>
    <rect x="22" y="60" width="56" height="11" rx="5.5" fill="#E53935"/>
    <rect x="44" y="63" width="12" height="19" rx="4" fill="#E53935"/>
    <rect x="26" y="62" width="22" height="3.5" rx="1.5" fill="rgba(255,255,255,.35)"/>
  </svg>;
}

function ProgBar({val,max,color}){
  return <div style={{width:"100%",height:13,background:"#E8E8E8",borderRadius:7,overflow:"hidden"}}>
    <div style={{height:"100%",borderRadius:7,background:color,width:`${Math.min(100,(val/max)*100)}%`,
      transition:"width .7s cubic-bezier(.34,1.56,.64,1)",boxShadow:`0 2px 5px ${color}55`}}/>
  </div>;
}

function CircleTimer({secs,total,color,sz=96}){
  const r=sz*.38, circ=2*Math.PI*r, low=secs<=5;
  return <div style={{position:"relative",width:sz,height:sz,margin:"0 auto"}}>
    <svg viewBox={`0 0 ${sz} ${sz}`} style={{width:"100%",height:"100%",transform:"rotate(-90deg)"}}>
      <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke="#E8E8E8" strokeWidth="8"/>
      <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={low?"#EF4444":color} strokeWidth="8"
        strokeDasharray={`${(secs/total)*circ} ${circ}`} strokeLinecap="round"
        style={{transition:"stroke-dasharray 1s linear,stroke .3s"}}/>
    </svg>
    <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <span style={{fontSize:sz*.3,fontWeight:900,lineHeight:1,color:low?"#EF4444":color,
        animation:low?"timerTick .5s ease-in-out infinite":"none"}}>{secs}</span>
      <span style={{fontSize:10,color:"#aaa",marginTop:1}}>seg</span>
    </div>
    {low&&<div style={{position:"absolute",inset:0,borderRadius:"50%",border:"4px solid #EF4444",animation:"glowRed 1s infinite"}}/>}
  </div>;
}

function WaveBars({active,color="white"}){
  return <div style={{display:"flex",alignItems:"center",gap:2,height:22,marginLeft:"auto"}}>
    {[.3,.8,1,.5,.9,.6,.8].map((h,i)=>(
      <div key={i} style={{width:3.5,borderRadius:2,background:color,height:`${h*100}%`,
        animation:active?`waveBar ${.25+i*.04}s ease-in-out infinite alternate`:"none",animationDelay:`${i*.03}s`}}/>
    ))}
  </div>;
}

/* ═══════ BREATHING EXERCISE ═══════ */
function BreathingEx({lesson,m,onBack,onDone}){
  const seq = lesson.sequence;
  const phaseRef = useRef(0);
  const stepSecRef = useRef(seq[0].duration);
  const totalSecRef = useRef(lesson.totalSeconds);
  const [phase,setPhase] = useState(0);
  const [stepSec,setStepSec] = useState(seq[0].duration);
  const [totalSec,setTotalSec] = useState(lesson.totalSeconds);
  const [cycles,setCycles] = useState(0);
  const [started,setStarted] = useState(false);
  const tickRef = useRef(null);
  const totalRef = useRef(null);

  const start = () => {
    setStarted(true);
    phaseRef.current = 0; stepSecRef.current = seq[0].duration;
    setPhase(0); setStepSec(seq[0].duration);
    tickRef.current = setInterval(()=>{
      stepSecRef.current -= 1;
      setStepSec(stepSecRef.current);
      if(stepSecRef.current <= 0){
        const next = (phaseRef.current+1)%3;
        if(next===0) setCycles(c=>c+1);
        phaseRef.current = next;
        stepSecRef.current = seq[next].duration;
        setPhase(next);
        setStepSec(seq[next].duration);
      }
    },1000);
    totalRef.current = setInterval(()=>{
      totalSecRef.current -= 1;
      setTotalSec(totalSecRef.current);
      if(totalSecRef.current <= 0){
        clearInterval(tickRef.current);
        clearInterval(totalRef.current);
        onDone(lesson.xp);
      }
    },1000);
  };

  useEffect(()=>()=>{clearInterval(tickRef.current);clearInterval(totalRef.current);},[]);

  const cur = seq[phase];
  const tm = Math.floor(totalSec/60), ts = totalSec%60;

  return <div style={{display:"flex",flexDirection:"column",height:"100%",background:"#fff"}}>
    <div style={{padding:"14px 14px 10px",borderBottom:`3px solid ${m.color}`}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
        <button onClick={()=>{clearInterval(tickRef.current);clearInterval(totalRef.current);onBack();}}
          style={{background:"#f0f0f0",border:"none",borderRadius:10,width:34,height:34,fontSize:17,color:"#666",cursor:"pointer"}}>✕</button>
        <div style={{flex:1,height:12,background:"#E8E8E8",borderRadius:6,overflow:"hidden"}}>
          <div style={{height:"100%",background:`linear-gradient(90deg,${m.color},${m.dark})`,borderRadius:6,
            width:`${((lesson.totalSeconds-totalSec)/lesson.totalSeconds)*100}%`,transition:"width 1s linear"}}/>
        </div>
        <div style={{background:totalSec<=30?"#FEE2E2":m.bg,color:totalSec<=30?"#EF4444":m.dark,
          fontWeight:900,fontSize:15,padding:"3px 10px",borderRadius:10,animation:totalSec<=30?"timerTick 1s infinite":"none"}}>
          ⏱ {tm}:{String(ts).padStart(2,"0")}
        </div>
      </div>
      <div style={{fontSize:11,color:"#aaa",textAlign:"center"}}>Ciclos: {cycles} · Inhala 6s → Aguanta 4s → Exhala 6s</div>
    </div>
    <div className="scroll" style={{padding:"10px 14px 18px",display:"flex",flexDirection:"column",gap:10}}>
      <div style={{width:260,height:230,margin:"0 auto",filter:`drop-shadow(0 6px 16px ${cur.color}44)`,animation:"slideUp .4s ease"}}>
        <Boca estado={cur.visual} activa={started}/>
      </div>
      <div style={{display:"flex",gap:6}}>
        {seq.map((s,i)=>(
          <div key={i} style={{flex:1,padding:"8px 4px",borderRadius:12,textAlign:"center",
            background:i===phase&&started?s.color:"#F5F5F5",
            color:i===phase&&started?"white":"#aaa",
            fontWeight:900,fontSize:11,border:`2px solid ${i===phase&&started?s.color:"#E0E0E0"}`,transition:"all .3s"}}>
            {s.label}<br/><span style={{fontSize:10}}>{s.duration}s</span>
          </div>
        ))}
      </div>
      <div className="card" style={{padding:14,textAlign:"center"}}>
        {!started
          ? <><div style={{fontSize:17,fontWeight:900,color:m.dark,marginBottom:4}}>Secuencia de respiración</div>
              <div style={{fontSize:13,color:"#888"}}>Inhala 6s → Aguanta 4s → Exhala 6s</div>
              <div style={{fontSize:12,color:"#aaa",marginTop:3}}>Tiempo total: 3 minutos</div></>
          : <><div style={{fontSize:22,fontWeight:900,color:cur.color,marginBottom:3}}>{cur.label}</div>
              <div style={{fontSize:13,color:"#666"}}>{cur.tip}</div></>}
      </div>
      {!started
        ? <button className="btn" onClick={start} style={{background:m.color,boxShadow:`0 5px 0 ${m.dark}`}}>
            ▶ Comenzar — 3 minutos
          </button>
        : <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <CircleTimer secs={stepSec} total={cur.duration} color={cur.color} sz={110}/>
          </div>}
    </div>
  </div>;
}

/* ═══════ CONTINUOUS EXERCISE ═══════ */
function ContinuousEx({lesson,m,onBack,onDone}){
  const phases = lesson.phases;
  const phRef = useRef(0);
  const stRef = useRef(phases[0].duration);
  const totRef = useRef(lesson.totalSeconds);
  const [ph,setPh] = useState(0);
  const [st,setSt] = useState(phases[0].duration);
  const [tot,setTot] = useState(lesson.totalSeconds);
  const [started,setStarted] = useState(false);
  const tickRef = useRef(null);
  const totalRef = useRef(null);

  const start = () => {
    setStarted(true);
    phRef.current=0; stRef.current=phases[0].duration;
    setPh(0); setSt(phases[0].duration);
    tickRef.current = setInterval(()=>{
      stRef.current -= 1;
      setSt(stRef.current);
      if(stRef.current <= 0){
        const next=(phRef.current+1)%phases.length;
        phRef.current=next; stRef.current=phases[next].duration;
        setPh(next); setSt(phases[next].duration);
      }
    },1000);
    totalRef.current = setInterval(()=>{
      totRef.current -= 1;
      setTot(totRef.current);
      if(totRef.current<=0){clearInterval(tickRef.current);clearInterval(totalRef.current);onDone(lesson.xp);}
    },1000);
  };

  useEffect(()=>()=>{clearInterval(tickRef.current);clearInterval(totalRef.current);},[]);
  const cur = phases[ph];
  const tm=Math.floor(tot/60), ts=tot%60;

  return <div style={{display:"flex",flexDirection:"column",height:"100%",background:"#fff"}}>
    <div style={{padding:"14px 14px 10px",borderBottom:`3px solid ${m.color}`}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
        <button onClick={()=>{clearInterval(tickRef.current);clearInterval(totalRef.current);onBack();}}
          style={{background:"#f0f0f0",border:"none",borderRadius:10,width:34,height:34,fontSize:17,color:"#666",cursor:"pointer"}}>✕</button>
        <div style={{flex:1,height:12,background:"#E8E8E8",borderRadius:6,overflow:"hidden"}}>
          <div style={{height:"100%",background:m.color,borderRadius:6,
            width:`${((lesson.totalSeconds-tot)/lesson.totalSeconds)*100}%`,transition:"width 1s linear"}}/>
        </div>
        <div style={{background:tot<=30?"#FEE2E2":m.bg,color:tot<=30?"#EF4444":m.dark,
          fontWeight:900,fontSize:15,padding:"3px 10px",borderRadius:10}}>
          ⏱ {tm}:{String(ts).padStart(2,"0")}
        </div>
      </div>
      <div style={{display:"flex",gap:4,justifyContent:"center"}}>
        {phases.map((p,i)=>(
          <div key={i} style={{flex:1,padding:"5px 2px",borderRadius:8,textAlign:"center",
            background:i===ph&&started?m.color:"#F5F5F5",color:i===ph&&started?"white":"#aaa",
            fontWeight:900,fontSize:10,border:`2px solid ${i===ph&&started?m.color:"#E0E0E0"}`,transition:"all .3s"}}>
            {p.label}
          </div>
        ))}
      </div>
    </div>
    <div className="scroll" style={{padding:"10px 14px 18px",display:"flex",flexDirection:"column",gap:10}}>
      <div style={{width:260,height:230,margin:"0 auto",filter:`drop-shadow(0 6px 16px ${m.color}44)`}}>
        <Boca estado={cur.visual} activa={started}/>
      </div>
      <div className="card" style={{padding:14,textAlign:"center"}}>
        {!started
          ? <><div style={{fontSize:17,fontWeight:900,color:m.dark,marginBottom:4}}>{lesson.title}</div>
              <div style={{fontSize:13,color:"#888"}}>Ejercicio continuo — {phases.map(p=>p.label).join(" → ")}</div>
              <div style={{fontSize:12,color:"#aaa",marginTop:3}}>Tiempo total: 2 minutos</div></>
          : <><div style={{fontSize:20,fontWeight:900,color:m.color,marginBottom:2}}>{cur.label}</div>
              <div style={{fontSize:13,color:"#666"}}>{cur.tip}</div></>}
      </div>
      {!started
        ? <button className="btn" onClick={start} style={{background:m.color,boxShadow:`0 5px 0 ${m.dark}`}}>
            ▶ Comenzar — 2 minutos
          </button>
        : <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <CircleTimer secs={st} total={cur.duration} color={m.color} sz={100}/>
          </div>}
    </div>
  </div>;
}

/* ═══════ VOICE PANEL ═══════ */
function VoicePanel({lesson,m}){
  const [ttsOn,setTtsOn]=useState(false);
  const [recOn,setRecOn]=useState(false);
  const [recBlob,setRecBlob]=useState(null);
  const [recSec,setRecSec]=useState(0);
  const mrRef=useRef(null),chunkRef=useRef([]),timerRef=useRef(null);

  const playEx=()=>{
    if(ttsOn){window.speechSynthesis?.cancel();setTtsOn(false);return;}
    doSpeak(lesson.audioText||lesson.example,0.48,()=>setTtsOn(false));
    setTtsOn(true);
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
  const playRec=()=>{
    if(!recBlob)return;
    const url=URL.createObjectURL(recBlob);
    const a=new Audio(url);a.play();a.onended=()=>URL.revokeObjectURL(url);
  };
  useEffect(()=>()=>{window.speechSynthesis?.cancel();clearInterval(timerRef.current);},[]);
  const fmt=s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  return <div style={{borderRadius:16,overflow:"hidden",border:`2.5px solid ${m.color}`,borderBottom:`5px solid ${m.dark}`}}>
    <div style={{padding:"10px 14px",background:`${m.color}18`}}>
      <div style={{fontSize:10,fontWeight:900,textTransform:"uppercase",letterSpacing:2,color:m.dark,marginBottom:3}}>📖 Ejemplo</div>
      <div style={{fontSize:13,color:"#444",lineHeight:1.5}}>{lesson.example}</div>
    </div>
    <div style={{background:"#fff",padding:"10px 14px",display:"flex",flexDirection:"column",gap:7}}>
      <button className="btn" onClick={playEx} style={{background:ttsOn?m.dark:m.color,boxShadow:`0 4px 0 ${m.dark}`,
        fontSize:14,display:"flex",alignItems:"center",gap:10,padding:"11px 14px"}}>
        <span style={{fontSize:20}}>{ttsOn?"⏹":"🔊"}</span>
        <span style={{flex:1,textAlign:"left"}}>{ttsOn?"Detener":"🔊 Escuchar ejemplo (lento)"}</span>
        {ttsOn&&<WaveBars active/>}
      </button>
      <button className="btn" onClick={toggleRec} style={{background:recOn?"#EF4444":"white",color:recOn?"white":"#EF4444",
        border:"2.5px solid #EF4444",borderBottom:`5px solid ${recOn?"#C62828":"#FFCDD2"}`,boxShadow:"none",
        fontSize:14,display:"flex",alignItems:"center",gap:10,padding:"11px 14px",animation:recOn?"glowRed 1.5s infinite":"none"}}>
        <span style={{fontSize:20}}>{recOn?"⏹":"🎙️"}</span>
        <span style={{flex:1,textAlign:"left"}}>{recOn?`Grabando… ${fmt(recSec)}`:"🎙️ Grabar mi voz"}</span>
        {recOn&&<WaveBars active color="#EF4444"/>}
      </button>
      {recBlob&&<>
        <button className="btn" onClick={playRec} style={{background:m.bg,color:m.dark,
          border:`2.5px solid ${m.color}`,borderBottom:`5px solid ${m.dark}`,boxShadow:"none",
          fontSize:14,display:"flex",alignItems:"center",gap:10,padding:"11px 14px"}}>
          <span style={{fontSize:20}}>▶️</span>
          <span style={{flex:1,textAlign:"left"}}>▶ Escuchar mi grabación</span>
        </button>
        <div style={{fontSize:11,color:"#888",textAlign:"center",padding:"4px 0"}}>
          💡 Escucha tu grabación y compara con el ejemplo antes de continuar
        </div>
      </>}
    </div>
  </div>;
}


/* ═══════ STEP RECORDER ═══════ */
function StepRecorder({m, stepAudio, lessonExample}){
  const [recOn,setRecOn]=useState(false);
  const [recBlob,setRecBlob]=useState(null);
  const [playing,setPlaying]=useState(false);
  const [recSec,setRecSec]=useState(0);
  const mrRef=useRef(null),chunkRef=useRef([]),timerRef=useRef(null),audRef=useRef(null);

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
  const playEx=()=>{ doSpeak(stepAudio||lessonExample||"",0.48); };
  const playRec=()=>{
    if(!recBlob)return;
    if(audRef.current){audRef.current.pause();audRef.current=null;setPlaying(false);return;}
    const url=URL.createObjectURL(recBlob);
    const a=new Audio(url);audRef.current=a;setPlaying(true);
    a.play();a.onended=()=>{setPlaying(false);audRef.current=null;URL.revokeObjectURL(url);};
  };
  useEffect(()=>()=>{clearInterval(timerRef.current);window.speechSynthesis?.cancel();},[]);
  const fmt=s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  return <div style={{borderRadius:16,overflow:"hidden",border:`2.5px solid ${m.color}`,borderBottom:`5px solid ${m.dark}`,width:"100%"}}>
    <div style={{padding:"8px 14px",background:`${m.color}18`,textAlign:"center"}}>
      <div style={{fontSize:11,fontWeight:900,color:m.dark,textTransform:"uppercase",letterSpacing:2}}>
        🎙️ Graba y escucha tu voz
      </div>
    </div>
    <div style={{background:"#fff",padding:"10px 12px",display:"flex",flexDirection:"column",gap:7}}>
      <button className="btn" onClick={playEx}
        style={{background:m.color,boxShadow:`0 4px 0 ${m.dark}`,fontSize:13,
          display:"flex",alignItems:"center",gap:10,padding:"10px 14px"}}>
        <span style={{fontSize:18}}>🔊</span>
        <span style={{flex:1,textAlign:"left"}}>Escuchar ejemplo</span>
      </button>
      <button className="btn" onClick={toggleRec}
        style={{background:recOn?"#EF4444":"white",color:recOn?"white":"#EF4444",
          border:"2.5px solid #EF4444",borderBottom:`5px solid ${recOn?"#C62828":"#FFCDD2"}`,
          boxShadow:"none",fontSize:13,display:"flex",alignItems:"center",gap:10,padding:"10px 14px",
          animation:recOn?"glowRed 1.5s infinite":"none"}}>
        <span style={{fontSize:18}}>{recOn?"⏹":"🎙️"}</span>
        <span style={{flex:1,textAlign:"left"}}>{recOn?`Grabando… ${fmt(recSec)}`:"Grabar mi voz"}</span>
        {recOn&&<WaveBars active color="#EF4444"/>}
      </button>
      {recBlob&&<button className="btn" onClick={playRec}
        style={{background:playing?m.dark:m.bg,color:playing?"white":m.dark,
          border:`2.5px solid ${m.color}`,borderBottom:`5px solid ${m.dark}`,
          boxShadow:"none",fontSize:13,display:"flex",alignItems:"center",gap:10,padding:"10px 14px"}}>
        <span style={{fontSize:18}}>{playing?"⏹":"▶️"}</span>
        <span style={{flex:1,textAlign:"left"}}>{playing?"Reproduciendo…":"▶ Escuchar mi grabación"}</span>
        {playing&&<WaveBars active/>}
      </button>}
    </div>
  </div>;
}

/* ═══════ LESSON SCREEN ═══════ */
function LessonScreen({lesson,m,onBack,onDone}){
  if(lesson.isBreathing) return <BreathingEx lesson={lesson} m={m} onBack={onBack} onDone={onDone}/>;
  if(lesson.isContinuous) return <ContinuousEx lesson={lesson} m={m} onBack={onBack} onDone={onDone}/>;

  const [si,setSi]=useState(0);
  const [phase,setPhase]=useState("intro");
  const [secs,setSecs]=useState(0);
  const timerRef=useRef(null);
  const step=lesson.steps[si];

  const clearT=()=>{if(timerRef.current){clearInterval(timerRef.current);timerRef.current=null;}};
  useEffect(()=>()=>clearT(),[]);

  const startTimer=(d)=>{
    clearT();setSecs(d);
    timerRef.current=setInterval(()=>{
      setSecs(p=>{if(p<=1){clearT();setPhase("done");return 0;}return p-1;});
    },1000);
  };

  const next=()=>{
    if(si<lesson.steps.length-1){setSi(s=>s+1);setPhase("intro");}
    else onDone(lesson.xp);
  };

  return <div style={{display:"flex",flexDirection:"column",height:"100%",background:"#fff"}}>
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"16px 14px 10px"}}>
      <button onClick={()=>{clearT();onBack();}} style={{background:"#f0f0f0",border:"none",borderRadius:10,width:34,height:34,fontSize:17,color:"#666",cursor:"pointer"}}>✕</button>
      <ProgBar val={si+(phase==="done"?1:0)} max={lesson.steps.length} color={m.color}/>
      <span style={{fontSize:11,fontWeight:900,color:"#aaa",background:"#f0f0f0",padding:"3px 10px",borderRadius:20}}>{si+1}/{lesson.steps.length}</span>
    </div>
    <div className="scroll" style={{padding:"0 14px 20px",display:"flex",flexDirection:"column",gap:11}}>
      <div style={{width:260,height:230,margin:"0 auto",animation:"slideUp .4s ease",filter:`drop-shadow(0 6px 16px ${m.color}44)`}}>
        <Boca estado={step.visual} activa={phase==="active"}/>
      </div>
      <div className="card" style={{padding:14,textAlign:"center"}}>
        <div style={{fontSize:17,fontWeight:900,color:m.dark,marginBottom:3}}>{step.instruction}</div>
        <div style={{fontSize:13,color:"#aaa"}}>{step.tip}</div>
        {step.audio&&(
          <button onClick={()=>doSpeak(step.audio,0.5)} style={{marginTop:9,background:m.bg,border:`2px solid ${m.color}`,
            borderRadius:12,padding:"6px 16px",fontWeight:800,fontSize:13,color:m.dark,cursor:"pointer"}}>
            🔊 Escuchar ejemplo
          </button>
        )}
        {step.hasAudio&&phase==="intro"&&(
          <button onClick={()=>doSpeak(step.audioText||"",0.5)} style={{marginTop:9,background:m.bg,border:`2px solid ${m.color}`,
            borderRadius:12,padding:"6px 16px",fontWeight:800,fontSize:13,color:m.dark,cursor:"pointer"}}>
            🔊 Escuchar ejemplo de sonido
          </button>
        )}
      </div>
      {m.isVoice&&lesson.example&&<VoicePanel lesson={lesson} m={m}/>}
      {phase==="intro"&&(
        <button className="btn" onClick={()=>{setPhase("active");startTimer(step.duration);}}
          style={{background:m.color,boxShadow:`0 5px 0 ${m.dark}`}}>▶ Comenzar ejercicio</button>
      )}
      {phase==="active"&&(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:11,animation:"slideUp .3s ease"}}>
          <div style={{borderRadius:14,padding:"10px 18px",width:"100%",textAlign:"center",background:`${m.color}18`,border:`2.5px solid ${m.color}`}}>
            <div style={{fontWeight:900,fontSize:15,color:m.dark}}>{step.action}</div>
          </div>
          <CircleTimer secs={secs} total={step.duration} color={m.color} sz={104}/>
        </div>
      )}
      {phase==="done"&&(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:13,animation:"slideUp .4s ease"}}>
          {(m.isVoice&&lesson.example||lesson.hasSyllableAudio)&&(
            <StepRecorder m={m} stepAudio={step.audio} lessonExample={lesson.example}/>
          )}
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:50,animation:"star 1s ease 1"}}>⭐</div>
            <div style={{fontSize:19,fontWeight:900,color:m.dark,marginTop:3}}>¡Muy bien!</div>
          </div>
          <button className="btn" onClick={next} style={{background:m.color,boxShadow:`0 5px 0 ${m.dark}`}}>
            {si<lesson.steps.length-1?"Siguiente ➜":"¡Terminar! 🎉"}
          </button>
        </div>
      )}
    </div>
  </div>;
}

/* ═══════ COMPLETE ═══════ */
function CompleteScreen({xp,title,m,onContinue}){
  const [shown,setShown]=useState(0);
  useEffect(()=>{let n=0;const id=setInterval(()=>{n+=2;setShown(Math.min(n,xp));if(n>=xp)clearInterval(id);},30);return()=>clearInterval(id);},[xp]);
  const cols=[m.color,m.dark,"#FFD54F","#F06292","#81C784","#FF8A65","#CE93D8","#4FC3F7"];
  return <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
    height:"100%",padding:22,textAlign:"center",position:"relative",overflow:"hidden",background:"#fff"}}>
    {Array.from({length:22},(_,i)=>(
      <div key={i} style={{position:"absolute",top:-8,left:`${(i/22)*100}%`,width:8+i%4*4,height:8+i%4*4,
        borderRadius:i%3===0?"50%":i%3===1?"4px":"0",background:cols[i%cols.length],
        animation:`confetti ${1+i*.07}s cubic-bezier(.36,.07,.19,.97) forwards`,animationDelay:`${i*.05}s`}}/>
    ))}
    <div style={{animation:"xpIn .5s cubic-bezier(.34,1.56,.64,1)"}}>
      <Penguin mood="cheer" size={116} anim="bounce 1s ease-in-out infinite"/>
    </div>
    <div style={{fontSize:34,fontWeight:900,color:m.dark,margin:"7px 0 2px",animation:"slideUp .4s .2s both"}}>¡Excelente!</div>
    <div style={{fontSize:13,color:"#aaa",marginBottom:18,animation:"slideUp .4s .3s both"}}>{title}</div>
    <div className="card" style={{padding:16,width:"100%",marginBottom:18,animation:"slideUp .5s .35s both"}}>
      <div style={{display:"flex",justifyContent:"space-around"}}>
        {[[`+${shown}`,"XP",m.color,"#f0faf0"],[`⭐`,"Logro","#F9A825","#fffbf0"],["🔥","Racha","#FF7043","#fff5f0"]].map(([v,l,c,bg])=>(
          <div key={l} style={{background:bg,borderRadius:14,padding:"10px 14px",border:`2px solid ${c}40`}}>
            <div style={{fontSize:26,fontWeight:900,color:c}}>{v}</div>
            <div style={{fontSize:11,color:"#aaa",marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
    <button className="btn" onClick={onContinue} style={{background:"#4CAF50",boxShadow:"0 6px 0 #388E3C",fontSize:17,animation:"slideUp .5s .4s both"}}>
      ¡Continuar! 🐧
    </button>
  </div>;
}

/* ═══════ MODULE SCREEN ═══════ */
function ModuleScreen({m,completed,onBack,onStart}){
  return <div style={{display:"flex",flexDirection:"column",height:"100%",background:"#F5F5F5"}}>
    <div style={{background:`linear-gradient(135deg,${m.color},${m.dark})`,padding:"26px 18px 22px",position:"relative"}}>
      <button onClick={onBack} style={{position:"absolute",left:14,top:22,background:"rgba(255,255,255,.25)",
        border:"none",borderRadius:12,width:38,height:38,fontSize:19,fontWeight:900,color:"white",cursor:"pointer"}}>←</button>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:50,animation:"bounce 1.2s ease-in-out infinite"}}>{m.emoji}</div>
        <div style={{fontSize:21,fontWeight:900,color:"white",marginTop:4}}>{m.title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.75)",marginTop:2}}>{m.desc}</div>
      </div>
    </div>
    <div className="scroll" style={{padding:12,display:"flex",flexDirection:"column",gap:9}}>
      {m.lessons.map((l,i)=>{
        const done=completed.includes(l.id);
        return <button key={l.id} className="card" onClick={()=>!done&&onStart(l)}
          style={{padding:14,display:"flex",alignItems:"center",gap:13,textAlign:"left",width:"100%",
            animation:`slideUp .45s cubic-bezier(.34,1.56,.64,1) ${i*.07}s both`,
            borderColor:done?m.color:undefined,cursor:done?"default":"pointer"}}>
          <div style={{width:50,height:50,borderRadius:14,display:"flex",alignItems:"center",
            justifyContent:"center",fontSize:24,flexShrink:0,background:done?m.color:m.bg,border:`2.5px solid ${m.color}`}}>
            {done?"✅":m.emoji}
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:900,color:"#333",marginBottom:2}}>{l.title}</div>
            <div style={{fontSize:11,color:"#aaa"}}>
              {l.isBreathing?"⏱ 3 min · Secuencia completa":l.isContinuous?"⏱ 2 min · Ejercicio continuo":`${l.steps?.length||0} pasos · +${l.xp} XP`}
            </div>
            {l.hasSyllableAudio&&<div style={{fontSize:11,color:m.color,fontWeight:700,marginTop:2}}>🔊 Con audio de ejemplo</div>}
            {l.hasAudio&&<div style={{fontSize:11,color:m.color,fontWeight:700,marginTop:2}}>🔊 Con muestra de sonido</div>}
            {m.isVoice&&<div style={{fontSize:11,color:m.color,fontWeight:700,marginTop:2}}>🎙️ Grabar y comparar</div>}
          </div>
          <span style={{fontSize:20,fontWeight:900,color:done?"#4CAF50":m.color}}>{done?"✓":"▶"}</span>
        </button>;
      })}
    </div>
  </div>;
}

/* ═══════ HOME ═══════ */
function HomeScreen({xp,streak,done,total,completed,onSelect}){
  return <div style={{display:"flex",flexDirection:"column",height:"100%",background:"#F5F5F5"}}>
    {/* HEADER */}
    <div style={{background:"linear-gradient(135deg,#1A237E,#283593)",padding:"26px 18px 18px",position:"relative",overflow:"hidden"}}>
      {[0,1,2].map(i=>(
        <div key={i} style={{position:"absolute",borderRadius:"50%",background:"rgba(255,255,255,.05)",
          width:70+i*45,height:70+i*45,top:`${-15+i*18}%`,right:`${-8+i*8}%`,
          animation:`breatheIn ${2+i*.5}s ease-in-out infinite alternate`}}/>
      ))}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,position:"relative"}}>
        <div>
          <div style={{fontSize:24,fontWeight:900,color:"white",lineHeight:1.1}}>Pingus</div>
          <div style={{fontSize:24,fontWeight:900,color:"#90CAF9",lineHeight:1.1}}>Disartria</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,.5)",marginTop:2,letterSpacing:1}}>TERAPIA DEL HABLA</div>
        </div>
        <Penguin mood="excited" size={72}/>
      </div>
      <div style={{display:"flex",gap:7,marginBottom:11,position:"relative"}}>
        {[["🔥",streak,"Racha","#FFF176"],["⚡",xp,"XP","#A5D6A7"],[`${done}/${total}`,"","Lecciones","#90CAF9"]].map(([ic,v,lb,c])=>(
          <div key={lb} style={{flex:1,borderRadius:12,padding:"7px 4px",textAlign:"center",background:"rgba(255,255,255,.13)"}}>
            <div style={{fontSize:15,fontWeight:900,color:c}}>{ic} {v}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,.5)",marginTop:1}}>{lb}</div>
          </div>
        ))}
      </div>
      <ProgBar val={done} max={total} color="#4FC3F7"/>
    </div>

    {/* GRID — Afasia Lab style */}
    <div className="scroll" style={{padding:12}}>
      <div style={{fontSize:11,fontWeight:900,color:"#9E9E9E",textTransform:"uppercase",letterSpacing:3,marginBottom:9}}>
        Módulos de ejercicios
      </div>
      {/* 2x3 GRID — all squares, Afasia Lab style */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {MODULES.map((m,i)=>{
          const d=m.lessons.filter(l=>completed.includes(l.id)).length;
          const pct=m.lessons.length>0?d/m.lessons.length:0;
          return <button key={m.id} onClick={()=>!m.isComingSoon&&onSelect(m)}
            style={{background:m.bg,borderRadius:20,padding:"18px 10px 14px",textAlign:"center",
              aspectRatio:"1",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",
              border:`3px solid ${m.color}`,borderBottom:`6px solid ${m.dark}`,
              cursor:m.isComingSoon?"not-allowed":"pointer",
              opacity:m.isComingSoon?.6:1,
              animation:`slideUp .45s cubic-bezier(.34,1.56,.64,1) ${i*.06}s both`,
              WebkitAppearance:"none"}}
            onTouchStart={e=>{if(!m.isComingSoon){e.currentTarget.style.transform="translateY(4px)";e.currentTarget.style.borderBottomWidth="2px";}}}
            onTouchEnd={e=>{e.currentTarget.style.transform="";e.currentTarget.style.borderBottomWidth="";}}>
            {/* Big emoji icon */}
            <div style={{fontSize:48,lineHeight:1,animation:"float 2.5s ease-in-out infinite",animationDelay:`${i*.25}s`,
              filter:`drop-shadow(0 4px 8px ${m.color}66)`}}>
              {m.emoji}
            </div>
            {/* Title - big bold */}
            <div>
              <div style={{fontSize:17,fontWeight:900,color:m.dark,lineHeight:1.1,marginBottom:4}}>{m.title}</div>
              {m.isVoice&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:20,background:m.color,color:"white",fontWeight:800,display:"inline-block",marginBottom:4}}>🎙️ Voz</span>}
              {m.isComingSoon&&<span style={{fontSize:9,padding:"2px 6px",borderRadius:20,background:m.color,color:"white",fontWeight:800,display:"inline-block",marginBottom:4}}>🔧 Pronto</span>}
            </div>
            {/* Progress bar */}
            <div style={{width:"100%"}}>
              {!m.isComingSoon&&<>
                <div style={{height:7,background:`${m.color}33`,borderRadius:4,overflow:"hidden",marginBottom:3}}>
                  <div style={{height:"100%",background:m.color,borderRadius:4,width:`${pct*100}%`,transition:"width .5s"}}/>
                </div>
                <div style={{fontSize:11,fontWeight:800,color:m.dark+"AA"}}>{d}/{m.lessons.length} lecciones</div>
              </>}
            </div>
          </button>;
        })}
      </div>

      {/* Tip */}
      <div style={{background:"#E8F5E9",border:"2.5px solid #A5D6A7",borderRadius:16,borderBottom:"5px solid #A5D6A7",
        padding:13,display:"flex",gap:11,animation:"slideUp .45s cubic-bezier(.34,1.56,.64,1) .45s both"}}>
        <span style={{fontSize:22,animation:"float 3s ease-in-out infinite"}}>💡</span>
        <div>
          <div style={{fontWeight:900,fontSize:12,color:"#2E7D32",marginBottom:2}}>Consejo del día</div>
          <div style={{fontSize:11,color:"#388E3C",lineHeight:1.5}}>
            Practica 15 min al día frente al espejo. Graba tu voz y escucha tu progreso. ¡La constancia es la clave!
          </div>
        </div>
      </div>
    </div>
  </div>;
}

/* ═══════ ROOT ═══════ */
export default function App(){
  const [screen,setScreen]=useState("home");
  const [mod,setMod]=useState(null);
  const [lesson,setLesson]=useState(null);
  const [completed,setCompleted]=useState([]);
  const [xp,setXp]=useState(0);
  const [lastXp,setLastXp]=useState(0);
  const streak=3;
  const total=MODULES.reduce((a,m)=>a+m.lessons.length,0);
  const done=completed.length;

  return <>
    <style>{CSS}</style>
    <div style={{width:"100vw",height:"100vh",background:"#fff",position:"fixed",top:0,left:0,overflow:"hidden",display:"flex",flexDirection:"column"}}>
      {screen==="home"&&<HomeScreen xp={xp} streak={streak} done={done} total={total} completed={completed} onSelect={m=>{setMod(m);setScreen("module");}}/>}
      {screen==="module"&&<ModuleScreen m={mod} completed={completed} onBack={()=>setScreen("home")} onStart={l=>{setLesson(l);setScreen("lesson");}}/>}
      {screen==="lesson"&&<LessonScreen lesson={lesson} m={mod} onBack={()=>setScreen("module")} onDone={x=>{setLastXp(x);setScreen("complete");}}/>}
      {screen==="complete"&&<CompleteScreen xp={lastXp} title={lesson.title} m={mod} onContinue={()=>{setCompleted(p=>[...p,lesson.id]);setXp(p=>p+lastXp);setScreen("module");}}/>}
    </div>
  </>;
}
