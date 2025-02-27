class Pizza {
    constructor(name, ingredients, sauce, cheese, price, imageFileName) {
        this.name = name;
        this.ingredients = ingredients;
        this.sauce = sauce;
        this.cheese = cheese;
        this.price = price;
        this.imageFileName = imageFileName;
    }

    getSection = () => {
        return `
            <section class="pizza-box" data-name="${this.name}">
                <h3>${this.name}</h3>
                <img src="images/${this.imageFileName}" alt="${this.name}" />
            </section>
        `;
    }

    getExpandedSection = () => {
        return `
            <section class="pizza-details">
                <div class="pizza-text">
                    <h3>${this.name}</h3>
                    <p><strong>Ingredients:</strong> ${this.ingredients}</p>
                    <p><strong>Sauce:</strong> ${this.sauce}</p>
                    <p><strong>Cheese:</strong> ${this.cheese}</p>
                    <p><strong>Price:</strong> $${this.price}</p>
                </div>
                <img src="images/${this.imageFileName}" alt="${this.name}" class="rotate-animation" />
            </section>
        `;
    }
}

const pizzas = [
    new Pizza('Hawaiian Pizza', 'Ham, Pineapple', 'Tomato Sauce', 'Mozzarella', 15.99, 'hawaiianpizza.jpeg'),
    new Pizza('BCR Pizza', 'Bacon, Chicken, Ranch', 'Ranch Sauce', 'Mozzarella', 17.99, 'bcrpizza.jpeg'),
    new Pizza('Margarita Pizza', 'Basil, Tomatoes', 'Extra Virgin Olive Oil', 'Fresh Mozzarella', 19.20, 'margaritapizza.jpeg'),
    new Pizza('Pepperoni Pizza', 'Pepperoni', 'Tomato Sauce', 'Mozzarella', 16.50, 'pepperonipizza.jpeg'),
    new Pizza('Veggie Pizza', 'Bell Peppers, Onions, Mushrooms', 'Tomato Sauce', 'Mozzarella', 14.99, 'veggiepizza.jpeg')
];

const addPizzasToDOM = () => {
    const pizzaList = document.querySelector('.pizza-list');
    pizzas.forEach(pizza => {
        pizzaList.innerHTML += pizza.getSection();
    });

    const pizzaBoxes = document.querySelectorAll('.pizza-box');
    pizzaBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const pizzaName = box.getAttribute('data-name');
            openModal(pizzaName);
        });
    });
};

const openModal = (pizzaName) => {
    const pizza = pizzas.find(p => p.name === pizzaName);
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = pizza.getExpandedSection();

    const modal = document.getElementById('pizzaModal');
    modal.style.display = 'block';
    modal.classList.add('fade-in');

    setTimeout(() => {
        modal.classList.remove('fade-in');
    }, 500);
};

const closeModal = () => {
    const modal = document.getElementById('pizzaModal');
    modal.style.display = 'none';
};

window.onload = () => {
    addPizzasToDOM();

    const closeButton = document.getElementById('closeModal');
    closeButton.addEventListener('click', closeModal);

    const modal = document.getElementById('pizzaModal');
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
};