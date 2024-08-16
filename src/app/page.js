import Header from "@/app/Components/Header";
import Hero from "@/app/Components/Hero";
import Reviews from "@/app/Components/Reviews";
import FAQ from "@/app/Components/FAQ";
import Statistics from "@/app/Components/Statistics";

export default async function Home() {
    return (<>
        <main className="flex flex-col min-h-screen px-10">
            <Header />
            <div className="flex-grow flex items-center justify-center">
                <Hero />
            </div>
        </main>
        <Reviews />
        <Statistics />
        <FAQ />
    </>);
}