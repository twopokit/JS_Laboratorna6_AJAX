let arr = [];

window.onload = async function() {
    let container = document.querySelector("#checkoutWrapper");

    if(localStorage.length == 0) {
        container.append("Your cart is empty.");
        return;
    }

    updateCart();
}();
