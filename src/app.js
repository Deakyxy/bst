import { numTreesDP, numTreesRecursiveMemo, generarArboles, prettyTree } from './bst.js';

const form = document.getElementById('form');
const input = document.getElementById('n');
const out = document.getElementById('output');
const showTrees = document.getElementById('showTrees');
const treesDiv = document.getElementById('trees');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const n = Number(input.value);

  // Calcula con DP (rápido) y valida con recursivo+memo (opcional)
  const dpRes = numTreesDP(n);
  const memoRes = numTreesRecursiveMemo(n);
  out.textContent = `BST distintos para n=${n}: ${dpRes}` + (dpRes === memoRes ? '' : ` (memo: ${memoRes})`);

  // Generar árboles si se solicita y n es pequeño
  treesDiv.innerHTML = '';
  if (showTrees.checked && n <= 4) {
    const roots = generarArboles(1, n);
    treesDiv.insertAdjacentHTML('beforeend', `<p>Se generaron ${roots.length} árboles:</p>`);
    roots.forEach((r, i) => {
      const pre = document.createElement('pre');
      pre.className = 'tree';
      pre.textContent = `Árbol ${i + 1}: ${prettyTree(r)}`;
      treesDiv.appendChild(pre);
    });
  } else if (showTrees.checked && n > 4) {
    treesDiv.textContent = '⚠️ Para evitar bloqueos, genera árboles solo con n ≤ 4.';
  }
});
