'use strict';
/* ---------- Basic data---------- */
const FOOD_SUBS = ['Gemüse/Obst','Fleisch','Fisch','Wasser/Getränke','Milch/Käse','Brot/Backwaren','Süßigkeiten','Haushalt','Sonstiges'];
const SUB_COLORS = ['#639922','#D85A30','#378ADD','#5DCAA5','#EF9F27','#BA7517','#D4537E','#7F77DD','#888780'];
const DEFAULT_CATS = [
  {id:'food',name:'Lebensmittel',color:'#1D9E75',subs:FOOD_SUBS},
  {id:'dog',name:'Hunde',color:'#D85A30'},
  {id:'build',name:'Bauzubehör',color:'#7F77DD'},
  {id:'digital',name:'Abos & Digital',color:'#378ADD'},
  {id:'other',name:'Sonstiges',color:'#888780'}
];
const EXTRA_COLORS = ['#D4537E','#BA7517','#639922','#185FA5','#993C1D','#534AB7'];

const RULES = [
  [/(pfand|pant|leergut)/i,'food','Wasser/Getränke'],
  [/(gurk|tomat|salat|apfel|äpfel|banan|kartoff|zwiebel|möhre|karott|paprika|obst|gemüse|zitron|beere|trauben|agurk|æble|kartofl|løg|gulerod|frugt|grønt|citron|bær|apple|potato|onion|carrot|lemon|berr|veg|fruit|avocado|brokkoli|broccoli|champignon|svampe|pilz)/i,'food','Gemüse/Obst'],
  [/(fleisch|hack|wurst|schinken|hähnchen|huhn|rind|schwein|salami|kød|hakket|pølse|skinke|kylling|okse|svin|beef|chicken|pork|ham\b|bacon|steak|frikadel)/i,'food','Fleisch'],
  [/(fisch|lachs|thunfisch|hering|fisk|laks|\btun\b|sild|rejer|garnel|fish|salmon|tuna|shrimp|makrel)/i,'food','Fisch'],
  [/(wasser|vand\b|kildevand|water|saft|juice|cola|limo|sodavand|bier|\bøl\b|wein|\bvin\b|kaffe|kaffee|coffee|\btee\b|\bte\b)/i,'food','Wasser/Getränke'],
  [/(milch|käse|joghurt|butter|sahne|quark|mælk|\bost\b|yoghurt|smør|fløde|skyr|milk|cheese|cream|\bæg\b|eier|eggs)/i,'food','Milch/Käse'],
  [/(brot|brötchen|toast|brød|rugbrød|bolle|bread|croissant|baguette)/i,'food','Brot/Backwaren'],
  [/(schoko|chips|bonbon|gummi|keks|kuchen|\beis\b|slik|chokolade|kage|\bis\b|candy|chocolate|cookie|haribo|lakrids|lakritz)/i,'food','Süßigkeiten'],
  [/(spül|wasch|reinig|toilett|klopapier|küchenrolle|müllbeutel|seife|opvask|vaske|toiletpapir|køkkenrulle|sæbe|affaldspose|detergent|soap|zahnpasta|tandpasta|shampoo|alufolie|batterie)/i,'food','Haushalt'],
  [/(hund|\bdog|leckerli|kauknochen|tyggeben|foder|frolic|pedigree|royal canin|fressnapf|zooplus|maxi zoo|kauartikel|hundesnack)/i,'dog',null],
  [/(schraube|dübel|holz|farbe|lack|silikon|zement|nagel|nägel|werkzeug|kabel|skrue|\btræ\b|maling|\bsøm\b|værktøj|bauhaus|obi\b|hornbach|toom|jem ?& ?fix|xl-byg|bygma|silvan|screw|paint|isolier|mörtel|fliese)/i,'build',null]
];
const STORE_RULES = [[/(fressnapf|zooplus|maxi zoo|zoo)/i,'dog'],[/(bauhaus|obi|hornbach|toom|jem|fix|xl-byg|bygma|silvan|stark|bauhaus|hagebau)/i,'build']];

const DICT = {agurk:'Gurke',agurker:'Gurken',tomat:'Tomate',tomater:'Tomaten',æble:'Apfel',æbler:'Äpfel',kartofler:'Kartoffeln',kartoffel:'Kartoffel',løg:'Zwiebeln',gulerødder:'Karotten',gulerod:'Karotte',banan:'Banane',bananer:'Bananen',citron:'Zitrone',mælk:'Milch',letmælk:'fettarme Milch',sødmælk:'Vollmilch',ost:'Käse',smør:'Butter',fløde:'Sahne',brød:'Brot',rugbrød:'Roggenbrot',boller:'Brötchen',æg:'Eier',kød:'Fleisch',hakket:'Hack',oksekød:'Rindfleisch',svinekød:'Schweinefleisch',kylling:'Hähnchen',pølser:'Würstchen',skinke:'Schinken',fisk:'Fisch',laks:'Lachs',tun:'Thunfisch',sild:'Hering',rejer:'Garnelen',vand:'Wasser',kildevand:'Mineralwasser',sodavand:'Limonade',øl:'Bier',vin:'Wein',kaffe:'Kaffee',te:'Tee',sukker:'Zucker',mel:'Mehl',ris:'Reis',slik:'Süßigkeiten',chokolade:'Schokolade',kage:'Kuchen',is:'Eis',opvask:'Spülmittel',opvaskemiddel:'Spülmittel',vaskemiddel:'Waschmittel',toiletpapir:'Klopapier',køkkenrulle:'Küchenrolle',sæbe:'Seife',affaldsposer:'Müllbeutel',hundefoder:'Hundefutter',hundesnack:'Hundesnack',tyggeben:'Kauknochen',pant:'Pfand',retur:'zurück',tilbud:'Angebot',rabat:'Rabatt',økologisk:'Bio',øko:'Bio',frugt:'Obst',grønt:'Gemüse',salat:'Salat',havregryn:'Haferflocken',olie:'Öl',salt:'Salz',peber:'Pfeffer',skrue:'Schraube',skruer:'Schrauben',maling:'Farbe',træ:'Holz',søm:'Nägel',pose:'Tüte',poser:'Tüten',bærepose:'Tragetasche',svampe:'Pilze',syltetøj:'Marmelade',juice:'Saft',pålæg:'Aufschnitt',leverpostej:'Leberpastete',flæsk:'Speck',frikadeller:'Frikadellen',stk:'Stk',i:'in',alt:'gesamt',
  milk:'Milch',bread:'Brot',water:'Wasser',cheese:'Käse',chicken:'Hähnchen',apple:'Apfel',apples:'Äpfel',eggs:'Eier',butter:'Butter',sugar:'Zucker',rice:'Reis',potatoes:'Kartoffeln',onions:'Zwiebeln',beef:'Rindfleisch',fish:'Fisch',deposit:'Pfand'};

