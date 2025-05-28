document.addEventListener('DOMContentLoaded',()=>{
    const questionDisplay= document.getElementById('question-container')
    const questionText= document.getElementById('question-text')
    const choicesList= document.getElementById('choices-list')
    const nextBtn= document.getElementById('next-btn')
    const resultDisplay= document.getElementById('result-container')
    const scoreDisplay= document.getElementById('score')
    const restartBtn= document.getElementById('restart-btn')
    const startBtn= document.getElementById('start-btn')
    const questionLabel=document.getElementById('question-label')
    const resultDetails=document.getElementById('result-details')
    const questions = [
        {
            id:0,
          question: "What is the capital of France?",
          choices: ["Paris", "London", "Berlin", "Madrid"],
          answer: "Paris",
          marks:2,
          negativeMarks:-1
        },
        {
            id:1,
          question: "Which planet is known as the Red Planet?",
          choices: ["Mars", "Venus", "Jupiter", "Saturn"],
          answer: "Mars",
          marks:3,
          negativeMarks:-2
        },
        {
            id:2,
          question: "Who wrote 'Hamlet'?",
          choices: [
            "Charles Dickens",
            "Jane Austen",
            "William Shakespeare",
            "Mark Twain",
          ],
          answer: "William Shakespeare",
          marks:1,
          negativeMarks:-1
        },
      ];

      let currentQuestionIndex=0
      let rightAnswersQuestions=[]
      let wrongAnswersQuestions=[]

      startBtn.addEventListener('click',startQuize)
      nextBtn.addEventListener('click',nextQuestion)
      restartBtn.addEventListener('click',startQuize)

      function startQuize(){
        
        startBtn.classList.add('hidden')
        questionDisplay.classList.remove('hidden')
        nextBtn.classList.remove('hidden')
        resultDisplay.classList.add('hidden')
        currentQuestionIndex=0
        rightAnswersQuestions=[]
        wrongAnswersQuestions=[]
        showQuestions()

      }
      
    function showQuestions(){
        let {question,choices,marks,negativeMarks}=questions[currentQuestionIndex]
        questionLabel.textContent=`Question No : ${currentQuestionIndex+1} ||  Marks : ${marks} || Negative Marks : ${negativeMarks}`
        questionText.textContent=question
        choicesList.innerHTML=""

        
        choices.forEach((choice,index)=>{
            const li= document.createElement('li')
            li.setAttribute('id',index)
            li.textContent=choice
            li.addEventListener('click',()=>submitQuestion(choice,index))
            choicesList.appendChild(li)
            
        })
    }

    function submitQuestion(choice,ind){
        let question=questions[currentQuestionIndex]
        let {choices}=question
        // highligth selected choice
        choices.forEach((choice,index)=>{
            let li=document.getElementById(index)
            if(index==ind)
                li.classList.add('select-Question')
            else
                li.classList.remove('select-Question')
        })
        if(choice===question.answer){
            // rem0ve question from wrongAnswer Array
            if(wrongAnswersQuestions.find((q)=>q==question)){
                wrongAnswersQuestions=wrongAnswersQuestions.filter((q)=>q!=question)
            }
            // add questions to right answers
            if(!rightAnswersQuestions.find((q)=>q==question)){
              rightAnswersQuestions.push(question)
            }
        }
        else{
            // remove question from rightAnswer Array
            if(rightAnswersQuestions.find((q)=>q==question)){
                rightAnswersQuestions=rightAnswersQuestions.filter((q)=>q!=question)
            }
            // add questions to WrongAnswerArray
            if(!wrongAnswersQuestions.find((q)=>q==question))
                wrongAnswersQuestions.push(question)
        }
    }
     
    function nextQuestion(){
        currentQuestionIndex++
        if(currentQuestionIndex===questions.length){
            showResult()
        }
        else{
            showQuestions()
        }
  }

    function showResult(){
        nextBtn.classList.add('hidden')
        questionDisplay.classList.add('hidden')
        resultDisplay.classList.remove('hidden')
        const totalMarks=questions.reduce((sum,q)=>sum+q.marks,0)
        let score=rightAnswersQuestions.reduce((sum,q)=>sum+q.marks,0)
        score+=wrongAnswersQuestions.reduce((sum,q)=>sum+q.negativeMarks,0)
        const totalAttemptedQuestions=rightAnswersQuestions.length+wrongAnswersQuestions.length
        scoreDisplay.textContent=`${score} out of ${totalMarks}`
        resultDetails.textContent=`Total Attemted Questions : ${totalAttemptedQuestions} | Correct Answers : ${rightAnswersQuestions.length} | Wrong Answers : ${wrongAnswersQuestions.length}`


        //console.log('correct',rightAnswersQuestions)
        //console.log('wrong',wrongAnswersQuestions)
    }


})