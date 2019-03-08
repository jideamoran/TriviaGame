// initialize the .js document with this. It contains all of the code for the .js file:



$( document ).ready(function() {

    
    

    // this game object holds all of the questions, possible answers, and then the index of the correct answer for each
    // 10 questions
    var game = {
            questions: [
            {
                   question: 'Who Has A Lightning Bolt On Their Face?',
                   possibles: ['Luke Wilson', 'Harry Potter', 'Barack Obama', 'Mr. Lightning Face'],
                   id: 'question-one',
                   answer: 1
            }, {
                question: 'What Shape Is The Earth?',
                possibles: ['Sphere', 'Cube', 'Obtuse', 'Triangle'],
                id: 'question-two',
                answer: 0
            }, {
                question: 'If I Scream, What Do You Scream For??',
                possibles: ['Mercy','Trillion Candies','Ice Cream', 'Pizza'],
                id: 'question-three',
                answer: 2
            }, {
                question: 'Which of These Doctors Work In Rap?',
                possibles: ['Dr. Phil', 'Dr. Dre', 'Dr. Kevorkian', 'Dr. Jay'],
                id: 'question-four',
                answer: 1
            }, {
                question: 'What Does Usher Look For In The Club?',
                possibles: ['Love', 'Buzz','Hugs', 'A Restroom'],
                id: 'question-five',
                answer: 0
            }, {
                question: 'What Does O.G. Stand For?',
                possibles: ['Old Geezer', 'Original Gangster','Old Generics', 'Odd Giraffe'],
                id: 'question-six',
                answer: 1
    
            }, {
                question: 'What Mythical Creature Has Wings and Four Legs?',
                possibles: ['Pegasus', 'Centaur', 'Kraken', 'Flying Dogs'],
                id: 'question-seven',
                answer: 0
            }, {
                question: 'What Currency Does the United States Use?',
                possibles: ['Dablooms', 'Dollars', 'Dinero', 'Dortios'],
                id: 'question-eight',
                answer: 1
            }, {
                question: 'Where Is The Human Heart Located In The Body?',
                possibles: ['Head', 'Left Knee', 'Chest', 'Left Cheek'],
                id: 'question-nine',
                answer: 2
            }, {
                question: 'What Is The Moon Made Of?',
                possibles: ['Cheese', 'Crust, Mantle, and Core', 'Junk', 'Pepperoni'],
                id: 'question-ten',
                answer: 0
            }, 
          
            ]}
    
        // test
        var message = 'Game Over!';
        // var $message = $('#message');
        // test
    

    
        // These events start the timer: set the number of seconds the guesser has 
        var number = 30;
        $('#timeLeft').on('click', run);
    
        // This function enables the number of seconds to decrease with time, and to display
        // the result of that decrease until time is up. 
        function decrement(){
            // Decrease number by one.
            number--;
            // Show the number in the #timeLeft div.
            $('#timeLeft').html('<h2>' + number + " seconds"+'</h2>');
            // When the number is equal to zero, 
            if (number === 0){
            // run the stop function.
            stop();
            // Alert the user that time is up. Update the innerHTML of the message
           // div to say 'Game Over!'
            // alert('Time Up!')
            $('#message').html('time up!');
            checkAnswers();
            }
        }
        // test
        // writes the win or lose message 
            // function writeMessage (){
            // 	// updates the contents of the message div
            // 	$message.html(message);
            // }
        // test
    
        // the run function sets the spacing of the decrement function's time interval so that
        // it can be equal to a second per number decrement.
        function run(){
            counter = setInterval(decrement, 1000);
        }
        
        // The stop function
        function stop(){
        // Clears our "counter" interval. The interval name is passed to the clearInterval function.
            clearInterval(counter);
        }
    
        // Execute the run function.
        run();
    
        // this function dynamically creates the inputs needed for the form and relates them to the
        // items held within the game object 
        function formTemplate(data) {
        // the first variable relates the form field for question with the data in the object for
        // each question so that the questions can be inputed into that form field
            var qString = "<form id='questionOne'>"+ data.question +"<br>";
        // this variable to access the question object's possibles array needed to answer each question
            var possibles = data.possibles;
        // a for loop to go through the possibles array for each question to add the values of each possibles
        // array and using qString, add them as radio buttons to the question to which they are
        // associated
            for (var i = 0; i < possibles.length; i++) {
                var possible = possibles[i];
                
                qString = qString + "<input type='radio' name='"+data.id+"' value="+ i +">"+possible;
        
            }
            return qString + "</form>";
        }
        window.formTemplate = formTemplate;
        
        // this function takes the template created in the last function and by appending it,
        // allows it to be displayed on the page
        function buildQuestions(){
            var questionHTML = ''
            for (var i = 0; i<game.questions.length; i++) {
                questionHTML = questionHTML + formTemplate(game.questions[i]);
            }
            $('#questions-container').append(questionHTML);
        
        }
        
        // function that 
        function isCorrect(question){
            var answers = $('[name='+question.id+']');
            var correct = answers.eq(question.answer);
            var isChecked = correct.is(':checked');
            return isChecked;
        }
        
        // call the buildQuestions function
        buildQuestions();
    
        // function to build the display of guesser results
        function resultsTemplate(question){
            var htmlBlock = '<div>'
            htmlBlock = htmlBlock + question.question + ': ' + isChecked;
            return htmlBlock + "</div>";
        }
        
        // function to tabulate the guesser results
        function checkAnswers (){
        
        // variables needed to hold results
            var resultsHTML = '';
            var guessedAnswers = [];
            var correct = 0;
            var incorrect = 0;
            var unAnswered =0
        
        // for loop iterates through each question and passes the questions at each index first into
        // the isCorrect function to see if they match the indices of correct answers, and if they do,
        // increments up the correct score
            for (var i = 0; i<game.questions.length; i++) {
                if (isCorrect(game.questions[i])) {
                    correct++;
                } else {
        // then this statement runs the questions at each index through the checkAnswered function
        // to determine whether the user clicked an answer, or did not click an answer, so that
        // incorrect and unAnswered scores can be delineated from each other
                    if (checkAnswered(game.questions[i])) {
                        incorrect++;
                    } else {
                        unAnswered++;
                    }
                }
        
            }
        // display the results of the function in the results div and use strings of text to relate the
        // results of the for loop with their corresponding values
            $('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
        }
        
        // this function checks whether the guesser actually checked an answer for each of the 
        // questions
        function checkAnswered(question){
            var anyAnswered = false;
            var answers = $('[name='+question.id+']');
        // the for loop creates a condition to check if the buttons were checked and and then sets
        // the anyAnswered variable to true if they were
            for (var i = 0; i < answers.length; i++) {
                if (answers[i].checked) {
                    anyAnswered = true;
                }
            }
        // then return the anyAnswered variable so it can be tabulated in the last function to distinguish
        // between incorrect answers and those answers that were not attempted
            return anyAnswered;
        
        }
        
        // create a function with an onclick event for the doneButton that both checks the Answers 
        // and stops the clock when "done" button is pressed
            $('#doneButton').on('click', function() {
            checkAnswers();
            stop();
            $("#messageDiv").html("Game Over!");
    })
});