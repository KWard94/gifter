# Gifter - The Gift Suggestion App

## GA-SEI-Project-4

#### Developed By: Keenan Ward

## Welcome

Welcome to **Gifter**! Have you ever caught yourself thinking "Oh, shoot! It is Bobby-Joe's birthday this week and I have nothing to give them, I don't even know what to shop for!" Well this app is created just for you. This is a web-based full stack app which allows a user to access personalized gift suggestions based on selected personality attributes. The attributes and gifts are served from a proprietary API. Users can suggest gifts to add to the site, as well as follow links to purchase the gifts if they so choose. Gift suggestions may be edited and deleted at will.

## About

The client-side of **Gifter** was written in Javascript via React.js, in addition to the styling written with React-Boostrap and CSS. The server-side of **Gifter** was informed by the MongoDB, using Express and Mongoose. Dependencies for the full stack were handles by npm.

You can view the **Gifter** [HERE](https://gifter-v2.herokuapp.com/)!
the **Gifter** server is found [Here](https://gifter-backend-api.herokuapp.com/).

## Deployment

**Gifter** Was deployed through [Heroku](https://www.heroku.com/) for both the frontend and the backend.

## Screenshots of the Live App

## Interaction

When the user lands on the **Gifter** homepage they will see a form in which they can input the name of the person that they are shopping for. They will also see a list of attributes that are rendered dynamically from the API. The user can select an attribute which will populate a list of gifts that match that attribute. Each of the listed gifts will have a link to a detailed view of that gift.

Each detailed view will have the name of the gift, the price, a description, an image, and a link to where the gift can be purchased. If a user would like to suggest a gift that they would like to see on the site in the future, they may do so in the suggestion page. the suggested gifts will have an option to see the same detailed information for each suggestion if it has been provided. Suggestions may be edited and deleted by the user, while the gifts that have been accepted by the site and display on the homepage cannot.

### Database Models

#### Attribute Model

![image](https://media.git.generalassemb.ly/user/32807/files/6d61b780-7c3a-11eb-953a-da682ec49a9f)

#### Gift Model/Suggestion Model

![image](https://media.git.generalassemb.ly/user/32807/files/a437cd80-7c3a-11eb-943c-3454c52ebb50)

### Concept Wireframes

![image](https://media.git.generalassemb.ly/user/32807/files/10924b80-7601-11eb-9391-0d382194ac58)
![image](https://media.git.generalassemb.ly/user/32807/files/bfd02200-7603-11eb-8e7a-3bfdeb943d46)

### Initial Component Hierarchy

![image](https://media.git.generalassemb.ly/user/32807/files/4d147600-7606-11eb-933b-5bdf024d293e)

## User Stories

### MVP

- [x] As a user I would like to select attributes from the list and have the app suggest a gift

- [x] As a user I would like to be able to see the attributes displayed dynamically when I ask for a gift suggestion

- [x] As a user I would like to have the suggested gifts layed out in an organized fashion

- [x] As a user I would like to be able to see a list of all of the gifts so I can browse

- [x] As a user I would like to have links to online purchases for the gifts for my ease of use

### Stretch Goals

- [x] As a user I would like to add my own gift ideas to the database in order to help grow the options

- [ ] As a user I would like to be able to log in to store a list of the gifts I have viewed

- [ ] As a user I would like to be able to export the list of saved gifts to a pdf in order to do my shopping in person

- [ ] As a user I would like this app to be responsive to smaller screens so I can use it on the go
