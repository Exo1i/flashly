import Image from "next/image";
import {auth} from "@clerk/nextjs/server";
import {SignInButton} from "@clerk/nextjs";

// Hero component
export default function Hero() {
    let CTA;

    // Define the CTA based on the user's authentication status
    if (!auth().userId) {
        CTA = (<SignInButton>
            <button
                className=" bg-blue-500 border-4 border-emerald-400/25  text-white font-bold py-2 px-4 rounded-full sm:text-3xl md:text-4xl lg:text-4xl drop-shadow-[-5px_10px_30px_rgba(0,0,0,0.25)] gap-2 text-5xl flex items-center justify-center transition-all duration-500 hover:bg-blue-700/80"
            >
                Get Started!
                <Image src={"/arrowRight.svg"} alt={"Arrow"} width={15} height={30} />
            </button>
        </SignInButton>);
    } else {
        CTA = (<a href={"/learn"}
                  className="border-4 bg-indigo-700/80 border-blue-700/25   border-solid  text-white font-bold px-4 py-6 rounded-full text-3xl md:text-4xl lg:text-4xl drop-shadow-[-5px_10px_30px_rgba(0,0,0,0.25)] gap-2 flex items-center justify-center transition-all duration-500 hover:bg-indigo-900/95"
        >
            Start Learning!
            <Image src={"/arrowRight.svg"} alt={"Arrow"} width={15} height={30} />
        </a>);
    }

    return (<>
        <div className=" block lg:pl-8 h-full mt-5">
            <div
                className="rounded-2xl bg-indigo-50 px-24 py-10 overflow-hidden m-5 lg:m-0 2xl:py-12 xl:py-8  lg:rounded-tl-2xl lg:rounded-bl-2xl ">
                <div className="mx-auto max-w-7xl px-4 sm:px-1 lg:px-1">
                    <div className="grid grid-cols-1 gap-14 items-center lg:grid-cols-12 lg:gap32">
                        <div className="w-full xl:col-span-5 lg:col-span-6 2xl:-mx-5 xl:-mx-0">
                            <div
                                className="flex items-center text-sm font-medium text-gray-500 justify-center lg:justify-start">
                                <span
                                    className="bg-indigo-600 py-1 px-3 rounded-2xl text-xs font-medium text-white mr-3 ">#1</span>
                                Flashcards App
                            </div>
                            <h1 className="py-2 text-center text-gray-900 font-bold font-manrope text-5xl lg:text-left leading-[70px]">
                                Smart flashcards, smarter you.
                                <span
                                    className="text-indigo-600"> Learn anything, anytime, anywhere. Modern investor</span>
                            </h1>
                            <p
                                className="text-center text-gray-600 font-medium text-lg lg:text-left max-w-md mx-auto lg:mx-0">
                                Flashly&apos;s AI-driven technology personalizes your learning experience, helping you
                                master
                                concepts faster, retain information longer, and optimize your study sessions.</p>
                            <div className="flex flex-col justify-center items-center text-center space-y-2 m-5">
                                {/* Centered CTA */}
                                <div className={"mt-5"}>
                                    {CTA}
                                </div>

                            </div>

                        </div>
                        <div className="w-full xl:col-span-7  lg:col-span-6 block">
                            <div className="w-full  sm:w-auto lg:w-[60.8125rem] xl:ml-16">
                                <Image
                                    src="/testImage.jpg"
                                    alt="Hero Image"
                                    width={700}
                                    height={850}
                                    className="w-full border-8 border-blue-700/50 backdrop-blur-2xl drop-shadow-[-5px_40px_30px_rgba(0,0,0,0.25)] rounded-2xl max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl mr-12"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"flex flex-col items-center text-center mt-32"}>

                <h1 className={"text-5xl font-bold text-blue-800 mb-5"}> Join Our Waitlist 🎇 🎉
                </h1>


                {/* Email input and button */}
                <div
                    className=" p-1 my-6 flex flex-col md:flex-row items-center h-auto md:h-auto justify-center rounded-full md:shadow-[0px 15px 30px -4px rgba(16, 24, 40, 0.03)] border border-transparent md:bg-gray-800 transition-all duration-500 hover:border-indigo-500 focus-within:border-indigo-500"
                >
                    <input
                        type="text"
                        name="email"
                        placeholder="Join our full launch waitlist"
                        className="text-base md:rounded-full rounded-t-full text-white py-3 px-6 shadow-[0px 15px 30px -4px rgba(16, 24, 40, 0.03)] md:shadow-none bg-gray-700 md:bg-transparent placeholder:text-gray-300 focus:outline-none w-full"
                    />
                    <button
                        className="bg-indigo-500 md:rounded-full rounded-b-full py-3 px-7 text-base font-semibold text-white hover:bg-indigo-600 cursor-pointer transition-all duration-500 w-full md:w-auto"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>


    </>);
}
