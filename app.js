// ===== SaludaApp - lógica principal =====

const DIAS = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
const COMIDAS = ["desayuno","comida","cena","snack"];
const CAT_INFO = {
  verduras:{label:"Verduras y hortalizas", ic:"🥦"},
  frutas:{label:"Frutas", ic:"🍎"},
  proteinas:{label:"Proteínas", ic:"🥩"},
  lacteos:{label:"Lácteos y bebidas veg.", ic:"🥛"},
  despensa:{label:"Despensa", ic:"🫙"},
  otros:{label:"Otros", ic:"🧂"},
};
const TAG_LABEL = {
  "vegetariano":"Vegetariano","vegano":"Vegano","alto-proteina":"Alto en proteína",
  "rapido":"Rápido <15'","sin-gluten":"Sin gluten","meal-prep":"Meal-prep"
};

function todayISO(){
  const d = new Date();
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off*60000);
  return local.toISOString().slice(0,10);
}

function loadJSON(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  }catch(e){ return fallback; }
}
function saveJSON(key, val){
  localStorage.setItem(key, JSON.stringify(val));
}

// ---------- Estado ----------
let plan = loadJSON("saludaap_plan", {});
DIAS.forEach(d=>{
  if(!plan[d]) plan[d] = {desayuno:null, comida:null, cena:null, snack:null};
  if(plan[d].snack === undefined) plan[d].snack = null;
});

let compra = loadJSON("saludaap_compra", {items:[]});
let favoritos = loadJSON("saludaap_favoritos", []);
let aguaState = loadJSON("saludaap_agua", {date:todayISO(), count:0});
if(aguaState.date !== todayISO()) aguaState = {date:todayISO(), count:0};
let pesos = loadJSON("saludaap_pesos", []); // [{date, kg}]
let notas = localStorage.getItem("saludaap_notas") || "";
let meta = loadJSON("saludaap_meta", {
  kcalGoal: 2150,
  proteinGoal: 155,
  perfil: {edad:44, altura:175, peso:77}
});
let ejercicioHoy = loadJSON("saludaap_ejercicio_hoy", {date:null, rutinaId:null, kcal:0});
if(ejercicioHoy.date !== todayISO()) ejercicioHoy = {date:null, rutinaId:null, kcal:0};
let historialEjercicio = loadJSON("saludaap_historial_ejercicio", []); // [{date, rutinaId, nombre, kcal}]

function persistAll(){
  saveJSON("saludaap_plan", plan);
  saveJSON("saludaap_compra", compra);
  saveJSON("saludaap_favoritos", favoritos);
  saveJSON("saludaap_agua", aguaState);
  saveJSON("saludaap_pesos", pesos);
  saveJSON("saludaap_meta", meta);
  saveJSON("saludaap_ejercicio_hoy", ejercicioHoy);
  saveJSON("saludaap_historial_ejercicio", historialEjercicio);
  localStorage.setItem("saludaap_notas", notas);
  if(typeof renderInicio === "function") renderInicio();
}

function diaDeHoy(){
  // JS: 0=domingo...6=sábado -> lo pasamos a índice de DIAS (0=Lunes...6=Domingo)
  const idx = (new Date().getDay() + 6) % 7;
  return DIAS[idx];
}

function getReceta(id){ return RECETAS.find(r=>r.id===id); }

function thumbHTML(r, extraClass){
  return `<div class="thumb-wrap ${extraClass||''}">
    <span class="emoji-fallback">${r.emoji}</span>
    <img src="${r.foto}" alt="" loading="lazy" onerror="this.remove()">
  </div>`;
}

// ---------- Navegación por pestañas ----------
const views = {
  inicio: document.getElementById("view-inicio"),
  recetas: document.getElementById("view-recetas"),
  deporte: document.getElementById("view-deporte"),
  plan: document.getElementById("view-plan"),
  compra: document.getElementById("view-compra"),
  seguimiento: document.getElementById("view-seguimiento"),
};
document.querySelectorAll(".tab-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    Object.keys(views).forEach(k=>{
      views[k].style.display = (k === btn.dataset.view) ? "" : "none";
    });
    if(btn.dataset.view === "inicio") renderInicio();
    if(btn.dataset.view === "deporte") renderDeporte();
    if(btn.dataset.view === "plan") renderPlan();
    if(btn.dataset.view === "compra") renderCompra();
    if(btn.dataset.view === "seguimiento") renderSeguimiento();
  });
});

document.getElementById("fechaHoy").textContent = new Date().toLocaleDateString("es-ES",{weekday:"long", day:"numeric", month:"long"});

// ---------- RECETAS ----------
let filtroComida = "todas";
let filtroTag = "todas";
let textoBusqueda = "";

