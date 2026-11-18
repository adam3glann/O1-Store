const bag = [];
const count = document.querySelector('.bag-count');
const toast = document.querySelector('.cart-toast');
let toastTimer;

document.querySelectorAll('.quick-add').forEach(button => button.addEventListener('click', event => {
  event.preventDefault();
  event.stopPropagation();
  bag.push({ name: button.dataset.name, price: Number(button.dataset.price) });
  count.textContent = bag.length;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1900);
}));

const cards = [...document.querySelectorAll('.product-card')];
function filterProducts(category) {
  document.querySelectorAll('.filter').forEach(button => button.classList.toggle('active', button.dataset.filter === category));
  cards.forEach(card => card.hidden = category !== 'all' && card.dataset.category !== category);
  document.querySelector('.product-total').textContent = `${cards.filter(card => !card.hidden).length.toString().padStart(2, '0')} PIECES`;
}
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => filterProducts(button.dataset.filter)));
document.querySelectorAll('.main-nav [data-filter]').forEach(link => link.addEventListener('click', () => filterProducts(link.dataset.filter)));

const nav = document.querySelector('.main-nav');
document.querySelector('.menu-toggle').addEventListener('click', () => nav.classList.toggle('open'));
const searchPanel = document.querySelector('.search-panel');
document.querySelector('.search-toggle').addEventListener('click', () => {
  searchPanel.classList.add('open');
  document.querySelector('#search-input').focus();
});
document.querySelector('.search-close').addEventListener('click', () => searchPanel.classList.remove('open'));
document.addEventListener('keydown', event => { if (event.key === 'Escape') searchPanel.classList.remove('open'); });

document.querySelector('.signup').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('.signup-message').textContent = 'YOU’RE ON THE LIST. TALK SOON.';
  event.currentTarget.reset();
});
