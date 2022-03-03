//let questionID = 0; // start at question 0
let quizAnswers = Array();
// quizAnswers stores question id and answer id, along with the weighting for the answer, initially all set to 0
quizAnswers = [[0,0],[0,0],[0,0],[0,0],[0,0]];

function initPage(){
// display the intro page
    setupIntroPage();
}

function setupIntroPage()
{
    let displayCardObj = document.getElementById("displayCard");
    let displayCardHeaderObj = document.getElementById("displayCardHeader");
    let displayCardBodyObj = document.getElementById("displayCardBody");
    displayCardHeaderObj.innerHTML = "Which XMen/person are you...?";
    displayCardBodyObj.innerHTML = '<div class="text-justify">This is a quiz that is intended to determine your personality based on five questions, each question will have one of five answers, choose one of the answers for each question and click the submit button, after the five questions you will find out which XMen/person you are!.</div><br><br><div class="text-center"><button type="button" class="btn btn-success" onclick="startQuiz();">Start Quiz</button></div>';
}

function startQuiz()
{
    displayQuestion(0);
}

function displayQuestion(questionID)
{ 
    let displayCardObj = document.getElementById("displayCard");
    let displayCardHeaderObj = document.getElementById("displayCardHeader");
    let displayCardBodyObj = document.getElementById("displayCardBody");
    displayCardHeaderObj.innerHTML = "Question " + String(questionID+1) ; // question text
    let answersHTML = quizData[questionID][0];
    answersHTML    += '<form id="questionForm"><p>Please choose one answer from the following:</p>';
    answersHTML    += '<div>';
    answersHTML    += '<input type="radio" class="form-check-input" id="answer1" name="answer" value="0" onclick="enableSubmit();"><label class="form-check-label" for="answer1"> ' + quizData[questionID][1] + '</label><br>';      
    answersHTML    += '<input type="radio" class="form-check-input" id="answer2" name="answer" value="1" onclick="enableSubmit();"><label class="form-check-label" for="answer2"> ' + quizData[questionID][2] + '</label><br>';      
    answersHTML    += '<input type="radio" class="form-check-input" id="answer3" name="answer" value="2" onclick="enableSubmit();"><label class="form-check-label" for="answer3"> ' + quizData[questionID][3] + '</label><br>';      
    answersHTML    += '<input type="radio" class="form-check-input" id="answer4" name="answer" value="3" onclick="enableSubmit();"><label class="form-check-label" for="answer4"> ' + quizData[questionID][4] + '</label><br>';      
    answersHTML    += '<input type="radio" class="form-check-input" id="answer5" name="answer" value="4" onclick="enableSubmit();"><label class="form-check-label" for="answer5"> ' + quizData[questionID][5] + '</label><br>';      
//    answersHTML    += '<button type="submit" onclick="submitAnswer()">Submit</button></div></form>';  
    answersHTML    += '<br><div class="text-center"><button type="button" id="submitButton" class="btn btn-success" style="display:none;" onclick="submitAnswer(' + String(questionID) + ')">Submit Answer</button></div></div></form>'
    displayCardBodyObj.innerHTML = answersHTML;
}

function enableSubmit()
{
    document.getElementById("submitButton").style.display = "block";
}

function submitAnswer(questionID)
{
    var formValue = Number(document.getElementById("questionForm").answer.value); // get the answer from the question

    quizAnswers[questionID][0] = formValue;
    quizAnswers[questionID][1] = quizData[questionID][formValue+6]; // question text start at 1, weighting starts at 6      

    if ((questionID+1) == 5) {
        displayResults();
    } else {
        displayQuestion(questionID+1);
    }

}

function displayResults()
{
    let quizResult = [0,0,0,0,0,0];
    let quizResultTS = [0, 0];

    let displayCardObj = document.getElementById("displayCard");
    let displayCardHeaderObj = document.getElementById("displayCardHeader");
    let displayCardBodyObj = document.getElementById("displayCardBody");
    displayCardHeaderObj.innerHTML = "Results";
    let innerHTMLText = 'Well done, by way of complex calculations and supernatural powers we have deduced that in another reality you are in fact:';   
    quizAnswers.forEach((item) => { quizResult[Number(item[1])] += 1; });
    quizResult.forEach((item, index, array) => { if (item > quizResultTS[1]) { quizResultTS[0] = index; quizResultTS[1] = item; }});
    switch (quizResultTS[0])
    {
        case 5:
            innerHTMLText += '<div class="container"><div class="row"><div class="col-md-4 mx-auto" style="padding-left: 0px;  padding-right: 0px;"><img class="img-fluid rotate_img" src="./images/deadpool.jpg" alt="image of deadpool toy"></div><div class="row"><div class="col-md-4 mx-auto text-center">Deadpool</div></div></div></div>';
            break;
        case 4:
            innerHTMLText += '<div class="container"><div class="row"><div class="col-md-4 mx-auto" style="padding-left: 0px;  padding-right: 0px;"><img class="img-fluid rotate_img" src="./images/Wolverine.jpg" alt="image of wolverine toy"></div><div class="row"><div class="col-md-4 mx-auto text-center">Wolverine</div></div></div></div>';
            break;
        case 3:
            innerHTMLText += '<div class="container"><div class="row"><div class="col-md-4 mx-auto" style="padding-left: 0px;  padding-right: 0px;"><img class="img-fluid rotate_img" src="./images/magneto.jpg" alt="image of magneto toy"></div><div class="row"><div class="col-md-4 mx-auto text-center">Magneto</div></div></div></div>';
            break;
        case 2:
            innerHTMLText += '<div class="container"><div class="row"><div class="col-md-4 mx-auto" style="padding-left: 0px;  padding-right: 0px;"><img class="img-fluid rotate_img" src="./images/professorx.jpg" alt="image of professor x toy"></div><div class="row"><div class="col-md-4 mx-auto text-center">Professor X</div></div></div></div>';
            break;
        case 1:
            innerHTMLText += '<div class="container"><div class="row"><div class="col-md-4 mx-auto" style="padding-left: 0px;  padding-right: 0px;"><img class="img-fluid rotate_img" src="./images/storm.jpg" alt="image of storm toy"></div><div class="row"><div class="col-md-4 mx-auto text-center">Storm</div></div></div></div>';
            break;
        default:

    }

    displayCardBodyObj.innerHTML = innerHTMLText;

}