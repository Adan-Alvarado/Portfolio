---
name: "Portfolio de Fabricio Alvarado"
description: "Taller nocturno de experimentación gráfica con disciplina editorial."
colors:
  brand-orange: "#c55007"
  accent-orange: "#ee7b34"
  canvas-ink: "#121212"
  surface-deep: "#101010"
  surface-raised: "#171717"
  paper: "#f2f1ef"
  text-muted: "#999693"
  text-secondary: "#aaa7a4"
  rule-subtle: "rgb(242 241 239 / 14%)"
  rule-interactive: "rgb(224 224 224 / 68%)"
  current-brown: "#5a260f"
  past-brown: "#2a1c18"
  project-autocare: "#d5cbbb"
  project-fixit: "#67a884"
  status-error: "#e28a86"
  status-success: "#9fc5a7"
typography:
  display:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "124px"
    fontWeight: 700
    lineHeight: 0.86
    letterSpacing: "-0.06em"
  script:
    fontFamily: "Inspiration, cursive"
    fontSize: "151px"
    fontWeight: 400
    lineHeight: 1
  headline:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "51px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-2px"
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 300
    lineHeight: 1.35
  label:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1
rounded:
  control: "8px"
  chip: "999px"
  card: "16px"
  panel: "18px"
  ticket: "21px"
spacing:
  compact: "8px"
  control: "12px"
  content: "16px"
  card: "22px"
  generous: "32px"
  mobile-gutter: "clamp(16px, 4.8vw, 20px)"
  mobile-section: "clamp(72px, 18vw, 96px)"
components:
  button-primary:
    backgroundColor: "{colors.brand-orange}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 13px"
    height: "38px"
  technology-pill:
    backgroundColor: "rgb(255 255 255 / 3%)"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    padding: "8px 11px"
    height: "42px"
  project-card:
    backgroundColor: "{colors.surface-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "19px 21px 21px"
  terminal-panel:
    backgroundColor: "{colors.canvas-ink}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "15px 20px"
  nav-active:
    backgroundColor: "rgb(6 6 6 / 84%)"
    textColor: "{colors.paper}"
    rounded: "{rounded.chip}"
    padding: "0 15px"
    height: "46px"
---

# Design System: Portfolio de Fabricio Alvarado

## Overview

**Creative North Star: "Taller Nocturno"**

Taller Nocturno presenta el portfolio como un espacio personal donde conviven código y oficio gráfico. La cuadrícula técnica, el carbón, el naranja óxido, la luz violeta ambiental y los personajes pixelados construyen una atmósfera creativa reconocible sin convertir la interfaz en una experiencia gamer.

La experimentación vive en la composición asimétrica, las mezclas tipográficas y los detalles narrativos. La elegancia editorial ordena esa energía mediante jerarquías claras, espacio negativo y movimiento calmado. El trabajo siempre debe ser más importante que el efecto.

**Key Characteristics:**

- Fondo nocturno continuo con cuadrícula técnica casi subliminal.
- Contraste editorial entre Inter y trazos caligráficos de Inspiration.
- Naranja óxido reservado para énfasis, acciones y continuidad narrativa.
- Pixel art pequeño y expresivo como firma personal, nunca como temática gamer.
- Composición asimétrica, aireada y deliberada, sin patrones de dashboard.
- Movimiento funcional, lento y limitado a una acción ambiental por sección.

## Colors

La paleta combina carbón cálido, papel apagado y naranja óxido; los acentos secundarios aparecen únicamente cuando comunican identidad de un proyecto o tecnología.

### Primary

- **Naranja de Taller:** acento de marca para palabras clave, acciones, progreso, selección y pequeños gestos de continuidad.
- **Naranja de Luz:** variante de mayor legibilidad para texto naranja pequeño y estados activos sobre superficies oscuras.

### Secondary

- **Marfil Auto Care:** identifica el proyecto Auto Care Club sin desplazar al naranja de marca.
- **Verde Fixit:** identifica Fixit API dentro de previews, pills y estados propios del proyecto.

### Neutral

