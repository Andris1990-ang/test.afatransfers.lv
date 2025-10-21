
function getParam(name){const u=new URL(location.href);return u.searchParams.get(name)||''}
function attachAutocomplete(el){
  const list=document.createElement('div');
  Object.assign(list.style,{position:'absolute',zIndex:20,background:'#fff',border:'1px solid #e9eaee',borderRadius:'12px',marginTop:'6px',minWidth:'320px',boxShadow:'0 12px 24px rgba(0,0,0,.06)',maxHeight:'260px',overflowY:'auto',display:'none'});
  el.parentElement.style.position='relative'; el.parentElement.appendChild(list);
  let ctrl;
  el.addEventListener('input', async ()=>{
    const q=el.value.trim(); if(ctrl) ctrl.abort(); if(q.length<3){ list.style.display='none'; return; }
    ctrl=new AbortController();
    try{
      const res=await fetch('/api/places?q='+encodeURIComponent(q),{signal:ctrl.signal});
      const data=await res.json(); list.innerHTML='';
      (data?.results||[]).forEach(item=>{ const row=document.createElement('div'); row.style.padding='12px 14px'; row.style.cursor='pointer'; row.textContent=item.label; row.addEventListener('click', ()=>{ el.value=item.label; list.style.display='none';}); list.appendChild(row); });
      list.style.display = list.childElementCount ? 'block':'none';
    }catch(e){}
  });
  el.addEventListener('blur', ()=> setTimeout(()=> list.style.display='none', 200));
}
document.addEventListener('DOMContentLoaded',()=>{
  const v=getParam('vehicle'), p=getParam('pickup'), d=getParam('dropoff');
  const sel=document.getElementById('vehicle'); if(v && sel){ Array.from(sel.options).forEach(o=>{ if(o.value.toLowerCase()===v.toLowerCase()) sel.value=o.value; }); }
  if(p){ const el=document.getElementById('pickup'); if(el) el.value=decodeURIComponent(p); }
  if(d){ const el=document.getElementById('dropoff'); if(el) el.value=decodeURIComponent(d); }
  attachAutocomplete(document.getElementById('pickup'));
  attachAutocomplete(document.getElementById('dropoff'));

  const f=document.getElementById('booking'), toast=document.getElementById('toast');
  f?.addEventListener('submit', async e=>{
    e.preventDefault(); toast.textContent='Sending…';
    const data=Object.fromEntries(new FormData(f).entries());
    const r=await fetch('/api/booking',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    const j=await r.json().catch(()=>({ok:false}));
    toast.textContent=j.ok?'Sent ✅':'Error ❌';
  });
});
