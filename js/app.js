
/* JH Studio — App Logic */

document.getElementById('currentYear').textContent = new Date().getFullYear();

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) header.classList.add('jh-topbar--scrolled');
  else header.classList.remove('jh-topbar--scrolled');
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('jh-reveal--visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.jh-reveal').forEach(el => observer.observe(el));

// si una imagen falla, mostrar el logo
document.addEventListener('error', function (e) {
  const img = e.target;
  if (img && img.tagName === 'IMG' && !img.dataset.fallbackApplied) {
    img.dataset.fallbackApplied = '1';
    img.src = 'Fotos/logo.png';
    img.classList.add('jh-img-fallback');
  }
}, true);

// ---- HERO CAROUSEL ----
const destacados = VEHICULOS.filter(v => v.is_featured_unit);
const heroCarousel = document.getElementById('heroCarousel');
let currentSlide = 0;
let slideInterval;

function renderHero() {
  if (destacados.length === 0) return; // Fallback handled by css default if needed

  heroCarousel.innerHTML = destacados.map((auto, i) => `
    <div class="jh-showroom-stage__slide ${i === 0 ? 'jh-showroom-stage__slide--active' : ''}">
      <img src="${auto.thumb_preview || auto.gallery_assets[0] || ''}" class="jh-showroom-stage__backdrop" alt="${auto.marca}">
      <div class="jh-showroom-stage__gradient"></div>
      <div class="jh-showroom-stage__content">
        <div class="jh-showroom-stage__text">
          <div class="jh-showroom-stage__badge"><div class="jh-showroom-stage__pulse"></div><span>Disponible</span></div>
          <h1 class="jh-showroom-stage__title"><span class="jh-showroom-stage__marque">${auto.marca}</span> ${auto.modelo}</h1>
          <p class="jh-showroom-stage__tagline">Importación directa de EE.UU., con trámites incluidos.</p>
          <div class="jh-showroom-stage__price">${auto.precio}</div>
          <button class="jh-btn jh-btn--primary" type="button" data-id="${auto.id}">Ver Detalles</button>
        </div>
      </div>
      <div class="jh-showroom-stage__counter"><span class="jh-showroom-stage__counter-current">${i + 1}</span> / ${destacados.length}</div>
    </div>
  `).join('');

  // Arrow events
  document.getElementById('heroPrev').addEventListener('click', () => {
    nextSlide(-1);
    resetInterval();
  });
  document.getElementById('heroNext').addEventListener('click', () => {
    nextSlide(1);
    resetInterval();
  });

  // boton del hero
  heroCarousel.addEventListener('click', (e) => {
    const btn = e.target.closest('.jh-btn--primary[data-id]');
    if (btn) openDetail(parseInt(btn.dataset.id, 10));
  });

  startInterval();
}

function nextSlide(dir) {
  const slides = document.querySelectorAll('.jh-showroom-stage__slide');
  if (slides.length <= 1) return;
  slides[currentSlide].classList.remove('jh-showroom-stage__slide--active');
  currentSlide = (currentSlide + dir + slides.length) % slides.length;
  slides[currentSlide].classList.add('jh-showroom-stage__slide--active');
}

function startInterval() { slideInterval = setInterval(() => nextSlide(1), 6000); }
function resetInterval() { clearInterval(slideInterval); startInterval(); }

// ---- CATALOG RENDER & FILTER ----

// helpers
function normTipo(v) { return (v && v.tipo ? String(v.tipo) : '').toLowerCase().trim(); }
function orTBC(x) {
  const s = (x == null ? '' : String(x)).trim();
  return s ? s : 'Por confirmar';
}
function deaccent(s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, ''); }
function vehicleSearchText(v) {
  const s = v.tech_specs || {};
  const raw = [
    v.marca, v.modelo, v.trim, v.anio, v.precio, v.km, v.tipo,
    s['Motor'], s['Transmisión'], s['Tracción'], s['Combustible'], s['Color'], s['Asientos'],
    ...(v.feature_tags || [])
  ].filter(Boolean).join(' ');
  return deaccent(raw).toLowerCase();
}

function updateCounts() {
  const counts = { todos: VEHICULOS.length, suv: 0, sedan: 0, pickup: 0, todoterreno: 0 };
  VEHICULOS.forEach(v => {
    const t = normTipo(v);
    if (t && t !== 'todos' && t in counts) counts[t]++;
  });
  Object.keys(counts).forEach(k => {
    const el = document.getElementById('count-' + k);
    if (el) el.textContent = counts[k];
  });
}

