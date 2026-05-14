# Klave Landing

Landing estática para Klave: tesorería digital B2B con hero oscuro, dashboard
de producto y formulario de waitlist.

## Documentación operativa

- [Guía para agentes](./AGENTS.md): contexto rápido, reglas de UI y comandos
  que debe seguir cualquier agente antes de tocar el sitio.
- [Operación y deploy](./docs/OPERACION.md): proceso completo para desarrollar,
  validar, publicar en GitHub Pages y revisar producción.

## Desarrollo local

```bash
pnpm dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Build estático

```bash
pnpm build
```

Next genera la versión exportable en `out/`.

## GitHub Pages

El workflow `.github/workflows/pages.yml` publica el sitio en GitHub Pages
cuando se pushea a `main`.

Para un repo llamado `klave-landing`, la URL queda:

```text
https://<usuario>.github.io/klave-landing/
```

Si el repo tiene otro nombre, cambiá `NEXT_PUBLIC_BASE_PATH` en el workflow.

En GitHub, activá Pages con `Settings -> Pages -> Source: GitHub Actions`.

El repo actual publica en:

```text
https://gonazurak.github.io/klave-landing/
```
