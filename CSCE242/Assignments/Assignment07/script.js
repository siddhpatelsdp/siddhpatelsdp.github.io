const sayHelloColumn = document.getElementById('sayHello');
const helloContainer = document.getElementById('helloContainer');

sayHelloColumn.addEventListener('click', () => {
    const helloText = document.createElement('div');
    helloText.textContent = 'hello';
    helloContainer.appendChild(helloText);
    sayHelloColumn.style.height = 'auto';
});

const colorPicker = document.getElementById('colorPicker');
const star = document.getElementById('star');

colorPicker.addEventListener('input', (event) => {
    star.style.color = event.target.value;
});

const imageContainer = document.getElementById('imageContainer');
const image = document.getElementById('image');
const images = ["https://fakeimg.pl/200x200/", "https://fakeimg.pl/200x200/ffffff/", "https://fakeimg.pl/200x200/bf6b95/", "https://fakeimg.pl/200x200/71bf44/"];
let currentImageIndex = 0;

imageContainer.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    image.style.opacity = 0;
    setTimeout(() => {
        image.src = images[currentImageIndex];
        image.style.opacity = 1;
    }, 300);
});
