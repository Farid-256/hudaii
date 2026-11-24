'use client'

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserPage = () => {
    const [post, setPost] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const postData = Object.fromEntries(formData.entries())

        const dataSubmit = {
            content: postData.content,
            createdAt: new Date().toISOString()
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

            if (data.insertedId) {
                toast.success('Data added successfully')
                e.target.reset()
            } else {
                toast.error('Failed to add Post')
            }

        } catch (error) {
            console.error(error)
            toast.error('Something went wrong')
        }
    }

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/posts')
                const data = await res.json()
                setPost(data)

            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        }
        fetchPost()
    }, [])

    return (
        <div className="max-w-2xl mx-auto sticky top-0 bg-gray-50 z-10 pb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">My Feed</h1>

            {/* Create Post Form */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <form onSubmit={handleSubmit}>
                    <textarea
                        name="content"
                        placeholder="What's on your mind?"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows="3"
                        required
                    ></textarea>

                    <div className="flex justify-end mt-3">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                            Post
                        </button>
                    </div>
                </form>
            </div>

            {/* Display Posts Section */}
            <div className="mt-8 space-y-4">
                {post.length === 0 ? (
                    <p className="text-center text-gray-500 py-5">No posts yet. Be the first to post!</p>
                ) : (
                    post.map((singlePost) => (
                        <div key={singlePost._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                                    U
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">User</h3>
                                    <p className="text-xs text-gray-500">
                                        {singlePost.createdAt ? new Date(singlePost.createdAt).toLocaleDateString() : 'Just now'}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-800 whitespace-pre-wrap">{singlePost.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UserPage;