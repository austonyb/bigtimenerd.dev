const articleAnchor = document.getElementById('article-base')

function loadArticles (event) {
    axios.get('/content')
    .then((res) => {

    })
    .catch(err => {
        alert('cannot load articles at this time.')
    })
}