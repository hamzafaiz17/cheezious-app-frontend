"use client";
import React, { useRef, useState, useEffect } from "react";
import { getUserIdFromToken } from "@/hooks/fetch-userid-token";
import updateUser from "@/app/api/user/updateuser";
import { Loader2 } from "lucide-react";
import { Toaster } from "sonner";
export default function EditProfile() {
  let token = localStorage.getItem("token");
  let userid = getUserIdFromToken(token);
  let [loading, setLoading] = useState(false);
  const apiEndpoint =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    process.env.NEXT_PUBLIC_API_VERSION +
    "auth/me/" +
    userid;
  const apiEndpointUpdate =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    process.env.NEXT_PUBLIC_API_VERSION +
    "auth/user-update/" +
    userid;

  let userexists = localStorage.getItem("user");
  userexists = JSON.parse(userexists);
  const [selectedImage, setSelectedImage] = useState(
    userexists ? userexists.profilepic : "/uploads/images/default-profile.svg"
  );

  let [user, setUser] = useState({
    profilePic: userexists.profilePic || "/uploads/images/default-profile.svg",
    name: userexists.name || "",
    email: userexists.email || "",
    dateOfBirth: userexists.dateOfBirth
      ? new Date(userexists.dateOfBirth).toISOString().split("T")[0]
      : "",
    default: userexists.profilePic || "/uploads/images/default-profile.svg",
  });
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setUser({ ...user, profilePic: file });
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="flex flex-col gap-5  p-4 max-w-sm mx-auto">
        <Toaster />
        <div className="grid grid-cols-1 items-center justify-center gap-4">
          <div
            onClick={handleClick}
            className="w-40 h-40  rounded-[50%] flex items-center justify-center cursor-pointer overflow-hidden m-auto"
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-sm">Click to select</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
        <div>
          <label htmlFor="">Full Name</label>
          <input
            type="text"
            placeholder="Name"
            className="py-4 bg-gray-100 px-3 rounded-md w-100"
            defaultValue={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="">Email Address</label>
          <input
            type="email"
            placeholder="Email"
            className="py-4 bg-gray-100 px-3 rounded-md w-100"
            defaultValue={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="">Date of Birthday</label>
          <input
            type="date"
            placeholder="Date of Birth"
            className="py-4 bg-gray-100 px-3 rounded-md w-100"
            defaultValue={user.dateOfBirth}
            onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="py-4 bg-yellow-500 rounded-md uppercase font-bold cursor-pointer hover:bg-[#8c8c8c] w-100"
          onClick={(e) => {
            e.preventDefault();
            updateUser(apiEndpointUpdate, user, setLoading);
          }}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" />
                Please wait
              </div>
            </>
          ) : (
            "Update"
          )}
        </button>
      </div>
    </>
  );
}
