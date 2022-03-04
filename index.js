//let questionID = 0; // start at question 0
let quizAnswers = Array();
// quizAnswers stores question id and answer id, along with the weighting for the answer, initially all set to 0
quizAnswers = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

function initPage() {
  // display the intro page
  setupIntroPage();
}

function setupIntroPage() {
  let displayCardObj = document.getElementById("displayCard");
  let displayCardHeaderObj = document.getElementById("displayCardHeader");
  let displayCardBodyObj = document.getElementById("displayCardBody");
  displayCardHeaderObj.innerHTML = "Which XMen/person are you...?";
  displayCardBodyObj.innerHTML  = '<div class="text-justify">This is a quiz that is intended to determine your personality based on five questions, each question will have one of five answers, ';
  displayCardBodyObj.innerHTML += 'choose one of the answers for each question and click the submit button, after the five questions you will find out which XMen/person you are!.</div><br><br>';
  displayCardBodyObj.innerHTML += '<div class="text-center"><button type="button" class="btn btn-success" onclick="startQuiz();">Start Quiz</button></div>';
}

function startQuiz() {
  displayQuestion(0);
}

function displayQuestion(questionID) {
  //let displayCardObj = document.getElementById("displayCard");
  let displayCardHeaderObj = document.getElementById("displayCardHeader");
  let displayCardBodyObj = document.getElementById("displayCardBody");
  displayCardHeaderObj.innerHTML = "Question " + String(questionID + 1); // question text
  let answersHTML = quizData[questionID][0];
  answersHTML += 
    '<form id="questionForm"><p>Please choose one answer from the following:</p>';
  answersHTML += "<div>";  
  answersHTML += htmlForAnswers(questionID, 1);
  answersHTML += htmlForAnswers(questionID, 2);
  answersHTML += htmlForAnswers(questionID, 3);
  answersHTML += htmlForAnswers(questionID, 4);
  answersHTML += htmlForAnswers(questionID, 5);
  answersHTML +=
    '<br><div class="text-center"><button type="button" id="submitButton" class="btn btn-success" style="display:none;" onclick="submitAnswer(' +
    String(questionID) +
    ')">Submit Answer</button></div></div></form>';
  displayCardBodyObj.innerHTML = answersHTML;
}

function htmlForAnswers(questionID, questionNumber)
{
    let htmlString  = '<input type="radio" class="form-check-input" id="answer' + String(questionNumber) + '" name="answer" value="' + String(Number(questionNumber) - 1);
        htmlString += '" onclick="enableSubmit();"><label class="form-check-label" for="answer' + String(questionNumber) + '"> ' + quizData[questionID][Number(questionNumber)] + '</label><br>';

    return htmlString;
}

function enableSubmit() {
  document.getElementById("submitButton").style.display = "block";
}

function submitAnswer(questionID) {
  var formValue = Number(document.getElementById("questionForm").answer.value); // get the answer from the question

  quizAnswers[questionID][0] = formValue;
  quizAnswers[questionID][1] = quizData[questionID][formValue + 6]; // question text start at 1, weighting starts at 6

  if (questionID + 1 == 5) {
    displayResults();
  } else {
    displayQuestion(questionID + 1);
  }
}

function displayResults() {
  let quizResult = [0, 0, 0, 0, 0, 0];
  let quizResultTS = [0, 0];

  //let displayCardObj = document.getElementById("displayCard");
  let displayCardHeaderObj = document.getElementById("displayCardHeader");
  let displayCardBodyObj = document.getElementById("displayCardBody");
  displayCardHeaderObj.innerHTML = "Results";
  let innerHTMLText =
    "Well done, by way of complex calculations and supernatural powers we have deduced that in another reality you are in fact:";
  quizAnswers.forEach((item) => {
    quizResult[Number(item[1])] += 1;
  });
  quizResult.forEach((item, index, array) => {
    if (item > quizResultTS[1]) {
      quizResultTS[0] = index;
      quizResultTS[1] = item;
    }
  });
  switch (quizResultTS[0]) {
    case 5:
      innerHTMLText += htmlForResults("./images/deadpool.jpg", "image of deadpool toy", "Deadpool");    
      break;
    case 4:
      innerHTMLText += htmlForResults("./images/wolverine.jpg", "image of wolverine toy", "Wolverine");        
      break;
    case 3:
      innerHTMLText += htmlForResults("./images/magneto.jpg", "image of magneto toy", "Magneto");
      break;
    case 2:
      innerHTMLText += htmlForResults("./images/professorx.jpg", "image of professor x toy", "Professor X");
      break;
    case 1:
      innerHTMLText += htmlForResults("./images/storm.jpg", "image of storm toy", "Storm");
      break;
    default:
  }

  displayCardBodyObj.innerHTML = innerHTMLText;
}

function htmlForResults(imgSRC, imgAlt, labelText)
{
    let htmlString  = '<div class="container"><div class="row"><div class="col-md-4 mx-auto" style="padding-left: 0px;  padding-right: 0px;">';
        htmlString += '<img class="img-fluid rotate_img" src="' + imgSRC + '" alt="' + imgAlt + '"></div><div class="row">';
        htmlString += '<div class="col-md-4 mx-auto text-center">' + labelText + '</div></div></div></div>';

    return htmlString;
}