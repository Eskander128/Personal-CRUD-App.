const titleEl = document.getElementById("post-title")
const textAreaEl = document.getElementById("post-body")
const btnEl = document.getElementById("add-btn")
const containerEl = document.getElementById("container")
const searchInputEl = document.getElementById("search-input")
let editId = null
let myPosts = []



function render(posts = myPosts) {
    let listItems = ""

    if (posts.length === 0) {
        containerEl.innerHTML = "<h3>No posts found...</h3>"
        return
    }

    for (let i = 0; i < posts.length; i++) {
        listItems += `
        <div class="post-card">
            <h3>${posts[i].title}</h3>
            <p class="post-date">${posts[i].date}</p>
            <p>${posts[i].body}</p>
            <button onclick="deletePost(${posts[i].id})">Delete</button>
            <button onclick="editPost(${posts[i].id})">Edit</button>
            <hr>
            </div>
            `
            
    }

    containerEl.innerHTML = listItems
}

const editPost = (postId) => {
    
    editId = postId

    const postToEdit = myPosts.find(post => post.id === postId)

    if (postToEdit) {
        titleEl.value = postToEdit.title
        textAreaEl.value = postToEdit.body

        btnEl.innerText = "Save"
    }
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
    });
}

btnEl.addEventListener("click", function() {
    let titleValue = titleEl.value 
    let bodyValue = textAreaEl.value

    if (titleValue.trim() === "" || bodyValue.trim() === "") {
        alert("Empty fields? Type something first! ✍️")
        return
    }

    if (editId !== null) {
        const index = myPosts.findIndex(post => post.id === editId)
        
        myPosts[index].title = titleValue
        myPosts[index].body = bodyValue 

        alert("Post Updated Successfully! ✅")

        editId = null
        btnEl.innerText = "Post"

    } else {

        let postObj = {id: Date.now(), title: titleValue, body: bodyValue, date: new Date().toLocaleDateString()}
        myPosts.push(postObj)
    }

   
    localStorage.setItem("myBlogs", JSON.stringify(myPosts))
    render()

    titleEl.value = ""
    textAreaEl.value = ""
})

let savedPosts = JSON.parse(localStorage.getItem("myBlogs")) 

if (savedPosts) {
    myPosts = savedPosts 
}

render()


function deletePost(postId) {
    if(confirm("Are you sure?")){
       
        myPosts = myPosts.filter(post => post.id !== postId)
        localStorage.setItem("myBlogs", JSON.stringify(myPosts))
        render() 
    }
}

searchInputEl.addEventListener ("input", function() {
    const searchValue = searchInputEl.value.toLowerCase()

    const posts = myPosts.filter(function(post){
        return post.title.toLowerCase().includes(searchValue) ||
               post.body.toLowerCase().includes(searchValue)
    })
    render(posts)
})

function showPage(pageId){
    document.getElementById("home-page").style.display = "none"
    document.getElementById("about-page").style.display = "none"
    document.getElementById(pageId).style.display = "block"
}
