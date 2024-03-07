"use client";
import { SignedIn } from "@clerk/nextjs";

import Link from "next/link";

import { IoHomeSharp } from "react-icons/io5";
import { ImCheckboxChecked } from "react-icons/im";
import { MdOutlineCallMissedOutgoing } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

export default function SideBar() {
  const [mounted, setMounted] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  if (!mounted) {
    return "";
  }

  const profileImageUrl = user.profileImageUrl;

  return (
    <div className="bg-[#212121] flex items-center flex-col rounded-xl p-4 h-[80vh] text-sm">
      <div className="flex items-center justify-between gap-x-4">
        <SignedIn>
          <div>
            {profileImageUrl ? (
              <Image
                src={profileImageUrl}
                alt="User Profile"
                width={45}
                height={45}
                className="rounded-full"
              />
            ) : (
              <p>No profile image available</p>
            )}
          </div>
        </SignedIn>
      </div>

      {/* Adjusted alignment here */}
      <div className="flex flex-col items-start justify-between gap-y-4 mt-32 text-left">
        <div className="flex items-center gap-x-4">
          <IoHomeSharp />
          <Link href="/dashboard">All Tasks</Link>
        </div>

        <div className="flex items-center gap-x-4">
          <MdOutlineCallMissedOutgoing />
          <Link href="/dashboard/tasks/in_progress">On going Tasks</Link>
        </div>
        <div className="flex items-center gap-x-4">
          <ImCheckboxChecked />
          <Link href="/dashboard/tasks/completed">Completed Tasks</Link>
        </div>
        <div className="flex items-center gap-x-4">
          <FaUserTie />

          <Link href="/dashboard/user">User info</Link>
        </div>
        <div className="flex items-center gap-x-4">
          <RiTeamFill />

          <Link href="/dashboard/employee">Team</Link>
        </div>
      </div>
    </div>
  );
}
