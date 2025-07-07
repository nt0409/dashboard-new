import React from 'react';

type FollowUp = {
  id: string;
  lead_email: string;
  previous_message_snippet?: string;
  follow_up_template?: string;
  time_scheduled?: string;
  status?: string;
  agent_name?: string;
};

export default function FollowUpsTable({ followUps }: { followUps: FollowUp[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 border">Lead Email</th>
            <th className="px-3 py-2 border">Prev. Message</th>
            <th className="px-3 py-2 border">Follow-up Template</th>
            <th className="px-3 py-2 border">Scheduled Time</th>
            <th className="px-3 py-2 border">Status</th>
            <th className="px-3 py-2 border">Agent</th>
          </tr>
        </thead>
        <tbody>
          {followUps.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-400">No follow-ups found.</td>
            </tr>
          ) : (
            followUps.map(fu => (
              <tr key={fu.id} className="border-b">
                <td className="px-3 py-2 border">{fu.lead_email}</td>
                <td className="px-3 py-2 border max-w-xs truncate">{fu.previous_message_snippet}</td>
                <td className="px-3 py-2 border max-w-xs truncate">{fu.follow_up_template}</td>
                <td className="px-3 py-2 border">{fu.time_scheduled ? new Date(fu.time_scheduled).toLocaleString() : ''}</td>
                <td className="px-3 py-2 border">{fu.status}</td>
                <td className="px-3 py-2 border">{fu.agent_name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 