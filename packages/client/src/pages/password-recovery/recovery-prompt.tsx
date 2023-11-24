import {useState} from 'react';
import '../login-page/login-page.css';
import Navbar from '../home-page/navbar.tsx';
import axios from 'axios';
import Footer from '../../Components/Footer.tsx';

type RecoveryState = {
    email: string;
}

export default function RecoveryPrompt() {
    const [data, setData] = useState<RecoveryState>({
        email: '',
    });

    const submit = async () => {
        try {
            await axios.post('/api/recovery/request', {
                email: data.email,
            });

            alert('Email is sent to your account!');
        } catch (e) {
            alert('Error');
        }
    }

    const submitBtnOnClick = () => {
        submit().catch(console.error);
    }

    const updateText = (targetKey: keyof RecoveryState, value: string) => {
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
            <section className='signupSize bg-midnightblue' style={{height: '80vh'}}>
                <div className="py-16">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-x-auto mx-auto max-w-sm lg:max-w-4xl">
                        <div className="loginBg hidden lg:block lg:w-1/2 bg-cover">
                        </div>
                        <div className="w-full p-8 lg:w-1/2">
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">Recovery</h2>
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
                            <div className="mt-8">
                                <button
                                    onClick={submitBtnOnClick}
                                    className="bg-midnightblue text-fruityorange font-bold py-2 px-4 w-full rounded hover:bg-fruityorange hover:text-midnightblue">
                                    Request for Password Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