function renderList(filtered, emptyMsg) {
  const grid = document.getElementById('catalogGrid');
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="jh-stock-display__empty">
        <svg><use href="#icon-search"></use></svg>
        <p>${emptyMsg}</p>
        <span class="jh-stock-display__empty-hint">Prueba con otra marca, modelo o año — o escríbenos y lo conseguimos por encargo.</span>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map((auto, i) => `
    <div class="jh-unit-card jh-reveal" style="transition-delay: ${i * 0.08}s" data-id="${auto.id}" role="button" tabindex="0" aria-label="Ver detalles: ${auto.marca} ${auto.modelo} ${auto.anio}">
      <div class="jh-unit-card__media">
        <img src="${auto.thumb_preview || auto.gallery_assets[0] || ''}" class="jh-unit-card__photo" alt="${auto.modelo}" loading="lazy">
        <div class="jh-unit-card__badges">
          ${auto.unit_condition === 'nuevo' ? '<span class="jh-badge jh-badge--new">Nuevo</span>' : ''}
          ${auto.estado !== 'disponible' ? `<span class="jh-badge jh-badge--status">${auto.estado}</span>` : ''}
        </div>
        <div class="jh-unit-card__gradient"></div>
      </div>
      <div class="jh-unit-card__body">
        <div class="jh-unit-card__marque">${auto.marca}</div>
        <div class="jh-unit-card__model">${auto.modelo}${auto.trim ? ' <span class="jh-unit-card__trim">' + auto.trim + '</span>' : ''}</div>
        <div class="jh-unit-card__tech-line">
          <span>${auto.anio}</span>
          <span class="jh-unit-card__separator">·</span>
          <span>${auto.km || '—'}</span>
          <span class="jh-unit-card__separator">·</span>
          <span>${(auto.tech_specs && auto.tech_specs['Motor']) || '—'}</span>
        </div>
        <div class="jh-unit-card__footer">
          <div class="jh-unit-card__price">${auto.precio}</div>
          <div class="jh-unit-card__cta"><svg class="icon"><use href="#icon-arrow-right"></use></svg></div>
        </div>
      </div>
    </div>
  `).join('');

  // Re-observe new elements
  setTimeout(() => {
    document.querySelectorAll('#catalogGrid .jh-reveal').forEach(el => observer.observe(el));
  }, 50);
}

function renderCatalog(filter = 'todos') {
  const f = (filter || 'todos').toLowerCase();
  const filtered = f === 'todos' ? VEHICULOS : VEHICULOS.filter(v => normTipo(v) === f);
  renderList(filtered, 'No hay vehículos en esta categoría.');
}

// Filters logic
document.querySelectorAll('.jh-filter-chip').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.jh-filter-chip').forEach(b => b.classList.remove('jh-filter-chip--active'));
    btn.classList.add('jh-filter-chip--active');
    if (document.getElementById('searchInput')) document.getElementById('searchInput').value = '';
    renderCatalog(btn.dataset.filter);
  });
});

// abrir detalle desde las tarjetas
const catalogGrid = document.getElementById('catalogGrid');
if (catalogGrid) {
  catalogGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.jh-unit-card[data-id]');
    if (card) openDetail(parseInt(card.dataset.id, 10));
  });
  catalogGrid.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.jh-unit-card[data-id]');
    if (card) { e.preventDefault(); openDetail(parseInt(card.dataset.id, 10)); }
  });
}

// Search logic
const searchInput = document.getElementById('searchInput');

function performSearch() {
  if (!searchInput) return;
  const raw = searchInput.value.trim();
  if (!raw) { renderCatalog('todos'); return; }
  document.querySelectorAll('.jh-filter-chip').forEach(b => b.classList.remove('jh-filter-chip--active'));

  const term = deaccent(raw).toLowerCase();
  const filtered = VEHICULOS.filter(v => vehicleSearchText(v).includes(term));
  renderList(filtered, 'No se encontraron resultados para "' + raw + '".');
}

if (searchInput) {
  searchInput.addEventListener('keyup', performSearch);
}

