import { db } from "@/db/db";
import { studyTimesTable, usersTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function saveStudyTime(userId: string, date: Date, time: number) {
  // Retrieve the internal database user ID
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkId, userId))
    .limit(1);

  if (user.length === 0) {
    throw new Error("User not found in the database.");
  }

  const userIdInDb = user[0].id;

  // Check if an entry with the same userId, date, and time already exists
  const existingEntry = await db
    .select()
    .from(studyTimesTable)
    .where(
      and(
        eq(studyTimesTable.userId, userIdInDb),
        eq(studyTimesTable.date, date),
        eq(studyTimesTable.time, time)
      )
    )
    .limit(1);

  if (existingEntry.length > 0) {
    // Entry already exists; skip insertion
    return;
  }

  // Insert the study time into the studyTimesTable
  await db.insert(studyTimesTable).values({
    userId: userIdInDb,
    date,
    time,
  });
}
