import {auth} from "@clerk/nextjs/server";
import {SignInButton} from "@clerk/nextjs";
import Image from "next/image";

export default function Features() {
    return (<section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-4 lg:px-8">
            <div className="mb-12 text-center">
                <div
                    className="py-4 px-8 inline-flex gap-x-2 items-center text-4xl bg-indigo-100 rounded-full font-medium text-indigo-600 text-center">
                    <span className="mr-2">Features</span>
                    <Image src="/awardIcon.svg" alt="Award" width={35} height={35} />
                </div>

                <div
                    className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mt-6 mb-2 w-full lg:mx-auto">
                    Powered by AI for Smarter, More Efficient Learning
                </div>
                <p className="text-base font-normal text-gray-500 lg:max-w-2xl lg:mx-auto mb-8">
                    Flashly&apos;s AI-driven technology personalizes your learning experience, helping you master
                    concepts faster, retain information longer, and optimize your study sessions.
                </p>
                <div
                    className="flex flex-col justify-center md:flex-row gap-5 max-w-lg mx-auto md:max-w-2xl lg:max-w-full">

                    {(!auth().userId) ? (<SignInButton>
                        <a
                            href="#"
                            className="cursor-pointer bg-indigo-600 py-3 px-6 rounded-full flex items-center justify-center text-sm font-semibold text-white transition-all duration-500 focus:outline-none hover:bg-indigo-700"
                        >
                            Get started
                        </a>
                    </SignInButton>) : <a
                        href="/learn"
                        className="cursor-pointer bg-indigo-50 py-3 px-6 rounded-full flex items-center justify-center text-sm font-semibold text-indigo-600 transition-all duration-500 focus:outline-none hover:bg-indigo-100"
                    >
                        Start Learning
                    </a>}
                </div>
            </div>

            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-lg mx-auto md:max-w-2xl lg:max-w-full">
                {/* Feature 1 */}
                <div className="relative w-full h-auto md:col-span-2">
                    <div className="bg-gray-800 rounded-2xl flex justify-between flex-row flex-wrap">
                        <div className="p-5 xl:p-8 w-full md:w-1/2">
                            <div className="block">
                                <svg
                                    width="30"
                                    height="55"
                                    viewBox="0 0 30 30"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15 12.5V18.75M18.75 2.5L11.25 2.5M15 28.75C8.7868 28.75 3.75 23.7132 3.75 17.5C3.75 11.2868 8.7868 6.25 15 6.25C21.2132 6.25 26.25 11.2868 26.25 17.5C26.25 23.7132 21.2132 28.75 15 28.75Z"
                                        stroke="white"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold xl:text-xl text-white py-5 w-full xl:w-64">
                                Personalized Study Plans with AI Insights
                            </h3>
                            <p className="text-xs font-normal text-gray-300 w-full mb-8 xl:w-64">
                                Leverage AI to generate personalized study paths tailored to your learning pace and
                                strengths, ensuring maximum retention and mastery.
                            </p>

                        </div>
                        <div className="relative hidden h-auto md:w-1/2 md:block">
                            <Image
                                src="https://pagedone.io/asset/uploads/1695028873.png"
                                alt="Header tailwind Section"
                                width={258}
                                height={302}
                                className="h-full ml-auto"
                            />
                        </div>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="relative w-full h-auto">
                    <div className="bg-indigo-500 rounded-2xl p-5 xl:p-8 h-full">
                        <div className="block">
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M24.6429 11.4286C24.6429 14.3872 20.2457 16.7857 14.8214 16.7857C9.3972 16.7857 5 14.3872 5 11.4286M24.6429 16.7857C24.6429 19.7444 20.2457 22.1429 14.8214 22.1429C9.3972 22.1429 5 19.7444 5 16.7857M24.6429 22.1429C24.6429 25.1015 20.2457 27.5 14.8214 27.5C9.3972 27.5 5 25.1015 5 22.1429M24.6429 6.96429C24.6429 9.42984 20.2457 11.4286 14.8214 11.4286C9.3972 11.4286 5 9.42984 5 6.96429C5 4.49873 9.3972 2.5 14.8214 2.5C20.2457 2.5 24.6429 4.49873 24.6429 6.96429Z"
                                    stroke="white"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                ></path>
                            </svg>
                        </div>
                        <h3 className="py-5 text-white text-lg font-bold xl:text-xl">
                            Smart Data-Driven Progress Tracking
                        </h3>
                        <p className="text-xs font-normal text-white mb-8">
                            Track your performance over time with data-backed insights, identifying trends that
                            highlight your progress and areas for improvement.
                        </p>

                    </div>
                </div>

                {/* Feature 3 */}
                <div className="relative w-full h-auto">
                    <div className="bg-violet-500 rounded-2xl p-5 xl:p-8 h-full">
                        <div className="block">
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M26.7301 15.661C26.7301 22.1995 21.306 27.5 14.8651 27.5C8.4242 27.5 3 22.1995 3 15.661C3 9.12254 8.4242 3.82202 14.8651 3.82202C16.5013 3.82202 18.0498 4.15472 19.4662 4.74812"
                                    stroke="white"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M27.0002 2.5L19.6611 9.43956"
                                    stroke="white"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                            </svg>
                        </div>
                        <h3 className="py-5 text-white text-lg font-bold xl:text-xl">
                            AI-Generated Content to Test Knowledge
                        </h3>
                        <p className="text-xs font-normal text-white mb-8">
                            Automatically generate quizzes and flashcards based on the material you’ve studied,
                            allowing for comprehensive self-assessment.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    </section>);
}
