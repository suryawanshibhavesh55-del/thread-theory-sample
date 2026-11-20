// THREAD THEORY by Khushboo - Main Application Logic

// Application State
const AppState = {
  cart: [],
  wishlist: new Set(),
  currency: 'INR',
  activeTab: 'new-in',
  shopFilter: 'all',
  shopSort: 'featured',
  currentView: 'home', // 'home' or 'shop'
  heroSlideIndex: 0,
  heroAutoPlay: true,
  announcementIndex: 0
};

// Announcement Texts for Section A
const ANNOUNCEMENTS = [
  "COMPLIMENTARY DELIVERY ON ORDERS OVER ₹5,000",
  "DISCOVER THE NEW COLLECTION — EFFORTLESS STYLE, TIMELESS ELEGANCE",
  "HAND-WORKED EMBROIDERY & BESPOKE SILHOUETTES CUT IN OUR MUMBAI ATELIER"
];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  loadSavedState();
  initAnnouncementBar();
  initHeaderScroll();
  initHeroSlider();
  renderCollectionProducts();
  renderCategoryGrid();
  renderBestSellers();
  updateBadgeCounts();
  setupEventListeners();
});

// --------------------------------------------------------------------------
// State Persistence (LocalStorage)
// --------------------------------------------------------------------------
function loadSavedState() {
  try {
    const savedCart = localStorage.getItem('tt_cart');
    if (savedCart) {
      AppState.cart = JSON.parse(savedCart);
    }
    const savedWishlist = localStorage.getItem('tt_wishlist');
    if (savedWishlist) {
      AppState.wishlist = new Set(JSON.parse(savedWishlist));
    }
    const savedCurrency = localStorage.getItem('tt_currency');
    if (savedCurrency && CURRENCIES[savedCurrency]) {
      AppState.currency = savedCurrency;
      const currencySelect = document.getElementById('currencySelector');
      if (currencySelect) currencySelect.value = savedCurrency;
    }
  } catch (e) {
    console.error("Could not load local storage", e);
  }
}

function saveCartState() {
  localStorage.setItem('tt_cart', JSON.stringify(AppState.cart));
  updateBadgeCounts();
}

function saveWishlistState() {
  localStorage.setItem('tt_wishlist', JSON.stringify([...AppState.wishlist]));
  updateBadgeCounts();
}

// --------------------------------------------------------------------------
// Currency Formatting & Conversion
// --------------------------------------------------------------------------
function formatPrice(amountInINR) {
  const curr = CURRENCIES[AppState.currency] || CURRENCIES.INR;
  const converted = amountInINR * curr.rate;
  if (AppState.currency === 'INR') {
    return `${curr.symbol}${converted.toLocaleString('en-IN')}`;
  } else {
    return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
  }
}

function handleCurrencyChange(newCurrency) {
  if (CURRENCIES[newCurrency]) {
    AppState.currency = newCurrency;
    localStorage.setItem('tt_currency', newCurrency);
    // Re-render UI elements that show prices
    renderCollectionProducts();
    renderBestSellers();
    renderCartDrawer();
    if (AppState.currentView === 'shop') {
      renderShopCatalog();
    }
    showToast(`Currency updated to ${newCurrency}`);
  }
}

