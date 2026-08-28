# Ejemplo portfolio — Fabricio

Reconstrucción en Astro, React, TypeScript y Tailwind CSS de las cuatro pantallas del portfolio diseñado en Figma.

## Ejecutar el proyecto

```sh
npm install
npm run dev
```

Astro mostrará la dirección local, normalmente `http://localhost:4321`.

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
├── pages/index.astro
└── styles/global.css
```

- Astro construye la página, las secciones y la navegación.
- React se usa únicamente donde hace falta estado: la terminal de contacto, los modales de proyectos y el panel lateral del stack.
- Tailwind está instalado y disponible. El CSS global contiene las medidas específicas necesarias para reproducir el lienzo de Figma.
- El naranja de marca está registrado como `--color-brand-orange: #c55007`.
- Lucide aporta los iconos funcionales y Simple Icons los logos tecnológicos. Astro los genera como SVG locales; las islas React importan solo los iconos que utilizan.

## Estado del diseño

- Hay un único navbar fijo; su estado activo cambia según la pantalla visible.
- Cada pantalla ocupa exactamente el alto del viewport y se ajusta desde el lienzo original de 1366 × 768.
- El botón **Ver Reverso** se muestra deshabilitado.
- Las tres tarjetas de proyectos abren modales accesibles con cierre por botón, fondo o tecla `Escape`.
- **Ver detalles** abre el panel lateral del stack con Front-end, Back-end y Diseño.
- La terminal valida correo, asunto y mensaje por pasos al presionar `Enter`; al completarlos deja listo el envío por correo.
- Las entradas, salidas, estados hover y movimiento ambiental respetan `prefers-reduced-motion`.

## Recursos temporales

La capibara proviene de los recursos de Figma. La credencial, los proyectos y el terminal están construidos como componentes reales. Los espacios de las fotografías e ilustraciones pendientes quedan reservados en la composición hasta contar con sus exportaciones originales; ninguna captura de referencia se utiliza como contenido del sitio.

## Verificación

```sh
npm run build
```
