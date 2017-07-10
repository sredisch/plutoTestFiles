require('../lib/constants.js');

module.exports = {
	tags : ['basicElementsNEW', 'HTML5TestNEW', 'carousel', 'FRIDAY1'],
	//this action is taken before all of the tests defined on the page
	before : function(client) {
		myUrl = 'http://www.usatoday.com/';
		process.argv.forEach(function (val, index, array) {
			if (val == "--myUrl") {
  				myUrl = process.argv[index + 1];
  			}
		});	
		client.resizeWindow(CONSTANTS.BROWSER_WIDTH, CONSTANTS.BROWSER_HEIGHT)		
		plutoPlayer = client.page.plutoTestPage(); // Global variable 'plutoPlayer'	
    },
   'testing carousel player' : function(client) {
   		//myUrl = 'http://gci-acocci1-m:8080/';
    	myPlayer = plutoPlayer.section.carousel_player;
    	//this is the call to the function on the plutoTestPage.js page
    	myPlayer.checkCarousel(client, plutoPlayer, 450, myUrl, myPlayer, false);
	},  
    after : function(client) {
		client.end();
	}
};    
