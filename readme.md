# Header responsive para blog — HTML5, CSS3, JavaScript y WordPress

Se preparó un header responsive basado en las tres referencias visuales proporcionadas: **desktop, tablet y móvil**.

La implementación está construida con:

- HTML5 semántico.
- CSS3 responsive.
- JavaScript vanilla, sin dependencias.
- Estructura preparada para integrarse con WordPress moderno / Gutenberg.
- Clases compatibles con bloques de WordPress como:
  - `wp-block-group`
  - `wp-block-navigation`
  - `wp-block-site-title`
  - `wp-block-buttons`
  - `wp-block-button`

El paquete incluye además un patrón PHP pensado para utilizarse dentro de un **Block Theme de WordPress**.

---

## Archivos incluidos

El paquete contiene:

- `index.html`
- `style.css`
- `script.js`
- `wordpress-pattern.php`
- `README.md`

---

## Comportamiento responsive

### Desktop

En resoluciones mayores a `1024px`:

- Se muestra el logo alineado a la izquierda.
- El menú principal aparece centrado.
- Se muestran las opciones:
  - Home
  - News
  - Culture
  - Sections
- `Sections` funciona como menú desplegable.
- El botón `Subscribe` permanece alineado a la derecha.
- No se muestra el menú hamburger.

La composición sigue la referencia desktop suministrada.

---

## Tablet

En resoluciones iguales o menores a `1024px`:

- El menú principal desktop desaparece.
- El logo permanece visible.
- El botón `Subscribe` permanece visible.
- Aparece un botón hamburger.
- Al pulsar el hamburger se despliega la navegación móvil.

Esto replica la estructura visual de la referencia tablet:

`Logo | Subscribe | Hamburger`

---

## Móvil

En resoluciones iguales o menores a `600px`:

- Se reducen los márgenes laterales.
- Se reduce ligeramente el tamaño del logo.
- Se mantienen visibles:
  - Logo
  - Subscribe
  - Hamburger
- El menú continúa funcionando como navegación desplegable.

La distribución corresponde a la composición de la referencia móvil.

---

## Menú Sections

En desktop, `Sections` funciona como un submenu desplegable.

Actualmente contiene ejemplos:

- Opinion
- Interviews
- Features

Estos elementos pueden reemplazarse directamente por las categorías, páginas o secciones reales del sitio.

El submenu puede abrirse mediante:

- Hover.
- Focus mediante teclado.
- Click.

También puede cerrarse haciendo click fuera del menú.

---

## Navegación móvil

El menú mobile se controla mediante JavaScript.

El botón hamburger:

- Abre y cierra la navegación.
- Cambia visualmente a una `X` cuando está abierto.
- Actualiza correctamente `aria-expanded`.
- Actualiza el `aria-label` entre:
  - `Open navigation`
  - `Close navigation`

Al cerrar el menú principal también se cierra cualquier submenu móvil abierto.

---

## Accesibilidad

La implementación incorpora varios mecanismos de accesibilidad.

### ARIA

Se utilizan atributos como:

```html
aria-expanded
aria-controls
aria-label
```

Esto permite que lectores de pantalla puedan interpretar correctamente el estado de los menús.

### Navegación por teclado

El submenu desktop puede utilizarse mediante teclado.

También se soporta la tecla:

```text
Escape
```

Cuando se pulsa `Escape`:

- Se cierra el menú móvil.
- Se cierra el submenu desktop.
- El foco vuelve al botón correspondiente cuando aplica.

### Focus visible

Los enlaces y botones muestran un indicador de foco visible para facilitar la navegación mediante teclado.

---

## Reduced Motion

El CSS contempla:

```css
@media (prefers-reduced-motion: reduce)
```

De esta forma, si el usuario tiene configurado en su sistema operativo que prefiere animaciones reducidas, las transiciones se desactivan prácticamente por completo.

---

# Integración con WordPress

La estructura HTML standalone incorpora deliberadamente clases utilizadas por Gutenberg.

Por ejemplo:

```text
wp-block-group
wp-block-navigation
wp-block-site-title
wp-block-buttons
wp-block-button
```

Esto permite reutilizar la misma arquitectura visual dentro de WordPress sin tener que reconstruir completamente los estilos.

---

## Patrón de WordPress

Se incluye:

