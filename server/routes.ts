import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.standups.list.path, async (req, res) => {
    try {
      const allStandups = await storage.getStandups();
      res.json(allStandups);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch standups" });
    }
  });

  app.post(api.standups.create.path, async (req, res) => {
    try {
      const input = api.standups.create.input.parse(req.body);
      
      const systemPrompt = `You are a helpful assistant that formats daily standup updates into a clean, professional, emoji-rich summary.
      You will receive the user's input for "Yesterday's work", "Today's plan", and "Blockers".
      Your task is to:
      1. Reformat them into three clear sections: Completed, Planned, and Blockers. Use appropriate emojis for each.
      2. Critically analyze the input and identify "weak areas" such as incomplete tasks, vague plans, or blockers without resolution.

      Return the response as a JSON object with exactly four keys: "completed", "planned", "blockers", and "weak_areas".
      Keep the text concise, professional, and action-oriented.`;

      const userPrompt = `Yesterday's work: ${input.yesterday}\nToday's plan: ${input.today}\nBlockers: ${input.blockers}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0]?.message?.content || "{}";
      const summary = JSON.parse(content);

      const standupToInsert = {
        yesterday: input.yesterday,
        today: input.today,
        blockers: input.blockers,
        summaryCompleted: summary.completed || "No update provided.",
        summaryPlanned: summary.planned || "No update provided.",
        summaryBlockers: summary.blockers || "None.",
        weakAreas: summary.weak_areas || "None detected.",
      };

      const created = await storage.createStandup(standupToInsert);
      
      res.status(201).json(created);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
