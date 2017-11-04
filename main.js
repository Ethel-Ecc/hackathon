$(document).ready(function () {

    $.ajax({
        url: 'http://localhost:5000/rooms',
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        dataType: 'json',
        success: function(roomResult){
            console.log('This is the Room Result: '+ roomResult);
            $.ajax({ // 2nd call to get the users
                url: 'http://localhost:5000/users',
                headers: {
                    'Content-Type':'application/json'
                },
                method: 'GET',
                dataType: 'json',
                success: function(usersResult){
                    console.log(usersResult);

                    $.ajax({ // call to get the user messages
                        url: 'http://localhost:5000/chats/'+1234,
                        headers: {
                            'Content-Type':'application/json'
                        },
                        method: 'GET',
                        dataType: 'json',
                        success: function(userMessages){
                            console.log(userMessages);

                            $.ajax({
                                url: 'http://localhost:5000/random/meme',
                                headers: {
                                    'Content-Type':'application/json'
                                },
                                method: 'GET',
                                dataType: 'json',
                                success: function(randomResult){
                                    console.log( 'This is the Random Result: '+ randomResult);

                                    mainResult(roomResult, usersResult, userMessages);
                                }

                            });
                        }

                    });
                }

            });

        }

    });


    function mainResult(roomResult, userMessages, usersResult) {
        "use strict";
        $("#container").html(`
                <!-- random Result -->
                <div class="col-md-3">
                <h5 style="color: yellowgreen">Rooms</h5><hr><br>
                    <ul class="list-group" >
                      <li class="list-group-item"><strong>${roomResult.data.rooms["0"].name}</strong></li> 
                      <li class="list-group-item"><strong>${roomResult.data.rooms[1].name}</strong></li> 
                    </ul>
                </div>
             <!-- random Result -->
                <div class="col-md-4">
                <h5 style="color: yellowgreen">Messages</h5><hr><br>
                    <ul class="list-group" >
                      <!--  <li class="list-group-item"><strong>${userMessages.data.message}</strong></li> -->
                    </ul>
                </div>       
                    
                <!-- users Result -->
                <div class="col-md-3">
                <h5 style="color:green">Users</h5><hr><br>
                    <ul class="list-group" >
                      
                      
                    </ul>
                </div>
        `)

    }



});

