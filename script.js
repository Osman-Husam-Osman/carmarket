const GITHUB_USERNAME = 'Osman-Husam-Osman';
const GITHUB_REPOSITORY = 'carmarket';
const GITHUB_BRANCH = 'main';

const GITHUB_RAW = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPOSITORY}/${GITHUB_BRANCH}`;

// ========== Global Variables ==========
let carsData = [];
let brandsData = [];
let selectedCars = [];
let currentFilter = 'all';
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// ========== Custom Cursor ==========
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

if (window.innerWidth > 768 && cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 15 + 'px';
            cursorFollower.style.top = e.clientY - 15 + 'px';
        }, 100);
    });

    document.querySelectorAll('a, button, .car-card, .brand-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'scale(1.5)';
            cursorFollower.style.borderColor = 'var(--primary)';
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.borderColor = 'var(--primary)';
        });
    });
}

// ========== Hide Preloader ==========
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('hidden');
    }, 1500);
});

setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('hidden')) preloader.classList.add('hidden');
}, 3000);

// ========== Local Brands Data (من GitHub) ==========
const localBrandsData = [
    { name: 'Toyota', count: 245, logo: `${GITHUB_RAW}/images/logos/toyota.png` },
    { name: 'Mercedes', count: 189, logo: `${GITHUB_RAW}/images/logos/mercedes.png` },
    { name: 'BMW', count: 156, logo: `${GITHUB_RAW}/images/logos/bmw.png` },
    { name: 'Hyundai', count: 198, logo: `${GITHUB_RAW}/images/logos/hyundai.png` },
    { name: 'Nissan', count: 134, logo: `${GITHUB_RAW}/images/logos/nissan.png` },
    { name: 'Kia', count: 167, logo: `${GITHUB_RAW}/images/logos/kia.png` }
];

// ========== Local Cars Data (من GitHub) ==========
const localCarsData = [
    { 
        id: 1, brand: 'Toyota', model: 'Camry 2024', price: 95000, year: 2024, mileage: 0, 
        fuel: 'Gasoline', transmission: 'Automatic', dealer: 'Al-Nojoom Showroom', rating: 4.8, badge: 'New', 
        image: `${GITHUB_RAW}/images/cars/camry.jpg`, 
        features: ['Air Conditioning', 'Bluetooth', 'Rear Camera', 'Sensors'] 
    },
    { 
        id: 2, brand: 'Mercedes', model: 'C200 2023', price: 185000, year: 2023, mileage: 15000, 
        fuel: 'Gasoline', transmission: 'Automatic', dealer: 'Luxury Showroom', rating: 4.9, badge: 'Used', 
        image: `${GITHUB_RAW}/images/cars/mercedes.jpg`, 
        features: ['Sunroof', 'Leather Seats', 'Navigation', 'Power Seats'] 
    },
    { 
        id: 3, brand: 'BMW', model: 'X5 2024', price: 220000, year: 2024, mileage: 0, 
        fuel: 'Gasoline', transmission: 'Automatic', dealer: 'BMW Official Showroom', rating: 4.7, badge: 'New', 
        image: `${GITHUB_RAW}/images/cars/bmw.jpg`, 
        features: ['4WD', 'Large Screen', 'Premium Sound System'] 
    },
    { 
        id: 4, brand: 'Hyundai', model: 'Tucson 2023', price: 78000, year: 2023, mileage: 25000, 
        fuel: 'Gasoline', transmission: 'Automatic', dealer: 'Gulf Showroom', rating: 4.6, badge: 'Used', 
        image: `${GITHUB_RAW}/images/cars/hyundai.jpg`, 
        features: ['Air Conditioning', 'Bluetooth', 'Sensors'] 
    },
    { 
        id: 5, brand: 'Nissan', model: 'Patrol 2024', price: 165000, year: 2024, mileage: 0, 
        fuel: 'Gasoline', transmission: 'Automatic', dealer: 'Nissan Showroom', rating: 4.8, badge: 'New', 
        image: `${GITHUB_RAW}/images/cars/nissan.jpg`, 
        features: ['4WD', '7 Seats', 'Rear AC'] 
    },
    { 
        id: 6, brand: 'Kia', model: 'Sorento 2023', price: 92000, year: 2023, mileage: 18000, 
        fuel: 'Diesel', transmission: 'Automatic', dealer: 'Kia Showroom', rating: 4.5, badge: 'Used', 
        image: `${GITHUB_RAW}/images/cars/kia.jpg`, 
        features: ['7 Seats', '360 Camera', 'Advanced Safety'] 
    }
];

// ========== Page Load ==========
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Starting CarMarket...');
    console.log('📁 GitHub Raw Base:', GITHUB_RAW);
    
    carsData = localCarsData;
    brandsData = localBrandsData;
    
    console.log(`✅ Loaded ${carsData.length} local cars`);
    console.log(`✅ Loaded ${brandsData.length} local brands`);
    
    createParticles();
    loadBrands();
    loadFeaturedCars();
    initEventListeners();
    initScrollEffects();
    animateStats();
    updateWishlistCount();
    initScrollReveal();
    
    console.log('✅ Website Ready!');
});

// ========== Create Particles ==========
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255,255,255,0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// ========== Load Brands ==========
function loadBrands() {
    const grid = document.getElementById('brands-grid');
    if (!grid) return;
    grid.innerHTML = brandsData.map(brand => `
        <div class="brand-card reveal" onclick="filterByBrand('${brand.name}')">
            <div class="brand-logo-container">
                <img src="${brand.logo}" alt="${brand.name}" class="brand-logo-img" loading="lazy" 
                     onerror="console.error('❌ Failed to load logo:', '${brand.logo}'); this.style.display='none'; this.parentElement.innerHTML='<div style=\\'font-size:40px;font-weight:bold;color:var(--primary);\\'>${brand.name.charAt(0)}</div>'">
            </div>
            <h3>${brand.name}</h3>
            <p>${brand.count} Cars</p>
        </div>
    `).join('');
}

// ========== Load Cars ==========
function loadFeaturedCars(filter = 'all') {
    const grid = document.getElementById('cars-grid');
    if (!grid) return;
    let filteredCars = carsData;
    if (filter !== 'all') filteredCars = carsData.filter(car => car.badge === filter);
    
    if (filteredCars.length === 0) {
        grid.innerHTML = '<p style="text-align:center;grid-column:1/-1;padding:40px;color:var(--gray);">No cars in this category</p>';
        return;
    }
    
    grid.innerHTML = filteredCars.map((car, index) => `
        <div class="car-card reveal" onclick="viewCar(${car.id})" style="animation: fadeInUp 0.6s ease ${index * 0.1}s both;">
            <div class="car-image">
                <img src="${car.image}" alt="${car.brand} ${car.model}" 
                     onerror="console.error('❌ Failed to load image:', '${car.image}'); this.src='https://via.placeholder.com/600x400/2563eb/ffffff?text=No+Image'">
                <span class="car-badge">${car.badge}</span>
                <div class="car-favorite ${favorites.includes(car.id) ? 'active' : ''}" onclick="toggleFavorite(event, ${car.id})"><i class="fas fa-heart"></i></div>
            </div>
            <div class="car-info">
                <h3 class="car-title">${car.brand} ${car.model}</h3>
                <div class="car-specs">
                    <span><i class="fas fa-calendar"></i> ${car.year}</span>
                    <span><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
                    <span><i class="fas fa-cog"></i> ${car.transmission}</span>
                    <span><i class="fas fa-road"></i> ${car.mileage.toLocaleString()} km</span>
                </div>
                <div class="car-price">$${car.price.toLocaleString()}</div>
                <div class="car-footer">
                    <div class="car-dealer"><i class="fas fa-store"></i> ${car.dealer}</div>
                    <div class="dealer-rating"><i class="fas fa-star"></i> ${car.rating}</div>
                </div>
            </div>
        </div>
    `).join('');
    
    setTimeout(() => initScrollReveal(), 100);
}

// ========== Filter by Brand ==========
function filterByBrand(brand) {
    const filtered = carsData.filter(car => car.brand === brand);
    if (filtered.length === 0) { showNotification(`No cars from ${brand}`, 'warning'); return; }
    const grid = document.getElementById('cars-grid');
    grid.innerHTML = filtered.map((car, index) => `
        <div class="car-card reveal" onclick="viewCar(${car.id})" style="animation: fadeInUp 0.6s ease ${index * 0.1}s both;">
            <div class="car-image">
                <img src="${car.image}" alt="${car.brand} ${car.model}" onerror="this.src='https://via.placeholder.com/600x400/2563eb/ffffff?text=No+Image'">
                <span class="car-badge">${car.badge}</span>
                <div class="car-favorite ${favorites.includes(car.id) ? 'active' : ''}" onclick="toggleFavorite(event, ${car.id})"><i class="fas fa-heart"></i></div>
            </div>
            <div class="car-info">
                <h3 class="car-title">${car.brand} ${car.model}</h3>
                <div class="car-specs">
                    <span><i class="fas fa-calendar"></i> ${car.year}</span>
                    <span><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
                    <span><i class="fas fa-cog"></i> ${car.transmission}</span>
                    <span><i class="fas fa-road"></i> ${car.mileage.toLocaleString()} km</span>
                </div>
                <div class="car-price">$${car.price.toLocaleString()}</div>
                <div class="car-footer">
                    <div class="car-dealer"><i class="fas fa-store"></i> ${car.dealer}</div>
                    <div class="dealer-rating"><i class="fas fa-star"></i> ${car.rating}</div>
                </div>
            </div>
        </div>
    `).join('');
    document.getElementById('featured-section').scrollIntoView({ behavior: 'smooth' });
    showNotification(`Showing ${brand} cars`, 'success');
    setTimeout(() => initScrollReveal(), 100);
}

// ========== View Car Details ==========
function viewCar(id) {
    const car = carsData.find(c => c.id === id);
    if (!car) return;
    const modal = document.getElementById('carModal');
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div style="width:100%; height:350px; border-radius:20px; overflow:hidden; margin-bottom:25px; background:#f0f0f0;">
            <img src="${car.image}" alt="${car.brand} ${car.model}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://via.placeholder.com/700x350/2563eb/ffffff?text=No+Image'">
        </div>
        <h2>${car.brand} ${car.model}</h2>
        <div class="modal-specs">
            <div class="modal-spec-item"><i class="fas fa-calendar"></i><div><strong>Year</strong><p>${car.year}</p></div></div>
            <div class="modal-spec-item"><i class="fas fa-road"></i><div><strong>Mileage</strong><p>${car.mileage.toLocaleString()} km</p></div></div>
            <div class="modal-spec-item"><i class="fas fa-gas-pump"></i><div><strong>Fuel</strong><p>${car.fuel}</p></div></div>
            <div class="modal-spec-item"><i class="fas fa-cog"></i><div><strong>Transmission</strong><p>${car.transmission}</p></div></div>
            <div class="modal-spec-item"><i class="fas fa-store"></i><div><strong>Dealer</strong><p>${car.dealer}</p></div></div>
            <div class="modal-spec-item"><i class="fas fa-star"></i><div><strong>Rating</strong><p>${car.rating} / 5</p></div></div>
        </div>
        <h3>Features:</h3>
        <ul style="margin:15px 0;padding-left:20px;">
            ${car.features.map(f => `<li style="padding:10px 0;color:var(--gray);border-bottom:1px solid var(--gray-light);"><i class="fas fa-check-circle" style="color:var(--success);margin-right:10px;"></i>${f}</li>`).join('')}
        </ul>
        <div class="modal-price">$${car.price.toLocaleString()}</div>
        <div class="modal-actions">
            <button class="btn-primary" onclick="contactDealer('${car.dealer}')"><i class="fas fa-phone"></i> Contact Dealer</button>
            <button class="btn-outline" onclick="addToCompare(${car.id})"><i class="fas fa-balance-scale"></i> Compare</button>
        </div>
    `;
    modal.classList.add('active');
}

