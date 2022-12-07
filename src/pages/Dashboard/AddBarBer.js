import React from 'react';
import { Button, FormControl, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Loading from '../shared/Loading/Loading';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { signOut } from 'firebase/auth';

const AddBarBer = () => {
    const navigate = useNavigate()
    const [user, loading, error] = useAuthState(auth)
    const [token] = useToken(user)
    const { register, reset, formState: { errors }, handleSubmit } = useForm();

    const { data: services, isLoading } = useQuery('services', () => fetch('http://localhost:5000/service').then(res => res.json()))

    const imageStorageKey = '3e4b477c87251cc2ba5c6195f4cd1134';

    const onSubmit = async (data) => {
        const image = data.photo[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(urlData => {
                if (urlData.success) {
                    const barber = {
                        name: data.displayName,
                        email: data.email,
                        specialty: data.specialty,
                        url: urlData.data.url,
                    }
                    fetch('http://localhost:5000/barber', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(barber)
                    })
                        .then(res => {
                            if (res.status === 401 || res.status === 403) {
                                localStorage.removeItem('accessToken');
                                signOut(auth)
                                navigate('/login')
                            }
                            return res.json()
                        })
                        .then(barberData => {
                            if (barberData.insertedId) {
                                toast.success('Barber successfully inserted')
                                reset();
                            } else {
                                toast.error('Failed to add the Barber')
                            }
                        })
                }
            })
    };

    let errorElement;
    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
    }

    if (loading || isLoading) {
        return <Loading />;
    }

    if (token) {
        toast.success(`Successfully profile created`)
        console.log('token:', token)
        navigate('/')
    }

    return (
        <div className='d-flex'>
            <div className='w-50 mt-5'>
                <h1>Add BarBer</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl className='my-3 w-50'>
                        <label className='label'>
                            <span className='label-text'>Name</span>
                        </label>
                        <input type='text' className='m-1 p-2' placeholder='Name' id="name" label="Name" variant="standard"  {...register("displayName", {
                            required: {
                                value: true,
                                message: 'Name is required'
                            }
                        })}
                            aria-invalid={errors.displayName ? "true" : "false"} />

                    </FormControl>
                    {(errors.displayName?.type === 'required') && <p className='text-danger' role="alert">{errors.displayName.message}</p>}
                    <br />
                    <br />
                    <FormControl className='my-3 w-50'>
                        <label className='label'>
                            <span className='label-text'>Email</span>
                        </label>
                        <input type='email' className='m-1 p-2' placeholder='Email' id="email" label="Email" variant="standard"  {...register("email", {
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Email format is not supported'
                            },
                            required: {
                                value: true,
                                message: 'Email is required'
                            }
                        })}
                            aria-invalid={errors.email ? "true" : "false"} />
                    </FormControl>
                    {(errors.email?.type === 'required') && <p className='text-danger' role="alert">{errors.email.message}</p>}
                    {(errors.email?.type === 'pattern') && <p className='text-danger' role="alert">{errors.email.message}</p>}
                    <br />
                    <br />
                    <FormControl className='my-3 w-50'>
                        <label className='label'>
                            <span className='label-text'>Specialty</span>
                        </label>
                        <Select
                            {...register('specialty', {
                                required: {
                                    value: true,
                                    message: 'Specialty is required'
                                }
                            })}
                        >
                            {services?.map(service => <MenuItem value={service.name}>{service.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    {errors.specialty?.type === 'required' && <p className='text-danger' role="alert">{errors.specialty.message}</p>}
                    <br />
                    <br />
                    <FormControl className='my-3 w-50'>
                        <label className='label'>
                            <span className='label-text'>Photo</span>
                        </label>
                        <input type="file" style={{ border: '1px solid lightgray' }} className='p-2' {...register('photo', {
                            required: {
                                value: true,
                                message: 'photo is required'
                            }
                        })} />
                    </FormControl>
                    {errors.photo?.type === 'required' && <p className='text-danger' role="alert">{errors.photo.message}</p>}
                    <br />
                    <br />
                    <Button type="submit" className='w-50 my-3' variant='contained'>Add BarBer</Button>
                </form>
                {errorElement && errorElement}
                <ToastContainer />
            </div>
            <div className='w-50'>
                <img src='https://i.ibb.co/qsZFXpz/Barber-bro.png' alt="" width={800} height={800} />
            </div>
        </div >
    );
};

export default AddBarBer;