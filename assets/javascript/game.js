$(document).ready(function() {

	var triviaGameObj = {
		qandaArray : [
			{
				question: "Who directed the movie Fight Club?",
				answer1: "Brian De Palma",
				answer2: "David Fincher",
				answer3: "Christopher Nolan",
				answer4: "Quentin Tarantino",
				rightAnswer: "David Fincher",
				// image: "assets/images/fightclub.gif"
			},
			{
				question: "Jack Nicholson won the Oscar for which one of these movies?",
				answer1: "A Few Good Men",
				answer2: "Chinatown",
				answer3: "The Shining",
				answer4: "One Flew Over the Cuckoo's Nest",
				rightAnswer: "One Flew Over the Cuckoo's Nest",
				// image: "assets/images/oneflew.gif"
			},
			{
				question: "Who directed the movie Being There?",
				answer1: "Jerzy Kosinski",
				answer2: "Hal Ashby",
				answer3: "Blake Edwards",
				answer4: "David Lynch",
				rightAnswer: "Hal Ashby",
				// image: "assets/images/beingthere.gif"
			},
			{
				question: "Who directed the movie Midnight Cowboy?",
				answer1: "William Friedkin",
				answer2: "Arthur Penn",
				answer3: "John Schlesinger",
				answer4: "Robert Benton",
				rightAnswer: "John Schlesinger",
				// image: "assets/images/midnight.gif"
			},
			{
				question: "Who played the main character in the movie Napoleon Dynamite?",
				answer1: "Jon Gries",
				answer2: "Jon Heder",
				answer3: "Aaron Ruell",
				answer4: "Diedrich Bader",
				rightAnswer: "Jon Heder",
				// image: "assets/images/napoleon.gif"
			}
		],

		timeUnitMilSec: 1000,
		resdponseTimeUnits: 20,
		intervalId: 0,
		questionIndex: 0,
		clickedAnswerIndex: 4,
		clickedAnswerText: "",
		numberOfCorrectAnswer: 0,
		numberOfWrongAnswers: 0,
		numberOfUnanswered: 0,
		answerChosen: false,
		numberOfAnswerChoices: 4,
		

		startAndDisplayTimer: function() {

			$("#start").css("visibility", "hidden");
				triviaGameObj.intervalID = setInterval(decrement, triviaGameObj.timeUnitMilSec);
				$("#time").text("Remaining Time: " + triviaGameObj.resdponseTimeUnits + " Seconds");

			function decrement() {
			  	triviaGameObj.resdponseTimeUnits --;
			  	$("#time").text("Remaining Time: " + triviaGameObj.resdponseTimeUnits + " Seconds");
			  	if (triviaGameObj.resdponseTimeUnits === 0) {	
			    	triviaGameObj.stopTheTimer();
			  	}
			}
		},

		stopTheTimer: function() {
			clearInterval(triviaGameObj.intervalID);
			if(triviaGameObj.clickedAnswerIndex === triviaGameObj.numberOfAnswerChoices) {
				triviaGameObj.noAnswerWasClicked();
			}
			else {
				triviaGameObj.anAnswerWasClicked();
			}
		},

		showQandAs: function() {
			$("#question").text(triviaGameObj.qandaArray[triviaGameObj.questionIndex].question);
			$("#answer1").text(triviaGameObj.qandaArray[triviaGameObj.questionIndex].answer1);
			$("#answer2").text(triviaGameObj.qandaArray[triviaGameObj.questionIndex].answer2);
			$("#answer3").text(triviaGameObj.qandaArray[triviaGameObj.questionIndex].answer3);
			$("#answer4").text(triviaGameObj.qandaArray[triviaGameObj.questionIndex].answer4);
		},

		noAnswerWasClicked: function() {
			$("#result").text("Out of Time");
			$("#correctAnswer").text("Correct Answer: " + triviaGameObj.qandaArray[triviaGameObj.questionIndex].rightAnswer);
			triviaGameObj.numberOfUnanswered++;
			triviaGameObj.preparForNextQuestion();
		},

		anAnswerWasClicked: function() {
			if(triviaGameObj.clickedAnswerText == triviaGameObj.qandaArray[triviaGameObj.questionIndex].rightAnswer) {
				$("#result").text("Correct Answer!");
				triviaGameObj.numberOfCorrectAnswer++;
			}
			else {
				$("#result").text("Wrong Answer!");
				$("#correctAnswer").text("Correct Answer: " + triviaGameObj.qandaArray[triviaGameObj.questionIndex].rightAnswer);
				triviaGameObj.numberOfWrongAnswers++
			}
			triviaGameObj.preparForNextQuestion();
		},

		preparForNextQuestion: function() {
			// $("#image").append("<img src=" + triviaGameObj.qandaArray[triviaGameObj.questionIndex].image + ">");
			if(triviaGameObj.questionIndex < triviaGameObj.qandaArray.length - 1) {
				setTimeout(triviaGameObj.partialReset, 6000);
				triviaGameObj.questionIndex++;
			}
			else {
				setTimeout(triviaGameObj.fullReset, 6000);
			}
		},

		partialReset: function() {
			triviaGameObj.commonReset();
			triviaGameObj.startAndDisplayTimer();
			triviaGameObj.showQandAs();
		},

		fullReset: function() {
			triviaGameObj.commonReset();
			$("#gameover").text("Game over, here is how you did:");
			$("#numcorransw").text("Correct Answers: " + triviaGameObj.numberOfCorrectAnswer);
			$("#nimincorransw").text("Incorrect Answers: " + triviaGameObj.numberOfWrongAnswers);
			$("#numunansw").text("Unanswered: " + triviaGameObj.numberOfUnanswered);
			$("#start").text("Start Over");
			$("#start").css("visibility", "visible");
			triviaGameObj.questionIndex = 0;
			triviaGameObj.numberOfCorrectAnswer = 0;
			triviaGameObj.numberOfWrongAnswers = 0;
			triviaGameObj.numberOfUnanswered = 0;			
		},

		commonReset: function() {
			$("#result").text("");
			$("#correctAnswer").text("");
			$("img").remove();
			triviaGameObj.resdponseTimeUnits = 20;
			triviaGameObj.intervalId = 0;
			triviaGameObj.clickedAnswerIndex = 4;
			triviaGameObj.clickedAnswerText = "";
			triviaGameObj.answerChosen = false;
		}
	} 

	$("#start").on("click", function() {
		$("#gameover").text("");
		$("#numcorransw").text("");
		$("#nimincorransw").text("");
		$("#numunansw").text("");
		triviaGameObj.startAndDisplayTimer();
		triviaGameObj.showQandAs();
	}); 

	$("#answer1").on("click", function() {
		answereclicked(this);
	}); 

	$("#answer2").on("click", function() {
		answereclicked(this);	
	}); 

	$("#answer3").on("click", function() {
		answereclicked(this);
	}); 

	$("#answer4").on("click", function() {
		answereclicked(this);
	});

	function answereclicked(answer) {
	if(triviaGameObj.answerChosen === false) {
			triviaGameObj.clickedAnswerIndex = 3;
			triviaGameObj.clickedAnswerText = $(answer).text();
			triviaGameObj.answerChosen = true;
			triviaGameObj.stopTheTimer();
		}
	} 

});


