// Toggle menu functionality
const toggleMenu = () => {
    const menuBar = document.querySelector('.small-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');

    menuBar.classList.toggle('expanded');
    hamburgerIcon.classList.toggle('active');
};

// Event listener for the hamburger menu
document.addEventListener('DOMContentLoaded', () => {
    const toggleMenuButton = document.querySelector('.hamburger-icon');
    toggleMenuButton.addEventListener('click', toggleMenu);

    // Fetch and display JSON data
    fetchData();
});

// Function to fetch JSON data
const fetchData = async () => {
    try {
        const url = "https://raw.githubusercontent.com/siddhpatelsdp/siddhpatelsdp.github.io/refs/heads/main/projects/part6/data.json"; // Replace with your GitHub raw URL
        const response = await fetch(url);
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error("Error fetching JSON data:", error);
    }
};

// Function to display JSON data
const displayData = (data) => {
    const tradeTableBody = document.querySelector('.trade-table tbody');

    // Clear existing table rows
    tradeTableBody.innerHTML = '';

    // Loop through the JSON data and create table rows
    data.forEach((trade) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${trade.instrument}</td>
            <td>${trade.entry_price}</td>
            <td>${trade.exit_price}</td>
            <td>${trade.trade_date}</td>
            <td>${trade.profit_loss}</td>
            <td>${trade.notes}</td>
            <td><button class="plus-icon">+</button></td>
        `;

        tradeTableBody.appendChild(row);
    });
};