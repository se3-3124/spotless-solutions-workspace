import './failure.css';
import PageContentCommons from '../../../Components/PageContentCommons.tsx';

export default function OAuthGoogleFailure() {
    return (
        <>
            <PageContentCommons active={0}>
            <section className='loginSize bg-midnightblue'>
                <div className="py-16">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-x-auto mx-auto max-w-sm lg:max-w-4xl">
                        <div className="loginBg hidden lg:block lg:w-1/2 bg-cover">
                        </div>
                        <div className="w-full p-8 lg:w-1/2">
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">Error</h2>
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">
                                An error occurred during process with google. Please try again later.
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            </PageContentCommons>
        </>
    )
}