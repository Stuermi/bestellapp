let basket = [];

let total = [{

}];

function init() {
    // getFromLocalStorage();
    renderMainContent();
    renderMenuCategory();
    renderMenu();
    addStickyClassOnScroll();
}

function renderMainContent() {
    let contentRef = document.getElementById('main_content');
    contentRef.innerHTML = '';
    contentRef.innerHTML = getContentTemplate();
}

function renderMenuCategory() {
    let menuCategoryContentRef = document.getElementById('menu_categories');
    menuCategoryContentRef.innerHTML = '';

    for (let menuCategoryIndex = 0; menuCategoryIndex < pizzeria.menuCategory.length; menuCategoryIndex++) {
        menuCategoryContentRef.innerHTML += getMenuCategoriesTemplate(menuCategoryIndex);
        loadMenuCategory(menuCategoryIndex)
    }
}

function loadMenuCategory(menuCategoryIndex) {
    let menuCategoryRef = document.getElementById(`menu_category${menuCategoryIndex}`);
    menuCategoryRef.innerHTML += pizzeria.menuCategory[menuCategoryIndex].category;
}

function renderMenu() {
    let menuContentRef = document.getElementById('menu');
    menuContentRef.innerHTML = '';

    for (let menuCategoryIndex = 0; menuCategoryIndex < pizzeria.menuCategory.length; menuCategoryIndex++) {
        menuContentRef.innerHTML += getMenuTemplate(menuCategoryIndex)
        loadMenuName(menuCategoryIndex);
        renderDish(menuCategoryIndex);
    }
}

function loadMenuName(menuCategoryIndex) {
    let menuCategoryRef = document.getElementById(`menu_name${menuCategoryIndex}`);
    menuCategoryRef.innerHTML = '';
    menuCategoryRef.innerHTML += pizzeria.menuCategory[menuCategoryIndex].category;
}

function renderDish(menuCategoryIndex) {
    let dishContentRef = document.getElementById(`dish_content${menuCategoryIndex}`);
    for (let dishIndex = 0; dishIndex < pizzeria.menuCategory[menuCategoryIndex].items.length; dishIndex++) {
        dishContentRef.innerHTML += getDishTemplate(menuCategoryIndex, dishIndex);
        loadDish(menuCategoryIndex, dishIndex);
    }
}

function loadDish(menuCategoryIndex, dishIndex) {
    let pizzaNameRef = document.getElementById(`dish_name${menuCategoryIndex}${dishIndex}`);
    let pizzaIngredientsRef = document.getElementById(`ingredients${menuCategoryIndex}${dishIndex}`);
    let pizzaPriceRef = document.getElementById(`dish_price${menuCategoryIndex}${dishIndex}`);
    pizzaNameRef.innerHTML = pizzeria.menuCategory[menuCategoryIndex].items[dishIndex].dish;
    pizzaIngredientsRef.innerHTML = pizzeria.menuCategory[menuCategoryIndex].items[dishIndex].ingredients;
    pizzaPriceRef.innerHTML = pizzeria.menuCategory[menuCategoryIndex].items[dishIndex].priceDish.toFixed(2).replace('.', ',') + ' €';
}

function addDishToBasket(menuCategoryIndex, dishIndex) {
    if (!checkDishInBasket(menuCategoryIndex, dishIndex)) {
        pushToBasket(menuCategoryIndex, dishIndex);
    } else if (checkDishInBasket(menuCategoryIndex, dishIndex)) {
        for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
            if (basket[basketIndex].dish === pizzeria.menuCategory[menuCategoryIndex].items[dishIndex].dish) {
                basket[basketIndex].quantity++;
                updateTotal(basketIndex);
            }
        }
    }
    renderFilledBasket();
    calculateTotalPrice();
}

function pushToBasket(menuCategoryIndex, dishIndex) {
    let dishPrice = pizzeria.menuCategory[menuCategoryIndex].items[dishIndex].priceDish;
    let quantity = 1;

    basket.push({
        "dish": pizzeria.menuCategory[menuCategoryIndex].items[dishIndex].dish,
        "quantity": quantity,
        "dish_price": dishPrice,
        "total": dishPrice * quantity
    })
}

