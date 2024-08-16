"use client"
import {useState} from 'react';
import Image from "next/image";
import faqs from "@/app/Components/faq";

export default function FAQ() {
    // State to track which accordion is currently open
    const [openAccordion, setOpenAccordion] = useState(null);

    // Function to handle accordion toggle
    const toggleAccordion = (index) => {
        if (openAccordion === index) {
            setOpenAccordion(null); // Close if the same accordion is clicked again
        } else {
            setOpenAccordion(index); // Open the clicked accordion
        }
    };

    return (<div
        className="rounded-2xl bg-indigo-50  py-10 overflow-hidden mx-96 sm:mx-16 mb-40 mt-40 2xl:py-16 xl:py-8  lg:rounded-tl-2xl lg:rounded-bl-2xl ">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mb-16">
                <h6 className="text-lg text-indigo-600 font-medium text-center mb-2">FAQs</h6>
                <h2 className="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]">
                    Frequently Asked Questions
                </h2>
            </div>

            <div className="accordion-group">

                {...faqs.map((faqs, index) => (<div key={index}
                                                    className="accordion py-8 px-6 border-b border-solid border-gray-200 transition-all duration-500 rounded-2xl hover:bg-indigo-50">
                    <button
                        className="accordion-toggle group inline-flex items-center justify-between leading-8 text-gray-900 w-full transition duration-500 text-left hover:text-indigo-600"
                        onClick={() => toggleAccordion(index)}
                    >
                        <h5>{faqs.question}</h5>
                        <Image src={"/arrowDown.svg"} alt={"Arrow"} width={22} height={22}
                               className={`transition duration-500 group-hover:text-indigo-600 ${openAccordion === index ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                        className={`accordion-content w-full overflow-hidden transition-max-height duration-1000 ${openAccordion === index ? 'max-h-96' : 'max-h-0'}`}
                    >
                        <p className="text-base text-gray-900 leading-6">
                            {faqs.answer}
                        </p>
                    </div>
                </div>))}
            </div>
        </div>
    </div>);
}
