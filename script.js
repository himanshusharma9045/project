const products = [];
let cart = [];

// Function to render products
async function renderProducts() {
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();
    data.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product._id})">Add to Cart</button>
        `;
        document.getElementById('product-list').appendChild(productDiv);
    });
}

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p._id === productId);
    cart.push(product);
    updateCartCount();
}

// Function to update cart count
function updateCartCount() {
    const cartButton = document.getElementById('cart-button');
    cartButton.innerText = Cart (${cart.length});
}

// Function to show cart
function showCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    cart.forEach((item) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerText = ${item.name} - $${item.price};
        cartItemsDiv.appendChild(itemDiv);
    });
    document.getElementById('cart').style.display = 'flex';
}

// Function to close cart
document.getElementById('close-cart').onclick = function() {
    document.getElementById('cart').style.display = 'none';
};

// Function to handle checkout
document.getElementById('checkout-button').onclick = function() {
    showCheckout();
};

function showCheckout() {
    document.getElementById('checkout').style.display = 'flex';
}

// Function to close checkout
document.getElementById('close-checkout').onclick = function() {
    document.getElementById('checkout').style.display = 'none';
};

// Function to place order
document.getElementById('checkout-form').onsubmit = async function(event) {
    event.preventDefault();
    // Here you would normally send the order details to your server
    alert('Order placed successfully!');
    cart = [];
    updateCartCount();
    document.getElementById('checkout').style.display = 'none';
};

// Function to show login modal
document.getElementById('login-button').onclick = function() {
    document.getElementById('login-modal').style.display = 'flex';
};

// Function to close login modal
document.getElementById('close-login').onclick = function() {
    document.getElementById('login-modal').style.display = 'none';
};

// Function to handle login
document.getElementById('login-form').onsubmit = async function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        document.getElementById('login-button').style.display = 'none';
        document.getElementById('logout-button').style.display = 'block';
        document.getElementById('login-modal').style.display = 'none';
        alert('Login successful!');
    } else {
        alert('Login failed');
    }
};

// Function to handle logout
document.getElementById('logout-button').onclick = function() {
    localStorage.removeItem('token');
    document.getElementById('login-button').style.display = 'block';
    document.getElementById('logout-button').style.display = 'none';
    alert('Logged out successfully!');
};

// Initial render
renderProducts();