function checkQuiz(e) {
    var answers = [];
    $('.radio').each(function() {
        var answered = $(this).find("input[type='radio']:checked");
        if (answered.length == 0) {
            answers.push(-1);
        }
        else {
            answers.push(answered.parent().index());
        }
    });

    $.post('http://lidavidm-senior-project.appspot.com/submit', JSON.stringify(answers));
    //$.post('http://localhost:8080/submit', JSON.stringify(answers));

    console.log(answers)
    var correct = [0,1,2,1,3,2,1,3,0,2];
    var numCorrect = 0;

    for (var i = 0; i < answers.length; i++) {
        var userAnswer = answers[i];
        var rightAnswer = correct[i];

        if (userAnswer == -1) {
            $('p.explanation').eq(i).addClass('neutral');
        }
        else if (rightAnswer == userAnswer) {
            $('p.explanation').eq(i).addClass('right');
        }
        else {
            $('p.explanation').eq(i).addClass('wrong');
        }
        if (userAnswer >= 0) {
            $('.radio').eq(i).find('li').eq(userAnswer).addClass('wrong');
        }
        $('.radio').eq(i).find('li').eq(rightAnswer).removeClass('wrong').addClass('right');
    }

    return false;
}
