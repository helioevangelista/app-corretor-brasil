document.addEventListener('DOMContentLoaded', ()=>{
  const categories = ['Loteamentos','Casas / Condomínios','Apartamentos','Chácaras','Cotas de clubes','Casas populares'];
  const tabbar = document.getElementById('tabbar');
  const cards = document.getElementById('cards');
  const selectedCount = document.getElementById('selectedCount');
  const maxFree = 3;
  let selected = JSON.parse(localStorage.getItem('cb_selected')||'[]');
  function renderTabs(){
    categories.forEach((c,i)=>{
      const b = document.createElement('button');
      b.className='tab'+(i===0?' active':'');
      b.textContent=c;
      b.onclick=()=>{ document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active')); b.classList.add('active'); renderCards(c); };
      tabbar.appendChild(b);
    });
  }
  function sampleItems(cat){
    const items = [];
    for(let i=1;i<=6;i++){ items.push({id:cat+'#'+i,title:cat+' - Empreendimento '+i, location:'Cidade XYZ', price:'R$ '+(100000+i*5000)}); }
    return items;
  }
  function renderCards(cat){
    cards.innerHTML='';
    const items = sampleItems(cat);
    items.forEach(it=>{
      const card = document.createElement('div'); card.className='card';
      card.innerHTML=`<h3>${it.title} <span class="badge">Vagas</span></h3><div class="lead">${it.location} • ${it.price}</div><div style="margin-top:8px"><button class="btn select-btn">${selected.includes(it.id)?'Selecionado':'Selecionar'}</button> <button class="btn outline more">Ver</button></div>`;
      const selBtn = card.querySelector('.select-btn');
      selBtn.onclick=()=>{
        if(selected.includes(it.id)){
          selected = selected.filter(s=>s!==it.id);
        } else {
          if(selected.length>=maxFree){
            if(!confirm('Você já selecionou 3 itens gratuitos. Deseja fazer upgrade para plano premium?')) return;
            window.location.href = '#plano';
            return;
          }
          selected.push(it.id);
        }
        localStorage.setItem('cb_selected', JSON.stringify(selected));
        updateSelected();
        renderCards(cat);
      };
      cards.appendChild(card);
    });
  }
  function updateSelected(){ selectedCount.textContent = selected.length; }
  renderTabs();
  renderCards(categories[0]);
  updateSelected();
  document.getElementById('main-credits').textContent='Desenvolvido por LoteamentoX • Suporte: appcorretorbrasil@gmail.com';
});
