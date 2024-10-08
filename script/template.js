function getContentTemplate() {
    return `<section id="main_section" class="main_section">
            <div class="header_image_container">
                <img class="header_image" src="./assets/img/pizza.jpg" alt="Pizza Bild">
                <img class="pizzeria_logo" src="./assets/icon/pizzeria_logo.png" alt="Pizzeria Logo">
            </div>

            <div id="restaurant_info" class="restaurant_info">
                <h1>Pizzeria Buon Appetito</h1>
                <div class="restaurant_information_row">
                    <div class="restaurant_information">
                        <p>Bewertung (4,2 von 5 <img class="rating_star" src="./assets/icon/star_color.png"
                            alt="Stern Orange">)</p>
                    </div>
                    <div class="restaurant_information">
                        <img title="Mindestbestellwert" class="bag_icon" src="assets/icon/bag.png" alt="Shopping Bag Icon">
                        <p>${pizzeria.minimumOrder.toFixed(2).replace('.', ',')} €</p>
                    </div>
                    <div class="restaurant_information">
                        <img title="Lieferkosten" class="delivery_icon" src="assets/icon/bike.png" alt="Bike Icon">
                        <p>${pizzeria.deliveryCost.toFixed(2).replace('.', ',')} €</p>
                    </div>
                </div>
            </div>

            <div class="responsive_menu_category is_sticky">
                <div id="open_responsive_menu" class="responsive_menu_button" onclick="openResponsiveNavbar()">
                    <img class="down_arrow_icon" src="./assets/icon/double_arrow_color.png" alt="Down Arrow Icon">
                </div>
                <div id="close_responsive_menu" class="responsive_menu_button d_none" onclick="closeResponsiveNavbar()">
                    <img class="x_icon_close" src="./assets/icon/x_icon_color.png" alt="Close Icon">
                </div>
                <div id="responsive_menu_navbar" class="responsive_menu_navbar"></div>
            </div>

            <div id="menu_categories" class="menu_categories"></div>

            <div id="menu" class="menu"></div>

            <div id="basket_button_container" class="basket_button_container"></div>

            <div id="overlay" class="overlay d_none">
                <div id="basket_dialogue" class="basket_dialogue">
                    <div onclick="closeOverlay()" class="close_button">
                        <img class="x_icon" title="Schließen" src="./assets/icon/x_icon_color.png" alt="Close Icon">
                    </div>
                    <div class="side_header">
                        <h2>Warenkorb</h2>
                        <hr>
                    </div>
                    <div id="filled_responsive_basket">
                        <div class="filled_responsive_basket_content" id="filled_responsive_basket_content"></div>
                        <hr>
                        <div class="order_price">
                            <div class="subtotal">
                                <p>Zwischensumme</p>
                                <p id="responsive_subtotal_amount"></p>
                            </div>
                            <div class="delivery_cost">
                                <p>Lieferkosten</p>
                                <p id="responsive_delivery_cost"></p>
                            </div>
                            <div class="total">
                                <p>Gesamtsumme</p>
                                <p id="responsive_total_amount"></p>
                            </div>
                        </div>
                        <hr>
                        <div class="order_button_row">
                            <a onclick="clearLocalStorage()" href="./order_filled.html">
                                <button class="order_button">Bestellen</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </section>

        <section class="side_section">
            <div class="side_header">
                <h2>Warenkorb</h2>
                <hr>
            </div>

            <div class="basket">
                <div id="empty_basket" class="empty_basket">
                    <img class="basket_icon" src="./assets/icon/shopping-basket.png" alt="Basket Icon">
                    <h2>Fülle deinen Warenkorb</h2>
                    <p>Füge leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen</p>
                </div>

                <div id="filled_basket" class="filled_basket d_none">
                <div class="filled_basket_content" id="filled_basket_content"></div>
                    <hr>
                    <div class="order_price">
                        <div class="subtotal">
                            <p>Zwischensumme</p>
                            <p id="subtotal_amount"></p>
                        </div>
                        <div class="delivery_cost">
                            <p>Lieferkosten</p>
                            <p id="delivery_cost"></p>
                        </div>
                        <div class="total">
                            <p>Gesamtsumme</p>
                            <p id="total_amount"></p>
                        </div>
                    </div>
                    <hr>
                    <div class="order_button_row">
                            <a onclick="clearLocalStorage()" href="./order_filled.html">
                                <button class="order_button">Bestellen</button>
                            </a>
                    </div>
                </div>
            </div>
        </section>`
}

