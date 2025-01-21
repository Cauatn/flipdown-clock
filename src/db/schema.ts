import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

// Usuários - relacionados ao Clerk
export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
});

// Tempo de estudo
export const studyTimesTable = pgTable("study_times_table", {
  id: serial("id").primaryKey(), // Chave primária
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  date: timestamp("date").notNull(), // Data do registro
  time: integer("time").notNull(), // Tempo de estudo (em minutos)
});

// Tipos para inserir e selecionar no banco
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertStudyTime = typeof studyTimesTable.$inferInsert;
export type SelectStudyTime = typeof studyTimesTable.$inferSelect;
