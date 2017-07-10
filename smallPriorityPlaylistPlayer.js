require('../lib/constants.js');

module.exports = {
	tags : ['basicElementsNEW', 'HTML5TestNEW', 'smallPriorityPlaylist', 'FRIDAY1'],
	//this action is taken before all of the tests defined on the page
	before : function(client) {	
		myUrl = 'http://www.usatoday.com/story/news/world/2015/03/26/germanwings-plane-crash/70473800/';
		process.argv.forEach(function (val, index, array) {
			if (val == "--myUrl") {
  				myUrl = process.argv[index + 1];
  			}
		});
		client.resizeWindow(CONSTANTS.BROWSER_WIDTH, CONSTANTS.BROWSER_HEIGHT)		
		plutoPlayer = client.page.plutoTestPage(); // Global variable 'plutoPlayer'	
		//myData = client.globals;
    },
   'testing small priority playlist' : function(client) {
   		//myUrl = 'http://gci-acocci1-m:8080/story/sports/high-school/all-shore/2016/06/13/stars-shine-jersey-shore-sports-awards/85823318/';
    	myPlayer = plutoPlayer.section.small_playlist;
    	//this is the call to the function on the plutoTestPage.js page
    	myPlayer.checkSmallPlaylist(client, plutoPlayer, 522, myUrl, myPlayer, true, 'small');
	},  
    after : function(client) {
		client.end();
	}
};    
