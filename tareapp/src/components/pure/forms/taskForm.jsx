import React, {useRef} from 'react';
import PropTypes from 'prop-types'; 
import {LEVELS} from '../../../models/levels.enum';
import {Task} from '../../../models/task.class';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

let obj=[];

const registerSchema = Yup.object().shape(
    {
        name: Yup.string()
            .min(6, 'Username too short')
            .max(12, 'Username too long')
            .required('Username is required'),
            
        description: Yup.string()
            .min(6, 'Description too short')
            .max(250, 'Description too long')
            .required('Description is required'),    

        level: Yup.string()
            .oneOf([LEVELS.NORMAL, LEVELS.URGENT, LEVELS.BLOCKING], 'You must select a Role: User / Admin')
            .required('Level is required'),
    }
)

const TaskForm = ({add,length}) => {

    function addTask() {
        var content = JSON.parse(obj);
        const newTask = new Task(
            content.name,
            content.description,
            false,
            content.level,
        );
        add(newTask);
    }

    const initialCredentials={ 
        name: "", description: "", completed:false, level: LEVELS.NORMAL
    }

    return (
        <div>
            <h3>Anywhere in your app!</h3>
            <Formik 
                initialValues={initialCredentials}
                // *** Yup Validation Schema ***
                validationSchema = {registerSchema}
                onSubmit={async (values, isSubmitting) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    obj=JSON.stringify(values, null, 2);
                    addTask() 
                }}

                > 
                {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur }) => ( 
                    <Form> 
                    <div className="form-group"> <label htmlFor="name">Title</label> 
                        <Field type="text" name="name" className="form-control" /> 
                    </div> 
                    {/* Username Errors */}
                    {errors.name && touched.name && 
                        (<ErrorMessage name="name" component='div'></ErrorMessage>)
                    }        
                    <div className="form-group"> <label htmlFor="description">Descripcion</label> 
                        <Field type="text" name="description" className="form-control" /> 
                    </div>
                    {/* Username Errors */}
                    {errors.description && touched.description && 
                        (<ErrorMessage name="description" component='div'></ErrorMessage>)
                    }
                    <div className="form-group"> <label htmlFor="priority">Priority: </label> 
                        <select name="level" value={values.level} onChange={handleChange} onBlur={handleBlur}style={{ display: "block" }}>
                            <option value="" label="Select a Level">Select a Level{" "}</option>
                            <option value="normal" label="NORMAL">{" "}NORMAL</option>
                            <option value="urgent" label="URGENT">URGENT</option>
                            <option value="blocking" label="BLOCKING">BLOCKING</option>
                        </select>
                    </div>
                    {errors.level && touched.level && 
                        (<ErrorMessage name="level" component='div'></ErrorMessage>)
                    }
                    <button type='submit' className='btn btn-success btn-lg ms-2'>
                        {length > 0 ? 'Add New Task':'Create your first Task'}
                    </button>
                    </Form> 
                )} 

            </Formik>
        </div>
        
        
    );
}
TaskForm.propTypes ={
    add: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
}
export default TaskForm;
