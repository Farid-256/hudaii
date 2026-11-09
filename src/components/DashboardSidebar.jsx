import Link from "next/link";


const DashboardSidebar = () => {
    return (
        <div>
            <aside className="w-64 bg-white border-r border-gray-200 p-5 hidden md:block min-h-screen">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h2>
                <nav className="flex flex-col gap-4">
                    <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">
                        My Feed
                    </Link>
                    <Link href="/dashboard/profile" className="text-gray-600 hover:text-blue-600 font-medium">
                        Profile
                    </Link>
                    <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium mt-10">
                        Back to Home
                    </Link>
                </nav>
            </aside>
        </div>
    );
};

export default DashboardSidebar