- **Carbón de Lienzo:** fondo raíz y base de la terminal.
- **Negro de Mesa:** tarjetas de proyectos y superficies densas.
- **Grafito Elevado:** iconos, previews y zonas internas.
- **Papel Nocturno:** texto principal y focos de alto contraste.
- **Gris de Archivo:** texto secundario, metadata y tecnologías en reposo.
- **Regla Editorial:** separadores y bordes que estructuran sin encerrar de más.

**The Restrained Accent Rule.** El naranja debe guiar la mirada, no teñir la pantalla; úsalo en palabras, acciones y estados concretos, nunca como relleno dominante de grandes áreas.

**The Project Color Rule.** Los colores de proyecto o tecnología solo aparecen al interactuar o dentro de su contexto; el estado de reposo permanece monocromático.

## Typography

**Display Font:** Inter (con Arial y sans-serif como respaldo)  
**Body Font:** Inter (con Arial y sans-serif como respaldo)  
**Accent Font:** Inspiration (con cursive como respaldo)  
**Supporting Font:** Kite One (con sans-serif como respaldo)
**Functional Monospace:** Cascadia Mono (con SFMono-Regular y Consolas como respaldos)

**Character:** Inter aporta precisión contemporánea y lectura editorial. Inspiration rompe esa disciplina en letras puntuales, mientras Kite One sostiene pequeños acentos con personalidad sin competir con los títulos.

### Hierarchy

- **Display** (700, 124px, 0.86): palabras estructurales del hero en escritorio; en móvil se recompone, no se escala ciegamente.
- **Script** (400, 151px, 1): letras caligráficas aisladas del hero, nunca párrafos ni palabras extensas.
- **Headline** (700, 51px, 1): títulos de sección con compresión moderada y una palabra de énfasis.
- **Title** (400–600, 18–22px, 1.1): nombres de proyectos, bloques de experiencia y encabezados de componentes.
- **Body** (300, 17px, 1.35): texto narrativo breve, con líneas compactas pero respirables.
- **Label** (500, 12px, 1): metadata, pills, índices y controles secundarios.
- **Mono funcional** (400, escala contextual): prompts, entradas y estados de la terminal; no se utiliza como recurso decorativo fuera de interfaces técnicas.

**The Two-Voices Rule.** En una composición, Inter gobierna y Inspiration interviene una sola vez como gesto; no se acumulan tipografías expresivas.

## Layout

En escritorio, el contenido vive en un lienzo de referencia de 1366×768 centrado y escalado de forma uniforme. El fondo, la cuadrícula y los halos sí ocupan todo el viewport; los elementos nunca se dispersan para llenar monitores anchos. La navegación permanece fija sobre el lienzo.

En teléfonos de hasta 640px, cada sección adopta una composición editorial propia con alturas naturales, gutter fluido y navegación inferior. Entre 641px y 1023px se aplican ajustes de tablet sin desarmar el carácter de escritorio. El contenido debe permanecer dentro de los gutters y nunca generar overflow horizontal.

La estructura narrativa es Inicio → Experiencia → Proyectos → Contacto. Cada sección debe sostener una jerarquía primaria, una secundaria y suficiente espacio negativo; un hueco intencional no debe rellenarse automáticamente.

## Elevation & Depth

La profundidad es híbrida y ambiental. Los halos cálidos y violetas funden el fondo; sombras oscuras elevan tarjetas y terminales solo lo necesario. El blur pertenece a la atmósfera o a elementos deliberadamente secundarios, nunca al contenido activo ni al texto.

### Shadow Vocabulary

- **Elevación de tarjeta** (`0 20px 46px -20px rgb(0 0 0 / 82%)`): profundidad compacta de proyectos en reposo.
- **Tarjeta activa** (`0 30px 64px -22px rgb(0 0 0 / 92%)`): respuesta de hover o foco sin halo naranja.
- **Panel funcional** (`0 24px 70px rgb(0 0 0 / 30%)`): terminal y superficies interactivas enfocadas.
- **Control flotante** (`0 12px 34px rgb(0 0 0 / 34%)`): selector de idioma y controles persistentes.

**The Ambient Depth Rule.** Las sombras explican capas y los halos construyen ambiente; ninguno debe usarse para decorar cada elemento individual.

## Shapes

