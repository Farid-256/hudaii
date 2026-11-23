'use client'

import { toast } from "react-toastify";

const UserPage = () => {

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const postData = Object.fromEntries(formData.entries())

        const dataSubmit = {
            content: postData.content,
        }

        try {
            const res = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dataSubmit)
            })
            const data = await res.json()

            if(data.insertedId){
                toast.success('Data added successfully')
                e.target.reset()
            } else{
                toast.error('Failed to add Post')
            }
            
        } catch (error){
            console.error(error)
            toast.error('Something went wrong')
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">My Feed</h1>

            {/* Create Post Form */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <form onSubmit={handleSubmit}>
                    <textarea
                        name="content"
                        placeholder="What's on your mind?"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                        resize-none"
                        rows="3"
                        required
                    ></textarea>

                    <div className="flex justify-end mt-3">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors 
                            cursor-pointer">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserPage;