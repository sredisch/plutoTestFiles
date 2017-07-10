require('../lib/constants.js');

module.exports = {
	tags : ['basicElementsNEW', 'HTML5TestNEW', 'videoAsset'],
	//this action is taken before all of the tests defined on the page
	before : function(client) {	
		myUrl = 'http://www.azcentral.com/videos/news/local/phoenix/2016/03/31/82469856/';
		process.argv.forEach(function (val, index, array) {
			if (val == "--myUrl") {
  				myUrl = process.argv[index + 1];
  			}
		});
		client.resizeWindow(CONSTANTS.BROWSER_WIDTH, CONSTANTS.BROWSER_HEIGHT)		
		plutoPlayer = client.page.plutoTestPage(); // Global variable 'plutoPlayer'	
    },
   'testing video asset player' : function(client) {
    	myPlayer = plutoPlayer.section.basic_player;
    	//this is the call to the function on the plutoTestPage.js page
    	myPlayer.checkPlayer(client, plutoPlayer, 880, myUrl, true, true);
	},  
    after : function(client) {
		client.end();
	}
};    
