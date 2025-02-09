import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    const user = await currentUser();
    if (!user) return null;

    // Check if the user exists in the database
    let loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    // If user does not exist, create a new one
    if (!loggedInUser) {
      loggedInUser = await db.user.create({
        data: {
          clerkUserId: user.id,
          name: `${user.firstName} ${user.lastName}`,
          imageUrl: user.imageUrl,
          email: user.emailAddresses[0].emailAddress,
        },
      });
    }

    return loggedInUser;
  } catch (error) {
    console.error("Error in checkUser:", error);
    throw new Error(error.message);
  }
};
