import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './registration-page.css'
import Navbar from '../home-page/navbar.tsx';
import Footer from '../../Components/Footer.tsx';

type UserState = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
}

export default function SignUp() {
    const [data, setData] = useState<UserState>({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
    });

    const submit = async () => {
        if (data.password !== data.confirmPassword) {
            alert('Wrong PASSWORD!');
            return;
        }

        try {
            await axios.post('/api/auth/registration', {
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password,
                email: data.email,
                phoneNumber: data.phoneNumber,
                tos: true,
            });

            alert('SUCCESS!');

            document.location = '/';
        } catch (e) {
            alert('REGISTRATION ERROR!');
        }
    }

    const submitBtnOnClick = () => {
        submit().catch(console.error);
    }

    const updateText = (targetKey: keyof UserState, value: string) => {
        setData(l => {
           return {
               ...l,
               [targetKey]: value,
           }
        });
    }

    return (
        <>
            <Navbar />
            <section className='signupSize bg-midnightblue'>
                <div className="py-16">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-x-auto mx-auto max-w-sm lg:max-w-4xl">
                        <div className="signupBg hidden lg:block lg:w-1/2 bg-cover">
                        </div>
                        <div className="w-full p-8 lg:w-1/2">
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">Sign Up</h2>
                            <div className="mt-4">
                                <input
                                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="email"
                                    placeholder='Email'
                                    onInput={(e) => {
                                        updateText('email', e.currentTarget.value);
                                    }}
                                    value={data.email}
                                />
                            </div>
                            <div className="mt-4">
                                <input
                                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="text"
                                    placeholder='Phone Number'
                                    onInput={(e) => {
                                        updateText('phoneNumber', e.currentTarget.value);
                                    }}
                                    value={data.phoneNumber}
                                />
                            </div>
                            <div className="grid gap-4 mb-2 md:grid-cols-2 mt-4">
                                <input
                                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="firstName"
                                    placeholder='First Name'
                                    onInput={(e) => {
                                        updateText('firstName', e.currentTarget.value);
                                    }}
                                    value={data.firstName}
                                />
                                <input
                                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="lastName"
                                    placeholder='Last Name'
                                    onInput={(e) => {
                                        updateText('lastName', e.currentTarget.value);
                                    }}
                                    value={data.lastName}
                                />
                            </div>
                            <div className="mt-4">
                                <input
                                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="password"
                                    placeholder='Password'
                                    onInput={(e) => {
                                        updateText('password', e.currentTarget.value);
                                    }}
                                    value={data.password}
                                />
                            </div>
                            <div className="mt-4">
                                <input
                                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="password"
                                    placeholder='Confirm Password'
                                    onInput={(e) => {
                                        updateText('confirmPassword', e.currentTarget.value);
                                    }}
                                    value={data.confirmPassword}
                                />
                            </div>
                            <div className="mt-8">
                                <button
                                    onClick={submitBtnOnClick}
                                    className="bg-midnightblue text-fruityorange font-bold py-2 px-4 w-full rounded hover:bg-fruityorange hover:text-midnightblue">
                                    Sign Up
                                </button>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1 md:w-1/3"></span>
                                <p className="text-xs text-gray-500 uppercase">OR</p>
                                <span className="border-b w-1 md:w-1/3"></span>
                            </div>
                            <div className='grid gap-1 mb-1 md:grid-cols-2 mt-4'>
                                <a href="/oauth2/google/oauth2request?state=registration_state" className="flex justify-center mt-4 hover:bg-gray-100">
                                    <div className="px-4 py-3">
                                        <img src='/google.png' className=" h-8 w-8" />                                 
                                    </div>
                                </a>
                                <a href="#" className="flex justify-center mt-4 hover:bg-gray-100">
                                    <div className="px-4 py-3">
                                        <img src='/facebook.png' className=" h-8 w-8" />                                 
                                    </div>
                                </a>
                            </div>
                            <p className='flex justify-center mt-4 text-sm'>
                                Already have an account?&nbsp;
                                <Link to="/login"><b className='text-fruityorange'>Log In</b></Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
