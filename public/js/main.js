const containerdisplacement = document.querySelector('.boxdisplacement');
const btnsignup = document.querySelectorAll('.btn');
const btnDeleteWindow = document.querySelector('.boxdisplacement__btn');

btnsignup.forEach(element => {
    element.addEventListener('click', () => {
        console.log('click')
        containerdisplacement.classList.toggle('show');
    });
});

const btnMenuBurguer = document.querySelector('.navbar__dropdown'),
      showMenu = document.querySelector('.navbar__menu'),
      arrow = document.querySelector('.fa-chevron-right'); 
console.log(btnMenuBurguer)

btnMenuBurguer.addEventListener('click', () => {
    showMenu.classList.toggle('top');
    arrow.classList.toggle('rotate');
})