# Public_API_Requests
 
Built an app for a fictional company called 'Awesome Startup', a distributed company with remote employees working all over the world that needed a smart and convenient way for those employees to share contact information with each other.

Using the Random User Generator API (https://randomuser.me/) to grab information fo 12 randomly generated 'employees,' we build a prototype for an 'Awesome Startup' employee directory.

This is done by requesting a JSON object from the API and parsing the data so that the 12 employees are listed in a grid with their thumbnail image, full name, email, and location. Clicking the employee's image or name will open a modal window with more detailed information, such as the employee's birthday and address.

Changed the background color of the body to a skyblue-gray blend.

Added dynamic search results, meaning that the results update as you type in real-time.

User is able to toggle between modal windows with the 'previous' and 'next' buttons provided. Once the beginning or the end of the directory is reached, an alert will pop up to inform the user.