const chipsComidaEl = document.getElementById("chipsComida");
const chipsComidaData = [["todas","Todas"],["desayuno","Desayuno"],["comida","Comida"],["cena","Cena"],["snack","Snack"]];
chipsComidaData.forEach(([val,label])=>{
  const c = document.createElement("button");
  c.className = "chip" + (val==="todas" ? " active":"");
  c.textContent = label;
  c.dataset.val = val;
  c.addEventListener("click", ()=>{
    filtroComida = val;
    [...chipsComidaEl.children].forEach(x=>x.classList.remove("active"));
    c.classList.add("active");
    renderRecetas();
  });
  chipsComidaEl.appendChild(c);
});

const chipsTagEl = document.getElementById("chipsTag");
const chipsTagData = [["todas","Todas"],["favoritos","★ Favoritos"],...Object.entries(TAG_LABEL)];
chipsTagData.forEach(([val,label])=>{
  const c = document.createElement("button");
  c.className = "chip" + (val==="todas" ? " active":"");
  c.textContent = label;
  c.addEventListener("click", ()=>{
    filtroTag = val;
    [...chipsTagEl.children].forEach(x=>x.classList.remove("active"));
    c.classList.add("active");
    renderRecetas();
  });
  chipsTagEl.appendChild(c);
});

document.getElementById("buscador").addEventListener("input", (e)=>{
  textoBusqueda = e.target.value.trim().toLowerCase();
  renderRecetas();
});

function filtrarRecetas(){
  return RECETAS.filter(r=>{
    if(filtroComida !== "todas" && r.comida !== filtroComida) return false;
    if(filtroTag === "favoritos" && !favoritos.includes(r.id)) return false;
    else if(filtroTag !== "todas" && filtroTag !== "favoritos" && !r.tags.includes(filtroTag)) return false;
    if(textoBusqueda){
      const enNombre = r.nombre.toLowerCase().includes(textoBusqueda);
      const enIng = r.ingredientes.some(i=>i.n.toLowerCase().includes(textoBusqueda));
      if(!enNombre && !enIng) return false;
    }
    return true;
  });
}

function renderRecetas(){
  const cont = document.getElementById("listaRecetas");
  const lista = filtrarRecetas();
  if(lista.length === 0){
    cont.innerHTML = `<div class="empty"><span class="ic">🔍</span>No hay recetas con estos filtros.<br>Prueba a cambiar la búsqueda.</div>`;
    return;
  }
  cont.innerHTML = "";
  lista.forEach(r=>{
    const card = document.createElement("div");
    card.className = "rcard";
    const esFav = favoritos.includes(r.id);
    card.innerHTML = `
      ${thumbHTML(r)}
      <div class="info">
        <h3>${r.nombre}</h3>
        <div class="meta"><span>⏱ ${r.tiempo}′</span><span>🔥 ${r.kcal} kcal</span><span>👥 ${r.raciones}</span></div>
        <div class="tagrow">${r.tags.slice(0,3).map(t=>`<span class="tag-mini">${TAG_LABEL[t]||t}</span>`).join("")}</div>
      </div>
      <button class="addbtn ${esFav?'added':''}" title="Favorito" data-id="${r.id}">${esFav?'★':'☆'}</button>
    `;
    card.querySelector(".info").addEventListener("click", ()=>abrirDetalle(r.id));
    card.querySelector(".thumb-wrap").addEventListener("click", ()=>abrirDetalle(r.id));
    card.querySelector(".addbtn").addEventListener("click", (ev)=>{
      ev.stopPropagation();
      toggleFavorito(r.id);
    });
    cont.appendChild(card);
  });
}

function toggleFavorito(id){
  const idx = favoritos.indexOf(id);
  if(idx>-1) favoritos.splice(idx,1); else favoritos.push(id);
  persistAll();
  renderRecetas();
}

// ---------- Detalle receta (sheet) ----------
const overlay = document.getElementById("overlay");
const sheetContent = document.getElementById("sheetContent");

function cerrarOverlay(){ overlay.classList.add("hidden"); }
overlay.addEventListener("click", (e)=>{ if(e.target === overlay) cerrarOverlay(); });