// Hamburger menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.jh-topbar__nav');
if (menuToggle && navLinks) {
  const setMenu = (open) => {
    menuToggle.classList.toggle('jh-topbar__menu-toggle--active', open);
    navLinks.classList.toggle('jh-topbar__nav--open', open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menuToggle.addEventListener('click', () => {
    setMenu(!navLinks.classList.contains('jh-topbar__nav--open'));
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });
}

// ---- DETAIL MODAL ----
const modal = document.getElementById('detailModal');
let currentGalleryImages = [];
let currentImageIndex = 0;
let isFitContain = false;
let lastFocused = null;
let currentVehicleName = '';

function openDetail(id) {
  const auto = VEHICULOS.find(v => v.id === id);
  if (!auto) return;

  lastFocused = document.activeElement;
  currentVehicleName = [auto.marca, auto.modelo, auto.anio].filter(Boolean).join(' ');

  document.getElementById('dBrand').textContent = auto.marca || '';
  document.getElementById('dTitle').textContent = auto.modelo || '';
  document.getElementById('dSubtitle').textContent =
    [auto.anio, auto.trim, auto.km].filter(Boolean).join(' · ');
  document.getElementById('dPrice').textContent = orTBC(auto.precio);
  document.getElementById('dDesc').textContent = orTBC(auto.unit_description);

  // Highlights
  const highlightsHTML = (auto.feature_tags || [])
    .filter(h => h && String(h).trim())
    .map(h => `<div class="jh-vehicle-detail__highlight"><svg class="icon-sm"><use href="#icon-check"></use></svg>${h}</div>`)
    .join('');
  document.getElementById('dHighlights').innerHTML = highlightsHTML;

  // Specs
  const specsHTML = Object.entries(auto.tech_specs || {}).map(([k, v]) => `
    <div class="jh-specs-grid__item">
      <div class="jh-specs-grid__label">${k}</div>
      <div class="jh-specs-grid__value">${orTBC(v)}</div>
    </div>
  `).join('');
  document.getElementById('dSpecs').innerHTML = specsHTML;

  // CTAs
  const nombreAuto = [auto.marca, auto.modelo, auto.anio].filter(Boolean).join(' ');
  const precioAuto = auto.precio ? ` (${auto.precio})` : '';
  const msgWa = encodeURIComponent(`Hola, me interesa el ${nombreAuto}${precioAuto}. ¿Sigue disponible?`);
  document.getElementById('dBtnTel').href = EMPRESA.tel_link;
  document.getElementById('dBtnWa').href = EMPRESA.whatsapp + '?text=' + msgWa;

  // Gallery
  currentImageIndex = 0;
  isFitContain = false;
  currentGalleryImages = auto.gallery_assets || [];
  renderGallery();

  // Show
  modal.classList.add('jh-vehicle-modal--active');
  lockScroll();
  requestAnimationFrame(() => {
    const closeBtn = document.getElementById('detailClose');
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  });
}

function renderGallery() {
  const mainWrap = document.getElementById('detailMainImgWrap');
  const thumbsWrap = document.getElementById('detailThumbs');
  const navBtns = document.querySelectorAll('.jh-gallery__nav');

  if (currentGalleryImages.length === 0) {
    mainWrap.innerHTML = '<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#555;">Sin imagen</div>';
    thumbsWrap.innerHTML = '';
    navBtns.forEach(btn => btn.style.display = 'none');
    return;
  }

  mainWrap.innerHTML = currentGalleryImages.map((src, i) => {
    const objFit = isFitContain ? 'contain' : 'cover';
    const bg = isFitContain ? '#000' : 'transparent';
    return `<img src="${src}" class="jh-gallery__slide ${i === 0 ? 'jh-gallery__slide--active' : ''}" id="mainImg-${i}" alt="${currentVehicleName}" style="object-fit: ${objFit}; background-color: ${bg};">`;
  }).join('');

  if (currentGalleryImages.length > 1) {
    thumbsWrap.innerHTML = currentGalleryImages.map((src, i) =>
      `<div class="jh-gallery__thumb ${i === 0 ? 'jh-gallery__thumb--active' : ''}" data-index="${i}"><img src="${src}" alt=""></div>`
    ).join('');
    thumbsWrap.style.display = 'flex';
    navBtns.forEach(btn => btn.style.display = 'flex');
  } else {
    thumbsWrap.style.display = 'none';
    navBtns.forEach(btn => btn.style.display = 'none');
  }
}

window.setMainImage = function (index) {
  currentImageIndex = index;
  document.querySelectorAll('.jh-gallery__slide').forEach(el => el.classList.remove('jh-gallery__slide--active'));
  document.querySelectorAll('.jh-gallery__thumb').forEach(el => el.classList.remove('jh-gallery__thumb--active'));

  const mainImg = document.getElementById(`mainImg-${index}`);
  if (mainImg) mainImg.classList.add('jh-gallery__slide--active');

  const thumbs = document.querySelectorAll('.jh-gallery__thumb');
  if (thumbs[index]) {
    thumbs[index].classList.add('jh-gallery__thumb--active');
    thumbs[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

// Nav arrows
document.getElementById('galleryPrev').addEventListener('click', () => {
  if (currentGalleryImages.length <= 1) return;
  let newIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
  setMainImage(newIndex);
});
document.getElementById('galleryNext').addEventListener('click', () => {
  if (currentGalleryImages.length <= 1) return;
  let newIndex = (currentImageIndex + 1) % currentGalleryImages.length;
  setMainImage(newIndex);
});

// miniaturas
const detailThumbs = document.getElementById('detailThumbs');
if (detailThumbs) {
  detailThumbs.addEventListener('click', (e) => {
    const thumb = e.target.closest('.jh-gallery__thumb[data-index]');
    if (thumb) setMainImage(parseInt(thumb.dataset.index, 10));
  });
}

// Fit toggle
document.getElementById('galleryFitToggle').addEventListener('click', () => {
  isFitContain = !isFitContain;
  document.querySelectorAll('.jh-gallery__slide').forEach(img => {
    img.style.objectFit = isFitContain ? 'contain' : 'cover';
    img.style.backgroundColor = isFitContain ? '#000' : 'transparent';
  });
});

// Touch swipe logic for gallery
let touchStartX = 0;
let touchEndX = 0;
const galleryWrap = document.getElementById('detailMainImgWrap');

galleryWrap.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

galleryWrap.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeThreshold = 50;
  if (touchEndX < touchStartX - swipeThreshold) {
    if (currentGalleryImages.length > 1) {
      let newIndex = (currentImageIndex + 1) % currentGalleryImages.length;
      setMainImage(newIndex);
    }
  }
  if (touchEndX > touchStartX + swipeThreshold) {
    if (currentGalleryImages.length > 1) {
      let newIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
      setMainImage(newIndex);
    }
  }
}

function lockScroll() {
  const scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.overflow = 'hidden';
  document.body.dataset.scrollY = scrollY;
}

function unlockScroll() {
  const scrollY = parseInt(document.body.dataset.scrollY || '0', 10);
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.overflow = '';
  window.scrollTo(0, scrollY);
}

function closeModal() {
  if (!modal.classList.contains('jh-vehicle-modal--active')) return;
  modal.classList.remove('jh-vehicle-modal--active');
  unlockScroll();
  if (lastFocused && lastFocused.focus) { lastFocused.focus({ preventScroll: true }); lastFocused = null; }
}

document.getElementById('detailClose').addEventListener('click', closeModal);
document.getElementById('detailOverlay').addEventListener('click', closeModal);

// teclado del modal
document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('jh-vehicle-modal--active')) return;
  if (e.key === 'Escape') { closeModal(); return; }
  if (currentGalleryImages.length <= 1) return;
  if (e.key === 'ArrowLeft') {
    setMainImage((currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length);
  } else if (e.key === 'ArrowRight') {
    setMainImage((currentImageIndex + 1) % currentGalleryImages.length);
  }
});

// Detail Tabs
document.querySelectorAll('.jh-vehicle-detail__tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.jh-vehicle-detail__tab').forEach(t => t.classList.remove('jh-vehicle-detail__tab--active'));
    document.querySelectorAll('.jh-vehicle-detail__tab-panel').forEach(c => c.classList.remove('jh-vehicle-detail__tab-panel--active'));

    tab.classList.add('jh-vehicle-detail__tab--active');
    document.getElementById(tab.dataset.target).classList.add('jh-vehicle-detail__tab-panel--active');
  });
});

