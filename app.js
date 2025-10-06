document.querySelectorAll('.links a,.cta a').forEach(a=>a.addEventListener('click',e=>{const h=a.getAttribute('href');if(h&&h.startsWith('#')){e.preventDefault();document.querySelector(h).scrollIntoView({behavior:'smooth'});}}));

const c=299792;
const dist=document.getElementById('dist');
const distVal=document.getElementById('distVal');
const oneWay=document.getElementById('oneWay');
const roundTrip=document.getElementById('roundTrip');
const delayBar=document.getElementById('delayBar');
function formatTime(s){if(s<60)return Math.round(s)+' s';const m=s/60;return m<60?m.toFixed(1)+' min':(m/60).toFixed(1)+' h';}
function updateDelay(){const d=parseFloat(dist.value);distVal.textContent=d;const s=(d*1e6)/c;oneWay.textContent=formatTime(s);roundTrip.textContent=formatTime(s*2);const pct=Math.min(100,Math.max(0,((d-50)/(410-50))*100));delayBar.style.width=pct+'%';}
document.querySelectorAll('.chip').forEach(b=>b.addEventListener('click',()=>{dist.value=b.dataset.d;updateDelay();}));
dist.addEventListener('input',updateDelay);updateDelay();

const solar=document.getElementById('solar'), panel=document.getElementById('panel'), base=document.getElementById('base'), cams=document.getElementById('cams'), sci=document.getElementById('sci');
const solarVal=document.getElementById('solarVal'), panelVal=document.getElementById('panelVal'), baseVal=document.getElementById('baseVal'), camsVal=document.getElementById('camsVal'), sciVal=document.getElementById('sciVal');
const energyRes=document.getElementById('energyRes'), dataRes=document.getElementById('dataRes'), planHint=document.getElementById('planHint');
function updatePlanner(){
  solarVal.textContent=solar.value; panelVal.textContent=panel.value; baseVal.textContent=base.value; camsVal.textContent=cams.value; sciVal.textContent=sci.value;
  const gen = parseFloat(solar.value)*parseFloat(panel.value);
  const baseE = parseFloat(base.value)*24;
  const camE = parseFloat(cams.value)*8;
  const sciE = parseFloat(sci.value)*25;
  const cons = baseE + camE + sciE;
  const bal = Math.round(gen - cons);
  energyRes.textContent = (bal>=0?'+':'') + bal + ' Wh';
  const data = 100 + parseFloat(cams.value)*5 + parseFloat(sci.value)*20;
  dataRes.textContent = Math.round(data) + ' MB/day';
  if(bal<0){
    const maxCams = Math.max(0, Math.floor((gen - baseE - sciE)/8));
    planHint.textContent = 'Deficit: reduce images to ≤ ' + maxCams + ' for balance.';
  }else{
    const extra = Math.floor(bal/8);
    planHint.textContent = 'Surplus: you can add about ' + extra + ' more images.';
  }
}
[solar,panel,base,cams,sci].forEach(el=>el.addEventListener('input',updatePlanner));updatePlanner();

document.getElementById('downloadBrief').addEventListener('click',()=>{
  const lines=[
    'AI for Space & Mars – Key Points',
    '- Autonomy under long communication delays.',
    '- Faster science from onboard and ground analysis.',
    '- Safer navigation and landing via perception.',
    '- Predictive health for power, thermal, mobility.',
    '- Resource-aware planning for energy and data.',
  ].join('\n');
  const blob=new Blob([lines],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='AI-Space-Mars-brief.txt';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
});