// --------------------------------------------------------------------------
// Announcement Bar (Section A)
// --------------------------------------------------------------------------
function initAnnouncementBar() {
  const textEl = document.getElementById('announcementText');
  if (!textEl) return;

  function updateAnnouncement() {
    textEl.style.opacity = '0';
    setTimeout(() => {
      textEl.textContent = ANNOUNCEMENTS[AppState.announcementIndex];
      textEl.style.opacity = '1';
    }, 250);
  }

  window.prevAnnouncement = function() {
    AppState.announcementIndex = (AppState.announcementIndex - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length;
    updateAnnouncement();
  };

  window.nextAnnouncement = function() {
    AppState.announcementIndex = (AppState.announcementIndex + 1) % ANNOUNCEMENTS.length;
    updateAnnouncement();
  };

  setInterval(() => {
    window.nextAnnouncement();
  }, 5000);
}

// --------------------------------------------------------------------------
// Sticky Header Scroll Effect
// --------------------------------------------------------------------------
function initHeaderScroll() {
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// --------------------------------------------------------------------------
// Hero Banner Slider (Section D) - Automatic 3-Second Infinite Carousel
// --------------------------------------------------------------------------
function initHeroSlider() {
  const track = document.getElementById('heroTrack');
  const dots = document.querySelectorAll('.hero-dot');
  const pauseBtn = document.getElementById('heroPauseBtn');
  const sliderContainer = document.getElementById('heroSliderContainer');

  if (!track || dots.length === 0) return;

  const SLIDE_INTERVAL = 3000; // 3 seconds per requirement
  const TOTAL_UNIQUE_SLIDES = 2; // Slide 0 and Slide 1
  let currentIndex = 0; // 0, 1, or 2 (clone of 0)
  let slideTimer = null;
  let isPaused = false;
  let isTransitioning = false;

  // Move track to specified index
  function updateSlidePosition(withTransition = true) {
    if (withTransition) {
      track.classList.remove('no-transition');
      isTransitioning = true;
    } else {
      track.classList.add('no-transition');
      isTransitioning = false;
    }

    // Each slide is 33.333333% of the 300% width track (100% of the viewport)
    const percentage = currentIndex * 33.333333;
    track.style.transform = `translateX(-${percentage}%)`;

    // Active dot logic: index 0 and index 2 (clone) both highlight Dot 0
    const activeDotIndex = currentIndex % TOTAL_UNIQUE_SLIDES;
    dots.forEach((dot, idx) => {
      const isActive = idx === activeDotIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  // Seamless jump reset when reaching the clone slide
  track.addEventListener('transitionend', (e) => {
    // Only respond to transform transitions on the track itself
    if (e.target !== track || e.propertyName !== 'transform') return;
    isTransitioning = false;

    // If we just slid to index 2 (clone of slide 0), silently reset back to index 0
    if (currentIndex === TOTAL_UNIQUE_SLIDES) {
      currentIndex = 0;
      updateSlidePosition(false); // No transition, instant swap
    }
  });

  // Next Slide function (always right-to-left forward motion)
  function nextSlide() {
    if (isTransitioning) return;
    currentIndex++;
    updateSlidePosition(true);
  }

  // Previous Slide function
  function prevSlide() {
    if (isTransitioning) return;
    if (currentIndex === 0) {
      // Jump silently to clone, then slide back to 1
      currentIndex = TOTAL_UNIQUE_SLIDES;
      updateSlidePosition(false);
      // Force DOM reflow so transition works
      void track.offsetWidth;
      currentIndex = TOTAL_UNIQUE_SLIDES - 1;
      updateSlidePosition(true);
    } else {
      currentIndex--;
      updateSlidePosition(true);
    }
  }

  // Start automatic timer
  function startAutoSlide() {
    stopAutoSlide();
    if (!isPaused) {
      slideTimer = setInterval(() => {
        nextSlide();
      }, SLIDE_INTERVAL);
    }
  }

  // Stop automatic timer
  function stopAutoSlide() {
    if (slideTimer) {
      clearInterval(slideTimer);
      slideTimer = null;
    }
  }

  // Reset timer on manual user interaction
  function resetTimer() {
    startAutoSlide();
  }

  // Manual dot navigation
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIndex = parseInt(dot.getAttribute('data-slide'), 10);
      if (isNaN(targetIndex) || isTransitioning) return;

      currentIndex = targetIndex;
      updateSlidePosition(true);
      resetTimer();
    });
  });

  // Pause / Resume toggle button
  if (pauseBtn) {
    pauseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      isPaused = !isPaused;

      if (isPaused) {
        stopAutoSlide();
        pauseBtn.innerHTML = '&#9654;'; // Play triangle symbol
        pauseBtn.setAttribute('aria-label', 'Resume automatic slideshow');
        pauseBtn.setAttribute('title', 'Play');
      } else {
        pauseBtn.innerHTML = '&#10074;&#10074;'; // Pause double bar symbol
        pauseBtn.setAttribute('aria-label', 'Pause automatic slideshow');
        pauseBtn.setAttribute('title', 'Pause');
        startAutoSlide();
      }
    });
  }

  // Touch Swipe Support for mobile devices
  let touchStartX = 0;
  let touchEndX = 0;

  if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchStartX - touchEndX;

      // Detect horizontal swipe with minimum threshold of 45px
      if (Math.abs(diffX) > 45) {
        if (diffX > 0) {
          // Swiped left -> advance slide
          nextSlide();
        } else {
          // Swiped right -> previous slide
          prevSlide();
        }
        resetTimer();
      }
    }, { passive: true });
  }

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    // If reduced motion is requested, stop auto sliding
    isPaused = true;
    if (pauseBtn) {
      pauseBtn.innerHTML = '&#9654;';
      pauseBtn.setAttribute('aria-label', 'Resume automatic slideshow');
    }
  } else {
    // Start automatic sliding
    startAutoSlide();
  }
}

