# Pyke — Manual de referencia de Python

> English: Pyke is a pocket reference manual for Python. Look up a concept, copy the
> example or run real Python in your browser — no install needed. Bilingual in
> Spanish (`es`) and English (`en`), switchable on the top bar.

Pyke es un manual de referencia de Python en español. Son **37 fichas** organizadas
en **8 categorías**: fundamentos, strings, colecciones, control de flujo, funciones,
objetos, errores y archivos. Cada ficha tiene:

- **Ejemplo de código ejecutable** — se puede probar en el navegador con Pyodide (Python real, sin instalar nada).
- **Búsqueda rápida** (⌘K).
- **Quiz** de tres preguntas para autocomprobar lo aprendido (en 11 fichas).
- **Interfaz en español e inglés** intercambiable.

## Cómo usarlo

| Atajo | Acción |
| --- | --- |
| `Ctrl/⌘ + K` | Abrir la búsqueda |
| `Ctrl/⌘ + Enter` (en el Playground) | Ejecutar el código |
| `Esc` | Cerrar diálogos |

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run lint     # oxlint
npm run build    # build de producción
```

El build se despliega automáticamente a GitHub Pages mediante
[GitHub Actions](./.github/workflows/deploy.yml).

## Stack

React 19 · Vite 8 · Tailwind CSS 4 · Pyodide (Python en el navegador) · CodeMirror 6