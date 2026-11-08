import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

/**
 * Public RSVP totals. RSVP rows hold guests' names, so they stay admin-only;
 * this endpoint returns aggregate numbers only.
 */
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const { rows } = await base44.asServiceRole.entities.Rsvp.aggregate({
      groupBy: 'attendance',
      sum: ['guest_count'],
    });

    const responses = rows.reduce((total, row) => total + (row.count || 0), 0);
    const attending = rows.reduce(
      (total, row) =>
        row.attendance === 'hadir' ? total + (row.sum_guest_count || row.count || 0) : total,
      0
    );

    return Response.json({ responses, attending });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}