require('../lib/constants.js');

module.exports = {
	tags : ['basicElementsNEW', 'HTML5TestNEW', 'largeAssetPlaylist', 'FRIDAY1'],
	//this action is taken before all of the tests defined on the page
	before : function(client) {	
		myUrl = 'http://www.usatoday.com/story/news/world/2015/01/21/pope-praises-big-families/22098255/';
		process.argv.forEach(function (val, index, array) {
			if (val == "--myUrl") {
  				myUrl = process.argv[index + 1];
  			}
		});
		client.resizeWindow(CONSTANTS.BROWSER_WIDTH, CONSTANTS.BROWSER_HEIGHT)		
		plutoPlayer = client.page.plutoTestPage(); // Global variable 'plutoPlayer'	
		//myData = client.globals;
    },
   'testing large playlist' : function(client) {
   		//myUrl = 'http://gci-acocci1-m:8080/videos/sports/mlb/diamondbacks/2016/06/15/watch-the-latest-videos-from-the-diamondbacks-and-the-mlb/82489840/'
    	myPlayer = plutoPlayer.section.small_playlist;
    	//this is the call to the function on the plutoTestPage.js page
    	myPlayer.checkSmallPlaylist(client, plutoPlayer, 880, myUrl, myPlayer, true, 'largeAsset');
	},  
    after : function(client) {
		client.end();
	}
};    
