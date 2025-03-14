"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IoArrowBackSharp, IoPersonCircle, IoMail, IoCamera } from "react-icons/io5";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../../graphql/queries/user";
import { UPDATE_USER } from "../../graphql/queries/updateUser";
import Cookies from "js-cookie";

const EditProfilePage = () => {
  const userId =Cookies.get("userId"); 
  
  const { data, loading, error } = useQuery(GET_USER, { variables: { userId } });
  const [updateUser] = useMutation(UPDATE_USER);

  const [form, setForm] = useState({ name: "", email: "", avatar: "/default-avatar.png" });
  const [originalForm, setOriginalForm] = useState({ name: "", email: "", avatar: "/default-avatar.png" });

  useEffect(() => {
    if (data?.user) {
      setForm({
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar || "/default-avatar.png",
      });
      setOriginalForm({
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar || "/default-avatar.png",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFields = Object.keys(form).reduce((acc, key) => {
      if (form[key as keyof typeof form] !== originalForm[key as keyof typeof originalForm]) {
        acc[key as keyof typeof form] = form[key as keyof typeof form];
      }
      return acc;
    }, {} as Partial<typeof form>);




    if (Object.keys(updatedFields).length === 0) return;



    try {
      await updateUser({ variables: {
           id: userId,
           ...updatedFields } });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };



  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error loading profile!</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white px-6">
      <div className="w-full max-w-lg p-8 bg-gray-800 rounded-2xl shadow-2xl">
        <div className="flex items-center mb-6">
          <Link href="/settings">
            <IoArrowBackSharp className="text-2xl text-gray-400 hover:text-white cursor-pointer" />
          </Link>
          <h2 className="text-2xl font-semibold mx-auto">Edit Profile</h2>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <Image
              src={form.avatar}
              alt="Avatar"
              width={112} // 28*4
              height={112} // 28*4
              className="rounded-full border-4 border-gray-700 shadow-lg"
             
            />
            <label className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-full cursor-pointer">
              <IoCamera className="text-white text-lg" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        setForm({ ...form, avatar: event.target.result.toString() });
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <IoPersonCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full pl-10 mt-1 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div className="relative">
            <IoMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 mt-1 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 hover:bg-blue-500 text-lg font-semibold rounded-lg transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