// ---- ENTREGAS ----
function renderEntregas() {
  const track = document.getElementById('deliveryGrid');
  if (!track) return;
  
  const data = typeof ENTREGAS !== 'undefined' ? ENTREGAS : [];
  if (data.length === 0) return;

  // Calculamos cuántas veces duplicar los datos para que llenen monitores ultra-anchos
  const cardWidth = 320; // 300px width + 20px margin
  const screenWidth = 2500;
  const totalOriginalWidth = data.length * cardWidth;
  
  // Necesitamos que LA MITAD de la tira cubra la pantalla para que el -50% sea imperceptible
  let repetitions = Math.ceil(screenWidth / totalOriginalWidth);
  if (repetitions < 1) repetitions = 1;

  let infiniteData = [];
  // Multiplicamos por 2 para tener dos mitades exactas (para el translateX(-50%))
  for(let i = 0; i < repetitions * 2; i++) {
    infiniteData = infiniteData.concat(data);
  }

  track.innerHTML = infiniteData.map((e, i) => `
    <div class="jh-showcase-card jh-reveal" style="transition-delay: ${(i % data.length) * 0.1}s">
      <img src="${e.imagen}" class="jh-showcase-card__photo" alt="Entrega ${e.titulo}">
      <div class="jh-showcase-card__overlay">
        <div class="jh-showcase-card__title">${e.titulo}</div>
        <div class="jh-showcase-card__subtitle">${e.vehiculo}</div>
      </div>
    </div>
  `).join('');

  setTimeout(() => {
    document.querySelectorAll('#deliveryGrid .jh-reveal').forEach(el => observer.observe(el));
  }, 50);
}

