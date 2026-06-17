/* ============================================
   MINIMARKET ELENA - LANDING PAGE SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (window.scrollY > 400) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    });
    
    // Scroll to top
    scrollTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile nav on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Demo tabs
    const sidebarItems = document.querySelectorAll('.demo-sidebar-menu li');
    const demoTabs = document.querySelectorAll('.demo-tab');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            sidebarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            demoTabs.forEach(tab => tab.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Animate stats on scroll
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.module-card, .rf-card, .about-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// POS Cart functionality
let cart = [];

function addToCart(element) {
    const name = element.querySelector('.pos-item-name').textContent;
    const priceText = element.querySelector('.pos-item-price').textContent;
    const price = parseFloat(priceText.replace('Bs. ', '').replace(',', ''));
    
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('cartSubtotal');
    const totalEl = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="pos-empty">Agrega productos al carrito</p>';
        subtotalEl.textContent = 'Bs. 0.00';
        totalEl.textContent = 'Bs. 0.00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <div>
                    <span class="cart-item-name">${item.name}</span>
                    <span style="color: var(--gray-400); font-size: 0.8rem;"> x${item.qty}</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                    <span class="cart-item-price">Bs. ${itemTotal.toFixed(2)}</span>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})">✕</button>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = html;
    subtotalEl.textContent = `Bs. ${total.toFixed(2)}`;
    totalEl.textContent = `Bs. ${total.toFixed(2)}`;
}

function completeSale() {
    if (cart.length === 0) {
        alert('⚠️ El carrito está vacío. Agrega productos primero.');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    alert(`✅ Venta completada exitosamente!\n\nTotal: Bs. ${total.toFixed(2)}\nProductos: ${cart.length}\n\n(Esta es una simulación del sistema)`);
    
    cart = [];
    renderCart();
}