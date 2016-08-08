$(document).ready(function() {

    var $simple = $('.simple'),
        current = 0,
        record,
        score = 0;

    var questions = [{
        label: 'Question 1: What has been the most ridiculous event that occurred which started a war?',
        options: ['Conflict over stolen flip-flops', 'Soccer game result dispute', 'War over a bucket', 'Dictator angry about losing in Mortal Kombat'],
        answer: 2,
        img: 'img/bucket.png'
    }, {
        label: 'Question 2: Which animal defeated an army?',
        options: ['Lion', 'Hyena', 'Gyrados', 'Emu'],
        answer: 3,
        img: 'img/emu.jpg'
    }, {
        label: 'Question 3: What useless commodity caused an economic in the 1600s?',
        options: ['Tulips', 'Bellsprout', 'Hurricane Drift Wood', 'Oil'],
        answer: 0,
        img: 'img/tulips.jpg'
    }, {
        label: 'Question 4: Who is the greatest dictator opera writer?',
        options: ['Joseph Stalin', 'Shaka Zulu', 'Emperor Xenu', 'Kim Jong Il'],
        answer: 3,
        img: 'img/Kim.jpg'
    }, {
        label: 'Question 5: What was Hitler\'s moustache called?',
        options: ['Handlebar moustache', 'Toothbrush moustache', 'Eddga moustache', 'Schuckle moustache'],
        answer: 1,
        img: 'img/hitler.jpg'
    }]

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
        var status = 'Incorrect! The correct answer is:'+ " " + questions[current].options[questions[current].answer] + ".";
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
        }, 5000);

    }

});