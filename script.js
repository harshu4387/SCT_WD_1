// Harshu Plants & Flowers - front-end e-commerce demo.
// Internship Task 1: fixed navbar is styled in CSS, hover effects are in CSS,
// and the navbar changes appearance after scrolling. Mobile navigation is supported.
const navbar=document.getElementById('navbar');
const menuToggle=document.getElementById('menuToggle');
const navLinks=document.getElementById('navLinks');
const navItems=document.querySelectorAll('.nav-link');
const productGrid=document.getElementById('productGrid');
const searchInput=document.getElementById('searchInput');
const categoryFilter=document.getElementById('categoryFilter');
const cartDrawer=document.getElementById('cartDrawer');
const overlay=document.getElementById('overlay');
const cart=new Map();
const fallbackImage='https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=85';
const products=[
{id:1,name:'Peace Lily Plant',category:'Indoor Plants',price:499,tag:'Easy care',image:'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=85'},
{id:2,name:'Snake Plant',category:'Indoor Plants',price:399,tag:'Bestseller',image:'https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=700&q=85'},
{id:3,name:'Monstera Plant',category:'Indoor Plants',price:799,tag:'Trending',image:'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=85'},
{id:4,name:'Pink Rose Plant',category:'Flowering Plants',price:349,tag:'Lovely blooms',image:'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=85'},
{id:5,name:'Marigold Plant',category:'Flowering Plants',price:199,tag:'Garden favourite',image:'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=700&q=85'},
{id:6,name:'Jasmine Plant',category:'Flowering Plants',price:249,tag:'Fragrant',image:'https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=700&q=85'},
{id:7,name:'Fresh Rose Bouquet',category:'Flowers & Bouquets',price:699,tag:'Gift favourite',image:'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=700&q=85'},
{id:8,name:'Mixed Seasonal Bouquet',category:'Flowers & Bouquets',price:899,tag:'Colourful',image:'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=700&q=85'},
{id:9,name:'Sunflower Bunch',category:'Flowers & Bouquets',price:599,tag:'Bright & happy',image:'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=700&q=85'},
{id:10,name:'Outdoor Areca Palm',category:'Outdoor Plants',price:649,tag:'Green corner',image:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=85'},
{id:11,name:'Garden Hibiscus',category:'Outdoor Plants',price:299,tag:'Sunny garden',image:'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=700&q=85'},
{id:12,name:'Garden Soil Mix',category:'Seeds & Gardening',price:149,tag:'Garden essential',image:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=700&q=85'},
{id:13,name:'Flower Seed Pack',category:'Seeds & Gardening',price:99,tag:'Grow from seed',image:'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=700&q=85'},
{id:14,name:'Decorative Plant Pot',category:'Seeds & Gardening',price:229,tag:'Cute pot',image:'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=85'},
{id:15,name:'Lucky Bamboo',category:'Indoor Plants',price:299,tag:'Good vibes',image:'https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=700&q=85'},
{id:16,name:'Purple Orchid Plant',category:'Flowering Plants',price:749,tag:'Special pick',image:'https://images.unsplash.com/photo-1566907225472-514a4e4b7c28?auto=format&fit=crop&w=700&q=85'}
];
const money=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);

// Task 1: fixed navbar changes style on scroll.
function updateNavbar(){navbar.classList.toggle('scrolled',window.scrollY>30)}
window.addEventListener('scroll',updateNavbar,{passive:true});updateNavbar();
menuToggle.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuToggle.textContent=open?'✕':'☰';menuToggle.setAttribute('aria-expanded',String(open))});
navItems.forEach(a=>a.addEventListener('click',()=>{navItems.forEach(x=>x.classList.remove('active'));a.classList.add('active');navLinks.classList.remove('open');menuToggle.textContent='☰';menuToggle.setAttribute('aria-expanded','false')}));
document.querySelectorAll('[data-category-link]').forEach(link=>link.addEventListener('click',()=>{categoryFilter.value=link.dataset.categoryLink==='Bouquets'?'Flowers & Bouquets':link.dataset.categoryLink;renderProducts()}));

function renderProducts(){
 const term=searchInput.value.trim().toLowerCase(),category=categoryFilter.value;
 const list=products.filter(p=>(p.name.toLowerCase().includes(term)||p.category.toLowerCase().includes(term))&&(category==='all'||p.category===category));
 productGrid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage}'"><span class="product-tag">${p.tag}</span></div><div class="product-info"><p class="product-category">${p.category}</p><h3>${p.name}</h3><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-button" data-add="${p.id}">+ Add to cart</button></div></div></article>`).join('');
 document.getElementById('emptyMessage').hidden=list.length>0;
}
searchInput.addEventListener('input',renderProducts);categoryFilter.addEventListener('change',renderProducts);
productGrid.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(!b)return;const p=products.find(x=>x.id===Number(b.dataset.add));const old=cart.get(p.id);cart.set(p.id,{...p,quantity:old?old.quantity+1:1});renderCart();showToast(p.name+' added to your cart')});
function renderCart(){
 const items=[...cart.values()],count=items.reduce((s,p)=>s+p.quantity,0),total=items.reduce((s,p)=>s+p.quantity*p.price,0);
 document.getElementById('cartCount').textContent=count;document.getElementById('cartTotal').textContent=money(total);document.getElementById('cartEmpty').hidden=items.length>0;
 document.getElementById('cartItems').innerHTML=items.map(p=>`<div class="cart-item"><img src="${p.image}" alt="${p.name}" onerror="this.onerror=null;this.src='${fallbackImage}'"><div><h3>${p.name}</h3><p class="item-price">${money(p.price)} each</p><div class="quantity-control"><button data-change="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${p.quantity}</span><button data-change="${p.id}" data-delta="1" aria-label="Increase quantity">+</button></div><button class="remove-item" data-remove="${p.id}">Remove</button></div><strong>${money(p.price*p.quantity)}</strong></div>`).join('');
}
document.getElementById('cartItems').addEventListener('click',e=>{const q=e.target.closest('[data-change]'),r=e.target.closest('[data-remove]');if(q){const id=Number(q.dataset.change),p=cart.get(id);p.quantity+=Number(q.dataset.delta);if(p.quantity<1)cart.delete(id);else cart.set(id,p);renderCart()}if(r){cart.delete(Number(r.dataset.remove));renderCart()}});
function openCart(){cartDrawer.classList.add('open');cartDrawer.setAttribute('aria-hidden','false');overlay.hidden=false;document.body.style.overflow='hidden'}
function closeCart(){cartDrawer.classList.remove('open');cartDrawer.setAttribute('aria-hidden','true');overlay.hidden=true;document.body.style.overflow=''}
document.getElementById('cartButton').addEventListener('click',openCart);document.getElementById('closeCart').addEventListener('click',closeCart);overlay.addEventListener('click',closeCart);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCart()});
function showToast(message){const t=document.getElementById('toast');t.textContent=message;t.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove('show'),2200)}
document.getElementById('checkoutButton').addEventListener('click',()=>{document.getElementById('checkoutNotice').textContent=cart.size?'Demo checkout only — no payment or real order was created.':'Your cart is empty. Add a plant or flower first.'});
document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();document.getElementById('contactNotice').textContent='Thank you! This demo form works locally but does not send data to a server.';e.target.reset()});
document.getElementById('year').textContent=new Date().getFullYear();renderProducts();renderCart();
