const passwordOutput = document.querySelector('#password');
const length = document.querySelector('#length');
const lengthValue = document.querySelector('#length-value');
const strength = document.querySelector('#strength');
const strengthBar = document.querySelector('#strength-bar');
const alphabet = 'abcdefghijkmnopqrstuvwxyz';

function generatePassword() {
  let characters = alphabet;
  if (document.querySelector('#uppercase').checked) characters += alphabet.toUpperCase();
  if (document.querySelector('#numbers').checked) characters += '23456789';
  if (document.querySelector('#symbols').checked) characters += '!@#$%&*+-=?';
  const values = new Uint32Array(Number(length.value));
  crypto.getRandomValues(values);
  passwordOutput.value = Array.from(values, (value) => characters[value % characters.length]).join('');
  lengthValue.value = length.value;
  const score = Math.min(100, Number(length.value) * 2 + (characters.length > 40 ? 35 : 15));
  strengthBar.style.width = `${score}%`;
  strength.textContent = `Força: ${score > 80 ? 'forte' : score > 55 ? 'média' : 'básica'}`;
}

document.querySelector('#generate').addEventListener('click', generatePassword);
length.addEventListener('input', generatePassword);
document.querySelectorAll('.options input').forEach((option) => option.addEventListener('change', generatePassword));
document.querySelector('#copy').addEventListener('click', async () => {
  await navigator.clipboard.writeText(passwordOutput.value);
  document.querySelector('#copy').textContent = 'Copiada!';
  window.setTimeout(() => { document.querySelector('#copy').textContent = 'Copiar'; }, 1200);
});
generatePassword();
