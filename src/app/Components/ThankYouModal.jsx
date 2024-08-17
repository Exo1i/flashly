'use client';
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {collection, getCountFromServer} from "firebase/firestore";
import {db} from "@/config/config";

const ThankYouModal = forwardRef(function ThankYouModal({}, ref) {
    const [isOpen, setIsOpen] = useState(false);
    const [userCount, setUserCount] = useState(0)

    useImperativeHandle(ref, () => ({
        openModal: () => setIsOpen(true)
    }));


    async function fetchCount(addOne = false) {
        const collectionRef = collection(db, "waitlist");

        const snapshot = await getCountFromServer(collectionRef)
        setUserCount(snapshot.data().count + 1)
    }

    const closeModal = () => {
        setIsOpen(false)
        fetchCount(false)
    };

    useEffect(() => {
        fetchCount(true);
    }, [])


    return (<>

        {isOpen && (<div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
                         aria-modal="true">
            <div
                className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"
                     onClick={closeModal}></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                      aria-hidden="true">&#8203;</span>

                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Thank You for Signing Up! 🎉
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        We&apos;re thrilled to have you on board! 😊
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        You&apos;ve joined a community of <span
                                        className="font-bold">{userCount}</span> amazing users! 🚀
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => {
                                closeModal()
                                window.open('/learn', '_self');
                            }}
                        >
                            Start Exploring 🌟
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>)}
    </>);
})

export default ThankYouModal;