// --------------------------------------------------------------------------
// Render Collection Tabs & Products (Section F)
// --------------------------------------------------------------------------
function setCollectionTab(tabName) {
  AppState.activeTab = tabName;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  renderCollectionProducts();
}

function renderCollectionProducts() {
  const container = document.getElementById('collectionProductsGrid');
  if (!container) return;

  // Filter products by collection tab
  let filtered = PRODUCTS_DATA.filter(p => p.collection.includes(AppState.activeTab));
  if (filtered.length === 0) filtered = PRODUCTS_DATA.slice(0, 8);

  container.innerHTML = filtered.map(product => createProductCardHTML(product)).join('');
}

function createProductCardHTML(product) {
  const isWishlisted = AppState.wishlist.has(product.id);
  const priceFormatted = formatPrice(product.price);
  const originalPriceFormatted = product.originalPrice ? formatPrice(product.originalPrice) : null;
  const badgeHTML = product.badge ? `<span class="product-badge ${product.badge.toLowerCase()}">${product.badge}</span>` : '';

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image-container" onclick="openProductModal('${product.id}')">
        ${badgeHTML}
        <button class="card-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                onclick="event.stopPropagation(); toggleWishlist('${product.id}')" 
                title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}"
                aria-label="Wishlist">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="${isWishlisted ? '#C0392B' : 'none'}" stroke="currentColor" stroke-width="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
        <div class="quick-add-overlay" onclick="event.stopPropagation()">
          ${product.sizes.map(size => `
            <button class="quick-size-btn" onclick="quickAddToCart('${product.id}', '${size}')">${size}</button>
          `).join('')}
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-name" onclick="openProductModal('${product.id}')">${product.name}</h3>
        <div class="product-pricing">
          <span class="product-current-price">${priceFormatted}</span>
          ${originalPriceFormatted ? `<span class="product-original-price">${originalPriceFormatted}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Render Categories Grid (Section G)
// --------------------------------------------------------------------------
function renderCategoryGrid() {
  const container = document.getElementById('categoryGrid');
  if (!container) return;

  container.innerHTML = CATEGORIES_DATA.map(cat => `
    <div class="category-card" onclick="filterByCategory('${cat.slug}')">
      <div class="category-image-wrap">
        <img src="${cat.image}" alt="${cat.name}" class="category-img" loading="lazy">
      </div>
      <div class="category-bar">
        <span class="category-name">${cat.name}</span>
        <span class="category-arrow">→</span>
      </div>
    </div>
  `).join('');
}

// --------------------------------------------------------------------------
// Render Best Sellers (Section I)
// --------------------------------------------------------------------------
function renderBestSellers() {
  const container = document.getElementById('bestSellersGrid');
  if (!container) return;

  const bestSellers = PRODUCTS_DATA.filter(p => p.isBestSeller).slice(0, 4);
  container.innerHTML = bestSellers.map(product => createProductCardHTML(product)).join('');
}

// --------------------------------------------------------------------------
// Shop View / Navigation
// --------------------------------------------------------------------------
function navigateTo(view, categorySlug = 'all') {
  AppState.currentView = view;
  const homeView = document.getElementById('homeView');
  const shopView = document.getElementById('shopView');

  if (view === 'shop') {
    homeView.style.display = 'none';
    shopView.classList.add('active');
    AppState.shopFilter = categorySlug;
    renderShopCatalog();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    shopView.classList.remove('active');
    homeView.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  const activeLink = document.querySelector(`.nav-link[data-view="${view}"]`);
  if (activeLink) activeLink.classList.add('active');

  closeMobileMenu();
}

function filterByCategory(categorySlug) {
  navigateTo('shop', categorySlug);
}

function renderShopCatalog() {
  const container = document.getElementById('shopProductsGrid');
  const countEl = document.getElementById('shopProductCount');
  const pills = document.querySelectorAll('.category-pill');

  pills.forEach(pill => {
    pill.classList.toggle('active', pill.dataset.slug === AppState.shopFilter);
  });

  let list = [...PRODUCTS_DATA];

  // Category filter
  if (AppState.shopFilter !== 'all') {
    list = list.filter(p => p.categorySlug === AppState.shopFilter);
  }

  // Search filter if any
  if (AppState.searchQuery) {
    const q = AppState.searchQuery.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.fabric.toLowerCase().includes(q) || p.color.toLowerCase().includes(q));
  }

  // Sorting
  if (AppState.shopSort === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (AppState.shopSort === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (AppState.shopSort === 'newest') {
    list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  if (countEl) countEl.textContent = `${list.length} Designs`;
  container.innerHTML = list.map(product => createProductCardHTML(product)).join('');
}

function setShopFilter(slug) {
  AppState.shopFilter = slug;
  renderShopCatalog();
}

function handleShopSort(sortType) {
  AppState.shopSort = sortType;
  renderShopCatalog();
}

// --------------------------------------------------------------------------
// Product Detail Modal (PDP)
// --------------------------------------------------------------------------
let activeProductModal = null;
let selectedModalSize = 'M';

function openProductModal(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  activeProductModal = product;
  selectedModalSize = product.sizes[0] || 'M';

  const modal = document.getElementById('productModal');
  const content = document.getElementById('productModalContent');

  const isWishlisted = AppState.wishlist.has(product.id);
  const priceFormatted = formatPrice(product.price);
  const originalPriceFormatted = product.originalPrice ? formatPrice(product.originalPrice) : null;

  content.innerHTML = `
    <div class="pdp-grid">
      <div class="pdp-gallery">
        <div class="pdp-main-image-wrap">
          <img src="${product.image}" alt="${product.name}" id="pdpMainImg" class="pdp-main-image">
        </div>
        <div class="pdp-thumbnails-row">
          ${product.gallery.map((img, i) => `
            <img src="${img}" alt="${product.name}" class="pdp-thumb ${i === 0 ? 'active' : ''}" 
                 onclick="switchModalImage('${img}', this)">
          `).join('')}
        </div>
      </div>
      <div class="pdp-details-col">
        <span class="pdp-tag">${product.craft}</span>
        <h1 class="pdp-title">${product.name}</h1>
        <div class="pdp-price-row">
          <span class="pdp-price">${priceFormatted}</span>
          ${originalPriceFormatted ? `<span class="product-original-price">${originalPriceFormatted}</span>` : ''}
          <span class="pdp-tax-inclusive">Inclusive of all taxes</span>
        </div>
        <p class="atelier-paragraph" style="margin-bottom: 1.2rem;">${product.description}</p>
        
        <div class="pdp-divider"></div>

        <div class="pdp-size-header">
          <span>SELECT SIZE</span>
          <span class="size-guide-trigger" onclick="openSizeGuide()">Size Guide</span>
        </div>
        <div class="pdp-sizes-list">
          ${product.sizes.map(size => `
            <button class="pdp-size-btn ${size === selectedModalSize ? 'active' : ''}" 
                    onclick="selectModalSize('${size}', this)">${size}</button>
          `).join('')}
        </div>

        <div class="pdp-actions-row">
          <button class="pdp-add-cart-btn" onclick="addToCartFromModal()">ADD TO SHOPPING BAG</button>
          <button class="pdp-wishlist-toggle ${isWishlisted ? 'active' : ''}" 
                  onclick="toggleWishlist('${product.id}')" 
                  title="Save to Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="${isWishlisted ? '#C0392B' : 'none'}" stroke="currentColor" stroke-width="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        <div class="pdp-accordions">
          <div class="accordion-item open">
            <button class="accordion-trigger" onclick="toggleAccordion(this)">
              <span>Product Specifications</span>
              <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content">
              <p><strong>Fabric:</strong> ${product.fabric}</p>
              <p><strong>Craft:</strong> ${product.craft}</p>
              <p><strong>Color:</strong> ${product.color}</p>
              <ul style="margin-top: 8px; list-style: disc; padding-left: 20px;">
                ${product.details.map(d => `<li>${d}</li>`).join('')}
              </ul>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-trigger" onclick="toggleAccordion(this)">
              <span>Complimentary Atelier Shipping</span>
              <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content">
              <p>All pieces are cut and hand-tailored in our Mumbai atelier. Ready-to-wear orders dispatch in 24-48 hours. Made-to-measure orders dispatch within 7-10 business days.</p>
              <p style="margin-top: 6px;">We offer complimentary insured express shipping across India on orders over ₹5,000.</p>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-trigger" onclick="toggleAccordion(this)">
              <span>Boutique Exchange Policy</span>
              <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content">
              <p>We accept size exchanges within 7 days of delivery in pristine, unworn condition with all original tags attached.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function switchModalImage(src, thumbEl) {
  const mainImg = document.getElementById('pdpMainImg');
  if (mainImg) mainImg.src = src;
  document.querySelectorAll('.pdp-thumb').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');
}

function selectModalSize(size, btnEl) {
  selectedModalSize = size;
  document.querySelectorAll('.pdp-size-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');
}

function toggleAccordion(btn) {
  const item = btn.closest('.accordion-item');
  item.classList.toggle('open');
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function addToCartFromModal() {
  if (!activeProductModal) return;
  addToCart(activeProductModal.id, selectedModalSize, 1);
  closeProductModal();
  openCartDrawer();
}

// --------------------------------------------------------------------------
// Shopping Cart Drawer & Logic
// --------------------------------------------------------------------------
function quickAddToCart(productId, size) {
  addToCart(productId, size, 1);
  openCartDrawer();
}

function addToCart(productId, size = 'M', qty = 1) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = AppState.cart.findIndex(item => item.productId === productId && item.size === size);
  if (existingIndex > -1) {
    AppState.cart[existingIndex].qty += qty;
  } else {
    AppState.cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      qty: qty
    });
  }

  saveCartState();
  renderCartDrawer();
  showToast(`Added ${product.name} (${size}) to your bag`);
}

