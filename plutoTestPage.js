require('../lib/constants.js');

var getElement = {
	checkElement: function(elementSelector, pos) {
		var element = this;
		this.waitForElementVisible(elementSelector, CONSTANTS.TIMEOUT)
	//return this;
	}
};

var getElementPresent = {
	checkElementPresent: function(elementSelector, pos) {
		var element = this;
		this.waitForElementPresent(elementSelector, CONSTANTS.TIMEOUT)
	//return this;
	}
};

var getElementText = {
	checkElementText: function(elementSelector, textToCompare) {
        var element = this;
		this.waitForElementVisible(elementSelector, CONSTANTS.TIMEOUT, function() {
            element.assert.containsText(elementSelector, textToCompare)
        })
	//return this;
	}
};

var getResult = {
	checkResult: function(elementSelector) {
		var element = this;
		this.waitForElementVisible(elementSelector, CONSTANTS.TIMEOUT, function() {
			element.getText(elementSelector, function(result) {
				console.log(result.value);
			})
		})
	return this;
	}
};

var compareData = {
	compareData: function(elementSelector, position, textToCompare) {
		positionOfState = this.position;
		this.waitForElementVisible(elementSelector, CONSTANTS.TIMEOUT)
		this.assert.containsText(elementSelector, textToCompare)
		this.getText(elementSelector, function(result) {
			console.log(result.value);
		})
	return this;
	}
};

