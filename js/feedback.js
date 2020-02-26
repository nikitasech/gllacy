let buttonOpenFeedback = document.querySelector('.contacts__feedback');
let modalFeedback = document.querySelector('.modal_feedback');
let formFeedback = modalFeedback.querySelector('.modal__form_feedback');
let feedback = {
    userName: formFeedback.querySelector('[name=feedback-name]'),
    userEmail: formFeedback.querySelector('[name=feedback-email]'),
    message: formFeedback.querySelector('[name=feedback-text]'),
    buttonClose: formFeedback.querySelector('.modal__close')
};
let feedbackElements = [feedback.userName, feedback.userEmail, feedback.message];

buttonOpenFeedback.addEventListener('click', function (evt) {
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
            setTimeout(() => feedbackElements[i].focus(), 800);
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
                setTimeout(() => feedbackElements[i].focus(), 600);
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
    modalFeedback.classList.remove('feedback_visible');
});

window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
        evt.preventDefault();
        modalFeedback.classList.remove('feedback_visible');
    }
});