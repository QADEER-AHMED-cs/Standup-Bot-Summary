import { db } from "./db";
import { standups, type Standup } from "@shared/schema";
import { desc } from "drizzle-orm";

export type InsertStandupRecord = Omit<Standup, "id" | "createdAt">;

export interface IStorage {
  getStandups(): Promise<Standup[]>;
  createStandup(standup: InsertStandupRecord): Promise<Standup>;
}

export class DatabaseStorage implements IStorage {
  async getStandups(): Promise<Standup[]> {
    return await db.select().from(standups).orderBy(desc(standups.createdAt));
  }

  async createStandup(standup: InsertStandupRecord): Promise<Standup> {
    const [created] = await db.insert(standups).values(standup).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
