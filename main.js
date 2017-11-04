$(document).ready(function () {

    $.ajax({
        url: 'http://localhost:5000/rooms',
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        dataType: 'json',
        success: function(roomResult){
            console.log(roomResult);
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
                        url: 'http://localhost:5000/users',
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
                <div class="col-md-3 pt-3" style="background-color: lightskyblue">
                <h5 style="color: blue">Rooms</h5><hr><br>
                    <ul class="list-group" >
                      <li class="list-group-item"><strong>${roomResult.data.rooms["0"].name}</strong>
                      &nbsp;&nbsp;
                        <span><a href="#"> <i class="fa fa-sign-in" aria-hidden="true"></i></a></span></li> 
                      <li class="list-group-item"><strong>${roomResult.data.rooms[1].name}</strong>
                      &nbsp;&nbsp;
                        <span><a href="#"><i class="fa fa-sign-in" aria-hidden="true"></i> </a></span></li> 
                    </ul>
                </div>
             <!-- random Result -->
                <div class="col-md-4">
                <h5 style="color: yellowgreen">Messages</h5><hr><br>
                    <p>
                      ${userMessages.data.message}
                    </p>
                    <input type="text" class="form-control" style="width: 100%; height: 20%" placeholder="Chat here" autofocus="autofocus">
                </div>       
                    
                <!-- users Result -->
                <div class="col-md-3 pb-3 pt-3" style="background-color: deepskyblue">
                <h5 style="color:black">Users</h5><hr><br>
                    <ul class="list-group" >
                      <li class="list-group-item"><strong>${usersResult.data.users["0"].name}</strong></li> 
                      <li class="list-group-item"><strong>${usersResult.data.users[1].name}</strong></li> 
                      <li class="list-group-item"><strong>${usersResult .data.users[2].name}</strong></li>
                 </ul>
                </div>
        `)

    }



});