function abrirDetalle(id){
  const r = getReceta(id);
  const esFav = favoritos.includes(id);
  sheetContent.innerHTML = `
    <div class="grabber"></div>
    <button class="close-x" id="btnCerrarDetalle">✕</button>
    <span class="eyebrow">${r.comida.charAt(0).toUpperCase()+r.comida.slice(1)}</span>
    <h2>${r.emoji} ${r.nombre}</h2>
    <div class="hero-photo">
      <span class="emoji-fallback">${r.emoji}</span>
      <img src="${r.foto}" alt="" loading="lazy" onerror="this.remove()">
    </div>
    <div class="stamp-row">
      <div class="stamp">Tiempo<b>${r.tiempo} min</b></div>
      <div class="stamp">Kcal / ración<b>${r.kcal}</b></div>
      <div class="stamp">Proteína<b>${r.macros.p} g</b></div>
      <div class="stamp">Carbos<b>${r.macros.c} g</b></div>
      <div class="stamp">Grasas<b>${r.macros.g} g</b></div>
      <div class="stamp">Raciones<b>${r.raciones}</b></div>
    </div>
    <h4>Ingredientes</h4>
    <ul class="ing-list">
      ${r.ingredientes.map(i=>`<li><span>${i.n}</span><span class="q">${i.q} ${i.u}</span></li>`).join("")}
    </ul>
    <h4>Preparación</h4>
    <ol class="steps">${r.pasos.map(p=>`<li>${p}</li>`).join("")}</ol>
    <div class="btn-row">
      <button class="btn block" id="btnAddPlan">📅 Añadir al plan</button>
      <button class="btn secondary" id="btnFavDetalle">${esFav?'★':'☆'}</button>
    </div>
  `;
  overlay.classList.remove("hidden");
  document.getElementById("btnCerrarDetalle").addEventListener("click", cerrarOverlay);
  document.getElementById("btnFavDetalle").addEventListener("click", ()=>{ toggleFavorito(id); abrirDetalle(id); });
  document.getElementById("btnAddPlan").addEventListener("click", ()=> abrirSelectorDia(id));
}

// ---------- Selector día/comida para añadir receta al plan ----------
const pickerOverlay = document.getElementById("pickerOverlay");
const pickerContent = document.getElementById("pickerContent");
pickerOverlay.addEventListener("click", (e)=>{ if(e.target === pickerOverlay) pickerOverlay.classList.add("hidden"); });

function abrirSelectorDia(recetaId){
  const r = getReceta(recetaId);
  pickerContent.innerHTML = `
    <div class="grabber"></div>
    <h2>¿Cuándo la comerás?</h2>
    <span class="eyebrow">${r.emoji} ${r.nombre}</span>
    <div style="margin-top:14px; display:flex; flex-direction:column; gap:10px;" id="diasGrid"></div>
    <div class="btn-row"><button class="btn ghost block" id="btnCancelarPicker">Cancelar</button></div>
  `;
  const grid = pickerContent.querySelector("#diasGrid");
  DIAS.forEach(dia=>{
    const row = document.createElement("div");
    row.style.cssText = "display:flex; gap:6px; align-items:center;";
    row.innerHTML = `<div style="width:78px; font-size:0.82rem; color:#6b6455;">${dia.slice(0,3)}</div>`;
    COMIDAS.forEach(m=>{
      const b = document.createElement("button");
      b.className = "chip";
      b.style.flex = "1";
      b.textContent = m.charAt(0).toUpperCase()+m.slice(1);
      b.addEventListener("click", ()=>{
        plan[dia][m] = recetaId;
        persistAll();
        pickerOverlay.classList.add("hidden");
        cerrarOverlay();
        renderPlan();
      });
      row.appendChild(b);
    });
    grid.appendChild(row);
  });
  document.getElementById("btnCancelarPicker").addEventListener("click", ()=> pickerOverlay.classList.add("hidden"));
  pickerOverlay.classList.remove("hidden");
}

// ---------- Selector rápido de receta para un slot del plan ----------
function abrirSelectorReceta(dia, comida){
  const candidatas = RECETAS.filter(r=> r.comida === comida || comida==="cena");
  pickerContent.innerHTML = `
    <div class="grabber"></div>
    <h2>${dia} · ${comida.charAt(0).toUpperCase()+comida.slice(1)}</h2>
    <div class="cards" id="pickCards" style="margin-top:12px; max-height:55vh; overflow-y:auto;"></div>
    <div class="btn-row">
      ${plan[dia][comida] ? '<button class="btn ghost block" id="btnQuitarSlot">Quitar receta de este hueco</button>' : ''}
    </div>
    <div class="btn-row"><button class="btn ghost block" id="btnCancelarPicker2">Cancelar</button></div>
  `;
  const cont = pickerContent.querySelector("#pickCards");
  const listaOrdenada = [...RECETAS].filter(r=>r.comida===comida).concat(RECETAS.filter(r=>r.comida!==comida));
  listaOrdenada.forEach(r=>{
    const card = document.createElement("div");
    card.className = "rcard";
    card.innerHTML = `
      ${thumbHTML(r)}
      <div class="info">
        <h3>${r.nombre}</h3>
        <div class="meta"><span>⏱ ${r.tiempo}′</span><span>🔥 ${r.kcal} kcal</span></div>
      </div>
    `;
    card.addEventListener("click", ()=>{
      plan[dia][comida] = r.id;
      persistAll();
      pickerOverlay.classList.add("hidden");
      renderPlan();
    });
    cont.appendChild(card);
  });
  const btnQuitar = document.getElementById("btnQuitarSlot");
  if(btnQuitar) btnQuitar.addEventListener("click", ()=>{
    plan[dia][comida] = null;
    persistAll();
    pickerOverlay.classList.add("hidden");
    renderPlan();
  });
  document.getElementById("btnCancelarPicker2").addEventListener("click", ()=> pickerOverlay.classList.add("hidden"));
  pickerOverlay.classList.remove("hidden");
}

