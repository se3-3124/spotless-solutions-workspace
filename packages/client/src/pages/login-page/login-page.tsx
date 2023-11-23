import './login-page.css';
import Navbar from '../home-page/navbar.tsx';

export default function LogIn() {
    return (
        <>
            <Navbar />
            <section className='signupSize bg-midnightblue'>
                <div className="py-16">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-x-auto mx-auto max-w-sm lg:max-w-4xl">
                        <div className="loginBg hidden lg:block lg:w-1/2 bg-cover">
                        </div>
                        <div className="w-full p-8 lg:w-1/2">
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">Hello</h2>
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">Welcome Back!</h2>
                            <h2 className="text-2xl font-semibold text-gray-700 text-center mt-8">Log In</h2>
                            <div className="mt-4">
                                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" placeholder='Email'/>
                            </div>
                            <div className="mt-4">
                                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" placeholder='Password'/>
                            </div>
                            <div className="mt-8">
                                <button className="bg-midnightblue text-fruityorange font-bold py-2 px-4 w-full rounded hover:bg-fruityorange hover:text-midnightblue">Log In</button>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1 md:w-1/3"></span>
                                <p className="text-xs text-gray-500 uppercase">OR</p>
                                <span className="border-b w-1 md:w-1/3"></span>
                            </div>
                            <div className='grid gap-1 mb-1 md:grid-cols-2 mt-4'>
                                <a href="#" className="flex justify-center mt-4 hover:bg-gray-100">
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
                            <p className='flex justify-center mt-4 text-sm'>Don’t have an account? <a href=''><b className='text-fruityorange'> Sign Up</b></a></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}