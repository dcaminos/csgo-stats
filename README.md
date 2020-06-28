# Welcome to CS:GO server stats :wave:
**Check out our [web site](https://csgo-stats-457a9.web.app)!!**

This is a simple project to render counter strike global offensive stats from our server. To do that, I did 3 differents sub projects:

## Script
Parse server logs and upload the data to my firebase realtime database. I added some log samples on /data folder.

**Example**
```bash
cd script
yarn install
node script.js ../data/
```

## Functions
This folder contain a firebase cloud function. You need configure a firebase project to deploy it. Only one function is needed to read all data and create the ranking list.

**Example**
```bash
firebase deploy --only functions
```

## Web
React application to render ranking, matches and a balancer to create teams based on the current ranking. This application use redux to store the current state.

**To run**
```bash
cd web
yarn install
yarn start
```

**To deploy**
```bash
cd web
yarn build
cd ..
firebase deploy --only hosting
```
