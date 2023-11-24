import {useState, useEffect} from 'react';
import '../login-page/login-page.css';
import Navbar from '../home-page/navbar.tsx';
import axios from 'axios';
import Footer from '../../Components/Footer.tsx';

type RecoveryState = {
    password: string;
    confirmPassword: string;
    token: string,
    ready: boolean;
}

export default function RecoveryRecover() {
    const [data, setData] = useState<RecoveryState>({
        password: '',
        confirmPassword: '',
        token: '',
        ready: false,
    });

    const getParameterByName = (name: string) => {
        name = name.replace(/[[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(window.location.search);

        if (!results)
        {
            return null;
        }

        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2]);
    }

    useEffect(() => {
        async function check() {
            try {
                console.log(getParameterByName('token'));
                await axios.post('/api/recovery/validate', {
                    token: getParameterByName('token'),
                });

                setData(l => ({
                    ...l,
                    token: getParameterByName('token') as string,
                    ready: true,
                }));
            } catch (e) {
                console.error(e);
                alert('Not allowed.');
                // window.location.href = '/';
            }
        }

        check().catch(console.error);
    }, []);

    const submit = async () => {
        if (data.password !== data.confirmPassword) {
            alert('Check password');
            return;
        }

        try {
            await axios.post('/api/recovery/recover', {
                password: data.password,
                token: data.token,
            });

            alert('Password change success!');
            document.location = '/';
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
                            {
                                data.ready ? (
                                    <>
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
                                                Reset Account
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <p>Please wait...</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
