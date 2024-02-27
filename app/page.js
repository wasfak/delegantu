import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/userActions";
import User from "@/models/userModel";

export default async function Home() {
  return <h1>home page</h1>;
}
