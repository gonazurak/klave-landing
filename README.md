# Klave Landing

Landing estática para Klave: tesorería digital B2B con hero oscuro, dashboard
de producto y formulario de waitlist.

## Documentación operativa

- [Guía para agentes](./AGENTS.md): contexto rápido, reglas de UI y comandos
  que debe seguir cualquier agente antes de tocar el sitio.
- [Operación y deploy](./docs/OPERACION.md): proceso completo para desarrollar,
  validar, publicar en Vercel y revisar producción.

## Desarrollo local

```bash
pnpm dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
```

Next genera el build productivo. Cuando `GITHUB_PAGES=true`, mantiene una salida
estatica compatible con GitHub Pages legacy.

## Vercel

El deploy productivo es Vercel. La app usa build normal de Next.js salvo cuando
`GITHUB_PAGES=true`, caso en el que mantiene `output: "export"` para publicar
preview estático legacy en GitHub Pages.

```bash
pnpm dlx vercel
pnpm dlx vercel --prod
```

Variables a configurar en Vercel cuando existan credenciales:

```text
DATABASE_URL
RESEND_API_KEY
WAITLIST_NOTIFICATION_TO
WAITLIST_FROM_EMAIL
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_POSTHOG_KEY
NEXT_PUBLIC_POSTHOG_HOST
```

## GitHub Pages legacy

El workflow `.github/workflows/pages.yml` conserva compatibilidad estatica con
GitHub Pages cuando se pushea a `main`.

Para un repo llamado `klave-landing`, la URL queda:

```text
https://<usuario>.github.io/klave-landing/
```

Si el repo tiene otro nombre, cambiá `NEXT_PUBLIC_BASE_PATH` en el workflow.

En GitHub, activá Pages con `Settings -> Pages -> Source: GitHub Actions`.

El repo legacy publica en:

```text
https://gonazurak.github.io/klave-landing/
```
