# Klave Landing - Guia para agentes

Este repo contiene la landing pre-MVP de Klave. Antes de editar, cargar el
contexto de Klave si esta disponible y revisar `docs/OPERACION.md`.

## Contexto del producto

Klave se presenta como "La tesoreria digital de tu empresa". La landing apunta a
empresas B2B argentinas que necesitan cobrar identificado, pagar automatizado,
conciliar con ERP y tener visibilidad de caja multi-banco. No describir el
producto como billetera, banco, custodia de fondos ni plataforma para pymes
genericas.

## Stack y deploy

- Next.js 16, React 19, Tailwind v4.
- El sitio esta configurado como export estatico con `output: "export"` en
  `next.config.ts`.
- GitHub Pages publica desde el workflow `.github/workflows/pages.yml`.
- La URL productiva actual es `https://gonazurak.github.io/klave-landing/`.
- Para Pages, el build usa `GITHUB_PAGES=true` y
  `NEXT_PUBLIC_BASE_PATH=/klave-landing`.

## Comandos base

```bash
pnpm install
pnpm dev --port 3000
pnpm lint
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/klave-landing pnpm build
```

## Proceso de cambio

1. Revisar estado: `git status --short`.
2. Leer los archivos antes de editar. Para UI, los archivos principales son
   `src/app/page.tsx` y `src/app/globals.css`.
3. Hacer cambios acotados. No editar `out/` manualmente.
4. Validar con `pnpm lint` y, si el cambio afecta layout, con build de Pages.
5. Revisar visualmente desktop y mobile en local antes de entregar.
6. Commit y push a `main` si el usuario espera ver el cambio publicado.
7. Verificar el workflow de GitHub Pages con `gh run list` y `gh run watch`.

## Guardrails visuales actuales

- Mantener la version oscura del concepto visual.
- Usar el logo real exportado de Figma desde `public/brand/`.
- En header y footer oscuros, usar `klave-logo-inverse-transparent.png`.
- El hero debe decir "La tesoreria digital de tu empresa".
- Las tres pills del hero deben quedar centradas como grupo icono + texto dentro
  de cada caja, especialmente en mobile.
- No volver a centrar verticalmente las tarjetas de "Del pago entrante a la
  conciliacion..." en mobile. Esa seccion debe quedar compacta tipo fila, con
  icono a la izquierda y texto a la derecha.
- En integraciones, usar categorias generales como ERP, Bancos, Contabilidad y
  API. Evitar nombres propios de proveedores.
- En pricing, desktop/tablet usa tabla comparativa y mobile usa cards.
- No reincorporar el texto explicativo interno sobre la logica de pricing
  ("Starter y Profesional priorizan...").

## Limitaciones importantes

El deploy actual es estatico. No se puede depender de Server Actions ni de
backend runtime en GitHub Pages. Si se implementa waitlist real, formularios con
persistencia o endpoints, primero hay que cambiar la estrategia de runtime o
agregar un servicio externo aprobado por el usuario.

