console.log("Fetching Data...");

// FOR THE LIST OF FEATURED PRODUCTS
const allProductsContainer = document.getElementById('all-products-container');

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
        const index = 0;
        data.products.forEach((element) => {

        // For All Products Items
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
            const allProductsHtml = 
            `<div class="product" id="product-button" param="${element.id}">
            <img src="${element.file}" alt="">
            <div class="description pt-2">
              <span>${element.brand}</span>
              <h6>${element.name}</h6>
              <div class="star">${this.numOfStars}</div>
              <h4>Php ${element.price}</h4>
            </div>
            <a class="add-to-cart" href="#"><i class="fal fa-shopping-cart cart"></i></a>
            </div>`
            allProductsContainer.innerHTML += allProductsHtml;



            
        });
      })
      .catch((error) => console.error("Unable to fetch data:", error))
      .finally(() => {
            console.log("Fetch Data Completed");
            // Add a function on each button 
            const elements = document.querySelectorAll(".product");
            for (const ele of elements) {
                const parameter = ele.getAttribute('param');
                ele.onclick = function() {
                  console.log("A div was clicked with parameter:", parameter);
                    // Store the value in localStorage
                    localStorage.setItem('productsId', parameter);
                
                    // Redirect to the second page
                    window.location.href = 'product.html';
                };
              }

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
      });

} // fetchJSONData() ends here

fetchJSONData();
