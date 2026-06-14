Actúa como arquitecto de software senior, diseñador UI/UX premium, desarrollador frontend especializado en React y especialista en visualización de datos deportivos.

Necesito que construyas desde cero una plataforma web completa, moderna, responsive y lista para producción llamada:

# Polla Mundialista IRF26

La plataforma será un tablero informativo para visualizar el avance de los pronósticos realizados antes del inicio del Mundial 2026.

No debe permitir nuevos registros, pagos, edición de pronósticos ni carga de comprobantes. Los participantes y sus selecciones ya están definidos previamente.

La plataforma debe consultar resultados deportivos automáticamente cada noche, actualizar las posiciones provisionales de los grupos, calcular el puntaje de cada participante y publicar el ranking actualizado.

---

# 1. OBJETIVO GENERAL

Crear una plataforma pública y profesional para:

* Mostrar el ranking de 10 participantes.
* Visualizar el puntaje provisional de cada participante.
* Mostrar sus pronósticos por cada uno de los 12 grupos.
* Mostrar la clasificación provisional de los grupos A–L.
* Actualizar automáticamente los resultados cada noche.
* Informar cuántos partidos se han procesado de los 72 partidos de fase de grupos.
* Indicar la ronda actual: Ronda 1, Ronda 2, Ronda 3 o Finalizado.
* Mostrar la fecha y hora de la última actualización.
* Funcionar perfectamente en celulares, tablets y computadoras.
* Poder desplegarse gratuitamente en GitHub Pages.
* Poder actualizar sus datos mediante GitHub Actions sin servidor propio.

La plataforma solo manejará la fase de grupos.

Datos generales:

* Participantes: 10
* Grupos: 12
* Selecciones por grupo: 4
* Partidos de fase de grupos: 72
* Partidos por ronda: 24
* Rondas: 3
* Pronósticos por participante: 24 selecciones
* Puntaje máximo: 24 puntos

---

# 2. IDENTIDAD VISUAL DE IRF26

El diseño debe inspirarse en la identidad visual del Impact Regional Fellowship 2026.

Usar una estética:

* Institucional.
* Tecnológica.
* Deportiva.
* Juvenil.
* Premium.
* Moderna.
* Con sensación de evento internacional.
* Elegante, no infantil.
* Oscura, pero con excelente contraste.

Paleta principal aproximada:

* Fondo negro profundo: `#080A0D`
* Fondo azul carbón: `#11161D`
* Superficie de tarjetas: `#171D25`
* Superficie elevada: `#202731`
* Amarillo IRF principal: `#FFB71B`
* Amarillo brillante: `#FFC72C`
* Amarillo suave: `#FFD76A`
* Blanco principal: `#F8F9FB`
* Gris claro: `#C5CAD3`
* Gris secundario: `#8F97A4`
* Bordes oscuros: `rgba(255,255,255,0.10)`
* Verde para aciertos: `#2ED47A`
* Rojo para errores: `#FF5E68`
* Azul informativo: `#4DA3FF`

Usar el logotipo oficial de IRF26 proporcionado por el usuario.

No rediseñar ni alterar el logotipo.

Si el archivo del logotipo aún no está disponible, dejar un componente claramente identificado para reemplazarlo:

```tsx
<img src="/assets/irf26-logo.svg" alt="IRF26" />
```

---

# 3. IMÁGENES Y RECURSOS VISUALES

Utilizar solamente imágenes gratuitas o libres de uso comercial.

Usar fotografías relacionadas con:

* Estadios de fútbol.
* Canchas iluminadas.
* Balones de fútbol.
* Aficionados vistos de forma general.
* Luces de estadio.
* Texturas deportivas.
* Confeti abstracto.
* Redes de portería.

Las imágenes pueden obtenerse de servicios como:

* Unsplash.
* Pexels.
* Pixabay.

No usar:

* Logotipo oficial de FIFA.
* Logotipo oficial del Mundial.
* Mascotas oficiales.
* Fotografías protegidas de jugadores reconocibles.
* Material gráfico que pueda generar problemas de propiedad intelectual.

La portada puede usar una imagen panorámica de un estadio nocturno con un overlay oscuro y degradados amarillos.

Añadir créditos de las imágenes en una sección discreta del footer si la licencia lo requiere.

---

# 4. TECNOLOGÍAS

Construir el proyecto con:

