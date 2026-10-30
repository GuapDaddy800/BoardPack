// Injected only into the tab selected by the user.
function boardScanner(command){
if(!/(^|\.)pinterest\.(com|co\.uk|ca|de|fr|au|es|it|jp|nz|pt|at|ch|se|dk|nl|ie|cl|com\.au|com\.mx)$/.test(location.hostname))throw Error('Open a Pinterest board and click the extension icon there.');
if(command==='reset'){if(window.__boardpack)window.__boardpack.running=false;delete window.__boardpack;return true}
if(command==='stop'){if(window.__boardpack)window.__boardpack.running=false;return true}
if(command==='read'){const s=window.__boardpack;return s?{...s,items:Array.from(s.items.values())}:null}
let s=window.__boardpack;
if(s&&s.url!==location.href)s=null;
if(s?.running)return true;
s=s||{items:new Map(),url:location.href,title:document.title};window.__boardpack=s;s.running=true;s.reason='Scanning';s.started=Date.now();
const publish=()=>{chrome.runtime.sendMessage({target:'background',type:'scan-update',scan:{...s,items:Array.from(s.items.values())}}).catch(()=>{})};
let quiet=0,last=s.items.size,lastHeight=0;
const grid=document.querySelector('[data-test-id="board-feed"], [data-test-id="masonry-container"]');
let scroller=document.scrollingElement;
for(let node=grid?.parentElement;node&&node!==document.body;node=node.parentElement){if(/auto|scroll/.test(getComputedStyle(node).overflowY)&&node.scrollHeight>node.clientHeight+100){scroller=node;break}}
if(scroller)scroller.scrollTop=0;
const tick=()=>{if(!s.running)return;
if(/^\/(login|auth)(\/|$)/.test(location.pathname)||document.querySelector('input[type="password"]')){s.running=false;s.reason='Pinterest is asking for login. Sign in and open the private board in this tab, then click Scan open board.';publish();return}
if(location.href!==s.url){s.running=false;s.reason='Board URL changed; scan stopped.';publish();return}
for(const a of document.querySelectorAll('a[href*="/pin/"]')){const pin=a.href.match(/\/pin\/(\d+)/);if(!pin)continue;for(const img of (a.closest('[data-test-id="pin"], [data-test-id="pinWrapper"], [data-grid-item]')||a).querySelectorAll('img')){let raw=img.currentSrc||img.src;try{const u=new URL(raw);if(u.hostname!=='i.pinimg.com'||!u.pathname.match(/\.(jpg|jpeg|png|webp|gif)$/i))continue;const key=u.pathname.replace(/^\/[^/]+\//,'/');const existing=s.items.get(key);if(!existing||img.naturalWidth>existing.width)s.items.set(key,{url:u.href,pin:'https://www.pinterest.com/pin/'+pin[1]+'/',id:pin[1],width:img.naturalWidth,alt:img.alt||''})}catch{}}}
const height=scroller?.scrollHeight||document.documentElement.scrollHeight;
const viewport=scroller?.clientHeight||innerHeight;
const top=scroller?.scrollTop||0;
const bottom=top+viewport>=height-100;
const loading=!!document.querySelector('[role="progressbar"], [data-test-id="spinner"], [aria-busy="true"]');
quiet=bottom&&!loading&&s.items.size===last&&height===lastHeight?quiet+1:0;
last=s.items.size;lastHeight=height;
if(quiet>=8||s.items.size>=15000||Date.now()-s.started>3600000){
 s.running=false;s.complete=quiet>=8;s.reason=s.complete?(s.items.size?'Board scanned. No more images loaded.':'No images found. Open the signed-in board and wait for pins to appear.'):'Scan limit reached. Results may be partial.';publish();return}
publish();if(scroller)scroller.scrollTop+=Math.max(350,viewport*.7);setTimeout(tick,1200)};tick();return true;
}

