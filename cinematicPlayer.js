require('../lib/constants.js');

module.exports = {
	tags : ['basicElementsNEW', 'HTML5TestNEW', 'cinematic'],
	//this action is taken before all of the tests defined on the page
	before : function(client) {	
		myUrl = 'http://www.azcentral.com/media/cinematic/video/82452668/first-alarm-fire-scorches-house-on-phoenixscottsdale-border/';
		process.argv.forEach(function (val, index, array) {
			if (val == "--myUrl") {
  				myUrl = process.argv[index + 1];
  			}
		});
		client.resizeWindow(CONSTANTS.BROWSER_WIDTH, CONSTANTS.BROWSER_HEIGHT)		
		plutoPlayer = client.page.plutoTestPage(); // Global variable 'plutoPlayer'	
    },
   'testing cinematic player' : function(client) {
    	myPlayer = plutoPlayer.section.basic_player;
    	//this is the call to the function on the plutoTestPage.js page
    	myPlayer.checkPlayer(client, plutoPlayer, 800, myUrl, true, true);
	},  
    after : function(client) {
		client.end();
	}
};    
