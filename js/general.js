let search = {
    button: document.querySelector('.user-nav__item-text_search'),
    field: document.querySelector('[name=text-search]')
}
let formLogin = document.querySelector('.user-nav__login-form');
let login = {
    button: document.querySelector('.user-nav__item-text_login'),
    userEmail: formLogin.querySelector('[name=login-email]'),
    userPassword: formLogin.querySelector('[name=login-password]'),
}
let loginElements = [login.userEmail, login.userPassword];

let storage = {
    isSupport: true,
    userName: '',
    userEmail: '',
}

try {
    storage.userName = localStorage.getItem('userName');
    storage.userEmail = localStorage.getItem('userEmail');
} catch (err) {
    storage.isSupport = false;
}

search.button.addEventListener('mouseover', function () {
    search.field.focus();
});

login.button.addEventListener('mouseover', function () {
    if (storage.isSupport) {
        if (storage.userEmail) {
            login.userEmail.value = storage.userEmail;
            for (let i = 0; i < loginElements.length; i++) {
                if (!loginElements[i].value) {
                    loginElements[i].focus();
                    break;
                }
            }
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
                setTimeout(() => loginElements[i].focus(), 600);
                break;
            }
        }
    } else {
        localStorage.setItem('userEmail', login.userEmail.value);
    }
});