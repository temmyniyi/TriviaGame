// WATCHED THE FOLLOWING VIDEO AS A RESOURCE TO CREATING MY GAME - USED IT TO SET MY MAIN PSEUDOCODE SECTIONS, ALL CODE IS MY OWN
// https://www.youtube.com/watch?v=KndV7UxLpnk&list=PLf1tvjFO2P7vIxVV5fZh7by2Vpm-vBhWN&index=9&t=6s


// ON CLICK EVENT FOR START BUTTON TO GO AWAY 
$(".btn-dark").on("click", function() {
    // remove button from view 
    $(".btn-dark").remove(); 
    // log to console
    console.log("user clicked start"); 
    trivia.getQuestion(); 

})

// ON CLICK FOR RESET BUTTON 
$(".btn-secondary").on("click", function() {
    console.log("user clicked Restart");
    $(".final-page").hide();
    trivia.questionNumber = 0; 
    trivia.correctGuesses = 0; 
    trivia.incorrectGuesses = 0; 
    trivia.timeOuts = 0;  
    trivia.getQuestion(); 
})




// ON CLICK FOR ANSWER BUTTONS
$("#button-display").on("click", ".answerButton", function (e) {
    // answerButton.clicked(e); 
    var selectedAnswer = $(e.target).attr("data-name"); 
    console.log(e); 
    console.log(e.target); 
    console.log(e.target.data);
    console.log($(e.target).attr("data-name")); 
    trivia.checkAnswer(selectedAnswer); 
    // trivia.answerIncorrect(selectedAnswer); 
})


