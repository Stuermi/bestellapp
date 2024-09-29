function getContentTemplate(menuCategoryIndex){
    return `<section class="main_section">
            <div class="header_image_container">
                <img class="header_image" src="./assets/img/pizza.jpg" alt="Pizza Bild">
                <img class="pizzeria_logo" src="./assets/icon/pizzeria_logo.png" alt="Pizzeria Logo">
            </div>

            <div class="restaurant_info">
                <h1>Pizzeria Buon Appetito</h1>
                <div class="restaurant_information_row">
                    <p>Bewertung (4,2 von 5 <img class="rating_star" src="./assets/icon/star_color.png"
                            alt="Stern Orange">) •</p>
                    <img title="Mindestbestellwert" class="bag_icon" src="assets/icon/bag.png" alt="Shopping Bag Icon">
                    <p>${pizzeria.minimumOrder.toFixed(2).replace('.',',')} € •</p>
                    <img title="Lieferkosten" class="delivery_icon" src="assets/icon/bike.png" alt="Bike Icon">
                    <p>${pizzeria.deliveryCost.toFixed(2).replace('.',',')} €</p>
                </div>
            </div>

            <div id="menu_categories" class="menu_categories"></div>

            <div id="menu" class="menu"></div>
        </section>

        <section class="side_section">
            <div class="side_header">
                <h2>Warenkorb</h2>
            </div>
            <hr>
            <div class="basket">
                <div class="empty_basket">
                    <img class="basket_icon" src="./assets/icon/shopping-basket.png" alt="Basket Icon">
                    <h2>Fülle deinen Warenkorb</h2>
                    <p>Füge leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen</p>
                </div>
                <div class="filled_basket d_none">
                    <div class="filled_basket_header">
                        <h2>name_dish</h2>
                    </div>
                    <div class="filled_basket_row">
                        <div class="calculator">
                            <div title="Menge reduzieren" class="calc_button">
                                <img class="minus_icon_calc" src="./assets/icon/minus_icon_color.png" alt="Minus Icon">
                            </div>
                            <p>amount_x</p>
                            <div title="Menge hinzufügen" class="calc_button">
                                <img class="plus_icon_calc" src="./assets/icon/plus_icon_color.png" alt="Plus Icon">
                            </div>
                        </div>
                        <p>price_dish</p>
                        <img title="Gericht entfernen" class="trash_icon" src="./assets/icon/trash_can_color.png"
                            alt="">
                    </div>
                    <hr>
                    <div class="order_price">
                        <div class="subtotal">
                            <p>Zwischensumme</p>
                            <p>subtotal_amount €</p>
                        </div>
                        <div class="delivery_cost">
                            <p>Lieferkosten</p>
                            <p>delivery_cost €</p>
                        </div>
                        <div class="total">
                            <p>Gesamtsumme</p>
                            <p>total_amount €</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>`
}

function getMenuCategoriesTemplate(menuCategoryIndex){
    return `
                <nav class="menu_category_selection">
                    <a id="menu_category${menuCategoryIndex}" href="#"></a>
                </nav>`
}

function getMenuTemplate(menuCategoryIndex, dishIndex){
    return `
            <h2 id="menu_name${menuCategoryIndex}"></h2>
                <div id="dish${dishIndex}" class="dish">
                    <h2 id="dish_name${dishIndex}">dish_name</h2>
                    <p id="ingredients${dishIndex}">ingredients</p>
                    <span id="dish_price${dishIndex}">dish_price</span>
                    <div class="add_button">
                        <img class="plus_icon" src="./assets/icon/plus_icon_color.png" alt="Plus Icon">
                    </div>
                </div>`
}

