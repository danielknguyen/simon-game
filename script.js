$(document).ready(function(){
	// array holding default series to follow; array to push new patterns into
	var randomSeries = [];
	// array to store the user's series to see if it matches with random series array
	var userSeries = [];
	// see what the current total step is for each round
	var currentSteps = randomSeries.length;
	// switch to turn on strict mode
	var strictMode = false;
	// switch to disable user's turn
	var usersTurn = false;
	// disable on off switch
	var gameOn = false;
	// audio for specific buttons pressed and if game ends
	var redBeep = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
	var blueBeep = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
	var greenBeep = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
	var yellowBeep = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
	var errorSound = new Audio('buzzSound.flac');	
	var winnerSound = new Audio('winnerSound.flac');
	var nextRound = new Audio('bell.wav');
	// function that will create the pattern to follow, push it into randomSeries array and start the round;
	function makePatternAndRunGame(){
		// array that holds the values of each simon square;
		var simonSquareValues = ['red','blue','green','yellow'];
		// Stores a random simon square value
		var randomSimonSquareValue = simonSquareValues[Math.round(Math.random() * 3)];
		// increment current steps by 1 to show total steps for next round
		currentSteps++;
		// push a new random simon square value into random series array for new round
		randomSeries.push(randomSimonSquareValue);
		// begin simon game once pattern has been made
		runSimonGame();
		console.log(randomSeries);
		console.log(currentSteps);
	};
	// this function will run the game
	function runSimonGame(){
		// input current steps on game screen
		$('#current-steps').text(currentSteps);
		usersTurn = false;
		for(let j = 0; j < randomSeries.length; j++){
			// create a pressed button effect; when pressed down square color turns lighter and returns back to normal
			setTimeout(function(){
				clickSquare(randomSeries[j]);
				$('#'+randomSeries[j]).css('opacity','0.9');
				setTimeout(function(){
					$('#'+randomSeries[j]).css('opacity','1');
				},200);
			},j*1000);
		}
		// as soon as the computer's turn is done allow the user to start
		setTimeout(function(){
			usersTurn = true;
		},randomSeries.length*500);
	};
	//play sound for each square
	function clickSquare(square){
		if(square === 'red'){
			redBeep.play();
		} else if(square === 'blue'){
			blueBeep.play();
		} else if(square === 'green'){
			greenBeep.play();
		} else if(square === 'yellow'){
			yellowBeep.play();
		}
	}
	// check if userSeries array matches randomSeries array
	function checkIfArrayMatches(arr1,arr2){
		for(var i = 0; i < arr1.length; i++){
			if(arr1[i] !== arr2[i]){
				return false;
	    }
		};
		return true;
	};
	// pushes the simon square button value that user clicks into user series checkIfArrayMatches
	$('.square').on('click',function(){
		// stored value of the simon square button that was clicked by user
		var simonSquareButtonClicked = $(this).val();
		// allow users to push value to user series array if usersTurn is true
		// create a pressed button effect; when pressed down square color turns lighter and returns back to normal
		$('#' + simonSquareButtonClicked).css('opacity','0.9');
		setTimeout(function(){
			$('#' + simonSquareButtonClicked).css('opacity','1');
		},200);
		if(usersTurn){
			// beeps when user clicks a button
			clickSquare(simonSquareButtonClicked);
			// push simon square button into user series array
			userSeries.push(simonSquareButtonClicked);
			console.log(userSeries);
			console.log(userSeries.length);
			// if the length of user series array matches current steps...
			if(userSeries.length === currentSteps){
				// if user series array length matches disable users turn
				usersTurn = false;
				console.log(userSeries);
				console.log(randomSeries);
				console.log(checkIfArrayMatches(userSeries,randomSeries));
				// if array matches check if it is the winning round
				if(checkIfArrayMatches(userSeries,randomSeries)){
					// if true check if current steps is equal to 20(winning round)
					setTimeout(function(){
						if(currentSteps === 20){
							// let's user know that they have won the game
							winnerSound.play();
							$('#winner-description').text('Winner!');
							// reset the game
							resetGame();
						} else {
							// if current steps does not equal 20 reset user series array, make next pattern and start next round
							userSeries = [];
							nextRound.play();
							setTimeout(function(){
								makePatternAndRunGame();
							},1000);
							console.log('it matched almost to 20!');
						}
					},1000);
				} else {
					usersTurn = false;
					setTimeout(function(){
						// if user series array does not match random series array check if the game is on strict mode
						if(strictMode){
							// if strict mode is on(true) reset game
							$('#current-steps').text('!!');
							errorSound.play();
							resetGame();
						} else {
							// if strict mode is not on then reset user series array and run the same round
							errorSound.play();
							$('#current-steps').text('!!');
							restartRound();
							console.log('it did not match');
						}
					},1500);
				}
			} else {
				// if userSeries array length does not match randomSeries array than check if the current items in user series match random series
				if(!checkIfArrayMatches(userSeries,randomSeries)){
						usersTurn = false;
						errorSound.play();
						// if the item does not match than reset round
						setTimeout(function(){
							$('#current-steps').text('!!');
							restartRound();
							console.log('square did not match');
						},1500);
				}
			}
		}
	});
	// reset the game
	function resetGame(){
		randomSeries = ['red','blue','green'];
		userSeries = [];
		currentSteps = randomSeries.length;
		var strictMode = false;
		gameOn = true;
		makePatternAndRunGame();
		usersTurn = true;
		console.log('randomSeries: ' + randomSeries);
		console.log('userSeries: ' + userSeries);
		console.log('currentSteps: ' + currentSteps);
	};
	// restart the round
	function restartRound(){
		userSeries = [];
		currentSteps = randomSeries.length;
		runSimonGame();
		console.log(randomSeries);
		console.log(currentSteps);	
	}
	// reset button
	// $('#reset').on('click',function(){
	// 	resetGame();
	// });
	
	// start button
	$('#on').on('click',function(){
		if(!gameOn){
			gameOn = true;
			setTimeout(function(){
				makePatternAndRunGame();
			},600);
		}
	});
});