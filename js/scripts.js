//changes background color of the body
$('body').css('background-color', '#a2b1e0');

//requests data from random user api
fetch('https://randomuser.me/api/?nat=au,us,dk,fr,gb&results=12&lego')
    .then(response => response.json())
    .then(data => generateUsers(data.results))
    .catch(err => console.log('Fetch Error :-S', err));

//method to use the received data from the API and generate employee 'cards' onto the webpage
function generateUsers(allUsers) {
    //console.log(allUsers)
    allUsers.forEach(user => {
        //template literal for new user card that will be appended to the webpage
        const newUserCard = `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src=${user.picture.medium} alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="card-text" email=${user.email}>${user.email}</p>
                    <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                </div>
            </div>
        `;
        $('#gallery').append(newUserCard);
    })

    employeeClick();
    //function for click event handler for all employee 'cards' on the page
    function employeeClick() {
        $('.card').on('click', function() {
            //assigns the image url of the clicked employee 'card' to a constant named 'clickedUserSRC'
            const clickedUserSRC = $(this)[0].children[0].childNodes[1].attributes[1].nodeValue;
            //initializes variable 'clickedUser' which is null, but will store the clicked user object
            let clickedUser = null;

            //iterates through user directory checking for a user with matching image url as 'clickedUserSRC'
            //it then stores that matched user to variable 'clickedUser'
            // allUsers.forEach(user => {
            //     if (clickedUserSRC === user.picture.medium) {
            //         clickedUser = user;
            //         console.log(clickedUser);
            //         console.log(allUsers);
            //     }
            // })

            for (let i = 0; i < allUsers.length; i++) {
                if (clickedUserSRC === allUsers[i].picture.medium) {
                    clickedUser = allUsers[i];
                    console.log(clickedUser);
                }
            }

            //index of clicked user in the array of users
            let indexOfClickedUser = allUsers.indexOf(clickedUser);

            //converts user birthday for mm/dd/yyyy format
            let clickedUserDOB = '';
            getBirthday(clickedUser);

            //converts user birthday for mm/dd/yyyy format
            function getBirthday(user) {
                clickedUserDOB = new Date(user.dob.date);
                var dd = clickedUserDOB.getDate();
                var mm = clickedUserDOB.getMonth() + 1;
                var yyyy = clickedUserDOB.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                clickedUserDOB = mm + '/' + dd + '/' + yyyy;
            }


            function appendModalWindow(clickedUser) {
                //template literal for clicked user modal window that will be appended to the webpage
                const clickedUserWindow = `
                <div class="modal-container">
                    <div class="modal">
                        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                        <div class="modal-info-container">
                            <img class="modal-img" src=${clickedUser.picture.medium} alt="profile picture">
                            <h3 id="name" class="modal-name cap">${clickedUser.name.first} ${clickedUser.name.last}</h3>
                            <p class="modal-text">${clickedUser.email}</p>
                            <p class="modal-text cap">${clickedUser.location.city}, ${clickedUser.location.state}</p>
                            <hr>
                            <p class="modal-text">${clickedUser.cell}</p>
                            <p class="modal-text" id="modal-location">${clickedUser.location.street}, ${clickedUser.location.city}, ${clickedUser.location.state} ${clickedUser.location.postcode}</p>
                            <p class="modal-text">Birthday: ${clickedUserDOB}</p>
                        </div>
                        <div class="modal-btn-container">
                            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                            <button type="button" id="modal-next" class="modal-next btn">Next</button>
                        </div>
                    </div>
                </div>
            `;

                $('body').append(clickedUserWindow);
                $('.modal-text').css('text-transform', 'capitalize');
                $('#modal-next').on('click', function() {
                    resetNextUser();
                });
                $('#modal-prev').on('click', function() {
                    resetPrevUser();
                });
            }

            appendModalWindow(clickedUser);
            closeModalWindow();


            //next user is initalized by increasing index of current user by 1
            //previous user is initialized by decreasing index of current user by 1
            let nextUser = allUsers[indexOfClickedUser + 1];
            let prevUser = allUsers[indexOfClickedUser - 1];

            //sets next user to current user
            function resetNextUser() {
                if (indexOfClickedUser <= 10) {
                    $('.modal-container').remove();
                    appendModalWindow(nextUser);
                    indexOfClickedUser += 1;
                    clickedUser = nextUser;
                    nextUser = allUsers[indexOfClickedUser + 1];
                    prevUser = allUsers[indexOfClickedUser - 1];
                    closeModalWindow();
                } else {
                    alert("You have reached the end of the directory");
                }
            }
            // function resetNextUser() {
            //     if (indexOfClickedUser < 10) {
            //         $('.modal-container').remove();
            //         appendModalWindow(nextUser);
            //         indexOfClickedUser += 1;
            //         clickedUser = nextUser;
            //         nextUser = allUsers[indexOfClickedUser + 1];
            //         prevUser = allUsers[indexOfClickedUser - 1];
            //         closeModalWindow();
            //     } else if (indexOfClickedUser = 11) {
            //         $('.modal-container').remove();
            //         indexOfClickedUser = -1;
            //         appendModalWindow(nextUser);
            //         closeModalWindow();
            //         clickedUser = nextUser;
            //         nextUser = allUsers[0];
            //         prevUser = allUsers[indexOfClickedUser - 1];
            //     }
            // }

            //sets previous user to current user
            // function resetPrevUser() {
            //     if (indexOfClickedUser > 1) {
            //         $('.modal-container').remove();
            //         appendModalWindow(prevUser);
            //         indexOfClickedUser -= 1;
            //         clickedUser = prevUser;
            //         nextUser = allUsers[indexOfClickedUser + 1];
            //         prevUser = allUsers[indexOfClickedUser - 1];
            //         closeModalWindow();
            //     } else if (indexOfClickedUser = 1) {
            //         $('.modal-container').remove();
            //         indexOfClickedUser = 12;
            //         appendModalWindow(prevUser);
            //         closeModalWindow();
            //         clickedUser = prevUser;
            //         nextUser = allUsers[1];
            //         prevUser = allUsers[11];
            //     }
            // }
            function resetPrevUser() {
                if (indexOfClickedUser >= 1) {
                    $('.modal-container').remove();
                    appendModalWindow(prevUser);
                    indexOfClickedUser -= 1;
                    clickedUser = prevUser;
                    nextUser = allUsers[indexOfClickedUser + 1];
                    prevUser = allUsers[indexOfClickedUser - 1];
                    closeModalWindow();
                } else {
                    alert("You have reached the beginning of the directory");
                }
            }

            //click event handler inside a function, used to close modal window when you click the 'X' button
            function closeModalWindow() {
                $('.modal-close-btn').on('click', function() {
                    $('.modal-container').remove();
                });
            }

        })

    }

    addSearchBar();
    //adds functional search bar/button
    function addSearchBar() {
        const newSearchBar = `
            <form action="#" method="get">
                <input type="search" id="search-input" class="search-input" placeholder="Search...">
                <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
            </form>
        `;
        $('.search-container').append(newSearchBar);

        // $('#search-submit').on('click', function(event) {
        //     event.preventDefault();
        //     for (let i = 0; i < $('.card').length; i += 1) {
        //         if (($('.card')[i].children[1].children[0].innerHTML).includes($('#search-input').val().toLowerCase())) {
        //             $('.card')[i].style.display = '';
        //         } else {
        //             $('.card')[i].style.display = 'none';
        //         }
        //     }
        // });

        //dynamic search listener. automatically provides search results after every keypress
        $('#search-input').on('keyup', function() {
            const searchList = [];
            for (let i = 0; i < $('.card').length; i += 1) {
                if (($('.card')[i].children[1].children[0].innerHTML).includes($('#search-input').val().toLowerCase())) {
                    $('.card')[i].style.display = '';
                    searchList.push($('.card')[i]);
                } else {
                    $('.card')[i].style.display = 'none';
                }
            }
        });

    }

}