// ---------- PLAN SEMANAL ----------
function renderPlan(){
  const cont = document.getElementById("planDias");
  cont.innerHTML = "";
  DIAS.forEach(dia=>{
    const block = document.createElement("div");
    block.className = "day-block";
    const head = document.createElement("div");
    head.className = "day-head";
    head.innerHTML = `<span>${dia}</span>`;
    block.appendChild(head);
    COMIDAS.forEach(m=>{
      const rid = plan[dia][m];
      const r = rid ? getReceta(rid) : null;
      const slot = document.createElement("div");
      slot.className = "slot";
      slot.innerHTML = `
        <div class="slabel">${m}</div>
        <div class="sval ${r?'':'empty-slot'}">${r ? (r.emoji+' '+r.nombre) : 'Toca para elegir'}</div>
        ${r ? '<div class="sx">›</div>' : '<div class="sx">+</div>'}
      `;
      slot.addEventListener("click", ()=> abrirSelectorReceta(dia, m));
      block.appendChild(slot);
    });
    cont.appendChild(block);
  });
}

document.getElementById("btnGenerarPlan").addEventListener("click", ()=>{
  const usadosPorComida = {desayuno:[], comida:[], cena:[]};
  DIAS.forEach(dia=>{
    COMIDAS.forEach(m=>{
      if(plan[dia][m]) return; // no tocar huecos ya rellenados
      let opciones = RECETAS.filter(r=> r.comida === m);
      if(m === "cena"){
        // permitir también recetas de "comida" ligeras para variar cenas
        opciones = opciones.concat(RECETAS.filter(r=>r.comida==="comida" && r.kcal <= 420));
      }
      let noRepetidas = opciones.filter(r=> !usadosPorComida[m].includes(r.id));
      if(noRepetidas.length === 0) noRepetidas = opciones;
      const elegida = noRepetidas[Math.floor(Math.random()*noRepetidas.length)];
      if(elegida){
        plan[dia][m] = elegida.id;
        usadosPorComida[m].push(elegida.id);
      }
    });
  });
  persistAll();
  renderPlan();
});

document.getElementById("btnVaciarPlan").addEventListener("click", ()=>{
  if(!confirm("¿Vaciar todo el plan semanal?")) return;
  DIAS.forEach(dia=> COMIDAS.forEach(m=> plan[dia][m] = null));
  persistAll();
  renderPlan();
});

// ---------- LISTA DE LA COMPRA ----------
function generarCompraDesdeEl(){
  const acumulado = {}; // key: nombre|unidad -> {n,u,q,cat}
  DIAS.forEach(dia=>{
    COMIDAS.forEach(m=>{
      const rid = plan[dia][m];
      if(!rid) return;
      const r = getReceta(rid);
      r.ingredientes.forEach(ing=>{
        const key = ing.n.toLowerCase() + "|" + ing.u;
        if(!acumulado[key]) acumulado[key] = {n:ing.n, u:ing.u, q:0, cat:ing.cat};
        acumulado[key].q += ing.q;
      });
    });
  });
  const nuevosItems = Object.values(acumulado).map(it=>{
    const prevMatch = compra.items.find(p=> p.n.toLowerCase()===it.n.toLowerCase() && p.u===it.u);
    return {
      n: it.n, u: it.u,
      q: Math.round(it.q*10)/10,
      cat: it.cat,
      checked: prevMatch ? prevMatch.checked : false
    };
  });
  compra = {items: nuevosItems, generatedAt: new Date().toISOString()};
  persistAll();
}

document.getElementById("btnRegenerarCompra").addEventListener("click", ()=>{
  generarCompraDesdeEl();
  renderCompra();
});
document.getElementById("btnVaciarCompra").addEventListener("click", ()=>{
  if(!confirm("¿Vaciar la lista de la compra?")) return;
  compra = {items:[]};
  persistAll();
  renderCompra();
});

