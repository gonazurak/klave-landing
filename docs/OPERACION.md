# Operacion y deploy de Klave Landing

Esta guia documenta el proceso actual para que futuros agentes puedan modificar,
validar y publicar la landing sin reconstruir decisiones ya tomadas.

## Estado actual

- Repo local: `klave-landing/` dentro del workspace actual.
- Repo remoto: `https://github.com/gonazurak/klave-landing.git`.
- Produccion: `https://www.klave.com.ar/`.
- Rama de deploy: `main`.
- Hosting: Vercel.
- Build: Next.js normal en Vercel. GitHub Pages queda como compatibilidad
  estatica legacy.

## Archivos importantes

- `src/app/page.tsx`: contenido, estructura de secciones, pricing y footer.
- `src/app/globals.css`: layout responsive, estilos visuales y ajustes mobile.
- `public/brand/`: copia runtime de los logos exportados desde Figma.
- `next.config.ts`: build normal para Vercel; `output: "export"`, `basePath` y
  `assetPrefix` solo cuando `GITHUB_PAGES=true`.
- `.vercel/project.json`: link local al proyecto Vercel.
- `.github/workflows/pages.yml`: build legacy de GitHub Pages si se conserva.
- `README.md`: entrada breve del repo.
- `AGENTS.md`: instrucciones rapidas para agentes.

## Assets de marca

Los logos actuales fueron generados a partir del Figma de Klave. La fuente
compartida vive en `../assets/figma/brand/logos/`; la landing conserva una copia
en `public/brand/` porque Next sirve assets publicos desde esa carpeta.

Uso recomendado:

- `klave-logo-inverse-transparent.png`: header oscuro, footer oscuro y marcas
  internas sobre fondos oscuros.
- `klave-logo-primary-transparent.png`: contextos claros si se agregan en el
  futuro.
- Variantes con `brand-bg` o `dark-bg`: solo si se necesita el fondo incluido.
- `klave-icon-primary.svg`: favicon y app icon default.
- `klave-icon-dark.svg` y `klave-icon-inverse.svg`: variantes solo símbolo para
  superficies específicas.

No recrear el logo con texto HTML ni con SVG aproximado si el asset exportado
resuelve el caso.

Si se reemplaza un logo desde Figma, actualizar primero `../assets/figma/` y
despues sincronizar la copia necesaria en `public/brand/`.

## Desarrollo local

Instalar dependencias:

```bash
pnpm install
```

Levantar el sitio:

```bash
pnpm dev --port 3000
```

Abrir:

```text
http://localhost:3000/
```

Para revisar secciones puntuales:

```text
http://localhost:3000/#flujo
http://localhost:3000/#integraciones
http://localhost:3000/#pricing
http://localhost:3000/#seguridad
```

## Validacion antes de publicar en Vercel

Ejecutar lint:

```bash
pnpm lint
```

Ejecutar build normal:

```bash
pnpm build
```

Para validar compatibilidad estatica legacy de GitHub Pages:

```bash
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/klave-landing pnpm build
```

No editar `out/` a mano: es artefacto generado.

## QA visual minimo

Cuando el cambio toca UI, revisar al menos:

- Mobile chico: `390x844`.
- Desktop: `1440x900`.
- Hero completo.
- Preview del producto.
- Seccion `#flujo`.
- Seccion `#integraciones`.
- Seccion `#pricing`.
- Footer.

Puntos especificos ya corregidos y que no deben romperse:

- En mobile, el boton `Iniciar sesion` debe seguir visible en el header.
- Las pills del hero deben verse centradas como conjunto icono + texto dentro de
  cada caja.
- Las tarjetas de "Cobros identificados", "Pagos automaticos" y
  "Conciliacion inteligente" en el hero deben mantener padding equilibrado.
- En la preview del producto, las cajas internas de cobros, pagos y ECHEQ deben
  diferenciarse bien en mobile.
- Evitar nombres de empresas reales o placeholders raros dentro de la preview.
- Las categorias de integraciones deben ser genericas: ERP, Bancos,
  Contabilidad y API.
- La frase "Menos persecucion de comprobantes. Mas control de caja." debe tener
  una distribucion legible, no una linea larga mal cortada.
- En mobile, la tabla de pricing debe reemplazarse por cards legibles.
- La seccion de pasos de flujo debe mantenerse compacta en mobile. No volver a
  agrandar esas cajas salvo que el usuario lo pida explicitamente.

