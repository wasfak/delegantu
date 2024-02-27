import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/userActions";
import User from "@/models/userModel";

export default async function Home() {
  const user = await User.findOne({
    clerkId: "user_2cx0vOIbOrb2SR22PXrsVglmP2n",
  });

  console.log(user);
  return <h1>home page</h1>;
}