function renderCompra(){
  const cont = document.getElementById("listaCompra");
  if(compra.items.length === 0){
    cont.innerHTML = `<div class="empty"><span class="ic">🛒</span>Tu lista está vacía.<br>Añade recetas al plan y pulsa «Generar desde el plan».</div>`;
    return;
  }
  const porCat = {};
  compra.items.forEach(it=>{
    if(!porCat[it.cat]) porCat[it.cat] = [];
    porCat[it.cat].push(it);
  });
  cont.innerHTML = "";
  Object.keys(CAT_INFO).forEach(cat=>{
    if(!porCat[cat]) return;
    const wrap = document.createElement("div");
    wrap.className = "shop-cat";
    wrap.innerHTML = `<h4>${CAT_INFO[cat].ic} ${CAT_INFO[cat].label}</h4>`;
    porCat[cat].forEach(it=>{
      const row = document.createElement("div");
      row.className = "shop-item" + (it.checked ? " checked" : "");
      row.innerHTML = `
        <input type="checkbox" ${it.checked ? "checked":""} />
        <div class="sname">${it.n}</div>
        <div class="sqty">${it.q} ${it.u}</div>
      `;
      row.querySelector("input").addEventListener("change", (e)=>{
        it.checked = e.target.checked;
        row.classList.toggle("checked", it.checked);
        persistAll();
      });
      wrap.appendChild(row);
    });
    cont.appendChild(wrap);
  });
}

// ---------- SEGUIMIENTO ----------
function renderSeguimiento(){
  document.getElementById("aguaCount").textContent = `${aguaState.count} / 8`;
  const glasses = document.getElementById("aguaGlasses");
  glasses.innerHTML = "";
  const total = Math.max(aguaState.count, 8);
  for(let i=0;i<total;i++){
    const s = document.createElement("span");
    s.textContent = i < aguaState.count ? "💧" : "⚪";
    glasses.appendChild(s);
  }
  document.getElementById("notasTexto").value = notas;
  dibujarPesoChart();
}

document.getElementById("btnAguaMas").addEventListener("click", ()=>{
  aguaState.count++;
  persistAll();
  renderSeguimiento();
});
document.getElementById("btnAguaMenos").addEventListener("click", ()=>{
  aguaState.count = Math.max(0, aguaState.count-1);
  persistAll();
  renderSeguimiento();
});

document.getElementById("btnAddPeso").addEventListener("click", ()=>{
  const input = document.getElementById("pesoInput");
  const val = parseFloat(input.value.replace(",","."));
  if(!val || val <= 0){ input.focus(); return; }
  const hoy = todayISO();
  const existente = pesos.find(p=>p.date===hoy);
  if(existente) existente.kg = val; else pesos.push({date:hoy, kg:val});
  pesos.sort((a,b)=> a.date.localeCompare(b.date));
  input.value = "";
  persistAll();
  renderSeguimiento();
});

document.getElementById("btnGuardarNotas").addEventListener("click", (e)=>{
  notas = document.getElementById("notasTexto").value;
  persistAll();
  const btn = e.target;
  const original = btn.textContent;
  btn.textContent = "Guardado ✓";
  setTimeout(()=>{ btn.textContent = original; }, 1400);
});

function dibujarPesoChart(){
  const canvas = document.getElementById("pesoChart");
  const resumen = document.getElementById("pesoResumen");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth || 300;
  const cssH = 140;
  canvas.width = cssW*dpr; canvas.height = cssH*dpr;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,cssW,cssH);

  const datos = pesos.slice(-14);
  if(datos.length === 0){
    resumen.textContent = "Aún no hay registros de peso.";
    ctx.fillStyle = "#b3ac9b";
    ctx.font = "13px sans-serif";
    ctx.fillText("Añade tu primer peso para ver la gráfica", 14, cssH/2);
    return;
  }
  const pad = 24;
  const vals = datos.map(d=>d.kg);
  const min = Math.min(...vals) - 0.5;
  const max = Math.max(...vals) + 0.5;
  const range = (max-min) || 1;
  const stepX = datos.length>1 ? (cssW - pad*2)/(datos.length-1) : 0;

  ctx.strokeStyle = "#5B6B4F";
  ctx.lineWidth = 2;
  ctx.beginPath();
  datos.forEach((d,i)=>{
    const x = pad + i*stepX;
    const y = cssH - pad - ((d.kg-min)/range)*(cssH-pad*2);
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  });
  ctx.stroke();

  ctx.fillStyle = "#C1553A";
  datos.forEach((d,i)=>{
    const x = pad + i*stepX;
    const y = cssH - pad - ((d.kg-min)/range)*(cssH-pad*2);
    ctx.beginPath();
    ctx.arc(x,y,3.2,0,Math.PI*2);
    ctx.fill();
  });

  const primero = datos[0].kg;
  const ultimo = datos[datos.length-1].kg;
  const diff = Math.round((ultimo-primero)*10)/10;
  const signo = diff > 0 ? "+" : "";
  resumen.textContent = `Último: ${ultimo} kg · Variación del periodo: ${signo}${diff} kg · ${datos.length} registros`;
}

