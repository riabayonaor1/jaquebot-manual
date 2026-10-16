const chapterIds = ['uso', 'apps', 'materiales', 'ensamblaje', 'conexiones', 'construccion', 'descargas'];
const chapters = {
  uso: ['Usar el robot: empieza aquí', 'Encender, preparar y jugar', 'Si es tu primera vez, sigue estos pasos con el docente antes de mover el brazo.'],
  apps: ['Cómo usar las dos aplicaciones', 'Control manual y ajedrez', 'Elige una aplicación. Después abre las instrucciones en orden: abrir, preparar, usar y terminar.'],
  materiales: ['Materiales y componentes', 'Qué es cada cosa y para qué sirve', 'Mira las ilustraciones y abre la lista de materiales que necesites consultar.'],
  ensamblaje: ['Montaje paso a paso', 'Imágenes e instrucciones para armarlo', 'Empieza por los pasos 1 y 2. Cada grupo incluye una imagen, las piezas que necesitas y lo que debes comprobar antes de seguir.'],
  conexiones: ['Conexiones del robot', 'Dónde va cada cable', 'Identifica la placa del robot y abre «Montaje actual». La tabla de la PCB R03 corresponde a un diseño propuesto, pendiente de fabricación.'],
  construccion: ['Cómo lo construimos y programamos', 'La historia del proyecto y el trabajo con Codex', 'Conoce cómo pasamos del diseño EduSCARA al robot de ajedrez y sus dos aplicaciones.'],
  descargas: ['Descargas y planos', 'Manual PDF, archivos 3D y código QR', 'Guarda el manual para leerlo sin conexión. Para construir piezas, consulta los planos y los archivos 3D.'],
};

function indicator() {
  const icon = document.createElement('span');
  icon.className = 'fold-indicator';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '+';
  return icon;
}

export function initManualChapters() {
  for (const id of chapterIds) {
    const section = document.getElementById(id);
    const header = section.querySelector('.section-bar');
    const details = document.createElement('details');
    details.className = 'manual-chapter';
    const summary = document.createElement('summary');
    summary.className = 'section-bar chapter-summary';
    const [title, description, intro] = chapters[id];
    const heading = header.querySelector('h2');
    const number = heading.querySelector('span');
    heading.replaceChildren(number, document.createTextNode(` ${title}`));
    header.querySelector('.micro').textContent = description;
    summary.append(...header.childNodes, indicator());
    const body = document.createElement('div');
    body.className = 'chapter-content';
    while (header.nextSibling) body.append(header.nextSibling);
    const guidance = document.createElement('p');
    guidance.className = 'chapter-guidance';
    guidance.textContent = intro;
    body.prepend(guidance);
    details.append(summary, body);
    header.replaceWith(details);
    section.classList.add('manual-section');
  }
  const help = document.createElement('div');
  help.className = 'fold-help wrap';
  help.innerHTML = '<h2>¿Qué quieres aprender?</h2><p>Toca un título para abrirlo. Vuelve a tocarlo para cerrarlo.</p><nav aria-label="Por dónde empezar"><a href="#uso">Quiero usar el robot ↗</a><a href="#apps">Quiero aprender las apps ↗</a><a href="#ensamblaje">Quiero construirlo ↗</a></nav>';
  document.getElementById('uso').before(help);
  window.addEventListener('hashchange', revealHashTarget);
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (link && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) {
      revealTarget(link.hash, false);
      if (location.hash === link.hash) revealHashTarget();
    }
  });
  let printState;
  window.addEventListener('beforeprint', () => {
    printState = [...document.querySelectorAll('details')].map(item => [item, item.open]);
    for (const [item] of printState) item.open = true;
  });
  window.addEventListener('afterprint', () => {
    for (const [item, open] of printState || []) item.open = open;
  });
}

function foldElement(element, heading) {
  if (!heading || element.closest('.reading-fold')) return;
  const details = document.createElement('details');
  details.className = 'reading-fold';
  const summary = document.createElement('summary');
  const step = element.querySelector('.eyebrow,.step-no')?.textContent.match(/^\d+/)?.[0];
  if (step) {
    const number = document.createElement('span');
    number.className = 'fold-step';
    number.textContent = step;
    summary.append(number);
  }
  summary.append(heading, indicator());
  const body = document.createElement('div');
  body.className = 'reading-fold-body';
  details.append(summary, body);
  element.replaceWith(details);
  body.append(element);
}

export function initReadingAccordions(root = document) {
  const groups = [
    ['.material-group', 'h4'],
    ['.assembly-panel', '.assembly-panel-heading'],
    ['.reading-screen', 'h4'],
    ['.workflow-chapter', 'h4,h5'],
    ['.app-section', 'h4'],
    ['.wiring-group', 'h4'],
    ['.programming-chapters > article', 'h5'],
  ];
  for (const [selector, heading] of groups) {
    for (const element of root.querySelectorAll(selector)) foldElement(element, element.querySelector(heading));
  }
}

function revealTarget(hash, scroll) {
  if (!hash || hash === '#') return;
  let target;
  try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return; }
  if (!target) return;
  if (target.classList.contains('manual-section')) target.querySelector('.manual-chapter').open = true;
  for (let item = target; item; item = item.parentElement) {
    if (item.tagName === 'DETAILS') item.open = true;
  }
  if (scroll) requestAnimationFrame(() => target.scrollIntoView({block: 'start'}));
}

export function revealHashTarget() {
  revealTarget(location.hash, true);
}
