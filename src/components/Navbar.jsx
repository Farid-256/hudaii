'use client'
import { authClient, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
    const [manu, setManu] = useState(false)
    const pathName = usePathname()
    const { data: session } = useSession()
    const user = session?.user
    const router = useRouter()

    const handleManu = () => {
        setManu(!manu)
    }

    const handleManuClose = () => {
        setManu(false)
    }

    const handleLogout = async () => {
        await authClient.signOut()
        router.push('/auth/login')
    }

    return (
        <>
            {/* Main Navbar */}
            <section className="flex items-center justify-between px-5 md:px-10 lg:px-20 py-5 border-b border-amber-300 bg-amber-50 relative z-50">

                {/* Logo */}
                <div>
                    <Link href={'/'} className="flex gap-1 text-4xl hover:opacity-80 transition-opacity">
                        <h2 className="text-blue-500">h</h2>
                        <h2 className="text-blue-400">u</h2>
                        <h2 className="text-blue-300">d</h2>
                        <h2 className="text-blue-200">a</h2>
                        <h2 className="text-blue-100">i</h2>
                        <h2 className="text-blue-50">i</h2>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link className={`text-lg font-medium transition-colors hover:text-blue-600 ${pathName === '/' ? 'text-blue-800 font-bold' : 'text-gray-600'}`} href={'/'}>Home</Link>

                    <Link className={`text-lg font-medium transition-colors hover:text-blue-600 ${pathName === '/friends' ? 'text-blue-800 font-bold' : 'text-gray-600'}`} href={'/friends'}>Friends</Link>

                    <Link className={`text-lg font-medium transition-colors hover:text-blue-600 ${pathName === '/myProfile' ? 'text-blue-800 font-bold' : 'text-gray-600'}`} href={'/myProfile'}>My Profile</Link>

                    {
                        user ? <div>
                            <button onClick={handleLogout} className="bg-blue-800 text-lg text-white px-8 py-2 rounded-md transition-all cursor-pointer hover:bg-amber-400 hover:text-blue-800">Logout</button>
                        </div> : <div>
                            <Link href={'/auth/login'} className="bg-blue-800 text-lg text-white px-8 py-2 rounded-md transition-all cursor-pointer hover:bg-amber-400 hover:text-blue-800">Login</Link>
                        </div>
                    }
                </nav>

                {/* Mobile Menu Toggle Button */}
                <div className="md:hidden">
                    {
                        manu === false ?
                            <IoReorderThreeOutline className="text-3xl cursor-pointer text-gray-700" onClick={handleManu} /> :
                            <RxCross1 className="text-3xl cursor-pointer text-gray-700" onClick={handleManu} />
                    }
                </div>
            </section>

            {/* Mobile Dropdown Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${manu ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} bg-amber-50 border-b border-amber-300`}>
                <div className="flex flex-col px-5 py-4 gap-4 shadow-md">
                    <Link onClick={handleManuClose} className={`text-lg font-medium ${pathName === '/' ? 'text-blue-800 font-bold' : 'text-gray-600'}`} href={'/'}>Home</Link>

                    <Link onClick={handleManuClose} className={`text-lg font-medium ${pathName === '/friends' ? 'text-blue-800 font-bold' : 'text-gray-600'}`} href={'/friends'}>Friends</Link>

                    <Link onClick={handleManuClose} className={`text-lg font-medium ${pathName === '/myProfile' ? 'text-blue-800 font-bold' : 'text-gray-600'}`} href={'/myProfile'}>My Profile</Link>

                    {
                        user ? <div className="pt-2 border-t border-amber-200">
                            <button onClick={ ()=> {handleLogout(), handleManuClose()}}  className="block text-center w-full bg-blue-800 text-lg text-white px-8 py-2 rounded-md transition-all cursor-pointer hover:bg-amber-400 hover:text-blue-800">Logout</button>
                        </div> : <div className="pt-2 border-t border-amber-200">
                            <Link href={'/auth/login'} onClick={handleManuClose} className="block text-center w-full bg-blue-800 text-lg text-white px-8 py-2 rounded-md transition-all cursor-pointer hover:bg-amber-400 hover:text-blue-800">Login</Link>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;