* React.
* Vite.
* TypeScript.
* Tailwind CSS.
* Framer Motion para animaciones.
* Lucide React para iconografía.
* Recharts únicamente si se utiliza algún gráfico.
* Python para la tarea de actualización nocturna.
* GitHub Actions para ejecutar la actualización automática.
* GitHub Pages para despliegue gratuito.
* Archivos JSON para almacenar información pública.

No usar:

* Firebase.
* Supabase.
* PostgreSQL.
* MySQL.
* Servidor VPS.
* Servicios de pago.
* Backend permanente.
* Autenticación.
* Panel administrativo complejo.

El proyecto debe funcionar como una página estática.

---

# 5. ESTRUCTURA DEL PROYECTO

Crear una estructura organizada como:

```text
irf26-pronosticos/
├── public/
│   ├── assets/
│   │   ├── irf26-logo.svg
│   │   ├── stadium.webp
│   │   └── football-pattern.svg
│   └── data/
│       ├── participants.json
│       ├── tournament.json
│       ├── standings.json
│       └── ranking.json
├── scripts/
│   ├── update_results.py
│   ├── calculate_standings.py
│   ├── calculate_ranking.py
│   └── validate_data.py
├── src/
│   ├── components/
│   ├── sections/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── .github/
│   └── workflows/
│       ├── deploy.yml
│       └── update-results.yml
├── .env.example
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

---

# 6. DISEÑO GENERAL

La plataforma debe parecer una aplicación deportiva premium.

No crear una página vacía con una sola tabla.

Debe incluir:

1. Header institucional.
2. Hero deportivo.
3. Resumen de competencia.
4. Indicador de ronda actual.
5. Podio de los tres primeros.
6. Ranking completo.
7. Detalle de cada participante.
8. Pronósticos por grupos.
9. Clasificación actual de los grupos.
10. Cronología de las tres rondas.
11. Información sobre el sistema de puntuación.
12. Footer institucional.

Usar un ancho máximo aproximado de 1440 px.

Mantener buena cantidad de espacio en blanco o espacio negativo.

Evitar saturar la página.

---

# 7. HEADER

Crear un header fijo o sticky con:

* Logotipo de IRF26 a la izquierda.
* Texto: “Polla Mundialista”.
* Navegación:

  * Inicio
  * Ranking
  * Participantes
  * Grupos
  * Cómo funciona
* Indicador de estado:

  * “En vivo”
  * “Actualizado”
  * “Finalizado”
* Botón secundario:

  * “Sitio oficial IRF26”

El header debe tener:

* Fondo translúcido oscuro.
* Efecto backdrop blur.
* Borde inferior sutil.
* Transición al hacer scroll.
* Menú hamburguesa en móvil.

No incluir botones de inscripción, pago, Yape ni registro.

---

# 8. HERO PRINCIPAL

Crear un hero de alto impacto visual.

Fondo:

* Imagen nocturna de estadio.
* Overlay negro con opacidad.
* Degradado azul carbón.
* Halo amarillo sutil.
* Patrón abstracto deportivo.

Contenido:

Etiqueta superior:

```text
MUNDIAL 2026 · FASE DE GRUPOS
```

Título:

```text
Polla Mundialista
IRF26
```

Subtítulo:

```text
Sigue el avance de los pronósticos, revisa la tabla de posiciones y descubre quién lidera la competencia.
```

Agregar dos botones:

* “Ver ranking”
* “Explorar pronósticos”

Agregar debajo:

```text
Actualización automática cada noche
```

Mostrar un pequeño indicador animado de sincronización.

En el lado derecho o parte inferior, mostrar una composición visual con:

* Balón abstracto.
* Líneas de cancha.
* Estadísticas.
* Indicador de ronda.
* Partidos procesados.
* Puntaje máximo.

Ejemplo:

```text
Ronda actual
Ronda 1 de 3

Partidos procesados
18 / 72

