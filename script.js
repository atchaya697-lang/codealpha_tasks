let cart = [];

async function loadProducts(){

    const response = await fetch('http://localhost:3000/products');

    const products = await response.json();

    const productDiv = document.querySelector('.products');

    productDiv.innerHTML = '';

    products.forEach(product => {

        productDiv.innerHTML += `

        <div class="card">

            <img src="https://picsum.photos/150">

            <h2>${product.name}</h2>

            <p>₹${product.price}</p>

            <button onclick="addToCart('${product.name}')">
                Add to Cart
            </button>

        </div>

        `;

    });

}

function addToCart(productName){

    cart.push(productName);
    
    localStorage.setItem('cart', JSON.stringify(cart));


    alert(productName + ' added to cart');

    console.log(cart);

}

loadProducts();