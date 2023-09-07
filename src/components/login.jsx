


import React, {useState} from 'react' 


import '../styles/login.css';


export const UserLogin=()=>{ 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user,setUser] = useState();
    const [isClick,setClick] =  useState(false);
    const [isCheckEmpty,setCheckEmpty] = useState(true);

    const handleSubmit = async e => {
        setClick(!isClick)
        let checkEmpty = (password && username == '') ? <div><h1>Username and password are required.</h1></div> : <div><h1></h1></div>

         setCheckEmpty(checkEmpty);
    };

    if (user) {
        return <div> {user.name} is logged in</div>
    }

   

    return (
         <div class='mainForm'>
        
        
        <form onSubmit={handleSubmit} action='/'>
            <header>Login</header>
            <br></br>
            <label htmlFor='username'>Username: </label>
            <img src="../user-login-security-11949.png"/> <input type='text' value={username} onChange={({target})=> setUsername(target.value)}
            placeholder="DarkSlayer"
            />
        
        <div class='passwordPart'>


        
       
             <label htmlFor='username'>Password: </label>
            <input type='password' value={password} onChange={({target})=> setPassword(target.value)}
            placeholder="*********"
            />
            <br></br>
            <button type="submit"><img src="../button_for_userlogin.png "/> Submit</button>


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
            

        </div>
    </form>

    </div>
    )

} 