// GAME VARIABLE WITH METHODS
// declare Game variable as an object with the following properties: 
var trivia = {
    // current question
    currentQuestion: "", 
    // correct answers 
    correctGuesses: 0, 
    // incorrect answers 
    incorrectGuesses: 0, 
    // timeouts 
    timeOuts: 0, 
    // counter
    counter: 3, 
    counterTimer: null, 
    // question number 
    questionNumber: 0,
    // // correct audio
    // yay:  
    
    // QUESTIONS OBJECT WHICH INCLUDES AN ARRAY OF 
    questions: [
        {
            questionText: "The Mountain is the nickname for which character?", 
            questionAnswer: ["Sandor Clegane", "Oberyn Martell", "Gerold clegane", "Gregor Clegane"], 
            answer: "Gregor Clegane" 
        }, 
        {
            questionText: "Who was Margaery Tyrell's first husband?", 
            questionAnswer: ["Stannis Baratheon", "Tommen Baratheon", "Joffrey Baratheon", "Renly Baratheon"], 
            answer: "Renly Baratheon"
        }, 
        {
            questionText: "Who was the Lord Commander of the Kingsguard at the beginning of Game of Thrones?", 
            questionAnswer: ["Ser Jaime Lannister", "Ser Barristan Selmy", "Ser Jeor Mormont", "ser Loras Tyrell"], 
            answer: "Ser Barristan Selmy"
        }, 
        {
            questionText: "Who was the ruler of the Iron Islands at the beginning of Game of Thrones?", 
            questionAnswer: ["Euron Greyjoy", "Yara Greyjoy", "Baylon Greyjoy", "Aeron Greyjoy"], 
            answer: "Baylon Greyjoy"
        }, 
        {
            questionText: "Who delivered the fatal blow to the King-in-the-North, Robb Stark?", 
            questionAnswer: ["Roose Bolton", "Theon Greyjoy", "Walda Frey", "Ramsey Bolton"], 
            answer: "Roose Bolton"
        }, 
        {
            questionText: "Grey Worm and Missandei became allies of Daenerys Targaryen after she liberated the slaves of which city?", 
            questionAnswer: ["Astapor", "Mereen", "Braavos", "Yunkai"], 
            answer: "Astapor"
        }, 
        {
            questionText: "Which rival king attempted to take King's Landing during the Battle of the Blackwater?", 
            questionAnswer: ["Robb Stark", "Renly Baratheon", "Stannis Baratheon", "Balon GReyjoy"], 
            answer: "Stannis Baratheon"
        }, 
        {
            questionText: "The wildling Gilly has a son, who is the father?", 
            questionAnswer: ["Craster", "Jon Snow", "Samwell Tarly", "Joer Mormont"], 
            answer: "Craster"
        }, 
        {
            questionText: "In which city does Arya Stark train to become a Faceless Man?", 
            questionAnswer: ["Braavos", "Pentos", "Qarth", "Astapor"], 
            answer: "Braavos"
        }, 
        {
            questionText: "Davos Seaworth grew up in the slums of which city?", 
            questionAnswer: ["King's Landing", "Oldtown", "Qarth", "Dorne"], 
            answer: "King's Landing"
        }, 
       
    ], 

    //METHODS 
    // COUNTER 

    // countdown: function () {
    //     // clear any previous intervals
    //     clearInterval(interval);
    //     // count down in seconds 
    //     interval = setInterval (decrement, 1000); 
    //     counter--; 
    //     // display countdown on screen 
    //     $(".countdown").html(counter + "seconds left"); 
    //     // log timeout when counter hits zero 
    //     if (counter === 0) {
    //         console.log("timeout"); 
    //     }
    // }, 

    // COUNTDOWN 
    // clear any previous intervals
    run: function () {
        clearInterval(this.counterTimer); 
        this.counterTimer = setInterval(this.decrement, 1000); 
        trivia.counter = 10; 
    }, 
    
    decrement: function () {
        trivia.counter--; 
        $(".countdown").html(trivia.counter + " seconds left to answer");
        if (trivia.counter === 0) {
            clearInterval(trivia.counterTimer);
            trivia.checkAnswer(); 
        }
        
    }, 

    // GET QUESTION METHOD
    getQuestion: function () {
        // clear the question display html
        $(".question-display").empty(); 
        $(".areYouRight").empty(); 
        $(".image-correct").hide ();
        $(".image-incorrect").hide ();
        $(".image-timeout").hide(); 
        // start the countdown
        this.run ();
        // display the question on the screen 
        $(".countdown").html(this.counter + " seconds left to answer"); 
        $(".question-display").html("<p>" + this.questions[this.questionNumber].questionText + "</p>"); 
        this.buttonGenerator();         
    }, 

    //BUTTON GENERATOR METHOD 
    buttonGenerator: function () {
    //empty buttons 
        $("#button-display").empty(); 
        // for loop to display answer buttons on the screen 
        for (var i = 0; i < this.questions[this.questionNumber].questionAnswer.length; i++) {
            var a = $("<button>"); 
            a.addClass("answerButton"); 
            a.attr("data-name", this.questions[this.questionNumber].questionAnswer[i]); 
            a.text(this.questions[this.questionNumber].questionAnswer[i]); 
            $("#button-display").append(a); 
            // console.log(a);    
        };
    }, 

    // AUDIO CORRECT 
    audioCorrect: function () {

    }, 

    // CORRECT ANSWER 
    checkAnswer: function (selectedAnswer) {
        //determine if the answer is correct 
        console.log(this.questions[this.questionNumber]); 
        if (selectedAnswer === undefined) { 
            $(".areYouRight").html("You ran out of time. The correct answer was " + this.questions[this.questionNumber].answer); 
            $(".image-timeout").show ();
            $("#timeout")[0].play(); 
            this.questionNumber++; 
            this.timeOuts++; 
        }
        else if (selectedAnswer === this.questions[this.questionNumber].answer) {
            console.log("win");  
            this.correctGuesses++; 
            console.log (this.correctGuesses);
            $(".areYouRight").html("You're right! The correct answer was " + this.questions[this.questionNumber].answer); 
            $(".image-correct").show (); 
            $("#win")[0].play(); 
            this.questionNumber++; 
        }    
        else {
            console.log("lose"); 
            this.incorrectGuesses++; 
            console.log (this.incorrectGuesses);
            $(".areYouRight").html("You're wrong! The correct answer was " + this.questions[this.questionNumber].answer);
            $(".image-incorrect").show();
            $("#lose")[0].play();   
            this.questionNumber++; 
        }  

        this.answerPage();
            // this.answerPage(); 
    }, 


    answerPage: function () {
        $(".question-display").empty();  
        $("#button-display").empty(); 
        $(".countdown").empty(); 
        clearInterval(trivia.counterTimer);
        // $("#message").html("You're right! The correct answer was " + this.questions[this.questionNumber].answer); 
        // setTimeout(("You're right! The correct answer was " + this.questions[this.questionNumber].answer), 3000); 
        // this.getQuestion(); 
        setTimeout (function (){
            if (trivia.questionNumber < trivia.questions.length){
                trivia.getQuestion(); 
            }

            else {
                trivia.finalPage(); 
            }
        }, 2000
        )
        
    }, 

    finalPage: function () {
        $(".question-display").empty();  
        $("#button-display").empty(); 
        $(".areYouRight").empty(); 
        $(".image-correct").hide ();
        $(".image-incorrect").hide ();
        $(".final-page").show (); 
        $("#message").html("<h2>You're done! Here are your results:</h2>");
        $("#correct").html("Correct Guesses: " + this.correctGuesses);  
        $("#incorrect").html("Incorrect Guesses: " + this.incorrectGuesses); 
        $("#time-out").html("Time Outs: " + this.timeOuts);
    }

}; 