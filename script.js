document.addEventListener('DOMContentLoaded', function() {
    var surveyButtons = document.querySelectorAll('.survey-button');
    var surveyForm = document.getElementById('surveyForm');
    var submitButton = document.querySelector('.submit-button');
    var thankYouPage = document.getElementById('thankYouPage');
    
    var selectedAnswers = {};
    
    var modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = '<div class="modal-content"><p class="modal-message">Please answer all questions before submitting.</p><button class="modal-ok-button">OK</button></div>';
    document.body.appendChild(modalOverlay);
    
    var modalOkButton = modalOverlay.querySelector('.modal-ok-button');
    
    modalOkButton.addEventListener('click', function() {
        modalOverlay.classList.remove('show');
    });
    
    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            modalOverlay.classList.remove('show');
        }
    });
    
    surveyButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var questionNumber = this.getAttribute('data-question');
            var answerValue = this.getAttribute('data-value');
            
            var questionButtons = document.querySelectorAll('[data-question="' + questionNumber + '"]');
            questionButtons.forEach(function(btn) {
                btn.classList.remove('selected');
            });
            
            this.classList.add('selected');
            
            selectedAnswers[questionNumber] = answerValue;
            
            updateSubmitButton();
        });
    });
    
    function updateSubmitButton() {
        var totalQuestions = 3;
        var answeredQuestions = Object.keys(selectedAnswers).length;
        
        if (answeredQuestions === totalQuestions) {
            submitButton.classList.add('all-answered');
        } else {
            submitButton.classList.remove('all-answered');
        }
    }
    
    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        
        if (Object.keys(selectedAnswers).length !== 3) {
            modalOverlay.classList.add('show');
            return;
        }
        
        var surveyData = {
            responses: selectedAnswers,
            timestamp: new Date().toISOString()
        };
        
        fetch('/api/survey-submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(surveyData)
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function(data) {
            console.log('Survey submitted successfully:', data);
            showThankYouPage();
        })
        .catch(function(error) {
            console.error('Error submitting survey:', error);
            showThankYouPage();
        });
    });
    
    function showThankYouPage() {
        surveyForm.style.display = 'none';
        document.querySelector('.survey-header').style.display = 'none';
        document.querySelector('.contact-info').style.display = 'none';
        thankYouPage.classList.add('show');
    }
    
    updateSubmitButton();
    
    surveyButtons.forEach(function(button) {
        button.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
        button.setAttribute('tabindex', '0');
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modalOverlay.classList.contains('show')) {
            modalOverlay.classList.remove('show');
        }
    });
});