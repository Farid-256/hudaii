'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const UserPage = () => {
    const [post, setPost] = useState([])
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const fileInputRef = useRef(null);

    // Image upload to imgbb
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size must be less than 5MB');
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                { method: 'POST', body: formData }
            );
            const data = await res.json();

            if (data.success) {
                const url = data.data.url;
                setImageUrl(url);
                setImagePreview(url);
                toast.success('Image uploaded successfully!');
            } else {
                console.error(data);
                toast.error(data.error?.message || "Image upload failed");
            }
        } catch (error) {
            console.error(error);
            toast.error('Error uploading image. Please try again.');
        } finally {
            setUploading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const postData = Object.fromEntries(formData.entries())

        const dataSubmit = {
            content: postData.content,
            image: imageUrl,
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

                setImageUrl('');
                setImagePreview(null);
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

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ticket Image <span className="text-red-500">*</span>
                        </label>
                        <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center transition cursor-pointer
            ${imagePreview ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500'}`}
                            onClick={() => fileInputRef.current?.click()}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                            />

                            {uploading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <FaSpinner className="animate-spin text-blue-600" size={24} />
                                    <span className="text-gray-600">Uploading...</span>
                                </div>
                            ) : imagePreview ? (
                                <div className="relative">
                                    <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        width={200}
                                        height={150}
                                        className="mx-auto rounded-lg object-cover max-h-48"
                                        unoptimized
                                    />
                                    <p className="text-sm text-green-600 mt-2">✅ Image uploaded! Click to change</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <FaCloudUploadAlt size={48} className="text-gray-400" />
                                    <p className="text-gray-600">Click or drag to upload image</p>
                                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                                </div>
                            )}
                        </div>
                    </div>

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

                            {/* Header: Avatar & Date */}
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

                            {/* Post Text Content */}
                            <p className="text-gray-800 whitespace-pre-wrap">{singlePost.content}</p>

                            {/* Post Image (If Exists) */}
                            {singlePost.image && (
                                <div className="mt-3">
                                    <Image
                                        src={singlePost.image}
                                        alt="Post Image"
                                        width={800}
                                        height={500}
                                        className="rounded-lg object-cover w-full max-h-100 border border-gray-100"
                                        unoptimized
                                    />
                                </div>
                            )}

                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UserPage;