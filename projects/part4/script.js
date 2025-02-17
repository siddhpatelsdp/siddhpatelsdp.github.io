function toggleMenu() {
    const menuItems = document.querySelector('.small-menu .menu-items');
    const arrow = document.querySelector('.arrow');
    const smallMenu = document.querySelector('.small-menu');

    if (menuItems.style.display === 'flex') {
        menuItems.style.display = 'none';
        arrow.classList.remove('open');
    } else {
        menuItems.style.display = 'flex';
        arrow.classList.add('open');
    }
}
