"use server";

import db from "@/db";

import User from "@/models/userModel";

export const getTeamInfo = async () => {
  const bossId = process.env.BOSS_ID;
  try {
    await db.connectDb();
    const team = await User.find({ bossId, userStatus: "employee" });
    console.log(team);
    return JSON.parse(JSON.stringify(team));
  } catch (error) {
    console.error("Error fetching user information:", error);
  }
};

export async function createTeamMember(user) {
  const bossId = process.env.BOSS_ID;
  try {
    await db.connectDb();

    const newTeam = await User.create(user);

    return JSON.parse(JSON.stringify(newTeam));
  } catch (error) {
    console.log(error);
  }
}
