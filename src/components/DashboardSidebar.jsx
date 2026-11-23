'use client'
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { useState, useEffect } from "react";

const DashboardSidebar = () => {
    const adminMenu = [
        { icon: <FaHome />, href: '/dashboard', label: 'Admin Feed' },
        { icon: <CgProfile />, href: '/dashboard/admin', label: 'Admin Profile' }
    ]

    const userMenu = [
        { icon: <FaHome />, href: '/dashboard', label: 'My Feed' },
        { icon: <CgProfile />, href: '/dashboard/user', label: 'My Profile' }
    ]

    const { data: session, isPending } = useSession()
    const role = session?.user?.role

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted || isPending) {
        return (
            <aside className="w-64 bg-white border-r border-gray-200 p-5 hidden md:block min-h-screen">
                <p>Loading...</p>
            </aside>
        );
    }

    const navLink = role === 'admin' ? adminMenu : userMenu;

    return (
        <div>
            <aside className="w-64 bg-white border-r border-gray-200 p-5 hidden md:block min-h-screen">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h2>
                
                <nav className="flex flex-col gap-4">
                    {navLink.map((item, index) => (
                        <Link 
                            key={index} 
                            href={item.href} 
                            className="flex items-center gap-3 text-gray-600 hover:text-blue-600 font-medium"
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}

                    <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium mt-10 pt-4 border-t border-gray-100">
                        Back to Home
                    </Link>
                </nav>
            </aside>
        </div>
    );
};

export default DashboardSidebar;