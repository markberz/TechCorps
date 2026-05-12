const products = [
  {
    id: 1,
    name: "Nitro V 16 AI Gaming Laptop - ANV16-61-R9MV",
    category: "laptop",
    price: 79827,
    tag: "Popular",
    image: "Pictures%20Item/Nitro-Laptop.png",
    specs: {
      cpu: "AMD Ryzen™ 7 350 processor",
      gpu: "NVIDIA® GeForce RTX™ 5060",
      ram: "16 GB, DDR5 SDRAM",
      storage: "1TB SSD",
      os: "Windows 11 Home",
      display: "WUXGA (1920 x 1200)",
      battery: "10 hours",
    },
  },
  {
    id: 2,
    name: "Predator Triton 14 AI",
    category: "laptop",
    price: 159655,
    tag: "Gaming",
    image: "Pictures%20Item/Predator-Laptop.png",
    specs: {
      cpu: "Intel® Core™ Ultra 9 Series 2",
      gpu: "NVIDIA® GeForce RTX™ 5070",
      ram: "32 GB, LPDDR5X",
      storage: "2TB SSD",
      os: "Windows 11 Home",
      display: "14.5 inches WQXGA+",
    },
  },
  {
    id: 3,
    name: "ASUS TUF Gaming A16 (2025)",
    category: "laptop",
    price: 67546,
    tag: "Popular",
    image: "Pictures%20Item/Asus%20TUF%20Gaming.png",
    specs: {
      cpu: "AMD Ryzen™ 9 270",
      gpu: "NVIDIA® GeForce RTX™ ",
      ram: "16GB DDR5-5600 SO-DIMM",
      storage: "1TB PCIe® 4.0 NVMe™ M.2 SSD",
      os: "Windows 11 Home",
      display: "16-inch, FHD+ 16:10",
    },
  },
  {
    id: 4,
    name: "Aspire C24 All-in-One Desktop",
    category: "desktop",
    price: 33778,
    tag: "Best Value",
    image: "Pictures%20Item/Aspire-computer.png",
    specs: {
      cpu: "AMD Ryzen™ 5 7430U",
      gpu: "",
      ram: "8 GB, DDR4 SDRAM",
      storage: "512 GB SSD",
      os: "Windows 11 Home",
      display: "Full HD 1920 x 1080",
    },
  },
  {
    id: 5,
    name: "iMac",
    category: "desktop",
    price: 79779,
    tag: "Pro",
    image: "Pictures%20Item/Imac.png",
    specs: {
      cpu: "Apple M4 chip",
      gpu: "",
      ram: "16GB unified memory",
      storage: "256GB SSD",
      os: "macOS",
      display: "24-inch 4.5K Retina display",
    },
  },
  {
    id: 6,
    name: "Lenovo ThinkPad T480",
    category: "laptop",
    price: 15000,
    tag: "Popular",
    image: "Pictures%20Item/T480%20Lenovo.png",
    specs: {
      cpu: "Intel Core i5-8350U",
      gpu: "Intel UHD Graphics 620",
      ram: "16GB up to 32GB",
      storage: "512GB SSD",
      os: "Windows 11 Pro",
      display: "14.0”, Full HD (1920 x 1080), IPS",
      battery: "24Wh",
    },
  },
];

let cart = [];
let currentFilter = "all";

