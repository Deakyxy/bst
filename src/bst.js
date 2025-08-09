// DP (rápido): números de Catalan para contar BSTs de 1..n
export function numTreesDP(n) {
  const dp = Array(n + 1).fill(0);
  dp[0] = 1; // árbol vacío
  if (n >= 1) dp[1] = 1;

  for (let nodes = 2; nodes <= n; nodes++) {
    let total = 0;
    for (let root = 1; root <= nodes; root++) {
      total += dp[root - 1] * dp[nodes - root];
    }
    dp[nodes] = total;
  }
  return dp[n];
}

// Recursivo + memo (didáctico, también O(n^2))
export function numTreesRecursiveMemo(n, memo = []) {
  if (n <= 1) return 1;
  if (memo[n] != null) return memo[n];
  let total = 0;
  for (let root = 1; root <= n; root++) {
    total += numTreesRecursiveMemo(root - 1, memo) *
             numTreesRecursiveMemo(n - root, memo);
  }
  memo[n] = total;
  return total;
}

// ---------- Generar todos los BST (para n pequeño) ----------
export class Nodo {
  constructor(dato) {
    this.dato = dato;
    this.izquierdo = null;
    this.derecho = null;
  }
}

// Genera lista de raíces (Nodo) para todos los BST con valores [start..end]
export function generarArboles(start, end) {
  const lista = [];
  if (start > end) {
    lista.push(null);
    return lista;
  }
  for (let i = start; i <= end; i++) {
    const izquierdos = generarArboles(start, i - 1);
    const derechos  = generarArboles(i + 1, end);
    for (const izq of izquierdos) {
      for (const der of derechos) {
        const root = new Nodo(i);
        root.izquierdo = izq;
        root.derecho = der;
        lista.push(root);
      }
    }
  }
  return lista;
}

// Dibujo simple en texto (preorden con nulls)
export function prettyTree(root) {
  const out = [];
  function pre(n) {
    if (!n) { out.push("·"); return; }
    out.push(String(n.dato));
    pre(n.izquierdo);
    pre(n.derecho);
  }
  pre(root);
  return out.join(" ");
}
