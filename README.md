# JaqueBot · Manual interactivo

Manual educativo del proyecto JaqueBot, Colegio Carlos Julio Torrado Peñaranda, grado 11C, 2026.

Edición ampliada: 16 de octubre de 2026. Incluye 55 entradas de materiales, 26 pasos de montaje con las 13 láminas originales de EduSCARA explicadas en español, capturas iniciales reales de las dos apps, guías de uso, programación con Codex e ilustraciones de Raspberry Pi 5 y AI Camera. El manual PDF tiene 116 páginas, con 17 planos originales.

Conserva el ensamblaje CAD R03 navegable en 3D con 205 elementos seleccionables, documentación de las dos aplicaciones, conexiones, construcción, ilustraciones en tinta y descargas de manual, planos y accesorios STL.

## GitHub Pages

[Abre el manual interactivo](https://riabayonaor1.github.io/jaquebot-manual/#explorar).

Sitio estático preparado para publicarse desde la rama `main`, carpeta `/(root)`. En **Settings → Pages → Build and deployment**, elige **Deploy from a branch**, `main` y `/(root)`. El archivo `.nojekyll` evita el procesado Jekyll.

Los recursos e imports usan rutas relativas para funcionar tanto en la raíz de un dominio como bajo `/jaquebot-manual/`. No se requiere instalar dependencias ni ejecutar un servidor propio.

Los QR y los enlaces del manual corresponden a `https://riabayonaor1.github.io/jaquebot-manual/#explorar`. Al cambiar de dirección, regenera el QR y los documentos descargables que lo contienen.

## Vista local

```sh
python3 -m http.server 8420 --bind 127.0.0.1
```

Abre `http://127.0.0.1:8420/`. No abras `index.html` directamente: el visor usa módulos y solicitudes HTTP.

## Material y créditos

- Artículo y láminas de montaje: Alex Clark, Uriel Martinez-Hernandez y Tareq Assaf, [HardwareX 26 (2026), e00761](https://doi.org/10.1016/j.ohx.2026.e00761), CC BY 4.0. Imágenes completas sin cambios; explicaciones españolas adaptadas para JaqueBot.
- Plataforma EduSCARA: Alex Clark y Tareq Assaf, [Mendeley Data v3](https://doi.org/10.17632/m46jnn2cmb.3), CC BY 4.0.
- Adaptación JaqueBot: proyecto escolar dirigido por Ricardo Bayona con estudiantes de grado 11C. Programación y documentación asistidas por ChatGPT Codex.
- Three.js: licencia MIT conservada en `assets/vendor/THREE-LICENSE.txt`.
- Los planos y el CAD mantienen su procedencia. Las ilustraciones artísticas no son patrones de medida ni etiquetas ArUco para imprimir.

El sitio explica el robot y no controla el equipo físico. La edición documental del 16 de octubre conserva el estado consultado el 12 de octubre de 2026 y las comprobaciones físicas pendientes.
