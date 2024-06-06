'use client';

import { useEffect, useState } from 'react';
import { AdminDashboard } from '../components/AdminDashboard';

import { supabase } from '@/lib/supabse';



export type Ticket = {
  id: number;
  ticket_number: number;
  user_name: string;
  user_id: string;
  issued_at: string;
};

export default function Home() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const { data, error } = await supabase.from('tickets').select('*').order('issued_at', { ascending: false });
      if (error) {
        console.error('Error fetching tickets:', error);
      } else {
        setTickets(data);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      <h1>LINE予約システム 管理者ダッシュボード</h1>
      <AdminDashboard tickets={tickets} />
    </div>
  );
}