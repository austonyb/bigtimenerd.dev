let articleAnchor = document.getElementById('article-base')
let buttons

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
            post.classList.add('p-10')

            post.innerHTML = `
            <h1>${title}</h1>
            <h2>Published on ${publish_date}</h2>
            <h2">Article #${id}</h2>
            <img src="${image}" class="max-w-sm rounded-lg shadow-2xl"></img>
            <br>
            <p class="text-sm">${content}</p>
            <button class="btn gap-2" id="article-${id}" >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            Like
            </button>
            
            `
            articleAnchor.appendChild(post)
            buttons = document.getElementsByName('button')
        }
    })
    .catch(err => {
        alert('cannot load articles at this time.')
    })
}

function like (event) {
    event.preventDefault()
    axios.get('/content/like')
    .then((res) => {
        
    })
}

buttons.addEventListener('click', like)

//feature to add later. Asks backend to query server for information on author names for posts.

// const findAuthor = id => {
//     axios.get('/content/author')
//     .then((res) => {
//         const { firstName, lastName } = res.data
//         authors = res.data
//     })
// }

