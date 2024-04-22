fetchJSONData();

let cartListArr = JSON.parse(localStorage.getItem("cartList"));
const mainImg = document.getElementById("main-img");
const smallImg = document.getElementsByClassName("small-img");

// onclick event
smallImg[0].onclick = function(){
    mainImg.src = smallImg[0].src;
}
smallImg[1].onclick = function(){
    mainImg.src = smallImg[1].src;
}
smallImg[2].onclick = function(){
    mainImg.src = smallImg[2].src;
}
smallImg[3].onclick = function(){
    mainImg.src = smallImg[3].src;
}

// Get the value from localStorage
var value = localStorage.getItem('productsId');
console.log('Retrieved productsId: ' + value);

// FOR THE PRODUCT DETAILS
const productInfo = document.getElementById("product-information");

function fetchJSONData() {
    fetch("./json/products.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {

            const finder = data.products.find(item => {
                if (item.id == this.value){
                    return item;
                }
            });

            // Function to run when clicking "Add To Cart" button
            const addToCartFunc = function(id, amount) {
                
                const cartList = JSON.parse(localStorage.getItem("cartList"));
                for(var index = 0; index < amount; index++){
                    cartList.push(parseInt(id));
                    console.log(`Add ${amount} of the productId=${id}`);
                }
                localStorage.setItem("cartList", JSON.stringify(cartList));
            };

            const htmlTemplate = 
                `<h6>Home / Apparel</h6>
                <h4>${finder.name}</h4>
                <h2>Php ${finder.price}</h2>
                <select>
                    <option>Select Size</option>
                    <option>XL</option>
                    <option>XXL</option>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                </select>
                <input type="number" class="productAmountInput" value="1">
                <button class="addToCartButton">Add To Cart</button>
                <p>${finder.description}</p>`;
            productInfo.innerHTML = htmlTemplate;

            // For product images
            mainImg.src=`img/products/${finder.id}.jpg`
            const smallImgList= document.querySelectorAll(".small-img");
            smallImgList[0].src = `img/products/${finder.id}.jpg`
            smallImgList[1].src = `img/product-variants/${finder.id}a.jpg`
            smallImgList[2].src = `img/product-variants/${finder.id}b.jpg`
            smallImgList[3].src = `img/product-variants/${finder.id}c.jpg`

            const addToCartButton = document.querySelector(".addToCartButton");
            const productAmountInput = document.querySelector(".productAmountInput");
            addToCartButton.onclick = function(){
                var currentProductAmountValue = productAmountInput.value;
                addToCartFunc(finder.id, currentProductAmountValue);
            }

            // For related products
            const passId = function(data) {
                localStorage.setItem('productsId', data);
                window.location.reload();
            };
            const relatedProdList = document.querySelectorAll(".related-product");
            const productList = document.querySelectorAll(".product");
            const rel1 = parseInt(finder.id) + 1;
            const rel2 = parseInt(finder.id) + 2;
            const rel3 = parseInt(finder.id) + 3;
            const rel4 = parseInt(finder.id) + 4;
            if(rel1 > 16 || rel2 > 16 || rel3 > 16 || rel4 > 16){
                for(var i = 0; i < 4; i++){
                    const position = 0 + i;
                    const template = `
                    <img src="${data.products[i].file}" alt="" class="related-product">
                    <div class="description pt-2">
                    <span>${data.products[i].brand}</span>
                    <h6>${data.products[i].name}</h6>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>Php ${data.products[i].price}</h4>
                    </div>
                    <a href="#"><i class="fal fa-shopping-cart cart"></i></a>
                    `;
                    productList[i].innerHTML = template;
                    productList[i].onclick = function(){
                        passId(parseInt(data.products[position].id));
                    }
                }
                // const pos = 1;
                // relatedProdList[0].src = `img/products/${pos}.jpg`
                // productList[0].onclick = function(){
                //     passId(pos);
                // }
                // relatedProdList[1].src = `img/products/${parseInt(pos) + 1}.jpg`
                // productList[1].onclick = function(){
                //     passId(parseInt(pos) + 1);
                // }
                // relatedProdList[2].src = `img/products/${parseInt(pos) + 2}.jpg`
                // productList[2].onclick = function(){
                //     passId(parseInt(pos) + 2);
                // }
                // relatedProdList[3].src = `img/products/${parseInt(pos) + 3}.jpg`
                // productList[3].onclick = function(){
                //     passId(parseInt(pos) + 3);
                // }
            }else{
                for(var i = 0; i < 4; i++){
                    const position = parseInt(finder.id) + i;
                    const template = `
                    <img src="${data.products[position].file}" alt="" class="related-product">
                    <div class="description pt-2">
                    <span>${data.products[position].brand}</span>
                    <h6>${data.products[position].name}</h6>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>Php ${data.products[position].price}</h4>
                    </div>
                    <a href="#"><i class="fal fa-shopping-cart cart"></i></a>
                    `;
                    productList[i].innerHTML = template;
                    productList[i].onclick = function(){
                        passId(parseInt(data.products[position].id));
                    }
                }
                // const pos1 = parseInt(finder.id);
                // const pos2 = parseInt(finder.id) + 1;
                // const pos3 = parseInt(finder.id) + 2;
                // const pos4 = parseInt(finder.id) + 3;
                // relatedProdList[0].src = `${data.products[pos1].file}`
                // productList[0].onclick = function(){
                //     passId(parseInt(data.products[pos1].id));
                // }
                // relatedProdList[1].src = `${data.products[pos2].file}`
                // productList[1].onclick = function(){
                //     passId(parseInt(data.products[pos2].id));
                // }
                // relatedProdList[2].src = `${data.products[pos3].file}`
                // productList[2].onclick = function(){
                //     passId(parseInt(data.products[pos3].id));
                // }
                // relatedProdList[3].src = `${data.products[pos4].file}`
                // productList[3].onclick = function(){
                //     passId(parseInt(data.products[pos4].id));
                // }
            }

        })
        .catch((error) => console.error("Unable to fetch data:", error))
} // fetchJSONData() ends here



console.log("Finished loading product.js");