require('../lib/constants.js');

module.exports = {
	tags : ['basicElementsNEW', 'HTML5TestNEW', 'longform'],
	//this action is taken before all of the tests defined on the page
	before : function(client) {	
		myUrl = 'http://www.azcentral.com/story/news/2015/05/28/biolabs-pathogens-location-incidents/26587505/';
		process.argv.forEach(function (val, index, array) {
			if (val == "--myUrl") {
  				myUrl = process.argv[index + 1];
  			}
		});
		client.resizeWindow(CONSTANTS.BROWSER_WIDTH, CONSTANTS.BROWSER_HEIGHT)		
		plutoPlayer = client.page.plutoTestPage(); // Global variable 'plutoPlayer'	
    },
   'testing longform player' : function(client) {
    	myPlayer = plutoPlayer.section.basic_player;
    	//this is the call to the function on the plutoTestPage.js page
    	myPlayer.checkPlayer(client, plutoPlayer, 799, myUrl, false, true);
	},  
    after : function(client) {
		client.end();
	}
};    
