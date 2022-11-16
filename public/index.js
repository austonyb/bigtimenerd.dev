const readNowBtn = document.getElementById('read-now')
const nameHeader = document.getElementById('name-spot')
const chatInput = document.getElementById('chat-message')
const chatSubmitBtn = document.getElementById('chat-sbm')
const chatAnchor = document.getElementById('chat-anchor')
let logoutBtn
let user

//stat checker consts

const commentCountElement = document.getElementById('comment-count')
const userCountElement = document.getElementById('user-count')
const articleCountElement = document.getElementById('article-count')

// Window.onload = cookieChecker()

Window.onload = loader()

function loader () {
    cookieChecker()
    chatLoader()
    statLoader()
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
            let { poster, message, time } = comments[i]
            
            timeConverted = new Date(time).valueOf()
            // time = timeConverted - (1000 * 60 * 60 * 7)
            time = timeConverted
            time = new Date(time).toLocaleString()

            const messageBlock = document.createElement('div')
            messageBlock.classList.add('p-10')

            messageBlock.innerHTML =`
            <div class="avatar">
                <div class="w-12">
                    <img class="rounded-full" src="https://placeimg.com/192/192/people" />
                </div>
            </div>
            <h1>From: ${poster} at ${time}</h1>
            <p>${message}</p>
            `
            chatAnchor.appendChild(messageBlock)
        }

    })
}

function loadLatestChat () {
    axios.get('/content/chat')
    .then((res) => {
        const comments = res.data
        
        const { poster, message, time } = comments[comments.length - 1]

            const messageBlock = document.createElement('div')
            messageBlock.classList.add('p-10')

            messageBlock.innerHTML =`
            <div class="avatar">
                <div class="w-12">
                    <img class="rounded-full" src="https://placeimg.com/192/192/people" />
                </div>
            </div>
            <h1>From: ${poster} at ${time}</h1>
            <p>${message}</p>
            `

            chatAnchor.appendChild(messageBlock)
        

    })
}

function submitChat() {
    if (user !== undefined){
        let body = {
            poster: user,
            message: chatInput.value
        }

        axios.post('content/chat', body)
        .then((res) => {
            if (res.data.success === true){
                loadLatestChat()
            }
        })
    } else {
        alert('Log-in to chat.')
        window.location.href = '/login'
    }
}

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


//stat loader at the bottom of the page.

function statLoader() {
    axios.get('/content/count')
    .then((res) => {
      console.log(res.data.articleCount)
      const { messageCount, userCount, articleCount } = res.data
      commentCountElement.textContent = messageCount
      userCountElement.textContent = userCount
      articleCountElement.textContent = articleCount
    })
  }

chatSubmitBtn.addEventListener('click', submitChat)
logoutBtn.addEventListener('click', logout)
readNowBtn.addEventListener('click', navigateToArticles)