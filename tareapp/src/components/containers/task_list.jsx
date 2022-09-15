import React, { useState, useEffect }  from 'react'
//import PropTypes from 'prop-types' se puede omitir se da por entendido
import {Task} from '../../models/task.class'
import {LEVELS} from '../../models/levels.enum'
import TaskComponent from '../pure/task'
import '../../styles/task.scss'
import TaskForm from '../pure/forms/taskForm'

const TasklistComponent=() => {
   
  const defaultTask1 = new Task ('Example','Default', true, LEVELS.NORMAL) 
  const defaultTask2 = new Task ('Example','Default', true, LEVELS.URGENT) 
  const defaultTask3 = new Task ('Example','Default', false, LEVELS.BLOCKING)   
  
  //Estado del componente
  const [tasks, setTasks] = useState([defaultTask1, defaultTask2, defaultTask3]);
 //
 const [loading, setLoading] = useState(true);


  //Control del ciclo de vida del componente
  useEffect(() => {
    console.log('Task State has been modified');
    setTimeout(() => {
      setLoading(false);  
    }, 2000);
    
    return () => {
      console.log('TaskList componente is going to unmount...');
    };
  }, [tasks]);

  //const changeCompleted = (id) => {
  //  console.log('changeState de una tarea', id);
  //}

  function completedTask(task) {
    console.log('Complete this task', task);
    const index = tasks.indexOf(task);
    console.log(index);
    const tempTasks = [...tasks];
    tempTasks[index].completed=!tempTasks[index].completed;
    //We update the stare of the component and will it update the
    //iteration of the tasks in order to show the task updated
    setTasks(tempTasks);
  }

  function deletedTask(task) {
    console.log('Delete this task', task);
    const index = tasks.indexOf(task);
    const tempTasks = [...tasks];
    tempTasks.splice(index, 1);
    //We update the stare of the component and will it update the
    //iteration of the tasks in order to show the task updated
    setTasks(tempTasks);
  }

  function addTask(task){
    console.log('Delete this task', task);
    //const index = tasks.indexOf(task);
    const tempTasks = [...tasks];
    tempTasks.push(task);
    setTasks(tempTasks);
  }

  const Table=()=> {
    return (
      <table>
            <thead>
              <tr>
                <th scope='col'>Title</th>
                <th scope='col'>Description</th>
                <th scope='col'>Priority</th>
                <th scope='col'>Actions</th>
              </tr>                
            </thead>
            <tbody>
              {/**Iterar una lista de tareas */}
              {/*Aplicar un for/map para rendirizar una lista*/}
              { tasks.map((task, index) => {
                return(
                      <TaskComponent 
                        key={index} 
                        task={task}
                        complete={completedTask}
                        remove={deletedTask}
                        >
                      </TaskComponent>
                    )
                  }
                )
              }
            </tbody>
            </table>          
    )
  }

  let tasksTable;

  if(tasks.length > 0) {
    tasksTable=<Table></Table>
  }else{
    tasksTable= (
    <div>
      <h3>There are not tasks to show</h3>
      <h3>Please, Create new tasks one</h3>
    </div>
    )
  }

  const loadingStyle={
    color: 'gray',
    fontSize: '30px',
    fontWeight: 'bold',
  }

  return (
        <div className='col-12'>
          <div className='card'>
          {/***Card Header***/}            
            <div className='card-header p-3'>
                <h1>Your Tasks:</h1>
              
            </div> 
          {/***Card Body***/}
          <div className='card-body' data-mdb-perfect-scrollbar='true' style={{position:'relative', height:'400px'}}>
            {loading?(<p style={loadingStyle} >loading tasks</p>) : tasksTable}
          </div>
         </div>
         <TaskForm add={addTask} length={tasks.length} ></TaskForm>
        </div>  
    
  );
};

/*Task_list.propTypes = {
}*/


export default TasklistComponent

