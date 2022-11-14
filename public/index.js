const readNowBtn = document.getElementById('read-now')

function navigateToArticles() {
    window.location.href = '/articles'
}

readNowBtn.addEventListener('click', navigateToArticles)