
let cartListArr = JSON.parse(localStorage.getItem("cartList"));
const cartListArrSize = cartListArr.length;
var productsId = localStorage.getItem('productsId');

function removeDuplicates(arr) {
    return [...new Set(arr)];
}

function fetchJSONData() {
    fetch("./json/products.json").then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        }).then((data) => {
            const listOfItems = removeDuplicates(cartListArr);
            var finalPriceValue = 0;
            console.log(listOfItems);

            

            const removeFromCart = function(data) {
                
                // Turns ALL values equal to data, into "undefined" or "null"
                cartListArr.forEach((value, index) => {
                    console.log("forEach: " + value);
                    if(value == data){
                        delete cartListArr[index];
                    }
                });

                console.log(cartListArr);

                // filters out all the "undefined" and "null" values
                const newCartListArr = cartListArr.filter(value => Boolean(value));

                console.log("New cart list: " + JSON.stringify(newCartListArr));

                localStorage.setItem('cartList', JSON.stringify(newCartListArr));
                window.location.reload();
            };

            listOfItems.forEach((item) => {
                const productInfo = document.getElementById("item-body");
                var idCount = cartListArr.filter(data => data == item).length;
                var sumOfItem = parseInt(idCount) * parseFloat(data.products[parseInt(item) - 1].price).toFixed(2);
                const htmlTemplate = `
                    <tr>
                        <td><a class="remove-item" href="#"><i style="color: #088178;" class="far fa-times-circle"></i></a></td>
                        <td><img src="img/products/${item}.jpg" alt=""></td>
                        <td>${data.products[parseInt(item) - 1].name}</td>
                        <td>Php ${data.products[parseInt(item) - 1].price}</td>
                        <td><input disabled type="number" value="${idCount}"></td>
                        <td>Php ${sumOfItem}</td>
                    </tr>
                `;
                productInfo.innerHTML += htmlTemplate;
                finalPriceValue += sumOfItem;
                console.log(data.products[parseInt(item) - 1].name);
            })

            const finalPrice = document.getElementById("final-price");
            const subPrice = document.getElementById("sub-price");
            finalPrice.innerHTML += finalPriceValue; 
            subPrice.innerHTML += finalPriceValue;
         
            listOfItems.forEach((item, index) => {
                const removeItemList = document.querySelectorAll(".remove-item");
                removeItemList[index].onclick = function(){
                    removeFromCart(data.products[parseInt(item) - 1].id);
                }
            });
            

        }).catch((error) => console.error("Unable to fetch data:", error))
}//fetchJSONData goes here
fetchJSONData();



// productInfo.innerHTML += htmlTemplate;