
        // <input class="form-control" id="form-id" type="hidden" name="formId" />
        //manage the session storage
        class Store {
            static getEntries() {
                let entries;
                if (sessionStorage.getItem('entries') === null) {
                    entries = [];
                } else {
                    entries = JSON.parse(sessionStorage.getItem('entries'));
                }
                return entries;
            }

            static getUsers() {
                let users;
                if (sessionStorage.getItem('users') === null) {
                    users = [];
                } else {
                    users = JSON.parse(sessionStorage.getItem('users'));
                }
                return users;
            }

            static getMedia() {
                let media;
                if (sessionStorage.getItem('media') === null) {
                    media = [];
                } else {
                    media = JSON.parse(sessionStorage.getItem('media'));
                }
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
                        console.log(entry.id, id);
                        entries.spice(index, 1)
                    }
                })

            }
        }

        async function getData(){
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
                
                await storeEntries( function () {
                    displayTable();
                })
                
                
     

            }catch(error){
                console.log('"catch" error in getData function' + error);
            }finally {
                console.log('"finally" from getData function');
            }
        }


        // Get user data from the server       

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
        // Get user data from the server
        // async function getUsers(){
        //     var response = await fetch('users');
        //     if(!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     };
        //     return await response.json();

        // }
        const localUsers = [];
        function storeUsers() {
            getUsers().then(data => {
                sessionStorage.removeItem('users');
                for (let i = 0; i < data['qUsers'].length; i++) {
                    Store.storeUsers(data['qUsers'][i]);
                }
            userData = JSON.parse(sessionStorage.getItem('users'));
            for(j = 0; j < userData.length; j++){
                localUsers.push(userData[j]);
            }
            });
        }

        const localMedia = [];
        function storeMedia(){
            sessionStorage.removeItem('media');
            getMedia().then(data => {
                for (let i = 0; i < data['qMedia'].length; i++) {
                    Store.storeMedia(data['qMedia'][i]);
                }
            mediaData = JSON.parse(sessionStorage.getItem('media'));
            for(j = 0; j < mediaData.length; j++){
                localMedia.push(mediaData[j]);
            }   
            });
        }

        const localEntries = [];
        function storeEntries(callback){
            sessionStorage.removeItem('entries');
            getEntries().then(data => {
                for (let i = 0; i < data['qEntries'].length; i++) {
                    Store.storeEntries(data['qEntries'][i]);
                }
            entryData = JSON.parse(sessionStorage.getItem('entries'));
            for(j = 0; j < entryData.length; j++){
                localEntries.push(entryData[j]);
            }
            callback()   
            });
        }

        getData()

            // .then(displayTable)
            // .catch(err => console.log(err));

        // displayTable(JSON.parse(sessionStorage.getItem('entries')));

        // console.log(JSON.parse(sessionStorage.getItem('entries')))
        // console.log(localUsers)
        // console.log(localUsers)
        // console.log(localMedia)
        // const myEntries = localEntries
        // console.log(myEntries)       
        // // Get media data from the server
        // async function getMedia(){
        //     var response = await fetch('media');
        //     if(!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     };
        //     return await response.json();

        // }
       
        // function storeMedia() {
        //     getMedia().then(data => {
        //         for (let i = 0; i < data['qMedia'].length; i++) {
        //             Store.storeMedia(data['qMedia'][i]);
        //         }
        //     })
        // }

        // // Get the entries data from the server see also the loadStorage function
        // async function getEntries() {
        //     var response = await fetch('/entries');
        //     if (!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }; 
            
        //     return await response.json();
        // }

       
        // // called first when home.html opens
        // function storeEntries() {
        //     getEntries().then(data => {   
        //         sessionStorage.clear()
        //         for (let i = 0; i < data['qEntries'].length; i++) {
        //             Store.storeEntries(data['qEntries'][i]);
        //         };
        //         var localEntries = JSON.parse(sessionStorage.getItem('entries'));
                    
        //         displayTable(localEntries);
        //         return localEntries;
        //     }, reason =>{
        //         console.log(reason);
        //     })
        //         .catch(err => console.log('errors: ' + err.message));
        // }

       

       

        // collect sessionStorage data into a variable for use
        // const localEntries = JSON.parse(sessionStorage.getItem('entries'))
        // const localUsers = JSON.parse(sessionStorage.getItem('users'))
        // const localMedia = JSON.parse(sessionStorage.getItem('media'))

       
        // const users = localEntries.filter(user => user.userFirstName)
        // console.log(users) 

        // storeEntries()
        // storeUsers()
        // storeMedia()
        // var myWait = setTimeout(displayTable(localEntries),1*1000);
        // mywait
        // displayTable(localEntries);

        //display the data ... NOTE THE BACK TIK SURROUNDING THE <tr.....</tr> WHICH ALLOWS CREATES THE "TEMPLATE LITERAL"
        function displayTable(callback) {
            callback ? console.log('displayTable callback present') : data = JSON.parse(sessionStorage.getItem('entries')); 
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
                    <button class="btn btn-success form-control" data-toggle="modal" data-target="#myModal"">View/Edit</button>
                 </td>
                </tr>`
                table.innerHTML += row
            }

        }


        //choose users
        function chooseUsers(data){
            var usersElement = document.getElementById('select_users')
        }

        // Create Django Ajax Call
        $("form#updateEntry").submit(function () {
            var idInput = $('input[name="formId"]').val().trim();
            var userInput = $('input[name="formUser"]').val().trim();
            var mediaInput = $('input[name="formMedia"]').val().trim();
            console.log(idInput);
            console.log(userInput);
            console.log(mediaInput);
            var titleInput = $('input[name="formTitle"]').val().trim();
            console.log(titleInput);
            var authorInput = $('input[name="formAuthor"]').val().trim();
            var actorsInput = $('input[name="formActors"]').val().trim();
            var ratingInput = $('input[name="formRating"]').val().trim();
            if (titleInput) {
                // Create Ajax Call
                $.ajax({
                    // url: '{% url "entry-update" %}',
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
                            displayTable(localEntries);

                            console.log(data.entry.id)
                        }
                    }
                });       
            } else {
                alert("All fields must have a valid value.");
            }
            // $('form#updateUser').trigger("reset");
            $('#myModal').modal('hide');
            return false;
        
        });


        // Update Django Ajax Call
        function editEntry(row) {
            // let x = row.rowIndex  ... works if you need the table row index
            // let id = row.cells[0].innerHTML ... hard coded method

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

        // function updateToUserTable(entry) {
        //     console.log(entry.id);
        //     localEntries.forEach( (localEntries, index) => {
        //         if ('id' === entry.id)
        //             localEnties.title = entry.title;
        //         localEntries[this]['author'].val = entry.author;
        //         localEntries[this]['actors'].val = entry.actors;
        //         localEntries[this]['rating'].val = entry.rating;

        //     });
        //     sessionStorage.clear()
        //     console.log(localEntries)
        //     for (let i = 0; i < data['localEntries'].length; i++) {
                
        //         Store.loadEntries(data['localEntries'][i]);
        //     };
        //     // let localEnties = JSON.parse(sessionStorage.getItem('entries'))
        //     console.log(localEntries)
        //     return JSON.parse(sessionStorage.getItem('entries'))
        // };



            // $("#entryTable #entry-" + localEntries.id).children(".entryData").each(function () {
            //     var attr = $(this).attr("title");
            //     if (attr == "title") {
            //         $(this).text(localEntry.title);
            //     } else if (attr == "author") {
            //         $(this).text(localEntries.author);
            //     } else if (attr == "actors") {
            //         $(this).text(localEntries.actors);
            //     } else {
            //         $(this).text(localEntries.rating);
            //     }
            // });
        





  
