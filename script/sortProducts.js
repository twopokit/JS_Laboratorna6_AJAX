async function sortProductsByPriceAscAsync() {
    const arr = await getProducts();
    let sorted = arr;

    for(let i = 0; i < sorted.length; ++i) {
        for(let j = 0; j < sorted.length - i - 1; ++j) {
            let temp = 0;
            if(sorted[j].price > sorted[j+1].price) {
                temp = sorted[j];
                sorted[j] = sorted[j+1];
                sorted[j+1] = temp;
            }
        }
    }

    return sorted;
}

async function sortProductsByPriceDescAsync() {
    const arr = await getProducts();
    let sorted = arr;

    for(let i = 0; i < sorted.length; ++i) {
        for(let j = 0; j < sorted.length - i - 1; ++j) {
            let temp = 0;
            if(sorted[j].price < sorted[j+1].price) {
                temp = sorted[j];
                sorted[j] = sorted[j+1];
                sorted[j+1] = temp;
            }
        }
    }

    return sorted;
}

async function getAvailableProducts() {
    const arr = await getProducts();
    let available = [];

    arr.forEach(product => {
        if(product.isAvailable) {
            available.push(product);
        }
    });

    return available;
}

async function sortProductsByAccessibilityAsync() {
    const arr = await getProducts();
    const available = await getAvailableProducts();
    let notAvailable = [];

    for(let i = 0; i < arr.length; ++i) {
        if(!arr[i].isAvailable)
            notAvailable.push(arr[i]);
    }

    return available.concat(notAvailable);
}

async function switchSortAsync(sort) {
    switch (sort) {
        case "price ascending":
            return await sortProductsByPriceAscAsync();
        case "price descending":
            return await sortProductsByPriceDescAsync();
        case "accessibility":
            return await sortProductsByAccessibilityAsync();
    }
}

async function updateHTMLAsync(arr) {
    const photos_block = document.querySelector(".photos-block-wrapper");
    photos_block.innerHTML = "";
    
    arr.forEach(pic => {
        if(pic.isAvailable) {
            photos_block.innerHTML +=
            '<div class="photos-block"><div class="photo"><img src=' + pic.src + ' alt=' + pic.name + '><div class="info"><h3 class="name">"' + pic.name + '"</h3><p class="price">' + pic.price +' uah</p></div></div><button data-id=' + pic.id +' class="add-to-cart-btn">Add to cart</button></div>';   
        }
        else {
            photos_block.innerHTML +=
            '<div class="photos-block"><div class="photo"><img src=' + pic.src + ' alt=' + pic.name + '><div class="info"><h3 class="name">"' + pic.name + '"</h3><p class="price">Not available</p></div></div><button class="not-available-btn">Inform when it is available</button></div>';   
        }
    });

    const btns = document.querySelectorAll(".add-to-cart-btn");

    btns.forEach((el) => {
        el.addEventListener("click", () => {
            el.disabled = true;

            let product;
            for (let i = 0; i < arr.length; i++) {
                if(arr[i].id == el.dataset.id) {
                    product = arr[i];
                    break;
                }
            }
            if(getProduct(product))
                return;
            
            addProduct(product);

            productsInCart.textContent = localStorage.length;
            productsInCart_wrapper.style.display = "flex";
        });
    });


    let photos = document.querySelectorAll(".photo");     
    for(let i = 0; i < photos.length; ++i) {
        photos[i].onmouseover = function() {
            $(photos[i].querySelector(".name")).animate({height: "0", opacity: "0",}, 20);
            $(photos[i].querySelector(".price")).animate({height: "0", opacity: "0"}, 20);
        };
        photos[i].onmouseout = function() {
            $(photos[i].querySelector(".name")).animate({height: "40px", opacity: "1"}, 20);
            $(photos[i].querySelector(".price")).animate({height: "40px", opacity: "1"}, 20);
        }
    }
}

async function changeSelect() {
    let selectBox = document.querySelector("#selectSort").value.toLowerCase();

    let products = await switchSortAsync(selectBox);
    await updateHTMLAsync(products);
}

changeSelect();
