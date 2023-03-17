const textarea = document.querySelector('textarea')
const nameInput = document.querySelector('#username')
const dateInput = document.querySelector('#date')
const postBtn = document.querySelector('.post-btn')
const commentsBlock = document.querySelector('.comments-block')

let currentHour = `${new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}`
let dateOfComment


textarea.addEventListener('input', checkValidate)
nameInput.addEventListener('input', checkValidate)
document.addEventListener('keypress', (e) => {
    if (e.code == 'Enter' && checkValidate() && !e.shiftKey) postComment()
})

commentsBlock.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) deleteComment(e.target)

    if (e.target.classList.contains('like_btn')) {
        e.target.classList.toggle('fa-solid');
        e.target.classList.toggle('fa-regular');
    }
})

postBtn.addEventListener('click', postComment)

function createComment() {
    if (!dateInput.value) dateOfComment = ''
    else dateOfComment = setCommentDate()

    let comment = {
        name: nameInput.value,
        text: textarea.value,
        date: dateOfComment
    }

    commentsBlock.innerHTML += `<div class="comment">
                                        <div class="info">
                                            <h3>${comment.name}</h3>
                                            <p>${comment.date}</p>
                                        </div>
                                        <div class="comment-text">
                                            <p>${comment.text}</p>
                                            <i class="fa-regular fa-heart like_btn"></i>
                                        </div>
                                        <i class="fa-solid fa-trash-can delete-btn"></i>
                                    </div>`
}

function postComment(e) {
    try {
        e.preventDefault();
    } catch (err) { }

    createComment();

    nameInput.value = '';
    textarea.value = '';
    dateInput.value = '';
    textarea.blur()

    checkValidate()
}

function checkValidate() {
    if (!nameInput.value.length) {
        warning.className = 'active'
    } else {
        warning.className = ''
    }

    if (textarea.value.length < 1 || nameInput.value.length < 1) {
        postBtn.disabled = true;
        return false;
    } else {
        postBtn.disabled = false;
        return true;
    }
}

function deleteComment(element) {
    element.parentNode.remove()
}

function setCommentDate() {
    if (dateInput.value.length < 1) return 'Сегодня ' + currentHour
    else {
        let currentDate = new Date()
        let date = new Date(dateInput.value)

        if (date.getFullYear() == currentDate.getFullYear()
            && date.getMonth() == currentDate.getMonth()
            && date.getDate() == currentDate.getDate()) {
            return 'Сегодня ' + currentHour
        } else if (date.getFullYear() == currentDate.getFullYear()
            && date.getMonth() == currentDate.getMonth()
            && date.getDate() == currentDate.getDate() - 1) {
            return 'Вчера ' + currentHour
        } else {
            return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}.${date.getFullYear()}`
        }
    }
}