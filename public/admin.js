let user
const toolArea = document.getElementById('tools-area')
let authorInput
let titleInput
let imageInput
let publishDateInput
let content
const publishBtn = document.getElementById('publish-btn')
let articleID
const deleteArticleBtn = document.getElementById('delete-article-btn')


Window.onload = loader()

function loader () {
    cookieChecker()
    // loadAdminTools()
}

//look for user cookie and check whether they are white-listed as an admin.

function cookieChecker() {
    console.log(document.cookie)
    let userCookie = document.cookie
    let userName = cookieParser(userCookie)
    user = userName

    if (userName === undefined){
        alert('sign in as an admin to continue.')
    } else {
        let body = {
            name: userName
        }
        
        axios.post('/user/admin', body)
        .then((res) => {
            if (res.data.success !== true){
                alert('You are not signed in as an admin. Please sign in as an admin then return to continue.')
            } else {
                loadAdminTools()
            }
        })
    }
    
}

function loadAdminTools() {
    let tools = document.createElement("section")

    tools.innerHTML = `
    <div class="flex-row px-5 py-5">
        <div>
            <span>Author ID:</span>
            <input id="author-id" type="text" placeholder="Author ID"></input>
        </div>
        <br>
        <div>
            <span>Title:</span>
            <input id="article-title" type="text" placeholder="Article Title"></input>
        </div>
        <br>
        <div>
            <span>Image:</span>
            <input id="image-link" type="text" placeholder="Image URL"></input>
        </div>
        <br>
        <div>
            <span>Publish Date:</span>
            <input id="publish-date" type="text" placeholder="Publish Date"></input>
        </div>
        <br>
        <div class="flex-row align-middle ">
            <span>Content:</span>
            <br>
            <textarea id="content" class="textarea textarea-bordered" placeholder="Article Content"></textarea>
        </div>
        <br>
        <br>
        <div>
        <h1>Delete an Article</h1>
        <h2>Note, this is non-reversible!</h2>
        <span>Enter Article Number or ID:</span>
            <input id="article-id" type="text" placeholder="ID"></input>
        </div>
    </div>`

    toolArea.appendChild(tools)

    authorInput = document.getElementById('author-id')
    titleInput = document.getElementById('article-title')
    imageInput = document.getElementById('image-link')
    publishDateInput = document.getElementById('publish-date')
    content = document.getElementById('content')
    articleID = document.getElementById('article-id')
}

function cookieParser (cookie) {
    let nameValue = cookie.split('=')
    console.log(nameValue[1] + ' is the name of the person logged in.')
    return nameValue[1]
}

const submitArticle = (body) => {
    axios.post('/content', body)
    .then((res) => {
        if (res.data.success === true){
            alert('Article successfully added')
        } else {
            alert('something went wrong.')
        }
    })
}

function submitHandler(evt){
    evt.preventDefault()

    let body = {
        authorID: authorInput.value,
        content: content.value,
        publishDate: publishDateInput.value,
        imageURL: imageInput.value,
        title: titleInput.value
    }

    submitArticle(body)
}


function deleteArticle(){
    let body = {
        id: articleID.value
    }

    axios.post('/content/delete', body)
    .then((res) => {
        if (res.data.success === true){
            alert(`Article with id ${articleID.value} has been deleted.`)
        } else {
            console.log("something went wrong with the deleteArticle function.")
        }
    })
}

publishBtn.addEventListener('click', submitHandler)
deleteArticleBtn.addEventListener('click', deleteArticle)