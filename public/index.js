const readNowBtn = document.getElementById('read-now')
const nameHeader = document.getElementById('name-spot')
const chatInput = document.getElementById('chat-message')
const chatSubmitBtn = document.getElementById('chat-sbm')
const chatAnchor = document.getElementById('chat-anchor')
let logoutBtn
let user

// Window.onload = cookieChecker()

Window.onload = loader()

function loader () {
    cookieChecker()
    chatLoader()
}

function navigateToArticles() {
    window.location.href = '/articles'
}

function cookieChecker() {
    console.log(document.cookie)
    let userCookie = document.cookie
    let userName = cookieParser(userCookie)
    user = userName

    if (userName === undefined){
        console.log('no user logged in at the moment.')
    } else {
        const post = document.createElement('div')
        post.classList.add('p-10')
    
        post.innerHTML = `
        <h2>Welcome, ${userName}!</h2> <button class="btn btn-primary" id="logout">logout</button>`

        nameHeader.appendChild(post)
        logoutBtn = document.getElementById('logout')
    }
    
}

function chatLoader() {
    axios.get('/content/chat')
    .then((res) => {
        console.log(res.data)
        const comments = res.data

        for (let i = 0; i < comments.length; i++){
            const { poster, message, time } = comments[i]

            const messageBlock = document.createElement('div')
            messageBlock.classList.add('p-10')

            messageBlock.innerHTML =`
            <h1 class="flex justify-start">From: ${poster} at ${time}</h1>
            <p>${message}</p>
            `

            chatAnchor.appendChild(messageBlock)
        }

    })
}

// function submitChat() {
//     axios.push()
// }

function logout (evt) {
    // Delete the cookie
    document.cookie = `name=${user}; path=/; max-age=0;`
    window.location.href = '/'
}

function cookieParser (cookie) {
    let nameValue = cookie.split('=')
    console.log(nameValue[1])
    return nameValue[1]
}


logoutBtn.addEventListener('click', logout)
readNowBtn.addEventListener('click', navigateToArticles)