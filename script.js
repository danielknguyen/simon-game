$(document).ready(function(){
	// array holding default series to follow; array to push new patterns into
	var randomSeries = ['red','blue','green'];
	// array to store the user's series to see if it matches with random series array
	var userSeries = [];
	// see what the current total step is for each round
	var currentSteps = randomSeries.length;
	// switch to turn on strict mode
	var strictMode = false;
	// switch to disable user's turn
	var usersTurn = true;
	// play a beep when specific buttons are pressed 
	var redBeep = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
	var blueBeep = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
	var greenBeep = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
	var yellowBeep = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');	
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
	makePatternAndRunGame();
	// this function will run the game
	function runSimonGame(){
		for(let i = 0; i < randomSeries.length; i++){
			setTimeout(function(){
				clickSquare(randomSeries[i]);
			},i*1000);
		}
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
				setTimeout(function(){
					console.log(userSeries);
					console.log(randomSeries);
					console.log(checkIfArrayMatches(userSeries,randomSeries));
					// if array matches check if it is the winning round
					if(checkIfArrayMatches(userSeries,randomSeries)){
						// if true check if current steps is equal to 20(winning round)
						if(currentSteps === 20){
							// let's user know that they have won the game
							$('#winner-description').text('Winner!');
							// reset the game
							resetGame();
						} else {
							// if current steps does not equal 20 reset user series array, make next pattern and start next round
							userSeries = [];
							makePatternAndRunGame();
							usersTurn = true;
							console.log('it matched almost to 20!');
						}
					} else {
						// if user series array does not match random series array check if the game is on strict mode
						if(strictMode){
							// if strict mode is on(true) reset game
							resetGame();
						} else {
							// if strict mode is not on then reset user series array and run the same round
							console.log('it did not match');
							resetGame();
						}
					}
				},2000);	
			}
		}
	});
	// reset the game
	function resetGame(){
		randomSeries = ['red','blue','green'];
		userSeries = [];
		currentSteps = randomSeries.length;
		var strictMode = false;
		makePatternAndRunGame();
		usersTurn = true;
		console.log('randomSeries: ' + randomSeries);
		console.log('userSeries: ' + userSeries);
		console.log('currentSteps: ' + currentSteps);
	};
	// reset button
	$('#reset').on('click',function(){
		resetGame();
	});
});