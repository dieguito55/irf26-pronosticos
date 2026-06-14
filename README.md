# Polla Mundialista IRF26

Plataforma publica y estatica para seguir los pronosticos de la fase de grupos del Mundial 2026. Muestra ranking, podio provisional, detalle por participante, tablas A-L, rondas, sistema de puntuacion y metadatos de actualizacion nocturna.

## Tecnologias

- React + Vite + TypeScript estricto.
- Tailwind CSS para el sistema visual.
- Framer Motion para animaciones.
- Lucide React para iconografia.
- JSON publicos en `public/data`.
- Python estandar para actualizacion, validacion y calculo.
- GitHub Actions + GitHub Pages.

## Comandos locales

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test
python scripts/validate_data.py
python scripts/update_results.py
```

## Datos publicos

Los participantes se editan en `public/data/participants.json`. Cada participante debe tener 12 grupos y 2 selecciones por grupo. No agregues correos, telefonos, comprobantes, informacion bancaria ni enlaces privados.

Archivos principales:

- `participants.json`: nombres publicos y pronosticos.
- `standings.json`: clasificacion provisional por grupo.
- `ranking.json`: ranking publico.
- `tournament.json`: estado del torneo, rondas y sincronizacion.
- `manual-results.json`: fallback manual cuando la fuente publica no entregue datos.

## Fuente publica de resultados

La actualizacion automatica usa el JSON publico de OpenFootball:

```text
https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json
```

No requiere `.env`, token, clave ni credenciales.

## Actualizacion automatica

`.github/workflows/update-results.yml` corre todos los dias a las 00:35 usando la zona horaria `America/Lima`.

El flujo hace esto:

1. Valida los JSON actuales.
2. Ejecuta `python scripts/update_results.py`.
3. Descarga resultados finalizados de fase de grupos desde OpenFootball.
4. Recalcula `standings.json`, `ranking.json` y `tournament.json`.
5. Hace commit solo si existen cambios.
6. Dispara el workflow de publicacion de GitHub Pages.

## Actualizacion manual

Si la fuente publica todavia no tiene un marcador, puedes colocar partidos finalizados en `public/data/manual-results.json` con este formato:

```json
{
  "matches": [
    {
      "group": "A",
      "homeTeam": "Mexico",
      "awayTeam": "South Africa",
      "homeScore": 2,
      "awayScore": 0,
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

El workflow `deploy.yml` instala dependencias, ejecuta lint, build y pruebas, y publica `dist` en GitHub Pages. En el repositorio, Pages debe estar configurado con GitHub Actions como fuente.

## Solucion de errores comunes

- Si falla la carga de datos, ejecuta `python scripts/validate_data.py`.
- Si no aparecen cambios de ranking, revisa que `standings.json` tenga `topTwo` por cada grupo.
- Si GitHub Actions no actualiza resultados, revisa si OpenFootball ya publico el marcador del partido.
- Si Pages muestra rutas rotas, verifica que `vite.config.ts` mantenga `base: "/irf26-pronosticos/"`.
