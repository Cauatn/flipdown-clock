import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { db } from "@/db/db";
import { usersTable, studyTimesTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { saveStudyTime } from "@/hooks/saveStudyTime";

function useSyncUserToDb() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isSignedIn || !user) return;

    const syncUser = async () => {
      // Ensure the user exists in the database
      const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.clerkId, user.id));

      let userIdInDb;

      if (!existingUser.length) {
        // User does not exist; insert into the database
        const insertedUser = await db
          .insert(usersTable)
          .values({
            clerkId: user.id,
            email: user.emailAddresses[0]?.emailAddress || "unknown@email.com",
          })
          .returning({ id: usersTable.id });

        userIdInDb = insertedUser[0].id;
      } else {
        userIdInDb = existingUser[0].id;
      }

      // Check for existing data in localStorage under "time_list"
      const timeListStr = localStorage.getItem("time_list");
      if (timeListStr) {
        const timeList = JSON.parse(timeListStr);

        if (Array.isArray(timeList) && timeList.length > 0) {
          // For each item in timeList, save to database
          for (const item of timeList) {
            const date = new Date(item.date); // Parses the ISO date string
            const time = Number(item.time); // Ensures time is a number

            try {
              await saveStudyTime(user.id, date, time);
            } catch (error) {
              console.error("Error saving study time:", error);
            }
          }

          // After Tests do:
          // localStorage.removeItem("time_list");
        }
      }
    };

    syncUser();
  }, [isSignedIn, user]);
}

export default useSyncUserToDb;