/* ----------Storing ---------- */
const DB={db:null,
  open(){return new Promise((res,rej)=>{const r=indexedDB.open('bonbuch',1);r.onupgradeneeded=()=>r.result.createObjectStore('kv');r.onsuccess=()=>{this.db=r.result;res()};r.onerror=()=>rej(r.error)})},
  get(k){return new Promise(res=>{const t=this.db.transaction('kv').objectStore('kv').get(k);t.onsuccess=()=>res(t.result);t.onerror=()=>res(undefined)})},
  set(k,v){return new Promise(res=>{const t=this.db.transaction('kv','readwrite');t.objectStore('kv').put(v,k);t.oncomplete=res})}
};
const INCOME_CATS=['Gehalt/Lohn','DataAnnotation','YouTube/Content','Verkäufe','Erstattung','Geschenk','Sonstiges'];
let S={receipts:[],subs:[],subChecks:{},learned:{},budgets:{},cats:DEFAULT_CATS,dict:{},rate:{value:0.134,date:null},view:'orig',
  incomes:[],
  month:new Date().toISOString().slice(0,7)};
let SERVER=false,saveT=null;
async function serverLoad(){try{const r=await fetch('api/state',{cache:'no-store'});if(!r.ok)return null;SERVER=true;return await r.json()}catch(e){return null}}
function save(){if(!SERVER)return DB.set('state',S);clearTimeout(saveT);return new Promise(res=>{saveT=setTimeout(async()=>{try{const r=await fetch('api/state',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(S)});const j=await r.json();if(j.images){for(const rc of S.receipts)if(j.images[rc.id])rc.image=j.images[rc.id]}}catch(e){toast('Speichern fehlgeschlagen – läuft der Bonbuch-Server noch?')}res()},250)})}

/* ---------- helper ---------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Math.random().toString(36).slice(2,10)+Date.now().toString(36);
const pad=n=>String(n).padStart(2,'0');
const fmtE=v=>new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'}).format(v||0);
const fmtC=(v,c)=>c==='DKK'?new Intl.NumberFormat('da-DK',{minimumFractionDigits:2,maximumFractionDigits:2}).format(v)+' kr':fmtE(v);
const cat=id=>S.cats.find(c=>c.id===id)||S.cats.find(c=>c.id==='other');
const monthName=m=>{const [y,mm]=m.split('-');return new Date(y,mm-1,1).toLocaleDateString('de-DE',{month:'long',year:'numeric'})};
const shiftMonth=(m,d)=>{const [y,mm]=m.split('-').map(Number);const dt=new Date(y,mm-1+d,1);return dt.getFullYear()+'-'+pad(dt.getMonth()+1)};
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),2200)}
const norm=s=>s.toLowerCase().replace(/[^a-zäöüßæøå ]/g,'').replace(/\s+/g,' ').trim();
function translate(name){const d={...DICT,...S.dict};return name.split(/(\s+|[\/,.-])/).map(w=>{const k=w.toLowerCase();if(d[k]){const t=d[k];return w[0]&&w[0]===w[0].toUpperCase()&&w.length>1&&w!==w.toUpperCase()?t:(w===w.toUpperCase()&&w.length>1?t.toUpperCase():t)}return w}).join('')}
const toEur=(v,r)=>r.currency==='DKK'?v*(r.rate||S.rate.value):v;

/* ---------- Exchange course ---------- */
async function fetchRate(date){
  const url=date?`https://api.frankfurter.app/${date}?from=DKK&to=EUR`:'https://api.frankfurter.app/latest?from=DKK&to=EUR';
  try{const r=await fetch(url,{cache:'no-store'});const j=await r.json();return {value:j.rates.EUR,date:j.date}}catch(e){return null}
}
async function refreshRate(force){
  const today=new Date().toISOString().slice(0,10);
  if(!force&&S.rate.date===today)return;
  const r=await fetchRate();if(r){S.rate={value:r.value,date:today,ecb:r.date};save();renderAll()}
  else if(force)toast('Kurs gerade nicht abrufbar – letzter Kurs bleibt aktiv');
}

/* ---------- Categorising ---------- */
function classify(name,store){
  const k=norm(name);
  if(S.learned[k])return {...S.learned[k]};
  for(const [re,c,s] of RULES)if(re.test(name))return {cat:c,sub:s};
  if(store)for(const [re,c] of STORE_RULES)if(re.test(store))return {cat:c,sub:null};
  return {cat:'food',sub:'Sonstiges'};
}

/* ---------- Receipt recognition ---------- */
function parseReceipt(text){
  const lines=text.split('\n').map(l=>l.replace(/\s+/g,' ').trim()).filter(Boolean);
  const isDK=/(\bi alt\b|\bmoms\b|\bkr\.?\s|\bpant\b|beløb|byttepenge|dankort|kvittering|netto\s*\.?\s*dk|rema|føtex|bilka|brugsen|meny|lidl\.dk)/i.test(text)&&!/(mwst|summe|euro|eur\b)/i.test(text);
  const isEN=!isDK&&/(\btotal\b|\bchange\b|\bthank you\b|\bvat\b)/i.test(text)&&!/(summe|mwst)/i.test(text);
  let date=null;const dm=text.match(/\b(\d{1,2})[.\-\/](\d{1,2})[.\-\/](\d{2,4})\b/);
  if(dm){let y=+dm[3];if(y<100)y+=2000;const d=+dm[1],m=+dm[2];if(d<=31&&m<=12&&y>2000)date=`${y}-${pad(m)}-${pad(d)}`}
  const store=(lines.slice(0,6).find(l=>/[a-zäöüæøå]{3,}/i.test(l)&&!/\d+[.,]\d{2}\s*\S{0,2}$/.test(l)&&!/\d{6,}/.test(l))||'').slice(0,40);
  const priceRe=/(-?\d{1,4}[.,]\d{2})\s*(-)?\s*[A-Z*]{0,2}\s*$/;
  const totalRe=/(summe|gesamt|total|i alt|zu zahlen|at betale|endbetrag|betrag)/i;
  const skipRe=/(\bbar\b|kreditkarte|ec[- ]?karte|girocard|rückgeld|wechselgeld|mwst|moms|netto\b|brutto|dankort|\bkort\b|byttepenge|subtotal|steuer|visa|mastercard|gegeben|kontant|change|\bvat\b|tlf|tel\.?|cvr|ust|kasse|bon-nr|beleg)/i;
  let total=null;const items=[];
  for(const l of lines){
    const m=l.match(priceRe);if(!m)continue;
    let val=parseFloat(m[1].replace(',','.'));if(m[2])val=-Math.abs(val);
    if(totalRe.test(l)){if(total===null)total=Math.abs(val);continue}
    if(skipRe.test(l))continue;
    let name=l.slice(0,l.length-m[0].length).replace(/\b\d+\s*[xX*]\s*$/,'').replace(/\s+\d+[.,]\d{2}\s*$/,'').trim();
    if(name.replace(/[^a-zäöüæøå]/gi,'').length<2)continue;
    if(/(pfand|pant|leergut)/i.test(name)&&/(rück|retur|leergut|bon|automat)/i.test(name))val=-Math.abs(val);
    items.push({id:uid(),name,price:val,...classify(name,store)});
  }
  return {date:date||new Date().toISOString().slice(0,10),store,currency:isDK?'DKK':'EUR',lang:isDK?'da':isEN?'en':'de',items,total};
}

