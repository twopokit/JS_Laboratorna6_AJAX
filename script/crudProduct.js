function addProduct(product) {
    if(product == null)
        return;

    if(JSON.parse(localStorage.getItem("cart_product" + product.id)) != null) {
        //updateProduct(product);
        return;
    }

    localStorage.setItem("cart_product" + product.id, JSON.stringify(product));
    
    let productFromLocal = JSON.parse(localStorage.getItem("cart_product"+product.id));
    //console.log("Product " + productFromLocal.name + " was added to the local storage");
}

function updateProduct(product) {
    let quantity = parseInt(localStorage.getItem("quantity_cart_product" + product.id));
    quantity += 1;
    localStorage.setItem("quantity_cart_product" + product.id, quantity.toString());
    console.log(localStorage.getItem("quantity_cart_product"));
}

function deleteProduct(product) {
    if(product == null) {
        console.log("product is null");
        return;}

    localStorage.removeItem("cart_product" + product.id);
    console.log("Product " + product.name + " from local storage was deleted");
}

function getProduct(product) {
    if(product == null)
        return;
    
    //console.log(product.name);
    return localStorage.getItem("cart_product" + product.id);
}
