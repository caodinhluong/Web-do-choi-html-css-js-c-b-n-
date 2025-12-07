// Modal functionality
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const cartBtn = document.getElementById('cart-btn');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const cartModal = document.getElementById('cart-modal');
const closeButtons = document.querySelectorAll('.close-modal');
const switchToRegister = document.getElementById('switch-to-register');
const switchToLogin = document.getElementById('switch-to-login');

// Open modals
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'flex';
});

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.style.display = 'flex';
});

cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.style.display = 'flex';
});

// Close modals
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
        cartModal.style.display = 'none';
    });
});

// Switch between login and register modals
switchToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'none';
    registerModal.style.display = 'flex';
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.style.display = 'none';
    loginModal.style.display = 'flex';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === registerModal) {
        registerModal.style.display = 'none';
    }
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');
let count = 3;

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        count++;
        cartCount.textContent = count;
        
        // Animation effect
        button.style.background = 'linear-gradient(135deg, #4ecdc4, #26a69a)';
        setTimeout(() => {
            button.style.background = 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))';
        }, 500);
    });
});

// Form submission
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Đăng nhập thành công!');
    loginModal.style.display = 'none';
});

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Đăng ký thành công!');
    registerModal.style.display = 'none';
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', () => {
    if (searchInput.value.trim() !== '') {
        alert(`Đang tìm kiếm: ${searchInput.value}`);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (searchInput.value.trim() !== '') {
            alert(`Đang tìm kiếm: ${searchInput.value}`);
        }
    }
});

// Menu active state
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('nav ul li a');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});