'use client';

import {addDoc, collection} from 'firebase/firestore';
import {useRef, useState} from 'react';
import {db} from "@/config/config";
import ThankYouModal from "@/app/Components/ThankYouModal";

export default function JoinWaitlistButton({userId}) {
    const [email, setEmail] = useState('');
    const collectionRef = collection(db, "waitlist");


    const modalOpenRef = useRef();

    const handleSubmit = async (e) => {
        try {
            await addDoc(collectionRef, {
                email: email,
                userId: userId,
                timestamp: new Date()
            });
            setEmail('');
            modalOpenRef.current.openModal();
        } catch (e) {
            console.error('Error adding document: ', e);
        }

    };

    return (
        <div className="flex flex-col items-center text-center mt-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 mb-5">Join Our Waitlist 🎇 🎉</h1>
            <div
                className="p-1 my-6 flex flex-col md:flex-row items-center justify-center rounded-full shadow-md border border-transparent bg-gray-800 transition-all duration-500 hover:border-indigo-500 focus-within:border-indigo-500">
                <input
                    type="text"
                    name="email"
                    placeholder="Join our full launch waitlist"
                    className="text-base rounded-t-full md:rounded-none md:rounded-l-full text-white py-3 px-6 bg-gray-700 placeholder:text-gray-300 focus:outline-none w-full"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <button onClick={handleSubmit}
                        className="bg-indigo-500 rounded-b-full md:rounded-none md:rounded-r-full py-3 px-7 text-base font-semibold text-white hover:bg-indigo-600 transition-all duration-500 w-full md:w-auto"
                >
                    Join
                </button>
            </div>
            <ThankYouModal ref={modalOpenRef} />
        </div>


    )
        ;
}