Las superficies combinan rectángulos editoriales de esquinas suaves con cápsulas táctiles. Tarjetas y modales usan radios contenidos de 16–21px; botones y terminal emplean 8–10px; pills, indicadores y selectores usan radio completo. Los bordes son finos, translúcidos y se aclaran en foco o hover.

La credencial conserva su silueta recortada y sus proporciones de identificación. El pixel art mantiene bordes nítidos mediante renderizado pixelado; no debe encerrarse en círculos genéricos ni suavizarse como una ilustración vectorial.

## Components

### Buttons

- **Shape:** controles compactos con esquinas suaves (8–10px), no cápsulas por defecto.
- **Primary:** naranja de marca, texto claro y altura táctil mínima de 44px en móvil.
- **Hover / Focus:** desplazamiento máximo de 2px, cambio de contraste y foco claro; nunca cambiar el tamaño del layout.
- **Disabled:** conserva su forma, reduce énfasis y comunica indisponibilidad semánticamente.

### Chips

- **Style:** cápsula oscura, borde tenue, icono y nombre legibles.
- **State:** monocromática en reposo; al interactuar revela el color característico con borde y halo reducido.
- **Motion:** elevación de 2px y microescala del icono, sin pulsos, giros ni órbitas.

### Cards / Containers

- **Corner Style:** radio medio y constante (16px para proyectos; 18–21px para tickets destacados).
- **Background:** superficies carbón separadas por tonalidad y borde, no por gradientes decorativos internos.
- **Shadow Strategy:** elevación oscura, contenida y más intensa únicamente durante interacción.
- **Internal Padding:** 19–22px en escritorio; el móvil conserva al menos 16px donde el contenido lo permita.

### Inputs / Fields

- **Style:** inputs transparentes integrados en la terminal, con texto monoespaciado y cursor de bloque.
- **Focus:** el prompt activo gana naranja y el contenedor recibe borde gris claro.
- **Error / Success:** mensajes breves y cromáticamente discretos, acompañados siempre por texto.

### Navigation

- **Desktop:** navegación fija y centrada, fondo transparente con blur; un indicador oscuro deslizante marca la sección activa.
- **Mobile:** barra inferior compacta de cinco destinos, objetivos mínimos de 44px y estado activo naranja tenue.
- **Language:** selector ES/EN separado en escritorio e integrado como quinto destino en móvil.

### Professional Credential

La credencial es el objeto protagonista de Experiencia. En escritorio permanece nítida frente a copias desenfocadas que se desplazan lentamente en diagonal; en móvil cierra una pila editorial de tres paneles, sin rotación ni fondos duplicados. El reverso funciona como índice editorial de certificados y fotografía, y solo se habilita cuando existe contenido real aprobado.

### Project Dialog

El modal es un mini caso de estudio, no una página documental. Mantiene aire alrededor en escritorio y se convierte en hoja inferior en móvil; usa un solo flujo interno de scroll, cierre visible, Escape, trampa de foco y restauración del disparador.

**The One Continuous Gesture Rule.** Cada sección admite como máximo una animación ambiental continua; el resto son entradas o respuestas breves a acciones reales.

## Do's and Don'ts

### Do:

- **Do** reservar el naranja para jerarquía, interacción y continuidad narrativa.
- **Do** combinar experimentación gráfica con una estructura editorial legible.
- **Do** mantener el pixel art pequeño, nítido y conectado con el contenido de su sección.
- **Do** preservar espacio negativo y composiciones asimétricas cuando expresan jerarquía.
- **Do** usar Astro para estructura y React solo donde existe estado interactivo real.
- **Do** respetar teclado, foco visible y `prefers-reduced-motion` en cada interacción.

### Don't:

- **Don't** convertir la interfaz en un dashboard de tarjetas equivalentes.
- **Don't** derivar hacia una estética gamer, cyberpunk o neón saturado.
- **Don't** añadir efectos, métricas, botones o ilustraciones para llenar espacio vacío.
- **Don't** desenfocar contenido activo ni usar halos amplios alrededor de cada componente.
- **Don't** escalar el lienzo de escritorio como si fuera el layout móvil.
- **Don't** permitir que una animación compita con la lectura o altere áreas clicables.
