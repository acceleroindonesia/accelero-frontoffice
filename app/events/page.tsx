'use client';

import { useEffect, useState, useMemo } from 'react';
import Master from '@components/Layout/Master';
import Section from '@components/Section/Section';
import Heading from '@components/Heading/Heading';
import EventCard from '@components/Card/EventCard';
import Loader from '@components/Loader/Loader';
import Request, { IResponse } from '@utils/Request';

interface IRawEvent {
  url: string;
  name: string;
  when: string;
  from: string;
  venue: string;
  image: string;
  stock: number;
}

const Page: React.FC = () => {
  const [events, setEvents] = useState<IRawEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res: IResponse = await Request.getResponse({
          url: '/api/event',
          method: 'GET',
        });

        if (!res || !res.data?.results) {
          setError('No event data found');
          throw new Error('No event data found');
        }

        setEvents(res.data.results);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const formattedEvents = useMemo(() => {
    return events.map((event, idx) => {

      return {
        key: idx,
        url: event.url,
        from: event.from,
        color: event.stock > 0 ? 'red' : 'gray',
        when: formatDate(event.when),
        name: event.name,
        venue: event.venue,
        image: event.image ?? '/default-banner.jpg',
        stock: event.stock,
      };
    });
  }, [events]);

  return (
    <Master>
      <Section className='white-background'>
        <div className='container'>
          <div className='padding-bottom center'>
            <Heading type={1} color='white' text='Events' />
            <p className='white'>Discover, search and filter best events in Indonesia.</p>
          </div>
        </div>
      </Section>

      <Section className='list-cards dark-background'>
        <div className='container center'>
          {loading && <Loader type='inline' text='Loading events...' color='white' />}
          {error && <p className='text-red-500'>{error}</p>}
          {!loading &&
            !error &&
            formattedEvents.map((event) => (
              <EventCard
                key={event.key}
                url={event.url}
                from={event.from}
                color={event.color}
                when={event.when}
                name={event.name}
                venue={event.venue}
                image={event.image}
                stock={event.stock}
              />
            ))}
        </div>
      </Section>
    </Master>
  );
};

export default Page;
