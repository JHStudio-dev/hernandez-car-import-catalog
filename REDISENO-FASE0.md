# Rediseño — Fase 0: Revisión visual estratégica

Hernández Car Import · Catálogo web
Ronda 2 (dirección de arte / rediseño premium). Documento de diagnóstico.

Esta fase **no modifica código**: es la revisión de taste que define qué se
cambia en las fases 1–9. La ronda 1 (arreglos técnicos) ya está terminada; el
diagnóstico técnico vive en `AUDITORIA.md`. Aquí se mira solo la **dirección de
arte**: qué se siente a plantilla de IA, qué se siente genérico, qué ya funciona
y no debe tocarse, y dónde está la oportunidad de que la web se sienta como una
marca automotriz seria.

Punto de partida: la esencia actual es buena y se conserva — fondo negro, rojo
como acento, blanco/gris para texto, hero sólido, catálogo dinámico, logo 3D,
historia sticky por años. El trabajo es de refinamiento, no de reconstrucción.

---

## Lentes de revisión

Se revisó con criterio de: dirección creativa, taste, revisor anti-IA,
dirección de marca de lujo (sobrio), frontend senior y performance. La pregunta
constante fue: *¿esto hace que la marca se vea más seria y confiable, o solo
decora?*

---

## Diagnóstico por sección

### Loader
Funciona y no se reabre. Correcto y no es prioridad tocarlo. Solo cuidar que la
tipografía nueva no rompa el `letter-spacing` del texto "Hernández Car Import ·
Catálogo".

### Navbar
Potencial fuerte de motorsport/F1 desaprovechado. Hoy es correcta pero genérica.
Debe volverse **más fina y compacta**, con una línea roja de firma (2px) como
acento, indicador activo (pill) más limpio y cuidado con el `blur(20px)` alto.
No agrandarla ni saturar de brillo.

### Hero (carrusel)
Es lo más sólido; **no destruir**. Ajustes finos: hoy destaca las 12 unidades
`is_featured_unit` — mejor **3–5 autos** para que sea una selección curada, no
todo el inventario. El badge con `pulse` se siente de app/SaaS; suavizarlo o
reemplazarlo por algo más editorial. Overlay puede ser más cinematográfico.

### Catálogo / Inventario
Base buena. Las tarjetas deben leerse como **ficha automotriz real**: jerarquía
marca → modelo → año → precio, menos badges, hover sobrio. Toolbar de búsqueda y
filtros: mantener la lógica intacta, solo piel.

### Historia sticky (mayor oportunidad de toda la web)
La mecánica sticky por años es memorable y se conserva. Pero el timeline actual
se ve "de IA". Rediseño previsto:
- **Pedestal CSS** bajo el logo 3D (sensación de showroom, aro rojo sutil,
  profundidad con sombras/gradientes, `pointer-events: none`, sin bloquear el
  model-viewer ni el scroll móvil).
- Año como **tipografía grande** protagonista.
- Más aire, narrativa más editorial y menos tamaño exagerado.
No agregar otro `.glb` ni reemplazar el modelo.

### Beneficios / "Nuestro Proceso" — el peor bloque de IA
Estructura `label rojo + título + 3 cards 01/02/03 + ícono genérico + párrafo`.
Es el patrón de IA más evidente. Convertir en una **tira de proceso editorial**
(numeración + líneas finas, sin cajas simétricas).

### Entregas (clientes satisfechos)
El marquee es buen toque real. Cuidar que las fotos no se vean cortadas y el
ritmo de la sección.

### Testimonios
Las burbujas estilo WhatsApp son un toque humano y creíble — se conservan. Pero
el verde `#056162` choca con la paleta negra/roja. Ajustar hacia la paleta.

### Contacto
Hoy son "4 cajas" (patrón de IA). Volverlo más editorial y directo, con la
información real (teléfono, WhatsApp, correo, horario, ubicación). No inventar
datos.

### Footer
Se siente sin terminar. Hacerlo de marca: contacto/ubicación/horario reales,
mejor jerarquía, línea roja de firma.

### Modal / Galería
Correcto tras la ronda 1 (cierre, foco, navegación). Solo pulido visual; no
tocar la lógica.

