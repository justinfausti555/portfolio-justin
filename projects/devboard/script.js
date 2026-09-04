const initialTasks = [
  { id: crypto.randomUUID(), title: 'Estruturar página inicial', label: 'Frontend', status: 'todo' },
  { id: crypto.randomUUID(), title: 'Testar formulário de contacto', label: 'Estudo', status: 'progress' },
  { id: crypto.randomUUID(), title: 'Publicar primeira versão', label: 'Frontend', status: 'done' },
];
let tasks = JSON.parse(localStorage.getItem('devboard-tasks') || 'null') || initialTasks;
let draggedId = null;
const labels = { todo: 'Backlog', progress: 'Em progresso', done: 'Concluído' };

function save() { localStorage.setItem('devboard-tasks', JSON.stringify(tasks)); }
function escapeHtml(value) { return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[character])); }
function render() {
  const query = document.querySelector('#search').value.toLowerCase();
  document.querySelectorAll('.drop-zone').forEach((zone) => { zone.innerHTML = ''; });
  tasks.filter((task) => task.title.toLowerCase().includes(query)).forEach((task) => {
    const card = document.createElement('article');
    card.className = 'task'; card.draggable = true; card.dataset.id = task.id;
    card.innerHTML = `<h3>${escapeHtml(task.title)}</h3><div class="task-meta"><span class="tag">${escapeHtml(task.label)}</span><span>${labels[task.status]}</span></div>`;
    card.addEventListener('dragstart', () => { draggedId = task.id; });
    document.querySelector(`[data-status="${task.status}"] .drop-zone`).append(card);
  });
  document.querySelectorAll('.column').forEach((column) => { column.querySelector('.column-count').textContent = tasks.filter((task) => task.status === column.dataset.status).length; });
  document.querySelector('#total-stat').textContent = tasks.length;
  document.querySelector('#progress-stat').textContent = tasks.filter((task) => task.status === 'progress').length;
  document.querySelector('#done-stat').textContent = tasks.filter((task) => task.status === 'done').length;
  document.querySelector('#board-count').textContent = `${tasks.length} ${tasks.length === 1 ? 'tarefa' : 'tarefas'}`;
}

document.querySelectorAll('.column').forEach((column) => {
  column.addEventListener('dragover', (event) => event.preventDefault());
  column.addEventListener('drop', () => { const task = tasks.find((item) => item.id === draggedId); if (task) task.status = column.dataset.status; save(); render(); });
});
document.querySelector('#search').addEventListener('input', render);
document.querySelector('#new-task').addEventListener('click', () => document.querySelector('#task-dialog').showModal());
document.querySelector('#cancel-dialog').addEventListener('click', () => document.querySelector('#task-dialog').close());
document.querySelector('#task-form').addEventListener('submit', (event) => { event.preventDefault(); tasks.push({ id: crypto.randomUUID(), title: document.querySelector('#task-title').value.trim(), label: document.querySelector('#task-label').value, status: 'todo' }); save(); event.target.reset(); document.querySelector('#task-dialog').close(); render(); });
render();
