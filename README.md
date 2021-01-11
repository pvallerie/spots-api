# Spots (api)
Spots is an app designed to remember where you've been and where you'd like to go. A user can create an account, create Spots, and designate whether they've seen that Spot or not. The user can then toggle between displays of All their Spots, the Spots they've Seen, and the Spots they have yet to see (Unseen). Of course the user can also edit these Spots once they've been created and delete them if they like.

#### Relevant links:
[Deployed Client](https://pvallerie.github.io/spots-client/)
[Deployed API](https://polar-savannah-31336.herokuapp.com)
[Client Repository](https://github.com/pvallerie/spots-client)

#### Technologies used:

- Javascript
- cURL
- Grunt
- Chrome DevTools
- Node.js
- Nodemon
- MongoDB
- Mongoose
- Express
- Passport (passport-http-bearer)
- Crypto
- Bcrypt
- CORS


#### The future of Spots:
- Search: a future version of Spots will have a search bar so the user can search for a Spot by name
- Edit Spot: though users can currently edit Spots, a future version will have a better UX for doing so. When the user clicks the 'edit' button on the Spot they want to edit, a form will appear in a modal witht the current Spot data pre-populated into the form which the user can then change and click submit. This will be much more user friendly than the user needing to find the Spot they want to edit, then copy the Spot ID from the display, click the 'edit' button, paste the Spot ID into the form, and add all the edits they wish to make before submitting.
- Delete Spot: though users can currently delete spots, a future version will have a better UX for doing so. When the user clicks the 'delete' button on the Spot they want to delete, the API will be called to delete the Spot from the database. The currently workflow requires the user to find the Spot they want to delete, copy the Spot ID from the display, click the 'delete' button, and paste the Spot ID into the delete form before submitting
- Show all spots (universal): show all spots created by any user
    - maybe include option for public/private when creating/updating Spots

#### Planning:
The planning for this project began with the review of all project materials provided by General Assembly (most importantly the list of requriements). Once I had a firm understanding of the requirements for the project, I started brainstorming high level ideas for apps that would meet those requirements and would not lead to scope/feature creep, especially since we had a limited amount of time to complete the project.
I eventually landed on the idea for a simple app that would have users and a resource called a 'Spot'. Since it is helpful to keep track of places you've been to and places you'd like to visit, I decided to include a feature to declare whether the Spot has been Seen or remains Unseen. Then the user will be able to toggle between tabs for All Spots, Seen Spots, and Unseen Spots.
Next I created the user stories necessary to create a foundation of features to develop and a wireframe to set the foundation for what the app would look like.
Finally, I created one repo for the API and one for the Client, cloned the GA templates for each, set up my MongoDB database, set up Heroku to host my API, linked everything up, and got to work starting with building the API.

#### ERD:
![Spots ERD](https://i.imgur.com/jOtUqTG.jpg?1 "Spots ERD")

#### jQuery References Problem Solving:
One interesting problem I ran into while programming the frontend of Spots ended up being a pretty useful learning opportunity for some fellow classmates and me. When appending HTML into the DOM to display a user's Spots, I wanted to have the 'edit' spot and 'delete' spot buttons render with the Spot display itself.
I was able to get the buttons to render properly, but when I tried firing a jQuery handler to show the 'edit' and 'delete' forms to display, nothing would happen.
- Was it an issue with the classes I was using to reference these buttons in the jQuery? Nope. I tried changing the reference to an ID for a specific Spot using Google DevTools, but the event handler would still not fire.
- Was I not properly using jQuery's `.append()` method? Nope. After reading over the method's documentation on w3schools.com, it appeared I had set it up correctly.
- Was there an answer on Google for why my appended buttons were not working? I did some deep digging through Stack Overflow, but only found responses to issues where buttons that existed in the source code stopped working after new HTML was appended (not for buttons that were appended into the HTML on the DOM).
- Was there something funky going on with what jQuery from my source code could reference when it comes to appended HTML? Turns out yes! I eventually put in a ticket to be reviewed by our teachers and got a response to check out this [Stack Overflow post](https://stackoverflow.com/questions/8110934/direct-vs-delegated-jquery-on) about the difference between direct and delegated event handlers when using the .on() method. Turned out that because these buttons were not part of the source code where the jQuery was hosted, I could not reference these buttons directly, but rather I had to reference their parent (which existed int he source HTML) and pass the .on() function the button to listen to as a parameter.
This was a pretty big aha moment for me, since it seems to me that elements appended into the DOM HTML of an application will very frequently be intereacted with, so knowing how to do so will be huge in the future. It was also an opportunity for me to teach some fellow classmates that were running into a similar issue later on!