Última actualización
14 jun. 2026 · 12:35 a. m.
```

---

# 9. TARJETAS DE RESUMEN

Después del hero, mostrar tarjetas premium con:

* 10 participantes.
* 12 grupos.
* 72 partidos.
* 24 puntos máximos.
* Ronda actual.
* Próxima actualización.

Cada tarjeta debe tener:

* Icono.
* Número grande.
* Etiqueta.
* Microanimación al aparecer.
* Fondo oscuro.
* Borde sutil.
* Glow amarillo muy moderado.
* Hover elegante.

No exagerar los efectos.

---

# 10. PODIO

Crear una sección destacada para los tres primeros participantes.

Diseño:

* Segundo puesto a la izquierda.
* Primer puesto al centro y más elevado.
* Tercer puesto a la derecha.

Cada tarjeta debe mostrar:

* Posición.
* Primer nombre.
* Inicial del apellido cuando sea necesaria.
* Puntaje.
* Número de aciertos.
* Diferencia con el líder.
* Avatar generado únicamente con iniciales.
* Indicador de movimiento:

  * Subió.
  * Bajó.
  * Se mantuvo.

No usar fotografías reales.

Primer puesto:

* Borde amarillo.
* Ícono de corona.
* Glow elegante.
* Animación de brillo muy sutil.

No mostrar un ganador definitivo mientras la fase de grupos no haya terminado.

Usar términos:

* “Líder provisional”
* “Clasificación provisional”

---

# 11. RANKING COMPLETO

Crear una tabla moderna y responsive.

Columnas de escritorio:

* Posición.
* Participante.
* Puntaje.
* Aciertos.
* Grupos perfectos.
* Cambio de posición.
* Última actualización.
* Acción “Ver detalle”.

En móvil, convertir cada fila en una tarjeta compacta.

Funciones:

* Buscar participante.
* Ordenar por puntaje.
* Filtrar por:

  * Todos.
  * Top 3.
  * Empatados.
* Resaltar empates.
* Mantener la posición compartida en caso de empate.
* Abrir detalle en modal o drawer lateral.

Ejemplo de empate:

```text
1.º Eduardo — 14 puntos
1.º Mónica — 14 puntos
3.º Kevin — 13 puntos
```

No forzar posiciones distintas cuando el puntaje sea igual.

---

# 12. DETALLE DEL PARTICIPANTE

Al seleccionar un participante, mostrar un modal, drawer o página de detalle.

Encabezado:

```text
Eduardo F.
14 de 24 puntos
```

Indicadores:

* Puntaje actual.
* Aciertos totales.
* Grupos con dos aciertos.
* Grupos con un acierto.
* Grupos sin aciertos.
* Posición actual.

Mostrar los 12 grupos en tarjetas.

Cada tarjeta debe mostrar:

* Grupo.
* Dos selecciones pronosticadas.
* Primer y segundo puesto provisional.
* Puntaje obtenido en ese grupo:

  * 0/2
  * 1/2
  * 2/2
* Estado visual:

  * Verde: acierto.
  * Amarillo: resultado provisional.
  * Gris: pendiente.
  * Rojo suave: selección fuera del top 2 provisional.

Agregar una barra de progreso:

```text
14 / 24 puntos
```

Los resultados provisionales no deben presentarse como definitivos.

---

# 13. CLASIFICACIÓN POR GRUPOS

Crear una sección con pestañas o cuadrícula para los grupos A–L.

Cada grupo debe mostrar cuatro selecciones.

Columnas:

* Posición.
* Selección.
* PJ.
* PG.
* PE.
* PP.
* GF.
* GC.
* DG.
* PTS.

Resaltar:

* Primer lugar.
* Segundo lugar.
* Los dos primeros con borde amarillo o verde suave.
* El tercero y cuarto sin destacar.

Agregar un texto:

```text
Los dos primeros lugares de cada grupo son los considerados para el cálculo de los pronósticos.
```

Permitir navegar con:

* Tabs.
* Selector.
* Flechas.
* Swipe en móvil.

---

# 14. RONDAS

Crear una línea de tiempo visual:

## Ronda 1

* 24 partidos.
* Primer encuentro de cada selección.
* Estado:

  * Pendiente.
  * En curso.
  * Completada.

## Ronda 2

* 24 partidos.
* Segundo encuentro de cada selección.

## Ronda 3

* 24 partidos.
* Último encuentro de cada selección.
* Al terminar se define el resultado final.

Mostrar:

* Fecha de inicio.
* Fecha de cierre.
* Cantidad de partidos procesados.
* Porcentaje completado.

La información debe obtenerse desde `tournament.json`, no estar escrita directamente en el componente.

---

# 15. SISTEMA DE PUNTUACIÓN

Mostrar una sección explicativa sencilla:

```text
¿Cómo se calcula el puntaje?

Cada participante eligió dos selecciones por grupo.

Se obtiene 1 punto por cada selección pronosticada que finalice en primer o segundo lugar de su grupo.

