import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

const CustomUserForm = styled.div`
    background: #FEEBC8;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    @media (max-width: 600px){
        flex-direction: column;
        justify-content: flex-start;
    }

    Form, .userList{
        width: 40%;
        padding: 10px 10px;

        @media (max-width: 600px){
            width: 90%;
        }
    }

    Form{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        
    }

    .fieldWithError{
        height: 50px;
    }

    h2{
        margin: 15px 0px;
    }

    .textInput{
        width: 100%;
    }

    input{
        font-size: 1rem;
    }

    .error{
        position: relative;
        top: -18px;
        color:red;
    }

    button{
        margin-top: 15px;
        width:8rem;
        padding: 5px 5px;
        background: #B2F5EA;
        font-size: 1.0rem;
    }

    li{
        margin: 10px 0;
    }

    ul{
        border: 1px solid grey;
        min-height: 100px;
    }

    .userInfo{
        color: grey;
    }

    .roleSelect, label{
        margin-bottom: 20px;
    }
`

const UserForm = ({values, errors, touched, status}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers([...users, status])
    }, [status])

    return(
        <CustomUserForm>
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

                <Field as='select' name='role' className='roleSelect'>
                    <option disabled value='select'>Select a Role...</option>
                    <option value='student'>Student</option>
                    <option value='teacher'>Teacher</option>                    
                    <option value='assistant'>Lab Assistant</option>
                    <option value='admin'>Admin</option>
                </Field>

                <label>
                    <span>Avatar Color:  </span>
                    <span><Field type='color' name='color'/></span>
                </label>

                <label>
                    <span>Profile Picture: </span>
                    <span><Field type='file' name='new'/></span>
                </label>

                <label>
                    <span>Experience Level (1-10): </span>
                    <span><Field type='range' name="exp" min="0" max="10"/></span>
                </label>

                <label>
                    <span><Field type='checkbox' name='tos' checked={values.tos}/></span>
                    <span>Sign all your rights away.</span>
                </label>

                <button type='submit'><strong>Submit</strong></button>
            </Form>
            <div className='userList'>
                <h2>User List</h2>
                <ul>
                    {
                    users.map(user => (
                        <li>
                            <div>
                                <span style={{color: `${user.color}`}}>{user.name}</span>
                                <br/>
                                <span className='userInfo'>{user.email}</span>
                                <br/>
                                <span className='userInfo'>{user.role}</span>
                                <br/>
                                <span className='userInfo'>Exp: {user.exp}</span>
                            </div>
                        </li>
                    ))
                    }
                </ul>
            </div>
        </CustomUserForm>
    )
}

export default withFormik({
    mapPropsToValues({name, email, password, role, tos, color, exp}){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            role: role || 'select',
            tos: tos || true,
            color: color,
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