```text
wordpress-pattern.php
```

Este archivo sirve como base para registrar el header como un patrón de Gutenberg.

En un Block Theme puede colocarse, por ejemplo, en:

```text
/patterns/blog-header.php
```

WordPress podrá detectar ese patrón y utilizarlo desde el editor del sitio.

---

## Uso del Navigation Block de WordPress

Para una implementación real en una versión moderna de WordPress, conviene utilizar el bloque nativo:

```text
core/navigation
```

WordPress ya incorpora dentro de este bloque:

- Gestión responsive.
- Overlay mobile.
- Submenús.
- Accesibilidad.
- Integración con el Site Editor.
- Gestión visual del menú.

Por esa razón, el JavaScript personalizado incluido en este paquete está pensado principalmente para:

1. La versión HTML standalone.
2. Un tema tradicional donde se quiera controlar completamente el markup.
3. Casos donde no se utilice el Navigation Block nativo.

Dentro de un Block Theme moderno, lo recomendable es permitir que WordPress administre la lógica de navegación y reutilizar principalmente los estilos CSS.

---

# Estructura CSS

Los principales valores visuales se encuentran definidos como Custom Properties en `:root`.

Por ejemplo:

```css
:root {
  --header-bg: #4a1c04;
  --header-text: #ffffff;
  --subscribe-bg: #2d78bd;
  --subscribe-bg-hover: #2469a7;
  --header-max-width: 1440px;
  --header-desktop-height: 82px;
  --header-tablet-height: 84px;
  --header-mobile-height: 72px;
}
```

Esto permite modificar fácilmente:

- Color del header.
- Color del botón Subscribe.
- Ancho máximo.
- Alturas.
- Espaciados.
- Breakpoints.

---

## Breakpoints utilizados

La implementación utiliza dos breakpoints principales.

### Tablet

```css
@media (max-width: 1024px)
```

En este punto:

- Se oculta la navegación desktop.
- Aparece el hamburger.
- Se mantiene visible Subscribe.

### Mobile

```css
@media (max-width: 600px)
```

En este punto:

- Se reducen paddings.
- Se ajusta el tamaño del logo.
- Se reduce la separación entre elementos.
- Se mantiene la misma lógica de navegación mobile.

---

# Logo

Actualmente el ejemplo utiliza texto:

```html
<span>Logo</span>
```

con una tipografía cursiva del sistema para aproximarse visualmente a la referencia.

En producción puede reemplazarse por:

```html
<img src="logo.svg" alt="Nombre del sitio">
```

o, dentro de WordPress, utilizar directamente:

```text
Site Logo Block
```

Esto sería preferible porque permite administrar el logo desde el Site Editor.

---

# Botón Subscribe

El botón `Subscribe` se mantiene visible en los tres tamaños:

- Desktop.
- Tablet.
- Mobile.

Esto replica el comportamiento mostrado en las referencias.

Su URL actual es:

```text
/subscribe/
```

Puede reemplazarse por:

- Una página de suscripción.
- Newsletter.
- Membresía.
- Checkout.
- URL externa.

---

# Recomendación para WordPress Latest

Para WordPress moderno, la arquitectura recomendada sería:

```text
Header
├── Site Logo
├── Navigation
│   ├── Home
│   ├── News
│   ├── Culture
│   └── Sections
│       ├── Opinion
│       ├── Interviews
│       └── Features
└── Buttons
    └── Subscribe
```

Estos elementos deberían implementarse utilizando bloques nativos siempre que sea posible.

El CSS personalizado se encarga de reproducir el diseño visual, mientras que WordPress se encarga de la administración de contenido y navegación.

---

# Ventajas de esta implementación

La solución está preparada para ser:

- Responsive.
- Semántica.
- Accesible.
- Independiente de frameworks JavaScript.
- Compatible con Gutenberg.
- Fácil de adaptar a un Block Theme.
- Fácil de convertir en Pattern.
- Fácil de mantener mediante variables CSS.
- Compatible con navegación mediante teclado.
- Compatible con preferencias de reducción de movimiento.

---

# Estructura del paquete

```text
blog-header-wordpress/
│
├── index.html
├── style.css
├── script.js
├── wordpress-pattern.php
└── README.md
```

El archivo comprimido original contiene todos estos recursos listos para utilizarse como base de implementación.
