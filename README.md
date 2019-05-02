# Boola Bulletin

Bulletin boards are public displays that allow people to hang posters or flyers in order to advertise announcements, events, and various opportunities open to members of a community (e.g. schools, businesses, and other organizations). From Bulletin Board Systems that predated the Internet to social media platforms available today, numerous applications have tried to capture the essence of bulletin boards in a digital equivalent. Yet, none of these have been sufficient to replace them, offering platforms with some of the aesthetic and functional features of bulletin boards, but lacking the practicality and natural ease of use. This project aims to answer for these shortcomings by building a new application that offers a better online version of bulletin boards. Boola Bulletin is a web application that allows users to post flyers and informational material and to view this information without the clutter and inefficiency of physical boards and their social media descendants. Attention is paid to displaying this information in a manner that is simple and intuitive. The goal is to make information regarding real-world events and opportunities as accessible as possible to the people who can take advantage of them.

It is also the goal of this project to gain experience with industry-standard web development technologies and practices. These include HTML, CSS, JS, React, and Amazon Web Services products, such as Lambda, API Gateway, CloudWatch, CloudFront, and Route53. I follow an agile development cycle and proceed through the steps of launching the application to the public and deploying new features.

## Files
A description of the files contained in this project.

### React App Base
App.js - Definition of base React component, as well as theme overrides  
App.css - WebKit global override to modify scrollbar appearance  
index.js, index.css - Boilerplate, font installation  

### User Interface Features
navbar.js - The navigation bar at the top of the screen  
explore.js - The main grid of flyers  
flyer.js - Each flyer in the Explore Grid  
modal.js - The dialogue that appears when a flyer is clicked  
dialogTitle.js - Customized title on the dialogue  
upload.js - The dialogue form for uploading a new flyer  
petition.js - The full-screen modal containing text, followed by a form  
affiliationSelector.js - A selector component in the petition form  

### Lambda Functions
aws/lambda/getFlyers/index.js - GETs flyers  
aws/lambda/uploadFlyers/index.js - POSTs a flyer  
aws/lambda/signPetition/index.js - POSTs petition data  
