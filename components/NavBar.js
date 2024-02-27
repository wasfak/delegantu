import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link href="/">Logo</Link>
        </div>

        {/* Links in the center */}
        <div className="hidden md:flex space-x-4">
          <Link href="/about">About</Link>
          <Link href="/services">Service</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Login/Logout on the right */}
        <div>
          <SignedOut>
            <Button>
              <Link href="/sign-in">Log In</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" showName />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
