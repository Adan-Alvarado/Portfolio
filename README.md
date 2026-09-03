# Ejemplo portfolio — Fabricio

Reconstrucción en Astro, React, TypeScript y Tailwind CSS de las cuatro pantallas del portfolio diseñado en Figma.

## Ejecutar el proyecto

```sh
npm install
npm run dev
```

Astro mostrará la dirección local, normalmente `http://localhost:4321`.

Copia `.env.example` a `.env` y configura:

- `PUBLIC_SITE_URL`: origen público usado por canonical y Open Graph.
- `PUBLIC_FORMSPREE_FORM_ID`: identificador público del formulario de Formspree. Si falta, el envío queda deshabilitado y el correo visible funciona como alternativa.

## Estructura principal

```text
src/
├── components/
│   ├── Navigation.astro
│   ├── ContactTerminal.tsx
│   ├── ProjectGallery.tsx
│   ├── StackDrawer.tsx
│   └── sections/
│       ├── Hero.astro
│       ├── Experience.astro
│       ├── Projects.astro
│       └── Contact.astro
├── layouts/PortfolioLayout.astro
├── data/
│   ├── credential-back.ts
│   └── projects.ts
├── pages/
│   ├── index.astro
│   └── en/index.astro
└── styles/
    ├── global.css
    └── mobile/
```

- Astro construye la página, las secciones y la navegación.
- React se usa únicamente donde hace falta estado: la terminal de contacto, los modales de proyectos y el panel lateral del stack.
- Tailwind está instalado y disponible. El CSS global contiene las medidas específicas necesarias para reproducir el lienzo de Figma.
- El naranja de marca está registrado como `--color-brand-orange: #c55007`.
- Lucide aporta los iconos funcionales y Simple Icons los logos tecnológicos. Astro los genera como SVG locales; las islas React importan solo los iconos que utilizan.

## Estado del diseño

- Hay un único navbar fijo; su estado activo cambia según la pantalla visible.
- Cada pantalla ocupa exactamente el alto del viewport y se ajusta desde el lienzo original de 1366 × 768.
- **Ver reverso** se habilita automáticamente al incorporar certificados o fotografías reales en `src/data/credential-back.ts`.
- Las tres tarjetas de proyectos abren modales accesibles con cierre por botón, fondo o tecla `Escape`.
- Los casos enlazan los repositorios públicos de Auto Care Club y FixIt, y la colección de Diseño Gráfico en Google Drive.
- **Ver detalles** abre el panel lateral del stack con Front-end, Back-end y Diseño.
- La terminal valida correo, asunto y mensaje por pasos; el mensaje admite varias líneas y `Ctrl/Cmd + Enter` envía mediante Formspree.
- Las entradas, salidas, estados hover y movimiento ambiental respetan `prefers-reduced-motion`.

## Contenido pendiente

No se publican certificados, fotografías personales ni resultados cuantitativos inventados. Para completar el reverso deben añadirse hasta tres certificados verificables y entre tres y ocho fotografías propias, con dimensiones, texto alternativo y enlaces de respaldo. Las piezas visuales reales de los proyectos deben reemplazar después las representaciones editoriales actuales.

## Verificación

```sh
npm run check
npm run build
```
