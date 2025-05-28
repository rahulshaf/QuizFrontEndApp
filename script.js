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
    const resultStatus=document.getElementById('overall-Result')
    const viewQuestionButton= document.getElementById('view-Questions')
    const displayQuizRules= document.getElementById('quiz-rules')
    const rules=document.getElementById('rules')
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
          marks:2,
          negativeMarks:-1
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
          marks:2,
          negativeMarks:-1
        },
      ];

      let currentQuestionIndex=0
      let rightAnswersQuestions=[]
      let wrongAnswersQuestions=[]

      startBtn.addEventListener('click',viewRules)
      viewQuestionButton.addEventListener('click',startQuize)
      nextBtn.addEventListener('click',nextQuestion)
      restartBtn.addEventListener('click',viewRules)

      function viewRules(){
        startBtn.classList.add('hidden')
        resultDisplay.classList.add('hidden')
        displayQuizRules.classList.remove('hidden')
        rules.innerHTML=`<p>1.There are total ${questions.length} number of questions in quiz.</p></br><p>2.For every correct answers you will be awarded with certain number of Marks mentioned in each question.</p></br><p>3.For every incorrect answer, a panalty will be applied mentioned as Negative Marks in each question. </p></br><p> 4.To pass this quiz you have to score more than 70% marks.</p></br><p>5.To deselect a selected option in question you have to click again on it.</p>`
        
      }

      function startQuize(){
        displayQuizRules.classList.add('hidden')
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
        let deselectFlag=false
        // highligth selected choice
        choices.forEach((choice,index)=>{
            let li=document.getElementById(index)
            if(index==ind){
                //console.log(li.classList.contains('select-Question'))
                if(li.classList.contains('select-Question')){
                    deselectFlag=true
                    li.classList.remove('select-Question')
                 }
                 else
                    li.classList.add('select-Question')
                }
                
            else
                li.classList.remove('select-Question')
        })

        if(deselectFlag){
            // remove question from wrongAnswer Array
                wrongAnswersQuestions=wrongAnswersQuestions.filter((q)=>q!=question)
            
            // remove question from rightAnswer Array
                rightAnswersQuestions=rightAnswersQuestions.filter((q)=>q!=question)
            return
    
        }
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

        let percentage=((score/totalMarks)*100).toFixed(2)
        scoreDisplay.textContent=`${score} out of ${totalMarks} (${percentage}%)`
        resultDetails.innerHTML=`<p>Total Attempted Questions : ${totalAttemptedQuestions}</p> <p>Correct Answers : ${rightAnswersQuestions.length}</p> <p>Wrong Answers : ${wrongAnswersQuestions.length}</p>`
        
        
        if(percentage>=70){
            resultStatus.textContent="Pass"
            resultStatus.classList.remove('fail')
            resultStatus.classList.add('pass')
        }
        else{
            resultStatus.textContent="Fail"
            resultStatus.classList.remove('pass')
            resultStatus.classList.add('fail')
        }

        //console.log('correct',rightAnswersQuestions)
        //console.log('wrong',wrongAnswersQuestions)
    }


})