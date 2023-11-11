"use client"

import ProfileForm from "@/components/ProfileForm";
import { UserType } from "@/interfaces/user";
import { fetchUser } from "@/utils/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    fetchUser().then((result) => {
      setUser(result.data)
    }).catch((err) => {
      toast.error(`${err.response?.data?.errors ?? ''}`, {
        theme: 'dark',
        autoClose: 2000
      })
    });
  }, [])

  return (
    <div className="mt-6">
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
        <div className="text-gray-600">
          <p className="font-medium text-lg">Profile Details</p>
          <p>Please fill out all the fields.</p>
        </div>

        <div className="lg:col-span-2">
          <ProfileForm user={user} />
        </div>
      </div>
    </div>
  );
}