function checkDishInBasket(menuCategoryIndex, dishIndex) {
    let dishIsInBasket = false;
    for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
        if (basket[basketIndex].dish == pizzeria.menuCategory[menuCategoryIndex].items[dishIndex].dish) {
            dishIsInBasket = true
        }
    }
    return dishIsInBasket;
}

function renderFilledBasket() {
    let filledBasketContentRef = document.getElementById('filled_basket_content');
    filledBasketContentRef.innerHTML = '';
    for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
        filledBasketContentRef.innerHTML += getFilledBasketTemplate(basketIndex);
        loadFilledBasket(basketIndex);
    }
    displayCorrectBasket();
}

function loadFilledBasket(basketIndex) {
    let filledBasketDishRef = document.getElementById(`filled_basket_dish${basketIndex}`);
    let filledBasketQuantityRef = document.getElementById(`filled_basket_dish_quantity${basketIndex}`);
    let filledBasketDishPriceRef = document.getElementById(`filled_basket_dish_price${basketIndex}`);
    filledBasketDishRef.innerHTML = basket[basketIndex].dish;
    filledBasketQuantityRef.innerHTML = basket[basketIndex].quantity;
    filledBasketDishPriceRef.innerHTML = basket[basketIndex].dish_price.toFixed(2);
    calculatePrice(basketIndex);
}

function displayCorrectBasket() {
    if (basket.length >= 1) {
        addDNone('empty_basket');
        removeDNone('filled_basket');
    } else if (basket.length == 0) {
        addDNone('filled_basket');
        removeDNone('empty_basket');
    }
}

function addDNone(id) {
    let elementToBeRemoved = document.getElementById(id);
    elementToBeRemoved.classList.add('d_none');
}

function removeDNone(id) {
    let elementToBeRemoved = document.getElementById(id);
    elementToBeRemoved.classList.remove('d_none');
}

// Funktion um den Preis zu berechnen
function calculatePrice(basketIndex) {
    let dishPriceRef = document.getElementById(`filled_basket_dish_price${basketIndex}`);
    let dishQuantityRef = document.getElementById(`filled_basket_dish_quantity${basketIndex}`)
    let dishPrice = parseFloat(dishPriceRef.innerHTML);
    let dishQuantity = parseFloat(dishQuantityRef.innerHTML);
    let dishTotalPrice = dishPrice * dishQuantity;
    dishPriceRef.innerHTML = dishTotalPrice.toFixed(2).replace('.', ',') + ' €';
}

// Funktion um den gesamten Preis zu erhalten
function calculateTotalPrice(){
    let subtotal = 0;
    let deliveryCost = pizzeria.deliveryCost;
    let deliveryCostRef = document.getElementById('delivery_cost');
    deliveryCostRef.innerHTML = pizzeria.deliveryCost.toFixed(2).replace('.', ',') + ' €';
    let subtotalRef = document.getElementById('subtotal_amount');
    let totalRef = document.getElementById('total_amount');
    for (let totalIndex = 0; totalIndex < basket.length; totalIndex++) {
        subtotal += basket[totalIndex].total;
    }
    subtotalRef.innerHTML = subtotal.toFixed(2).replace('.', ',') + ' €';
    let total = subtotal + deliveryCost;
    totalRef.innerHTML = total.toFixed(2).replace('.', ',') + ' €';
}

function addQuantity(basketIndex) {
    basket[basketIndex].quantity++;
    updateTotal(basketIndex);
    renderFilledBasket();
}

function reduceQuantity(basketIndex) {
    basket[basketIndex].quantity--;
    if (basket[basketIndex].quantity == 0) {
        removeDishFromBasket(basketIndex);
    } else {
        updateTotal(basketIndex);
    }
    renderFilledBasket();
}

function updateTotal(basketIndex){
    let dishPrice = basket[basketIndex].dish_price;
    let quantity = basket[basketIndex].quantity;
    basket[basketIndex].total = dishPrice * quantity;
    calculateTotalPrice();

}

function removeDishFromBasket(basketIndex) {
    basket.splice(basketIndex, 1);
    renderFilledBasket();
    calculateTotalPrice();
}

function bubblingProtection(event) {
    event.stopPropagation();
}