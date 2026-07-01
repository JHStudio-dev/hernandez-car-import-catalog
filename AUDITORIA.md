# Auditoría inicial — Hernández Car Import (catálogo)

Fecha: 2026-07-01 · Rama: `mejoras-catalogo` · Árbol de trabajo limpio al iniciar.

Esta auditoría es **solo lectura**: no se modificó ningún archivo funcional del sitio.
Sirve como base para las fases de mejora quirúrgica. Cada hallazgo cita `archivo:línea`.

---

## 1. Problemas encontrados (por severidad)

### 🔴 CRÍTICOS (rompen uso real)

1. **El loader puede dejar atrapado al usuario.**
   El botón "Entrar al catálogo" solo se revela dentro del evento `model-visibility`
   del modelo 3D (`js/app.js:487-505`). Si el `.glb` falla, tarda o el script de
   `model-viewer` no carga (sin internet, CDN caído), el evento nunca dispara y el
   botón queda `opacity:0; visibility:hidden` para siempre → **no hay forma de entrar.**
   No existe timeout de respaldo. Viola la regla 13 y el requisito del loader.

2. **El loader no bloquea el scroll y no reposiciona arriba al entrar.**
   El overlay es `position:fixed` (`css/styles.css:2363`) pero nada pone
   `overflow:hidden` en el `body`, así que el fondo se puede scrollear detrás del loader.
   Al pulsar "Entrar" (`js/app.js:508-513`) solo se oculta el overlay: no hay
   `window.scrollTo(0,0)` ni `history.scrollRestoration="manual"`, por eso el catálogo
   puede aparecer más abajo. Es exactamente el "problema especial del loader/scroll".

3. **HTML del loader duplicado / mal cerrado.**
   `index.html:41-44` repite `<p class="jh-loader-text">` y cierra dos `</div>` de más
   (sin apertura correspondiente). Esto deja un nodo `<p>` huérfano suelto en el `<body>`,
   antes del header, que puede empujar el contenido y mostrar texto perdido.

4. **Filtros y contadores fallan por mayúsculas/minúsculas.**
   El filtrado compara `v.tipo === 'suv'` (`js/app.js:79-81, 131`) pero en los datos hay
   `tipo: "SUV"` (`js/data.js:79`) y `tipo: "Todoterreno"` (`js/data.js:50`) con mayúscula.
   Resultado: el Explorer Limited no aparece en el filtro SUV, el Wrangler 2008 no aparece
   en Todoterreno, y los contadores de cada chip quedan mal.

### 🟠 ALTOS

5. **La tipografía no es la que se cree.**
   El HTML carga `Barlow` / `Barlow Condensed` (`index.html:11`), pero el CSS declara
   `--font-display: 'Montserrat'` (`css/styles.css:27-29`). Montserrat no se carga en
   ninguna parte, así que el sitio cae a la fuente del sistema (Arial/sans-serif) y se
   pierde la identidad tipográfica. Hay que unificar (cargar Montserrat o usar Barlow).

6. **Imágenes placeholder externas + sin fallback.**
   8 vehículos (ids 4,5,6,7,8,10,11,12) usan URLs de Unsplash repetidas como galería
   (`js/data.js`). Dependen de red y una de las URLs parece inválida. Ningún `<img>` tiene
   `onerror`, así que un fallo muestra el ícono de imagen rota.

7. **Búsqueda limitada.**
   `performSearch` solo mira marca, modelo, año y tipo (`js/app.js:154-159`).
   Falta versión (trim), precio, motor, transmisión, tracción y tags.

8. **Accesibilidad de controles.**
   Botones de solo ícono sin `aria-label`: flechas del hero (`index.html:138-143`),
   flechas de galería, toggle de ajuste, cerrar modal, FAB de WhatsApp. Las tarjetas son
   `<div onclick>` (`js/app.js:97`) → no accesibles por teclado. No hay estilos
   `:focus-visible` en ningún control.

### 🟡 MEDIOS

9. **Lógica de la sección Historia duplicada y confusa.**
   `js/app.js:517-648`: `return` duplicado (530-531); bloque responsive que se re-ejecuta
   en **cada** `mousemove` (581-590); dos mecanismos de rotación en conflicto (el rAF
   `animateMouse` con `targetX/Y` que nunca se actualizan, contra `camera-orbit`);
   dos handlers `mouseleave`. Funciona de milagro pero es frágil y desperdicia CPU.

10. **Código muerto.**
    - `renderEntregas` engancha un toggle `#toggleDeliveryFit` que no existe en el HTML
      (`js/app.js:404-418`).
    - CSS sin uso: `.search-section/.search-container/.search-input-wrap` (no hay ese HTML),
      `.jh-unit-card__year`, `.element-visible`, `.fade-out`, `.jh-btn-enter--ready`,
      `@keyframes pulse` duplicado, `@keyframes marquee/slideRight/logo-float` sin uso.

