import {currentUser} from "@clerk/nextjs/server";
import {SignedIn, UserButton} from "@clerk/nextjs";


export default async function Header() {
    const userObj = await currentUser()
    return (<div className="flex flex-col md:flex-row justify-between items-center mt-4">
        <div className=" font-bold text-blue-800 text-4xl  lg:text-left sm:text-center">
            Flashly
        </div>
        <div
            className="flex items-center justify-center lg:justify-end gap-2 text-lg font-semibold text-blue-800 hidden lg:flex">
            <div>
                {userObj ? `Welcome back, ${userObj.fullName}` : "Welcome to Flashly"}
            </div>
            {userObj && <UserButton />}
        </div>
        <div className={"lg:hidden md:block hidden"}>
            <SignedIn>
            <UserButton />
        </SignedIn></div>

    </div>);
}
