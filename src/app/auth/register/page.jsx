'use client'

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "react-toastify";

const Register = () =>{

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const userData = Object.fromEntries(formData.entries())

        if(userData.password !== userData.confirmPassword){
            toast.error('Password not match')
            return
        }

        const {data, error} = await authClient.signUp.email({
            name: userData.name,
            email: userData.email,
            password: userData.password
        })

        if(error){
            toast.error(error.message || 'Registation Failed')
        }

        if(data){
            // eslint-disable-next-line @next/next/no-location-assign-relative-destination
            window.location.href='/'
        }
}

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">

                {/* Header */}
                <div className="text-center mb-8">
                    <Link href={'/'} className="inline-flex gap-1 text-3xl mb-2">
                        <span className="text-blue-600">h</span>
                        <span className="text-blue-500">u</span>
                        <span className="text-blue-400">d</span>
                        <span className="text-blue-300">a</span>
                        <span className="text-blue-100">i</span>
                        <span className="text-blue-50">i</span>
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-800">Create an account</h2>
                    <p className="text-sm text-gray-500 mt-1">Join us and start sharing your thoughts!</p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Enter your name"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Create a strong password"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />

                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            placeholder="Confirm password"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={'w-full bg-blue-800 py-2.5 px-4 text-white font-semibold rounded-lg transition-all duration-200 cursor-pointer'}
                    > Register
                    </button>
                </form>

                {/* Footer Link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-blue-600 font-semibold hover:underline">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Register;