import Image from "next/image";
import {auth} from "@clerk/nextjs/server";
import {SignInButton} from "@clerk/nextjs";
import JoinWaitlistButton from "@/app/Components/JoinWaitList";

// Hero component
export default function Hero() {
    let CTA;

    if (!auth().userId) {
        CTA = (<SignInButton>
                <button
                    className="bg-blue-500 border-4 border-emerald-400/25 text-white font-bold py-2 px-4 rounded-full sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-[-5px_10px_30px_rgba(0,0,0,0.25)] gap-2 flex items-center justify-center transition-all duration-500 hover:bg-blue-700/80"
                >
                    Get Started!
                    <Image src={"/arrowRight.svg"} alt={"Arrow"} width={15} height={30} />
                </button>
            </SignInButton>);
    } else {
        CTA = (<a
                href={"/learn"}
                className="border-4 bg-indigo-700/80 border-blue-700/25 text-white font-bold px-4 py-4 rounded-full text-2xl md:text-3xl lg:text-4xl drop-shadow-[-5px_10px_30px_rgba(0,0,0,0.25)] gap-2 flex items-center justify-center transition-all duration-500 hover:bg-indigo-900/95"
            >
                Start Learning!
                <Image src={"/arrowRight.svg"} alt={"Arrow"} width={15} height={30} />
            </a>);
    }

    return (<div className="block lg:pl-8 h-full mt-5">
            <div
                className="rounded-2xl bg-indigo-50 px-4 sm:px-8 lg:px-24 py-8 overflow-hidden m-5 lg:m-0 lg:rounded-tl-2xl lg:rounded-bl-2xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-12 lg:gap-16">
                        <div className="w-full xl:col-span-5 lg:col-span-6">
                            <div
                                className="flex items-center text-sm font-medium text-gray-500 justify-center lg:justify-start">
                                <span
                                    className="bg-indigo-600 py-1 px-3 rounded-2xl text-xs font-medium text-white mr-3">#1</span>
                                Flashcards App
                            </div>
                            <h1 className="py-2 text-center text-gray-900 font-bold md:text-5xl text-2xl lg:text-left leading-tight sm:leading-normal">
                                Smart flashcards, smarter you.
                                <span
                                    className="text-indigo-600 block sm:inline"> Learn anything, anytime, anywhere.</span>
                            </h1>
                            <p className="text-center text-gray-600 font-medium text-base sm:text-lg lg:text-left max-w-md mx-auto lg:mx-0">
                                Flashly&apos;s AI-driven technology personalizes your learning experience, helping you
                                master concepts faster, retain information longer, and optimize your study sessions.
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

            <JoinWaitlistButton userId={auth().userId} />
        </div>);
}
