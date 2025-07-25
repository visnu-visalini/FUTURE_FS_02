// Sample products
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1999,
    image: "https://via.placeholder.com/200x150.png?text=Headphones",
  },
  {
    id: 2,
    name: "Men's T-Shirt",
    price: 599,
    image: "https://via.placeholder.com/200x150.png?text=T-Shirt",
  },
  {
    id: 3,
    name: "Blender Mixer",
    price: 2599,
    image: "https://via.placeholder.com/200x150.png?text=Blender",
  },
  {
    id: 4,
    name: "Beauty Kit",
    price: 799,
    image: "https://via.placeholder.com/200x150.png?text=Beauty+Kit",
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleLogin() {
  const modal = document.getElementById("login-modal");
  modal.classList.toggle("hidden");
}

document.getElementById("login-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  document.getElementById("user-email").textContent = email;
  document.getElementById("user-icon").classList.add("hidden");
  document.getElementById("user-avatar").classList.remove("hidden");
  toggleLogin();
});

function renderProducts() {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = "";
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(productId) {
  const item = products.find((p) => p.id === productId);
  const existing = cart.find((c) => c.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${item.name} added to cart!`);
}

function renderCart() {
  const container = document.querySelector(".cart-items");
  const totalEl = document.getElementById("total-amount");
  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br />
        ₹${item.price} x ${item.quantity}
      </div>
      <div>
        <button onclick="changeQuantity(${index}, -1)">-</button>
        <button onclick="changeQuantity(${index}, 1)">+</button>
        <button onclick="removeItem(${index})">🗑️</button>
      </div>
    `;
    container.appendChild(div);
  });

  if (totalEl) totalEl.textContent = `Total: ₹${total}`;
}

function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

document.getElementById("checkout-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Order placed successfully!");
  cart = [];
  localStorage.removeItem("cart");
  window.location.href = "index.html";
});

// Initialize
window.onload = () => {
  renderProducts();
  renderCart();
};

productCard.innerHTML = `
  <img src="${product.image}" />
  <h4>${product.name}</h4>
  <p>₹${product.price}</p>
  <a href="product.html?id=${product.id}" class="btn">View</a>
  <button onclick="addToCart(${product.id})">Add to Cart</button>
`;
