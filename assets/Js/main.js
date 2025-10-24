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
  
    const themeToggleButton = document.getElementById('theme-toggle');
    const bodyElement = document.body;

    function applyTheme(theme) {
        if (theme === 'dark') {
            bodyElement.classList.add('dark-mode');
            themeToggleButton.textContent = '☀️'; 
            localStorage.setItem('theme', 'dark'); 
        } else {
            bodyElement.classList.remove('dark-mode');
            themeToggleButton.textContent = '🌙'; 
            localStorage.setItem('theme', 'light'); 
        }
    }

    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light'); 

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', function() {
            const isDarkMode = bodyElement.classList.contains('dark-mode');
            applyTheme(isDarkMode ? 'light' : 'dark'); 
        });
    }


    const langToggleButton = document.getElementById('lang-toggle');
    const htmlElement = document.documentElement; 
    const translatableElements = document.querySelectorAll('[data-key]'); 
    function setLanguage(lang) {
        if (!translations[lang]) {
            console.error("Language not found in translations:", lang);
            return; 
        }

        htmlElement.setAttribute('lang', lang);
        htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        translatableElements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key]; 
            } else {
                console.warn(`Translation key "${key}" not found for language "${lang}".`);
            }
        });
        langToggleButton.textContent = lang === 'ar' ? 'EN' : 'AR';

        localStorage.setItem('language', lang);
        const titleElement = document.querySelector('title[data-key]');
        if (titleElement) {
             const titleKey = titleElement.getAttribute('data-key');
             if(translations[lang][titleKey]) {
                document.title = translations[lang][titleKey];
             }
        }
    }

    const savedLanguage = localStorage.getItem('language');
    setLanguage(savedLanguage === 'en' ? 'en' : 'ar');

    if (langToggleButton) {
        langToggleButton.addEventListener('click', function() {
            const currentLang = htmlElement.getAttribute('lang');
            setLanguage(currentLang === 'ar' ? 'en' : 'ar');
        });
    }
    function showAlert(messageKey, type) {
        const currentLang = localStorage.getItem('language') || 'ar'; 
        let message = translations[currentLang][messageKey]; 

        if (!message) {
            console.error(`Alert message key "${messageKey}" not found for language "${currentLang}".`);
            message = messageKey; 
        }

        const alertHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
        if (formMessage) { 
           formMessage.innerHTML = alertHTML;
        }
    }