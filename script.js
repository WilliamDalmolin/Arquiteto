const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'×':'☰';});
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';}));
}
// Navegação suave sem deixar #sobre, #projetos etc. no endereço do navegador.
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',event=>{
    const id=link.getAttribute('href').slice(1);
    const target=document.getElementById(id);
    if(!target)return;
    event.preventDefault();
    target.scrollIntoView({behavior:'smooth',block:'start'});
    if(window.history&&window.history.replaceState){window.history.replaceState(null,'',window.location.pathname+window.location.search);}
  });
});
// Remove parâmetros de rastreamento como utm_source da barra de endereço, se vierem no link.
if(window.location.search&&window.location.search.includes('utm_')&&window.history&&window.history.replaceState){
  window.history.replaceState(null,'',window.location.pathname+window.location.hash);
}