async function prepImage(file){
  const img=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=URL.createObjectURL(file)});
  const sc=Math.min(1,1800/img.width);const c=document.createElement('canvas');c.width=img.width*sc;c.height=img.height*sc;
  const x=c.getContext('2d');x.filter='grayscale(1) contrast(1.6) brightness(1.05)';x.drawImage(img,0,0,c.width,c.height);
  const t=document.createElement('canvas');const ts=Math.min(1,900/img.width);t.width=img.width*ts;t.height=img.height*ts;
  t.getContext('2d').drawImage(img,0,0,t.width,t.height);
  return {ocr:c,thumb:t.toDataURL('image/jpeg',0.6)};
}
let ocrWorker=null;
async function runOCR(file){
  $('#scanStart').hidden=true;$('#scanProg').hidden=false;$('#review').hidden=true;
  const bar=$('#progBar'),txt=$('#progTxt');
  try{
    const {ocr,thumb}=await prepImage(file);
    if(!ocrWorker){txt.textContent='Lade Texterkennung (beim ersten Mal etwas Geduld) …';
      ocrWorker=await Tesseract.createWorker(['deu','eng','dan'],1,{logger:m=>{if(m.status==='recognizing text'){bar.style.width=Math.round(m.progress*100)+'%';txt.textContent='Lese Bon … '+Math.round(m.progress*100)+' %'}}})}
    const {data}=await ocrWorker.recognize(ocr);
    const r=parseReceipt(data.text);r.image=thumb;r.raw=data.text;
    showReview(r);
  }catch(e){console.error(e);toast('Texterkennung fehlgeschlagen – du kannst manuell eintragen');showReview({date:new Date().toISOString().slice(0,10),store:'',currency:'EUR',lang:'de',items:[],total:null})}
  finally{$('#scanProg').hidden=true;bar.style.width='0'}
}

/* ---------- Checking ---------- */
let draft=null;
function catOptions(sel){
  let h='';for(const c of S.cats){if(c.subs){for(const s of c.subs){const v=c.id+'|'+s;h+=`<option value="${esc(v)}"${v===sel?' selected':''}>${esc(c.name)} › ${esc(s)}</option>`}}else{const v=c.id+'|';h+=`<option value="${esc(v)}"${v===sel?' selected':''}>${esc(c.name)}</option>`}}
  return h;
}
function showReview(r){
  draft=r;r.items.forEach(i=>i.auto=i.cat+'|'+(i.sub||''));
  const el=$('#review');el.hidden=false;renderReview();
}
function renderReview(){
  const r=draft,el=$('#review');
  const sum=r.items.reduce((a,i)=>a+(+i.price||0),0);
  const mismatch=r.total!=null&&Math.abs(sum-r.total)>0.05;
  el.innerHTML=`
  <div class="grid g2" style="margin-bottom:12px">
   <div class="form"><label class="muted" style="flex:0 0 60px">Datum</label><input type="date" id="rDate" value="${esc(r.date)}"></div>
   <div class="form"><label class="muted" style="flex:0 0 60px">Geschäft</label><input id="rStore" value="${esc(r.store)}"></div>
   <div class="form"><label class="muted" style="flex:0 0 60px">Währung</label><select id="rCur"><option${r.currency==='EUR'?' selected':''}>EUR</option><option${r.currency==='DKK'?' selected':''}>DKK</option></select>
    <select id="rLang"><option value="de"${r.lang==='de'?' selected':''}>Deutsch</option><option value="en"${r.lang==='en'?' selected':''}>Englisch</option><option value="da"${r.lang==='da'?' selected':''}>Dänisch</option></select></div>
  </div>
  <table class="items"><tbody>${r.items.map(i=>`<tr data-id="${i.id}">
   <td><input class="iName" value="${esc(i.name)}">${r.lang!=='de'?`<div class="muted">${esc(translate(i.name))}</div>`:''}</td>
   <td style="width:38%"><select class="iCat">${catOptions(i.cat+'|'+(i.sub||''))}</select></td>
   <td class="p"><input class="iPrice" type="number" step="0.01" value="${i.price}"></td>
   <td style="width:30px"><button class="ghost icon iDel" aria-label="Entfernen">×</button></td></tr>`).join('')}</tbody></table>
  <div style="display:flex;gap:8px;margin:10px 0;flex-wrap:wrap">
   <button id="addRow">+ Position</button><button id="addPfand">+ Pfandrückgabe</button>
  </div>
  <div class="row"><span>Summe Positionen</span><b>${fmtC(sum,r.currency)}${r.currency==='DKK'?` <span class="muted">≈ ${fmtE(sum*S.rate.value)}</span>`:''}</b></div>
  ${r.total!=null?`<div class="row muted"><span>Summe laut Bon</span><span>${fmtC(r.total,r.currency)}</span></div>`:''}
  ${mismatch?`<div class="warn">Die Positionen ergeben nicht die Bon-Summe. Meist fehlt eine Zeile oder ein Preis wurde falsch gelesen – bitte kurz mit dem Bon abgleichen.</div>`:''}
  ${r.image?`<details style="margin:10px 0"><summary class="muted">Foto und erkannter Text</summary><img src="${r.image}" style="max-width:220px;border-radius:6px;margin-top:8px"><pre style="white-space:pre-wrap;font-size:11px;color:var(--ink3)">${esc(r.raw||'')}</pre></details>`:''}
  <div style="display:flex;gap:8px;margin-top:14px"><button class="primary" id="saveR">Ins Notizbuch übernehmen</button><button id="cancelR">Verwerfen</button></div>`;
  const sync=()=>{r.date=$('#rDate').value;r.store=$('#rStore').value;r.currency=$('#rCur').value;r.lang=$('#rLang').value;
    el.querySelectorAll('tr[data-id]').forEach(tr=>{const it=r.items.find(x=>x.id===tr.dataset.id);it.name=tr.querySelector('.iName').value;it.price=parseFloat(tr.querySelector('.iPrice').value)||0;const [c,s]=tr.querySelector('.iCat').value.split('|');it.cat=c;it.sub=s||null})};
  el.querySelectorAll('input,select').forEach(x=>x.addEventListener('change',()=>{sync();renderReview()}));
  el.querySelectorAll('.iDel').forEach(b=>b.onclick=()=>{sync();r.items=r.items.filter(i=>i.id!==b.closest('tr').dataset.id);renderReview()});
  $('#addRow').onclick=()=>{sync();r.items.push({id:uid(),name:'',price:0,cat:'food',sub:'Sonstiges',auto:''});renderReview()};
  $('#addPfand').onclick=()=>{sync();r.items.push({id:uid(),name:r.currency==='DKK'?'Pant retur':'Pfandrückgabe',price:-0.25,cat:'food',sub:'Wasser/Getränke',auto:''});renderReview()};
  $('#cancelR').onclick=resetScan;
  $('#saveR').onclick=async()=>{sync();
    r.items=r.items.filter(i=>i.name.trim()||i.price);
    if(!r.items.length){toast('Mindestens eine Position eintragen');return}
    for(const i of r.items){const now=i.cat+'|'+(i.sub||'');if(i.auto!==now&&i.name.trim())S.learned[norm(i.name)]={cat:i.cat,sub:i.sub};delete i.auto}
    if(r.currency==='DKK'){const h=await fetchRate(r.date);r.rate=h?h.value:S.rate.value;r.rateDate=h?h.date:S.rate.date}
    r.id=r.id||uid();r.source=r.source||'scan';delete r.raw;
    const ix=S.receipts.findIndex(x=>x.id===r.id);if(ix>=0)S.receipts[ix]=r;else S.receipts.push(r);
    S.month=r.date.slice(0,7);await save();resetScan();toast('Gespeichert');renderAll();go('nb');
  };
}
function resetScan(){draft=null;$('#review').hidden=true;$('#review').innerHTML='';$('#scanStart').hidden=false;$('#file').value=''}

