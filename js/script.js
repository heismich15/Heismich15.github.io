// ===== ANIMATION AU DÉFILEMENT =====
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Appel initial

// ===== ANIMATION DES COMPTEURS =====
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Plus la valeur est basse, plus c'est rapide
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);
        
        if (count < target) {
            counter.innerText = Math.min(count + increment, target);
            setTimeout(() => animateCounter(), 1);
        }
    });
}

// Démarrer l'animation des compteurs lorsqu'ils sont visibles
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    observer.observe(item);
});

// ===== GESTION DU FORMULAIRE DE CONTACT =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Merci pour votre message ! Je vous répondrai très rapidement.');
    this.reset();
});

// ===== NAVIGATION SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Ajustement pour la navbar fixe
                behavior: 'smooth'
            });
        }
    });
});

document.querySelector('.card').addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        e.stopPropagation();
        console.log('Navigation vers: ' + e.target.getAttribute('href'));
        // Ici vous pouvez ajouter la logique de navigation réelle
    }
});



// Fonction pour créer des étincelles dynamiques
function createSparkles() {
  const sparkleContainer = document.querySelector('.glow-h1 .sparkle');
  if (!sparkleContainer) return;
  
  // Supprimer les étincelles existantes (sauf les deux premières)
  const existingSparkles = sparkleContainer.querySelectorAll('span');
  if (existingSparkles.length > 5) {
    for (let i = 5; i < existingSparkles.length; i++) {
      sparkleContainer.removeChild(existingSparkles[i]);
    }
  }
  
  // Créer de nouvelles étincelles
  for (let i = 0; i < 10; i++) {
    const sparkle = document.createElement('span');
    
    // Position aléatoire
    const x = Math.random();
    const y = Math.random();
    
    // Définir les propriétés CSS personnalisées
    sparkle.style.setProperty('--x', x);
    sparkle.style.setProperty('--y', y);
    
    // Délai d'animation aléatoire
    sparkle.style.animationDelay = `${Math.random() * 3}s`;
    
    // Ajouter l'étincelle au conteneur
    sparkleContainer.appendChild(sparkle);
  }
}

// Créer des étincelles au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  createSparkles();
  
  // Recréer des étincelles périodiquement
  setInterval(createSparkles, 3000);
});

// Animation d'ondulation pour le texte
function animateTextWave() {
  const glowText = document.querySelector('.glow-h1');
  if (!glowText) return;
  
  // Cette animation est déjà gérée par CSS
  // Cette fonction est là pour d'éventuelles interactions supplémentaires
}

// Initialiser l'animation de vague
animateTextWave();


// Effet 3D pour les cartes cyber
function initCyberCards() {
    const cyberCards = document.querySelectorAll('.cyber-card-container');
    
    cyberCards.forEach(card => {
        const canvas = card.querySelector('.cyber-canvas');
        const cyberCard = card.querySelector('.cyber-card');
        
        // Réduire le nombre de trackers pour mobile
        if (window.innerWidth < 768) {
            const trackers = canvas.querySelectorAll('.cyber-tracker');
            for (let i = 3; i < trackers.length; i++) {
                trackers[i].remove();
            }
        }
        
        // Effet de luminosité au survol
        card.addEventListener('mouseenter', () => {
            cyberCard.style.filter = 'brightness(1.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            cyberCard.style.filter = 'brightness(1)';
            cyberCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    });
}

// Initialiser les cartes cyber
document.addEventListener('DOMContentLoaded', function() {
    initCyberCards();
}); 


// Formulaire de contact SIMPLE et FONCTIONNEL
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    const formStatus = document.getElementById('formStatus');
    
    // Données du formulaire
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // État de chargement
    submitBtn.innerHTML = '📤 Envoi en cours...';
    submitBtn.disabled = true;
    formStatus.style.display = 'none';
    
    // Simulation d'envoi + ouverture client email
    setTimeout(() => {
        // Créer le lien mailto
        const subject = `Message portfolio de ${formData.name}`;
        const body = `Nom: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
        const mailtoLink = `mailto:louismicheldjato9@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        // Ouvrir client email
        window.location.href = mailtoLink;
        
        // Message de succès
        formStatus.innerHTML = '✅ Client email ouvert ! Complétez et envoyez votre message.';
        formStatus.style.backgroundColor = '#d4edda';
        formStatus.style.color = '#155724';
        formStatus.style.display = 'block';
        
        // Réinitialiser le formulaire
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1000);
});