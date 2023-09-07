

import React, { useEffect,useState,useRef } from 'react';

import { Link } from 'react-router-dom';
import {Timer} from '../components/Timer';
import '../styles/hardLevel.css';
import { HomeLink } from '../components/Links';
import Button from 'react-bootstrap/Button';
import { FeedbackBox } from '../components/Feedbacks/Feedback';


export function LevelHard(){

  //states and refs


  let displayWonMessage = useRef();
  let displayLostMessage = useRef();

  const [info, setInfo] =  useState('')
  const [question,setQuestion] = useState('')
  const [answers, setAnswers] =  useState([]) 
  const [tries,setTries] = useState(0)
  const [score, setScore] = useState(0);
  const [correctAns, setCorrectAns] = useState('')
  

  const FirstRadioRef = useRef();
  const SecondRadioRef = useRef();
  const ThirdRadioRef = useRef();
  const LastRadioRef = useRef();


  
  useEffect(()=>{

    async function fetchMyApi(){
        let responses = await fetch('https://opentdb.com/api.php?amount=10&type=multiple')

        //fetching data
        responses = await responses.json()
        console.log(responses['results'][0])
        setInfo(responses['results'][0]['category'])
        setQuestion(responses['results'][0]['question'])
        let newAnswers = [responses['results'][0]['correct_answer'],responses['results'][0]['incorrect_answers'][0],responses['results'][0]['incorrect_answers'][1],responses['results'][0]['incorrect_answers'][2]]
        
        setCorrectAns(responses['results'][0]['correct_answer']);

        const newAns = newAnswers.map((v,i)=>{
          if (v === newAnswers[0]){
            return newAnswers[2];
          }
          else if (v === newAnswers[1]){
            return newAnswers[3];
          }
          else if (v === newAnswers[2]){
            return newAnswers[0];
          }
          return newAnswers[1];

        })


        //random selection for the answer
        const shuffledAnswers = newAns.sort(() => Math.floor(Math.random() * newAns.length) - 0.2)
        
        console.log(shuffledAnswers)

        for (let i = 0; i < shuffledAnswers.length; i++) {
              setAnswers(shuffledAnswers)

        }
        

        

        
    }

    fetchMyApi() //calling the fetch api function
    

    
    

  },[])


  //database using sessionStorage
  const storeAnswers = ()=>{
     sessionStorage.setItem('answers',answers);
  }

  console.log(correctAns)


  // Arrow functin for reseting quiz  
 const resetQuiz = async () => {
      let responses = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
      responses = await responses.json();

      setInfo(responses['results'][0]['category']);
      setQuestion(responses['results'][0]['question']);
      const newAnswers = [
        responses['results'][0]['correct_answer'],
        responses['results'][0]['incorrect_answers'][0],
        responses['results'][0]['incorrect_answers'][1],
        responses['results'][0]['incorrect_answers'][2]
      ];
      setAnswers(newAnswers);

      setCorrectAns(responses['results'][0]['correct_answer']);
      setTries(0);
    };



  


    // Button for reset quiz
    function resetQuizButton(){
      return (
        <div>
          <button onClick={resetQuiz}  class='reset-quiz-button'>Reset Quiz</button>
        </div>
      )
    }

    function winningPopUp(){
    
          return (
            <React.Fragment>
           
            <a class="won-message" href="#popup1" ref={displayWonMessage}></a>
            </React.Fragment>
            
          )
    }


    

    function losingPopUp(){
          return (
            <React.Fragment>
           
            <a class="lost-message" href="#popup1" ref={displayLostMessage}></a>
            </React.Fragment>
            
          )
    }




  
  

  //Main Answer Submition Function
  const handleAnswerSubmission =()=>{




     const answersVal = FirstRadioRef.current;
    const answersVal2 = SecondRadioRef.current;
    const answersVal3 = ThirdRadioRef.current;
    const lastVal4 = LastRadioRef.current;
    const listVals = [answersVal, answersVal2,answersVal3,lastVal4];




    
    
    for (let i=0;i<listVals.length;i++) {
      
      if (listVals[i].checked){

        setTries(preCount => preCount + 1)

        

        const handleLosingCase = ()=>{


            if (tries === 1 && listVals[i].value != answers[0]){
                
                  setScore(preScore => preScore - 1);

                  if (score == 0){
                    setScore(0)
                  }

                  
                  
                  <div class='model'>
                            {displayLostMessage.current.textContent = `You Lost `}
                  </div>
                        
                  setTries(0)
                  resetQuiz();
                  
                  setTimeout(()=>{
                          displayLostMessage.current.textContent = '';

                  },1200)

          
                
                
               
                  

          }

        }
        //Handing lose case
        handleLosingCase()
        
         //Handing Win case
        const handleWinningCase = ()=>{

            if (listVals[i].value === correctAns){
                      {displayWonMessage.current.textContent = `You WONNNNNNN!!!!!!!!!!! `}
                  setScore(preScore => preScore + 1)
                  setTries(0)
                  resetQuiz();
                  
                  console.log('Worked')

                
                  setTimeout(()=>{
                    displayWonMessage.current.textContent = '';

                  },1200)

                  


            
                  
                  
                  
                  
                  
          }

        }

        handleWinningCase()

        
      
      }
    }


    

    }

    storeAnswers()

  //Rendering HTML

  return (
  <div>
  
  <section>
        
      <Button variant="outline-danger" onClick={HomeLink} size="lg"  >Home</Button>{' '}

  </section>
  
  <div class='overall'>

    

    <h1 class='catagory'>Catagory: {info.replace('Entertainment:', '')}</h1>


    <p class='question'>Question: {question.replace("&quot;",' ')}</p>
    <br></br>
    <div class='input-part'>
        <input type='radio' value={answers[0]} name="answer" checked ref={FirstRadioRef}/>
        <label htmlFor={answers[0]}>{answers[0]}</label>
        <br></br>
        <input type='radio' value={answers[1]} name="answer" checked ref={SecondRadioRef}/>
        
        <label htmlFor={answers[1]}>{answers[1]}</label>
        <br></br>
        <input type='radio' value={answers[2]} name="answer" checked ref={ThirdRadioRef}/>
        <label htmlFor={answers[2]}>{answers[2]} </label>

        <br></br>
        <input type='radio' value={answers[3]} name="answer" checked ref={LastRadioRef}/>
        <label htmlFor={answers[3]}>{answers[3]}</label>
        <br></br>
        <button type='submit' onClick={handleAnswerSubmission} class='finish-button'>Finish</button>
        

        {
         winningPopUp()
        }

        {
          losingPopUp()
        }


        

    </div>
    

    <div class='tries'>
        <strong class='message'>You have 2 tries</strong>
        <h4 class='try'>Tries: {tries}</h4>

       
        <div>
           <h2 class='score'>Score:{score}</h2>
            <h2>Timer: {Timer()}</h2>

    </div>
        


        

        {resetQuizButton()}
        
        

    </div>

    

    
  </div>
  </div>

  )

}