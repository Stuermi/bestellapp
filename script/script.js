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
        menuContentRef.innerHTML += getMenuTemplate(menuCategoryIndex);
        loadMenuName(menuCategoryIndex);
    }
}

function loadMenuName(menuCategoryIndex){
    let menuCategoryRef = document.getElementById(`menu_name${menuCategoryIndex}`);
    menuCategoryRef.innerHTML += pizzeria.menuCategory[menuCategoryIndex].category;
}

