# Note-Taker


This is a web app to save notes on a MySQL server. Includes functionality to write, update, and delete notes. Utilizes ```MySQL```,```Express```,```Handlebars```, and ```dotenv``` modules. Site is deployed on ```Heroku```.

\n\n
![Screenshot](/public/assets/images/screenshot.png "Screenshot")

[Click here to try out the app](https://infinite-eyrie-19353.herokuapp.com/)

### Write

Start by typing a title and text for your note and click 'save' to store it on the MySQL database. On click, the client will send a ```POST``` request to the server to add a record to the ```notes``` table, and reload the page to get an updated list of all the existing records.

### Delete

Hover over any note on the left side to reveal the red 'X'. On click, the client will send a ```DELETE``` request to the server to remove the note from the MySQL table permanently, and refresh the page to see the updated list of notes.

### Update

Click on any note on the left side to load the the text into the existing input fields so the user can edit the content and click 'update' to re-save it. On click, the client will send a ```PUT``` request to the server to find the record by 'id' and update the record on MySQL, and reload the page to show the updated list of notes.