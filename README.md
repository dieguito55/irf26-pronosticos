# Polla Mundialista IRF26

Plataforma pública y estática para seguir los pronósticos de la fase de grupos del Mundial 2026 dentro del contexto IRF26. Muestra ranking, podio provisional, detalle por participante, tablas A-L, rondas, sistema de puntuación y metadatos de actualización nocturna.

## Tecnologías

- React + Vite + TypeScript estricto.
- Tailwind CSS para el sistema visual.
- Framer Motion para animaciones sutiles.
- Lucide React para iconografía.
- JSON públicos en `public/data`.
- Python estándar para actualización, validación y cálculo.
- GitHub Actions + GitHub Pages.

## Instalación

```bash
npm install
npm run dev
```

La app quedará disponible en la URL local que indique Vite.

## Comandos

```bash
npm run dev
npm run build
npm run lint
npm run test
python scripts/validate_data.py
python scripts/update_results.py
```

## Datos públicos

Los participantes se editan en `public/data/participants.json`. Cada participante debe tener 12 grupos y 2 selecciones por grupo. No agregues correos, teléfonos, comprobantes, marcas de tiempo originales ni enlaces privados.

Archivos principales:

- `participants.json`: nombres públicos y pronósticos.
- `standings.json`: clasificación provisional por grupo.
- `ranking.json`: ranking público.
- `tournament.json`: estado de torneo, rondas y sincronización.
- `manual-results.json`: fallback manual cuando la API no entregue datos.

## API deportiva

Configura variables en `.env` o en GitHub Actions:

```env
FOOTBALL_API_URL=
FOOTBALL_API_TOKEN=
COMPETITION_ID=
SEASON=2026
```

La clave debe guardarse en GitHub Settings -> Secrets and variables -> Actions -> `FOOTBALL_API_TOKEN`. No se incluye ninguna clave en el código.

## Actualización manual

Si la API todavía no devuelve datos, coloca partidos finalizados en `public/data/manual-results.json` con campos como:

```json
{
  "matches": [
    {
      "group": "A",
      "homeTeam": "México",
      "awayTeam": "República de Corea",
      "homeScore": 2,
      "awayScore": 1,
      "status": "finished",
      "stage": "group",
      "round": 1
    }
  ]
}
```

Luego ejecuta:

```bash
python scripts/update_results.py
```

## GitHub Pages

El workflow `deploy.yml` instala dependencias, ejecuta lint, build y pruebas, y publica `dist` en GitHub Pages. En el repositorio activa Pages usando GitHub Actions como fuente.

## Actualización automática

`update-results.yml` corre todos los días a las 00:35 usando la zona horaria `America/Lima`. Valida datos, consulta API o fallback manual, recalcula ranking y hace commit solo si existen cambios con:

```text
chore: actualizar resultados y ranking
```

## Reemplazar logo e imágenes

- Logo: reemplaza `public/assets/irf26-logo.svg` por el archivo oficial sin cambiar su ruta.
- Portada: reemplaza `public/assets/stadium.svg` por una imagen propia o libre de uso comercial y actualiza créditos si corresponde.
- Patrón: reemplaza `public/assets/football-pattern.svg` si quieres una textura distinta.

## Privacidad

Esta plataforma muestra únicamente información pública de seguimiento de pronósticos. No debe almacenar correos electrónicos, números telefónicos, comprobantes, información bancaria ni enlaces privados.

## Solución de errores comunes

- Si falla la carga de datos, ejecuta `python scripts/validate_data.py`.
- Si no aparecen cambios de ranking, revisa que `standings.json` tenga `topTwo` por cada grupo.
- Si GitHub Actions no consulta la API, confirma que `FOOTBALL_API_TOKEN` esté en Secrets y no en el repositorio.
- Si Pages muestra rutas rotas, verifica que `vite.config.ts` mantenga `base: "/irf26-pronosticos/"` y que el repositorio tenga exactamente ese nombre.
