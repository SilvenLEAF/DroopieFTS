# DroopieFTS
FTS for Dropbox!!! Search across all files in your account based on the inner content super fast! 

***
***


## TOP FEATURES
###### Main Features
- [x] **FTS Search**
- [x] **File extraction**
- [x] **oauth 2.0. (Dropbox)**
- [x] **Account Sync**
- [x] **Test automation**
- [x] **DB automation**

###### Tech Stack Used
- [x] **TypeScript**
- [x] **NodeJS**
- [x] **ExpressJS**
- [x] **PostgreSQL**
- [x] **SQL**
- [x] Jest
- [x] Dropbox SDK
- [x] React
- [x] Materialize

###### IMPORTANT NOTES
- [x] **For PRD document go HERE <a href="https://github.com/SilvenLEAF/DroopieFTS/blob/master/docs/PRD.docx">/docs/PRD.docx</a>**
- [x] **For API documentaion go HERE <a href="https://github.com/SilvenLEAF/DroopieFTS/blob/master/docs/docs.html">/docs/docs.html</a>**

***
***



## Technologies
**BackEND:**  *TypeScript, NodeJS, ExpressJS, REST Api, Dropbox SDK*

**FrontEND:** *TypeScript, React, SASS, Materialize*

**Database:** *PostgreSQL (with sequelize and SQL queries)*

**Others:** *jest, supertest, ajv, git, bash scripting, CLI*
* **


## How to install on your PC?

##### prerequisites
- [x] NodeJS installed on your PC
- [x] Internet connection on your PC

First make sure you have NodeJS installed on your PC and your PC has internet connection (*because we are using Dropbox SDK to connect to Dropbox and make interactions, so you need internet connection to do that*). Then clone the repo. Open it on your favourite Text Editor (mine is VS Code). Then, run this command on your terminal to install all the dependencies...
  
```npm install```

Now create a **".env"** file and setting up the following env variables
```
PORT=5500

MY_APP_KEY = YOUR_APP_KEY
MY_APP_SECRET = YOUR_APP_SECRET
MY_REDIRECT_URI = YOUR_REDIRECT_URI


DB_USER = YOUR_USERNAME
DB_PASSWORD = YOUR_PASSWORD
DB_HOST_ADDRESS = 127.0.0.1:5432
DB_HOST_NAME = localhost
DB_NAME = droopi
```
Then run this command...

```npm start``` or ```ts-node app.ts```

It will start your local server. Wait until you see these logged on your terminal

``
  Server is running on port 5500
``


Now open your favorite browser (mine is Chrome) and then go to **localhost:5500**. You will see the App runnig live on your PC. Now enjoy playing with the codebase!

***All the BEST!!!***
***

## Gallery

<img src="/ReadmeImages/01Landing.png" />
<img src="/ReadmeImages/02Sync.png" />
<img src="/ReadmeImages/03Filters.png" />
<img src="/ReadmeImages/04List.png" />

***