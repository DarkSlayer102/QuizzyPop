




import React, { useEffect,useState,useRef } from 'react';

import { Navigate,Routes, Route,Link,useNavigate,BrowserRouter } from 'react-router-dom';

import '../styles/mediumLevel.css';
import {Timer} from '../components/Timer';

import { HomeLink } from '../components/Links';
import Button from 'react-bootstrap/Button';
import { FeedbackBox } from '../components/Feedbacks/Feedback';


export function LevelMed(){

  const FirstRadioRef = useRef();
  const SecondRadioRef = useRef();
  let displayWonMessage = useRef();
  let displayLostMessage = useRef();

  const [catagory, setCatagory] =  useState('')
  const [question,setQuestion] = useState('')
  const [answers, setAnswers] = useState([])
  const [correctAns, setCorrectAns] = useState('')
  const [tries,setTries] = useState(0)
  const [score, setScore] = useState(0);



  useEffect(()=>{

    async function fetchMyApi(){
        let responses = await fetch('https://opentdb.com/api.php?amount=10&difficulty=medium&type=boolean')
        responses = await responses.json()
         setCatagory(responses['results'][0]['category'])
        setQuestion(responses['results'][0]['question'])


        const ans = new Array(responses['results'][0]['incorrect_answers'][0])
        ans.push(responses['results'][0]['correct_answer'])

        setCorrectAns(responses['results'][0]['correct_answer']);


        const newAns = ans.map((v, i) => {
        if (v === ans[0]) {
          return ans[1];
        }
        return ans[0]; // Return the original value for all other cases
      });



        const shuffledAnswers = newAns.sort(() => Math.floor(Math.random() * newAns.length) - 0.2);


        for (let i = 0; i < shuffledAnswers.length; i++){
          setAnswers(shuffledAnswers);
        }
        
        


        const time = Timer()
        console.log(time.valueOf())

        

        
    }

    fetchMyApi()
    

    
    

  },[])



  

  const resetQuiz = async () => {
      let responses = await fetch('https://opentdb.com/api.php?amount=10&difficulty=medium&type=boolean');
      responses = await responses.json();

      setCatagory(responses['results'][0]['category']);
      setQuestion(responses['results'][0]['question']);
      const newAnswers = [
        responses['results'][0]['correct_answer'],
        responses['results'][0]['incorrect_answers'][0],
        responses['results'][0]['incorrect_answers'][1],
      ];
      setAnswers(newAnswers);
      setTries(0);
    };
  
  
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

  const results =()=>{
    const answersVal = FirstRadioRef.current;
    const answersVal2 = SecondRadioRef.current;
    const listVals = [answersVal, answersVal2];

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
                      {displayWonMessage.current.textContent = `You WONNNNNNN!!!!!!!!!!!`}
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

  return (
  <div>
      

  
    
    
   

    


      <section>
        
      <Button variant="outline-danger" onClick={HomeLink} size="lg"  >Home</Button>{' '}

      </section>

    
    

    <div className='overall'>

    

    <h1 className='catagory'>Catagory: {catagory.replace('Entertainment:', '')}</h1>

    <h1 className='question'>Question: {question.replace('&quot;','')}</h1>

    <h1 className='medLevelHead'>Level Medium</h1>

    <div className='input-part'>
    <input type='radio' value={answers[0]} name="answer" checked ref={FirstRadioRef}/>
    <label for={answers[0]}>{answers[0]}</label>
    <br></br>
    <input type='radio' value={answers[1]} name="answer" checked ref={SecondRadioRef}/>
    
    <label for={answers[1]}>{answers[1]}</label>
    <br></br>
    <button type='submit' onClick={results}  class='finish-button'>Finish</button>


    {
         winningPopUp()
        }

    {
          losingPopUp()
        }

    </div>
     <div>
        <strong>You have 1 tries</strong>
        <h4>Tries: {tries}</h4>

        {resetQuizButton()}
        
      <div>
        <h2>Score:{score}</h2>
        <h2>Timer: {Timer()}</h2>

         
        
      </div>
    </div>

    
 
     </div>

      <section>
      {FeedbackBox()}
    </section>

        
  </div>

  )

}






