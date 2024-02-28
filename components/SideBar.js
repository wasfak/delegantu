import db from "@/db";
import User from "@/models/userModel";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

import { IoHomeSharp } from "react-icons/io5";
import { ImCheckboxChecked } from "react-icons/im";
import { MdOutlineCallMissedOutgoing } from "react-icons/md";

export default async function SideBar() {
  const { userId } = auth();
  await db.connectDb();
  const user = await User.findOne({ clerkId: userId });

  return (
    <div className="bg-[#212121] flex items-center flex-col rounded-xl p-4 h-[80vh] text-sm">
      <div className="flex items-center justify-between gap-x-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <h2>{user.username || ""}</h2>
      </div>
      {/* Adjusted alignment here */}
      <div className="flex flex-col items-start justify-between gap-y-4 mt-32 text-left">
        <div className="flex items-center gap-x-4">
          <IoHomeSharp />
          <Link href="/">All Tasks</Link>
        </div>
        <div className="flex items-center gap-x-4">
          <ImCheckboxChecked />
          <Link href="/">Completed Tasks</Link>
        </div>
        <div className="flex items-center gap-x-4">
          <MdOutlineCallMissedOutgoing />
          <Link href="/">On going Tasks</Link>
        </div>
      </div>
    </div>
  );
}
