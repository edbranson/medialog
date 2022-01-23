

//manage the session storage
class Store {
    static getEntries() {
        let entries;
        (sessionStorage.getItem('entries') === null)
            ? entries = []
            : entries = JSON.parse(sessionStorage.getItem('entries'));
        return entries;
    }

    static getUsers() {
        let users;
        sessionStorage.getItem('users') === null
            ? users = []
            : users = JSON.parse(sessionStorage.getItem('users'));
        return users;
    }

    static getMedia() {
        let media;
        sessionStorage.getItem('media') === null
            ? media = []
            : media = JSON.parse(sessionStorage.getItem('media'));
        return media;
    }

    static storeUsers(data) {
        const users = Store.getUsers();
        users.push(data);
        sessionStorage.setItem('users', JSON.stringify(users));
    }

    static storeMedia(data) {
        const media = Store.getMedia();
        media.push(data);
        sessionStorage.setItem('media', JSON.stringify(media));
    }

    static storeEntries(data) {
        const entries = Store.getEntries();
        entries.push(data);
        sessionStorage.setItem('entries', JSON.stringify(entries));
    }

    static addEntry(data) {
        const entries = Store.getEntries();
        entries.push(data);
        sessionStorage.setItem('entries', JSON.stringify(entries));
    }

    static removeEntry(id) {
        const entries = Store.getEntries();
        entries.forEach((entry, index) => {
            if (entry.id === id) {

                entries.spice(index, 1)
            }
        })

    }
}

//calls get functions for data from server
//calls store functions to populate sessionStorage
//includes a callback to call displayTable()
//called from the js script
async function getAllData() {
    try {
        await getUsers()
            .then(data => {
                return data;
            });

        await storeUsers();

        await getMedia()
            .then(data => {
                return data;
            });

        await storeMedia();

        await getEntries()
            .then(data => {
                return data;
            })

        // callback function triggers display of the entries table
        await storeEntries(function () {
            displayTable();
        })

    } catch (error) {
        console.log('"catch" error in getData function' + error);
    } finally {
        console.log('"finally" in the getAllData function ran');
    }
}

// get data from server, called by getAllData()      
async function getUsers() {
    var response = await fetch('users');
    return response.json();
}

// get data from server, called by getAllData()      
async function getMedia() {
    var response = await fetch('media');
    return response.json();
}

// get data from server, called by getAllData()      
async function getEntries() {
    var response = await fetch('entries');
    return response.json();
}

//store data in sessionStorage, called by getAllData()
function storeUsers() {
    getUsers()
        .then(data => {
            //clean out sessionStorage first
            sessionStorage.removeItem('users');
            //populate sessionStorage from getAllData function
            data['qUsers'].forEach((x) => {
                Store.storeUsers(x)
            });
        });
}

//store data in sessionStorage, called by getAllData()
function storeMedia() {
    getMedia()
        .then(data => {
            //clean out sessionStorage first
            sessionStorage.removeItem('media');
            //populate sessionStorage from getAllData function
            data['qMedia'].forEach((x) => {
                Store.storeMedia(x)
            });
        });
}

//store data in sessionStorage, called by getAllData()
function storeEntries(callback) {  //callback anonomous function used to displayTable        
    getEntries()
        .then(data => {
            //clean out sessionStorage first
            sessionStorage.removeItem('entries');
            //populate sessionStorage from getAllData function
            data['qEntries'].forEach((x) => {
                Store.storeEntries(x)
            });
            callback();
        });
}

//calls get functions for data from server
//calls store functions to populate sessionStorage
//includes a callback to call displayTable()
getAllData()

