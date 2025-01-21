import { db } from "@/db/db";
import { studyTimesTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function fetchStudyTimes(userId: string) {
  try {
    const data = await db
      .select({
        id: studyTimesTable.id,
        date: studyTimesTable.date,
        time: studyTimesTable.time,
      })
      .from(studyTimesTable)
      .innerJoin(usersTable, eq(usersTable.id, studyTimesTable.userId))
      .where(eq(usersTable.clerkId, userId));

    return data.map((item) => ({
      id: item.id,
      date: item.date.toISOString(),
      time: item.time,
    }));
  } catch (error) {
    console.error("Erro ao buscar tempos de estudo:", error);
    return [];
  }
}
