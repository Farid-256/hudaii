'use client'
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const DashboardRedirect = () => {
    const {data: session, isPending} = useSession()
    const userData = session?.user
    const router = useRouter()

    useEffect(() =>{
        if(isPending) return

        if(!userData){
            router.push('/auth/login')
            return
        }

        if(userData.role === 'admin'){
            router.push('/dashboard/admin')
        }
        else if(userData.role === 'user'){
            router.push('/dashboard/user')
        }
    }, [isPending, router, userData])
    return (
        <div>
            <h3>Redirecting...</h3>
        </div>
    );
};

export default DashboardRedirect;