// ========== Close Modal ==========
document.querySelector('.close-modal').addEventListener('click', () => document.getElementById('carModal').classList.remove('active'));
document.getElementById('carModal').addEventListener('click', (e) => { if (e.target.id === 'carModal') document.getElementById('carModal').classList.remove('active'); });

// ========== Favorites ==========
function toggleFavorite(event, id) {
    event.stopPropagation();
    const index = favorites.indexOf(id);
    if (index > -1) { favorites.splice(index, 1); showNotification('Removed from favorites', 'warning'); }
    else { favorites.push(id); showNotification('Added to favorites ❤️', 'success'); }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFeaturedCars(currentFilter);
    updateWishlistCount();
}

function updateWishlistCount() {
    const badge = document.getElementById('wishlistCount');
    if (badge) badge.textContent = favorites.length;
}

// ========== Compare ==========
function addToCompare(id) {
    const car = carsData.find(c => c.id === id);
    if (!car) return;
    const emptySlot = selectedCars.findIndex(c => c === undefined);
    const slotIndex = emptySlot > -1 ? emptySlot : selectedCars.length;
    if (slotIndex >= 3) { showNotification('You can compare only 3 cars', 'error'); return; }
    selectedCars[slotIndex] = car;
    updateComparisonSlots();
    showNotification(`Added ${car.brand} ${car.model} to compare`, 'success');
    document.getElementById('carModal').classList.remove('active');
    const compareSection = document.getElementById('compare-section');
    if(compareSection) compareSection.scrollIntoView({ behavior: 'smooth' });
}