function renderProducts() {
  const grid = document.getElementById("product-grid");
  const filtered =
    currentFilter === "all"
      ? products
      : products.filter((p) => p.category === currentFilter);
  grid.innerHTML = filtered
    .map(
      (p) => `
    <div class="card-hover bg-slate-700 border-2 border-slate-600 rounded-2xl overflow-hidden cursor-pointer" onclick="showProductDetail(${p.id})">
      <div class="product-image h-44 flex items-center justify-center relative bg-gradient-to-br from-slate-600 to-slate-700">
        ${p.tag ? `<span class="absolute top-3 left-3 px-2 py-0.5 badge-gradient rounded text-[10px] font-bold text-white">${p.tag}</span>` : ""}
        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-contain p-4" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <i data-lucide="${p.category === "laptop" ? "laptop" : "monitor"}" class="w-16 h-16 text-slate-400 absolute" style="display:none;"></i>
      </div>
      <div class="p-5 space-y-3">
        <h3 class="font-bold text-primary">${p.name}</h3>
        <div class="flex items-center justify-between pt-2">
          <span class="text-lg font-bold text-primary mono">₱${p.price.toLocaleString()}</span>
          <button onclick="event.stopPropagation(); addToCart(${p.id})" class="px-4 py-2 bg-slate-600 border-2 border-cyan-500 rounded-lg text-xs font-bold text-cyan-300 hover:bg-cyan-500 hover:text-slate-900 transition">Add to Cart</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
  lucide.createIcons();
}

function addToCart(id) {
  const p = products.find((x) => x.id === id);
  const existing = cart.find((x) => x.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...p, qty: 1 });
  updateCart();
}

function updateCart() {
  const countElement = document.getElementById("cart-count");
  if (countElement)
    countElement.textContent = cart.reduce((s, i) => s + i.qty, 0);
  const items = document.getElementById("cart-items");
  const empty = document.getElementById("cart-empty");
  const footer = document.getElementById("cart-footer");
  if (cart.length === 0) {
    empty.classList.remove("hidden");
    footer.classList.add("hidden");
    items.innerHTML = "";
    return;
  }
  empty.classList.add("hidden");
  footer.classList.remove("hidden");
  items.innerHTML = cart
    .map(
      (i) => `
    <div class="flex items-center gap-4 p-3 bg-slate-600 rounded-xl border border-slate-500">
      <div class="w-12 h-12 product-image rounded-lg flex items-center justify-center"><i data-lucide="${i.category === "laptop" ? "laptop" : "monitor"}" class="w-5 h-5 text-cyan-400"></i></div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-bold text-primary truncate">${i.name}</p>
        <p class="mono text-xs text-secondary">₱${i.price.toLocaleString()} × ${i.qty}</p>
      </div>
      <button onclick="removeFromCart(${i.id})" class="p-1 hover:text-red-400 text-secondary transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
    </div>
  `,
    )
    .join("");
  document.getElementById("cart-total").textContent =
    "₱" + cart.reduce((s, i) => s + i.price * i.qty, 0).toLocaleString();
  lucide.createIcons();
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  updateCart();
}

function toggleCart() {
  const drawer = document.getElementById("cart-drawer");
  const panel = document.getElementById("cart-panel");
  const open = drawer.classList.contains("pointer-events-none");
  if (open) {
    drawer.classList.remove("pointer-events-none", "opacity-0");
    panel.classList.remove("translate-x-full");
  } else {
    drawer.classList.add("pointer-events-none", "opacity-0");
    panel.classList.add("translate-x-full");
  }
}

function toggleSearchModal() {
  const modal = document.getElementById("search-modal");
  const content = document.getElementById("search-content");
  const open = modal.classList.contains("pointer-events-none");
  if (open) {
    modal.classList.remove("pointer-events-none", "opacity-0");
    setTimeout(() => content.classList.remove("scale-95", "opacity-0"), 10);
    document.getElementById("search-input").focus();
  } else {
    content.classList.add("scale-95", "opacity-0");
    setTimeout(
      () => modal.classList.add("pointer-events-none", "opacity-0"),
      300,
    );
  }
}

function searchProducts(query) {
  const results = document.getElementById("search-results");
  const empty = document.getElementById("search-empty");
  if (!query.trim()) {
    results.innerHTML = "";
    empty.textContent = "Start typing to search...";
    empty.classList.remove("hidden");
    return;
  }
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      Object.values(p.specs).some(v => String(v).toLowerCase().includes(query.toLowerCase())),
  );
  if (filtered.length === 0) {
    results.innerHTML = "";
    empty.textContent = "No Item found";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");
  results.innerHTML = filtered
    .map(
      (p) => `
    <div class="flex items-center justify-between p-4 bg-slate-700 rounded-lg border border-slate-600 hover:border-cyan-500 cursor-pointer transition" onclick="toggleSearchModal(); showProductDetail(${p.id});">
      <div class="flex items-center gap-3 flex-1">
        <div class="w-12 h-12 bg-slate-600 rounded flex items-center justify-center overflow-hidden">
          <img src="${p.image}" alt="${p.name}" class="w-full h-full object-contain p-1" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <i data-lucide="${p.category === "laptop" ? "laptop" : "monitor"}" class="w-5 h-5 text-cyan-400" style="display:none;"></i>
        </div>
        <div>
          <p class="font-bold text-primary text-sm">${p.name}</p>
          <p class="text-xs text-secondary truncate max-w-[200px]">${p.specs.cpu}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-cyan-400 font-bold mono text-sm">₱${p.price.toLocaleString()}</span>
        <button onclick="event.stopPropagation(); toggleSearchModal(); addToCart(${p.id})" class="px-3 py-1.5 text-xs bg-cyan-500 text-slate-900 rounded font-bold hover:bg-cyan-400 transition">Add</button>
      </div>
    </div>
  `,
    )
    .join("");
  lucide.createIcons();
}

function setCategoryFilter(category) {
  currentFilter = category;
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    if (btn.dataset.filter === category) {
      btn.className =
        "filter-btn px-4 py-1.5 text-xs font-bold rounded-lg bg-cyan-500 text-slate-900 border-2 border-cyan-500";
    } else {
      btn.className =
        "filter-btn px-4 py-1.5 text-xs font-bold rounded-lg text-primary border-2 border-slate-600 hover:border-cyan-400 transition";
    }
  });
  renderProducts();
  window.location.hash = "products";
}

function showProductDetail(id) {
  const p = products.find((x) => x.id === id);
  if (!p) return;
  const modal = document.getElementById("detail-modal");
  const content = document.getElementById("detail-content");

  const img = document.getElementById("detail-image");
  const icon = document.getElementById("detail-fallback-icon");

  // Reset visibility for the next product
  img.style.display = "block";
  if (icon) {
    icon.style.display = "none";
    icon.setAttribute(
      "data-lucide",
      p.category === "laptop" ? "laptop" : "monitor",
    );
    lucide.createIcons();
  }

  img.src = p.image;
  document.getElementById("detail-name").textContent = p.name;
  document.getElementById("detail-price").textContent =
    "₱" + p.price.toLocaleString();
  const specsContainer = document.getElementById("specs-container");
  const specs = p.specs || {};
  specsContainer.innerHTML = Object.entries(specs)
    .map(
      ([key, value]) => `
    <div class="flex justify-between items-center py-2 border-b border-slate-600">
      <p class="text-slate-400 uppercase tracking-wider font-semibold text-xs">${key}</p>
      <p class="text-primary font-bold text-sm">${value}</p>
    </div>
  `,
    )
    .join("");
  document.getElementById("detail-add-btn").onclick = () => {
    addToCart(p.id);
    closeDetailModal();
  };
  modal.classList.remove("pointer-events-none", "opacity-0");
  content.classList.remove("scale-95", "opacity-0");
}

function closeDetailModal() {
  const modal = document.getElementById("detail-modal");
  const content = modal.querySelector("#detail-content");
  content.classList.add("scale-95", "opacity-0");
  setTimeout(
    () => modal.classList.add("pointer-events-none", "opacity-0"),
    300,
  );
}

const defaultConfig = {
  hero_title: 'Next-Gen<br><span class="text-gray-600">Computing</span> Power',
  hero_subtitle:
    "Premium laptops & desktops engineered for creators, gamers, and professionals.",
  store_name: "TechVault",
  background_color: "#ffffff",
  surface_color: "#f8f9fa",
  text_color: "#1f2937",
  primary_action_color: "#1f2937",
  secondary_action_color: "#6b7280",
  font_family: "Outfit",
  font_size: 16,
};

async function onConfigChange(config) {
  const c = { ...defaultConfig, ...config };
  const heroTitle = document.getElementById("hero-title");
  const heroSubtitle = document.getElementById("hero-subtitle");
  const navStoreName = document.getElementById("nav-store-name");
  const footerStoreName = document.getElementById("footer-store-name");
  if (heroTitle) heroTitle.innerHTML = c.hero_title;
  if (heroSubtitle) heroSubtitle.textContent = c.hero_subtitle;
  if (navStoreName) navStoreName.textContent = c.store_name;
  if (footerStoreName) footerStoreName.textContent = c.store_name;
  document.body.style.backgroundColor = c.background_color;
  document.body.style.color = c.text_color;
  document.body.style.fontFamily = c.font_family + ", sans-serif";
  if (heroTitle) heroTitle.style.fontSize = `${c.font_size * 3}px`;
  if (heroSubtitle) heroSubtitle.style.fontSize = `${c.font_size * 1.125}px`;
}

// Event Listeners & Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  lucide.createIcons();
  document
    .getElementById("search-input")
    .addEventListener("input", (e) => searchProducts(e.target.value));
  document.getElementById("cart-btn").addEventListener("click", toggleCart);
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => setCategoryFilter(btn.dataset.filter));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      toggleSearchModal();
      closeDetailModal();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      toggleSearchModal();
    }
  });
  if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange,
      mapToCapabilities: (config) => ({
        recolorables: [
          {
            get: () =>
              config.background_color || defaultConfig.background_color,
            set: (v) => {
              config.background_color = v;
              window.elementSdk.setConfig({ background_color: v });
            },
          },
          {
            get: () => config.surface_color || defaultConfig.surface_color,
            set: (v) => {
              config.surface_color = v;
              window.elementSdk.setConfig({ surface_color: v });
            },
          },
          {
            get: () => config.text_color || defaultConfig.text_color,
            set: (v) => {
              config.text_color = v;
              window.elementSdk.setConfig({ text_color: v });
            },
          },
          {
            get: () =>
              config.primary_action_color || defaultConfig.primary_action_color,
            set: (v) => {
              config.primary_action_color = v;
              window.elementSdk.setConfig({ primary_action_color: v });
            },
          },
          {
            get: () =>
              config.secondary_action_color ||
              defaultConfig.secondary_action_color,
            set: (v) => {
              config.secondary_action_color = v;
              window.elementSdk.setConfig({ secondary_action_color: v });
            },
          },
        ],
        borderables: [],
        fontEditable: {
          get: () => config.font_family || defaultConfig.font_family,
          set: (v) => {
            config.font_family = v;
            window.elementSdk.setConfig({ font_family: v });
          },
        },
        fontSizeable: {
          get: () => config.font_size || defaultConfig.font_size,
          set: (v) => {
            config.font_size = v;
            window.elementSdk.setConfig({ font_size: v });
          },
        },
      }),
      mapToEditPanelValues: (config) =>
        new Map([
          ["hero_title", config.hero_title || defaultConfig.hero_title],
          [
            "hero_subtitle",
            config.hero_subtitle || defaultConfig.hero_subtitle,
          ],
          ["store_name", config.store_name || defaultConfig.store_name],
        ]),
    });
  }
});
