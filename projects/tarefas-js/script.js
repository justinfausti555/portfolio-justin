const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const emptyState = document.querySelector('#empty-state');
const count = document.querySelector('#task-count');
const filterButtons = document.querySelectorAll('.filter');

let tasks = JSON.parse(localStorage.getItem('tarefas-js') || '[]');
let currentFilter = 'all';

function saveTasks() {
  localStorage.setItem('tarefas-js', JSON.stringify(tasks));
}

function render() {
  const visibleTasks = tasks.filter((task) => currentFilter === 'all' || (currentFilter === 'done' ? task.done : !task.done));
  list.innerHTML = visibleTasks.map((task) => `
    <li class="task ${task.done ? 'done' : ''}">
      <input type="checkbox" data-action="toggle" data-id="${task.id}" ${task.done ? 'checked' : ''} aria-label="Marcar tarefa como concluída">
      <label>${escapeHtml(task.text)}</label>
      <button class="delete" type="button" data-action="delete" data-id="${task.id}" aria-label="Apagar tarefa">&times;</button>
    </li>
  `).join('');
  const pending = tasks.filter((task) => !task.done).length;
  count.textContent = `${pending} ${pending === 1 ? 'tarefa pendente' : 'tarefas pendentes'}`;
  emptyState.hidden = visibleTasks.length > 0;
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[character]));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  tasks.unshift({ id: crypto.randomUUID(), text: input.value.trim(), done: false });
  saveTasks();
  input.value = '';
  render();
});

list.addEventListener('click', (event) => {
  const control = event.target.closest('[data-action]');
  if (!control) return;
  const task = tasks.find((item) => item.id === control.dataset.id);
  if (control.dataset.action === 'delete') tasks = tasks.filter((item) => item.id !== control.dataset.id);
  if (control.dataset.action === 'toggle' && task) task.done = !task.done;
  saveTasks();
  render();
});

filterButtons.forEach((button) => button.addEventListener('click', () => {
  currentFilter = button.dataset.filter;
  filterButtons.forEach((item) => item.classList.toggle('active', item === button));
  render();
}));

render();
