import { db } from "@/db/db";
import { studyTimesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function removeStudyTime(id: number) {
  try {
    await db.delete(studyTimesTable).where(eq(studyTimesTable.id, id));
    return { success: true };
  } catch (error) {
    console.error("Erro ao remover estudo:", error);
    return { success: false, error };
  }
}
