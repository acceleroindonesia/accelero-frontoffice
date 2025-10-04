'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// components
import Master from '@components/Layout/Master';
import Section from '@components/Section/Section';
import Heading from '@components/Heading/Heading';
import ButtonGroup from '@components/Button/ButtonGroup';
import ButtonGroupItem from '@components/Button/ButtonGroupItem';
import Loader from '@components/Loader/Loader';

const Page: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch('/api/ticket');
        const data = await res.json();

        if (res.ok) {
          setOrders(data.data || []);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error('Failed to load tickets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleDownload = async (ticketId: number) => {
    try {
      const res = await fetch(`/api/ticket/download/${ticketId}`);
      if (!res.ok) {
        throw new Error('Failed to download ticket');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ticket-${ticketId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <Master>
      <Section className='white-background'>
        <div className='container'>
          <div className='center'>
            <Heading type={1} color='white' text='My tickets' />
            <p className='white form-information'>
              You can access the tickets you purchased from this page at any time. You can download
              or send your tickets. Please note: You will not be able to see tickets for events that
              have already ended or been canceled on this page.
            </p>
            <div className='button-container'>
              <ButtonGroup color='gray'>
                <ButtonGroupItem url='members/tickets' text='My tickets' active />
                <ButtonGroupItem url='members/account' text='My account' />
              </ButtonGroup>
            </div>
          </div>
        </div>
      </Section>

      <Section className='white-background'>
        <div className='container'>
          {loading ? (
            <Loader type='inline' color='white' text='Loading your tickets...' />
          ) : orders.length === 0 ? (
            <p className='white center'>You have no active tickets.</p>
          ) : (
            orders.map((order) =>
              order.orderItems.map((item: any) => {
                const event = item.ticketType.event;
                const date = new Date(event.date);
                const day = date.getDate();
                const month = date.toLocaleString('default', { month: 'long' });
                const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (
                  <div className='ticket-item' key={item.id}>
                    <div className='item-right'>
                      <h2>{day}</h2>
                      <p>{month}</p>
                      <span className='material-symbols-outlined'>qr_code_2</span>
                      <strong>{order.code || order.id}</strong>
                      <span className='up-border'></span>
                      <span className='down-border'></span>
                    </div>
                    <div className='item-left'>
                      <h5>{event.title}</h5>
                      <p>
                        <span className='material-symbols-outlined'>event</span>
                        {event.date ? `${date.toDateString()} ${time}` : 'TBD'}
                      </p>
                      <p>
                        <span className='material-symbols-outlined'>apartment</span>
                        {event.venue?.name || 'TBA'}
                      </p>
                      <div className='actions'>
                        <Link
                          href='#'
                          onClick={(e) => {
                            e.preventDefault(); // Prevent navigation
                            handleDownload(item.id); // Trigger download logic
                          }}
                          title='Download ticket'
                        >
                          <span className='material-symbols-outlined'>download</span>
                        </Link>
                        <Link href={`/members/tickets/share/${item.id}`} title='Send tickets'>
                          <span className='material-symbols-outlined'>forward_to_inbox</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )
          )}
        </div>
      </Section>
    </Master>
  );
};

export default Page;
