// toggle menu functionality
const toggleMenu = () => {
    const menuBar = document.querySelector('.small-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');

    menuBar.classList.toggle('expanded');
    hamburgerIcon.classList.toggle('active');
};

// event listener for the hamburger menu
document.addEventListener('DOMContentLoaded', () => {
    const toggleMenuButton = document.querySelector('.hamburger-icon');
    toggleMenuButton.addEventListener('click', toggleMenu);
});
