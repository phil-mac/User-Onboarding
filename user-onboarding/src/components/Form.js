import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({values, errors, touched, status}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers([...users, status])
    }, [status])

    return(
        <div>
            <Form>
                <Field type='text' name='name' placeholder='Name'/>
                {touched.name && errors.name && <span>{errors.name}</span>}
                <br />
                <Field type='email' name='email' placeholder='Email'/>
                {touched.email && errors.email && <span>{errors.email}</span>}
                <br />
                <Field type='password' name='password' placeholder='Password'/>
                {touched.password && errors.password && <span>{errors.password}</span>}
                <br />
                <label>
                    <Field type='checkbox' name='tos' checked={values.tos}/>
                    Sign all your rights away.
                </label>
                <br />
                <button type='submit'>Submit</button>
            </Form>
            <div className='userList'>
                <ul>
                {
                    users.map(user => (
                        <li>{user.name}</li>
                    ))
                }
                </ul>
            </div>
        </div>
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
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(4,'Name must be at least 4 characters.').required('Name is required.'),
        email: Yup.string().email('Email must be valid.').required('Email is required.'),
        password: Yup.string().min(8,'Password must be at least 8 characters.').required('Password is required.')
    }),
    handleSubmit(values, {setStatus}){
        axios
            .post('https://reqres.in/api/users', values)
            .then(res => {
                setStatus(res.data);
                console.log(res);
            })
            .catch(err => console.log("oops..." + err.message));
    }
})(UserForm)