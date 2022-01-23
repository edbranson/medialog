
    
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

        async function getAllData(){
            try{
                await getUsers()
                .then(data=>{
                    return data;
                });

                await storeUsers();
                
                await getMedia()
                .then(data=>{
                    return data;    
                });

                await storeMedia();

                await getEntries()
                .then(data=>{
                    return data;
                })
                
                //
                await storeEntries( function () {
                    displayTable();
                })   

            }catch(error){
                console.log('"catch" error in getData function' + error);
            }finally {
                console.log('"finally" in the getAllData function ran');
            }
        }

        // Functions created to get user data from the server       
        async function getUsers(){
            var response = await fetch('users');
            return response.json();
        }

        async function getMedia(){
            var response = await fetch('media');
            return response.json();
        }    

        async function getEntries(){
            var response = await fetch('entries');
            return response.json();
        }    
        
        //Define functions to store data in sessionStorage and
        //create global variables of the same data from sessionStorage
        //called from the getAllData function
        const localUsers = [];
        function storeUsers() {
            getUsers()
            .then(data => {
                //clean out sessionStorage first
                sessionStorage.removeItem('users');
                //populate sessionStorage from getAllData function
                for (let i = 0; i < data['qUsers'].length; i++) {
                    Store.storeUsers(data['qUsers'][i]);
                }
            // load global variable with data from sessionStorage    
            userData = JSON.parse(sessionStorage.getItem('users'));
            for(j = 0; j < userData.length; j++){
                localUsers.push(userData[j]);
            }
            });
        }

        const localMedia = [];
        function storeMedia(){    
            getMedia()
            .then(data => {
                //clean out sessionStorage first
                sessionStorage.removeItem('media');
                //populate sessionStorage from getAllData function
                for (let i = 0; i < data['qMedia'].length; i++) {
                    Store.storeMedia(data['qMedia'][i]);
                }
            // load global variable with data from sessionStorage    
            mediaData = JSON.parse(sessionStorage.getItem('media'));
            for(j = 0; j < mediaData.length; j++){
                localMedia.push(mediaData[j]);
            }   
            });
        }

        const localEntries = [];
        function storeEntries(callback){  //callback anonomous function used to displayTable        
            getEntries()
            .then(data => {
                //clean out sessionStorage first
                sessionStorage.removeItem('entries');
                //populate sessionStorage from getAllData function
                for (let i = 0; i < data['qEntries'].length; i++) {
                    Store.storeEntries(data['qEntries'][i]);
                }
            // load global variable with data from sessionStorage    
            entryData = JSON.parse(sessionStorage.getItem('entries'));
            for(j = 0; j < entryData.length; j++){
                localEntries.push(entryData[j]);
            }
            callback()
            });
        }

        //Runs the get functions and the store functions for data from server
        //and to sessionStorage
        //includes a callback to trigger the displayTable function
        getAllData() 

        //display the entry data 
        //called from the storeEnties function called by the getAllData function and 
        //from filter functions  .. arg differentiats between getAllData call and a filter call with arg
        function displayTable(arg) {
            //IF arg is a filter call with an arg ELSE a getAllData call without an arg 
            arg
            ? console.log('displayTable callback present') : data = JSON.parse(sessionStorage.getItem('entries')); 
            var table = document.getElementById('entryTable')
            for (let i = 0; i < data.length; i++) {
                var row = `<tr id= "entry- + ${data[i].id}" onClick="editEntry(this)" >
                <td style="display:none;" id="entryId">${data[i].id}</td>
                <td style="display:none;" id="entryUser">${data[i].user}</td>
                <td style="display:none;" id="entryMedia">${data[i].media}</td>
                <td id="entryTitle">${data[i].title}</td>
                <td id="entryAuthor">${data[i].author}</td>
                <td id="entryActors">${data[i].actors}</td>
                <td id = "entryRating">${data[i].rating}</td>
                <td align="center">
                    <button class="btn btn-success form-control" data-toggle="modal" data-target="#entryModal">View/Edit</button>
                 </td>
                </tr>`
                table.innerHTML += row
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


        //choose users
        function chooseUsers(data){
            var usersElement = document.getElementById('select_users')
        }


       
        





  