function updateComparisonSlots() {
    for (let i = 0; i < 3; i++) {
        const slot = document.getElementById(`slot-${i + 1}`);
        if (!slot) continue;
        if (selectedCars[i]) {
            const car = selectedCars[i];
            slot.innerHTML = `<div style="text-align:center;"><h4>${car.brand} ${car.model}</h4><p style="color:var(--primary);font-weight:bold;">$${car.price.toLocaleString()}</p><button onclick="removeFromCompare(${i})" style="margin-top:10px;background:var(--danger);color:white;border:none;padding:8px 20px;border-radius:8px;cursor:none;">Remove</button></div>`;
            slot.classList.add('filled');
        } else {
            slot.innerHTML = `<div class="slot-placeholder"><i class="fas fa-plus-circle"></i><span>Add Car</span></div>`;
            slot.classList.remove('filled');
        }
    }
}

function removeFromCompare(index) {
    selectedCars[index] = undefined;
    updateComparisonSlots();
    showNotification('Removed from comparison', 'warning');
}

// ========== Search ==========
document.getElementById('searchBtn').addEventListener('click', () => {
    const brand = document.getElementById('brand-select').value;
    const year = document.getElementById('year-select').value;
    let filtered = carsData;
    if (brand) filtered = filtered.filter(car => car.brand === brand);
    if (year) filtered = filtered.filter(car => car.year === parseInt(year));
    
    if (filtered.length === 0) { showNotification('No matching results', 'warning'); return; }
    
    const grid = document.getElementById('cars-grid');
    grid.innerHTML = filtered.map((car, index) => `
        <div class="car-card reveal" onclick="viewCar(${car.id})" style="animation: fadeInUp 0.6s ease ${index * 0.1}s both;">
            <div class="car-image">
                <img src="${car.image}" alt="${car.brand} ${car.model}" onerror="this.src='https://via.placeholder.com/600x400/2563eb/ffffff?text=No+Image'">
                <span class="car-badge">${car.badge}</span>
                <div class="car-favorite ${favorites.includes(car.id) ? 'active' : ''}" onclick="toggleFavorite(event, ${car.id})"><i class="fas fa-heart"></i></div>
            </div>
            <div class="car-info">
                <h3 class="car-title">${car.brand} ${car.model}</h3>
                <div class="car-specs">
                    <span><i class="fas fa-calendar"></i> ${car.year}</span>
                    <span><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
                    <span><i class="fas fa-cog"></i> ${car.transmission}</span>
                    <span><i class="fas fa-road"></i> ${car.mileage.toLocaleString()} km</span>
                </div>
                <div class="car-price">$${car.price.toLocaleString()}</div>
                <div class="car-footer">
                    <div class="car-dealer"><i class="fas fa-store"></i> ${car.dealer}</div>
                    <div class="dealer-rating"><i class="fas fa-star"></i> ${car.rating}</div>
                </div>
            </div>
        </div>
    `).join('');
    document.getElementById('featured-section').scrollIntoView({ behavior: 'smooth' });
    showNotification(`Found ${filtered.length} cars`, 'success');
    setTimeout(() => initScrollReveal(), 100);
});