var checkPlayer = {
	checkPlayer: function(client, myPage, myWidth, myUrl, priority, continuous) {
		myPlayer = this;
		myPage.navigate(myUrl);
		if (!priority) {
			//pause stops action for the number of milliseconds
			client.pause(2000, function(result) {
				myPlayer.click('@center_aligned_play_button');
				client.pause(2000);
			})
		}
    	//wait for the right time to determine if the player is playing an ad or a video
    	client.pause(15000);
    	//the elements function can find nothing and not send any error message, if needed
    	//client function calls cannot access the myPlayer object elements 
    	client.elements('css selector', '.vjs-ad-playing',function(result) {
    		done = false;
    		//result.value is the actual data you want from 'elements'
    		result.value.forEach(function(resultA) {
    			if (!done) {
    				//move toward the player image to make the control bar appear,
    				//like moving the mouse over the player.
        			client.moveToElement('.vjs-tech',0,0, function(result2) {
   						myPlayer.checkElement('@ad_message');
    					client.getText('.pluto-ad-msg', function(result3) {
    						this.assert.equal(typeof result3, 'object');
    						console.log(result3.value);
    						if (typeof result3 == 'object') {
    							this.assert.equal(result3.value.split(" ")[0].substring(0,3), 'You');
    						}
    					})
    					client.moveToElement('.video-desc',0,0);
    				})
    				//moving the cursor to the element makes the ad control bar appear.
    				//you can't click on the screen to make the bar appear.
    				//the ad would redirect the page in that case
    				client.moveToElement('.vjs-tech',0,0, function(result2) {
    					myPlayer.checkElement('@current_button_when_playing');
    					//move away from the ad screen so that the control bar
    					//will appear when you move back toward it
    					client.moveToElement('.video-desc',0,0);
    				})
   				 	client.moveToElement('.vjs-tech',0,0, function(result2) {
    					//myPlayer.checkElement('@volume_button_during_ad');
    					client.moveToElement('.video-desc',0,0);
    				})
    				client.moveToElement('.vjs-tech',0,0, function(result2) {
    					myPlayer.checkElement('@timer_display_during_ad');
    					client.moveToElement('.video-desc',0,0);
    				})
    				client.moveToElement('.vjs-tech',0,0, function(result2) {
    					myPlayer.checkElement('@duration_display_during_ad');
    					client.moveToElement('.video-desc',0,0);
    				})
    				client.moveToElement('.vjs-tech',0,0, function(result2) {
    					myPlayer.checkElement('@fullscreen_control_button_during_ad');
    					done = true;
    				})
    			}
    		})
    	})
		client.moveToElement('.vjs-tech',0,0);
		/*client.elements('css selector', '.vjs-ad-playing',function(result) {
			done1 = false
			result.value.forEach(function(resultA) {
    			if (!done1) { 
    				time1 = "";
    				time2 = "";
    				time3 = "";
					myPlayer.getText('@timer_display_during_ad', function(result2) {
						console.log("my result = " + result2.value);			
						time1 = result2.value;
					})
					myPlayer.getText('@duration_display_during_ad', function(result3) {				
						console.log("my result = " + result3.value);				
						time2 = result3.value;
					})
					dummy = client.url( function(result3) {
						done1 = true;
						length1 = time1.length;
						length2 = time2.lengtht
						time1 = "" + time1.charAt(length1 - 2) + time1.charAt(length1 - 1);
						time2 = "" + time2.charAt(length2 - 2) + time2.charAt(length2 - 1);
						time1 = parseInt(time1, 10);
						time2 = parseInt(time2, 10);
						//time3 = ((time2 - time1) * 1000);
						console.log(time3);
						//the logic is that if there are more than 15 seconds duration in the preroll,
						//the skip ad button will after the 15 second mark
						if (time2 > 15000) {
							time4 = 16000 - time1;
							client.pause(time4);
							myPlayer.click('@skip_ad_button');
							console.log("clicked the skip ad button.");
						}
						//if the 15 second mark has already passed, the program searches for the
						//skip ad button ad clicks it, if it is present
						else {
							done2 = false;
							//the 'elements' method checks for an element without sending an error
							// if none are found. client calls cannot access the myPlayer elements
							client.elements('css selector', '.pluto-skip-ad-button', function(resultB) {							
								resultB.value.forEach(function(resultC) {
									if (!done2) {
										myPlayer.click('@skip_ad_button', function(resultD) { 
											done2 = true;
										})
									}
								})
							})
							//if there is no skip ad button, then just wait for the rest of the ad
							if (!done2) {
								dummy = client.url( function(resultE) {
									client.pause(time3);
								})
							}
						}	
					})			
				}	
			})
		})*/
		client.pause(22000);
		//make sure video is playing
		myPlayer.checkElement('@video_is_playing');
		//clicking the player makes the control bar appear. it also switches pause/play
		//so I click it twice to make sure the pause/play state goes back to the original
		//state
		myPlayer.click('@container');
		//client.pause(100);
		myPlayer.click('@container');
		myPlayer.checkElement('@timer_display');
		myPlayer.click('@container');
		//client.pause(100);
		myPlayer.click('@container');
		myPlayer.click('@volume_button');
		myPlayer.checkElement('.vjs-volume-menu-button.vjs-vol-0');
		myPlayer.click('@volume_button');
		client.waitForElementNotPresent('.vjs-volume-menu-button.vjs-vol-0', 500);
		myPlayer.click('@container');
		//client.pause(100);
		myPlayer.click('@container');
    	myPlayer.checkElement('@duration_display');
    	myPlayer.click('@container');
		//client.pause(100);
		myPlayer.click('@container');	
		myPlayer.checkElement('@current_button_when_playing');
		myPlayer.click('@container');
		//client.pause(100);
		myPlayer.click('@container');
		myPlayer.click('@play_paused_button');
		myPlayer.click('@container');
		//client.pause(100);
		myPlayer.click('@container');
		myPlayer.checkElement('@current_button_when_paused');
		myPlayer.click('@container');
		//client.pause(100);
		myPlayer.click('@container', function(result1) {
			time1 = "";
			myPlayer.getText('@timer_display', function(result) {
				console.log(result.value);
				time1 = result.value;
			})
		client.pause(1001);
			time2 = "";
			myPlayer.getText('@timer_display', function(result) {
				console.log(result.value);
				time2 = result.value;
				client.assert.equal(time1, time2, "check no time passed during pause - timer1 = timer2");
			})
		})			
		myPlayer.click('@play_paused_button');
		myPlayer.checkElement('@current_button_when_playing');
		myPlayer.click('@container');
		//client.pause(100);
		myPlayer.click('@container', function(result1) {
			myPlayer.getText('@timer_display', function(result) {
				console.log(result.value);
				time1 = result.value;
			})
			client.pause(1001);
			myPlayer.getText('@timer_display', function(result) {
				console.log(result.value);
				time2 = result.value;
				client.assert.notEqual(time1, time2, "check time passed while playing - timer1 != timer2");
			})
		})
		myPlayer.click('@container');
		//client.pause(100);
		//check the embed button 
		myPlayer.click('@container', function(result1) {
			myPlayer.click('@embed_button');
			myPlayer.checkElement('@embed_overlay_title');
			myPlayer.checkElement('@embed_overlay_video_link');
			myPlayer.checkElement('@embed_overlay');
			myPlayer.click('@overlay_exit_button');
			myPlayer.expect.element('@embed_overlay').to.not.be.visible;
		})
		myPlayer.click('@container');
		//client.pause(100);
		//check the share button
		myPlayer.click('@container', function(result1) {
			myPlayer.click('@share_button');
			myPlayer.checkElement('@share_overlay_title');
			myPlayer.checkElement('@share_overlay_video_link');
			myPlayer.checkElement('@share_overlay');
			myPlayer.checkElement('@share_facebook_link');
			myPlayer.checkElement('@share_twitter_link');
			myPlayer.checkElement('@share_google_plus_link');
			myPlayer.checkElement('@share_mail_link');
			myPlayer.click('@share_exit_button');
			myPlayer.expect.element('@share_overlay').to.not.be.visible;
		})
		if (continuous) {
			//if the player is expected to have continuous play (which is a boolean)
			//parameter in this function, then move to the end of the scrub bar
			//to avoid waiting for the entire video
			myPlayer.click('@container');
			//client.pause(100);
			myPlayer.click('@container', function(result1) {
				//first, move to 93% of the width, then wait until the video is 96% done
				// so the taboola call for the next video can take place
				usableWidth = parseInt(myWidth,10);
				firstJump = parseInt((usableWidth * (.93)), 10);
				client.moveToElement('.vjs-control-bar .vjs-progress-holder', firstJump, 1, function(result) {
					client.mouseButtonClick('left');
					client.pause(400);
					myPlayer.click('@current_button_when_paused');
					//myPlayer.click('@current_button_when_playing');
					//myPlayer.click('@current_button_when_paused');
				})
				//})
				//check the time, and find out how much time will pass before video goes from
				//93% done to 96% done. then wait for that amount of time
				myPlayer.getText('.vjs-control-bar .vjs-current-time-display', function(result2) {			
					time1 = result2.value;
					length1 = time1.length;
					time2 = "" + time1.charAt(length1 - 2) + time1.charAt(length1 - 1);
					time2 = parseInt(time2, 10);
					if (length1 > 3) {
							time2 += parseInt(time1.charAt((length1 - 4), 10)) * 60;
					}
					if (length1 > 4) {
						time2 += parseInt(time1.charAt((length1 - 5), 10)) * 600;
					}
					timeToWait = parseInt((((time2 * 96 / 93) - time2) * 1000), 10);
					console.log("time2 = " + time2);
					console.log("time to wait = " + timeToWait);
					client.pause(timeToWait);
				})
			})
			myPlayer.click('@container');
			//client.pause(100);
			//then move the scrub very close to the end of the video and set the pause
			//command with enough time to let the next video or ad start
			myPlayer.click('@container', function(result1) {
				usableWidth = parseInt(myWidth,10);
				secondJump = usableWidth - 1;
				client.moveToElement('.vjs-control-bar .vjs-progress-holder', secondJump, 1, function(result) {
					client.mouseButtonClick('left');
					client.pause(400);
					myPlayer.click('@current_button_when_paused');
				})	
				myPlayer.getText('.vjs-control-bar .vjs-current-time-display', function(result20) {
					console.log("my result = " + result20.value);			
					time10 = result20.value;
					length10 = time10.length;
					time20 = "" + time10.charAt(length10 - 2) + time10.charAt(length10 - 1);
					time20 = parseInt(time20, 10);
					if (length10 > 3) {
						time20 += parseInt(time10.charAt((length10 - 4), 10)) * 60;
					}
					if (length10 > 4) {
						time20 += parseInt(time10.charAt((length10 - 5), 10)) * 600;
					}
					timeToWait20 = parseInt(((((time20 * usableWidth / secondJump) - time20) * 1000) + 5000), 10);
					console.log("time2 = " + time20);
					console.log("time to wait = " + timeToWait20);
					client.pause(timeToWait20);
					})
			})
			//determine if a preroll is playing, without failing if no result is found
			nextPreroll = false;
			client.elements('css selector', '.vjs-ad-playing',function(result) {
				result.value.forEach(function(result2) {
					nextPreroll = true;
					//if the code makes it here, there is an ad, so
					//include it in the output for recording purposes
					myPlayer.checkElement('@ad_is_playing');
				})
				//if there is no preroll, test for video. an error here indicates there
				//is no preroll and no video on a continuous player
				if (!nextPreroll) {
					myPlayer.checkElement('@video_is_playing');
				}
			})
		}
	}
}; 

