require('../lib/constants.js');

module.exports = {
	tags : ['basicElementsNEW', 'HTML5TestNEW', 'smallArticle', 'friday'],
	//this action is taken before all of the tests defined on the page
	before : function(client) {	
		myUrl = 'http://www.usatoday.com/story/sports/nfl/2016/04/01/draft-impact-colin-kaepernick-sam-bradford-49ers-broncos-eagles-titans/82486130/';
		process.argv.forEach(function (val, index, array) {
			if (val == "--myUrl") {
  				myUrl = process.argv[index + 1];
  			}
		});
		client.resizeWindow(CONSTANTS.BROWSER_WIDTH, CONSTANTS.BROWSER_HEIGHT)		
		plutoPlayer = client.page.plutoTestPage(); // Global variable 'plutoPlayer'	
    },
   'testing small priority player' : function(client) {
    	myPlayer = plutoPlayer.section.basic_player;
    	//this is the call to the function on the plutoTestPage.js page
    	myPlayer.checkPlayer(client, plutoPlayer, 540, myUrl, true, true, 'small');
	},  
    after : function(client) {
		client.end();
	}
};    
