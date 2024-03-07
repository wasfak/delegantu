"use client";
import { getTeamInfo } from "@/app/serverActions/getTeamMembers";
import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { Button } from "./ui/button";
import Image from "next/image";

export default function AssignModal({ isOpen, closeModal }) {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [team, setTeam] = useState([]);
  const [checkedMembers, setCheckedMembers] = useState({}); // Added state to track checked members

  useEffect(() => {
    setMounted(true);

    const fetchData = async () => {
      setLoading(true);

      try {
        const teamInfo = await getTeamInfo();
        setTeam(teamInfo);

        // Initialize all team members as unchecked
        const initialCheckState = {};
        teamInfo.forEach((member) => {
          initialCheckState[member._id] = false;
        });
        setCheckedMembers(initialCheckState);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (memberId) => {
    // Toggles the checked state of a member
    setCheckedMembers((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
  };

  const handelAssign = async () => {
    const selectedMemberIds = Object.keys(checkedMembers).filter(
      (memberId) => checkedMembers[memberId]
    );

    // Optionally, if you want to log the full details of selected members instead of just their IDs
    const selectedMembers = team.filter((member) =>
      selectedMemberIds.includes(member._id)
    );
  };

  /*   if (loading) {
    return <Loader />;
  }
 */
  if (!mounted) {
    return "";
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Panel className="w-full max-w-md bg-[#181818] text-white text-sm p-6 rounded-lg shadow flex flex-col justify-between">
          {" "}
          {/* Adjusted to flex container */}
          <div>
            <Dialog.Title className="text-lg font-bold">
              Assign Modal
            </Dialog.Title>
            <div className="mt-4">
              {team && team.length > 0
                ? team.map((member) => (
                    <div
                      key={member._id}
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex items-center gap-x-4">
                        <Image
                          src={member.photo}
                          alt={member.firstName}
                          width={45}
                          height={45}
                          className="rounded-full"
                        />
                        <h4>{member.firstName}</h4>
                      </div>

                      <input
                        type="checkbox"
                        checked={checkedMembers[member._id]}
                        onChange={() => handleCheckboxChange(member._id)}
                        className="mr-2"
                      />
                    </div>
                  ))
                : "No Team"}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button onClick={handelAssign}>Finish</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
