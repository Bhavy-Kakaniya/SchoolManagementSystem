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

            </div>
        </>
    )
}