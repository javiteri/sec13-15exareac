import React, {useState} from 'react';

let red=0;
let green=0;
let blue=0;

//?Estilo para usuario Logueado
const loggedStyle={
    backgroundColor: `rgb(${red},${green},${blue})`,
    color:'white'
}
//? Estilo para usuario no Logueado
const unloggedStyle={
    backgroundColor: 'tomato',
    color:'white',
    fontWeight:'bold'
}

//Login/Logout buttons
const LoginButton=({loginAction, propStyle}) => {
    return(
        <button style={propStyle} onClick={loginAction}>Login</button>        
    )
}

const LogoutButton=({logoutAction, propStyle}) => {
    return(
        <button style={propStyle} onClick={logoutAction}>Logout</button>        
    )
}

// ? (Expresion true) && expression => se renderiza la expresion
// ? (Expresion false) && expression => no se renderiza la expresion

const Optionalrender = () => {
    
    const [access, setAccess] = useState(false);
    const [nmessage, setNmessage] = useState(0);

    //const updateAccess =()=>{
    //    setAccess(!access);
    //}

    const loginAction = ()=>{
        setAccess(true);
    }

    const logoutAction = ()=>{
        setAccess(false);
    }

    let optionalButton;
    //if (access) {
    //    optionalButton = <button onClick={updateAccess}>Logout</button>
    //}else{
    //    optionalButton = <button onClick={updateAccess}>Login</button>
    //}
    
    if(access){
        optionalButton=<LogoutButton propStyle={unloggedStyle} logoutAction={logoutAction}></LogoutButton>
    }else{
        optionalButton=<LoginButton propStyle={loggedStyle} loginAction={loginAction}></LoginButton>
    }

    // Unread messages
    let addMessages = () => {
        setNmessage(nmessage+1);
    }
 
    return (
        <div>
            {/*Optional Button*/}
            {optionalButton}
            {/*n Messages unread*/}
            {/* nmessage > 0 && <p>You have {nmessage} new messages... </p> */}
            {access ? (
                <div>
                    { nmessage > 0 ?
                        <p>You have {nmessage} new message{nmessage>1 ? 's':null}</p>:
                        <p>There are no new messages</p> 
                    }
                    <button onClick={addMessages}>{nmessage===0 ?'Add your first message':'Add new messages'}</button>
                </div>
            ):null}
        </div>
    );
}

export default Optionalrender;