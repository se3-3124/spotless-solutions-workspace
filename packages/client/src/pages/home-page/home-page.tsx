import './home-page.css';
import Navbar from './navbar.tsx';
import Footer from '../../Components/Footer.tsx';

export default function Home() {
    return (
        <>
            <Navbar />
            <section className="pt-24 md:mt-0 md:h-screen flex flex-col justify-center text-center md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 bg-midnightblue">
                <div className="md:flex-1 md:mr-10">
                    <h1 className='text-fruityorange text-6xl font-bold mb-7'>TOPDOWN</h1>
                    <h1 className='text-white text-5xl font-bold mb-7'>Cleaning</h1>
                    <h1 className='text-white text-5xl font-bold mb-7'>Services Iloilo</h1>
                    <h3 className='text-white text-3xl font-bold mb-7'>for Ilonggos, by Ilonggos</h3>
                    <a href='services-page.tsx'><button className='bg-white px-6 py-4 rounded-lg border-2 border-black border-solid mr-2 mb-2 text-fruityorange hover:bg-fruityorange hover:text-midnightblue font-bold'>Book a Service</button></a>
                </div>
                <div className='flex justify-around md:block mt-8 md:mt-0 md:flex-1'>
                    <img src='/td_logo.jpg'/>
                </div>
            </section>

            {/* What we do */}

            <section className='sectionSize'>
                <div>
                    <h2 className="secondaryTitle bg-100%">WHAT WE DO</h2>
                </div>
                <div className="md:grid md:grid-cols-2 md:grid-rows-2">
                    <div className="flex items-start font-montserrat my-6 mr-10">
                        <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5" />
                        <div>
                            <h3 className="font-semibold text-2xl">Deep Cleaning</h3>
                            <h6 className='secondarySpacing'>ABOUT</h6>
                            <p className='font-bold'>Our flagship products for the deepest and longest lasting clean.</p>
                            <h6 className='secondarySpacing'>BASE PRICE</h6>
                            <p className='font-bold'>₱ 949 on 35sqm and below</p>
                            <h6 className='secondarySpacing'>CONSECUTIVE</h6>
                            <p className='font-bold'>₱ 28 sqm above 35sqm</p>
                            <h6 className='secondarySpacing'>TRANSPORTATION</h6>
                            <p className='font-bold'>₱ 200<span>*Price may be different when outside of Iloilo</span></p>
                        </div>
                    </div>

                    <div className="flex items-start font-montserrat my-6 mr-10">
                        <img src='/cleaning_services_hp2.png' alt='' className="h-7 mr-4" />
                        <div>
                            <h3 className="font-semibold text-2xl">Post Con Cleaning</h3>
                            <h6 className='secondarySpacing'>ABOUT</h6>
                            <p className='font-bold'>For newly constructed or renovated homes.</p>
                            <h6 className='secondarySpacing'>BASE PRICE</h6>
                            <p className='font-bold'>₱ 1500 on 35sqm and below</p>
                            <h6 className='secondarySpacing'>CONSECUTIVE</h6>
                            <p className='font-bold'>₱ 30 sqm above 35sqm</p>
                            <h6 className='secondarySpacing'>TRANSPORTATION</h6>
                            <p className='font-bold'>₱ 200<span>*Price may be different when outside of Iloilo</span></p>
                        </div>
                    </div>

                    <div className="flex items-start font-montserrat my-6 mr-10">
                        <img src='/cleaning_services_hp3.png' alt='' className="h-7 mr-4" />
                        <div>
                            <h3 className="font-semibold text-2xl">Routine Cleaning</h3>
                            <h6 className='secondarySpacing'>ABOUT</h6>
                            <p className='font-bold'>For newly constructed or renovated homes.</p>
                            <h6 className='secondarySpacing'>BASE PRICE</h6>
                            <p className='font-bold'>₱ 1500 on 35sqm and below</p>
                            <h6 className='secondarySpacing'>CONSECUTIVE</h6>
                            <p className='font-bold'>₱ 30 sqm above 35sqm</p>
                            <h6 className='secondarySpacing'>TRANSPORTATION</h6>
                            <p className='font-bold'>₱ 200<span>*Price may be different when outside of Iloilo</span></p>
                        </div>
                    </div>

                    <div className="flex items-start font-montserrat my-6 mr-10">
                        <img src='/cleaning_services_hp1.png' alt='' className="h-7 mr-4" />
                        <div>
                            <h3 className="font-semibold text-2xl">General Cleaning</h3>
                            <h6 className='secondarySpacing'>ABOUT</h6>
                            <p className='font-bold'>For newly constructed or renovated homes.</p>
                            <h6 className='secondarySpacing'>BASE PRICE</h6>
                            <p className='font-bold'>₱ 1500 on 35sqm and below</p>
                            <h6 className='secondarySpacing'>CONSECUTIVE</h6>
                            <p className='font-bold'>₱ 30 sqm above 35sqm</p>
                            <h6 className='secondarySpacing'>TRANSPORTATION</h6>
                            <p className='font-bold'>₱ 200<span>*Price may be different when outside of Iloilo</span></p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Satisfied Customers */}
            <section className='sectionSize'>
                <div>
                    <h2 className="secondaryTitle bg-100%">SATISFIED CUSTOMERS</h2>
                </div>
                <div className='container-fluid'>

                </div>
            </section>
            <Footer />
        </>
    )
}