function updateCartQty(productId, size, delta) {
  const item = AppState.cart.find(i => i.productId === productId && i.size === size);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    AppState.cart = AppState.cart.filter(i => !(i.productId === productId && i.size === size));
  }

  saveCartState();
  renderCartDrawer();
}

function removeFromCart(productId, size) {
  AppState.cart = AppState.cart.filter(i => !(i.productId === productId && i.size === size));
  saveCartState();
  renderCartDrawer();
  showToast("Item removed from bag");
}

function renderCartDrawer() {
  const body = document.getElementById('cartDrawerBody');
  const subtotalEl = document.getElementById('cartSubtotalAmount');
  const fillBar = document.getElementById('shippingProgressFill');
  const shippingText = document.getElementById('shippingProgressText');

  if (!body) return;

  if (AppState.cart.length === 0) {
    body.innerHTML = `
      <div class="empty-cart-message">
        <div class="empty-cart-icon">👜</div>
        <p style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--color-chocolate); margin-bottom: 0.5rem;">Your shopping bag is empty</p>
        <p style="font-size: 0.8rem; margin-bottom: 1.5rem;">Explore our curated edits and find your next timeless piece.</p>
        <button class="editorial-banner-btn" onclick="closeCartDrawer(); navigateTo('shop')">EXPLORE THE COLLECTION</button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatPrice(0);
    if (fillBar) fillBar.style.width = '0%';
    if (shippingText) shippingText.textContent = "Complimentary delivery on orders over ₹5,000";
    return;
  }

  let subtotal = 0;
  body.innerHTML = AppState.cart.map(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">Size: ${item.size}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          <div class="qty-control">
            <button class="qty-btn" onclick="updateCartQty('${item.productId}', '${item.size}', -1)">-</button>
            <span class="qty-count">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.productId}', '${item.size}', 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove-btn" onclick="removeFromCart('${item.productId}', '${item.size}')" title="Remove">✕</button>
      </div>
    `;
  }).join('');

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);

  // Free shipping progress (Threshold: ₹5,000)
  const freeThreshold = 5000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
  if (fillBar) fillBar.style.width = `${progressPercent}%`;

  if (shippingText) {
    if (subtotal >= freeThreshold) {
      shippingText.innerHTML = "✨ <strong>Congratulations!</strong> You qualify for Complimentary Delivery";
    } else {
      const remaining = freeThreshold - subtotal;
      shippingText.innerHTML = `Add <strong>${formatPrice(remaining)}</strong> more to unlock Complimentary Delivery`;
    }
  }
}