var checkScroller = {
	checkScroller: function(client, myPage, myWidth, myUrl, myScroller, priority) {
		myPlayer = this;
		myPage.navigate(myUrl);
		if (!priority) {
			client.pause(2000, function(result) {
				myPlayer.click('@center_aligned_play_button');
				client.pause(2000);
			})
		}
    	//myPlayer = plutoPlayer.section.basic_player;
    	//client.pause(10000);
    	client.elements('css selector', '.vjs-ad-playing',function(result) {
    		done = false;
    		result.value.forEach(function(resultA) {
    			if (!done) {
        			client.url(function(result2) {
   						myPlayer.checkElement('@ad_message');
    					client.getText('.pluto-ad-msg', function(result3) {
    						this.assert.equal(typeof result3, 'object');
    						if (typeof result3 == 'object') {
    							this.assert.equal(result3.value.split(" ")[0].substring(0,3), 'You');
    						}
    					})
    					client.moveToElement('.video-desc',0,0);
    				}) 
    				//scrolling down makes the scrolling player appear
					client.execute('scrollTo(0,490)', function(result2) {
						client.pause(200);
						//check for scrolling player overlay
    					myScroller.checkElement('@proof_of_scrollbar');
    					//scrolling back up make the scrolling player disappear
    					//and the small article player appears
    					client.execute('scrollTo(0,0)', function(result3) {
    						//check to make sure no scrolling player overlay is shown.
    						//client functions cannot use the element titles for the myPlayer
    						client.waitForElementNotVisible('.pvb-title.js-pvb-title' , 500);
    						//myPlayer.click('@play_paused_button');
    					})
    				}) 
   				 	/*client.execute('scrollTo(0,490)', function(result2) {	
   				 		client.pause(200);
    					myScroller.checkElement('@proof_of_scrollbar');
    					myScroller.click('@scrolling_player_close');
    					client.waitForElementNotVisible('.pvb-title.js-pvb-title', 500);
    					myPlayer.checkElement('@current_button_when_paused');
    					client.pause(500);
    					client.moveToElement('.vjs-tech',0,0);
    				})
    				client.execute('scrollTo(0,490)', function(result2) {	
    					client.pause(200);	
    					client.waitForElementNotVisible('.pvb-title.js-pvb-title' , 500);
    					client.execute('scrollTo(0,0)');
    					client.pause(200);
						client.moveToElement('.vjs-ad-control-bar .vjs-paused',13,31, function(result) {
    						/*myPlayer.click('@current_button_when_paused', function(resultx) {
    							console.log("just clicked the buttton!");
    							client.pause(500);
    						})*/
							/*client.mouseButtonClick('left', function(resultx) {
    							console.log("just clicked the buttton!");
    						})
    					})					
    					myPlayer.checkElement('@current_button_when_playing_during_ad');
    				})*/		
    				//check the scrolling player elements in myScroller, not myPlayer
    				client.execute('scrollTo(0,490)', function(result2) {
    					client.pause(200);
    					myScroller.checkElement('@play_button_while_playing');
    					myScroller.checkElement('@scrub_bar_scrolling');
    					myScroller.checkElement('@current_time');
    					myScroller.checkElement('@duration_time');
    					myScroller.checkElement('@volume_on');
    					myScroller.click('@volume_on');
    					myScroller.checkElement('@volume_off');
    					myScroller.click('@volume_off');
    					myScroller.checkElement('@volume_on');
    					myScroller.checkElement('@share_button');
    					myScroller.checkElement('@fullscreen_button');
    					myScroller.checkElement('@top_trending_link');
    					done = true;
    				})
    			}
    		})
    	})  
		client.execute('scrollTo(0,0)', function(result3) {
			client.elements('css selector', '.vjs-ad-playing',function(result) {
				done1 = false
				result.value.forEach(function(resultA) {
    				if (!done1) { 
    					time1 = "";
    					time2 = "";
    					time3 = "";
						myPlayer.getText('@timer_display_during_ad', function(result2) {
							console.log("my result = " + result2.value);			
							time1 = result2.value;
						})
						myPlayer.getText('@duration_display_during_ad', function(result3) {				
							console.log("my result = " + result3.value);				
							time2 = result3.value;
						})
						dummy = client.url( function(result3) {
							done1 = true;
							length1 = time1.length;
							length2 = time2.lengtht
							time1 = "" + time1.charAt(length1 - 2) + time1.charAt(length1 - 1);
							time2 = "" + time2.charAt(length2 - 2) + time2.charAt(length2 - 1);
							time1 = parseInt(time1, 10);
							time2 = parseInt(time2, 10);
							//time3 = ((time2 - time1) * 1000);
							console.log(time3);
							//the logic is that if there are more than 15 seconds duration in the preroll,
							//the skip ad button will after the 15 second mark
							if (time2 > 15000) {
								time4 = 16000 - time1;
								client.pause(time4);
								myPlayer.click('@skip_ad_button');
								console.log("clicked the skip ad button.");
							}
							//if the 15 second mark has already passed, the program searches for the
							//skip ad button ad clicks it, if it is present
							else {
								done2 = false;
								//the 'elements' method checks for an element without sending an error
								// if none are found. client calls cannot access the myPlayer elements
								client.elements('css selector', '.pluto-skip-ad-button', function(resultB) {							
									resultB.value.forEach(function(resultC) {
										if (!done2) {
											myPlayer.click('@skip_ad_button', function(resultD) { 
												done2 = true;
											})
										}
									})
								})
								//if there is no skip ad button, then just wait for the rest of the ad
								if (!done2) {
									dummy = client.url( function(resultE) {
										client.pause(time3);
									})
								}
							}	
						})			
					}	
				})
			})
		}) 
		client.pause(35000);
		console.log("skipping 35 seconds");
		//scroll down the page
		// recheck some scrolling player functionality during video, 
		//even though it was already tested during the ad
		client.execute('scrollTo(0,490)', function(result2) {
			client.pause(200);
    		myScroller.checkElement('@proof_of_scrollbar');
    		//scroll back to the middle of the page
    		client.execute('scrollTo(0,0)', function(result3) {
    		client.waitForElementNotVisible('.pvb-title.js-pvb-title' , 500);
				//myPlayer.click('@play_paused_button');
			})
    	})
   		client.execute('scrollTo(0,490)', function(result2) {	
    		client.pause(200);
    		myScroller.checkElement('@proof_of_scrollbar');
    		myScroller.click('@scrolling_player_close');
    		client.waitForElementNotVisible('.pvb-title.js-pvb-title', 500);
    		myPlayer.checkElement('@current_button_when_paused');
    		client.pause(500);
    		client.moveToElement('.vjs-tech',0,0);
    	})
    	client.execute('scrollTo(0,490)', function(result2) {	
    		client.pause(200);	
    		//after the scrolling player button is clicked,
    		//the video is paused, so the scrolling player
    		// will not appear
    		client.waitForElementNotVisible('.pvb-title.js-pvb-title' , 500);
    		client.execute('scrollTo(0,0)');
    		client.pause(200);
    		//clicking the small article player button is tricky after moving the player back and 
    		//forth between scrolling and not scrolling
			client.moveToElement('.vjs-paused',0,0, function(result) {
    			/*myPlayer.click('@current_button_when_paused', function(resultx) {
    				console.log("just clicked the buttton!");
    				client.pause(500);
    			})*/
    			//had to manually click the button. the page lost
    			//track of the element during the scrollTo function
				client.mouseButtonClick('left', function(resultx) {
    				console.log("just clicked the buttton!");
    			})
    		})					
    		myPlayer.checkElement('@current_button_when_playing');
    	})		
		client.execute('scrollTo(0,490)', function(result2) {
			time1 = "";
			time2 = "";
			client.pause(200);
			myScroller.click('@play_button_while_playing');
			client.pause(200);
			myScroller.checkElement('@play_button_while_paused');
			client.pause(2000);
			client.elements('css selector','.vjs-slider-bar', function(result) {
				found = false;	
				result.value.forEach(function(resultA) {
					//there are a few time values.  the one that I want is not equal to "0:00"
					client.elementIdAttribute(resultA.ELEMENT, 'data-current-time',function(resultB) {
						if ((resultB.value != "0:00") && (!found))  {
							time1 = resultB.value;
							found = true;
							console.log("Time1 = " + time1);
						}
					})
				})
				
				client.pause(1001);
			})
			client.elements('css selector','.vjs-slider-bar', function(result) {
				found = false;	
				result.value.forEach(function(resultA) {
					client.elementIdAttribute(resultA.ELEMENT, 'data-current-time',function(resultB) {
						if ((resultB.value != "0:00") && (!found))  {
							time2 = resultB.value;
							found = true;
							console.log("Time2 = " + time2);
						}
					})
				})
			})
			client.url(function(resultx) {
				client.assert.equal(time1, time2, "check no time passed during pause - timer1 = timer2");
			})
		})	
		client.url(function(result) {
			myScroller.click('@play_button');
			myScroller.checkElement('@play_button_while_playing');
			client.pause(3000);
			client.elements('css selector','.vjs-slider-bar', function(result) {
				found = false;	
				result.value.forEach(function(resultA) {
					client.elementIdAttribute(resultA.ELEMENT, 'data-current-time',function(resultB) {
						if ((resultB.value != "0:00") && (!found))  {
							time1 = resultB.value;
							found = true;
							console.log("Time1 = " + time1);
						}
					})
				})
				
				client.pause(1001);
			})
			client.elements('css selector','.vjs-slider-bar', function(result) {
				found = false;	
				result.value.forEach(function(resultA) {
					client.elementIdAttribute(resultA.ELEMENT, 'data-current-time',function(resultB) {
						if ((resultB.value != "0:00") && (!found))  {
							time2 = resultB.value;
							found = true;
							console.log("Time2 = " + time2);
						}
					})
				})		
			})
			client.url(function(resultx) {
				client.assert.notEqual(time1, time2, "check time passed while playing - timer1 != timer2");
			})	
		})
		//check the buttons on the player
		client.url(function(result) {
			myScroller.checkElement('@play_button_while_playing');
    		myScroller.checkElement('@scrub_bar_scrolling');
    		//myScroller.checkElement('@current_time');
    		myScroller.checkElement('@duration_time');
    		myScroller.checkElement('@volume_on');
    		myScroller.click('@volume_on');
    		myScroller.checkElement('@volume_off');
    		myScroller.click('@volume_off');
    		myScroller.checkElement('@volume_on');
    		myScroller.checkElement('@share_button');
    		myScroller.checkElement('@fullscreen_button');
    		myScroller.checkElement('@top_trending_link');
		})
		//check the share elements
		client.url(function(result) {
			myScroller.click('@share_button');
			myScroller.expect.element('@share_overlay').to.be.visible;
			myScroller.checkElement('@share_overlay_title');
			myScroller.checkElement('@share_overlay_video_link');
			myScroller.checkElement('@share_overlay');
			myScroller.checkElement('@share_facebook_link');
			myScroller.checkElement('@share_twitter_link');
			myScroller.checkElement('@share_google_plus_link');
			myScroller.checkElement('@share_mail_link');
			myScroller.click('@share_exit_button');
			myScroller.expect.element('@share_overlay').to.not.be.visible;
		})
		client.url(function(result) {
			time1 = "";
			usableWidth = parseInt(myWidth,10);
			firstJump = parseInt((usableWidth * (.93)), 10);
			//move from the play button to the end of the scrub bar.  the scrub bar
			// works fine manually, but starting at the scrub bar and moving 93% of the
			//way down leaves me clicking the trending video link.
			//the play button is 31 pixels wide, so add 31 to the length of the jump
			firstJump += 31;
			//console.log("First jump = " + firstJump);
			client.moveToElement( '.pvb-video-controls .pvb-play-control', firstJump, 12,function(result) {
				client.mouseButtonClick('left');
				myScroller.click('@play_button_while_playing');
			})
			client.elements('css selector','.vjs-slider-bar', function(result) {
				found = false;	
				result.value.forEach(function(resultA) {
					client.elementIdAttribute(resultA.ELEMENT, 'data-current-time',function(resultB) {
						if ((resultB.value != "0:00") && (!found))  {
							time1 = resultB.value;
							found = true;
							console.log("Time1 = " + time1);
						}
					})
				})
			})
			client.url(function(resultZ) {
				length1 = time1.length;
				time2 = "" + time1.charAt(length1 - 2) + time1.charAt(length1 - 1);
				time2 = parseInt(time2, 10);
				if (length1 > 3) {
					time2 += parseInt(time1.charAt((length1 - 4), 10)) * 60;
				}
				if (length1 > 4) {
					time2 += parseInt(time1.charAt((length1 - 5), 10)) * 600;
				}
				timeToWait = parseInt((((time2 * 96 / 93) - time2) * 1000), 10);
				console.log("time2 = " + time2);
				console.log("time to wait = " + timeToWait);
				client.pause(timeToWait);
			})
		})
		client.url(function(result) {
			usableWidth = parseInt(myWidth,10);
			secondJump = usableWidth - 1;
			secondJump += 31;
			console.log("second jump = " + secondJump);
			client.moveToElement( '.pvb-video-controls .pvb-play-control', secondJump, 12,function(result) {
				console.log("about to click");
				client.mouseButtonClick('left');
				console.log("just clicked!");
				myScroller.click('@play_button_while_playing');
			})	
			client.elements('css selector','.vjs-slider-bar', function(result) {
				found = false;	
				console.log("result value = " + result.value);
				result.value.forEach(function(resultA) {
					client.elementIdAttribute(resultA.ELEMENT, 'data-current-time',function(resultB) {
						if ((resultB.value != "0:00") && (!found))  {
							time1 = resultB.value;
							found = true;
							console.log("Time2 = " + time2);
						}
					})
				})
			})
			client.url(function(resultY) {
				length1 = time1.length;
				time2 = "" + time1.charAt(length1 - 2) + time1.charAt(length1 - 1);
				time2 = parseInt(time2, 10);
				if (length1 > 3) {
					time2 += parseInt(time1.charAt((length1 - 4), 10)) * 60;
				}
				if (length1 > 4) {
					time2 += parseInt(time1.charAt((length1 - 5), 10)) * 600;
				}
				timeToWait2 = parseInt(((((time2 * usableWidth /(secondJump - 31)) - time2) * 1000) + 5000), 10);
				console.log("time2 = " + time2);
				console.log("time to wait = " + timeToWait2);
				client.pause(timeToWait2);
			})
		})
		nextPreroll = false;
		client.elements('css selector', '.vjs-ad-playing',function(result) {
			result.value.forEach(function(result2) {
				nextPreroll = true;
				myPlayer.checkElement('@ad_is_playing');
			})
			if (!nextPreroll) {
				myPlayer.checkElement('@video_is_playing');
			}
		})
	}
}; 

