const input = document.querySelector('#name-input');
const output = document.querySelector('#name-output');

input.addEventListener('input', () => {
  const v = input.value.trim();
  output.textContent = v === '' ? 'Anonymous' : v;
});