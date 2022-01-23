// #entryModal to present updateEntry form
$("form#updateEntry").submit(function () {
    var idInput = $('input[name="formId"]').val().trim();
    var userInput = $('input[name="formUser"]').val().trim();
    var mediaInput = $('input[name="formMedia"]').val().trim();
    var titleInput = $('input[name="formTitle"]').val().trim();
    var authorInput = $('input[name="formAuthor"]').val().trim();
    var actorsInput = $('input[name="formActors"]').val().trim();
    var subjectInput = $('input[name="formSubject"]').val().trim();
    var ratingInput = $('input[name="formRating"]').val().trim();
    if (titleInput) {
        // Create Ajax Call
        $.ajax({
            type: "POST",
            // see home.html script section for variable
            //UpdateEntryUrL defined as url: '{% url "entry-update" %}',
            url: UpdateEntryURL,
            headers: { 'X-CSRFToken': getCookie("csrftoken")},
            data: {
                'id': idInput,
                'user': userInput,
                'media': mediaInput,
                'title': titleInput,
                'author': authorInput,
                'actors': actorsInput,
                'subject': subjectInput,
                'rating': ratingInput
            },
            dataType: 'json',
            success: function (data) {
                if (data.entry) {
                    location.reload();
                }
            }
        });
    } else {
        alert("All fields must have a valid value.");
    }
    // $('form#updateUser').trigger("reset");
    $('#entryModal').modal('hide');
    return false;
});
