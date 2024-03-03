import User from "@/models/userModel";
import { NextResponse } from "next/server";
import stripe from "stripe";

export async function POST(request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    const transaction = {
      stripeId: id,
      amount: amount_total ? amount_total / 100 : 0,
      plan: metadata?.plan || "",
      buyerId: metadata?.buyerId || "",
      createdAt: new Date(),
    };

    const newEndTrialDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

    try {
      // Find the user by clerkId (buyerId) and update
      await User.findOneAndUpdate(
        { clerkId: buyerId },
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

  return new Response("", { status: 200 });
}