11. **`onclick` inline.**
    `openDetail(...)` y `setMainImage(...)` van inline en el HTML generado
    (`js/app.js:44, 97, 250`). Mejor delegación de eventos.

12. **Datos inconsistentes / placeholder (NO inventar, marcar "Por confirmar").**
    - Precios repetidos "$28,500" en 9 autos; "$278,000" en el Wrangler 2008 (sospechoso).
    - `km: "12,000 km"` repetido en casi todos; mezcla "km" / "Millas".
    - Descripción "SUV compacta vanguardista..." copiada en muchos autos, incluso pickups/jeeps.
    - `feature_tags` con vacíos y "No definido" (`js/data.js:58`).
    - `is_featured_unit: true` en los 12 → el hero tiene 12 slides.
    - `unit_condition: "nuevo"` en autos de 1999/2008.

13. **Detalles de modal/WhatsApp.**
    - El botón cerrar usa el ícono de flecha (`index.html:409-411`), no una X.
    - Dos destinos de WhatsApp distintos: `wa.me/message/YQKHNQ2VJWVZB1` (contacto y FAB)
      vs `wa.me/50432136000?text=...` (modal, `js/data.js:5`).

### 🟢 BAJOS

14. Copy "de plantilla/IA": `<title>...Catálogo Premium</title>` (`index.html:7`),
    tagline fija "Ingeniería global, entregada en tu puerta." (`js/app.js:42`),
    "Inventario Exclusivo". Suavizar en fase visual.
15. Falta `<meta name="description">` y favicon.
16. `auto.tech_specs['Motor']` se accede directo en la tarjeta (`js/app.js:114`): si un
    futuro auto no trae "Motor", saldrá `undefined`.

---

## 2. Riesgos principales

- **Loader/scroll (fases 1-2):** tocar el orden de eventos puede romper la entrada.
  Mitigar con timeout de respaldo + probar con y sin modelo.
- **Sección Historia:** depende de `position:sticky` + cálculo de scroll. Limpiar sin
  cambiar el comportamiento visual; probar en desktop y móvil.
- **Cambio de tipografía:** afecta espaciados y saltos de línea en todo el sitio.
- **Normalizar `tipo` en datos:** debe hacerse en minúsculas y en un solo lugar; verificar
  que no afecte thumbs ni badges.
- **No inventar datos:** los placeholders se marcan "Por confirmar", no se rellenan.

---

## 3. Plan de trabajo por fases

| Fase | Objetivo | Archivos | Commit sugerido |
|------|----------|----------|-----------------|
| 0 | Auditoría (este documento) | `AUDITORIA.md` | `Auditar estructura inicial del catalogo` |
| 1 | Loader: scroll-lock, scrollTo(0,0), scrollRestoration, timeout de respaldo, HTML duplicado, reduced-motion | `index.html` `css/styles.css` `js/app.js` | `Corregir loader y bloqueo de scroll` |
| 2 | Estabilidad modelo 3D (loader + historia) con fallback | `index.html` `css/styles.css` `js/app.js` | `Mejorar estabilidad del modelo 3D` |
| 3 | Botones, hitbox ≥44-48px, aria-label, focus-visible, delegación | `index.html` `css/styles.css` `js/app.js` | `Mejorar botones y areas clickeables` |
| 4 | Normalizar `tipo`, buscar por más campos, fallback de imagen, "Por confirmar" | `js/data.js` `js/app.js` `css/styles.css` | `Corregir filtros y busqueda del catalogo` |
| 5 | Modal: cierre X/Esc/overlay, scroll-lock, galería/hitbox móvil | `index.html` `css/styles.css` `js/app.js` | `Mejorar modal y galeria de vehiculos` |
| 6 | Pulido visual (misma identidad: negro/rojo/blanco), tipografía, copy anti-IA | `index.html` `css/styles.css` `js/app.js` | `Pulir diseño visual del catalogo` |
| 7 | Responsive + accesibilidad final | `index.html` `css/styles.css` `js/app.js` | `Mejorar responsive y accesibilidad` |
| 8 | Limpieza de código muerto y orden | `index.html` `css/styles.css` `js/app.js` `js/data.js` | `Limpiar estructura del codigo` |
| 9 | QA final | `.` | `Realizar QA final del catalogo` |

Cada fase termina con el proyecto funcionando y un commit local separado.

---

## 4. Reglas que se respetarán en todo el trabajo

- No borrar `Modelos/LOGO 3D.glb` ni `model-viewer`.
- No cambiar rutas sin actualizar todas las referencias.
- No rehacer el sitio; mejora quirúrgica sobre la estructura actual.
- Mantener la esencia visual (negro, rojo, blanco, automotriz).
- No inventar datos de vehículos → "Por confirmar".
- Sin errores en consola. Sin loader bloqueante tras entrar.
- Commits pequeños y separados; sin push hasta que se pida.
