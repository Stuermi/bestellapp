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
        

        for (let dishIndex = 0; dishIndex < pizzeria.menuCategory[menuCategoryIndex].items.length; dishIndex++) {
            menuContentRef.innerHTML += getMenuTemplate(menuCategoryIndex, dishIndex)
            loadMenuName(menuCategoryIndex);
            // loadDish(menuCategoryIndex, dishIndex);
        }
    }
}

function loadMenuName(menuCategoryIndex){
    let menuCategoryRef = document.getElementById(`menu_name${menuCategoryIndex}`);
    menuCategoryRef.innerHTML = '';
    menuCategoryRef.innerHTML += pizzeria.menuCategory[menuCategoryIndex].category;
}

// function loadDish(menuCategoryIndex, dishIndex){
//     let dishContentRef = document.getElementById(`dish${dishIndex}`);
//     for (let dishIndex = 0; dishIndex < pizzeria.menuCategory[menuCategoryIndex].items.length; dishIndex++) {
//         dishContentRef.innerHTML += getDishTemplate(dishIndex)
//     }
// }