// ---------- INICIO / DASHBOARD ----------
const MEAL_TIMES = {desayuno:"08:00", comida:"14:00", cena:"21:00", snack:"17:30"};

function actualizarSaludo(){
  const h = new Date().getHours();
  const hola = h < 6 ? "Buenas noches" : h < 13 ? "Buenos días" : h < 20 ? "Buenas tardes" : "Buenas noches";
  const nombre = ""; // uso personal, sin cuenta de usuario
  document.getElementById("saludoHora").textContent = hola + (nombre ? ", " + nombre : "");
}

function renderInicio(){
  actualizarSaludo();
  const dia = diaDeHoy();
  const comidasHoy = COMIDAS.map(m=>({m, rid: plan[dia][m]})).filter(x=>x.rid);

  const totales = comidasHoy.reduce((acc,x)=>{
    const r = getReceta(x.rid);
    acc.kcal += r.kcal; acc.p += r.macros.p; acc.c += r.macros.c; acc.g += r.macros.g;
    return acc;
  }, {kcal:0,p:0,c:0,g:0});

  const goalBase = meta.kcalGoal || 2100;
  const bonusEjercicio = (ejercicioHoy.date === todayISO()) ? (ejercicioHoy.kcal||0) : 0;
  const goal = goalBase + bonusEjercicio;
  const pct = Math.min(100, Math.round((totales.kcal/goal)*100));
  const restante = Math.max(0, goal - totales.kcal);

  document.getElementById("kcalTexto").textContent = `${totales.kcal} / ${goal} kcal`;
  document.getElementById("pctTexto").textContent = `${pct}%`;
  document.getElementById("pctFill").style.width = pct + "%";
  document.getElementById("restanteTexto").textContent = totales.kcal <= goal
    ? `Te quedan ${restante} kcal hoy`
    : `Has superado tu objetivo por ${totales.kcal-goal} kcal`;
  document.getElementById("macroP").textContent = `${totales.p} / ${meta.proteinGoal||150} g`;
  document.getElementById("macroC").textContent = totales.c + " g";
  document.getElementById("macroG").textContent = totales.g + " g";
  document.getElementById("numComidasHoy").textContent = `${comidasHoy.length} comida${comidasHoy.length===1?'':'s'}`;

  const bannerZone = document.getElementById("bannerAdaptZone");
  if(bonusEjercicio > 0){
    const rutinaHoy = getRutina(ejercicioHoy.rutinaId);
    bannerZone.innerHTML = `
      <div class="banner-adapt">
        <b>💪 Entrenaste hoy: ${rutinaHoy ? rutinaHoy.nombre : ''}</b>
        Tu objetivo sube a ${goal} kcal (+${bonusEjercicio} por el entreno). Para recuperar bien el pecho y el core, prioriza recetas altas en proteína.
        <div style="margin-top:6px;"><span class="link-btn" id="btnVerAltoProteina">Ver recetas altas en proteína →</span></div>
      </div>
    `;
    const btnAP = document.getElementById("btnVerAltoProteina");
    if(btnAP) btnAP.addEventListener("click", ()=>{
      document.querySelector('.tab-btn[data-view="recetas"]').click();
      filtroTag = "alto-proteina";
      [...chipsTagEl.children].forEach(x=>x.classList.toggle("active", x.textContent.includes("proteína")));
      renderRecetas();
    });
  } else {
    bannerZone.innerHTML = "";
  }

  const tl = document.getElementById("timelineHoy");
  tl.innerHTML = "";
  COMIDAS.forEach(m=>{
    const rid = plan[dia][m];
    const card = document.createElement("div");
    if(rid){
      const r = getReceta(rid);
      card.className = "timeline-card";
      card.innerHTML = `
        ${thumbHTML(r)}
        <div class="tinfo">
          <div class="ttime">${MEAL_TIMES[m]} · ${m}</div>
          <h3>${r.nombre}</h3>
        </div>
        <div class="tkcal">${r.kcal} kcal</div>
      `;
      card.addEventListener("click", ()=> abrirDetalle(rid));
    } else {
      card.className = "timeline-card empty-card";
      card.innerHTML = `
        <div class="thumb-wrap empty">+</div>
        <div class="tinfo">
          <div class="ttime">${MEAL_TIMES[m]} · ${m}</div>
          <h3>Toca para añadir</h3>
        </div>
      `;
      card.addEventListener("click", ()=> abrirSelectorReceta(dia, m));
    }
    tl.appendChild(card);
  });
}

document.getElementById("kcalTexto").addEventListener("click", ()=>{
  const val = prompt("Objetivo diario de kcal (sin contar el extra por entrenar):", meta.kcalGoal || 2150);
  const num = parseInt(val, 10);
  if(num && num > 0){
    meta.kcalGoal = num;
    persistAll();
    renderInicio();
  }
});