// ---- TESTIMONIOS (WhatsApp Style) ----
function renderTestimonios() {
  const grid = document.getElementById('testimonialGrid');
  if (!grid) return;
  grid.innerHTML = (typeof TESTIMONIOS !== 'undefined' ? TESTIMONIOS : []).map((t, i) => `
        <div class="jh-review-bubble jh-reveal" style="transition-delay: ${i * 0.1}s">
          <div class="jh-review-bubble__header">
            <div class="jh-review-bubble__avatar">${t.nombre.charAt(0)}</div>
            <div class="jh-review-bubble__name">${t.nombre}</div>
          </div>
          <div class="jh-review-bubble__body">${t.mensaje}</div>
          <div class="jh-review-bubble__footer">
            <span class="jh-review-bubble__time">${t.fecha}</span>
            <span class="jh-review-bubble__ticks">
              <svg viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>
            </span>
          </div>
        </div>
      `).join('');

  setTimeout(() => {
    document.querySelectorAll('#testimonialGrid .jh-reveal').forEach(el => observer.observe(el));
  }, 50);
}

// Init
renderHero();
updateCounts();
renderCatalog();
renderEntregas();
renderTestimonios();


// Para el pill

const pill = document.getElementById('navPill');
const navItems = document.querySelectorAll('.jh-topbar__nav a');

navItems.forEach(link => {
  link.addEventListener('mouseenter', () => {
    const rect = link.getBoundingClientRect();
    const navRect = link.closest('nav').getBoundingClientRect();
    pill.style.opacity = '1';
    pill.style.width = rect.width + 16 + 'px';
    pill.style.height = rect.height + 8 + 'px';
    pill.style.left = (rect.left - navRect.left - 8) + 'px';
    pill.style.top = (rect.top - navRect.top - 4) + 'px';
  });
});

document.querySelector('nav').addEventListener('mouseleave', () => {
  pill.style.opacity = '0';
});

