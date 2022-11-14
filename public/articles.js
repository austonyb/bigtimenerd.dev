let articleAnchor = document.getElementById('article-base')

Window.onload = loadArticles()

let authors 

function loadArticles () {
    console.log('loadArticles Function called.')
    axios.get('/content')
    .then((res) => {
        const articles = res
        console.log(articles.data)

        for (let i = 0; i < articles.data.length; i++){
            const { id, author_id, publish_date, title, image, content } = articles.data[i]
            // let authorName = findAuthor(author_id)

            const post = document.createElement('div')

            post.innerHTML = `
            <h1>${title}</h1>
            <h2>Published on ${publish_date}</h2>
            <h2>Article #${id}</h2>
            <img src="${image}" class="max-w-sm rounded-lg shadow-2xl"></img>
            <br>
            <p class="text-sm">${content}</p>
            `
            articleAnchor.appendChild(post)
        }
    })
    .catch(err => {
        alert('cannot load articles at this time.')
    })
}


//feature to add later. Asks backend to query server for information on author names for posts.

// const findAuthor = id => {
//     axios.get('/content/author')
//     .then((res) => {
//         const { firstName, lastName } = res.data
//         authors = res.data
//     })
// }