/* ---------- Monthly data ---------- */
function monthData(m){
  const lines=[];
  for(const r of S.receipts)if(r.date.slice(0,7)===m)for(const i of r.items)lines.push({r,i,eur:toEur(i.price,r)});
  for(const s of S.subs)if((S.subChecks[m]||[]).includes(s.id))lines.push({sub:s,eur:s.currency==='DKK'?s.amount*S.rate.value:s.amount,i:{cat:s.cat||'digital',sub:null,price:s.amount}});
  const byCat={},bySub={},byStore={};let total=0,pfand=0;
  for(const l of lines){total+=l.eur;byCat[l.i.cat]=(byCat[l.i.cat]||0)+l.eur;
    if(l.i.cat==='food'){const k=l.i.sub||'Sonstiges';bySub[k]=(bySub[k]||0)+l.eur}
    if(l.r&&l.r.store){byStore[l.r.store]=(byStore[l.r.store]||0)+l.eur}
    if(l.eur<0&&l.i.name&&/(pfand|pant|leergut|deposit)/i.test(l.i.name))pfand+=-l.eur}
  const incs=(S.incomes||[]).filter(e=>e.date.slice(0,7)===m);
  const byInc={};let income=0;
  for(const e of incs){const v=e.currency==='DKK'?e.amount*(e.rate||S.rate.value):e.amount;income+=v;const k=e.category||'Sonstiges';byInc[k]=(byInc[k]||0)+v}
  return {lines,byCat,bySub,byStore,total,pfand,incs,byInc,income,saldo:income-total};
}

