$(document).ready(function() {

    var $simple = $('.simple'),
        current = 0,
        record,
        score = 0;

    // var questions = [{
    //     label: 'Question 1: Do ye like yer drinks strong?',
    //     options: ['Yes', 'No'],

    // }, {
    //     label: 'Question 2: Do ye like it with a salty tang?',
    //     options: ['Yes', 'No'],

    // }, {
    //     label: 'Question 3: Are ye a lubber who likes it bitter?',
    //     options: ['Yes', 'No'],

    // }, {
    //     label: 'Question 4: Would ye like a bit of sweetness with yer poison?',
    //     options: ['Yes', 'No'],

    // }, {
    //     label: 'Question 5: Are ye one for a fruity finish?',
    //     options: ['Yes', 'No'],

    // }]

    var question = functions(questions) {
        this.questions = questions;
    };

    var strong = new question('Question 1: Do ye like yer drinks strong?');
    var salty = new question('Question 2: Do ye like it with a salty tang?');
    var bitter = new question('Question 3: Are ye a lubber who likes it bitter?');
    var sweet = new question('Question 4: Would ye like a bit of sweetness with yer poison?');
    var fruity = new question('Question 5: Are ye one for a fruity finish?');

    var ingredients = function(type) {
        this.type = type;
    };

    var strongi = new ingredients(['Glug of rum', 'slug of whisky', 'splash of gin']);
    var saltyi = new ingredients(['Olive on a stick', 'salt-dusted rim', 'rasher of bacon']);
    var bitteri = new ingredients(['Shake of bitters', 'splash of tonic', 'twist of lemon peel']);
    var sweeti = new ingredients(['Sugar cube', 'spoonful of honey', 'splash of cola']);
    var fruityi = new ingredients(['Slice of orange', 'dash of cassis', 'cherry on top']);

    var pantry = function(available) {
        this.available = available;
    };

    var preferences = {};

    var bartender = function(drinks) {
        this.drinks = drinks;
    };

    bartender.prototype.createDrink = function(length) {
        var createDrink = {};
        for (var i = 0; i < length; i++) {
            createDrink += this.drinks
        }
    }




    var messages = ["Better luck next time", "Atleast you got a few right", "Almost, you got most of the questions right!", "Good Job you got all the questions right!"];


    $('.Start').click(function() {
        $('.StartPage').hide();
        generateQuestion();
        document.getElementById("simple").style.display = "block";
        document.getElementById("Submit").style.visibility = "visible";
    })

    function generateQuestion() {
        $simple.append("<h1>" + questions[current].label + "</h1>")
        var simpleForm = '<form id="myForm"></form>'
        var $simpleForm = $(simpleForm)
        for (var i = 0; i < questions[current].options.length; i++) {
            $simpleForm.append("<input type='radio' name='answers' class='checkbox' value='" + i + "'  />" + questions[
                current].options[i] + '</br>')
        }
        $simple.append($simpleForm);
    }
    $simple.on('click', function() {
        var radioButtons = $("#myForm input[name=answers]:checked");
        record = parseInt(radioButtons.val());
        console.log('record', record)
    })



    $('#Submit').click(function() {
        var status = 'Incorrect! The correct answer is:' + " " + questions[current].options[questions[current].answer] + ".";
        if (!$("#myForm input[name=answers]:checked").val()) {
            alert('Unable to comply, system failure, error, error, error...');
        } else {

            if (record === questions[current].answer) {
                score++;
                status = 'Correct!';
            }
            $simple.empty();
            $simple.append("<h1>" + questions[current].options[questions[current].answer] + "</h1>");
            $simple.append('<img src=' + questions[current].img + '>');
            $simple.append('<p>' + status + '</p>');
            $simple.append("<p>Score:" + score + "out of " + questions.length + "</p>");
            document.getElementById("Next").style.visibility = "visible";
            document.getElementById("Submit").style.visibility = "hidden";
        }
    })


    $('#Next').click(function() {
        current++;
        $simple.empty();
        if (questions.length <= current) {
            var messageIndex = Math.max(Math.round((score / questions.length) * messages.length) - 1, 0);
            console.log(messageIndex)
            $('#StatsPage').append('<p>' + messages[messageIndex] + '</p>')
            $('#StatsPage').append('<p>' + score + '/' + questions.length + '</p>')
            document.getElementById("StatsPage").style.visibility = "visible";
            document.getElementById("Next").style.visibility = "hidden";
            reset();
        } else {
            generateQuestion();
            document.getElementById("Next").style.visibility = "hidden";
            document.getElementById("Submit").style.visibility = "visible";
        }
    })

    function reset() {
        setTimeout(function() {
            $simple.empty();
            document.getElementById("Next").style.visibility = "hidden";
            document.getElementById("StatsPage").style.visibility = "hidden";
            $("#StartPage").show();
            current = 0;
            record = null;
            score = 0;
            $("#StatsPage").empty();
        }, 10000);

    }

});