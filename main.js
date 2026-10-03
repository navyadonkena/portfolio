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

// career timeline: draw a connector through the actual node positions
(function(){
  const tl=document.querySelector('.tl2'); if(!tl) return;
  const svgNS='http://www.w3.org/2000/svg';
  let svg=tl.querySelector('.tl2-path');
  if(!svg){
    svg=document.createElementNS(svgNS,'svg');
    svg.setAttribute('class','tl2-path');
    svg.setAttribute('aria-hidden','true');
    const defs=document.createElementNS(svgNS,'defs');
    const grad=document.createElementNS(svgNS,'linearGradient');
    grad.setAttribute('id','tl2Grad');
    grad.setAttribute('x1','0');grad.setAttribute('y1','0');grad.setAttribute('x2','0');grad.setAttribute('y2','1');
    const s1=document.createElementNS(svgNS,'stop');s1.setAttribute('offset','0%');s1.setAttribute('stop-color','#6d28d9');
    const s2=document.createElementNS(svgNS,'stop');s2.setAttribute('offset','100%');s2.setAttribute('stop-color','#ec4899');
    grad.appendChild(s1);grad.appendChild(s2);defs.appendChild(grad);svg.appendChild(defs);
    const poly=document.createElementNS(svgNS,'polyline');
    poly.setAttribute('fill','none');
    poly.setAttribute('stroke','url(#tl2Grad)');
    poly.setAttribute('stroke-width','3');
    poly.setAttribute('stroke-linecap','round');
    poly.setAttribute('stroke-linejoin','round');
    svg.appendChild(poly);
    tl.prepend(svg);
  }
  const poly=svg.querySelector('polyline');
  function draw(){
    const tlRect=tl.getBoundingClientRect();
    svg.setAttribute('width',tlRect.width);
    svg.setAttribute('height',tlRect.height);
    svg.setAttribute('viewBox','0 0 '+tlRect.width+' '+tlRect.height);
    const pts=[];
    tl.querySelectorAll('.tl2-node').forEach((n)=>{
      const r=n.getBoundingClientRect();
      const x=r.left-tlRect.left+r.width/2;
      const y=r.top-tlRect.top+r.height/2;
      pts.push(x+','+y);
    });
    poly.setAttribute('points',pts.join(' '));
  }
  draw();
  window.addEventListener('load',draw);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(draw);
  let t;
  window.addEventListener('resize',()=>{clearTimeout(t);t=setTimeout(draw,150);});
  tl.addEventListener('transitionend',(e)=>{if(e.propertyName==='transform')draw();});
})();