/* ---------- Diagramm ---------- */
function donut(parts,size=170){
  const tot=parts.reduce((a,p)=>a+Math.max(0,p.v),0);if(!tot)return `<svg width="${size}" height="${size}"><circle cx="${size/2}" cy="${size/2}" r="${size/2-18}" fill="none" stroke="var(--rule)" stroke-width="26"/></svg>`;
  const r=size/2-18,C=2*Math.PI*r;let off=0;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="Ausgaben nach Kategorie"><g transform="rotate(-90 ${size/2} ${size/2})">${parts.filter(p=>p.v>0).map(p=>{const len=p.v/tot*C;const s=`<circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${p.c}" stroke-width="26" stroke-dasharray="${Math.max(0,len-2)} ${C}" stroke-dashoffset="${-off}"><title>${esc(p.n)}: ${fmtE(p.v)}</title></circle>`;off+=len;return s}).join('')}</g>
  <text x="50%" y="48%" text-anchor="middle" font-family="Source Serif 4,serif" font-size="20" font-weight="600" fill="var(--ink)">${Math.round(tot)} €</text><text x="50%" y="60%" text-anchor="middle" font-size="11" fill="var(--ink3)">gesamt</text></svg>`;
}

/* ---------- Overview ---------- */
let ovTab='all';
function renderOverview(){
  const m=S.month,d=monthData(m),p=monthData(shiftMonth(m,-1));
  const diff=p.total?((d.total-p.total)/Math.abs(p.total))*100:null;
  const pendingSubs=S.subs.filter(s=>!(S.subChecks[m]||[]).includes(s.id)&&s.active!==false).length;
  const cats=S.cats.map(c=>({c,v:d.byCat[c.id]||0,pv:p.byCat[c.id]||0})).filter(x=>x.v||x.pv||S.budgets[x.c.id]);
  let parts,legendTitle;
  if(ovTab==='food'){parts=FOOD_SUBS.map((s,ix)=>({n:s,v:d.bySub[s]||0,c:SUB_COLORS[ix]}));legendTitle='Lebensmittel im Detail'}
  else{parts=cats.map(x=>({n:x.c.name,v:x.v,c:x.c.color}));legendTitle='Nach Kategorie'}
  const ptot=parts.reduce((a,x)=>a+Math.max(0,x.v),0);
  const stores=Object.entries(d.byStore).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const budgeted=S.cats.filter(c=>S.budgets[c.id]>0);
  $('#ov').innerHTML=`
  <div class="grid g3">
   <div class="card stat"><small>Einnahmen ${esc(monthName(m))}</small><b style="color:var(--ok)">${fmtE(d.income)}</b><div class="muted">${d.incs.length} ${d.incs.length===1?'Eintrag':'Einträge'}</div></div>
   <div class="card stat"><small>Ausgaben ${esc(monthName(m))}</small><b>${fmtE(d.total)}</b>${diff!==null?`<div class="${diff>0?'up':'down'}" style="font-size:13px">${diff>0?'▲':'▼'} ${Math.abs(diff).toFixed(0)} % zum Vormonat</div>`:'<div class="muted">kein Vormonat</div>'}</div>
   <div class="card stat"><small>Saldo (Einnahmen − Ausgaben)</small><b style="color:${d.saldo>=0?'var(--ok)':'var(--danger)'}">${d.saldo>=0?'+':''}${fmtE(d.saldo)}</b><div class="muted">${d.saldo>=0?'gespart':'mehr ausgegeben'}</div></div>
   <div class="card stat"><small>Einkäufe</small><b>${S.receipts.filter(r=>r.date.slice(0,7)===m).length}</b><div class="muted">Bons und Einträge</div></div>
   <div class="card stat"><small>Pfand zurück</small><b>${fmtE(d.pfand)}</b><div class="muted">bereits abgezogen</div></div>
  </div>
  ${pendingSubs?`<div class="warn" style="cursor:pointer" onclick="go('subs')">${pendingSubs} ${pendingSubs===1?'Abo ist':'Abos sind'} für ${esc(monthName(m))} noch nicht bestätigt. Antippen, um sie abzuhaken.</div>`:''}
  <h3>Verteilung</h3>
  <div class="tabs"><span class="tab ${ovTab==='all'?'on':''}" data-o="all">Alle Kategorien</span><span class="tab ${ovTab==='food'?'on':''}" data-o="food">Lebensmittel</span></div>
  <div class="card"><div class="donutwrap">${donut(parts)}<div class="legend"><div class="muted" style="font-size:12px">${legendTitle}</div>${parts.filter(x=>x.v).sort((a,b)=>b.v-a.v).map(x=>`<div><i style="background:${x.c}"></i><span>${esc(x.n)}</span><span class="muted">${ptot?Math.round(Math.max(0,x.v)/ptot*100):0} %</span><span>${fmtE(x.v)}</span></div>`).join('')||'<div class="muted">Noch keine Ausgaben in diesem Monat.</div>'}</div></div></div>
  <div class="grid g2">
   <div><h3>Budget</h3><div class="card">${budgeted.length?budgeted.map(c=>{const v=d.byCat[c.id]||0,b=S.budgets[c.id],pc=Math.min(100,v/b*100);return `<div class="row"><span>${esc(c.name)}</span><span>${fmtE(v)} <span class="muted">von ${fmtE(b)}</span></span></div><div class="bar"><div style="width:${pc}%;background:${v>b?'var(--danger)':pc>85?'#EF9F27':c.color}"></div></div>`}).join(''):'<p class="muted" style="margin:0">Noch kein Budget gesetzt. Das geht unter Einstellungen.</p>'}</div></div>
   <div><h3>Vergleich zum Vormonat</h3><div class="card">${cats.length?cats.map(x=>{const df=x.v-x.pv;return `<div class="row" style="padding:3px 0"><span>${esc(x.c.name)}</span><span>${fmtE(x.v)} <span class="${df>0.005?'up':df<-0.005?'down':'muted'}" style="font-size:12px">${df>0.005?'+':''}${df?fmtE(df):'±0'}</span></span></div>`}).join(''):'<p class="muted" style="margin:0">Noch keine Daten.</p>'}</div></div>
  </div>
  <h3>Geschäfte</h3><div class="card">${stores.length?stores.map(([s,v])=>`<div class="row"><span>${esc(s)}</span><span>${fmtE(v)}</span></div><div class="bar"><div style="width:${v/stores[0][1]*100}%;background:var(--accent)"></div></div>`).join(''):'<p class="muted" style="margin:0">Erscheint, sobald Bons erfasst sind.</p>'}</div>`;
  $('#ov').querySelectorAll('[data-o]').forEach(t=>t.onclick=()=>{ovTab=t.dataset.o;renderOverview()});
}

/* ---------- Notebook Design ---------- */
let openR=null;
function renderNotebook(){
  const m=S.month,de=S.view==='de';
  const rs=S.receipts.filter(r=>r.date.slice(0,7)===m).sort((a,b)=>b.date.localeCompare(a.date));
  const subs=S.subs.filter(s=>(S.subChecks[m]||[]).includes(s.id));
  const d=monthData(m);
  if(!rs.length&&!subs.length&&!d.incs.length){$('#nb').innerHTML=`<h2>${esc(monthName(m))}</h2><div class="notebook"><div class="empty">Diese Seite ist noch leer.<br><button class="primary" style="margin-top:12px" onclick="go('scan')">Ersten Bon scannen</button></div></div>`;return}
  const days={};rs.forEach(r=>(days[r.date]=days[r.date]||[]).push(r));
  let h='';
  if(d.incs.length){h+=`<div class="nb-day">Einnahmen</div>`;for(const e of [...d.incs].sort((a,b)=>b.date.localeCompare(a.date)))h+=`<div class="nb-line neg"><span>${esc(e.source||e.category)}</span><span class="dots"></span><span class="amt">+${de?fmtE(e.currency==='DKK'?e.amount*(e.rate||S.rate.value):e.amount):fmtC(e.amount,e.currency)}</span></div>`}
  if(rs.length)h+=`<div class="nb-day" style="margin-top:8px">Ausgaben</div>`;
  for(const day of Object.keys(days)){
    h+=`<div class="nb-day">${new Date(day+'T12:00').toLocaleDateString('de-DE',{weekday:'short',day:'2-digit',month:'2-digit'})}</div>`;
    for(const r of days[day]){
      const sum=r.items.reduce((a,i)=>a+i.price,0);const cs=[...new Set(r.items.map(i=>i.cat))];
      const amt=de?fmtE(toEur(sum,r)):fmtC(sum,r.currency);
      h+=`<div class="nb-line${sum<0?' neg':''}" data-r="${r.id}"><span>${esc(r.store||'Einkauf')}</span>${cs.slice(0,2).map(c=>`<span class="nb-tag" style="background:${cat(c).color}22;color:${cat(c).color}">${esc(cat(c).name)}</span>`).join('')}<span class="dots"></span><span class="amt">${amt}</span></div>`;
      if(openR===r.id){
        h+=`<div class="nb-detail"><table>${r.items.map(i=>`<tr><td>${esc(de&&r.lang!=='de'?translate(i.name):i.name)}${!de&&r.lang!=='de'?` <span class="muted">· ${esc(translate(i.name))}</span>`:''}</td><td class="muted">${esc(cat(i.cat).name)}${i.sub?' › '+esc(i.sub):''}</td><td>${de?fmtE(toEur(i.price,r)):fmtC(i.price,r.currency)}</td></tr>`).join('')}</table>
        ${r.currency==='DKK'?`<div class="muted" style="margin-top:6px">${fmtC(sum,'DKK')} = ${fmtE(toEur(sum,r))} · Kurs ${(r.rate||S.rate.value).toFixed(4)} (EZB${r.rateDate?', '+esc(r.rateDate):''})</div>`:''}
        ${r.image?`<img src="${r.image}" alt="Beleg" class="zoom">`:''}
        <div style="display:flex;gap:8px;margin-top:8px"><button class="eR">Bearbeiten</button><button class="dR" style="color:var(--danger)">Löschen</button></div></div>`;
      }
    }
  }
  if(subs.length){h+=`<div class="nb-day">Abos & Digital</div>`;for(const s of subs)h+=`<div class="nb-line"><span>${esc(s.name)}</span><span class="dots"></span><span class="amt">${de?fmtE(s.currency==='DKK'?s.amount*S.rate.value:s.amount):fmtC(s.amount,s.currency)}</span></div>`}
  h+=`<div class="nb-total"><span>Ausgaben ${esc(monthName(m))}</span><span>${fmtE(d.total)}</span></div>`;
  if(d.income)h+=`<div class="nb-total" style="color:var(--ok);border-top:0;margin-top:0"><span>Einnahmen</span><span>${fmtE(d.income)}</span></div><div class="nb-total" style="color:${d.saldo>=0?'var(--ok)':'var(--danger)'}"><span>Saldo</span><span>${d.saldo>=0?'+':''}${fmtE(d.saldo)}</span></div>`;
  $('#nb').innerHTML=`<h2>${esc(monthName(m))}</h2><div class="notebook">${h}</div>`;
  $('#nb').querySelectorAll('[data-r]').forEach(l=>l.onclick=()=>{openR=openR===l.dataset.r?null:l.dataset.r;renderNotebook()});
  $('#nb').querySelectorAll('.zoom').forEach(i=>i.onclick=()=>{$('#lbImg').src=i.src;$('#lb').style.display='flex'});
  const eR=$('#nb .eR');if(eR)eR.onclick=()=>{const r=S.receipts.find(x=>x.id===openR);go('scan');$('#scanStart').hidden=true;showReview(JSON.parse(JSON.stringify(r)))};
  const dR=$('#nb .dR');if(dR)dR.onclick=async()=>{if(!confirm('Diesen Eintrag wirklich löschen?'))return;S.receipts=S.receipts.filter(x=>x.id!==openR);openR=null;await save();renderAll();toast('Gelöscht')};
}

/* ---------- Income ---------- */
function incCatList(){return [...new Set([...INCOME_CATS,...(S.incomes||[]).map(e=>e.category).filter(Boolean)])]}
function renderInc(){
  const m=S.month,d=monthData(m);
  const list=(S.incomes||[]).filter(e=>e.date.slice(0,7)===m).sort((a,b)=>b.date.localeCompare(a.date));
  $('#inc').innerHTML=`<h2>Einnahmen · ${esc(monthName(m))}</h2>
  <p class="muted" style="margin-top:-6px">Gehalt, DataAnnotation, YouTube, Verkäufe und alles, was reinkommt. Zählt in die Übersicht als Saldo gegen die Ausgaben.</p>
  <div class="card"><div class="form">
    <input id="iDate" type="date" value="${new Date().toISOString().slice(0,10)}">
    <input id="iSrc" placeholder="z. B. DataAnnotation" list="incCats">
    <datalist id="incCats">${incCatList().map(c=>`<option value="${esc(c)}">`).join('')}</datalist>
    <input id="iAmt" type="number" step="0.01" placeholder="850,00">
    <select id="iCur"><option>EUR</option><option>DKK</option></select>
    <button class="primary" id="iAdd">Einnahme eintragen</button>
  </div><input id="iNote" placeholder="Notiz (optional)" style="width:100%;margin-top:8px"></div>
  <div class="card">${list.length?list.map(e=>`<div class="sub"><label><span>${esc(e.source||e.category)}</span><span class="muted">${esc(e.category||'')}${e.note?' · '+esc(e.note):''} · ${new Date(e.date+'T12:00').toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit'})}</span></label><span style="font-variant-numeric:tabular-nums;color:var(--ok)">+${fmtC(e.amount,e.currency)}</span><button class="ghost icon" data-xi="${e.id}" aria-label="Löschen">×</button></div>`).join(''):'<p class="muted" style="margin:0">Noch keine Einnahmen in diesem Monat.</p>'}
   <div class="row" style="padding-top:10px"><b>Summe Einnahmen</b><b style="color:var(--ok)">${fmtE(d.income)}</b></div>
   <div class="row"><span>Ausgaben</span><span>${fmtE(d.total)}</span></div>
   <div class="row" style="border-top:2px solid var(--ink3);padding-top:6px;margin-top:4px"><b>Saldo</b><b style="color:${d.saldo>=0?'var(--ok)':'var(--danger)'}">${d.saldo>=0?'+':''}${fmtE(d.saldo)}</b></div></div>`;
  $('#inc').querySelectorAll('[data-xi]').forEach(b=>b.onclick=async()=>{if(!confirm('Diese Einnahme löschen?'))return;S.incomes=S.incomes.filter(x=>x.id!==b.dataset.xi);await save();renderAll();toast('Gelöscht')});
  $('#iAdd').onclick=async()=>{const src=$('#iSrc').value.trim(),a=parseFloat($('#iAmt').value),dt=$('#iDate').value;if(!src||!a||!dt){toast('Datum, Quelle und Betrag eintragen');return}
    const cur=$('#iCur').value;const e={id:uid(),date:dt,source:src,category:src,amount:a,currency:cur,note:$('#iNote').value.trim()};
    if(cur==='DKK'){const h=await fetchRate(dt);e.rate=h?h.value:S.rate.value;e.rateDate=h?h.date:S.rate.date}
    (S.incomes=S.incomes||[]).push(e);S.month=dt.slice(0,7);await save();renderAll();toast('Einnahme eingetragen')};
}

/* ----------Subscriptions ---------- */
function renderSubs(){
  const m=S.month,checked=S.subChecks[m]||[];
  const list=S.subs.filter(s=>s.active!==false),paused=S.subs.filter(s=>s.active===false);
  const sum=S.subs.filter(s=>checked.includes(s.id)).reduce((a,s)=>a+(s.currency==='DKK'?s.amount*S.rate.value:s.amount),0);
  $('#subs').innerHTML=`<h2>Abos & digitale Ausgaben · ${esc(monthName(m))}</h2>
  <p class="muted" style="margin-top:-6px">Nur was du abhakst, wird für diesen Monat gezählt. Gekündigte Abos einfach nicht abhaken oder pausieren.</p>
  <div class="card">${list.length?list.map(s=>`<div class="sub${checked.includes(s.id)?'':' off'}"><label><input type="checkbox" data-c="${s.id}"${checked.includes(s.id)?' checked':''}><span>${esc(s.name)}</span><span class="muted">${esc(cat(s.cat).name)}</span></label><span style="font-variant-numeric:tabular-nums">${fmtC(s.amount,s.currency)}</span><button class="ghost icon" data-p="${s.id}" title="Pausieren / gekündigt">⏸</button><button class="ghost icon" data-x="${s.id}" aria-label="Löschen">×</button></div>`).join(''):'<p class="muted" style="margin:0">Noch keine Abos angelegt.</p>'}
   <div class="row" style="padding-top:10px"><b>Bestätigt diesen Monat</b><b>${fmtE(sum)}</b></div></div>
  ${paused.length?`<h3>Pausiert / gekündigt</h3><div class="card">${paused.map(s=>`<div class="sub off"><label><span>${esc(s.name)}</span></label><span>${fmtC(s.amount,s.currency)}</span><button class="ghost" data-p="${s.id}">Reaktivieren</button><button class="ghost icon" data-x="${s.id}" aria-label="Löschen">×</button></div>`).join('')}</div>`:''}
  <h3>Abo oder wiederkehrende Ausgabe anlegen</h3>
  <div class="card form"><input id="sName" placeholder="Netflix"><input id="sAmt" type="number" step="0.01" placeholder="13,99"><select id="sCur"><option>EUR</option><option>DKK</option></select><select id="sCat">${S.cats.map(c=>`<option value="${c.id}"${c.id==='digital'?' selected':''}>${esc(c.name)}</option>`).join('')}</select><button class="primary" id="sAdd">Anlegen</button></div>
  <h3>Einmalige Ausgabe ohne Bon</h3>
  <div class="card form"><input id="oDate" type="date" value="${new Date().toISOString().slice(0,10)}"><input id="oName" placeholder="Online-Bestellung"><input id="oAmt" type="number" step="0.01" placeholder="24,90"><select id="oCur"><option>EUR</option><option>DKK</option></select><select id="oCat">${catOptions('other|')}</select><button class="primary" id="oAdd">Eintragen</button></div>`;
  $('#subs').querySelectorAll('[data-c]').forEach(c=>c.onchange=async()=>{const arr=new Set(S.subChecks[m]||[]);c.checked?arr.add(c.dataset.c):arr.delete(c.dataset.c);S.subChecks[m]=[...arr];await save();renderAll()});
  $('#subs').querySelectorAll('[data-p]').forEach(b=>b.onclick=async()=>{const s=S.subs.find(x=>x.id===b.dataset.p);s.active=s.active===false;if(s.active===false)S.subChecks[m]=(S.subChecks[m]||[]).filter(x=>x!==s.id);await save();renderAll()});
  $('#subs').querySelectorAll('[data-x]').forEach(b=>b.onclick=async()=>{if(!confirm('Abo löschen? Bereits bestätigte Monate verlieren den Betrag.'))return;S.subs=S.subs.filter(x=>x.id!==b.dataset.x);await save();renderAll()});
  $('#sAdd').onclick=async()=>{const n=$('#sName').value.trim(),a=parseFloat($('#sAmt').value);if(!n||!a){toast('Name und Betrag eintragen');return}
    S.subs.push({id:uid(),name:n,amount:a,currency:$('#sCur').value,cat:$('#sCat').value,active:true});await save();renderAll();toast('Abo angelegt – jetzt für den Monat abhaken')};
  $('#oAdd').onclick=async()=>{const n=$('#oName').value.trim(),a=parseFloat($('#oAmt').value),dt=$('#oDate').value;if(!n||!a||!dt){toast('Datum, Name und Betrag eintragen');return}
    const [c,s]=$('#oCat').value.split('|');const cur=$('#oCur').value;const r={id:uid(),date:dt,store:n,currency:cur,lang:'de',source:'manual',items:[{id:uid(),name:n,price:a,cat:c,sub:s||null}]};
    if(cur==='DKK'){const h=await fetchRate(dt);r.rate=h?h.value:S.rate.value;r.rateDate=h?h.date:S.rate.date}
    S.receipts.push(r);await save();renderAll();toast('Eingetragen')};
}

/* ---------- Settings ---------- */
function renderSettings(){
  $('#set').innerHTML=`<h2>Einstellungen</h2>
  <h3>Wechselkurs DKK → EUR</h3>
  <div class="card"><div class="row"><span>1 DKK = <b>${S.rate.value.toFixed(4)} €</b> · 100 kr = ${fmtE(S.rate.value*100)}</span><button id="rRef">Jetzt aktualisieren</button></div>
  <p class="muted" style="margin:6px 0 0">Tageskurs der Europäischen Zentralbank, wird einmal täglich automatisch geholt${S.rate.ecb?' (Stand '+esc(S.rate.ecb)+')':''}. Jeder dänische Bon speichert zusätzlich den Kurs seines Kaufdatums.</p></div>
  <h3>Monatsbudget pro Kategorie</h3>
  <div class="card grid g3">${S.cats.map(c=>`<label><span class="muted" style="font-size:12px">${esc(c.name)}</span><br><input type="number" step="1" data-b="${c.id}" value="${S.budgets[c.id]||''}" placeholder="kein Budget" style="width:100%"></label>`).join('')}</div>
  <h3>Eigene Kategorien</h3>
  <div class="card">${S.cats.filter(c=>c.custom).map(c=>`<div class="row" style="padding:4px 0"><span><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${c.color}"></i> ${esc(c.name)}</span><button class="ghost icon" data-dc="${c.id}">×</button></div>`).join('')}
   <div class="form" style="margin-top:8px"><input id="cName" placeholder="Wachteln"><button id="cAdd">Kategorie hinzufügen</button></div></div>
  <h3>Eigene Übersetzungen</h3>
  <div class="card"><div class="form"><input id="dK" placeholder="dänisch / englisch: hvedemel"><input id="dV" placeholder="deutsch: Weizenmehl"><button id="dAdd">Hinzufügen</button></div>
   <p class="muted" style="margin:6px 0 0">${Object.keys(S.dict).length} eigene Wörter · ${Object.keys(DICT).length} eingebaut · ${Object.keys(S.learned).length} gelernte Zuordnungen <button class="ghost" id="lReset" style="font-size:12px">gelernte zurücksetzen</button></p></div>
  <h3>Export & Sicherung</h3>
  <div class="card"><div style="display:flex;gap:8px;flex-wrap:wrap"><button id="xCsv">Alle Positionen als CSV (Excel)</button><button id="xMonth">Nur ${esc(monthName(S.month))} als CSV</button><button id="xJson">Sicherung herunterladen</button><label class="ghost" style="border:1px solid var(--line);border-radius:8px;padding:7px 12px;cursor:pointer">Sicherung laden<input type="file" id="iJson" accept="application/json" hidden></label></div>
  <p class="muted" style="margin:6px 0 0">${SERVER?'Gespeichert in Dateien auf deinem Laptop (Ordner <b>daten</b> neben dem Programm), unabhängig vom Browser. Tägliche Sicherungen liegen in <b>daten/sicherungen</b>.':'Alle Daten liegen nur in diesem Browser.'} Eine Sicherung ab und zu schützt vor Verlust, z. B. beim Löschen der Browserdaten.</p></div>`;
  $('#rRef').onclick=()=>refreshRate(true).then(()=>toast('Kurs aktualisiert'));
  $('#set').querySelectorAll('[data-b]').forEach(i=>i.onchange=async()=>{const v=parseFloat(i.value);if(v>0)S.budgets[i.dataset.b]=v;else delete S.budgets[i.dataset.b];await save();renderOverview()});
  $('#set').querySelectorAll('[data-dc]').forEach(b=>b.onclick=async()=>{if(!confirm('Kategorie entfernen? Einträge darin landen unter Sonstiges.'))return;const id=b.dataset.dc;S.cats=S.cats.filter(c=>c.id!==id);S.receipts.forEach(r=>r.items.forEach(i=>{if(i.cat===id){i.cat='other';i.sub=null}}));S.subs.forEach(s=>{if(s.cat===id)s.cat='other'});await save();renderAll()});
  $('#cAdd').onclick=async()=>{const n=$('#cName').value.trim();if(!n)return;const cust=S.cats.filter(c=>c.custom).length;S.cats.push({id:'c_'+uid(),name:n,color:EXTRA_COLORS[cust%EXTRA_COLORS.length],custom:true});await save();renderAll();toast('Kategorie hinzugefügt')};
  $('#dAdd').onclick=async()=>{const k=$('#dK').value.trim().toLowerCase(),v=$('#dV').value.trim();if(!k||!v)return;S.dict[k]=v;await save();renderSettings();toast('Wort gespeichert')};
  $('#lReset').onclick=async()=>{if(confirm('Gelernte Zuordnungen löschen?')){S.learned={};await save();renderSettings()}};
  $('#xCsv').onclick=()=>exportCsv(null);$('#xMonth').onclick=()=>exportCsv(S.month);
  $('#xJson').onclick=()=>download(`bonbuch-sicherung-${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(S),'application/json');
  $('#iJson').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const j=JSON.parse(await f.text());if(!Array.isArray(j.receipts))throw 0;if(!confirm('Sicherung laden? Die aktuellen Daten werden ersetzt.'))return;S={...S,...j};await save();renderAll();toast('Sicherung geladen')}catch(_){toast('Datei ist keine gültige Sicherung')}};
}
function exportCsv(m){
  const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';const n=v=>(Math.round(v*100)/100).toFixed(2).replace('.',',');
  const rows=[['Datum','Art','Geschäft/Quelle','Position','Position (deutsch)','Kategorie','Unterkategorie','Betrag','Währung','Betrag EUR','Quelle']];
  for(const r of S.receipts){if(m&&r.date.slice(0,7)!==m)continue;for(const i of r.items)rows.push([r.date,'Ausgabe',r.store,i.name,r.lang!=='de'?translate(i.name):i.name,cat(i.cat).name,i.sub||'',n(i.price),r.currency,n(toEur(i.price,r)),r.source==='manual'?'manuell':'Bon'])}
  for(const [mm,ids] of Object.entries(S.subChecks)){if(m&&mm!==m)continue;for(const id of ids){const s=S.subs.find(x=>x.id===id);if(s)rows.push([mm+'-01','Ausgabe',s.name,s.name,s.name,cat(s.cat).name,'',n(s.amount),s.currency,n(s.currency==='DKK'?s.amount*S.rate.value:s.amount),'Abo'])}}
  for(const e of (S.incomes||[])){if(m&&e.date.slice(0,7)!==m)continue;rows.push([e.date,'Einnahme',e.source||e.category,e.note||'',e.note||'',e.category||'',''.toString(),n(e.amount),e.currency,n(e.currency==='DKK'?e.amount*(e.rate||S.rate.value):e.amount),'Einnahme'])}
  rows.sort((a,b)=>a[0]===b[0]?0:a[0]==='Datum'?-1:b[0]==='Datum'?1:a[0].localeCompare(b[0]));
  download(`bonbuch-${m||'alle'}.csv`,'﻿'+rows.map(r=>r.map(q).join(';')).join('\r\n'),'text/csv');
}
function download(name,data,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000)}

