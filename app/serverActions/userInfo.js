"use server";

import db from "@/db";
import User from "@/models/userModel";
import { auth } from "@clerk/nextjs";

export const getUserInfo = async () => {
  const { userId } = auth();
  try {
    await db.connectDb();
    const user = await User.findOne({ clerkId: userId });
    console.log(user);

    // Calculate remaining trial time
    const remainingTrialTime = calculateRemainingTrialTime(user.endTrialDate);

    return {
      endTrialDate: user.endTrialDate,
      remainingTrialTime,
    };
  } catch (error) {
    console.error("Error fetching user information:", error);
  }
};

const calculateRemainingTrialTime = (endTrialDate) => {
  const now = new Date();
  const trialEndDate = new Date(endTrialDate);

  const timeDiff = trialEndDate - now;

  if (timeDiff < 0) {
    return "Trial period has ended";
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  return `${days} Days, ${hours} Hours, ${minutes} Minutes remaining`;
};
