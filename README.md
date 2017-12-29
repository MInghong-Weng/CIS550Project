# FootBall Camp
<a href="ec2-34-239-126-102.compute-1.amazonaws.com:3000" target="_blank">APP DEMO</a>

The whole APP is built based on MEAN Stack. 

For the client side, the AngularJS is used to make requests, display data and rendering pages. The ChartJS and Angular-ChartJS are deployed to display statistics in more intuitive ways. And the Bootstrap library and templates are deployed to build responsive and beautiful pages.For the back end, the NodeJS is used to handle requests from both client and server side. ExpressJS is used to make requests data from the database. Mongoose ORM is deployed for convenient use of MongoDB. And the Mysql Node package is used for building the connection to RDS and making query requests. The web app integrated Facebook Login API with PassportJS and Twitter Button to realize social networking features.The MongoDB in Mlab is used to manage user data for its high scalability and availability. And it is easy to change the schema and do write and read functions. the MySQL database on RDS is used to hold all the player and team data. 

## Features

Twitter Feeds: Home page displays two twitter Hashtag search widget showing streaming data with hashtag Premier League and UEFA Champions League.

![](readmeImage/picture1.png)Search Players: Allow users to search all players in FIFA18 DataBase according to certain conditions: Nationality, Age,  Current Club, Overall in-game ability. Each field can be selected to one value or left blank. Player search results including players’ photo, club, nationality, preferred position on field and overall ability.Users can also add a player to their personal dream football team at the player search result page.

![](readmeImage/picture2.png)

Search Team: Present 34 teams in the EPL with their latest 10 matches records and team attributes.

![](readmeImage/picture3.png)

Team Profile: Display detailed team information and attributes in a spreadsheet with colored scores, and line chart of performance trend, the total goal in recent seasons. 

![](readmeImage/picture4.png)

Search Match: Filtered by Match, Round, Home Team and Away Team, present above information plus Date and Scores for both teams. The user can navigate to the Team detail page.

![](readmeImage/picture5.png)

Player Profile: Display detailed player information in spreadsheet and radar chart. The user can also share their player’s profile link to Twitter by Twitter Button.

![](readmeImage/picture6.png)

Followed Players: Displaying the list of user's followed players if the user is logged in. Otherwise, the link to the dashboard is hidden. Once a user is logged in, the web app would check whether he/she has registered. If not, the app would create a document to hold the user data with default values. The user can add their favorite players to their list or delete from the dashboard.Tactic board: Users can create their own team by choosing positions for players.

Tactic board: Users can create their own team by choosing positions for players.

![](readmeImage/picture7.png)

##How To Run

1. Clone the repo to local
2. Open the project folder in terminal
3. Use command: npm install
4. Use command: node app

## Data Source

Database are populated in AWS mySQL and MLab MongoDB

European Soccer Database (sqlite):

- More than 25,000 matches
- More than 10,000 players
- 11 European Countries with their lead championship
- Seasons 2008 to 2016
- https://www.kaggle.com/aivxyz/aivxyz-european-soccer-database/data

FIFA 18 (Game) Complete Player Dataset (CSV):

- Every player featuring in FIFA 18
- 70+ attributes
- Player and Flag Images, Position, personal data like Nationality, Photo, Club, Age, Wage, Salary etc.
- https://www.kaggle.com/stahamtan/fifa-18-interactive-exploration/data