---

## Patrón de IA #1 (transversal, crítico)

El patrón **label rojo pequeño + título gigante en mayúsculas** se repite en
*todas* las secciones (Nuestro Inventario, ¿Por qué elegirnos?, Confianza
Comprobada, Nuestra Reputación, Atención Personalizada), siempre con el mismo
guioncito rojo `::before`. Es la firma más clara de "página generada". Romperlo
a lo largo de la web: números de sección, líneas finas, overlines integrados,
asimetría — variar la fórmula sección a sección (trabajo de la Fase 7).

Otros tells a corregir de forma transversal:
- **Rojo con avaricia**: hoy aparece demasiado. Usarlo como acento puntual.
- Evitar glow/blur repetidos y sombras enormes en todo.
- **Variar el ritmo/espaciado**: hoy casi todas las secciones son `100px 40px`.
- Íconos Material genéricos restan; usarlos con moderación.
- Nada de métricas inventadas ni copy inflado.

---

## Qué NO tocar (funcionalidad)

Solo piel, nunca lógica, en: loader y bloqueo de scroll, model-viewer / 3D,
sticky de historia, filtros, búsqueda, modal, galería y carrusel. Reglas del
usuario que se respetan: no rehacer desde cero, no borrar `Modelos/LOGO 3D.glb`,
no reemplazar el 3D por imagen, no librerías pesadas, respetar
`prefers-reduced-motion`, trabajar por fases con resumen + commit al cerrar cada
una, y **no hacer push**.

---

## Sistema visual — decisiones

### Tipografía (APROBADA)
Se abandona el Montserrat uniforme (que aplanaba la identidad) por un contraste
editorial/motorsport de dos familias:

- **Barlow Condensed** → títulos, nav, labels técnicos y elementos de alto
  impacto (números, año de historia, precios display, chips de filtro, tabs).
- **Barlow** → cuerpo, párrafos, botones y UI general (inputs, valores, texto
  legible).

Criterios al aplicarla: mantener buena legibilidad, **no exagerar el tracking**
(Barlow Condensed ya es estrecho, así que se reduce el `letter-spacing` negativo
de los títulos grandes para que no queden apretados) y ajustar tamaños para que
nada se vea gigante ni comprimido. Se cargan solo los pesos usados para no pesar.

### Otros ejes (para fases siguientes)
- **Rojo**: reducir frecuencia, acento puntual.
- **Espaciado**: escala con más variedad de ritmo entre secciones.
- **Bordes/sombras/radios**: sobrios, líneas finas tipo ingeniería.
- **Botones**: peso correcto, estados hover/focus/active claros, tap targets
  cómodos (≥44px).

---

## Riesgos técnicos

- El cambio de tipografía afecta **todo** el sistema visual: revisar que ningún
  título quede apretado ni ningún cuerpo pierda legibilidad. (Fase 1)
- El pedestal CSS de la historia no debe bloquear la interacción del
  model-viewer ni el scroll táctil (`pointer-events: none`, `touch-action`).
- El 3D solo carga por **http** (Live Server / GitHub Pages), no por `file://`.
- El repo usa **CRLF**; no dejar que ninguna herramienta pase los archivos a LF.
- Cuidar performance: transform/opacity para animaciones, sin blur masivo ni
  listeners de scroll costosos.

---

## Propuesta de fases

- **Fase 0** — Revisión visual estratégica (este documento). ✅
- **Fase 1** — Sistema visual base: variables, **tipografía**, botones, spacing,
  sombras, bordes.
- **Fase 2** — Navbar motorsport/F1.
- **Fase 3** — Hero refinado (sin destruirlo).
- **Fase 4** — Historia sticky con pedestal CSS del logo 3D.
- **Fase 5** — Catálogo: tarjetas, filtros, búsqueda.
- **Fase 6** — Modal y galería.
- **Fase 7** — Secciones secundarias (matar el patrón label + título + 3 cards).
- **Fase 8** — Performance, responsive y accesibilidad.
- **Fase 9** — QA final (técnico + de taste).

Después de cada fase: resumen de cambios, archivos modificados, pruebas a hacer,
riesgos pendientes y commit. Sin push.
