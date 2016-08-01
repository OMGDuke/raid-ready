# Raid Ready

### Description
Check if your WoW guild is ready to raid. Enter your server and guild name for a breakdown based on roles.

### Installation
- Clone this repo.
- Run `npm install`
- Add your Battle.net API key to ./app/js/services/GuildService.js line 5
- Run `npm start`
- Visit http://localhost:8080

### Tests
- Run `npm start`
- Run `npm run webdriver-manager start`
- To run Unit tests run `karma start test/karma.conf.js`
- To run Feature tests run `npm run protractor test/protractor.conf.js`

### Todo
- Add restful routing eg http://localhost:8080/serverName/guildName. Currently a page refresh or clicking a player to visit their profile causes result data to be lost.
- Add raid encounter specific breakdowns
- Move api calls to a backend  server to hide api key in requests.
- Update to 110 for Legion.
- Add a filter based on guild rank to ensure alts aren't included.
- Add ability to choose your region.
