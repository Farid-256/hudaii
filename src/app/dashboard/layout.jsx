import DashboardSidebar from "@/components/DashboardSidebar";


const DashboardLayout = ({children}) => {
    return (
        <div className="flex min-h-screen bg-gray-50">
           <DashboardSidebar></DashboardSidebar>
            <main className="flex-1 p-5 md:p-10">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;