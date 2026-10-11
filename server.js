
const http=require('http'),fs=require('fs'),path=require('path'),{exec}=require('child_process');
const PORT=process.env.PORT||4321;
const ROOT=__dirname,DATA=path.join(ROOT,'daten'),IMG=path.join(DATA,'belege'),BAK=path.join(DATA,'sicherungen'),FILE=path.join(DATA,'bonbuch.json');
for(const d of [DATA,IMG,BAK])fs.mkdirSync(d,{recursive:true});
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.css':'text/css'};

function load(){try{return JSON.parse(fs.readFileSync(FILE,'utf8'))}catch(e){return null}}
function backup(){const day=new Date().toISOString().slice(0,10),f=path.join(BAK,`bonbuch-${day}.json`);
  if(fs.existsSync(FILE)&&!fs.existsSync(f))fs.copyFileSync(FILE,f);
  const all=fs.readdirSync(BAK).filter(x=>x.endsWith('.json')).sort();while(all.length>60)fs.unlinkSync(path.join(BAK,all.shift()))}
function save(state){
  const images={};
  for(const r of state.receipts||[]){
    if(typeof r.image==='string'&&r.image.startsWith('data:image')){
      const name=`${(r.date||'ohne-datum')}_${String(r.id).replace(/[^a-z0-9]/gi,'')}.jpg`;
      fs.writeFileSync(path.join(IMG,name),Buffer.from(r.image.split(',')[1],'base64'));
      r.image='belege/'+name;images[r.id]=r.image;
    }
  }
  backup();
  const tmp=FILE+'.tmp';fs.writeFileSync(tmp,JSON.stringify(state,null,1));fs.renameSync(tmp,FILE);
  return images;
}

http.createServer((req,res)=>{
  const url=decodeURIComponent(req.url.split('?')[0]);
  if(url==='/api/state'&&req.method==='GET'){res.writeHead(200,{'Content-Type':'application/json'});return res.end(JSON.stringify(load()||{}))}
  if(url==='/api/state'&&req.method==='PUT'){let b='';req.on('data',c=>b+=c);req.on('end',()=>{
    try{const images=save(JSON.parse(b));res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify({ok:true,images}))}
    catch(e){console.error(e);res.writeHead(500);res.end('{"ok":false}')}});return}
  let f=url==='/'?'/index.html':url;
  const base=f.startsWith('/belege/')?DATA:ROOT;
  const full=path.normalize(path.join(base,f));
  if(!full.startsWith(base)||full.startsWith(path.join(ROOT,'daten'))&&base===ROOT){res.writeHead(403);return res.end()}
  fs.readFile(full,(err,data)=>{if(err){res.writeHead(404);return res.end('Nicht gefunden')}
    res.writeHead(200,{'Content-Type':TYPES[path.extname(full)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data)});
}).listen(PORT,'127.0.0.1',()=>{
  const u=`http://localhost:${PORT}`;
  console.log(`\n  Bonbuch läuft: ${u}\n  Daten: ${DATA}\n  Zum Beenden dieses Fenster schließen.\n`);
  const cmd=process.platform==='win32'?`start "" "${u}"`:process.platform==='darwin'?`open "${u}"`:`xdg-open "${u}"`;
  exec(cmd,()=>{});
});
