"use client"

const loginButtonClass = "cursor-pointer text-white font-bold ease-in-out rounded-2xl bg-linear-to-br from-green-400 to-blue-600 hover:bg-linear-to-bl focus:outline-none rounded-base text-sm px-20 py-2.5 text-center";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <>
            <div className="flex min-h-screen bg-[#f2f5ff] ">

                {/* left */}
                <div className="w-[60%] bg-blue-600">
                    {/* image */}
                </div>

                {/* right */}
                <div className="w-[40%] bg-blue-500 flex flex-col items-center justify-center">
                    {children}
                </div>

            </div >
        </>
    )
}