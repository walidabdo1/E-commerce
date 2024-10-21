document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');


    if (productId) {
        fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
            .then(response => response.json())
            .then(data => {
                const product = data.data; 
                document.getElementById('product-title').textContent = product.title;
                document.getElementById('product-brand').textContent = product.brand.name;
                const averageRating = product.ratingsAverage;
                const totalStars = 5; 
                let starsHtml = '';
                for (let i = 1; i <= totalStars; i++) {
                    if (i <= averageRating) {
                        starsHtml += '<i class="fa fa-star rating-color me-2"></i>'; 
                    } else {
                        starsHtml += '<i class="fa fa-star-o rating-color me-2"></i>'; 
                    }
                }

                document.getElementById('product-rating').innerHTML = `${averageRating}  ${starsHtml}`;
                document.getElementById('product-quantity').textContent = product.quantity; 
                document.getElementById('product-price').textContent = `$${product.price}`;
                document.getElementById('product-description').textContent = product.description;
                document.getElementById('selected-image').src = product.imageCover;

                const thumbnailsContainer = document.getElementById('image-thumbnails');
                thumbnailsContainer.innerHTML = ''; 
                if (product.images && product.images.length > 0) {
                    product.images.forEach(image => {
                        const thumbnail = document.createElement('img');
                        thumbnail.src = image;
                        thumbnail.style.width = '50px';
                        thumbnail.onclick = () => {
                            document.getElementById('selected-image').src = image;
                        };
                        thumbnailsContainer.appendChild(thumbnail);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
                document.getElementById('product-details').innerHTML = 'Error loading product details.';
            });
    } else {
        document.getElementById('product-details').innerHTML = 'No product ID found.';
    }
});



function addToCart(e) {
    const button = e.target;
    const item = button.closest('.item');
    const productId = item.dataset.productId;
    
    if (!button.classList.contains("btn-remove")) {
      const newItem = {
        id: productId,
        name: item.querySelector('h6 a').innerHTML,
        price: item.querySelector('.item-text-con span:first-child').innerHTML,
        cat: item.querySelector('.item-text-con .small').innerHTML,
        count: 1,
        imgSrc: item.querySelector('img').getAttribute('src'),
      };
  
      cart.push(newItem);
      localStorage.setItem("CartArray", JSON.stringify(cart));
      button.classList.add("btn-remove");
      button.innerHTML = "Remove Cart";
    } else {
      cart = cart.filter(cartItem => cartItem.id !== productId);
      localStorage.setItem("CartArray", JSON.stringify(cart));
      button.classList.remove("btn-remove");
      button.innerHTML = "Add Cart";
    }
    displayCart();
  }