El orden entre ambas selecciones no importa.

Cada grupo entrega un máximo de 2 puntos.

Los 12 grupos permiten obtener un máximo de 24 puntos.
```

Agregar un ejemplo visual:

```text
Pronóstico:
México + República de Corea

Top 2 provisional:
México + Sudáfrica

Resultado:
1 punto de 2
```

---

# 16. DATOS PÚBLICOS Y PRIVACIDAD

No incluir en ningún archivo público:

* Correos electrónicos.
* Números de WhatsApp.
* Enlaces de comprobantes.
* Comprobantes de pago.
* Marca temporal original.
* Enlaces privados de Google Drive.
* Información bancaria.
* Datos sensibles.

Los datos originales proporcionados por el usuario deben utilizarse únicamente para extraer:

* Nombre público.
* Pronósticos de los grupos A–L.

Usar como nombres públicos:

```json
[
  "Eduardo F.",
  "Franz F.",
  "Kevin H.",
  "Mónica G.",
  "Stiff M.",
  "Hans",
  "Rosy A.",
  "Keytlin",
  "Manuel B.",
  "Soledad R."
]
```

No subir al repositorio el archivo original de Google Forms.

---

# 17. PRONÓSTICOS PREDEFINIDOS

Crear `public/data/participants.json` con los siguientes datos públicos:

```json
[
  {
    "id": "P01",
    "name": "Eduardo F.",
    "predictions": {
      "A": ["México", "República de Corea"],
      "B": ["Canadá", "Bosnia y Herzegovina"],
      "C": ["Brasil", "Marruecos"],
      "D": ["Estados Unidos", "Paraguay"],
      "E": ["Alemania", "Ecuador"],
      "F": ["Países Bajos", "Japón"],
      "G": ["Bélgica", "Irán"],
      "H": ["España", "Uruguay"],
      "I": ["Francia", "Noruega"],
      "J": ["Argentina", "Argelia"],
      "K": ["Portugal", "Colombia"],
      "L": ["Inglaterra", "Ghana"]
    }
  },
  {
    "id": "P02",
    "name": "Franz F.",
    "predictions": {
      "A": ["México", "República de Corea"],
      "B": ["Canadá", "Suiza"],
      "C": ["Brasil", "Marruecos"],
      "D": ["Estados Unidos", "Paraguay"],
      "E": ["Alemania", "Costa de Marfil"],
      "F": ["Países Bajos", "Japón"],
      "G": ["Bélgica", "Irán"],
      "H": ["España", "Uruguay"],
      "I": ["Francia", "Noruega"],
      "J": ["Argentina", "Argelia"],
      "K": ["Portugal", "Colombia"],
      "L": ["Inglaterra", "Croacia"]
    }
  },
  {
    "id": "P03",
    "name": "Kevin H.",
    "predictions": {
      "A": ["México", "República de Corea"],
      "B": ["Canadá", "Suiza"],
      "C": ["Brasil", "Marruecos"],
      "D": ["Estados Unidos", "Turquía"],
      "E": ["Alemania", "Ecuador"],
      "F": ["Países Bajos", "Japón"],
      "G": ["Bélgica", "Irán"],
      "H": ["España", "Uruguay"],
      "I": ["Francia", "Noruega"],
      "J": ["Argentina", "Austria"],
      "K": ["Portugal", "Colombia"],
      "L": ["Inglaterra", "Croacia"]
    }
  },
  {
    "id": "P04",
    "name": "Mónica G.",
    "predictions": {
      "A": ["Sudáfrica", "República de Corea"],
      "B": ["Qatar", "Suiza"],
      "C": ["Brasil", "Marruecos"],
      "D": ["Paraguay", "Turquía"],
      "E": ["Alemania", "Ecuador"],
      "F": ["Países Bajos", "Japón"],
      "G": ["Bélgica", "Egipto"],
      "H": ["España", "Uruguay"],
      "I": ["Francia", "Noruega"],
      "J": ["Argentina", "Argelia"],
      "K": ["Portugal", "Colombia"],
      "L": ["Inglaterra", "Ghana"]
    }
  },
  {
    "id": "P05",
    "name": "Stiff M.",
    "predictions": {
      "A": ["México", "República Checa"],
      "B": ["Canadá", "Suiza"],
      "C": ["Brasil", "Marruecos"],
      "D": ["Estados Unidos", "Paraguay"],
      "E": ["Alemania", "Ecuador"],
      "F": ["Países Bajos", "Japón"],
      "G": ["Bélgica", "Egipto"],
      "H": ["España", "Uruguay"],
      "I": ["Francia", "Senegal"],
      "J": ["Argentina", "Austria"],
      "K": ["Portugal", "Colombia"],
      "L": ["Inglaterra", "Croacia"]
    }
  },
  {
    "id": "P06",
    "name": "Hans",
    "predictions": {
      "A": ["México", "República Checa"],
      "B": ["Bosnia y Herzegovina", "Suiza"],
      "C": ["Brasil", "Marruecos"],
      "D": ["Estados Unidos", "Paraguay"],
      "E": ["Alemania", "Ecuador"],
      "F": ["Países Bajos", "Japón"],
      "G": ["Bélgica", "Egipto"],
      "H": ["España", "Uruguay"],
      "I": ["Francia", "Senegal"],
      "J": ["Argentina", "Austria"],
      "K": ["Portugal", "Colombia"],
      "L": ["Inglaterra", "Croacia"]
    }
  },
  {
    "id": "P07",
    "name": "Rosy A.",
    "predictions": {
      "A": ["México", "República de Corea"],
      "B": ["Canadá", "Bosnia y Herzegovina"],
      "C": ["Brasil", "Marruecos"],
      "D": ["Paraguay", "Turquía"],
      "E": ["Alemania", "Ecuador"],
      "F": ["Países Bajos", "Japón"],
      "G": ["Egipto", "Nueva Zelanda"],
      "H": ["España", "Uruguay"],
      "I": ["Francia", "Noruega"],
      "J": ["Argentina", "Argelia"],
      "K": ["Portugal", "Colombia"],
      "L": ["Inglaterra", "Panamá"]
    }
  },
  {
    "id": "P08",
    "name": "Keytlin",
    "predictions": {
      "A": ["México", "Sudáfrica"],
      "B": ["Canadá", "Qatar"],
      "C": ["Brasil", "Haití"],
      "D": ["Paraguay", "Australia"],
      "E": ["Alemania", "Ecuador"],
      "F": ["Países Bajos", "Túnez"],
      "G": ["Bélgica", "Egipto"],
      "H": ["España", "Uruguay"],
      "I": ["Francia", "Noruega"],
      "J": ["Argentina", "Austria"],
      "K": ["Portugal", "Colombia"],
      "L": ["Inglaterra", "Panamá"]
    }
  },
  {
    "id": "P09",
    "name": "Manuel B.",
    "predictions": {
      "A": ["México", "República de Corea"],
      "B": ["Canadá", "Suiza"],
      "C": ["Brasil", "Marruecos"],
      "D": ["Estados Unidos", "Paraguay"],
      "E": ["Alemania", "Ecuador"],
      "F": ["Países Bajos", "Japón"],
      "G": ["Bélgica", "Egipto"],
      "H": ["España", "Uruguay"],
      "I": ["Francia", "Noruega"],
      "J": ["Argentina", "Argelia"],
      "K": ["Portugal", "Colombia"],
      "L": ["Inglaterra", "Croacia"]
    }
  },
  {
    "id": "P10",
    "name": "Soledad R.",
    "predictions": {
      "A": ["México", "República de Corea"],
      "B": ["Canadá", "Bosnia y Herzegovina"],
      "C": ["Brasil", "Marruecos"],
      "D": ["Estados Unidos", "Paraguay"],
      "E": ["Alemania", "Costa de Marfil"],
      "F": ["Países Bajos", "Japón"],
      "G": ["Bélgica", "Irán"],
      "H": ["España", "Arabia Saudita"],
      "I": ["Francia", "Noruega"],
      "J": ["Argentina", "Austria"],
      "K": ["Portugal", "Colombia"],
      "L": ["Inglaterra", "Ghana"]
    }
  }
]
```

Validar que cada participante tenga exactamente:

* 12 grupos.
* 2 selecciones por grupo.
* 24 selecciones en total.

---

# 18. NORMALIZACIÓN DE NOMBRES DE SELECCIONES

Crear un sistema para normalizar nombres, porque una API puede devolver nombres diferentes.

Ejemplo:

```python
TEAM_ALIASES = {
    "Korea Republic": "República de Corea",
    "South Korea": "República de Corea",
    "Czechia": "República Checa",
    "Czech Republic": "República Checa",
    "USA": "Estados Unidos",
    "United States": "Estados Unidos",
    "Ivory Coast": "Costa de Marfil",
    "Côte d'Ivoire": "Costa de Marfil",
    "Netherlands": "Países Bajos",
    "DR Congo": "República Democrática del Congo",
    "Bosnia-Herzegovina": "Bosnia y Herzegovina"
}
```

No comparar directamente textos sin normalizarlos.

Crear una función:

```python
normalize_team_name(name: str) -> str
```

---

# 19. ACTUALIZACIÓN AUTOMÁTICA

Crear un script Python que:

1. Consulte una API deportiva mediante HTTPS.
2. Utilice una variable de entorno para la API key.
3. Obtenga únicamente partidos del Mundial 2026.
4. Considere solo la fase de grupos.
5. Ignore eliminatorias.
6. Procese únicamente partidos finalizados.
7. Identifique correctamente el grupo de cada partido.
8. Calcule:

   * PJ.
   * PG.
   * PE.
   * PP.
   * GF.
   * GC.
   * DG.
   * PTS.
9. Ordene las tablas de cada grupo.
10. Obtenga el primer y segundo lugar provisional.
11. Compare esos equipos con los pronósticos.
12. Calcule los puntos por grupo.
13. Calcule el total de cada participante.
14. Ordene el ranking.
15. Detecte empates.
16. Guarde:

* `standings.json`
* `ranking.json`
* `tournament.json`

17. Registre la última actualización en hora de Perú.
18. Mantenga los datos anteriores si la API falla.
19. Termine con código de error si los datos son inválidos.
20. Permita ejecución manual.

No realizar scraping directo sobre el HTML de FIFA.

Crear una interfaz adaptable para cambiar de proveedor de resultados sin modificar toda la aplicación:

```python
class FootballDataProvider:
    def fetch_matches(self):
        pass
