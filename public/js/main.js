const containerdisplacement = document.querySelector('.boxdisplacement');
const btnsignup = document.querySelectorAll('.btn');
const btnDeleteWindow = document.querySelector('.boxdisplacement__btn');

btnsignup.forEach(element => {
    element.addEventListener('click', () => {
        console.log('click')
        containerdisplacement.classList.toggle('show');
    });
});

btnDeleteWindow.addEventListener('click', () => {
    containerdisplacement.classList.toggle('show');
});