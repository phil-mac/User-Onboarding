import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({values, errors, touched, status}) => {
    const [users, setUsers] = useState([{
        name: 'Jane',
        email: 'jane@email.com',
        role: 'Teacher',
        color: 'green',
        exp: 9
    }]);

    useEffect(() => {
        status && setUsers([...users, status])
    }, [status])

    return(
        <div className='formParent'>
            <Form>
                <h2>Add New User</h2>
                <div className='fieldWithError'>
                    <Field type='text' name='name' placeholder='Name' className='textInput'/>
                    {touched.name && errors.name && <p className='error'>{errors.name}</p>}
                </div>
                <div className='fieldWithError'>
                    <Field type='email' name='email' placeholder='Email' className='textInput'/>
                    {touched.email && errors.email && <p className='error'>{errors.email}</p>}
                </div>
                <div className='fieldWithError'>
                    <Field type='password' name='password' placeholder='Password' className='textInput'/>
                    {touched.password && errors.password && <p className='error'>{errors.password}</p>}
                </div>
                <div className='fieldWithError'>
                    <Field as='select' name='role' className='roleSelect'>
                        <option disabled value=''>Select a Role...</option>
                        <option value='student'>Student</option>
                        <option value='teacher'>Teacher</option>                    
                        <option value='assistant'>Lab Assistant</option>
                        <option value='admin'>Admin</option>
                    </Field>
                    {touched.role && errors.role && <p className='error'>{errors.role}</p>}
                </div>
                <label>
                    Avatar Color:
                    <Field type='color' name='color' value={values.color}/>
                </label>
                <label>
                    Profile Picture <span className='warning'>(doesn't actually work)</span>:
                    <Field type='file' name='new'/>
                </label>
                <label>
                    Experience Level (1-10):
                    <Field type='range' name="exp" min="0" max="10"/>
                </label>
                <label>
                    <Field type='checkbox' name='tos' checked={values.tos}/>
                    I love marketing emails, send me more.
                </label>
                <button type='submit'><strong>Submit</strong></button>
            </Form>
            <div className='userList'>
                <h2>User List</h2>
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>
                            <div>
                                <h3 style={{color: `${user.color}`}}>{user.name}</h3>
                                <p className='userInfo'>{user.email}</p>
                                <p className='userInfo'>{user.role}</p>
                                <p className='userInfo'>Level {user.exp}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default withFormik({
    mapPropsToValues({name, email, password, role, tos, color, exp}){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            role: role || '',
            tos: tos || true,
            color: color || "#0000ff",
            exp: exp || 5
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(4,'Name must be at least 4 characters.').required('Name is required.'),
        email: Yup.string().email('Email must be valid.').required('Email is required.'),
        password: Yup.string().min(8,'Password must be at least 8 characters.').required('Password is required.'),
        role: Yup.string().required()
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