var checkCarousel = {
	checkCarousel: function(client, myPage, myWidth, myUrl, myCarousel, priority) {
		myPage.navigate(myUrl);	
		client.pause(500);
		client.moveToElement('.carousel-next.js-pvg-next.gallery-nav-active', 0,0, function(result2) {
			//myCarousel.checkElement('@previous_arrow_hidden');
			myCarousel.checkElement('@next_arrow_displayed');
			myCarousel.checkElement('@see_more_video_link');
			myCarousel.checkElement('@video_description');
			myCarousel.checkElement('@carousel_counter');
			myCarousel.checkElement('@play_button');
			myCarousel.checkElement('@video_title');
			counterAtStart = 0;
			counterAfter3Clicks = 0;
			counerAfterBackClick = 0;
			myCarousel.getText('@carousel_counter', function(result){
				counterAtStart = parseInt(result.value.split(" ")[0], 10);;
				//console.log(counterAtStart);
				client.pause(500);
				myCarousel.click('@next_arrow_displayed', function(resultFirstClick) {
					myCarousel.click('@next_arrow_displayed', function(resultSecondClick) {
						myCarousel.click('@next_arrow_displayed', function(resultThirdClick) {
						myCarousel.checkElement('@previous_arrow_displayed');
							client.pause(500);
							myCarousel.getText('@carousel_counter', function(resultAfterClicks){
								counterAfter3Clicks = parseInt(resultAfterClicks.value.split(" ")[0], 10);
								//console.log("counterAfter3Clicks: " + counterAfter3Clicks);
								client.assert.equal(counterAtStart + 3, counterAfter3Clicks, 
									"checking to ensure the forward navigation is working");
								myCarousel.click('@previous_arrow_displayed', function(resultBackClick) {
									myCarousel.getText('@carousel_counter', function(resultAfterBackClick){
										counterAfterBackClick = parseInt(resultAfterBackClick.value.split(" ")[0], 10);
										//console.log("Counter after back click = " + counterAfterBackClick);
										client.assert.equal(counterAfter3Clicks - 1,counterAfterBackClick, 
											"checking to ensure the backward navigation is working");
										myCarousel.checkElement('@video_description');
										myCarousel.checkElement('@play_button');
										myCarousel.checkElement('@video_title');
									});
								});
							});
						});
					});
				});
			});
		});
	}    
};

