const burgerMenu = document.getElementById('burger-menu');
const menu = document.querySelector('#menu');

burgerMenu.addEventListener('click', () => {
    menu.classList.toggle('open');
    burgerMenu.classList.toggle('active');
});
