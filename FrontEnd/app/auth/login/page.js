import Link from "next/link"

export default function login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#474747] via-[#3b3b3b] to-[#0e0e0e] bg-[length:400%_400%] animate-gradient-move p-4">
            <div className="flex flex-col items-center justify-center w-full max-w-[450px] h-[450px] mx-auto mt-[1%] p-10 pb-10 bg-[#474747] opacity-90 text-white rounded-[10px] text-[20px] shadow-2xl">
                
                <Link href="/" className="text-white no-underline mb-5 text-[16px] self-start transition-colors duration-300 hover:text-[#ccc]">&larr; Back</Link>
                <h1 className="text-white no-underline mb-[30px] font-bold text-4xl">Login</h1>
                <input type="text" placeholder="Username/Email" className="mb-[15px] bg-white p-2 w-full text-[16px] rounded-[5px] border-none text-black transition-all duration-300 ease-in-out hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] focus:outline-none focus:-translate-y-[3px] focus:shadow-[0_8px_20px_rgba(0,0,0,0.25)]" />
                <input type="password" placeholder="Password" className="mb-[20px] bg-white p-2 w-full text-[16px] rounded-[5px] border-none text-black transition-all duration-300 ease-in-out hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] focus:outline-none focus:-translate-y-[3px] focus:shadow-[0_8px_20px_rgba(0,0,0,0.25)]" />
                <button className="mb-[20px] p-2 w-full bg-[#2f2f2f] text-white border-none rounded-[5px] cursor-pointer text-[18px] transition-colors duration-300 hover:bg-[#3a3a3a]">Login</button>
                <Link href="./register" className="text-white no-underline mt-[10px] text-[16px] transition-colors duration-300 hover:text-[#ccc]">Don&apos;t have an account? Register</Link>
            </div>
        </div>
    )
}