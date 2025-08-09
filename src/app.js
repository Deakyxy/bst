import { numTreesDP, numTreesRecursiveMemo, generarArboles } from './bst.js';

// ====== Layout y render SVG ======
function layoutTree(root, xGap = 48, yGap = 64, margin = 20) {
  let order = 0;
  const nodes = [];
  const idByRef = new Map();

  function inorder(node, depth) {
    if (!node) return;
    inorder(node.izquierdo, depth + 1);
    order += 1;
    const id = order;
    idByRef.set(node, id);
    nodes.push({ id, val: node.dato, depth, ix: order });
    inorder(node.derecho, depth + 1);
  }
  inorder(root, 0);

  const edges = [];
  function collectEdges(node) {
    if (!node) return;
    const pid = idByRef.get(node);
    if (node.izquierdo) edges.push([pid, idByRef.get(node.izquierdo)]);
    if (node.derecho)  edges.push([pid, idByRef.get(node.derecho)]);
    collectEdges(node.izquierdo);
    collectEdges(node.derecho);
  }
  collectEdges(root);

  const maxDepth = nodes.reduce((m, n) => Math.max(m, n.depth), 0);
  const width  = margin * 2 + (order + 1) * xGap;
  const height = margin * 2 + (maxDepth + 1) * yGap;

  for (const n of nodes) {
    n.x = margin + n.ix * xGap;
    n.y = margin + n.depth * yGap;
  }
  const posById = new Map(nodes.map(n => [n.id, { x: n.x, y: n.y }]));
  return { nodes, edges, posById, width, height };
}

function treeToSVG(root) {
  if (!root) return '<svg></svg>';
  const { nodes, edges, posById, width, height } = layoutTree(root);

  const lines = edges.map(([a, b]) => {
    const p = posById.get(a), c = posById.get(b);
    return `<line x1="${p.x}" y1="${p.y}" x2="${c.x}" y2="${c.y}" stroke="#40506a" stroke-width="2"/>`;
  }).join('');

  const circles = nodes.map(n => (
    `<g>
       <circle cx="${n.x}" cy="${n.y}" r="14" fill="#0f1521" stroke="#6ea8fe" stroke-width="2"/>
       <text x="${n.x}" y="${n.y+4}" font-size="12" text-anchor="middle" fill="#e6edf3">${n.val}</text>
     </g>`
  )).join('');

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${lines}${circles}</svg>`;
}

// ====== UI ======
const form = document.getElementById('form');
const input = document.getElementById('n');
const out = document.getElementById('output');
const showTrees = document.getElementById('showTrees');
const treesDiv = document.getElementById('trees');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const n = Number(input.value);

  const dpRes = numTreesDP(n);
  const memoRes = numTreesRecursiveMemo(n);
  out.textContent = `BST distintos para n=${n}: ${dpRes}` + (dpRes === memoRes ? '' : ` (memo: ${memoRes})`);

  treesDiv.innerHTML = '';
  if (showTrees.checked && n <= 4) {
    const roots = generarArboles(1, n);

    const p = document.createElement('p');
    p.textContent = `Se generaron ${roots.length} árboles:`;
    treesDiv.appendChild(p);

    const grid = document.createElement('div');
    grid.className = 'trees-grid';
    treesDiv.appendChild(grid);

    roots.forEach((r, i) => {
      const card = document.createElement('div');
      card.className = 'tree-card';
      card.innerHTML = `<h4>Árbol ${i + 1}</h4>${treeToSVG(r)}`;
      grid.appendChild(card);
    });
  } else if (showTrees.checked && n > 4) {
    treesDiv.textContent = '⚠️ Para evitar bloqueos, genera árboles solo con n ≤ 4.';
  }
});
