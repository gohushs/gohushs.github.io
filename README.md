# Portafolio · Gustavo Huamán

Sitio estático (HTML, CSS y JavaScript puro, sin build) publicado en GitHub Pages: https://gohushs.github.io

## Estructura

```
index.html                 página única: Inicio, Sobre mí, Proyectos, Habilidades, Contacto
css/styles.css             estilos (mobile first, modo oscuro, acento #F5A524)
js/main.js                 menú móvil, animaciones al hacer scroll, galería de capturas
assets/favicon.svg
assets/img/perfil.jpg      ← PLACEHOLDER: reemplazar por tu foto (cuadrada, 800×800)
assets/img/og-cover.jpg    imagen al compartir el link (1200×630)
assets/img/apple-touch-icon.png
assets/img/proyectos/*.webp  capturas de los proyectos (las de los sistemas usan datos ficticios)
```

## Cambiar contenido

- **Foto:** sobrescribe `assets/img/perfil.jpg` con el mismo nombre.
- **Capturas:** reemplaza el `.webp` con el mismo nombre, o cambia la ruta en `index.html` y en `galleries` dentro de `js/main.js`.
- **Probar en tu PC:** `python -m http.server 8000` y abre http://localhost:8000

## Publicar cambios

```bash
git add .
git commit -m "Actualiza portafolio"
git push
```

GitHub Pages se actualiza solo en 1 o 2 minutos.
