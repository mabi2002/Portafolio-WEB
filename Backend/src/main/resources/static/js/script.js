document.addEventListener('DOMContentLoaded', function() {
    initializeDarkMode();
    initializeLanguage();
    initializeContactForm();
});

// ===== Dark Mode Toggle =====
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;

    // Check for saved dark mode preference or default to system preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true' ||
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.textContent = '🌙';
    }

    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'true');
            darkModeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('darkMode', 'false');
            darkModeToggle.textContent = '🌙';
        }
    });
}

// ===== Language Toggle =====
function initializeLanguage() {
    const languageSelect = document.getElementById('languageToggle');
    const savedLanguage = localStorage.getItem('language') || 'es';

    languageSelect.value = savedLanguage;

    languageSelect.addEventListener('change', function(e) {
        const selectedLanguage = e.target.value;
        localStorage.setItem('language', selectedLanguage);
        changeLanguage(selectedLanguage);
    });
}

function changeLanguage(language) {
    const url = new URL(window.location);
    url.searchParams.set('lang', language);
    window.location.href = url.toString();
}

// ===== Contact Form =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validar campos
        if (!validateContactForm()) {
            return;
        }

        // Recopilar datos
        const formData = {
            nombre: document.getElementById('nombre').value.trim(),
            email: document.getElementById('email').value.trim(),
            asunto: document.getElementById('asunto').value.trim(),
            mensaje: document.getElementById('mensaje').value.trim()
        };

        // Desabilitar botón
        const submitBtn = contactForm.querySelector('.form-submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            // Enviar formulario
            const response = await fetch('/api/contacto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                showFormMessage('success', result.message || 'Mensaje enviado correctamente. Te responderé pronto.');
                contactForm.reset();
                clearFormErrors();
            } else {
                showFormMessage('error', result.message || 'Error al enviar el mensaje. Intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error:', error);
            showFormMessage('error', 'Error de conexión. Intenta de nuevo más tarde.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

function validateContactForm() {
    let isValid = true;
    clearFormErrors();

    // Validar nombre
    const nombre = document.getElementById('nombre').value.trim();
    if (nombre.length < 3) {
        showFormError('nombre', 'El nombre debe tener al menos 3 caracteres');
        isValid = false;
    }

    // Validar email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormError('email', 'El email no es válido');
        isValid = false;
    }

    // Validar asunto
    const asunto = document.getElementById('asunto').value.trim();
    if (asunto.length < 5) {
        showFormError('asunto', 'El asunto debe tener al menos 5 caracteres');
        isValid = false;
    }

    // Validar mensaje
    const mensaje = document.getElementById('mensaje').value.trim();
    if (mensaje.length < 10) {
        showFormError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    }

    return isValid;
}

function showFormError(fieldId, errorMessage) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    }
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });
}

function showFormMessage(type, message) {
    const messageElement = document.getElementById('formMessage');
    messageElement.textContent = message;
    messageElement.className = `form-message ${type} show`;

    // Auto-remove después de 5 segundos
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 5000);
}

// ===== Smooth Scroll Enhancement =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ===== Add Animation on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards and skill groups
document.querySelectorAll('.project-card, .skill-group, .about-section, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

