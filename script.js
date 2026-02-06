// Obtener referencias a los elementos
const sliderTrack = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.diagonal-card');
const dots = document.querySelectorAll('.dot');
const i = document.querySelectorAll('.nav-bar i');
// Variables de control
let currentSlide = 0;
const totalSlides = slides.length;

// Variables para el swipe
let startX = 0;
let currentX = 0;
let isDragging = false;
let startTime = 0;

function updateSlider() {
    // Calcular el ancho de una tarjeta
    const slideWidth = slides[0].offsetWidth;
    
    // Gap entre tarjetas
    const gap = 20;
    
    // Calcular offset
    const offset = -(currentSlide * (slideWidth + gap));
    
    // Aplicar transformación
    sliderTrack.style.transform = `translateX(${offset}px)`;
    
    // Actualizar dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    updateSliderActive();
}

// Click en dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Touch events para swipe en mobile
sliderTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    startTime = Date.now();
    sliderTrack.style.cursor = 'grabbing';
});

sliderTrack.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
});

sliderTrack.addEventListener('touchend', () => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const timeElapsed = Date.now() - startTime;
    const velocity = Math.abs(diff) / timeElapsed;
    
    // Si es un swipe rápido (velocity > 0.5) o movimiento significativo (> 50px)
    if (velocity > 0.5 || Math.abs(diff) > 50) {
        if (diff > 0 && currentSlide < totalSlides - 1) {
            // Swipe izquierda -> siguiente
            currentSlide++;
        } else if (diff < 0 && currentSlide > 0) {
            // Swipe derecha -> anterior
            currentSlide--;
        }
        updateSlider();
    }
    
    isDragging = false;
    sliderTrack.style.cursor = 'grab';
});

// Mouse events para desktop (útil para testing)
sliderTrack.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
    startTime = Date.now();
    sliderTrack.style.cursor = 'grabbing';
});

sliderTrack.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
});

sliderTrack.addEventListener('mouseup', () => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const timeElapsed = Date.now() - startTime;
    const velocity = Math.abs(diff) / timeElapsed;
    
    if (velocity > 0.5 || Math.abs(diff) > 50) {
        if (diff > 0 && currentSlide < totalSlides - 1) {
            currentSlide++;
        } else if (diff < 0 && currentSlide > 0) {
            currentSlide--;
        }
        updateSlider();
    }
    
    isDragging = false;
    sliderTrack.style.cursor = 'grab';
});

sliderTrack.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        sliderTrack.style.cursor = 'grab';
    }
});

// Agregar/quitar clase 'active'
function updateSliderActive() {
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

// Inicializar slider
updateSlider();


i.forEach(icon => {
    icon.addEventListener('click', () => {
        i.forEach(icon => icon.classList.remove('active'));
        icon.classList.add('active');
    });
});