function getMenuCategoriesTemplate(menuCategoryIndex) {
    return `
                <nav class="menu_category_selection">
                    <a onclick="highlightChosenMenuCategory(${menuCategoryIndex}); scrollToCorrectHref(event)" id="menu_category${menuCategoryIndex}" href="#menu_name${menuCategoryIndex}"></a>
                </nav>`
}

function getMenuTemplate(menuCategoryIndex) {
    return `
            <h2 id="menu_name${menuCategoryIndex}" class="menu_header"></h2>
                <div id="dish_content${menuCategoryIndex}" class="dish_content"></div>
`
}

function getDishTemplate(menuCategoryIndex, dishIndex) {
    return `
                <div id="dish${menuCategoryIndex}${dishIndex}" class="dish">
                    <h2 id="dish_name${menuCategoryIndex}${dishIndex}"></h2>
                    <p id="ingredients${menuCategoryIndex}${dishIndex}"></p>
                    <span id="dish_price${menuCategoryIndex}${dishIndex}"></span>
                    <div onclick="bubblingProtection(event); addDishToBasket(${menuCategoryIndex}, ${dishIndex})" class="add_button">
                        <img class="plus_icon" src="./assets/icon/plus_icon_color.png" alt="Plus Icon">
                    </div>
                </div>`
}

function getFilledBasketTemplate(basketIndex) {
    return `
                    <div class="filled_basket_header">
                        <h2 id="filled_basket_dish${basketIndex}">name_dish</h2>
                    </div>
                    <div class="filled_basket_row">
                        <div class="calculator">
                            <div onclick="reduceQuantity(${basketIndex})" title="Menge reduzieren" class="calc_button">
                                <img class="minus_icon_calc" src="./assets/icon/minus_icon_color.png" alt="Minus Icon">
                            </div>
                            <p id="filled_basket_dish_quantity${basketIndex}">amount_x</p>
                            <div onclick="addQuantity(${basketIndex})" title="Menge hinzufügen" class="calc_button">
                                <img class="plus_icon_calc" src="./assets/icon/plus_icon_color.png" alt="Plus Icon">
                            </div>
                        </div>
                        <p id="filled_basket_dish_price${basketIndex}">price_dish</p>
                        <img onclick="removeDishFromBasket(${basketIndex})" title="Gericht entfernen" class="trash_icon" src="./assets/icon/trash_can_color.png"
                            alt="">
                    </div>`
}

function getResponsiveBasketButtonTemplate(basketIndex){
    return `
                <div onclick="openOverlay(${basketIndex})" id="basket_button" class="basket_button">
                <div class="basket_icon_container">
                    <img class="basket_icon_filter" src="assets/icon/shopping-basket.png" alt="Warenkorb Icon">
                    <div id="basket_button_quantity" class="basket_button_quantity">
                        <p id="basket_button_quantity_p">1</p>
                    </div>
                </div>
                    <p id="responsive_basket_button_total">Warenkorb (total_amount €)</p>
                </div>`
}

function getFilledResponsiveBasketTemplate (basketIndex){
    return `
                    <div class="filled_basket_header">
                        <h2 id="filled_responsive_basket_dish${basketIndex}">name_dish</h2>
                    </div>
                    <div class="filled_responsive_basket_row">
                        <div class="calculator">
                            <div onclick="reduceQuantity(${basketIndex})" title="Menge reduzieren" class="calc_button">
                                <img class="minus_icon_calc" src="./assets/icon/minus_icon_color.png" alt="Minus Icon">
                            </div>
                            <p id="filled_responsive_basket_dish_quantity${basketIndex}">amount_x</p>
                            <div onclick="addQuantity(${basketIndex})" title="Menge hinzufügen" class="calc_button">
                                <img class="plus_icon_calc" src="./assets/icon/plus_icon_color.png" alt="Plus Icon">
                            </div>
                        </div>
                        <p id="filled_responsive_basket_dish_price${basketIndex}">price_dish</p>
                        <img onclick="removeDishFromBasket(${basketIndex})" title="Gericht entfernen" class="trash_icon" src="./assets/icon/trash_can_color.png"
                            alt="">
                    </div>`
}

function getResponsiveNavBarTemplate(menuCategoryIndex){
    return `
                    <div class="responsive_nav_element">
                        <a onclick="scrollToCorrectHref(event); closeResponsiveNavbar()" id="responsive_menu_category" href="#menu_name${menuCategoryIndex}">${pizzeria.menuCategory[menuCategoryIndex].category}</a>
                    </div>`
}