var getCurrentCount = {
	getCurrentCount : function(client, size, callback) {
		client.element('css selector', 'div.gallery-slides.video-gallery-slides', function(result) {
			//console.log(result.value.ELEMENT)
			if (size == 'small') {
				divisor = 542;
			}
			else {
				divisor = 900;
			}
 			result2 = " ";
			client.elementIdAttribute(result.value.ELEMENT, 'style', function(result2) {
				//console.log(result2);
				result2 = result2.value.split(" ")[1];
				result2 = result2.substring(0,result2.length - 3);
				//console.log(result2);
				result2 = parseFloat((result2),10) * (-1);
				currCount = (1.0 * result2/divisor) + 1;
				currCount = Math.round(currCount); 
				//console.log(currCount);
				callback(currCount);
				//currentCount1 = newCount.value;
				//console.log("CurrentCount = " + currentCount1);
			});
		});
	}
};

var getCurrentScrollLeft = {
	getCurrentScrollLeft : function(client,callback) {
		client.element('css selector', 'div.horizontal-scroll.ui-light.scrollbar .scrolldragger', function(result) {
			//console.log(result.value.ELEMENT)
			
			client.pause(500);
			client.elementIdAttribute(result.value.ELEMENT, 'style', function(result2) {
				//console.log(result2);
				result2 = result2.value.split("left: ")[1];
				result2 = result2.substring(0,result2.length - 3);
				//console.log(result2);
				result2 = parseInt((result2),10);
				// console.log("result 2");
				// console.log(result2);
				callback(result2);
				//currentCount1 = newCount.value;
				//console.log("CurrentCount = " + currentCount1);
			});
		});
	}
}

