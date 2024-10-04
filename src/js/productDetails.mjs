import { setLocalStorage, getParam } from './utils.mjs';
import { findProductById } from './productData.mjs';

// Variable to store product data
let productData = {};

// Function to fetch product details using findProductById from productData.mjs
async function fetchProductData(productId) {
    try {
        productData = await findProductById(productId);
        if (!productData) {
            throw new Error('Product not found');
        }
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

// Method to render product details into the HTML
function renderProductDetails() {
    if (!productData) {
        console.error('Product data not loaded yet.');
        return;
    }
    
    const productNameElem = document.getElementById('product-name');
    const productDescriptionElem = document.getElementById('product-description');
    const productPriceElem = document.getElementById('product-price');
    const productStockElem = document.getElementById('product-stock');
    
    if (productNameElem && productDescriptionElem && productPriceElem && productStockElem) {
        productNameElem.textContent = productData.name;
        productDescriptionElem.textContent = productData.description;
        productPriceElem.textContent = `$${productData.price}`;
        productStockElem.textContent = `${productData.stock} in stock`;
    } else {
        console.error('Some HTML elements for product details are missing.');
    }
}

// Function to add the product to the cart
function addProductToCart(product) {
    setLocalStorage('so-cart', product);
}

// Event handler for adding product to the cart (refactored from product.js) also gets product ID from the button or URL
async function addToCartHandler(e) {
    const productId = e.target.dataset.id || getParam('product'); 
    const product = await findProductById(productId);
    addProductToCart(product);
}

// Entry point for the module, ensures product data is fetched and rendered
export default async function productDetails(productId) {
    await fetchProductData(productId);
    renderProductDetails();

    // Add listener to Add to Cart button
    document
        .getElementById('addToCart')
        .addEventListener('click', addToCartHandler);
}

// Expose only the necessary functions
export { addToCartHandler as addToCart };