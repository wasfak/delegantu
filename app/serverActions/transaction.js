"use server";

import db from "@/db";
import User from "@/models/userModel";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export async function checkoutCredits(transaction) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const amount = Number(transaction.amount) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      buyerId: transaction.buyerId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  });
  redirect(session.url);
}

export async function createTransaction(transaction) {
  try {
    await db.connectDb();

    const newEndTrialDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

    await User.findOneAndUpdate(
      { clerkId: transaction.buyerId },
      {
        subscribed: true,
        endTrialDate: newEndTrialDate,
      },
      { new: true } // Returns the updated document
    );

    // Respond back to Stripe or your frontend
    return NextResponse.json({
      message: "Subscription updated successfully",
    });
  } catch (error) {
    console.error("Error updating user subscription:", error);
    return NextResponse.json({
      message: "Error updating subscription",
      error,
    });
  }
}
