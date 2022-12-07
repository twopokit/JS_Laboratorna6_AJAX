const productsInCart_wrapper = document.querySelector(".amount-cart-wrapper");
const productsInCart = document.querySelector("#productsAmountInCart");

function updateCartIcon() {
    if(localStorage.length) {
        productsInCart.textContent = localStorage.length;
        productsInCart_wrapper.style.display = "flex";
    } else {
        productsInCart.textContent = "";
        productsInCart_wrapper.style.display = "none";
    }
}

async function updateCart() {
    let container = document.querySelector("#checkoutWrapper");
    container.innerHTML = "";

    if(localStorage.length == 0) {
        container.append("Your cart is empty.");
        return; 
    }

    for(let i = 0; i < localStorage.length; ++i) {
        let key = localStorage.key(i);
        let product = JSON.parse(localStorage.getItem(key));

        container.innerHTML += 
        '<div class="product-wrapper">' + 
            '<div class="product">' +
                '<div class="product-info">' +
                    '<div class="info-picture">' +
                        '<img src="' + product.src + '" alt="picture" />' +
                    '</div>' +
                    '<div class="product-data">' +
                        '<div class="info-text">' +
                            '<p class="name">'+ product.name +'</p>' +
                            '<p class="price">'+ product.price +' uah</p>' +
                        '</div>' +
                        '<div class="quantity-changer">' +
                            '<button class="minus">-</button>' +
                            '<input type="text" class="quantity-value" id="quantityProduct" data-id='+product.id+'/>' +
                            '<button class="plus">+</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="checkout">' +
                '<div class="delete-product" id="deleteProduct" data-id='+product.id+'>' +
                    '<div class="line1 line"></div>' +
                    '<div class="line2 line"></div>' +
                '</div>' +
                '<div class="total">' +
                    '<span>Total:</span>' +
                    '<span id="totalSum"></span>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    let arr = await getProducts();
    const deleteBtns = document.querySelectorAll("#deleteProduct");
    deleteBtns.forEach((el) => {
        el.addEventListener("click", () => {
            let product;
            console.log("button pressed");
            for (let i = 0; i < arr.length; i++) {
                if(arr[i].id == el.dataset.id) {
                    product = arr[i];
                    break;
                }
            }
            
            console.log(product);
            deleteProduct(product);

            productsInCart.textContent = localStorage.length;
            productsInCart_wrapper.style.display = "flex";
            updateCart();
        });
    });
}

window.onload = (() => {
    updateCartIcon();
});

window.onstorage = (function() {
    updateCartIcon();

})();
