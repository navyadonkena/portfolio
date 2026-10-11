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
