const priceFilter = document.querySelector("#priceFilter");
const range = document.querySelector("#rangeVal");
const accessebility = document.querySelector("#accessebilityFilter");
const applyButton = document.querySelector("#apply");

async function checkAvailable() {
    let allProducts = await getProducts();
    let available = [];
    if(accessebility.checked) {
        allProducts.forEach(product => {
            if(product.isAvailable) {
                available.push(product);
            }
        });
        updateHTMLAsync(available);
    }
    else {
        updateHTMLAsync(allProducts);
    }
}

async function updatePrice() {
    const products = await getProducts();
    let max = Math.max(...products.map((pic) => pic.price));
    let min = Math.min(...products.map((pic) => pic.price));
    
    priceFilter.max = max;
    priceFilter.min = min;
    range.innerHTML = '<div class="min">' + min + '</div><div id="current"></div><div class="max">' + max + '</div>';
}

applyButton.addEventListener("click", async () => {
    let price = priceFilter.value;
    let checkAvailable = accessebility.checked;
    let result = [];
    
    if(checkAvailable) {
        let products = await getAvailableProducts();
        products.forEach((product) => {
            if(product.price <= price)
                result.push(product);
        });
    } else {
        let products = await getProducts();
        products.forEach((product) => {
            if(product.price <= price)
                result.push(product);
        });
    }

    updateHTMLAsync(result);
});

updatePrice();

priceFilter.addEventListener("change", async () => {
    let curr = document.querySelector("#current");
    curr.innerHTML = priceFilter.value;
});