```

Variables:

```env
FOOTBALL_API_URL=
FOOTBALL_API_TOKEN=
COMPETITION_ID=
SEASON=2026
```

Si la API todavía no devuelve datos válidos, usar un archivo:

```text
public/data/manual-results.json
```

como fallback manual.

---

# 20. GITHUB ACTIONS

Crear dos workflows.

## Deploy

* Instalar dependencias.
* Ejecutar lint.
* Ejecutar TypeScript check.
* Ejecutar pruebas.
* Construir Vite.
* Publicar `dist` en GitHub Pages.

## Actualización nocturna

Ejecutar diariamente aproximadamente a las 12:35 a. m. de Perú.

Usar horario UTC equivalente:

```yaml
schedule:
  - cron: "35 5 * * *"
```

También agregar:

```yaml
workflow_dispatch:
```

para ejecución manual.

Pasos:

1. Checkout.
2. Configurar Python.
3. Instalar dependencias.
4. Ejecutar validación.
5. Consultar resultados.
6. Calcular ranking.
7. Confirmar que los JSON sean válidos.
8. Crear commit automático solo si existen cambios.
9. Hacer push.
10. Activar el despliegue.

Mensaje del commit:

```text
chore: actualizar resultados y ranking
```

No exponer la clave de la API.

Guardar la clave en:

```text
GitHub Settings
→ Secrets and variables
→ Actions
→ FOOTBALL_API_TOKEN
```

---

# 21. ANIMACIONES

Usar Framer Motion con animaciones sutiles.

Incluir:

* Fade-in al cargar secciones.
* Stagger en tarjetas.
* Contadores animados.
* Transición suave al cambiar de grupo.
* Movimiento vertical pequeño en el podio.
* Animación del cambio de posición.
* Skeleton loading.
* Barra de progreso animada.
* Indicador de sincronización.
* Hover con elevación moderada.
* Confeti únicamente cuando finalice la fase de grupos.

No usar:

* Animaciones agresivas.
* Elementos saltando constantemente.
* Exceso de partículas.
* Sonido automático.
* Video pesado de fondo.
* Efectos que dificulten la lectura.

Respetar:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 22. EXPERIENCIA MÓVIL

El diseño debe ser mobile-first.

En celulares:

* Header compacto.
* Menú hamburguesa.
* Hero de menor altura.
* Tarjetas en una columna o dos columnas.
* Podio adaptado verticalmente.
* Ranking en tarjetas.
* Grupos con scroll horizontal.
* Drawer de participante a pantalla completa.
* Botones táctiles de mínimo 44 px.
* Tipografía legible.
* Sin desbordamiento horizontal.

Probar aproximadamente en:

* 360 px.
* 390 px.
* 430 px.
* 768 px.
* 1024 px.
* 1440 px.

---

# 23. ACCESIBILIDAD

Cumplir buenas prácticas:

* Contraste AA.
* Navegación con teclado.
* Focus visible.
* Etiquetas ARIA.
* Textos alternativos.
* Tablas accesibles.
* Modales con focus trap.
* No depender únicamente del color.
* Iconos acompañados por texto.
* Tamaños de letra legibles.

---

# 24. ESTADOS DE LA INTERFAZ

Crear estados visuales para:

## Antes del inicio

```text
Los resultados estarán disponibles cuando comiencen los partidos.
```

## En curso

```text
Clasificación provisional.
```

## Error de actualización

```text
No se pudo obtener una nueva actualización.
Se muestran los últimos datos confirmados.
```

## Fase finalizada

```text
Resultados definitivos de la fase de grupos.
```

## Sin datos

Mostrar skeleton y una explicación, no una página en blanco.

---

# 25. FOOTER

Crear un footer oscuro con:

* Logo IRF26.
* Texto:

  * “Impact Regional Fellowship 2026”.
* Enlace al sitio institucional.
* Nota:

  * “Tablero informativo de seguimiento de pronósticos”.
* Última sincronización.
* Créditos de imágenes.
* Aviso de privacidad.

Texto recomendado:

```text
Esta plataforma muestra información pública y resultados provisionales de la fase de grupos. No almacena correos electrónicos, números telefónicos ni comprobantes.
```

---

# 26. CALIDAD DEL CÓDIGO

Exigir:

* Componentes reutilizables.
* TypeScript estricto.
* Interfaces claras.
* Separación entre datos, lógica y presentación.
* Sin `any`.
* Manejo de errores.
* Validación de JSON.
* Código comentado únicamente donde sea necesario.
* Nombres descriptivos.
* Diseño consistente.
* Sin datos sensibles.
* Sin claves en el código.
* Sin contenido duplicado.
* Sin dependencias innecesarias.

Crear tipos como:

```ts
type GroupId =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L";

