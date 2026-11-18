const bag = [];
const bagCounts = document.querySelectorAll(".bag-count");
const bagButton = document.querySelector(".bag-button");
const drawer = document.querySelector(".bag-drawer");
const bagItems = document.querySelector(".bag-items");
const toast = document.querySelector(".toast");
let toastTimer;

function renderBag() {
  bagCounts.forEach((count) => (count.textContent = String(bag.length).padStart(2, "0")));
  bagItems.innerHTML = bag.length
    ? bag.map((item) => `<div class="bag-item"><span>${item.name}</span><span>EGP ${item.price.toLocaleString("en-EG")}</span></div>`).join("")
    : '<p class="bag-empty">Your bag is waiting for something good.</p>';
}

document.querySelectorAll(".quick-add").forEach((button) => {
  button.addEventListener("click", () => {
    bag.push({ name: button.dataset.name, price: Number(button.dataset.price) });
    renderBag();
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  });
});

function setBagOpen(open) {
  drawer.classList.toggle("open", open);
  document.querySelector(".bag-backdrop").classList.toggle("open", open);
  drawer.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("drawer-open", open);
}
bagButton.addEventListener("click", () => setBagOpen(!drawer.classList.contains("open")));
document.querySelector(".bag-close").addEventListener("click", () => setBagOpen(false));
document.querySelector(".bag-backdrop").addEventListener("click", () => setBagOpen(false));

const mobileNav = document.querySelector(".nav-left");
document.querySelector(".menu-button").addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});
mobileNav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => mobileNav.classList.remove("open")),
);

const searchLayer = document.querySelector(".search-layer");
const searchInput = document.querySelector("#search-input");
document.querySelector(".search-button").addEventListener("click", () => {
  searchLayer.classList.add("open");
  searchLayer.setAttribute("aria-hidden", "false");
  searchInput.focus();
});
function closeSearch() {
  searchLayer.classList.remove("open");
  searchLayer.setAttribute("aria-hidden", "true");
}
document.querySelector(".search-close").addEventListener("click", closeSearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && searchInput.value.trim()) {
    closeSearch();
    document.querySelector("#new-arrivals").scrollIntoView({ behavior: "smooth" });
    document.querySelectorAll(".product").forEach((product) => {
      product.hidden = !product.textContent.toLowerCase().includes(searchInput.value.trim().toLowerCase());
    });
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSearch();
    setBagOpen(false);
    mobileNav.classList.remove("open");
  }
});

document.querySelector(".signup").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector(".signup-message").textContent = "THANK YOU. YOU'RE ON THE LIST.";
  event.currentTarget.reset();
});

renderBag();
