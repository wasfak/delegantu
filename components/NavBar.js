import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import img from "../public/logo.jpg";
const Navbar = () => {
  return (
    <nav className="bg-[#181818] text-white p-4 text-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link href="/">
            <Image src={img} alt="logo" width={90} height={50} priority />
          </Link>
        </div>

        {/* Links in the center */}
        <div className="hidden md:flex space-x-4">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>

        {/* Login/Logout on the right */}
        <div>
          <SignedOut>
            <Button>
              <Link href="/sign-in">Log In</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
