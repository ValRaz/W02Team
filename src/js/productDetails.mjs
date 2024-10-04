import { setLocalStorage, getParam } from './utils.mjs';
import { findProductById } from './productData.mjs';

// Variable to store product data
let productData = {};

export default async function productDetails(productId) {
    try {
      // Get product details and handle the promise using await
      const product = await findProductById(productId);
  
      if (product) {
        // Render the product details
        renderProductDetails(product);
  
        // Add event listener to 'Add to Cart' button
        document.getElementById('addToCart').addEventListener('click', () => addToCart(product));
      } else {
        console.error('Product not found!');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  }
  
  function addToCart(product) {
    // Save product to local storage
    setLocalStorage('so-cart', product);
  }
  //Updates the DOM elements with product details.
  function renderProductDetails(product) {
    const productName = document.querySelector('#productName');
    const productNameWithoutBrand = document.querySelector('#productNameWithoutBrand');
    const productImage = document.querySelector('#productImage');
    const productFinalPrice = document.querySelector('#productFinalPrice');
    const productColorName = document.querySelector('#productColorName');
    const productDescriptionHtmlSimple = document.querySelector('#productDescriptionHtmlSimple');
    const addToCartButton = document.querySelector('#addToCart');
  
    if (productName && productNameWithoutBrand && productImage && productFinalPrice && productColorName && productDescriptionHtmlSimple && addToCartButton) {
      productName.innerText = product.Brand.Name;
      productNameWithoutBrand.innerText = product.NameWithoutBrand;
      productImage.src = product.Image;
      productImage.alt = product.Name;
      productFinalPrice.innerText = product.FinalPrice;
      productColorName.innerText = product.Colors[0].ColorName;
      productDescriptionHtmlSimple.innerHTML = product.DescriptionHtmlSimple;
      addToCartButton.dataset.id = product.Id;
    } else {
      console.error('Some elements are missing in the DOM.');
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

// Expose only the necessary functions
export { addToCartHandler as addToCart };