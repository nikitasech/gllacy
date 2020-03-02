let search = {
    button: document.querySelector('.user-nav__item-text_search'),
    field: document.querySelector('[name=text-search]'),
};
let formLogin = document.querySelector('.user-nav__login-form');
let login = {
    button: document.querySelector('.user-nav__item-text_login'),
    userEmail: formLogin.querySelector('[name=login-email]'),
    userPassword: formLogin.querySelector('[name=login-password]'),
};
let loginElements = [login.userEmail, login.userPassword];

let modalFeedback;
let formFeedback;
let feedback = {
    userName: null,
    userEmail: null,
    message: null,
    buttonOpen: null,
    buttonClose: null,
    isPresence: true,
};
let feedbackElements = [];

let storage = {
    userName: null,
    userEmail: null,
    isSupport: true,
}

let isPresenceFeedback = true;

try {
    storage.userName = localStorage.getItem('userName');
    storage.userEmail = localStorage.getItem('userEmail');
} catch (err) {
    storage.isSupport = false;
}

try {
    feedback.buttonOpen = document.querySelector('.contacts__feedback');
    modalFeedback = document.querySelector('.modal_feedback');
    formFeedback = modalFeedback.querySelector('.modal__form_feedback');
    feedback.userName = formFeedback.querySelector('[name=feedback-name]');
    feedback.userEmail = formFeedback.querySelector('[name=feedback-email]');
    feedback.message = formFeedback.querySelector('[name=feedback-text]');
    feedback.buttonClose = formFeedback.querySelector('.modal__close');
    feedbackElements = [feedback.userName, feedback.userEmail, feedback.message];
} 
catch (err) {
    feedback.isPresence = false;
}

if (feedback.isPresence) {
    feedback.buttonOpen.addEventListener('click', function (evt) {
        evt.preventDefault();

        modalFeedback.classList.add('feedback_visible');
        if (storage.isSupport) {
            if (storage.userName) {
                feedback.userName.value = storage.userName;
            }
            if (storage.userEmail) {
                feedback.userEmail.value = storage.userEmail;
            }
        }

        for (let i = 0; i < feedbackElements.length; i++) {
            if (!feedbackElements[i].value) {
                setTimeout(function () {
                    feedbackElements[i].focus();
                }, 800);
                break;
            }
        }
    });

    formFeedback.addEventListener('submit', function (evt) {
        if (!feedback.userName.value || !feedback.userEmail.value || !feedback.message.value) {
            evt.preventDefault();
            formFeedback.classList.remove('modal_err');
            formFeedback.offsetWidth = formFeedback.offsetWidth;
            formFeedback.classList.add('modal_err');
            for (let i = 0; i < feedbackElements.length; i++) {
                if (!feedbackElements[i].value) {
                    setTimeout(function () {
                        feedbackElements[i].focus();
                    }, 600);
                    break;
                }
            }
        } else {
            localStorage.setItem('userName', feedback.userName.value);
            localStorage.setItem('userEmail', feedback.userEmail.value);
        }
    });

    feedback.buttonClose.addEventListener('click', function (evt) {
        evt.preventDefault();
        
        modalFeedback.classList.add('feedback_closed');
        setTimeout(function () {
            modalFeedback.classList.remove('feedback_visible');
            modalFeedback.classList.remove('feedback_closed');
        }, 300);
    });

    modalFeedback.addEventListener('mousedown', function (evt) {
        if (evt.target === modalFeedback) {
            modalFeedback.classList.add('feedback_closed');
            setTimeout(function () {
                modalFeedback.classList.remove('feedback_visible');
                modalFeedback.classList.remove('feedback_closed');
            }, 300);
        }
    });

    window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
            evt.preventDefault();
            modalFeedback.classList.remove('feedback_visible');
        }
    });
}

search.button.addEventListener('mouseover', function () {
    search.field.focus();
});

login.button.addEventListener('mouseover', function () {
    if (storage.isSupport) {
        
        if (storage.userEmail) {
            login.userEmail.value = storage.userEmail;
        } 
    }  
    for (let i = 0; i < loginElements.length; i++) {
        if (!loginElements[i].value) {
            loginElements[i].focus();
            break;
        }
    }
});

formLogin.addEventListener('submit', function (evt) {
    if (!login.userEmail.value || !login.userPassword.value) {
        evt.preventDefault();
        formLogin.classList.remove('modal_err');
        formLogin.offsetWidth = formFeedback.offsetWidth;
        formLogin.classList.add('modal_err');
        for (let i = 0; i < loginElements.length; i++) {
            if (!loginElements[i].value) {
                setTimeout(function () {
                    loginElements[i].focus();
                }, 600);
                break;
            }
        }
    } else {
        localStorage.setItem('userEmail', login.userEmail.value);
    }
});