console.log("index.js connection confirmed");

// FOR THE LIST OF FEATURED PRODUCTS
const featuredProductsContainer = document.getElementById('featured-products-container');
const newArrivalProductsContainer = document.getElementById('new-arrival-products-container');
const myArray = [];
localStorage.setItem("cartList", JSON.stringify(myArray));
// const numOfFeaturedProducts = 8;

const passId = function(data) {
  console.log("ID i got is: " + data);
  localStorage.setItem('productsId', data);
  window.location.href = 'product.html';
};
const addToCartId = function(data) {
  console.log(data);
}

console.log("Fetching Data");
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
        data.products.forEach((element) => {

        // For Featured Products Items
        if(element.type == "featured"){
          const numOfStars = ``;
          if(element.stars == 5){
            this.numOfStars = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`;
          }else if(element.stars == 4){
            this.numOfStars = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>`;
          }else if(element.stars == 3){
            this.numOfStars = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
          }else if(element.stars == 2){            
            this.numOfStars = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
          }else if(element.stars == 1){
            this.numOfStars = `<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
          }else{
            this.numOfStars = `<i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
          }
          const featuredProductHtml = ` 
          <div class="product">
          <img src="${element.file}" alt="${element.name}">
          <div class="description pt-2">
            <span>${element.brand}</span>
            <h6>${element.name}</h6>
            <div class="star">${this.numOfStars}</div>
            <h4>Php ${element.price}</h4>
          </div>
          <a class='add-to-cart' href="#"><i class="fal fa-shopping-cart cart"></i></a>
          </div>`
          featuredProductsContainer.innerHTML += featuredProductHtml;
          
          }

        // For New Arrivals Products Items
          if(element.type == "new"){
            const numOfStars = ``;
            if(element.stars == 5){
              this.numOfStars = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`;
            }else if(element.stars == 4){
              this.numOfStars = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>`;
            }else if(element.stars == 3){
              this.numOfStars = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
            }else if(element.stars == 2){            
              this.numOfStars = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
            }else if(element.stars == 1){
              this.numOfStars = `<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
            }else{
              this.numOfStars = `<i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
            }
            const newArrivalHtml = `
            <div class="product">
            <img src="${element.file}" alt="${element.name}">
            <div class="description pt-2">
              <span>${element.brand}</span>
              <h6>${element.name}</h6>
              <div class="star">${this.numOfStars}</div>
              <h4>Php ${element.price}</h4>
            </div>
            <a class='add-to-cart' href="#"><i class="fal fa-shopping-cart cart"></i></a>
          </div>`;
          newArrivalProductsContainer.innerHTML += newArrivalHtml;
          
          }
        });

        // Add onclick events after adding the product items
        const productList = document.querySelectorAll(".product");
        productList.forEach((item, index) => {
          item.onclick = function(){
            passId(parseInt(index) + 1);
          }
        })

        // Add to cart function 
        const addToCartList = document.querySelectorAll(".add-to-cart");
        addToCartList.forEach((item, index) => {
          item.addEventListener('click', (e) => {
            e.preventDefault(); // This prevents it from reloading the page and moving you towards the top of the page
            e.stopPropagation(); // This prevents it from inheriting the parent's function to go to a different page
            console.log("Stopped the ID " + index + " from proceeding.");
            const cartList = JSON.parse(localStorage.getItem("cartList"));
            cartList.push(parseInt(index) + 1);
            localStorage.setItem("cartList", JSON.stringify(cartList));
            console.log("cartList: " + cartList);
          })
        })//addToCartList.forEach ends here

      })
      .catch((error) => 
             console.error("Unable to fetch data:", error));
}
fetchJSONData();
console.log("Fetch Data Completed");

