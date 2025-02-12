// toggle menu functionality
function toggleMenu() {
    const menuItems = document.querySelector('.small-menu .menu-items');
    const arrow = document.querySelector('.arrow');

    if (menuItems.style.display === 'block') {
        menuItems.style.display = 'none';
        arrow.innerHTML = '&#9660;';
    } else {
        menuItems.style.display = 'block';
        arrow.innerHTML = '&#9650;';
    }
}

// exercise functionality
function showExercise(exercise) {
    const exercise1 = document.getElementById('exercise1');
    const exercise2 = document.getElementById('exercise2');

    if (exercise === 1) {
        exercise1.style.display = 'block';
        exercise2.style.display = 'none';
    } else {
        exercise1.style.display = 'none';
        exercise2.style.display = 'block';
    }
}

// show picture based on transportation input
function showPicture() {
    const transportation = document.getElementById('transportation').value.toLowerCase();
    const illustration = document.getElementById('illustration');
    let imageUrl = '';

    switch (transportation) {
        case 'bike':
            imageUrl = 'Images/bike.jpg';
            break;
        case 'scooter':
            imageUrl = 'Images/scooter.jpg';
            break;
        case 'car':
            imageUrl = 'Images/porsche.jpg';
            break;
        case 'skateboard':
            imageUrl = 'Images/skateboard.jpg';
            break;
        default:
            imageUrl = '';
    }

    illustration.innerHTML = imageUrl ? `<img src="${imageUrl}" alt="${transportation}">` : '';
}

// change heart color
function colorHeart(color) {
    document.getElementById('heart').style.color = color;
}
