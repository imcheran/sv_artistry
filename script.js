// ============================================================
// GALLERY DATA — Add/edit items here. 
// For real images: put files in /images/ and use src: 'images/filename.jpg'
// For emoji placeholders: set src to null and emoji to your emoji
// ============================================================
const galleryData = [
  { id: 1, title: 'Couple Turmeric Portrait', desc: 'Custom wedding anniversary portrait', tag: 'turmeric', filter: 'turmeric', emoji: '🌿' },
  { id: 2, title: 'Family Portrait', desc: 'Personalized family turmeric art', tag: 'custom', filter: 'custom', emoji: '👨‍👩‍👧' },
  { id: 3, title: 'Ganesh Illustration', desc: 'Devotional turmeric illustration', tag: 'turmeric', filter: 'turmeric', emoji: '🪔' },
  { id: 4, title: 'Realistic Pencil Sketch', desc: 'Fine pencil portrait from photo', tag: 'pencil', filter: 'pencil', emoji: '✏️' },
  { id: 5, title: 'Wedding Gift Set', desc: 'Framed portrait with gift packaging', tag: 'gifts', filter: 'gifts', emoji: '🎁' },
  { id: 6, title: 'Custom Caricature', desc: 'Fun caricature illustration', tag: 'custom', filter: 'custom', emoji: '🖌️' },
  { id: 7, title: 'Turmeric Landscape', desc: 'Golden scenic turmeric painting', tag: 'turmeric', filter: 'turmeric', emoji: '🌄' },
  { id: 8, title: 'Pencil Portrait', desc: 'Detailed black & white portrait', tag: 'pencil', filter: 'pencil', emoji: '🎨' },
  { id: 9, title: 'Birthday Gift Art', desc: 'Custom birthday portrait gift', tag: 'gifts', filter: 'gifts', emoji: '🎂' },
];

// ============================================================
// RENDER GALLERY
// ============================================================
function renderGallery(filter = 'all') {
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';
  const items = filter === 'all' ? galleryData : galleryData.filter(i => i.filter === filter);
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.innerHTML = `
      <div class="gallery-img">${item.src
        ? `<img src="${item.src}" alt="${item.title}" loading="lazy" />`
        : `<span style="font-size:3.5rem">${item.emoji}</span>`
      }</div>
      <div class="gallery-info">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
        <span class="gallery-tag">${item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}</span>
      </div>`;
    grid.appendChild(card);
  });
}

// ============================================================
// FILTER TABS
// ============================================================
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery(btn.dataset.filter);
  });
});

// ============================================================
// NAVBAR SCROLL
// ============================================================
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 300);
});

// ============================================================
// MOBILE HAMBURGER
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============================================================
// SCROLL TO TOP
// ============================================================
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// ORDER FORM → WhatsApp
// ============================================================
document.getElementById('orderForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const artType = document.getElementById('artType').value;
  const occasion = document.getElementById('occasion').value.trim();
  const message = document.getElementById('message').value.trim();

  const text = `Hello Udhayasree! 👋

I'd like to place an order:

*Name:* ${name}
*Phone:* ${phone}
*Art Type:* ${artType}
*Occasion:* ${occasion || 'Not specified'}
*Details:* ${message || 'No additional details'}

Found you via your website!`;

  const whatsappURL = `https://wa.me/919047362098?text=${encodeURIComponent(text)}`;
  window.open(whatsappURL, '_blank');
});

// ============================================================
// SMOOTH SCROLL REVEAL (Intersection Observer)
// ============================================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.cat-card, .testi-card, .step, .gallery-card, .icon-box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Init gallery
renderGallery();
