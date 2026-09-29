// Slightly reduce wheel distance without an animation queue or scroll lag.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
window.addEventListener('wheel', (event) => {
  if (reducedMotion.matches || event.ctrlKey || event.metaKey || event.shiftKey ||
      !event.cancelable || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;

  // Leave native scrolling inside controls and independently scrollable regions.
  for (const node of event.composedPath()) {
    if (!(node instanceof HTMLElement) || node === document.body || node === document.documentElement) continue;
    if (node.matches('input, textarea, select, [contenteditable="true"]')) return;
    if (/(auto|scroll)/.test(getComputedStyle(node).overflowY) && node.scrollHeight > node.clientHeight) return;
  }
  const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
  const delta = event.deltaY * unit * .8;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0 || (delta < 0 && window.scrollY <= 0) || (delta > 0 && window.scrollY >= max)) return;
  event.preventDefault();
  window.scrollBy({ top: delta, behavior: 'instant' });
}, { passive: false });
