require('../lib/constants.js');

module.exports = {
	tags : ['basicElementsNEW', 'HTML5TestNEW', 'embed', 'friday'],
	//this action is taken before all of the tests defined on the page
	before : function(client) {	
		myUrl = 'http://www.usatoday.com/videos/embed/82488758/?fullsite=true';
		process.argv.forEach(function (val, index, array) {
			if (val == "--myUrl") {
  				myUrl = process.argv[index + 1];
  			}
		});
		client.resizeWindow(CONSTANTS.BROWSER_WIDTH, CONSTANTS.BROWSER_HEIGHT)		
		plutoPlayer = client.page.plutoTestPage(); // Global variable 'plutoPlayer'	
    },
	 'testing embed player' : function(client) {
    	myPlayer = plutoPlayer.section.basic_player;
    	//this is the call to the function on the plutoTestPage.js page
    	myPlayer.checkPlayer(client, plutoPlayer, 540, myUrl, false, false);
	},	
	
    after : function(client) {
		client.end();
	}
};    
