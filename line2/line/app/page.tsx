'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function Home() {
  const [waitingNumber, setWaitingNumber] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    fetchNumbers();
  }, []);

  async function fetchNumbers() {
    const { data: ticket, error } = await supabase
      .from('tickets')
      .select('waiting_number, current_number')
      .single();

    if (error) {
      console.error('Error fetching numbers:', error);
      return;
    }

    setWaitingNumber(ticket?.waiting_number || 0);
    setCurrentNumber(ticket?.current_number || 0);
  }

  async function updateNumber(type: 'waiting' | 'current', value: number) {
    const column = type === 'waiting' ? 'waiting_number' : 'current_number';
    const { data, error } = await supabase
      .from('tickets')
      .update({ [column]: value })
      .eq('id', 1); // 前提として、更新するレコードのIDは1としています。

    if (error) {
      console.error(`Error updating ${type} number:`, error);
      return false;
    }
    return true;
  }

  async function incrementWaitingNumber() {
    const newWaitingNumber = waitingNumber + 1;
    const success = await updateNumber('waiting', newWaitingNumber);
    if (success) {
      setWaitingNumber(newWaitingNumber);
    }
  }

  async function decrementWaitingNumber() {
    if (waitingNumber > 0) {
      const newWaitingNumber = waitingNumber - 1;
      const success = await updateNumber('waiting', newWaitingNumber);
      if (success) {
        setWaitingNumber(newWaitingNumber);
      }
    }
  }

  async function incrementCurrentNumber() {
    const newCurrentNumber = currentNumber + 1;
    const success = await updateNumber('current', newCurrentNumber);
    if (success) {
      setCurrentNumber(newCurrentNumber);
    }
  }

  async function decrementCurrentNumber() {
    if (currentNumber > 0) {
      const newCurrentNumber = currentNumber - 1;
      const success = await updateNumber('current', newCurrentNumber);
      if (success) {
        setCurrentNumber(newCurrentNumber);
      }
    }
  }

  return (
    <div>
      <h1>管理者ページ</h1>
      <div>
        <label>待ち番号：</label>
        <button onClick={decrementWaitingNumber}>-</button>
        <span>{waitingNumber}</span>
        <button onClick={incrementWaitingNumber}>+</button>
      </div>
      <div>
        <label>診察中番号：</label>
        <button onClick={decrementCurrentNumber}>-</button>
        <span>{currentNumber}</span>
        <button onClick={incrementCurrentNumber}>+</button>
      </div>
    </div>
  );
}
