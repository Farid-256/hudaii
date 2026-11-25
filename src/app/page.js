'use client'
import Image from "next/image"; // ছবি দেখানোর জন্য ইমপোর্ট
import { useEffect, useState } from "react";

const Home = () => {
  const [post, setPost] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/posts')
        const data = await res.json()
        setPost(data)
      } catch (error) {
        console.error("Failed to fetch posts:", error)
      }
    }
    fetchPost()
  }, [])

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Home Feed</h1>

      <div className="space-y-4">
        {post.length === 0 ? (
          <p className="text-center text-gray-500 py-5">No posts yet.</p>
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

export default Home;