interface Participant {
  id: string;
  name: string;
  predictions: Record<GroupId, [string, string]>;
}

interface ParticipantScore {
  participantId: string;
  position: number;
  totalPoints: number;
  perfectGroups: number;
  movement: number;
}
```

---

# 27. PRUEBAS

Crear pruebas para:

* Participante con dos aciertos: 2 puntos.
* Participante con un acierto: 1 punto.
* Participante sin aciertos: 0 puntos.
* El orden primero/segundo no modifica el puntaje.
* Empates en el ranking.
* Normalización de nombres.
* Datos incompletos.
* Partido suspendido.
* Partido aún no iniciado.
* API sin respuesta.
* JSON inválido.
* Fase de grupos finalizada.

---

# 28. README

Crear un README completo con:

* Descripción.
* Tecnologías.
* Instalación.
* Ejecución local.
* Configuración de API.
* Configuración de GitHub Secrets.
* Publicación en GitHub Pages.
* Actualización manual.
* Actualización automática.
* Cómo editar participantes.
* Cómo cambiar imágenes.
* Cómo reemplazar el logo.
* Cómo usar resultados manuales si la API falla.
* Política de privacidad.
* Solución de errores comunes.

Comandos:

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test
python scripts/update_results.py
```

---

# 29. RESULTADO ESPERADO

Entregar el proyecto completo y funcional.

No entregar únicamente una maqueta o fragmentos aislados.

Generar:

* Todos los archivos.
* Todos los componentes.
* Datos iniciales.
* Scripts Python.
* Workflows.
* Configuración de GitHub Pages.
* README.
* Diseño responsive.
* Animaciones.
* Estados de error.
* Fallback manual.
* Pruebas.

El resultado debe verse como una combinación entre:

* Página institucional premium.
* Dashboard deportivo.
* Tabla profesional de competición.
* Experiencia moderna tipo evento internacional.

La prioridad debe ser:

1. Claridad.
2. Diseño profesional.
3. Confianza.
4. Rendimiento.
5. Facilidad de uso.
6. Automatización.
7. Privacidad.

No crear una interfaz genérica de administración.

No usar un dashboard empresarial tradicional con sidebar.

Debe sentirse como una experiencia deportiva pública, emocionante, moderna y alineada con IRF26.