// ========== Filter Buttons ==========
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.filter;
        loadFeaturedCars(currentFilter);
    });
});

// ========== Other Buttons ==========
document.getElementById('startBtn').addEventListener('click', () => document.getElementById('buy-form').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('wishlistBtn').addEventListener('click', () => {
    if (favorites.length === 0) showNotification('Wishlist is empty', 'warning');
    else showNotification(`You have ${favorites.length} cars in wishlist`, 'info');
});
document.getElementById('subscribeBtn').addEventListener('click', () => {
    const email = document.getElementById('emailInput').value;
    if (!email || !email.includes('@')) { showNotification('Please enter a valid email', 'error'); return; }
    showNotification('Subscribed successfully! 🎉', 'success');
    document.getElementById('emailInput').value = '';
});
function contactDealer(dealer) { showNotification(`Contacting ${dealer}`, 'success'); }

// ========== Notification System ==========
function showNotification(message, type = 'info') {
    const notif = document.getElementById('notification');
    notif.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i> <span>${message}</span>`;
    notif.className = 'notification ' + type;
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 3000);
}

// ========== Scroll Effects ==========
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
        if (window.scrollY > 300) backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ========== Scroll Reveal ==========
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ========== Animate Stats ==========
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                let current = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        const label = entry.target.closest('.stat').querySelector('.stat-label').textContent;
                        entry.target.textContent = target.toLocaleString() + (label.includes('Satisfaction') ? '%' : '+');
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current).toLocaleString();
                    }
                }, 25);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    stats.forEach(stat => observer.observe(stat));
}

// ========== Event Listeners ==========
function initEventListeners() {
    document.getElementById('brand-select').addEventListener('change', function() {
        const brand = this.value;
        const modelSelect = document.getElementById('model-select');
        const models = { 
            'Toyota': ['Camry', 'Corolla', 'Land Cruiser'], 
            'Mercedes': ['C200', 'E200', 'S500'], 
            'BMW': ['X5', 'X3', 'Series 3'], 
            'Hyundai': ['Tucson', 'Sonata', 'Elantra'], 
            'Nissan': ['Patrol', 'Sunny', 'Altima'], 
            'Kia': ['Sorento', 'Sportage', 'Cerato'] 
        };
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        if (models[brand]) models[brand].forEach(model => { modelSelect.innerHTML += `<option value="${model}">${model}</option>`; });
    });
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.getElementById('carModal').classList.remove('active'); });
