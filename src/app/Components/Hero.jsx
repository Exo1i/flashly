import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";

// Hero component
export default function Hero() {
    let CTA;

    if (!auth().userId) {
        CTA = (
            <SignInButton>
                <button
                    className="bg-blue-500 border-4 border-emerald-400/25 text-white font-bold py-2 px-4 rounded-full sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-[-5px_10px_30px_rgba(0,0,0,0.25)] gap-2 flex items-center justify-center transition-all duration-500 hover:bg-blue-700/80"
                >
                    Get Started!
                    <Image src={"/arrowRight.svg"} alt={"Arrow"} width={15} height={30} />
                </button>
            </SignInButton>
        );
    } else {
        CTA = (
            <a
                href={"/learn"}
                className="border-4 bg-indigo-700/80 border-blue-700/25 text-white font-bold px-4 py-6 rounded-full text-2xl md:text-3xl lg:text-4xl drop-shadow-[-5px_10px_30px_rgba(0,0,0,0.25)] gap-2 flex items-center justify-center transition-all duration-500 hover:bg-indigo-900/95"
            >
                Start Learning!
                <Image src={"/arrowRight.svg"} alt={"Arrow"} width={15} height={30} />
            </a>
        );
    }

    return (
        <div className="block lg:pl-8 h-full mt-5">
            <div className="rounded-2xl bg-indigo-50 px-4 sm:px-8 lg:px-24 py-8 overflow-hidden m-5 lg:m-0 lg:rounded-tl-2xl lg:rounded-bl-2xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-12 lg:gap-16">
                        <div className="w-full xl:col-span-5 lg:col-span-6">
                            <div className="flex items-center text-sm font-medium text-gray-500 justify-center lg:justify-start">
                                <span className="bg-indigo-600 py-1 px-3 rounded-2xl text-xs font-medium text-white mr-3">#1</span>
                                Flashcards App
                            </div>
                            <h1 className="py-2 text-center text-gray-900 font-bold text-4xl sm:text-5xl lg:text-left leading-tight sm:leading-normal">
                                Smart flashcards, smarter you.
                                <span className="text-indigo-600 block sm:inline"> Learn anything, anytime, anywhere.</span>
                            </h1>
                            <p className="text-center text-gray-600 font-medium text-base sm:text-lg lg:text-left max-w-md mx-auto lg:mx-0">
                                Flashly&apos;s AI-driven technology personalizes your learning experience, helping you master concepts faster, retain information longer, and optimize your study sessions.
                            </p>
                            <div className="flex flex-col justify-center items-center text-center space-y-2 mt-5">
                                {CTA}
                            </div>
                        </div>
                        <div className="w-full xl:col-span-7 lg:col-span-6">
                            <div className="w-full sm:w-auto lg:w-[60.8125rem] xl:ml-16">
                                <Image
                                    src="/testImage.jpg"
                                    alt="Hero Image"
                                    width={700}
                                    height={850}
                                    className="w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl border-8 border-blue-700/50 backdrop-blur-2xl drop-shadow-[-5px_40px_30px_rgba(0,0,0,0.25)] rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center text-center mt-20">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 mb-5">Join Our Waitlist 🎇 🎉</h1>
                <div className="p-1 my-6 flex flex-col md:flex-row items-center justify-center rounded-full shadow-md border border-transparent bg-gray-800 transition-all duration-500 hover:border-indigo-500 focus-within:border-indigo-500">
                    <input
                        type="text"
                        name="email"
                        placeholder="Join our full launch waitlist"
                        className="text-base rounded-t-full md:rounded-none md:rounded-l-full text-white py-3 px-6 bg-gray-700 placeholder:text-gray-300 focus:outline-none w-full"
                    />
                    <button
                        className="bg-indigo-500 rounded-b-full md:rounded-none md:rounded-r-full py-3 px-7 text-base font-semibold text-white hover:bg-indigo-600 transition-all duration-500 w-full md:w-auto"
                    >
                        Join Waitlist
                    </button>
                </div>
            </div>
        </div>
    );
}