## Deploy a Vercel

El deploy productivo se hace contra el proyecto Vercel linkeado en
`.vercel/project.json`.

Publicar cambios:

```bash
git status --short
git add <archivos-del-cambio>
git commit -m "Describe el cambio"
pnpm dlx vercel --prod
```

Verificar produccion:

```bash
curl -L -s https://www.klave.com.ar/ | rg "La tesoreria digital|klave-icon-primary"
curl -I https://www.klave.com.ar/brand/klave-icon-primary.svg
```

## Deploy legacy a GitHub Pages

El deploy legacy a GitHub Pages se dispara con push a `main` o manualmente desde
GitHub Actions.

Workflow:

```text
.github/workflows/pages.yml
```

Variables usadas en el build del workflow:

```bash
GITHUB_PAGES=true
NEXT_PUBLIC_BASE_PATH=/klave-landing
```

El `basePath` es necesario porque GitHub Pages sirve el sitio bajo
`/klave-landing/`. Si cambia el nombre del repo o se publica en un dominio
custom, revisar `next.config.ts` y el workflow.

Publicar cambios legacy:

```bash
git status --short
git add README.md AGENTS.md docs/OPERACION.md src/app/page.tsx src/app/globals.css
git commit -m "Describe el cambio"
git push
```

Para cambios solo de documentacion, agregar solo los archivos de documentacion.

## Verificacion del deploy legacy

Listar la ultima corrida:

```bash
gh run list --workflow pages.yml --limit 1
```

Esperar resultado:

```bash
gh run watch <run_id> --exit-status
```

Verificar produccion:

```bash
curl -L -s https://gonazurak.github.io/klave-landing/ | rg "La tesoreria digital|klave-logo"
```

Si el HTML carga pero los estilos o assets se rompen, revisar primero:

- `NEXT_PUBLIC_BASE_PATH` en `.github/workflows/pages.yml`.
- `basePath` y `assetPrefix` en `next.config.ts`.
- Que el build haya creado `out/.nojekyll`.

## Proceso recomendado para agentes

1. Cargar el contexto de Klave y leer esta guia.
2. Revisar `git status --short` y no revertir cambios ajenos.
3. Leer los archivos afectados antes de editar.
4. Para pedidos visuales, inspeccionar la pantalla actual en browser antes de
   cambiar CSS.
5. Hacer cambios pequenos y coherentes con la estetica oscura existente.
6. Validar lint/build segun el alcance.
7. Si el usuario esta mirando produccion, hacer commit, push y esperar GitHub
   Pages antes de decir que esta publicado.
8. Documentar cualquier proceso nuevo si cambia el deploy, assets, pricing o QA.

## Pricing

La landing muestra planes Starter, Profesional, Business, Business+ y Contador.
El enfoque actual es:

- Tabla comparativa en desktop/tablet.
- Cards separadas en mobile.
- Texto debajo acotado a condiciones generales y contacto.

No volver a mostrar en la landing la explicacion interna de estrategia de
precios. Esa informacion puede vivir en documentacion interna, no en la UI
publica.

## Formularios y waitlist

La landing publica en Vercel, pero cualquier waitlist real con persistencia
requiere antes una decision explicita de runtime y datos:

- tabla o almacenamiento,
- validacion,
- honeypot,
- rate limit,
- email de confirmacion o notificacion.

No agregar Server Actions, endpoints o persistencia sin esa decision.

## Troubleshooting

Si el sitio funciona local pero falla en Vercel:

- Ejecutar `pnpm build`.
- Revisar `pnpm dlx vercel inspect <deployment-url>`.
- Confirmar variables de entorno en Vercel si el cambio depende de runtime.

Si el sitio funciona local pero falla en GitHub Pages legacy:

- Ejecutar el build con las mismas variables del workflow.
- Revisar rutas absolutas que ignoren `/klave-landing`.
- Confirmar que imagenes usen rutas compatibles con `basePath`.
- Confirmar que no se introdujeron features dinamicas incompatibles con export
  estatico.

Si el layout mobile se ve distinto a lo esperado:

- Revisar los media queries al final de `src/app/globals.css`.
- Validar en ancho `390px`.
- No corregir una seccion distinta a la que el usuario marco en captura.
- Para las pills del hero, el objetivo es centrar el grupo completo icono + texto
  dentro de la caja.
