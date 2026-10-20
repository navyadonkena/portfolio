// mobile nav
const toggle=document.getElementById('navToggle');
const links=document.getElementById('navLinks');
if(toggle&&links){
  toggle.addEventListener('click',()=>links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
}
// year
const yr=document.getElementById('year');
if(yr)yr.textContent=new Date().getFullYear();
// reveal on scroll
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
// back to top
document.querySelectorAll('.back-top').forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault();
  window.scrollTo({top:0,behavior:'smooth'});
}));
// breadcrumbs — built from the URL, so new pages get one automatically.
// Optional per-page label: <meta name="breadcrumb" content="Short label">
// Optional folder label/link overrides live in BC_FOLDERS below.
(function(){
  const s=document.currentScript;
  if(!s||!s.src||document.querySelector('.breadcrumbs'))return;
  const root=new URL('.',s.src);
  if(!location.pathname.startsWith(root.pathname))return;
  let rel=decodeURIComponent(location.pathname.slice(root.pathname.length));
  if(!rel||rel.endsWith('/'))rel+='index.html';
  if(rel==='index.html')return;
  const BC_FOLDERS={
    'case-studies':{label:'Case studies',href:'case-studies/index.html'},
    'services':{label:'Services',href:null}
  };
  const pretty=n=>n.replace(/\.html?$/,'').replace(/[-_]+/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
  const parts=rel.split('/');
  const file=parts.pop();
  const crumbs=[{label:'Home',href:root.href}];
  let path='';
  parts.forEach((seg,i)=>{
    path+=seg+'/';
    const o=BC_FOLDERS[seg]||{label:pretty(seg),href:path+'index.html'};
    const isLast=i===parts.length-1&&file==='index.html';
    crumbs.push({label:o.label,href:(isLast||!o.href)?null:new URL(o.href,root).href});
  });
  if(file!=='index.html'){
    const m=document.querySelector('meta[name="breadcrumb"]');
    const label=m?m.content:document.title.split(/\s+[—–|-]\s+/)[0].trim()||pretty(file);
    crumbs.push({label:label,href:null});
  }
  const css=document.createElement('link');
  css.rel='stylesheet';css.href=new URL('breadcrumbs.css',root).href;
  document.head.appendChild(css);
  const nav=document.createElement('nav');
  nav.className='breadcrumbs';nav.setAttribute('aria-label','Breadcrumb');
  const wrap=document.createElement('div');wrap.className='bc-wrap';
  const ol=document.createElement('ol');ol.className='bc-list';
  crumbs.forEach((c,ci)=>{
    const li=document.createElement('li');
    if(c.href){const a=document.createElement('a');a.href=c.href;a.textContent=c.label;li.appendChild(a);}
    else{const sp=document.createElement('span');sp.textContent=c.label;if(ci===crumbs.length-1)sp.setAttribute('aria-current','page');li.appendChild(sp);}
    ol.appendChild(li);
  });
  wrap.appendChild(ol);nav.appendChild(wrap);
  const host=document.querySelector('header.nav')||document.querySelector('header.topbar')||document.querySelector('header');
  if(host)host.after(nav);else document.body.prepend(nav);
  const ld=document.createElement('script');
  ld.type='application/ld+json';
  ld.textContent=JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList',
    itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,name:c.label,item:c.href||location.href}))});
  document.head.appendChild(ld);
})();
