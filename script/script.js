let basket = [];

let total = [{

}];

function init() {
    // getFromLocalStorage();
    renderMainContent();
    renderMenuCategory();
    renderMenu();
    toggleResponsiveBasketButtonContainer();
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
    standardHighlightMenuCategory();
}

function standardHighlightMenuCategory(){
    let startMenuCategoryRef = document.getElementById('menu_category0');
    startMenuCategoryRef.classList.add('selected_menu_category');
}

function highlightChosenMenuCategory(menuCategoryIndex) {
    let menuToBeHighlightedRef = document.getElementById(`menu_category${menuCategoryIndex}`);
    let removeHighlightRef = document.querySelector('.selected_menu_category');
    removeHighlightRef.classList.remove('selected_menu_category');
    menuToBeHighlightedRef.classList.add('selected_menu_category');
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
    renderResponsiveBasketButton();
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

function calculatePrice(basketIndex) {
    let dishPriceRef = document.getElementById(`filled_basket_dish_price${basketIndex}`);
    let dishQuantityRef = document.getElementById(`filled_basket_dish_quantity${basketIndex}`)
    let dishPrice = parseFloat(dishPriceRef.innerHTML);
    let dishQuantity = parseFloat(dishQuantityRef.innerHTML);
    let dishTotalPrice = dishPrice * dishQuantity;
    dishPriceRef.innerHTML = dishTotalPrice.toFixed(2).replace('.', ',') + ' €';
}

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
    renderFilledResponsiveBasket();
}

function reduceQuantity(basketIndex) {
    basket[basketIndex].quantity--;
    if (basket[basketIndex].quantity == 0) {
        removeDishFromBasket(basketIndex);
    } else {
        updateTotal(basketIndex);
    }
    renderFilledBasket();
    renderFilledResponsiveBasket();
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
    renderFilledResponsiveBasket();
    calculateTotalPrice();
    calculateTotalPriceForResponsive();
    toggleResponsiveBasketButtonContainer();
}

function scrollToCorrectHref(event){
    let link = event.currentTarget;
    let href = link.getAttribute('href');
    
    if (href === '#menu_name0') {
        event.preventDefault();
        window.scrollTo({
            top: 500,
        });
    }
}

function handleScroll() {
    const menuCategories = document.getElementById('menu_categories');
    const rect = menuCategories.getBoundingClientRect();

    // Hier 0 ist die Oberkante des Viewports
    if (rect.top <= 113) {
        menuCategories.classList.add('is_sticky'); // Klasse hinzufügen, wenn sticky
    } else {
        menuCategories.classList.remove('is_sticky'); // Klasse entfernen, wenn nicht sticky
    }
}

window.addEventListener('scroll', handleScroll);

function bubblingProtection(event) {
    event.stopPropagation();
}

function toggleDNone(id){
    let elementToHide = document.getElementById(id);
    elementToHide.classList.toggle('d_none');
}

// Responsive Functions
function openOverlay(basketIndex){
    let overlayRef = document.getElementById('overlay');
    overlayRef.classList.toggle('d_none');
    document.body.classList.add('no_scroll');
    renderFilledResponsiveBasket(basketIndex);
}

function openResponsiveNavbar(){
    let navbarRef = document.getElementById('responsive_menu_navbar');
    navbarRef.innerHTML = '';
    for (let menuCategoryIndex = 0; menuCategoryIndex < pizzeria.menuCategory.length; menuCategoryIndex++) {
        navbarRef.innerHTML += getResponsiveNavBarTemplate(menuCategoryIndex);
    }
    toggleDNone('open_responsive_menu');
    toggleDNone('close_responsive_menu');
}

function closeResponsiveNavbar(){
    let navbarRef = document.getElementById('responsive_menu_navbar');
    navbarRef.innerHTML = '';
    toggleDNone('close_responsive_menu');
    toggleDNone('open_responsive_menu');
}

function renderResponsiveBasketButton(){
    let responsiveBasketButtonRef = document.getElementById('basket_button_container');
    responsiveBasketButtonRef.innerHTML = '';
    for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
        responsiveBasketButtonRef.innerHTML = getResponsiveBasketButtonTemplate(basketIndex);
    }
    calculateResponsiveBasketValues();
    calculateTotalQuantity();
    toggleResponsiveBasketButtonContainer();
}

