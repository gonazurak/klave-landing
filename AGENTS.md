# Klave Landing - Guia para agentes

Este repo contiene la landing pre-MVP de Klave. Antes de editar, cargar el
contexto de Klave si esta disponible y revisar `docs/OPERACION.md`.

## Contexto del producto

Klave se presenta como "La tesoreria digital de tu empresa". La landing apunta a
empresas argentinas que necesitan cobrar identificado, pagar automatizado,
conciliar con ERP y tener visibilidad de caja multi-banco. No describir el
producto como billetera, banco, custodia de fondos ni plataforma para empresas
genericas.

## Stack y deploy

- Next.js 16, React 19, Tailwind v4.
- Produccion corre en Vercel con build normal de Next.js.
- GitHub Pages queda como compatibilidad estatica legacy desde el workflow
  `.github/workflows/pages.yml`.
- La URL productiva actual es `https://www.klave.com.ar/`.
- Para el build estatico legacy de Pages, usar `GITHUB_PAGES=true` y
  `NEXT_PUBLIC_BASE_PATH=/klave-landing`.

## Comandos base

```bash
pnpm install
pnpm dev --port 3000
pnpm lint
pnpm build
pnpm dlx vercel --prod
```

## Proceso de cambio

1. Revisar estado: `git status --short`.
2. Leer los archivos antes de editar. Para UI, los archivos principales son
   `src/app/page.tsx` y `src/app/globals.css`.
3. Hacer cambios acotados. No editar `out/` manualmente.
4. Validar con `pnpm lint` y `pnpm build`.
5. Revisar visualmente desktop y mobile en local antes de entregar.
6. Desplegar a Vercel si el usuario espera ver el cambio publicado.
7. Verificar la URL productiva en Vercel.

## Guardrails visuales actuales

- Mantener la version oscura del concepto visual.
- Usar el logo real exportado de Figma. La fuente compartida vive en
  `../assets/figma/brand/logos/`; `public/brand/` es la copia runtime que sirve
  la landing.
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

La landing publica en Vercel, pero no agregar persistencia propia o formularios
con backend sin decidir antes el runtime, las tablas, el rate limit y el
servicio de email.
