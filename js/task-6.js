function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  input: document.querySelector('#controls input[type="number"]'),
  createBtn: document.querySelector('[data-create]'),
  destroyBtn: document.querySelector('[data-destroy]'),
  boxes: document.querySelector('#boxes'),
};

const MIN = 1;
const MAX = 100;

refs.createBtn.addEventListener('click', onCreate);
refs.destroyBtn.addEventListener('click', destroyBoxes);

function onCreate() {
  const amount = Number(refs.input.value.trim());
  if (!Number.isFinite(amount) || amount < MIN || amount > MAX) {
    refs.input.value = '';
    return;
  }

  createBoxes(amount);
  refs.input.value = '';
}

function createBoxes(amount) {
  const fragment = document.createDocumentFragment();
  const startSize = 30;
  const step = 10;

  for (let i = 0; i < amount; i += 1) {
    const size = startSize + i * step;
    const box = document.createElement('div');
    box.style.width = `${size}px`;
    box.style.height = `${size}px`;
    box.style.backgroundColor = getRandomHexColor();
    box.style.borderRadius = '4px';
    box.style.margin = '4px';
    fragment.appendChild(box);
  }

  refs.boxes.replaceChildren(fragment);
}

function destroyBoxes() {
  refs.boxes.innerHTML = '';
}