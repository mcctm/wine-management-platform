# Winery App
Created by Ashley Yuan, Emily Andrews, Miranda Chan

## Setup

Clone the repo and run npm i inside the client folder 

Also run npm i inside the server folder. 

Run npm i nodemon to install nodemon (for running server) 

If you have not set up postgres locally, you can follow instructions to set up posgres here:  https://www.youtube.com/watch?v=fZQI7nBu32M

During postgres set up set username and password to:   
user: "postgres"
password: "postgres"

Once dependencies are installed and postgres is installed run npm start inside of the client folder to start client. 

Inside of server folder run nodemon to start server.

## Description

The domain of the application is wine production. We will be storing information related to wine production in a winery.

The aspects of wine production that are modeled by our database ranges from growing the grapes, fermenting it into wine and storing the batches of wine into wood barrels and, ultimately, into bottles.

There are two types of winery employees: Viticulturist (grape grower) and Winemakers. Viticulturists will be responsible for growing the grapes, whereas winemakers are in charge of processing the grapes and producing the batches and bottles of wine. During the wine making process, wood barrels are supplied and used for storing the batches of wine, in addition to the yeast required for grape fermentation. These are all aspects of wine production that will be modeled by our database.