function openCartDrawer() {
  renderCartDrawer();
  document.getElementById('cartDrawer').classList.add('active');
  document.getElementById('drawerBackdrop').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  document.getElementById('cartDrawer').classList.remove('active');
  document.getElementById('drawerBackdrop').classList.remove('active');
  document.body.style.overflow = '';
}

// --------------------------------------------------------------------------
// Wishlist Logic & Drawer
// --------------------------------------------------------------------------
function toggleWishlist(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  if (AppState.wishlist.has(productId)) {
    AppState.wishlist.delete(productId);
    showToast(`Removed from Wishlist`);
  } else {
    AppState.wishlist.add(productId);
    showToast(`Saved to Wishlist`);
  }

  saveWishlistState();
  renderCollectionProducts();
  renderBestSellers();
  if (AppState.currentView === 'shop') renderShopCatalog();
}

function openWishlistDrawer() {
  const container = document.getElementById('wishlistItemsContainer');
  const wishlistArray = [...AppState.wishlist].map(id => PRODUCTS_DATA.find(p => p.id === id)).filter(Boolean);

  if (wishlistArray.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-message">
        <div class="empty-cart-icon">🤍</div>
        <p style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--color-chocolate); margin-bottom: 0.5rem;">Your wishlist is empty</p>
        <p style="font-size: 0.8rem; margin-bottom: 1.5rem;">Save your favorite silhouettes for later review.</p>
        <button class="editorial-banner-btn" onclick="closeWishlistDrawer(); navigateTo('shop')">EXPLORE STYLES</button>
      </div>
    `;
  } else {
    container.innerHTML = wishlistArray.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onclick="closeWishlistDrawer(); openProductModal('${item.id}')">
        <div class="cart-item-details">
          <div class="cart-item-name" onclick="closeWishlistDrawer(); openProductModal('${item.id}')">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          <button class="editorial-banner-btn" style="padding: 4px 10px; font-size: 0.68rem; margin-top: 6px;" 
                  onclick="quickAddToCart('${item.id}', '${item.sizes[0]}')">ADD TO BAG</button>
        </div>
        <button class="cart-item-remove-btn" onclick="toggleWishlist('${item.id}'); openWishlistDrawer();" title="Remove">✕</button>
      </div>
    `).join('');
  }

  document.getElementById('wishlistDrawer').classList.add('active');
  document.getElementById('drawerBackdrop').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeWishlistDrawer() {
  document.getElementById('wishlistDrawer').classList.remove('active');
  document.getElementById('drawerBackdrop').classList.remove('active');
  document.body.style.overflow = '';
}