var checkSmallPlaylist = {
	checkSmallPlaylist : function(client, myPage, myWidth, myUrl, mySmallPlaylist, priority, size) {
		myPage.navigate(myUrl);
		if (!priority) {
			mySmallPlaylist.checkElement('@play_button');
		}
		client.moveToElement('.vgm-thumbs',0,0, function(result) {
		});
		if (!priority && (size == 'small')) {
			mySmallPlaylist.checkElement('@video_player');
		} 
		if (priority && (size == 'small')) {
			mySmallPlaylist.checkElement('@video_player_priority');
		}
		if (size == 'large') {
			mySmallPlaylist.checkElement('@video_player_large');
		}
		if (size == 'largeAsset') {
			mySmallPlaylist.checkElement('@video_player_large_asset');
		}
		mySmallPlaylist.checkElement('@next_button_displayed');
		//mySmallPlaylist.checkElement('@previous_button_hidden');
		mySmallPlaylist.checkElement('@scroller');
		client.moveToElement('.vgm-thumbs .scrollbar .scrolldragger',5,5, function(result) {
			//client.pause(500);
			mySmallPlaylist.checkElement('@scroller_hover');
		});
		mySmallPlaylist.checkElement('@slide_area');
		client.pause(500);
		currentScroll = 0;
		mySmallPlaylist.getCurrentCount(client, size, function(result) {
			client.assert.equal(result, 1, "ensuring the playlist starts on video 1");
		}); 
		mySmallPlaylist.getCurrentScrollLeft(client, function(scrollResult1) {
			//console.log("scroll result 1 = " + scrollResult1);
			currentScroll = scrollResult1;
		});
		mySmallPlaylist.click('@next_button_displayed', function(result) {
			mySmallPlaylist.checkElement('@previous_button_displayed');
			mySmallPlaylist.click('@next_button_displayed', function(result2) {
				mySmallPlaylist.click('@next_button_displayed', function(result3) {
					mySmallPlaylist.click('@next_button_displayed', function(result31) {
						mySmallPlaylist.click('@next_button_displayed', function(result32) {
							client.pause(500);
							mySmallPlaylist.getCurrentCount(client, size, function(result) {
								client.assert.equal(result, 6, "ensuring the playlist is on video 6 after forward 5");
							});
							mySmallPlaylist.getCurrentScrollLeft(client, function(scrollResult2) {
								//console.log("scroll result 2 = " + scrollResult2);
								client.assert.ok((currentScroll < scrollResult2), "ensure the scroll dragger moves correctly");
								//console.log("scroll result 2 = " + scrollResult2);
								currentScroll = scrollResult2;
							});
							mySmallPlaylist.click('@previous_button_displayed');
							client.pause(500);
							mySmallPlaylist.getCurrentCount(client, size,function(result) {
								client.assert.equal(result, 5, "ensuring the playlist is on video 5 after reverse 1");
							});
							// mySmallPlaylist.getCurrentScrollLeft(client, function(scrollResult3) {
							// 	client.assert.ok((scrollResult3 < currentScroll), "ensure the scroll dragger moves correctly");
							// 	console.log("scroll result 3 = " + scrollResult3);
							// 	currentScroll = scrollResult3;
							// });
							//mySmallPlaylist.checkElement('@video_title');
							//mySmallPlaylist.checkElement('@video_description');
							//mySmallPlaylist.checkElement('@video_counter');
						});
					});
				});
			});
		});
		var thumbnailArray = {};
		var slideArray = {};
		client.elements('css selector', '.vgm-thumbs .vgm-thumb-box', function(result1) { 

			result1.value.forEach(function(result2) { 
				
				client.elementIdAttribute(result2.ELEMENT, 'data-duration', function(keyHolder) {
					
					client.elementIdElement(result2.ELEMENT, 'css selector', '.vgm-thumb-image', function(result3) {
						client.elementIdAttribute(result3.value.ELEMENT, 'alt', function(titleHolder) {
							//keyString = keyHolder;
							//console.log(keyHolder);
							//console.log(titleHolder);
							thumbnailArray[keyHolder.value] = titleHolder.value;
						});
					});
				});
			});
		});
		client.elements('css selector', '.ellipsis-data-grouped .gallery-description-title.vgm-inline-video-title', function(result4) {
			//console.log(result4);
			result4.value.forEach(function(result5) {
				client.elementIdAttribute(result5.ELEMENT, 'innerHTML', function(slideText) {
					slideArray[slideText.value.split(" | ")[1]] = slideText.value.split(" | ")[0];
					//console.log(slideArray);
				});
			});
		});
		client.url(function(result6) {
			for (key1 in thumbnailArray) {
				if (thumbnailArray[key1] != slideArray[key1]) {
					client.assert.equal(thumbnailArray[key1], slideArray[key1], "ensure that the thumbnail and slide titles and durations match.");
				}
			}
			for (key2 in slideArray) {
				if (thumbnailArray[key2] != slideArray[key2]) {
					client.assert.equal(thumbnailArray[key2], slideArray[key2], "ensure that the thumbnail and slide titles and durations match.");
				}
			}
		});
		// client.element('css selector', '.vgm-thumbs .vgm-thumb-item.active .vgm-ui-tooltip .ui-tooltip-panel-bottom', function(checkTip) {
		// 	//console.log(checkTip);
		// 	client.elementIdAttribute(checkTip.value.ELEMENT, 'style', function(tipText) {
		// 		console.log(tipText);
		// 		tipString = tipText.value.split('display: ')[0];
		// 		console.log("Tip string = " + tipString);
		// 		client.assert.equal(tipString, 'none;', 'ensure that the tooltip is not showing before mouse over');
		// 	});
		// });
		client.moveToElement('.vgm-thumbs .vgm-thumb-item.active', 10, 10, function(moveResult) {
			client.pause(500);
			tipDuration = " ";
			dataDuration = " ";
			client.element('css selector', '.vgm-thumbs .vgm-thumb-item.active', function(activeThumb) {
				client.elementIdElement(activeThumb.value.ELEMENT, 'css selector', '.ui-tooltip-panel-bottom', function(checkTip) {
					client.elementIdAttribute(checkTip.value.ELEMENT, 'style', function(tipText) {
						//console.log(tipText2);
						tipString = tipText.value.split('display: ')[1];
						//console.log("Tip string = " + tipString2);
						client.assert.equal(tipString, 'block;', 'ensure that the tooltip is showing during mouse over');
					});
					client.elementIdAttribute(checkTip.value.ELEMENT, 'innerHTML', function(tipDurationFound) {
						//console.log(tipDurationFound);
						tipDuration = tipDurationFound.value;
					});	
				});
				client.elementIdElement(activeThumb.value.ELEMENT, 'css selector', '.vgm-thumb-box', function(thumbElement) {
					client.elementIdAttribute(thumbElement.value.ELEMENT, 'data-duration', function(dataDurationFound) {
						//console.log(dataDurationFound)
						dataDuration = dataDurationFound.value;
						client.assert.equal(tipDuration, dataDuration, 'ensure that the tooltip duration is accurate');
					});
				});
			});
		});
	}
};