function displayTable(arg) {

    //IF arg is a filter call with an arg ELSE a getAllData call without an arg 
    arg
        ? data = arg
        : data = JSON.parse(sessionStorage.getItem('entries'));
    var table = document.getElementById('entryTable')
    for (let i = 0; i < data.length; i++) {
        var row = `<tr id= "entry- + ${data[i].id}" onClick="editEntry(this)" >
                <td style="display:none;" id="entryId">${data[i].id}</td>
                <td style="display:none;" id="entryUser">${data[i].user}</td>
                <td style="display:none;" id="entryMedia">${data[i].media}</td>
                <td id="entryTitle">${data[i].title}</td>
                <td id="entryAuthor">${data[i].author}</td>
                <td id="entryActors">${data[i].actors}</td>
                <td id="entryRating">${data[i].rating}</td>
                <td align="center">
                    <button class="btn btn-success form-control" data-toggle="modal" data-target="#entryModal">View/Edit</button>
                 </td>
                </tr>`
        table.innerHTML += row
    }

}


function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("mediaTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}



// #entryModal to present updateEntry form
$("form#updateEntry").submit(function () {
    var idInput = $('input[name="formId"]').val().trim();
    var userInput = $('input[name="formUser"]').val().trim();
    var mediaInput = $('input[name="formMedia"]').val().trim();
    var titleInput = $('input[name="formTitle"]').val().trim();
    var authorInput = $('input[name="formAuthor"]').val().trim();
    var actorsInput = $('input[name="formActors"]').val().trim();
    var ratingInput = $('input[name="formRating"]').val().trim();
    if (titleInput) {
        // Create Ajax Call
        $.ajax({
            // see home.html script section for variable
            //UpdateEntryUrL defined as url: '{% url "entry-update" %}',
            url: UpdateEntryURL,
            data: {
                'id': idInput,
                'user': userInput,
                'media': mediaInput,
                'title': titleInput,
                'author': authorInput,
                'actors': actorsInput,
                'rating': ratingInput
            },
            dataType: 'json',
            success: function (data) {
                if (data.entry) {
                    location.reload(true);
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


//load selected entry data in updateEntry form
function editEntry(row) {
    let id = row.cells.namedItem("entryId").innerHTML;
    if (id) {
        tr_id = "#entry-" + id;
        user = row.cells.namedItem("entryUser").innerHTML;
        media = row.cells.namedItem("entryMedia").innerHTML;
        user = row.cells.namedItem("entryUser").innerHTML;
        media = row.cells.namedItem("entryMedia").innerHTML;
        title = row.cells.namedItem("entryTitle").innerHTML;
        author = row.cells.namedItem("entryAuthor").innerHTML;
        actors = row.cells.namedItem("entryActors").innerHTML;
        rating = row.cells.namedItem("entryRating").innerHTML;
        $('#form-id').val(id);
        $('#form-user').val(user);
        $('#form-media').val(media);
        $('#form-user').val(user);
        $('#form-media').val(media);
        $('#form-title').val(title);
        $('#form-author').val(author);
        $('#form-actors').val(actors);
        $('#form-rating').val(rating);
    }
}


//testingFunction is just for testing setTimeout()
function testingFunction() {
    // sortTable(3);
    localEntries = JSON.parse(sessionStorage.getItem('entries'));
    console.log(localEntries);
    oneEntry = [localEntries[2]];
    console.log(oneEntry);
    // displayTable(oneEntry);
    // displayTable(localEntries)
    // displayTable()
    const localMedia = JSON.parse(sessionStorage.getItem('media'));
    mediaTypes = localMedia.map(item => item.mediaType)
        .filter((value, index, self) => self.indexOf(value) === index)
    console.log(mediaTypes)
    localUsers = JSON.parse(sessionStorage.getItem('users'));
    userFirstNameList = localUsers.map(item => item.firstName);
}

setTimeout(function () {
    testingFunction()
}, 1000);

function filterTable(event) {
    var filter = event.target.value.toUpperCase();
    var rows = document.querySelector("#entryTable").rows;
    console.log(rows[0].cells)
    
    for (var i = 0; i < rows.length; i++) {
        var firstCol = rows[i].cells[3].textContent.toUpperCase();
        var secondCol = rows[i].cells[4].textContent.toUpperCase();
        if (firstCol.indexOf(filter) > -1 || secondCol.indexOf(filter) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }      
    }
}

document.querySelector('#mediaSearchInput').addEventListener('keyup', filterTable, false);


