    var Question = function(type, label) {
        this.label = label;
        this.type = type;
    };


    var Ingredient = function(type, contents) {
        this.contents = contents;
        this.type = type;
    };


    var Pantry = function(strong, salty, bitter, sweet, fruity) {
        this.strong = strong;
        this.salty = salty;
        this.bitter = bitter;
        this.sweet = sweet;
        this.fruity = fruity;
    };



    var Bartender = function() {

    };
    Bartender

    Bartender.prototype.createDrink = function(preferences, pantry) {
        var drink = [];
        for (var prop in preferences) {
            console.log(prop)
            if (preferences[prop]) {
                drink.push(pantry[prop].contents[Math.floor(Math.random() * pantry[prop].contents.length)]);
            }
        }
        return drink.join(', ');
    }

    var preferences = {};

    var strong = new Question('strong', 'Do ye like yer drinks strong?');
    var salty = new Question('salty', 'Do ye like it with a salty tang?');
    var bitter = new Question('bitter', 'Are ye a lubber who likes it bitter?');
    var sweet = new Question('sweet', 'Would ye like a bit of sweetness with yer poison?');
    var fruity = new Question('fruity', 'Are ye one for a fruity finish?');

    var questions = [strong, salty, bitter, sweet, fruity]

    //

    var strongi = new Ingredient('strong', ['Glug of rum', 'Slug of whisky', 'Splash of gin']);
    var saltyi = new Ingredient('salty', ['Olive on a stick', 'Salt-dusted rim', 'Rasher of bacon']);
    var bitteri = new Ingredient('bitter', ['Shake of bitters', 'Splash of tonic', 'Twist of lemon peel']);
    var sweeti = new Ingredient('sweet', ['Sugar cube', 'Spoonful of honey', 'Splash of cola']);
    var fruityi = new Ingredient('fruity', ['Slice of orange', 'Dash of cassis', 'Cherry on top']);

    //

    var tedsPantry = new Pantry(strongi, saltyi, bitteri, sweeti, fruityi)

    var bartender = new Bartender();

    console.log(tedsPantry)

    $(document).ready(function() {

        var $simple = $('.simple'),
        $message = $('.message'),
        $submit = $('.Submit'),
        $next = $('.Next'),
            current = 0,
            record,
            score = 0;



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
                // for (var i = 0; i < questions[current].options.length; i++) {
            $simpleForm.append("<input type='radio' name='answers' class='checkbox' value='Yes'  /> Yes  </br>")
            $simpleForm.append("<input type='radio' name='answers' class='checkbox' value='No'  /> No </br>")
            // }
            $simple.append($simpleForm);
        }
        $simple.on('click', function() {
            var radioButtons = $("#myForm input[name=answers]:checked");
            preferences[questions[current].type] = radioButtons.val() == 'Yes';
            console.log(preferences)
        })

        $('#Submit').click(function() {

            if (!$("#myForm input[name=answers]:checked").val()) {
                alert('Answer me question matey...');
            } else {
                $simple.empty();
                $simple.append("<h1>" + questions[current].label + "</h1>");
                $simple.append('<p>' + status + '</p>');

                $message.html("<p>Bartender:" + 'Ok I will remember that:' + JSON.stringify(preferences) + "</p>");

                $simple.hide();
                $message.show();
                
                document.getElementById("Next").style.visibility = "visible";
                document.getElementById("Submit").style.visibility = "hidden";
            }
        })


        $('#Next').click(function() {
            current++;
            $simple.empty();
            if (questions.length <= current) {
                var drink = bartender.createDrink(preferences, tedsPantry);
                $('#StatsPage').append('<p>Ok I\'ll put this in your drink: ' + drink + '</p>')
                document.getElementById("StatsPage").style.visibility = "visible";
                document.getElementById("Next").style.visibility = "hidden";
                reset();
            } else {
                generateQuestion();
                $simple.show();
                $message.hide();
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
                preferences = {};
                $("#StatsPage").empty();
            }, 20000);

        }

    });