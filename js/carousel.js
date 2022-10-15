const slides = document.getElementsByClassName('review__item');
const buttons = document.querySelectorAll('.review__carousel-control button');

let current = Math.floor(Math.random() * slides.length);
let next = current === slides.length - 1 ? 0 : current + 1;
let prev = current === 0 ? slides.length - 1 : current - 1;

function switchCards() {
  for (const slide of slides) {
    slide.classList.remove('active', 'prev', 'next');
  }
  slides[current].classList.add('active');
  slides[next].classList.add('next');
  slides[prev].classList.add('prev');
}

function updateIndex(number) {
  current = number;
  next = current === slides.length - 1 ? 0 : current + 1;
  prev = current === 0 ? slides.length - 1 : current - 1;
  switchCards();
}

const goToPrev = () => current === 0 ? updateIndex(slides.length - 1) : updateIndex(current - 1);
const goToNext = () => current === slides.length - 1 ? updateIndex(0) : updateIndex(current + 1);

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => i === 0 ? goToPrev() : goToNext());
}

switchCards();