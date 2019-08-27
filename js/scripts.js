//requests data from random user api
fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => generateUsers(data.results))
    //.then(users => console.log(JSON.stringify(users)))
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

    //click event handler for all employee 'cards' on the page
    $('.card').on('click', function() {
        console.log($(this)[0].children[0].childNodes[1].attributes[1].nodeValue);

        //assigns the image url of the clicked employee 'card' to a constant named 'clickedUserSRC'
        const clickedUserSRC = $(this)[0].children[0].childNodes[1].attributes[1].nodeValue;
        //initializes variable 'clickedUser' which is null, but will store the clicked user object
        let clickedUser = null;

        //iterates through user directory checking for a user with matching image url as 'clickedUserSRC'
        //it then stores that matched user to variable 'clickedUser'
        allUsers.forEach(user => {
            if (clickedUserSRC === user.picture.medium) {
                //console.log('yes!')
                clickedUser = user;
                console.log(clickedUser);
            } else {
                //console.log('no!')
            }
        })

        //converts user birthday for mm/dd/yyyy format
        let clickedUserDOB = '';
        getBirthday(clickedUser);

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
                        <p class="modal-text" id="modal-location">${clickedUser.location.street}, ${clickedUser.location.city.charAt(0).toUpperCase() + clickedUser.location.city.slice(1)}, ${clickedUser.location.state.charAt(0).toUpperCase() + clickedUser.location.state.slice(1)} ${clickedUser.location.postcode}</p>
                        <p class="modal-text">Birthday: ${clickedUserDOB}</p>
                    </div>
                </div>
            </div>
        `;

        //$('.modal-location').css('text-transform', 'capitalize');
        $('body').append(clickedUserWindow);

        //click event handler to close modal window when you click the 'X' button
        $('.modal-close-btn').on('click', function() {
            $('.modal-container').remove();
        });

    })
}