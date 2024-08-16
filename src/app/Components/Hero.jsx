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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                Get Started
            </button>
        </SignInButton>);
    } else {
        CTA = (<a href="/learn"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-[-5px_10px_30px_rgba(0,0,0,0.25)]">
            Start Learning
        </a>);
    }

    return (<div className="flex flex-col lg:flex-row justify-evenly items-center">
        {/* Display hero image */}
        <Image src="/testImage.jpg" alt="Hero Image" width={700} height={850}
               className="w-full  border-8 border-blue-700/50 backdrop-blur-2xl drop-shadow-[-5px_40px_30px_rgba(0,0,0,0.25)]  rounded-2xl max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl mr-12" />

        {/* Display main text and button */}
        <div className="text-center lg:text-center mt-8 lg:mt-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-10 font-sans" style={{color: "#4b4b4b"}}>
                Smart flashcards, smarter you.<br /> Learn anything, anytime, anywhere.
            </h1>

            {/* Call to action */}
            {CTA}
        </div>
    </div>);
}
