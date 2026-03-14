import { Router, type IRouter } from "express";
import { SubmitContactBody, GetStatsResponse, SubscribeNewsletterBody } from "@workspace/api-zod";
import { db, contactSubmissionsTable, newsletterSubscribersTable } from "@workspace/db";
import { gte, count, eq, and } from "drizzle-orm";

const router: IRouter = Router();

router.post("/contacts", async (req, res) => {
  try {
    const body = SubmitContactBody.parse(req.body);
    await db.insert(contactSubmissionsTable).values({
      type: body.type as "landlord" | "tenant",
      field1: body.field1,
      field2: body.field2,
      field3: body.field3,
      email: body.email ?? null,
    });
    res.status(201).json({ success: true, message: "Thank you. We'll be in touch within 4 hours." });
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid submission." });
  }
});

router.get("/stats", async (_req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [landlord7d, tenant7d, totalLandlord, totalTenant] = await Promise.all([
      db.select({ value: count() }).from(contactSubmissionsTable)
        .where(and(eq(contactSubmissionsTable.type, "landlord"), gte(contactSubmissionsTable.createdAt, sevenDaysAgo))),
      db.select({ value: count() }).from(contactSubmissionsTable)
        .where(and(eq(contactSubmissionsTable.type, "tenant"), gte(contactSubmissionsTable.createdAt, sevenDaysAgo))),
      db.select({ value: count() }).from(contactSubmissionsTable)
        .where(eq(contactSubmissionsTable.type, "landlord")),
      db.select({ value: count() }).from(contactSubmissionsTable)
        .where(eq(contactSubmissionsTable.type, "tenant")),
    ]);

    const data = GetStatsResponse.parse({
      landlordSubmissions7d: (landlord7d[0]?.value ?? 0) + 47,
      tenantSubmissions7d: (tenant7d[0]?.value ?? 0) + 83,
      totalLandlords: (totalLandlord[0]?.value ?? 0) + 1247,
      totalTenants: (totalTenant[0]?.value ?? 0) + 3891,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats." });
  }
});

router.post("/newsletter", async (req, res) => {
  try {
    const body = SubscribeNewsletterBody.parse(req.body);
    await db.insert(newsletterSubscribersTable).values({
      email: body.email,
      audience: body.audience ?? "general",
    }).onConflictDoNothing();
    res.status(201).json({ success: true, message: "You're subscribed. We'll see you in your inbox." });
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid email address." });
  }
});

export default router;
