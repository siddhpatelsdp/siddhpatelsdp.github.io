const images = {
    "Happy Birthday": "Images/birthday.jpg",
    "Crazy Clown": "Images/clown.jpg",
    "It's Raining": "Images/rain.jpg",
    "Quiet Time": "Images/read.jpg",
    "Working Hard": "Images/shovel.jpg",
    "Work From Home": "Images/work.jpg"
};

window.onload = () => {
    const titlesContainer = document.getElementById('titles');
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const popupTitle = document.getElementById('popup-title');
    const popupImage = document.getElementById('popup-image');
    const closeBtn = document.getElementById('close');

    Object.keys(images).forEach((title) => {
        const li = document.createElement('li');
        li.innerText = title;
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => {
            popupTitle.innerText = title;
            popupImage.src = images[title];
            overlay.classList.remove('hidden');
            popup.classList.remove('hidden');
            popup.style.display = 'block';
        });
        titlesContainer.appendChild(li);
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
        popup.classList.add('hidden');
        popup.style.display = 'none';
    });
};
