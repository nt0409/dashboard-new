import React from 'react';

type ColdEmail = {
  id: string;
  recipient: string;
  email_preview?: string;
  scheduled_time?: string;
  status?: string;
  agent_name?: string;
};

export default function ColdEmailsTable({ coldEmails }: { coldEmails: ColdEmail[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 border">Recipient</th>
            <th className="px-3 py-2 border">Email Preview</th>
            <th className="px-3 py-2 border">Scheduled Time</th>
            <th className="px-3 py-2 border">Status</th>
            <th className="px-3 py-2 border">Agent</th>
          </tr>
        </thead>
        <tbody>
          {coldEmails.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-400">No cold emails found.</td>
            </tr>
          ) : (
            coldEmails.map(email => (
              <tr key={email.id} className="border-b">
                <td className="px-3 py-2 border">{email.recipient}</td>
                <td className="px-3 py-2 border max-w-xs truncate">{email.email_preview}</td>
                <td className="px-3 py-2 border">{email.scheduled_time ? new Date(email.scheduled_time).toLocaleString() : ''}</td>
                <td className="px-3 py-2 border">{email.status}</td>
                <td className="px-3 py-2 border">{email.agent_name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 