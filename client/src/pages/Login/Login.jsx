import { useState, useContext } from 'react'

import { Link, Navigate } from 'react-router-dom'

import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import axios from 'axios'

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './Login.css'

import { UserContext } from '../../userContext'
import Error from '../../components/Error/Error';

const validationSchema = yup.object({
    email: yup.string().required('Email is a required field').email('Invalid email address'),
    password: yup.string().required('Password is a required field').min(5, 'Password should be at least 5 symbols long').max(10, 'Password shouldn\'t be longer than 10 symbols')
})
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const [redirect, setRedirect] = useState(false);
    const { user, setUser } = useContext(UserContext)


    async function handleLoginUser(data) {
        try {
            const { data: res } = await axios.post('/user/login', data);
            setUser(res.userInfo);
            setRedirect(true);
            window.sessionStorage.setItem('loggedIn', true);
            toast.success('Welcome back! :)', {
                position: "top-right",
                theme: 'light'
            })
        } catch (error) {
            let errorMessage = error.response.data.errors
                ? error.response.data.errors['errors'][0].msg
                : error.response.data.message;
            toast.error(errorMessage, {
                position: "top-right",
                theme: 'light'
            });
        }
    }
    if (user !== null) {
        return <Navigate to="/" />;
    }
    if (redirect) {

        return <Navigate to="/" />
    }
    return (
        <div>
            <div className="flex-grow-1 position-absolute top-50 start-50 translate-middle text-center d-flex flex-column justify-content-center pb-5">
                <h1 >Login</h1>
                <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit(handleLoginUser)}>
                    <div>
                        <input {...register('email')} className="login-input m-2" type="email" placeholder="Email" name="email" />
                        {errors.email ? <Error message={errors.email.message} className={'ms-1'} /> : null}
                    </div>
                    <div>
                        <input {...register('password')} className="login-input m-2" type="password" placeholder="Password" name="password" />
                        {errors.password ? <Error message={errors.password.message} className={'ms-1'} /> : null}
                    </div>
                    <button className="login-button mt-3" type="submit">Login</button>
                    <div className="p-2 fs-5 text-secondary">Don't have an account yet? <Link to="/register" className="text-dark">Register here</Link></div>
                </form>
            </div>
        </div>

    )
}
export default Login
