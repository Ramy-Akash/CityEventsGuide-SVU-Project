document.addEventListener('DOMContentLoaded', function() {

  
    const categoryFilter = document.getElementById('category-filter');
    
    const eventCards = document.querySelectorAll('.event-card');

    if (categoryFilter) {
        
        categoryFilter.addEventListener('change', function() {
            
            const selectedCategory = categoryFilter.value;

            eventCards.forEach(function(card) {
                  
                const cardCategory = card.getAttribute('data-category');

                if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                    card.style.display = ''; 
                } else {
                    card.style.display = 'none'; 
                }
            });
        });
    }
});
    
    const contactForm = document.getElementById('contact-form');
    
    
    const formMessage = document.getElementById('form-message');

    if (contactForm) {

        contactForm.addEventListener('submit', function(event) {
            
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                showAlert('الرجاء ملء جميع الحقول المطلوبة.', 'danger');
                return; 
            }

            if (!email.includes('@') || !email.includes('.')) {
                showAlert('الرجاء إدخال عنوان بريد إلكتروني صالح.', 'danger');
                return; 
            } 
            showAlert('تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.', 'success');
                        
            contactForm.reset();
        });
    }

    function showAlert(message, type) {
        
        const alertHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
        formMessage.innerHTML = alertHTML;
    }