document.getElementById("macroPWrap").addEventListener("click", ()=>{
  const val = prompt("Objetivo diario de proteína (g):", meta.proteinGoal || 155);
  const num = parseInt(val, 10);
  if(num && num > 0){
    meta.proteinGoal = num;
    persistAll();
    renderInicio();
  }
});

document.getElementById("btnCrearMenuHoy").addEventListener("click", ()=>{
  const dia = diaDeHoy();
  COMIDAS.forEach(m=>{
    if(plan[dia][m]) return;
    let opciones = RECETAS.filter(r=> r.comida === m);
    if(m === "cena") opciones = opciones.concat(RECETAS.filter(r=>r.comida==="comida" && r.kcal<=420));
    if(opciones.length){
      plan[dia][m] = opciones[Math.floor(Math.random()*opciones.length)].id;
    }
  });
  persistAll();
  renderInicio();
});

document.getElementById("btnAnadirComida").addEventListener("click", ()=>{
  const dia = diaDeHoy();
  const vacio = COMIDAS.find(m=> !plan[dia][m]);
  abrirSelectorReceta(dia, vacio || "cena");
});

// ---------- DEPORTE ----------
function getRutina(id){ return RUTINAS.find(r=>r.id===id); }

function thumbHTMLRutina(r){
  return `<div class="thumb-wrap">
    <span class="emoji-fallback">${r.emoji}</span>
    <img src="${r.foto}" alt="" loading="lazy" onerror="this.remove()">
  </div>`;
}

function calcularRacha(){
  // Cuenta días consecutivos (incluyendo hoy si hay entreno) con al menos un entreno registrado
  const fechas = new Set(historialEjercicio.map(h=>h.date));
  let racha = 0;
  let cursor = new Date();
  // si hoy no hay entreno, la racha se cuenta hasta ayer (no se rompe hasta medianoche)
  if(!fechas.has(todayISO())) cursor.setDate(cursor.getDate()-1);
  while(true){
    const off = cursor.getTimezoneOffset();
    const local = new Date(cursor.getTime() - off*60000);
    const iso = local.toISOString().slice(0,10);
    if(fechas.has(iso)){
      racha++;
      cursor.setDate(cursor.getDate()-1);
    } else break;
  }
  return racha;
}

let filtroDepTipo = "todas";
let filtroDepLugar = "todas";

const chipsDepTipoEl = document.getElementById("chipsDepTipo");
const chipsDepTipoData = [["todas","Todas"],["core","Core / Cintura"],["pecho","Pecho"],["fullbody","Full body"],["hiit","HIIT"],["cardio","Cardio"],["piernas","Piernas"],["movilidad","Movilidad"]];
chipsDepTipoData.forEach(([val,label])=>{
  const c = document.createElement("button");
  c.className = "chip" + (val==="todas" ? " active":"");
  c.textContent = label;
  c.addEventListener("click", ()=>{
    filtroDepTipo = val;
    [...chipsDepTipoEl.children].forEach(x=>x.classList.remove("active"));
    c.classList.add("active");
    renderRutinas();
  });
  chipsDepTipoEl.appendChild(c);
});

const chipsDepLugarEl = document.getElementById("chipsDepLugar");
const chipsDepLugarData = [["todas","Cualquier lugar"],["casa","En casa"],["gimnasio","Gimnasio"],["exterior","Exterior"]];
chipsDepLugarData.forEach(([val,label])=>{
  const c = document.createElement("button");
  c.className = "chip" + (val==="todas" ? " active":"");
  c.textContent = label;
  c.addEventListener("click", ()=>{
    filtroDepLugar = val;
    [...chipsDepLugarEl.children].forEach(x=>x.classList.remove("active"));
    c.classList.add("active");
    renderRutinas();
  });
  chipsDepLugarEl.appendChild(c);
});

