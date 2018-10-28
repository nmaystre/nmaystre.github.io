let menuOpen = false;
const menuBtn = document.querySelector('.hamburger__icon');
const menuNav = document.querySelector('.menu');

menuBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (menuOpen) {
    this.classList.remove('hamburger__icon--open');
    menuNav.classList.remove('menu--open');
  } else {
    this.classList.add('hamburger__icon--open');
    menuNav.classList.add('menu--open');
  }
  menuOpen = !menuOpen;
});