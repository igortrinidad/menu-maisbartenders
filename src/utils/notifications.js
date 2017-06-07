function errorNotify(errorTitle, errorMessage, position) {

    iziToast.show({
        position:  position? position : 'topRight',
        title: errorTitle,
        message: errorMessage,
        color: '#EE364E',
        titleColor: '#fff',
        messageColor: '#fff',
        iconColor: '#fff',
        progressBarColor: '#fff',
    });
}

function successNotify(errorTitle, errorMessage, position) {

    iziToast.show({
        position: position ? position : 'topRight',
        title: errorTitle,
        message: errorMessage,
        color: '#27ae60',
        titleColor: '#fff',
        messageColor: '#fff',
        iconColor: '#fff',
        progressBarColor: '#fff',
        timeout: 1500,
    });
}

function WarningNotify(errorTitle, errorMessage, position) {

    iziToast.show({
        position: position? position : 'topRight',
        title: errorTitle,
        message: errorMessage,
        color: '#EAC004',
        titleColor: '#fff',
        messageColor: '#fff',
        iconColor: '#fff',
        progressBarColor: '#fff',
    });
}

function InfoNotify(errorTitle, errorMessage, position) {

    iziToast.show({
        position:  position? position : 'topRight',
        title: errorTitle,
        message: errorMessage,
        color: '#2095F2',
        titleColor: '#fff',
        messageColor: '#fff',
        iconColor: '#fff',
        progressBarColor: '#fff',
        timeout: 2000,
    });
}