function toggleResponsiveBasketButtonContainer(){
    let responsiveBasketButtonContainerRef = document.getElementById('basket_button_container');
    if (basket.length == 0) {
        responsiveBasketButtonContainerRef.classList.add('d_none');
    } else if (basket.length >= 1){
        responsiveBasketButtonContainerRef.classList.remove('d_none');
    }
}

function renderFilledResponsiveBasket(){
    let filledResponsiveBasketRef = document.getElementById('filled_responsive_basket_content')
    filledResponsiveBasketRef.innerHTML = '';
    if (basket.length >= 1){    
        for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
        filledResponsiveBasketRef.innerHTML += getFilledResponsiveBasketTemplate(basketIndex);
        loadFilledResponsiveBasket(basketIndex);
    }
}
}

function loadFilledResponsiveBasket(basketIndex) {
    let filledResponsiveBasketDishRef = document.getElementById(`filled_responsive_basket_dish${basketIndex}`);
    let filledResponsiveBasketQuantityRef = document.getElementById(`filled_responsive_basket_dish_quantity${basketIndex}`);
    let filledResponsiveBasketDishPriceRef = document.getElementById(`filled_responsive_basket_dish_price${basketIndex}`);
    filledResponsiveBasketDishRef.innerHTML = basket[basketIndex].dish;
    filledResponsiveBasketQuantityRef.innerHTML = basket[basketIndex].quantity;
    filledResponsiveBasketDishPriceRef.innerHTML = basket[basketIndex].dish_price.toFixed(2);
    calculatePriceForResponsive(basketIndex);
    calculateTotalPriceForResponsive();
}

function calculatePriceForResponsive(basketIndex) {
    let responsiveDishPriceRef = document.getElementById(`filled_responsive_basket_dish_price${basketIndex}`);
    let responsiveDishQuantityRef = document.getElementById(`filled_responsive_basket_dish_quantity${basketIndex}`)
    let responsiveDishPrice = parseFloat(responsiveDishPriceRef.innerHTML);
    let responsiveDishQuantity = parseFloat(responsiveDishQuantityRef.innerHTML);
    let responsiveDishTotalPrice = responsiveDishPrice * responsiveDishQuantity;
    responsiveDishPriceRef.innerHTML = responsiveDishTotalPrice.toFixed(2).replace('.', ',') + ' €';
    calculateResponsiveBasketValues();
    calculateTotalQuantity();
}

function calculateTotalPriceForResponsive(){
    let subtotal = 0;
    let deliveryCost = pizzeria.deliveryCost;
    let deliveryCostRef = document.getElementById('responsive_delivery_cost');
    deliveryCostRef.innerHTML = pizzeria.deliveryCost.toFixed(2).replace('.', ',') + ' €';
    let subtotalRef = document.getElementById('responsive_subtotal_amount');
    let totalRef = document.getElementById('responsive_total_amount');
    for (let totalIndex = 0; totalIndex < basket.length; totalIndex++) {
        subtotal += basket[totalIndex].total;
    }
    subtotalRef.innerHTML = subtotal.toFixed(2).replace('.', ',') + ' €';
    let total = subtotal + deliveryCost;
    totalRef.innerHTML = total.toFixed(2).replace('.', ',') + ' €';
}

function calculateTotalQuantity(){
    let quantity = 0;
    let quantityRef = document.getElementById('basket_button_quantity_p');
    quantityRef.innerHTML = '';
    for (let totalIndex = 0; totalIndex < basket.length; totalIndex++) {
        quantity += basket[totalIndex].quantity;
    }
    quantityRef.innerHTML = quantity;
}

function calculateResponsiveBasketValues(){
    let subtotal = 0;
    let deliveryCost = pizzeria.deliveryCost;
    let totalRef = document.getElementById('responsive_basket_button_total');
    for (let totalIndex = 0; totalIndex < basket.length; totalIndex++) {
        subtotal += basket[totalIndex].total;
    }
    let total = subtotal + deliveryCost;
    totalRef.innerHTML = 'Warenkorb ' + `(${total.toFixed(2).replace('.', ',') + ' €'})`;
}

function closeOverlay() {
    let overlayRef = document.getElementById('overlay');
    overlayRef.classList.toggle('d_none');
    document.body.classList.remove('no_scroll');
}