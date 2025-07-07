"use client";
import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
// import { signOut } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import FollowUpsTable from '@/components/FollowUpsTable';
import TasksTable from '@/components/TasksTable';
import ColdEmailsTable from '@/components/ColdEmailsTable';
import InboundEmailsTable from '@/components/InboundEmailsTable';
import ScheduledEventsTable from '@/components/ScheduledEventsTable';

// function SignOutButton() {
//   const router = useRouter();
//   return (
//     <button
//       className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 shadow"
//       onClick={async () => {
//         await signOut();
//         router.push('/login');
//       }}
//     >
//       Sign Out
//     </button>
//   );
// }

function TableSkeleton({ columns, rows = 3 }: { columns: number; rows?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-3 py-2 border">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
              {Array.from({ length: columns }).map((_, j) => (
                <td key={j} className="px-3 py-2 border">
                  <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DashboardPage() {
  // Cold Emails
  const [coldEmails, setColdEmails] = useState<any[]>([]);
  const [loadingColdEmails, setLoadingColdEmails] = useState(false);
  const [errorColdEmails, setErrorColdEmails] = useState<string | null>(null);
  // Follow-ups
  const [followUps, setFollowUps] = useState<any[]>([]);
  const [loadingFollowUps, setLoadingFollowUps] = useState(false);
  const [errorFollowUps, setErrorFollowUps] = useState<string | null>(null);
  // Tasks
  const [tasks, setTasks] = useState<any[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [errorTasks, setErrorTasks] = useState<string | null>(null);
  // Inbound Emails
  const [inboundEmails, setInboundEmails] = useState<any[]>([]);
  const [loadingInboundEmails, setLoadingInboundEmails] = useState(false);
  const [errorInboundEmails, setErrorInboundEmails] = useState<string | null>(null);
  // Scheduled Events
  const [scheduledEvents, setScheduledEvents] = useState<any[]>([]);
  const [loadingScheduledEvents, setLoadingScheduledEvents] = useState(false);
  const [errorScheduledEvents, setErrorScheduledEvents] = useState<string | null>(null);

  // Cold Emails
  useEffect(() => {
    setLoadingColdEmails(true);
    setTimeout(() => setLoadingColdEmails(false), 1000);
    async function fetchColdEmails() {
      try {
        const res = await fetch('/api/cold-emails');
        const data = await res.json();
        if (res.ok) setColdEmails(data.cold_emails);
        else setErrorColdEmails(data.error || 'Failed to fetch cold emails');
      } catch (err: any) {
        setErrorColdEmails(err.message);
      }
    }
    fetchColdEmails();
  }, []);
  // Follow-ups
  useEffect(() => {
    setLoadingFollowUps(true);
    setTimeout(() => {
      setLoadingFollowUps(false);
    }, 1000);
    async function fetchFollowUps() {
      try {
        const res = await fetch('/api/follow-ups');
        const data = await res.json();
        if (res.ok) setFollowUps(data.follow_ups);
        else setErrorFollowUps(data.error || 'Failed to fetch follow-ups');
      } catch (err: any) {
        setErrorFollowUps(err.message);
      }
    }
    fetchFollowUps();
  }, []);
  // Tasks
  useEffect(() => {
    setLoadingTasks(true);
    setTimeout(() => {
      setLoadingTasks(false);
    }, 1000);
    async function fetchTasks() {
      try {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        if (res.ok) setTasks(data.tasks);
        else setErrorTasks(data.error || 'Failed to fetch tasks');
      } catch (err: any) {
        setErrorTasks(err.message);
      }
    }
    fetchTasks();
  }, []);
  // Inbound Emails
  useEffect(() => {
    setLoadingInboundEmails(true);
    setTimeout(() => setLoadingInboundEmails(false), 1000);
    async function fetchInboundEmails() {
      try {
        const res = await fetch('/api/inbound-emails');
        const data = await res.json();
        if (res.ok) setInboundEmails(data.inbound_emails);
        else setErrorInboundEmails(data.error || 'Failed to fetch inbound emails');
      } catch (err: any) {
        setErrorInboundEmails(err.message);
      }
    }
    fetchInboundEmails();
  }, []);
  // Scheduled Events
  useEffect(() => {
    setLoadingScheduledEvents(true);
    setTimeout(() => setLoadingScheduledEvents(false), 1000);
    async function fetchScheduledEvents() {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        if (res.ok) setScheduledEvents(data.events);
        else setErrorScheduledEvents(data.error || 'Failed to fetch scheduled events');
      } catch (err: any) {
        setErrorScheduledEvents(err.message);
      }
    }
    fetchScheduledEvents();
  }, []);

  // For demo, show skeletons for 1s on all tabs
  const [loadingDemo, setLoadingDemo] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoadingDemo(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="container mx-auto py-8 relative">
      {/* <SignOutButton /> */}
      <h1 className="text-3xl font-bold mb-6 text-center tracking-tight">AI Agent Gmail Automation Dashboard</h1>
      <Card className="p-6 mb-8 shadow-lg">
        <Tabs defaultValue="cold-emails" className="w-full">
          <TabsList className="mb-4 flex flex-wrap gap-2 justify-center">
            <TabsTrigger value="cold-emails">Cold Emails</TabsTrigger>
            <TabsTrigger value="follow-ups">Follow-ups</TabsTrigger>
            <TabsTrigger value="inbound-emails">Inbound Emails</TabsTrigger>
            <TabsTrigger value="scheduled-events">Scheduled Events</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="cold-emails">
            {loadingColdEmails || loadingDemo ? (
              <TableSkeleton columns={5} />
            ) : errorColdEmails ? (
              <div className="py-8 text-center text-red-500">{errorColdEmails}</div>
            ) : (
              <ColdEmailsTable coldEmails={coldEmails} />
            )}
          </TabsContent>
          <TabsContent value="follow-ups">
            {loadingFollowUps || loadingDemo ? (
              <TableSkeleton columns={6} />
            ) : errorFollowUps ? (
              <div className="py-8 text-center text-red-500">{errorFollowUps}</div>
            ) : (
              <FollowUpsTable followUps={followUps} />
            )}
          </TabsContent>
          <TabsContent value="inbound-emails">
            {loadingInboundEmails || loadingDemo ? (
              <TableSkeleton columns={5} />
            ) : errorInboundEmails ? (
              <div className="py-8 text-center text-red-500">{errorInboundEmails}</div>
            ) : (
              <InboundEmailsTable inboundEmails={inboundEmails} />
            )}
          </TabsContent>
          <TabsContent value="scheduled-events">
            {loadingScheduledEvents || loadingDemo ? (
              <TableSkeleton columns={6} />
            ) : errorScheduledEvents ? (
              <div className="py-8 text-center text-red-500">{errorScheduledEvents}</div>
            ) : (
              <ScheduledEventsTable scheduledEvents={scheduledEvents} />
            )}
          </TabsContent>
          <TabsContent value="tasks">
            {loadingTasks || loadingDemo ? (
              <TableSkeleton columns={5} />
            ) : errorTasks ? (
              <div className="py-8 text-center text-red-500">{errorTasks}</div>
            ) : (
              <TasksTable tasks={tasks} />
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
} 