import Image from "next/image";
import testimonials from "@/app/Components/testimonials";

export default async function Reviews() {
    let fetchedUsers = await fetch("https://randomuser.me/api/?results=6")

    let userData = await fetchedUsers.json()
    return <div className={"flex flex-col items-center"}>
        <h1 className={"text-5xl font-bold text-blue-800 mb-10"}>Reviews</h1>

        <div
            className="grid mb-10 border border-blue-200 rounded-lg shadow-sm dark:border-blue-500 md:mb-12 md:grid-cols-2 bg-white dark:bg-blue-800 px-10">
            {userData.results.map((user, index) => (<figure key={index}
                                                            className="flex flex-col items-center justify-center p-8 text-center bg-white border-blue-200 rounded-b-lg md:rounded-se-lg dark:bg-blue-800 dark:border-blue-700">
                <blockquote className="max-w-2xl mx-auto mb-4 text-blue-500 lg:mb-8 dark:text-blue-500">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-white">{testimonials[index].Title}</h3>
                    <p className="my-4 text-white">{testimonials[index].Text}</p>
                </blockquote>
                <figcaption className="flex items-center justify-center ">
                    <Image className="rounded-full"
                           width={48}
                           height={48}
                           src={user.picture.thumbnail}
                           alt="profile picture" />
                    <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                        <div>{user.name.first} {user.name.last}</div>
                    </div>
                </figcaption>
            </figure>))}
        </div>
    </div>
}