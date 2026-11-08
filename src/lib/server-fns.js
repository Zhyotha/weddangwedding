import { createServerFn } from "@tanstack/react-start";

export const getServerInfo = createServerFn({ method: "GET" }).handler(async () => ({
  renderedAt: new Date().toISOString(),
}));

/**
 * Guest-facing RSVP totals. RSVP rows hold guests' names, so they stay
 * admin-only; this public endpoint returns aggregate numbers only.
 */
export const getRsvpSummary = createServerFn({ method: "GET" }).handler(async ({ context }) => {
  const base44 = context.getBase44();

  try {
    const { rows } = await base44.asServiceRole.entities.Rsvp.aggregate({
      groupBy: "attendance",
      sum: ["guest_count"],
    });

    const responses = rows.reduce((total, row) => total + (row.count || 0), 0);
    const attending = rows.reduce(
      (total, row) =>
        row.attendance === "hadir" ? total + (row.sum_guest_count || row.count || 0) : total,
      0
    );

    return { responses, attending };
  } catch (error) {
    return { responses: 0, attending: 0 };
  }
});