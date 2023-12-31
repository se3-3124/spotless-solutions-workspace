import './failure.css';
import Navbar from '../../home-page/navbar.tsx';
import Footer from '../../../Components/Footer.tsx';

export default function OAuthGoogleSuccessSignup() {
    return (
        <>
            <Navbar />
            <section className='loginSize bg-midnightblue'>
                <div className="py-16">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-x-auto mx-auto max-w-sm lg:max-w-4xl">
                        <div className="loginBg hidden lg:block lg:w-1/2 bg-cover">
                        </div>
                        <div className="w-full p-8 lg:w-1/2">
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">Success!</h2>
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">
                                We will redirect you to login page for a sec...
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}