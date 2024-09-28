function init(){
    // LocalStorage hinzufügen
    // getFromLocalStorage();
    renderContent();
    renderMenuCategory();
}

function renderContent(){
    let contentRef = document.getElementById('main_content');
    contentRef.innerHTML = '';
    contentRef.innerHTML = getContentTemplate();
}

function renderMenuCategory(){
    let menuCategoryTemplateRef = document.getElementById('menu_categories');
        menuCategoryTemplateRef.innerHTML = '';

        for (let menuCategoryIndex = 0; menuCategoryIndex < pizzeria.menuCategory.length; menuCategoryIndex++) {
            menuCategoryTemplateRef.innerHTML += getMenuCategoriesTemplate(menuCategoryIndex);
            let menuCategoryRef = document.getElementById(`menu_category${menuCategoryIndex}`);
            menuCategoryRef.innerHTML += pizzeria.menuCategory[menuCategoryIndex].category;
        }
}


