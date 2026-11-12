// Portafolio · Gustavo Huamán
document.documentElement.classList.add('js');

// Año del footer
document.getElementById('year').textContent = new Date().getFullYear();

// Navegación: sombra al hacer scroll + menú móvil
const nav = document.getElementById('nav');
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');

const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const setMenu = (open) => {
  menu.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
};
toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Animaciones al hacer scroll + enlace activo del menú
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el) => io.observe(el));

  const links = [...menu.querySelectorAll('a[href^="#"]')];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}

// Galería de capturas
const P = 'assets/img/proyectos/';
const galleries = {
  protection: {
    title: 'Protection Police SAC',
    items: [
      ['protection-police-web.webp', 'Web corporativa: protectionpolice.com'],
      ['protection-police-panel.webp', 'App de asistencia: panel del día con cobertura de puestos (datos ficticios)'],
      ['protection-police-marcaciones.webp', 'Marcaciones con selfie y GPS verificados (datos ficticios)'],
      ['protection-police-panel-movil.webp', 'El mismo panel en el celular'],
      ['protection-police-app.webp', 'Ingreso a la app, instalable como PWA'],
    ],
  },
  bisonweb: {
    title: 'BISON FAMA',
    items: [
      ['bison-fama-web.webp', 'Web de la marca: bisonfama.com'],
    ],
  },
  bisonsistema: {
    title: 'Sistema de inventario BISON',
    items: [
      ['bison-inventario-panel.webp', 'Panel: ventas del día, stock bajo y cierre de caja (datos ficticios)'],
      ['bison-inventario-venta.webp', 'Registro de una venta nueva'],
      ['bison-inventario-movil.webp', 'Inventario en el celular'],
      ['bison-inventario.webp', 'Ingreso al sistema, instalable como app'],
    ],
  },
};

const dlg = document.getElementById('gallery');
const gImg = document.getElementById('galleryImg');
const gCap = document.getElementById('galleryCap');
const gTitle = document.getElementById('galleryTitle');
const gCount = document.getElementById('galleryCount');
const gPrev = dlg.querySelector('[data-prev]');
const gNext = dlg.querySelector('[data-next]');
let current = null;
let index = 0;

const gVid = document.createElement('video');
gVid.controls = true;
gVid.playsInline = true;
gVid.preload = 'metadata';
gVid.className = 'gallery__video';
gImg.after(gVid);

const render = () => {
  const [file, caption] = current.items[index];
  const isVideo = file.endsWith('.mp4');
  gImg.hidden = isVideo;
  gVid.hidden = !isVideo;
  if (isVideo) {
    gVid.poster = P + file.replace('.mp4', '-poster.webp');
    gVid.src = P + file;
    gVid.setAttribute('aria-label', caption);
  } else {
    gVid.pause();
    gVid.removeAttribute('src');
    gImg.src = P + file;
    gImg.alt = caption;
  }
  gCap.textContent = caption;
  gCount.textContent = `${index + 1} / ${current.items.length}`;
  const multi = current.items.length > 1;
  gPrev.hidden = gNext.hidden = gCount.hidden = !multi;
};
const step = (d) => { index = (index + d + current.items.length) % current.items.length; render(); };

document.querySelectorAll('[data-gallery]').forEach((btn) => {
  btn.addEventListener('click', () => {
    current = galleries[btn.dataset.gallery];
    index = 0;
    gTitle.textContent = current.title;
    render();
    dlg.showModal();
  });
});
gPrev.addEventListener('click', () => step(-1));
gNext.addEventListener('click', () => step(1));
dlg.querySelector('[data-close]').addEventListener('click', () => dlg.close());
dlg.addEventListener('close', () => gVid.pause());
dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
dlg.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') step(1);
  if (e.key === 'ArrowLeft') step(-1);
});

// Galerías de marketing y diseño
const M = '../marketing/';
galleries.jhenscar = {
  title: 'Importaciones Jhens Car',
  items: [
    [M + 'jhenscar-logo.webp', 'Logo de la marca, diseñado por mí'],
    [M + 'jhenscar-banner.webp', 'Banner para redes: “Listos para la aventura”'],
    [M + 'jhenscar-antivuelco.webp', 'Fotografía y edición de producto: antivuelco Hamer Black'],
    [M + 'jhenscar-frontier.webp', 'Fotografía de instalación: equipamiento Nissan Frontier'],
    [M + 'jhenscar-ofertas.webp', 'Fotomontaje para campaña de ofertas'],
    [M + 'jhenscar-cupula-hilux.webp', 'Ficha de producto: cúpula para Toyota Hilux'],
  ],
};
galleries.carryboy = {
  title: 'Carryboy Perú',
  items: [
    [M + 'carryboy-mazda-cupula.webp', 'Fotografía y diseño: cúpula Carryboy para Mazda'],
    [M + 'carryboy-series7.webp', 'Ficha de producto: cúpula Series 7'],
    [M + 'carryboy-s560.webp', 'Fotomontaje: cúpula CMND-S560'],
    [M + 'carryboy-mazda-bt50.webp', 'Pieza para redes: cúpula Mazda BT-50'],
  ],
};
galleries.bisonmkt = {
  title: 'BISON FAMA · Marca y marketing',
  items: [
    [M + 'bison-logo.webp', 'Logo de BISON FAMA, diseñado por mí'],
    [M + 'bison-intro.mp4', 'Intro animada del logo'],
    [M + 'bison-portada.webp', 'Portada para redes sociales'],
    [M + 'bison-banner-vertical.webp', 'Banner vertical impreso para la tienda'],
    [M + 'bison-antivuelco-black.webp', 'Fotomontaje: antivuelco Hamer Black'],
    [M + 'bison-maxus-tienda.webp', 'Fotografía en tienda: antivuelco Hamer en Maxus'],
    [M + 'bison-maxus-instalado.webp', 'Fotografía de instalación: Maxus con antivuelco Hamer'],
    [M + 'bison-antivuelco-led.webp', 'Pieza de producto: antivuelco Hamer con LED'],
    [M + 'bison-antivuelco-parrilla.webp', 'Pieza de producto: antivuelco Hamer con parrilla'],
    [M + 'bison-jac.webp', 'Fotografía y edición: JAC con antivuelco y parrilla'],
  ],
};
