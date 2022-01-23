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
    console.log(titleInput);
    let data = {
       'id': idInput,
       'user': userInput,
       'media': mediaInput,
       'title': titleInput,
       'author': authorInput,
       'actors': actorsInput,
       'subject': subjectInput,
       'rating': ratingInput
    };

    xupdateEntry(UpdateEntryURL, data)
        .then(function(response) {
            if (response.status >= 400) {
                return response.json().then(errResData => {
                    const error = new Error('network error');
                    error.data = errResData;
                    throw error;
                });
            }
           
        })
        .then(location.reload())
        .catch(function(err) {
            console.log('fetch Error :-S', err)
        });
 
    // type = add ? XupdateEntry(UpdateEntryURL, data) : XaddEntry(AddEntryUrL, data);
}

// async function XupdateEntry(url = '', data = {}){
async function xupdateEntry(url = '', data){

    const response = await fetch(url, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie("csrftoken")
        },
        body: JSON.stringify(data) 
    });
    return response.json();
   
}