// --------------------------------------------------------------------------
// Badge Counters in Header
// --------------------------------------------------------------------------
function updateBadgeCounts() {
  const cartTotalQty = AppState.cart.reduce((sum, item) => sum + item.qty, 0);
  const cartBadge = document.getElementById('cartBadgeCount');
  if (cartBadge) {
    cartBadge.textContent = cartTotalQty;
    cartBadge.style.display = cartTotalQty > 0 ? 'flex' : 'none';
  }

  const wishlistCount = AppState.wishlist.size;
  const wishlistBadge = document.getElementById('wishlistBadgeCount');
  if (wishlistBadge) {
    wishlistBadge.textContent = wishlistCount;
    wishlistBadge.style.display = wishlistCount > 0 ? 'flex' : 'none';
  }
}

// --------------------------------------------------------------------------
// Size Guide Modal
// --------------------------------------------------------------------------
function openSizeGuide() {
  document.getElementById('sizeGuideModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSizeGuide() {
  document.getElementById('sizeGuideModal').classList.remove('active');
  if (!document.getElementById('productModal').classList.contains('active')) {
    document.body.style.overflow = '';
  }
}

// --------------------------------------------------------------------------
// Checkout Interface
// --------------------------------------------------------------------------
function openCheckout() {
  if (AppState.cart.length === 0) {
    showToast("Please add items to your bag before checking out.");
    return;
  }
  closeCartDrawer();

  let subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalEl = document.getElementById('checkoutOrderTotal');
  if (totalEl) totalEl.textContent = formatPrice(subtotal);

  document.getElementById('checkoutStep1').style.display = 'block';
  document.getElementById('checkoutStepSuccess').style.display = 'none';

  document.getElementById('checkoutModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('active');
  document.body.style.overflow = '';
}

function completeCheckoutOrder(e) {
  e.preventDefault();
  // Clear cart and show confirmation
  const orderNumber = "TT-" + Math.floor(100000 + Math.random() * 900000);
  document.getElementById('confirmedOrderNumber').textContent = orderNumber;

  AppState.cart = [];
  saveCartState();

  document.getElementById('checkoutStep1').style.display = 'none';
  document.getElementById('checkoutStepSuccess').style.display = 'block';
}

// --------------------------------------------------------------------------
// Mobile Menu Drawer
// --------------------------------------------------------------------------
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  drawer.classList.toggle('active');
  backdrop.classList.toggle('active');
  document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (drawer) drawer.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

// --------------------------------------------------------------------------
// Live Instant Search
// --------------------------------------------------------------------------
function handleSearchInput(e) {
  const query = e.target.value.trim();
  AppState.searchQuery = query;
  if (query.length > 1) {
    navigateTo('shop');
    renderShopCatalog();
  } else if (query.length === 0 && AppState.currentView === 'shop') {
    renderShopCatalog();
  }
}

// --------------------------------------------------------------------------
// Toast Notifications
// --------------------------------------------------------------------------
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✦</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// --------------------------------------------------------------------------
// Global Event Listeners & Backdrops
// --------------------------------------------------------------------------
function setupEventListeners() {
  const backdrop = document.getElementById('drawerBackdrop');
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeCartDrawer();
      closeWishlistDrawer();
      closeMobileMenu();
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeSizeGuide();
      closeCheckout();
      closeCartDrawer();
      closeWishlistDrawer();
      closeMobileMenu();
    }
  });
}
