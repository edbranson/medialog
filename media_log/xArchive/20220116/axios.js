
const form = document.getElementById("updateEntry");
form.addEventListener('submit', addEditEntrySubmit);

function addEditEntrySubmit(event){
    event.preventDefault();
    const inputs = document.getElementById("updateEntry").elements
    let idInput = inputs['formId'].value.trim()
    let userInput = inputs['formUser'].value
    let mediaInput = inputs['formMedia'].value
    let titleInput = inputs['formTitle'].value
    let authorInput = inputs['formAuthor'].value
    let actorsInput = inputs['formActors'].value
    let subjectInput = inputs['formSubject'].value
    let ratingInput = inputs['formRating'].value
    const axData = {
        'id': idInput,
        'user': userInput,
        'media': mediaInput,
        'title': titleInput,
        'author': authorInput,
        'actors': actorsInput,
        'subject': subjectInput,
        'rating': ratingInput
    }
    axios
    .post(UpdateEntryURL, axData,
    {
        headers: {'X-CSRFToken': getCookie("csrftoken"),}
    })   
    .then(response => {console.log(response)})
    .catch(err => {console.log(err, err.response)});
}    
