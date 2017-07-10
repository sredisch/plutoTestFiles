require('../lib/constants.js');

module.exports = {
	tags : ['basicElementsNEW', 'HTML5TestNEW', 'inlinePlaylist', 'current'],
	//this action is taken before all of the tests defined on the page
	before : function(client) {	
		myUrl = 'http://www.usatoday.com/story/news/nation/2015/02/10/brian-williams-claim-questioned-new-jersey-robbery/23161755/';
		process.argv.forEach(function (val, index, array) {
			if (val == "--myUrl") {
  				myUrl = process.argv[index + 1];
  			}
		});
		client.resizeWindow(CONSTANTS.BROWSER_WIDTH, CONSTANTS.BROWSER_HEIGHT)		
		plutoPlayer = client.page.plutoTestPage(); // Global variable 'plutoPlayer'	
		//myData = client.globals;
    },
   'testing inline playlist' : function(client) {
    	myPlayer = plutoPlayer.section.small_playlist;
    	//this is the call to the function on the plutoTestPage.js page
    	myPlayer.checkSmallPlaylist(client, plutoPlayer, 522, myUrl, myPlayer, false, 'small');
	},  
    after : function(client) {
		client.end();
	}
};    
