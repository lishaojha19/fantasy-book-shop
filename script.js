const BOOKS = [
 {id:1,title:"The Dragonbone Throne",author:"Aldric Vane",price:18.5,genre:"Epic Fantasy",color:"#5B3A9E"},
 {id:2,title:"Whispers of the Ashwood",author:"Nyra Solweth",price:15,genre:"Dark Fantasy",color:"#3E2A5E"},
 {id:3,title:"The Last Starweaver",author:"Corin Hale",price:19.5,genre:"Epic Fantasy",color:"#5B3A9E"},
 {id:4,title:"Court of Thorned Crowns",author:"Ilse Marrow",price:17,genre:"Fae & Courts",color:"#7A2E56"},
 {id:5,title:"The Salt Witch's Bargain",author:"Nyra Solweth",price:16,genre:"Dark Fantasy",color:"#3E2A5E"},
 {id:6,title:"Song of the Nine Moons",author:"Corin Hale",price:20,genre:"Epic Fantasy",color:"#5B3A9E"},
 {id:7,title:"A Crown of Foxglove",author:"Ilse Marrow",price:15.5,genre:"Fae & Courts",color:"#7A2E56"},
 {id:8,title:"The Cartographer's Dragon",author:"Bram Ostley",price:14,genre:"Adventure",color:"#2E5C6E"},
 {id:9,title:"Ashes of the Sunken Keep",author:"Aldric Vane",price:18,genre:"Dark Fantasy",color:"#3E2A5E"},
 {id:10,title:"The Wayfinder's Oath",author:"Bram Ostley",price:16.5,genre:"Adventure",color:"#2E5C6E"},
 {id:11,title:"Queen of the Glass Forest",author:"Ilse Marrow",price:17.5,genre:"Fae & Courts",color:"#7A2E56"},
 {id:12,title:"The Iron Griffin's Vow",author:"Corin Hale",price:19,genre:"Epic Fantasy",color:"#5B3A9E"}
];

let cart = {};
try{ cart = JSON.parse(localStorage.getItem('fantasy_bookshop_cart')||'{}'); }catch(e){ cart = {}; }
let activeGenre = "All";
let query = "";

function saveCart(){ try{ localStorage.setItem('fantasy_bookshop_cart', JSON.stringify(cart)); }catch(e){} }

function renderFilters(){
  const genres = ["All", ...new Set(BOOKS.map(b=>b.genre))];
  document.getElementById('filters').innerHTML = genres.map(g=>
    `<button class="chip ${g===activeGenre?'active':''}" data-genre="${g}">${g}</button>`
  ).join('');
}

function renderGrid(){
  const q = query.trim().toLowerCase();
  const list = BOOKS.filter(b=>
    (activeGenre==="All"||b.genre===activeGenre) &&
    (b.title.toLowerCase().includes(q)||b.author.toLowerCase().includes(q))
  );
  const grid = document.getElementById('grid');
  if(!list.length){ grid.innerHTML = `<p class="empty">No books match — try a different search or filter.</p>`; return; }
  grid.innerHTML = list.map(b=>`
    <div class="card">
      <div class="cover" style="background:${b.color}"><span>${b.title}</span></div>
      <div class="card-body">
        <div class="card-title">${b.title}</div>
        <div class="card-author">${b.author}</div>
        <div class="card-footer">
          <span class="price">$${b.price.toFixed(2)}</span>
          <button class="add-btn" data-id="${b.id}">Add</button>
        </div>
      </div>
    </div>`).join('');
}

function cartTotalCount(){ return Object.values(cart).reduce((s,q)=>s+q,0); }
function cartTotalPrice(){ return Object.entries(cart).reduce((s,[id,q])=>s+BOOKS.find(b=>b.id==id).price*q,0); }

function renderCart(){
  document.getElementById('cartCount').textContent = cartTotalCount();
  const items = Object.entries(cart);
  const box = document.getElementById('drawerItems');
  if(!items.length){ box.innerHTML = `<p class="empty" style="padding:20px 0;">Your cart is empty.</p>`; }
  else{
    box.innerHTML = items.map(([id,q])=>{
      const b = BOOKS.find(x=>x.id==id);
      return `<div class="drawer-item">
        <div class="mini-cover" style="background:${b.color}"></div>
        <div class="di-info">
          <div class="di-title">${b.title}</div>
          <div class="di-price">$${b.price.toFixed(2)}</div>
          <div class="qty">
            <button data-act="dec" data-id="${id}">−</button>
            <span>${q}</span>
            <button data-act="inc" data-id="${id}">+</button>
            <button class="remove" data-act="rm" data-id="${id}">Remove</button>
          </div>
        </div>
      </div>`;
    }).join('');
  }
  document.getElementById('subtotal').textContent = `$${cartTotalPrice().toFixed(2)}`;
  document.getElementById('checkoutBtn').disabled = items.length===0;
}

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=>t.classList.remove('show'), 1600);
}

document.getElementById('filters').addEventListener('click', e=>{
  const btn = e.target.closest('.chip'); if(!btn) return;
  activeGenre = btn.dataset.genre; renderFilters(); renderGrid();
});
document.getElementById('searchInput').addEventListener('input', e=>{ query = e.target.value; renderGrid(); });
document.getElementById('grid').addEventListener('click', e=>{
  const btn = e.target.closest('.add-btn'); if(!btn) return;
  const id = btn.dataset.id;
  cart[id] = (cart[id]||0)+1; saveCart(); renderCart();
  showToast('Added to cart');
});
document.getElementById('drawerItems').addEventListener('click', e=>{
  const btn = e.target.closest('button'); if(!btn) return;
  const id = btn.dataset.id, act = btn.dataset.act;
  if(act==='inc') cart[id]++;
  if(act==='dec'){ cart[id]--; if(cart[id]<=0) delete cart[id]; }
  if(act==='rm') delete cart[id];
  saveCart(); renderCart();
});
function openDrawer(){ document.getElementById('drawer').classList.add('open'); document.getElementById('overlay').classList.add('open'); }
function closeDrawer(){ document.getElementById('drawer').classList.remove('open'); document.getElementById('overlay').classList.remove('open'); }
document.getElementById('cartBtn').addEventListener('click', openDrawer);
document.getElementById('closeDrawer').addEventListener('click', closeDrawer);
document.getElementById('overlay').addEventListener('click', closeDrawer);
document.getElementById('checkoutBtn').addEventListener('click', ()=>{
  showToast('Order placed — thank you!');
  cart = {}; saveCart(); renderCart(); closeDrawer();
});

renderFilters(); renderGrid(); renderCart();