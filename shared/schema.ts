import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const standups = pgTable("standups", {
  id: serial("id").primaryKey(),
  yesterday: text("yesterday").notNull(),
  today: text("today").notNull(),
  blockers: text("blockers").notNull(),
  summaryCompleted: text("summary_completed").notNull(),
  summaryPlanned: text("summary_planned").notNull(),
  summaryBlockers: text("summary_blockers").notNull(),
  weakAreas: text("weak_areas").notNull(), // Added weak areas
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertStandupSchema = createInsertSchema(standups).pick({
  yesterday: true,
  today: true,
  blockers: true,
});

export type Standup = typeof standups.$inferSelect;
export type InsertStandup = z.infer<typeof insertStandupSchema>;