function renderDeporte(){
  const racha = calcularRacha();
  document.getElementById("rachaNum").textContent = `${racha} día${racha===1?'':'s'}`;
  const entrenoHoyEl = document.getElementById("entrenoHoyTxt");
  const msgEl = document.getElementById("rachaMsg");
  if(ejercicioHoy.date === todayISO()){
    const r = getRutina(ejercicioHoy.rutinaId);
    entrenoHoyEl.textContent = `Hoy: ${r ? r.nombre : 'entrenado'} ✓`;
    msgEl.textContent = "¡Bien hecho! Vuelve mañana para no cortar la racha.";
  } else {
    entrenoHoyEl.textContent = "Hoy: sin entrenar";
    msgEl.textContent = racha > 0
      ? "Elige algo corto de abajo para no perder la racha."
      : "Empieza con algo corto, lo importante es no cortar la cadena.";
  }

  const dotsWrap = document.getElementById("weekDots");
  dotsWrap.innerHTML = "";
  const fechas = new Set(historialEjercicio.map(h=>h.date));
  const hoyIdx = (new Date().getDay()+6)%7;
  for(let i=0;i<7;i++){
    const d = new Date();
    const diff = i - hoyIdx;
    d.setDate(d.getDate()+diff);
    const off = d.getTimezoneOffset();
    const local = new Date(d.getTime() - off*60000);
    const iso = local.toISOString().slice(0,10);
    const dot = document.createElement("div");
    dot.className = "day-dot" + (fechas.has(iso) ? " done" : "") + (i===hoyIdx ? " today" : "");
    dot.textContent = DIAS[i].slice(0,1);
    dotsWrap.appendChild(dot);
  }

  renderRutinas();
}

function renderRutinas(){
  const cont = document.getElementById("listaRutinas");
  const lista = RUTINAS.filter(r=>{
    if(filtroDepTipo !== "todas" && r.tipo !== filtroDepTipo) return false;
    if(filtroDepLugar !== "todas" && r.lugar !== filtroDepLugar) return false;
    return true;
  });
  if(lista.length === 0){
    cont.innerHTML = `<div class="empty"><span class="ic">🔍</span>No hay rutinas con estos filtros.</div>`;
    return;
  }
  cont.innerHTML = "";
  lista.forEach(r=>{
    const card = document.createElement("div");
    card.className = "rcard";
    card.innerHTML = `
      ${thumbHTMLRutina(r)}
      <div class="info">
        <h3>${r.nombre}</h3>
        <div class="meta"><span>⏱ ${r.duracion}′</span><span>🔥 ~${r.kcal} kcal</span><span>${r.lugar==='casa'?'🏠':r.lugar==='gimnasio'?'🏋️':'🌳'} ${r.lugar}</span></div>
        <div class="tagrow"><span class="tag-mini">${r.nivel}</span></div>
      </div>
    `;
    card.addEventListener("click", ()=> abrirDetalleRutina(r.id));
    cont.appendChild(card);
  });
}

function abrirDetalleRutina(id){
  const r = getRutina(id);
  const yaHoy = ejercicioHoy.date === todayISO() && ejercicioHoy.rutinaId === id;
  sheetContent.innerHTML = `
    <div class="grabber"></div>
    <button class="close-x" id="btnCerrarDetalle">✕</button>
    <span class="eyebrow">${r.tipo} · ${r.lugar}</span>
    <h2>${r.emoji} ${r.nombre}</h2>
    <div class="hero-photo">
      <span class="emoji-fallback">${r.emoji}</span>
      <img src="${r.foto}" alt="" loading="lazy" onerror="this.remove()">
    </div>
    <p style="font-size:0.9rem; color:#6b6455; line-height:1.5;">${r.objetivo}</p>
    <div class="stamp-row">
      <div class="stamp">Duración<b>${r.duracion} min</b></div>
      <div class="stamp">Kcal aprox.<b>~${r.kcal}</b></div>
      <div class="stamp">Nivel<b>${r.nivel}</b></div>
    </div>
    <h4>Ejercicios</h4>
    <ul class="ing-list">
      ${r.ejercicios.map(e=>`<li><span>${e.n}</span><span class="q">${e.detalle}</span></li>`).join("")}
    </ul>
    <div class="btn-row">
      <button class="btn block ${yaHoy?'secondary':''}" id="btnRegistrarEntreno">${yaHoy ? '✓ Registrado hoy' : '✅ Registrar entrenamiento de hoy'}</button>
    </div>
  `;
  overlay.classList.remove("hidden");
  document.getElementById("btnCerrarDetalle").addEventListener("click", cerrarOverlay);
  document.getElementById("btnRegistrarEntreno").addEventListener("click", ()=>{
    registrarEntreno(r);
    cerrarOverlay();
    renderDeporte();
  });
}

function registrarEntreno(r){
  const hoy = todayISO();
  ejercicioHoy = {date:hoy, rutinaId:r.id, kcal:r.kcal};
  const existente = historialEjercicio.find(h=>h.date===hoy);
  if(existente){
    existente.rutinaId = r.id; existente.nombre = r.nombre; existente.kcal = r.kcal;
  } else {
    historialEjercicio.push({date:hoy, rutinaId:r.id, nombre:r.nombre, kcal:r.kcal});
  }
  persistAll();
}

// ---------- Registro Service Worker ----------
if("serviceWorker" in navigator){
  window.addEventListener("load", ()=>{
    navigator.serviceWorker.register("sw.js").catch(()=>{});
  });
}

// ---------- Render inicial ----------
renderRecetas();
renderInicio();
renderDeporte();
