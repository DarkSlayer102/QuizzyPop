

import React, { useState,useRef } from 'react';

import { Container, Button } from 'react-bootstrap';
import {CSSTransition} from 'react-transition-group';

import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';




function submitSuccessfulMessage(){
      return (
        <div>
            <Card style={{ width: '18rem' }}>
            <Card.Body className='cardbody' variant="success">
              <Card.Text>
                Thanks for feedback. 
              </Card.Text>
              <Card.Link href="/easy">Easy</Card.Link>
              <Card.Link href="/hard">Hard</Card.Link>
              <Card.Link href="/medium">Medium</Card.Link>
            </Card.Body>
          </Card>

        </div>
      )
}

export function FeedbackBox(){
    const [feedback,setFeedback] = useState('');
    const [isClick,setClick] =  useState(false);
    const [isCheckEmpty,setCheckEmpty] = useState(true);
    const [showMessage, setShowMessage] = useState(false);

 

   


    function handleChanges(e){
      setFeedback(e.target.value)
      localStorage.setItem('feedbackval', feedback);
      console.log(( localStorage.getItem('feedbackval') ));
      setClick(!isClick)

      let checkEmpty = (feedback != '') ?  <div>

          <h1>{submitSuccessfulMessage()}</h1>

          
        <Button onClick={() => setShowMessage(!showMessage)}>
              Show Message
        </Button>
       
     


        <CSSTransition in={showMessage} timeout={300} classNames="show" unmountOnExit>
            <p>{feedback}</p>
        </CSSTransition>
        
        </div> : <h1 class='please-enter-feedback'>Please enter a feedback!!!!!!</h1> 

      

      setCheckEmpty(checkEmpty);
      
      console.log(isCheckEmpty);
      
    }


    

  return (
    <div>
      <Container>

      

      <h1 class='head-for-feedback'>Feedback</h1>
      
      <textarea
      name='comments'
      id='comments'
      value={feedback}
      onChange={(e)=>setFeedback(e.target.value)}>
      
        
      
      </textarea>
       <>
       <Button variant="outline-light" className='button-feedback' onClick={handleChanges}>Submit</Button>{' '}

       
        {
          (!isClick)
          ? <div>
            
            {isCheckEmpty}
            
              
  
             
            
            </div>
          :
          <div>
           {isCheckEmpty}

           

          </div>
          
                
      }

      </>
      {}
      </Container>
    </div>
    
  )

}


