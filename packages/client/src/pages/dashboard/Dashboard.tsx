import {useEffect} from 'react';
import './dashboard.css';
import Navbar from '../home-page/navbar.tsx';
import Footer from '../../Components/Footer.tsx';
import axios from 'axios';

export default function Dashboard() {
    useEffect(() => {
        async function check () {
            try {
                await axios.get('/api/auth/check', { withCredentials: true });
                alert('SUCCESS!');
            } catch (e) {
                alert('ERROR!');
                document.location = '/';
            }
        }

        check().catch(console.error);
    }, []);

    return (
        <>
            <Navbar />
            <section className='loginSize bg-midnightblue'>
                <div className="py-16">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-x-auto mx-auto max-w-sm lg:max-w-4xl">
                        <div className="loginBg hidden lg:block lg:w-1/2 bg-cover">
                        </div>
                        <div className="w-full p-8 lg:w-1/2">
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">dashboard</h2>
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">
                                test
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
