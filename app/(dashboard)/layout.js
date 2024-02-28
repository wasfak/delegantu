import SideBar from "@/components/SideBar";

export const metadata = {
  title: "Delegantu",
  description: "fast and efficient way to plan the work",
};

export default function DashBoardLayout({ children }) {
  return (
    <div className="p-2 mx-10">
      <div className="flex gap-x-8">
        <SideBar />
        {children}
      </div>
    </div>
  );
}
