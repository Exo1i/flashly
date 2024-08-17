"use client"
import {useState} from 'react';
import Image from "next/image";
import faqs from "@/app/Components/faq";

export default function FAQ() {
    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    return (
        <div
            className="bg-indigo-50 py-10 px-4 sm:px-6 md:px-8 lg:px-16 mx-auto my-10 md:my-20 lg:my-40 rounded-2xl max-w-7xl">
            <div className="mb-8 md:mb-16">
                <h6 className="text-lg text-indigo-600 font-medium text-center mb-2">FAQs</h6>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-manrope text-center font-bold text-gray-900 leading-tight">
                    Frequently Asked Questions
                </h2>
            </div>

            <div className="accordion-group space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index}
                         className="accordion py-4 px-4 md:py-6 md:px-6 border-b border-solid border-gray-200 transition-all duration-500 rounded-2xl hover:bg-indigo-100">
                        <button
                            className="accordion-toggle group inline-flex items-center justify-between leading-7 md:leading-8 text-gray-900 w-full transition duration-500 text-left hover:text-indigo-600"
                            onClick={() => toggleAccordion(index)}
                        >
                            <h5 className="text-sm md:text-base lg:text-lg pr-4">{faq.question}</h5>
                            <Image src={"/arrowDown.svg"} alt={"Arrow"} width={20} height={20}
                                   className={`transition duration-500 group-hover:text-indigo-600 flex-shrink-0 ${openAccordion === index ? 'rotate-180' : ''}`} />
                        </button>
                        <div
                            className={`accordion-content w-full overflow-hidden transition-all duration-500 ${openAccordion === index ? 'max-h-96 mt-4' : 'max-h-0'}`}
                        >
                            <p className="text-sm md:text-base text-gray-700 leading-6">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
