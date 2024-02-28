import User from "@/models/userModel";
import Image from "next/image";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  return <h1>home page</h1>;
}
