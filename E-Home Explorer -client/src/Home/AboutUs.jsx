import React from 'react';

const AboutUs = () => {
    return (
        <section className=" py-16 my-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className='px-4'>
                        <h2 className="text-4xl font-semibold font-serif mb-12">About E-Home</h2>
                        <p className="text-lg mb-6 ">
                            Discover your dream home effortlessly with E-Home, your trusted real estate partner.            </p>
                        <p className="text-lg mb-6">
                            At E-Home, we're transforming homebuying with cutting-edge tech for virtual tours, 3D walkthroughs, and instant agent communication.            </p>
                        <p className="text-lg mb-6">
                            Diverse Listings: Explore a wide range of properties, from cozy apartments to luxurious estates.

                            Virtual Tours: Immerse yourself in property tours from the comfort of your home.

                            Secure Transactions: Trust our secure payment gateways and transparent processes.            </p>
                        <p className="text-lg">
                        E-Home is more than a marketplace; it's a community of dreamers. Let us guide you to your dream home. Welcome to E-Home—where your home journey begins.                        </p>
                    </div>
                    <div>
                        <img
                            src="/images/about.jpg"
                            alt="aboutusimage"
                            className="w-full h-auto rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
