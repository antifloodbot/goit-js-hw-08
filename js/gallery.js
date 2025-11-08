const images = [
  { preview:'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg', description:'Hokkaido Flower' },
  { preview:'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg', description:'Container Haulage Freight' },
  { preview:'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg', description:'Aerial Beach View' },
  { preview:'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg', description:'Flower Blooms' },
  { preview:'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg', description:'Alpine Mountains' },
  { preview:'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg', description:'Mountain Lake Sailing' },
  { preview:'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg', description:'Alpine Spring Meadows' },
  { preview:'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg', description:'Nature Landscape' },
  { preview:'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg', description:'Lighthouse Coast Sea' },
];

const gallery = document.querySelector('.gallery');
gallery.insertAdjacentHTML('beforeend',
  images.map(({preview, original, description}, i) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${original}">
        <img class="gallery-image" src="${preview}" data-source="${original}" data-index="${i}" alt="${description}" />
      </a>
    </li>`).join('')
);

let currentIndex = 0;
let instance = null;
let onKeyHandler = null;

gallery.addEventListener('click', (e) => {
  e.preventDefault();
  const img = e.target.closest('.gallery-image');
  if (!img) return;
  currentIndex = Number(img.dataset.index);
  openLightbox(currentIndex);
});

function openLightbox(startIndex){
  currentIndex = startIndex;

  const BL = window.basicLightbox;
  if (!BL) { console.error('window.basicLightbox недоступний'); return; }

  instance = BL.create(`
    <div class="lb">
      <button class="lb-close" aria-label="Close (Esc)">×</button>
      <div class="lb-counter"></div>
      <button class="lb-nav lb-prev" aria-label="Previous">‹</button>
      <div class="lb-inner">
        <img class="lb-image" src="" alt="" />
        <div class="lb-caption"></div>
      </div>
      <button class="lb-nav lb-next" aria-label="Next">›</button>
    </div>
  `, {
    onShow: (inst) => {
      const root = inst.element();

      lockScroll(true);
      renderImage(root);

      root.querySelector('.lb-close').addEventListener('click', close);
      root.querySelector('.lb-prev').addEventListener('click', prev);
      root.querySelector('.lb-next').addEventListener('click', next);

      root.addEventListener('click', (ev) => { if (ev.target === root) close(); });

      onKeyHandler = (ev) => {
        if (ev.key === 'Escape') close();
        if (ev.key === 'ArrowRight') next();
        if (ev.key === 'ArrowLeft') prev();
      };
      document.addEventListener('keydown', onKeyHandler);
    },
    onClose: () => {
      lockScroll(false);
      document.removeEventListener('keydown', onKeyHandler);
      onKeyHandler = null;
    }
  });

  instance.show();
}

function renderImage(root){
  const { original, description } = images[currentIndex];
  const imgEl = root.querySelector('.lb-image');
  const counterEl = root.querySelector('.lb-counter');
  const captionEl = root.querySelector('.lb-caption');
  imgEl.src = original;
  imgEl.alt = description;
  counterEl.textContent = `${currentIndex + 1}/${images.length}`;
  captionEl.textContent = description;
}

function next(){ currentIndex = (currentIndex + 1) % images.length; renderImage(instance.element()); }
function prev(){ currentIndex = (currentIndex - 1 + images.length) % images.length; renderImage(instance.element()); }
function close(){ instance && instance.close(); }

function lockScroll(on){
  document.documentElement.style.overflow = on ? 'hidden' : '';
  document.body.style.overflow = on ? 'hidden' : '';
}