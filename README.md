# Calculadora de BST (Números de Catalan)

Pequeña app web para calcular cuántos **árboles binarios de búsqueda** distintos existen con los valores `1..n` (LeetCode 96). Incluye:
- Cálculo con **DP** (rápido)
- Cálculo **recursivo + memo** (didáctico)
- Generación de **todos los BST** para n pequeño (≤ 4), con un **render** en texto.

## Ejecutar local
Abre `index.html` en tu navegador (no requiere build).  
Para desarrollo con livereload, usa una extensión de Live Server (VS Code) o un servidor estático.

## Deploy en GitHub Pages
1. Sube esta carpeta a un repo.
2. En GitHub: **Settings → Pages → Deploy from branch → main / root**.
3. Tu sitio quedará publicado en `https://<tu-usuario>.github.io/<repo>/`.

## Estructura
- `src/bst.js`: lógica (DP, recursivo+memo, generación de árboles, pretty print)
- `src/app.js`: conecta UI
- `index.html`, `styles.css`

## Límite
Generar todos los BST explota combinatoriamente (números de Catalan). Mantén `n ≤ 4` para generar estructuras.
