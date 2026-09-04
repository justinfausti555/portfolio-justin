const form = document.querySelector('#expense-form');
const description = document.querySelector('#description');
const amount = document.querySelector('#amount');
const list = document.querySelector('#expense-list');
const total = document.querySelector('#total');
const empty = document.querySelector('#empty');
let expenses = JSON.parse(localStorage.getItem('despesas-js') || '[]');

function render() {
  list.innerHTML = expenses.map((expense) => `<li><span>${escapeHtml(expense.description)}</span><strong>${expense.amount.toLocaleString('pt-AO', { minimumFractionDigits: 2 })} Kz</strong><button type="button" data-id="${expense.id}" aria-label="Apagar despesa">&times;</button></li>`).join('');
  total.textContent = `${expenses.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString('pt-AO', { minimumFractionDigits: 2 })} Kz`;
  empty.hidden = expenses.length > 0;
}

function escapeHtml(value) { return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[character])); }
form.addEventListener('submit', (event) => {
  event.preventDefault();
  expenses.unshift({ id: crypto.randomUUID(), description: description.value.trim(), amount: Number(amount.value) });
  localStorage.setItem('despesas-js', JSON.stringify(expenses));
  form.reset();
  render();
});
list.addEventListener('click', (event) => {
  if (!event.target.dataset.id) return;
  expenses = expenses.filter((expense) => expense.id !== event.target.dataset.id);
  localStorage.setItem('despesas-js', JSON.stringify(expenses));
  render();
});
render();
