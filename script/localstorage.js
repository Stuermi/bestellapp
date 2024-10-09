function saveToLocalStorage(){
    localStorage.setItem("basket", JSON.stringify(basket));
}

function getFromLocalStorage(){
    let savedBasket = JSON.parse(localStorage.getItem("basket"));
    if (savedBasket != undefined) {
        basket = savedBasket;  
    }
}

function clearLocalStorage(){
    localStorage.clear();
}