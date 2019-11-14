import React from 'react';
import {withFormik, Form, Field} from 'formik';

const UserForm = () => {
    return(
        <Form>
            <Field type='text' name='name' placeholder='Name'/>
            <Field type='email' name='email' placeholder='Email'/>
            <Field type='password' name='password' placeholder='Password'/>
            <label>
                Sign all your rights away.
                <Field type='checkbox' name='tos'/>
            </label>
            <button type='submit'>Submit</button>
        </Form>
        
    )
}

export default withFormik({
    mapPropsToValues({name, email, password, tos}){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || true
        }
    }
})(UserForm)