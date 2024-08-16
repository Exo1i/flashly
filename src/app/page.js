import Header from "@/app/Components/Header";
import Hero from "@/app/Components/Hero";
import Testimonials from "@/app/Components/Testimonials";
import TrustUsSection from "@/app/Components/TrustUsSection";
import Statistics from "@/app/Components/Statistics";
import Features from "@/app/Components/Features";
import FAQ from "@/app/Components/FAQ";

export default async function Home() {
    return (<>
        <main className="flex flex-col min-h-screen px-8">
            <Header />
            <div className="flex-grow flex items-center justify-center">
                <Hero />
            </div>
        </main>
        <Features />
        <Testimonials />
        <Statistics />
        <FAQ />
        <TrustUsSection />
    </>);
}