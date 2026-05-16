import InputFieldTag from "@/components/InputField";
import Link from "next/link";

export default function ResetPage() {
    const loginButtonClass = "cursor-pointer text-white font-bold ease-in-out rounded-2xl bg-linear-to-br from-green-400 to-blue-600 hover:bg-linear-to-bl focus:outline-none rounded-base text-sm px-20 py-2.5 text-center";

    return (
        <>
            <div>
                <div className="p-2">
                    <div className="text-5xl text-center p-2 rounded-t-md bg-amber-400">Reset Password</div>
                    <div className="bg-amber-100 p-4 rounded-b-md w-fit">

                        <form>

                            <div className="m-2">
                                <InputFieldTag
                                    type="email"
                                    required={true}
                                    label="Email Address"
                                    margin="dense"
                                    color="secondary"
                                    width="480px"
                                />
                            </div>

                            <div className="text-right p-2 text-blue-800 underline">
                                <Link href="/login">Login</Link>
                            </div>

                            <div>
                                <div className="flex align-center justify-center">
                                    <button type="button" className={loginButtonClass}>Reset</button>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}