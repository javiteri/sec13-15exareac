import './App.css';
//import RegisterFormik from './components/pure/forms/registerFormik';
//import LoginFormik from './components/pure/forms/loginFormik';
//import {Father} from './components/containers/father';
import TasklistComponent from './components/containers/task_list';
//import Optionalrender from './components/pure/forms/optionalRender';
//import GreetingStyled from './components/pure/greetingStyled';
function App() {
  return (
    <div className="App">
          {/*Ejemplo de renderizado condicional*/}
          {/*<Optionalrender></Optionalrender>*/}
          <TasklistComponent></TasklistComponent>
          {/*<Father></Father>*/}
          {/*<LoginFormik></LoginFormik>*/}
          {/*<RegisterFormik></RegisterFormik>*/}
    </div>
  );
}

export default App;
