import React, { useState } from 'react';

const FAQ = () => {
    const [faqs, setFaqs] = useState([
        {
            question: 'What services does your real estate platform offer?',
            answer: 'Our platform provides a comprehensive range of real estate services, including property listings, virtual property tours, real-time chat with agents, and a secure transaction platform.',
        },
        {
            question: 'How does Food Unity Exchange work?',
            answer: 'Our virtual property tours use cutting-edge technology to provide an immersive experience. Agents can schedule live virtual tours, or users can explore properties at their own pace using our 3D walkthroughs.',
        },
        {
            question: ' Is my personal information secure on your platform?',
            answer: ' Yes, we prioritize the security of your information. Our platform employs advanced encryption methods, and we adhere to strict privacy policies to ensure your data is safe.',
        },
        {
            question: 'Can I communicate directly with real estate agents through your platform?',
            answer: ' Absolutely! Our platform features a real-time chat system that allows you to connect with agents, ask questions, and discuss property details at your convenience.',
        },
    ]);

    return (
        <div name="faq" className="hero min-h-screen bg-base-100">
            <div className="hero-content flex-col lg:flex-row">
                <img src="/images/undraw_Questions_re_1fy7.png" className="hidden lg:flex max-w-sm rounded-lg shadow-[0_35px_60px_-15px_rgba(58,191,248,0.3)]" />
                <section id="faq" className=" py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-semibold font-serif mb-12">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div className="collapse collapse-arrow bg-base-200">
                                    <input type="radio" name="my-accordion-4" />
                                    <div className="collapse-title text-xl font-medium">
                                        {faq.question}
                                    </div>
                                    <div className="collapse-content text-primary-focus">
                                        {faq.answer}
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>

    );
};

export default FAQ;