// pantalla de carga
(function initLoader() {
  const loader = document.getElementById('jh-loader');
  if (!loader) return;

  const bar = document.getElementById('jh-bar-fill');
  const logo = document.getElementById('loader-logo');
  const btn = document.getElementById('btn-entrar');
  const barContainer = loader.querySelector('.jh-loader-bar');
  const loaderText = loader.querySelector('.jh-loader-text');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // arrancar arriba
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  // bloquear scroll del fondo
  loader.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });

  if (bar) requestAnimationFrame(function () { bar.style.width = '100%'; });

  // mostrar logo y boton
  let revealed = false;
  function revealEntry() {
    if (revealed) return;
    revealed = true;
    if (barContainer) barContainer.style.opacity = '0';
    if (loaderText) loaderText.style.opacity = '0';
    if (logo) logo.classList.add('jh-element-reveal');
    if (btn) {
      setTimeout(function () { btn.classList.add('jh-element-reveal'); }, reduceMotion ? 0 : 300);
    }
  }

  if (logo) {
    logo.addEventListener('model-visibility', function (evt) {
      if (evt.detail && evt.detail.visible) revealEntry();
    });
    // si falla el modelo, logo de respaldo
    logo.addEventListener('error', function () {
      if (logo.parentElement) logo.parentElement.classList.add('jh-model-failed');
      revealEntry();
    });
  }

  // por si el 3D tarda o falla, mostrar el boton igual
  setTimeout(revealEntry, reduceMotion ? 400 : 3500);

  function enterSite() {
    loader.classList.add('jh-splash-screen--hidden');
    document.documentElement.classList.remove('loader-active');
    document.body.classList.remove('loader-active');
    window.scrollTo(0, 0);

    document.querySelectorAll('.jh-reveal').forEach(function (el, i) {
      setTimeout(function () { el.classList.add('jh-reveal--visible'); }, reduceMotion ? 0 : i * 120);
    });

    // quitar el loader del DOM
    setTimeout(function () { if (loader.parentNode) loader.remove(); }, 700);
  }

  if (btn) btn.addEventListener('click', enterSite);
})();
/*HISTORIA SECTION  */

(function () {
  var TOTAL = 4;

  function initHistoria() {
    var section  = document.getElementById('historia-section');
    if (!section) return;

    var logo     = document.getElementById('logo-scroll');
    var track    = document.getElementById('jhHsTrack');
    var yearEl   = document.getElementById('jhHsYear');
    var chapters = section.querySelectorAll('.jh-hs-chapter');
    var nodes    = section.querySelectorAll('.jh-hs-node');

    if (!logo || chapters.length === 0) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function isMobile() { return window.innerWidth <= 768; }

    // si falla el modelo, logo de respaldo
    logo.addEventListener('error', function () {
      if (logo.parentElement) logo.parentElement.classList.add('jh-model-failed');
    });

    // reposo: gira solo; desktop: sigue el mouse
    function applyMode() {
      if (reduceMotion) {
        logo.removeAttribute('auto-rotate');
        logo.setAttribute('camera-orbit', '0deg 90deg auto');
        return;
      }
      logo.setAttribute('rotation-per-second', isMobile() ? '45deg' : '30deg');
      logo.setAttribute('auto-rotate', '');
    }
    applyMode();

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyMode, 200);
    });

    // seguir el mouse (solo desktop)
    if (!reduceMotion) {
      section.addEventListener('mousemove', function (e) {
        if (isMobile()) return;
        logo.removeAttribute('auto-rotate');
        var rect = section.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        var y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        var theta = 0 - (x * 22);
        var phi = 90 - (y * 10);
        logo.setAttribute('camera-orbit', theta + 'deg ' + phi + 'deg auto');
      });

      section.addEventListener('mouseleave', function () {
        if (isMobile()) return;
        logo.setAttribute('auto-rotate', '');
      });
    }

    // ── Scroll logic (igual que antes) ──
    var ticking = false;

    function tick() {
      ticking = false;
      var sectionTop = section.offsetTop;
      var sectionH   = section.offsetHeight;
      var wh         = window.innerHeight;
      var maxScroll  = sectionH - wh;
      if (maxScroll <= 0) return; // en movil no es sticky
      var scrolled   = window.scrollY - sectionTop;
      var p = Math.min(Math.max(scrolled / maxScroll, 0), 1);
      logo.style.setProperty('--logo-scale', 1 + p * 0.25);

      if (track) track.style.height = (p * 100) + '%';

      var zone = 1 / TOTAL;
      var idx  = Math.min(Math.floor(p / zone), TOTAL - 1);

      chapters.forEach(function (ch, i) {
        ch.classList.toggle('jh-hs-chapter--active', i === idx);
      });

      nodes.forEach(function (nd, i) {
        nd.classList.remove('jh-hs-node--active', 'jh-hs-node--done');
        if      (i === idx) nd.classList.add('jh-hs-node--active');
        else if (i  <  idx) nd.classList.add('jh-hs-node--done');
      });

      if (yearEl && chapters[idx]) {
        yearEl.textContent = chapters[idx].dataset.year || '';
      }
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(tick); }
    }, { passive: true });

    tick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHistoria);
  } else {
    initHistoria();
  }
})();
