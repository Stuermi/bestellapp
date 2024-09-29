function init(){
    // getFromLocalStorage();
    renderMainContent();
    renderMenuCategory();
    renderMenu();
}

function renderMainContent(){
    let contentRef = document.getElementById('main_content');
    contentRef.innerHTML = '';
    contentRef.innerHTML = getContentTemplate();
}

function renderMenuCategory(){
    let menuCategoryContentRef = document.getElementById('menu_categories');
        menuCategoryContentRef.innerHTML = '';

        for (let menuCategoryIndex = 0; menuCategoryIndex < pizzeria.menuCategory.length; menuCategoryIndex++) {
            menuCategoryContentRef.innerHTML += getMenuCategoriesTemplate(menuCategoryIndex);
            loadMenuCategory(menuCategoryIndex)
        }
}

function loadMenuCategory(menuCategoryIndex){
    let menuCategoryRef = document.getElementById(`menu_category${menuCategoryIndex}`);
    menuCategoryRef.innerHTML += pizzeria.menuCategory[menuCategoryIndex].category;
}

function renderMenu(){
    let menuContentRef = document.getElementById('menu');
    menuContentRef.innerHTML = '';

    for (let menuCategoryIndex = 0; menuCategoryIndex < pizzeria.menuCategory.length; menuCategoryIndex++) {
            menuContentRef.innerHTML += getMenuTemplate(menuCategoryIndex)
            loadMenuName(menuCategoryIndex);
            renderDish(menuCategoryIndex);
        }
}

function loadMenuName(menuCategoryIndex){
    let menuCategoryRef = document.getElementById(`menu_name${menuCategoryIndex}`);
    menuCategoryRef.innerHTML = '';
    menuCategoryRef.innerHTML += pizzeria.menuCategory[menuCategoryIndex].category;
}

function renderDish(menuCategoryIndex){
    let dishContentRef = document.getElementById(`dish_content${menuCategoryIndex}`);
    for (let dishIndex = 0; dishIndex < pizzeria.menuCategory[menuCategoryIndex].items.length; dishIndex++) {
        dishContentRef.innerHTML += getDishTemplate(menuCategoryIndex, dishIndex);
        loadDish(menuCategoryIndex, dishIndex);
    }
}

function loadDish(menuCategoryIndex, dishIndex){
    let pizzaNameRef = document.getElementById(`dish_name${menuCategoryIndex}${dishIndex}`);
    let pizzaIngredientsRef = document.getElementById(`ingredients${menuCategoryIndex}${dishIndex}`);
    let pizzaPriceRef = document.getElementById(`dish_price${menuCategoryIndex}${dishIndex}`);
    pizzaNameRef.innerHTML = pizzeria.menuCategory[menuCategoryIndex].items[dishIndex].dish;
    pizzaIngredientsRef.innerHTML = pizzeria.menuCategory[menuCategoryIndex].items[dishIndex].ingredients;
    pizzaPriceRef.innerHTML = pizzeria.menuCategory[menuCategoryIndex].items[dishIndex].priceDish.toFixed(2).replace('.',',')+ ' €';    
}
