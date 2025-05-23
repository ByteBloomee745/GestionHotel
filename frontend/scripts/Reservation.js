document.addEventListener('DOMContentLoaded', function() {
    // Initialisation
    const steps = document.querySelectorAll('.reservation-step');
    const stepIndicators = document.querySelectorAll('.reservation-steps .step');
    let currentStep = 0;

    // Masquer toutes les étapes sauf la première
    steps.forEach((step, index) => {
        if (index !== 0) {
            step.style.display = 'none';
        }
    });

    // Fonction pour afficher une étape
    function showStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= steps.length) return;

        // Animation de sortie pour l'étape actuelle
        gsap.to(steps[currentStep], {
            opacity: 0,
            y: 20,
            duration: 0.3,
            onComplete: function() {
                steps[currentStep].style.display = 'none';
                
                // Affichage de la nouvelle étape
                steps[stepIndex].style.display = 'block';
                gsap.fromTo(steps[stepIndex], 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5 }
                );

                // Mise à jour des indicateurs
                stepIndicators.forEach(step => step.classList.remove('active'));
                stepIndicators[stepIndex].classList.add('active');
                currentStep = stepIndex;

                // Mise à jour du résumé si nécessaire
                if (stepIndex >= 3) {
                    updateReservationSummary();
                }

                // Scroll vers le haut
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Navigation
    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                showStep(currentStep + 1);
            }
        });
    });

    document.querySelectorAll('.prev-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showStep(currentStep - 1);
        });
    });

    // Sélection des suites
    document.querySelectorAll('.suite-option').forEach(suite => {
        suite.addEventListener('click', function(e) {
            // Ne rien faire si le clic vient du bouton
            if (e.target.closest('.select-btn')) return;
            
            // Désélectionner toutes les suites
            document.querySelectorAll('.suite-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Sélectionner la suite cliquée
            this.classList.add('selected');
            
            // Activer le bouton suivant
            document.querySelector('#step-1 .next-btn').disabled = false;
            
            // Animation
            gsap.from(this, {
                scale: 0.98,
                duration: 0.3
            });
        });
    });

    // Validation des étapes
    function validateStep(stepIndex) {
        let isValid = true;
        let errorMessage = '';

        switch(stepIndex) {
            case 0:
                if (!document.querySelector('.suite-option.selected')) {
                    errorMessage = 'Veuillez sélectionner une suite';
                    isValid = false;
                }
                break;

            case 1:
                const checkin = document.getElementById('checkin-date').value;
                const checkout = document.getElementById('checkout-date').value;
                
                if (!checkin || !checkout) {
                    errorMessage = 'Veuillez sélectionner des dates valides';
                    isValid = false;
                } else if (new Date(checkin) >= new Date(checkout)) {
                    errorMessage = 'La date de départ doit être après la date d\'arrivée';
                    isValid = false;
                }
                break;

            case 2:
                const requiredFields = ['first-name', 'last-name', 'email', 'phone'];
                for (const fieldId of requiredFields) {
                    const field = document.getElementById(fieldId);
                    if (!field.value.trim()) {
                        errorMessage = 'Veuillez remplir tous les champs obligatoires';
                        isValid = false;
                        break;
                    }
                }
                
                const email = document.getElementById('email').value;
                if (email && !/^\S+@\S+\.\S+$/.test(email)) {
                    errorMessage = 'Veuillez entrer une adresse email valide';
                    isValid = false;
                }
                break;

            case 3:
                const paymentMethod = document.querySelector('.payment-tab.active').dataset.tab;
                if (paymentMethod === 'credit-card') {
                    const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
                    if (!/^\d{16}$/.test(cardNumber)) {
                        errorMessage = 'Numéro de carte invalide (16 chiffres requis)';
                        isValid = false;
                    }
                    
                    const expiry = document.getElementById('card-expiry').value;
                    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
                        errorMessage = 'Date d\'expiration invalide (format MM/AA)';
                        isValid = false;
                    }
                    
                    const cvv = document.getElementById('card-cvv').value;
                    if (!/^\d{3,4}$/.test(cvv)) {
                        errorMessage = 'Code de sécurité invalide (3 ou 4 chiffres)';
                        isValid = false;
                    }
                }
                break;
        }

        if (!isValid && errorMessage) {
            alert(errorMessage);
        }

        return isValid;
    }

    // Mise à jour du résumé
    function updateReservationSummary() {
        // Suite
        const selectedSuite = document.querySelector('.suite-option.selected');
        if (selectedSuite) {
            document.getElementById('summary-suite').textContent = selectedSuite.querySelector('h3').textContent;
            document.getElementById('confirmation-suite').textContent = selectedSuite.querySelector('h3').textContent;
        }
        
        // Dates
        const checkin = document.getElementById('checkin-date').value;
        const checkout = document.getElementById('checkout-date').value;
        
        if (checkin && checkout) {
            const checkinDate = new Date(checkin);
            const checkoutDate = new Date(checkout);
            const nights = Math.floor((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
            
            document.getElementById('summary-dates').textContent = 
                `${formatDate(checkinDate)} - ${formatDate(checkoutDate)}`;
            document.getElementById('summary-nights').textContent = 
                `${nights} nuit${nights > 1 ? 's' : ''}`;
            
            document.getElementById('confirmation-checkin').textContent = formatDate(checkinDate);
            document.getElementById('confirmation-checkout').textContent = formatDate(checkoutDate);
        }
        
        // Occupants
        const adults = document.getElementById('adults-count').value;
        const children = document.getElementById('children-count').value;
        
        document.getElementById('summary-guests').textContent = 
            `${adults} adulte${adults > 1 ? 's' : ''}` + 
            (children > 0 ? `, ${children} enfant${children > 1 ? 's' : ''}` : '');
        
        // Options
        const selectedOptions = [];
        document.querySelectorAll('.option-checkbox:checked').forEach(option => {
            selectedOptions.push(option.closest('.option-item').querySelector('h4').textContent);
        });
        
        document.getElementById('summary-options').textContent = 
            selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Aucune option sélectionnée';
        
        // Calcul du total
        if (selectedSuite && checkin && checkout) {
            const basePrice = parseInt(selectedSuite.querySelector('h4').textContent.replace(/[^\d]/g, ''));
            const nights = Math.floor((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));
            let total = basePrice * nights;
            
            document.querySelectorAll('.option-checkbox:checked').forEach(option => {
                const priceText = option.closest('.option-item').querySelector('.option-price').textContent;
                const price = parseInt(priceText.replace(/[^\d]/g, ''));
                
                if (priceText.includes('/pers/jour')) {
                    total += price * parseInt(adults) * nights;
                } else if (priceText.includes('/jour')) {
                    total += price * nights;
                } else {
                    total += price;
                }
            });
            
            document.getElementById('summary-total').textContent = `€${total.toLocaleString('fr-FR')}`;
        }
        
        // Numéro de réservation
        document.getElementById('booking-number').textContent = 
            `ECL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    }

    function formatDate(date) {
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    // Initialisation des dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    document.getElementById('checkin-date').min = formatDateForInput(today);
    document.getElementById('checkout-date').min = formatDateForInput(tomorrow);
    
    document.getElementById('checkin-date').addEventListener('change', function() {
        const checkinDate = new Date(this.value);
        const nextDay = new Date(checkinDate);
        nextDay.setDate(nextDay.getDate() + 1);
        document.getElementById('checkout-date').min = formatDateForInput(nextDay);
        
        if (new Date(document.getElementById('checkout-date').value) < nextDay) {
            document.getElementById('checkout-date').value = formatDateForInput(nextDay);
        }
    });

    function formatDateForInput(date) {
        return date.toISOString().split('T')[0];
    }

    // Désactiver le premier bouton Suivant initialement
    document.querySelector('#step-1 .next-btn').disabled = true;

    // Onglets de paiement
    document.querySelectorAll('.payment-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            document.querySelectorAll('.payment-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            document.querySelectorAll('.payment-content').forEach(c => {
                c.classList.remove('active');
            });
            
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Confirmation
    document.querySelector('.confirm-btn').addEventListener('click', function(e) {
        e.preventDefault();
        if (validateStep(currentStep)) {
            const btn = this;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
            btn.disabled = true;
            
            setTimeout(() => {
                showStep(4);
                btn.innerHTML = 'Confirmer la Réservation';
                btn.disabled = false;
            }, 1500);
        }
    });
});
document.querySelectorAll('.suite-option').forEach(suite => {
    suite.addEventListener('click', function() {
        document.querySelectorAll('.suite-option').forEach(s => {
            s.classList.remove('selected');
        });
        this.classList.add('selected');
        document.querySelector('#step-1 .next-btn').disabled = false;
    });
});
window.addEventListener("load", function () {
        const preloader = document.querySelector(".preloader");
        if (preloader) {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
            preloader.style.transition = "opacity 0.5s ease";
        }
    });