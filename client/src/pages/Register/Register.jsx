import { useState } from 'react';

import { Link, Navigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import axios from 'axios';

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './Register.css';

import Error from '../../components/Error/Error';

const validationSchema = yup.object({
    name: yup.string().required('Name is a required field').min(2, 'Name should be at least 2 symbols long').max(256, 'Name can\'t be more than 256 symbols long'),
    email: yup.string().required('Email is a required field').email('Invalid email address'),
    phoneNumber: yup.string().required('Phone number is a required field').matches(/^[0-9]{10}$/, 'Invalid phone number'),
    password: yup.string().required('Password is a required field').min(5, 'Password should be at least 5 symbols long').max(10, 'Password shouldn\'t be longer than 10 symbols')
})

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: '',
            email: '',
            phoneNumber: '',
            password: ''
        }
    })
    const [redirect, setRedirect] = useState(false);

    async function handleRegisterUser(data) {
        try {
            await axios.post('/user/register', data);
            toast.success('Registration successfull! :)')
            setRedirect(true);
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
    if (redirect) {
        return <Navigate to='/login' />
    }

    return (
        <div>
            <div className="flex-grow-1 position-absolute top-50 start-50 translate-middle text-center d-flex flex-column justify-content-center pb-5 mt-5">
                <h1 >Register</h1>
                <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit(handleRegisterUser)}>
                    <div>
                        <input {...register('name')} className={"register-input m-2 mb-1 " + (errors.name ? 'form-control is-invalid' : '')} type="text" placeholder="Name" name="name" />
                        {errors.name ? <Error message={errors.name.message} className={'ms-1'} /> : null}
                    </div>

                    <div>
                        <input {...register('email')} className={"register-input m-2 mb-1 " + (errors.email ? 'form-control is-invalid' : '')} type="email" placeholder="Email" name="email" />
                        {errors.email ? <Error message={errors.email.message} className={'ms-1'} /> : null}
                    </div>

                    <div>
                        <input {...register('phoneNumber')} className={"register-input m-2 mb-1 " + (errors.phoneNumber ? 'form-control is-invalid' : '')} type="tel" placeholder="Phone number" name="phoneNumber" />
                        {errors.phoneNumber ? <Error message={errors.phoneNumber.message} className={'ms-1'} /> : null}
                    </div>

                    <div>
                        <input {...register('password')} className={"register-input m-2 mb-1 " + (errors.password ? 'form-control is-invalid' : '')} type="password" placeholder="Password" name="password" />
                        {errors.password ? <Error message={errors.password.message} className={'ms-1'} /> : null}
                    </div>

                    <button className="register-button mt-3" type="submit">Register</button>
                    <div className="p-2 fs-5 text-secondary">Already have an account? <Link to="/login" className="text-dark">Login here</Link></div>
                </form>
            </div>
        </div>

    )
}
export default Register
