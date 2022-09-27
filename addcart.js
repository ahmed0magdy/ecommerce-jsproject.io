/////// add to cart ////////
let addCart =  document.querySelectorAll(".addProduct");
for (let i = 0;i<addCart.length;i++){
    addCart[i].addEventListener("click",()=>{
        CartNumber(product[i])
        totalCost(product[i])
    })
}
function onLoadCart(){
    let productNum = localStorage.getItem("cartnumber");
    if([productNum]){
        document.querySelector(".cart span").textContent = productNum;

    }

}
function CartNumber(product){
    // console.log("the product is ",product) // to appear product clicked in console
    let productNum = localStorage.getItem("cartnumber");
    productNum =  parseInt(productNum);
    if(productNum){
        localStorage.setItem("cartnumber", productNum +1);
        document.querySelector(".cart span").textContent = productNum + 1;
    }else{
        localStorage.setItem("cartnumber", 1);
        document.querySelector(".cart span").textContent = 1;

    }
    setItems(product);
}
function setItems(product){
    var cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems)
    // console.log("my cart items are : " , cartItems); //display clicked item
    if(cartItems != null){
        
        if(cartItems[product.name] == undefined){
            cartItems ={
                ...cartItems,
                [product.name]:product
            }
            
        }
        cartItems[product.name].quantity += 1;
        alert("the quantity of the product " +JSON.stringify(product.name) +" " + "is " + cartItems[product.name].quantity)
    }else{
        product.quantity = 1;
        cartItems ={
           [product.name] : product
       }
       alert("the quantity of the product " +JSON.stringify(product.name) +" " + "is " + cartItems[product.name].quantity)

    }
   
    localStorage.setItem("productsInCart",JSON.stringify(cartItems))
}

function totalCost( product, action ) {
    let cartCost = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cartCost);

        localStorage.setItem("totalCost", cartCost - product.price);
    } else if(cartCost != null) {
        
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}
function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);
    let productContainer = document.querySelector('.products');
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += 
            `<div class="product"><ion-icon name="close-circle"></ion-icon><img src="${item.img}" />
                <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price sm-hide">EGP ${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.quantity}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
            </div>
            <div class="total">EGP ${item.quantity * item.price},00</div>`;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">EGP ${cartCost},00</h4>
            </div>`

        // deleteButtons();
        manageQuantity();
    }
}
function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if(cartItems[currentProduct].quantity > 1 ) {
                cartItems[currentProduct].quantity -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].quantity += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
     }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].quantity);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].quantity));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCart();
displayCart();

