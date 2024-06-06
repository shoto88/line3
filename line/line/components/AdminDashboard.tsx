import { supabase } from '@/lib/supabse';
import { Ticket } from '../types/ticket';



type Props = {
  tickets: Ticket[];
};

export function AdminDashboard({ tickets }: Props) {
  const handleReset = async () => {
    const { error: updateError } = await supabase.from('settings').update({ waiting_number: 0, current_number: 0 }).eq('id', 1);
    if (updateError) {
      console.error('Error updating settings:', updateError);
      return;
    }
    const { error: deleteError } = await supabase.from('tickets').delete().neq('id', 0);
    if (deleteError) {
      console.error('Error deleting tickets:', deleteError);
      return;
    }
    alert('発券番号と診察中番号、LINE発券データを初期化しました。');
  };

  return (
    <div>
      <h2>発券済みチケット一覧</h2>
      <table>
        <thead>
          <tr>
            <th>発券番号</th>
            <th>ユーザー名</th>
            <th>発券日時</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.ticket_number}</td>
              <td>{ticket.user_name}</td>
              <td>{new Date(ticket.issued_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleReset}>発券番号と診察中番号、LINE発券データを初期化</button>
    </div>
  );
}