module.exports = {
	url: function() { 
		return this.api.launchUrl;  
	},
	getCurrentCount : function(client, callback) {
		
	},
	

	sections : {
		basic_player : {
			selector : '.ui-video-wrapper',
			commands: [getElement, getElementPresent, getElementText, getResult, compareData, checkPlayer, checkScroller],
			elements: {
				container : { selector: '.vjs-tech' },
				video_display_area : { selector: '.vjs-text-track-display' },
				video_screen : { selector : '.pluto_video' },
				ad_display_area : { selector: '.vjs-ima3-ad-background' },
				skip_ad_button : { selector: '.pluto-ad-overlay .pluto-skip-ad-button' },
				center_aligned_play_button : { selector: '.vjs-big-play-button' },
				center_aligned_play_button_text : { selector: '.vjs-big-play-button .vjs-control-text' },
				flex_hero_play_button : { selector: '.video-desc' },
				control_bar : { selector: '.vjs-control-bar' },
				play_paused_button : { selector: '.vjs-play-control' },
				current_button_when_paused : { selector: '.vjs-paused' },
				current_button_when_paused_during_ad : { selector: '.vjs-ad-control-bar .vjs-paused' },
				current_button_when_playing : { selector: '.vjs-playing'},
				current_button_when_playing_during_ad : { selector: '.vjs-ad-control-bar .vjs-playing'},
				volume_button : { selector: '.vjs-volume-menu-button'},
				volume_button_during_ad : { selector: '.vjs-volume-menu-button-horizontal'},
				timer_display : { selector: '.vjs-control-bar .vjs-current-time-display'},
				timer_display_during_ad : { selector: '.vjs-ad-control-bar .vjs-current-time-display'},
				duration_display : { selector: '.vjs-control-bar .vjs-duration-display'},
				duration_display_during_ad : { selector: '.vjs-ad-control-bar .vjs-duration-display'},
				title : { selector: 'vjs-video-title'},
				embed_button : { selector: '.embed-button.vjs-control'},
				embed_overlay : { selector: '.pluto-embed-overlay' },
				embed_overlay_title : { selector: '.pluto-embed-overlay .pluto-embed-overlay-title' },
				embed_overlay_video_link : { selector: '.pluto-embed-overlay .direct-link .embed-overlay-direct-link' },
				overlay_exit_button : { selector: '.pluto-embed-overlay .close-embed-overlay' },
				share_button : { selector: '.pluto-share-button.vjs-control'},
				share_overlay_title : { selector: '.pluto-share-overlay .pluto-share-overlay-title' },
				share_overlay_video_link : { selector: '.pluto-share-overlay .share-overlay-direct-link' },
				share_overlay : { selector : '.pluto-share-overlay' },
				share_facebook_link : { selector: '.pluto-share-overlay .pluto-social-share-links-container .pluto-share-facebook' },
				share_twitter_link : { selector: '.pluto-share-overlay .pluto-social-share-links-container .pluto-share-twitter' },
				share_google_plus_link : { selector: '.pluto-share-overlay .pluto-social-share-links-container .pluto-share-google-plus' },
				share_mail_link : { selector: '.pluto-share-overlay .pluto-social-share-links-container .pluto-share-mail' },
				share_exit_button : { selector : '.pluto-share-overlay .close-share-overlay' },
				fullscreen_control_button : { selector: '.vjs-fullscreen-control'},
				fullscreen_control_button_during_ad : { selector: '.vjs-ad-control-bar .vjs-fullscreen-control'},			
				video_description : { selector: '.video-desc'},
				video_did_start : { selector: '.vjs-has-started'},
				video_is_playing : { selector: '.vjs-playing'},
				ad_is_playing : { selector: '.vjs-ad-playing'},
				in_fullscreen_mode : { selector: '.vjs-fullscreen'},
				ad_message : { selector: '.pluto-ad-msg'}
			}
		},
		scrolling_player : {
			selector : '.js-pvb.pvb-container',
			commands: [getElement, getElementPresent, getElementText, getResult, compareData, checkPlayer,checkScroller],
			elements : {
				proof_of_scrollbar : { selector: '.pvb-title.js-pvb-title' },
				logo : { selector : '.pvb-content .pvb-site-logo' },
				video_screen : { selector : '.pvb-content .js-pvb-video' },
				title : { selector : '.pvb-controls .js-pvb-title' },
				play_button : { selector : '.pvb-video-controls .pvb-play-control'},
				play_button_while_playing : { selector : '.pvb-video-controls .pvb-video-pause' },
				play_button_while_paused : { selector : '.pvb-video-controls .pvb-video-play' },
				scrub_bar : { selector : '.pvb-video-controls .pvb-video-progress-bar' },
				scrub_bar_scrolling : { selector : '.pvb-video-control-item.js-pvb-scrubber' },
				current_time : { selector : '.pvb-video-controls .pvb-video-progress-bar .vjs-mouse-display' },
				duration_time : { selector : '.pvb-video-controls .js-pvb-video-time' },
				volume_on : { selector : '.pvb-video-controls .js-pvb-volume.pvb-volume-on' },
				volume_off  : { selector : '.pvb-video-controls .js-pvb-volume.pvb-volume-off' },
				share_button  : { selector : '.pvb-video-controls .js-pvb-share' },
				fullscreen_button  : { selector : '.pvb-video-controls .js-pvb-fullscreen' },
				top_trending_link : { selector : '.pvb-next-video-text' },
				scrolling_player_close : { selector : '.pvb-close-icon.js-pvb-close' },
				share_button : { selector: '.pluto-share-button.js-pvb-share'},
				share_overlay_title : { selector: '.pvb-content-inner .pluto-share-overlay .pluto-share-overlay-title' },
				share_overlay_video_link : { selector: '.pvb-content-inner .pluto-share-overlay .share-overlay-direct-link' },
				share_overlay : { selector : '.pvb-content-inner .pluto-share-overlay' },
				share_facebook_link : { selector: '.pvb-content-inner .pluto-share-overlay .pluto-social-share-links-container .pluto-share-facebook' },
				share_twitter_link : { selector: '.pvb-content-inner .pluto-share-overlay .pluto-social-share-links-container .pluto-share-twitter' },
				share_google_plus_link : { selector: '.pvb-content-inner .pluto-share-overlay .pluto-social-share-links-container .pluto-share-google-plus' },
				share_mail_link : { selector: '.pvb-content-inner .pluto-share-overlay .pluto-social-share-links-container .pluto-share-mail' },
				share_exit_button : { selector : '.pvb-content-inner .pluto-share-overlay .close-share-overlay' }
			}
		},
		carousel_player : { 
			selector : '.js-pluto-video-carousel.pluto-video-gallery-front.pluto-video-title-overlay',
			commands: [getElement, getElementPresent, getElementText, getResult, compareData, checkPlayer,checkCarousel],
			elements: {
				previous_arrow_hidden : { selector: '.carousel-prev.js-pvg-prev' },
				previous_arrow_displayed : { selector: '.carousel-prev.js-pvg-prev.gallery-nav-active' },
				next_arrow_displayed : { selector: '.carousel-next.js-pvg-next.gallery-nav-active' },
				see_more_video_link : { selector: '.video-carousel-item-wrap.active .video-carousel-item.slide .video-carousel-description .see-more-link' },
				video_description : { selector: '.video-carousel-item-wrap.active .video-carousel-item.slide .video-carousel-ellipsis .ellipsis-data-grouped' },
				carousel_counter : { selector: '.video-carousel-item-wrap.active .video-carousel-item.slide .video-carousel-ellipsis .carousel-counter' },
				play_button : { selector: '.video-carousel-item-wrap.active .video-carousel-item.slide .js-pluto-title-overlay-play.pluto-title-overlay-play-button' },
			 	video_title : { selector: '.video-carousel-item-wrap.active .video-carousel-item.slide .pluto-title-overlay-display' }
			}
		},
		small_playlist : {
			selector : '.gallery',
			commands: [getElement, getElementPresent, getElementText, getResult, compareData, checkPlayer,checkSmallPlaylist,getCurrentCount,getCurrentScrollLeft],
			elements : {
				video_player: { selector: '.gallery-video.playlistsmallhtml5' },
				video_player_priority : { selector: '.gallery-video.playlistsmallattophtml5' },
				video_player_large : { selector: '.gallery-video.playlistlargehtml5' },
				video_player_large_asset : { selector: '.gallery-video.playlistassethtml5' },
				play_button : { selector : '.vjs-big-play-button' },
				next_button_displayed : { selector : '.carousel-next.js-pvg-next.gallery-nav-active' },
				previous_button_hidden : { selector : '.carousel-prev.js-pvg-prev' },
				previous_button_displayed : { selector : '.carousel-prev.js-pvg-prev.gallery-nav-active' },
				slide_info_style_holder : { selector : '.gallery-slides.video-gallery-slides' },
				slide_area : { selector : '.gallery-slides.video-gallery-slides' },
				video_title : { selector : '.video-gallery-description .gallery-description-title.vgm-inline-video-title' },
				video_description : { selector : '.video-gallery-description .vgm-video-description' },
				video_counter : { selector : '.video-gallery-description .gallery-counter.video-gallery-counter' },
				thumbnail_holder : { selector : '.vgm-thumbs' },
				thumbnail_play_button : { selector : '.vgm-thumbs .vgm-play-icon.vgm-play-icon-small' },
				thumbnail_image : { selector : '.vgm-thumbs .vgm-thumb-box' },
				thumbnail_title : { selector : '.vgm-thumbs .vgm-video-title' },
				active_thumb_item : { selector : '.vgm-thumbs .vgm-thumb-item.active'},
				scroller : { selector : '.vgm-thumbs .scrollbar .scrolldragger'},
				scroller_hover : { selector : '.vgm-thumbs .scrolldragger.hover'},
			}
		}
	},
};	

	
	