/* ---------- Navigation ---------- */
function go(t){document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.t===t));document.querySelectorAll('main section').forEach(s=>s.classList.toggle('on',s.id===t));window.scrollTo(0,0)}
window.go=go;
function renderAll(){$('#mLabel').textContent=monthName(S.month);$('#vOrig').classList.toggle('on',S.view!=='de');$('#vDe').classList.toggle('on',S.view==='de');renderOverview();renderNotebook();renderInc();renderSubs();renderSettings()}

(async()=>{
  let st=await serverLoad();if(!SERVER){await DB.open();st=await DB.get('state')}
  if(st){S={...S,...st};if(!S.cats.find(c=>c.id==='food'))S.cats=DEFAULT_CATS.concat(S.cats.filter(c=>c.custom))}
  S.month=new Date().toISOString().slice(0,7);
  document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>go(b.dataset.t));
  $('#prevM').onclick=()=>{S.month=shiftMonth(S.month,-1);openR=null;renderAll()};
  $('#nextM').onclick=()=>{S.month=shiftMonth(S.month,1);openR=null;renderAll()};
  $('#vOrig').onclick=()=>{S.view='orig';save();renderAll()};
  $('#vDe').onclick=()=>{S.view='de';save();renderAll()};
  $('#file').onchange=e=>{const f=e.target.files[0];if(f)runOCR(f)};
  $('#manualBtn').onclick=()=>{$('#scanStart').hidden=true;showReview({date:new Date().toISOString().slice(0,10),store:'',currency:'EUR',lang:'de',items:[{id:uid(),name:'',price:0,cat:'food',sub:'Sonstiges'}],total:null,source:'manual'})};
  $('#lb').onclick=()=>$('#lb').style.display='none';
  renderAll();refreshRate(false);
  if('serviceWorker' in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('sw.js');
  if(navigator.storage&&navigator.storage.persist)navigator.storage.persist();
})();
