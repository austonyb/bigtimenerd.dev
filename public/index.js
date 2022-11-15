const readNowBtn = document.getElementById('read-now')

Window.onload = cookieChecker()

function navigateToArticles() {
    window.location.href = '/articles'
}

function cookieChecker() {
    if (document.cookie.user) {
        console.log(`A user cookie exists: ${document.cookie}`)
    } else {
        console.log('no user cookie available.')
    }
}

readNowBtn.addEventListener('click', navigateToArticles)