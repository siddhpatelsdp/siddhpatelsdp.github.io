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

    fetchData();
});

// Function to display JSON data
const displayData = (data) => {
    const tradeTableBody = document.querySelector('.trade-table tbody');

    tradeTableBody.innerHTML = '';

    data.forEach((trade) => {
        const row = document.createElement('tr');

        const isForex = trade.instrument.includes("/") && 
                        !["XAU/USD", "BTC/USD"].includes(trade.instrument);

        const entryPrice = formatNumber(trade.entry_price, isForex);
        const exitPrice = formatNumber(trade.exit_price, isForex);

        const profitLoss = parseFloat(trade.profit_loss).toFixed(2);

        row.innerHTML = `
            <td>${trade.instrument}</td>
            <td>${entryPrice}</td>
            <td>${exitPrice}</td>
            <td>${trade.trade_date}</td>
            <td>${profitLoss}</td>
            <td>${trade.notes}</td>
            <td><button class="plus-icon">+</button></td>
        `;

        tradeTableBody.appendChild(row);
    });
};

// Helper function to format numbers
const formatNumber = (value, isForex) => {
    const number = parseFloat(value);

    if (isForex) {
        return number.toFixed(5);
    } else {
        return number.toFixed(2);
    }
};

// Function to calculate metrics from the JSON data
const calculateMetrics = (data) => {
    const totalTrades = data.length;

    let winningTrades = 0;
    let totalProfitLoss = 0;
    let bestTrade = { profit_loss: -Infinity };
    let worstTrade = { profit_loss: Infinity };

    data.forEach((trade) => {
        const profitLoss = parseFloat(trade.profit_loss);

        if (profitLoss > 0) {
            winningTrades++;
        }

        totalProfitLoss += profitLoss;

        if (profitLoss > bestTrade.profit_loss) {
            bestTrade = trade;
        }

        if (profitLoss < worstTrade.profit_loss) {
            worstTrade = trade;
        }
    });

    // Calculate win rate and average profit/loss
    const winRate = ((winningTrades / totalTrades) * 100).toFixed(2);
    const avgProfitLoss = (totalProfitLoss / totalTrades).toFixed(2);

    return {
        totalTrades,
        winRate,
        avgProfitLoss,
        bestTrade,
        worstTrade,
    };
};

// Function to display Live Statistics
const displayLiveStatistics = (data) => {
    const metrics = calculateMetrics(data);

    const liveStatsTable = document.querySelector('.stats-table');
    if (!liveStatsTable) {
        console.error("Live Statistics table not found!");
        return;
    }

    liveStatsTable.innerHTML = `
        <tr>
            <td>Total Trades</td>
            <td>${metrics.totalTrades}</td>
        </tr>
        <tr>
            <td>Win Rate</td>
            <td>${metrics.winRate}%</td>
        </tr>
        <tr>
            <td>Best Trade</td>
            <td>+${parseFloat(metrics.bestTrade.profit_loss).toFixed(2)}</td>
        </tr>
        <tr>
            <td>Worst Trade</td>
            <td>${parseFloat(metrics.worstTrade.profit_loss).toFixed(2)}</td>
        </tr>
    `;
};

// Function to display Key Statistics
const displayKeyStatistics = (data) => {
    const metrics = calculateMetrics(data);

    const keyStatsTable = document.querySelector('.key-stats-table');
    if (!keyStatsTable) {
        console.error("Key Statistics table not found!");
        return;
    }

    keyStatsTable.innerHTML = `
        <tr>
            <td>Total Trades</td>
            <td>${metrics.totalTrades}</td>
        </tr>
        <tr>
            <td>Win Rate</td>
            <td>${metrics.winRate}%</td>
        </tr>
        <tr>
            <td>Avg. P/L Per Trade</td>
            <td>${metrics.avgProfitLoss}</td>
        </tr>
        <tr>
            <td>Best Trade</td>
            <td>+${parseFloat(metrics.bestTrade.profit_loss).toFixed(2)}</td>
        </tr>
        <tr>
            <td>Worst Trade</td>
            <td>${parseFloat(metrics.worstTrade.profit_loss).toFixed(2)}</td>
        </tr>
    `;
};

// Fetch JSON data and display everything
const fetchData = async () => {
    try {
        const url = "https://raw.githubusercontent.com/siddhpatelsdp/siddhpatelsdp.github.io/refs/heads/main/projects/part6/data.json"; // Replace with your GitHub raw URL
        const response = await fetch(url);
        const data = await response.json();

        const currentPage = window.location.pathname.split('/').pop();

        if (currentPage === 'trade-history.html') {
            displayData(data);
            displayLiveStatistics(data);
        } else if (currentPage === 'insights.html') {
            displayKeyStatistics(data);
        }
    } catch (error) {
        console.error("Error fetching JSON data:", error);
    }
};

// Call fetchData when the page loads
document.addEventListener('DOMContentLoaded', fetchData);

document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const resultDiv = document.getElementById('form-result');

    resultDiv.style.display = 'block';

    resultDiv.innerHTML = '<p>Sending your message...</p>';
    resultDiv.style.color = 'var(--text-color)';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok) {
            resultDiv.innerHTML = '<p>Message sent successfully!</p>';
            resultDiv.style.color = 'var(--accent-color)';
            form.reset();
        } else {
            resultDiv.innerHTML = `<p>Error: ${result.message || 'Failed to send message. Please try again.'}</p>`;
            resultDiv.style.color = 'red';
        }

    } catch (error) {
        resultDiv.innerHTML = '<p>Error: Failed to send message. Please try again.</p>';
        resultDiv.style.color = 'red';
    }
});