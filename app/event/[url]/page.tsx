'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Master from '@components/Layout/Master';
import Section from '@components/Section/Section';
import Heading from '@components/Heading/Heading';
import EventCard from '@components/Card/EventCard';
import CardGroup from '@components/Card/CardGroup';
import TicketForm from './components/TicketForm';
import Loader from '@components/Loader/Loader';


const EventDetailPage = () => {
  const { url } = useParams(); // still using 'url' from /event/[url]
  const [event, setEvent] = useState<any>(null);
  const [otherEvents, setOtherEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);

        const [eventRes, othersRes] = await Promise.all([
          fetch(`/api/event/${url}`),
          fetch(`/api/event`),
        ]);

        const eventJson = await eventRes.json();
        const othersJson = await othersRes.json();

        if (!eventRes.ok) throw new Error(eventJson.message || 'Event not found');

        setEvent(eventJson.result);

        // Filter out current event by slug/url from otherEvents
        const others = (othersJson.results || []).filter((e: any) => e.url !== url);
        setOtherEvents(others);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch event');
      } finally {
        setLoading(false);
      }
    };

    if (url) fetchEventData();
  }, [url]);

  if (loading) return <Loader type='inline' color='white' text='Loading your event...' />;
  if (error || !event) {
    return (
      <Master>
        <div className='text-center p-8 text-red-500'>
          {error || 'Sorry, this event could not be found.'}
        </div>
      </Master>
    );
  }

  const coverImage = event.thumbnailUrl || '/default-banner.jpg';
  const formattedDate = new Date(event.date).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Master>
      {/* Header Cover */}
      <div className='blur-cover'>
        <div
          className='event-cover cover-image flex flex-v-center flex-h-center'
          style={{ backgroundImage: `url("${coverImage}")` }}
        />
        <div className='cover-info'>
          <div className='cover-image image' style={{ backgroundImage: `url("${coverImage}")` }} />
          <Heading type={1} color='white' text={event.title} />
          <Heading type={5} color='white' text={formattedDate} />
          <Heading type={6} color='white' text={event.venue?.name ?? 'Unknown Venue'} />
        </div>
      </div>

      {/* Event Detail */}
      <Section className='white-background'>
        <div className='container'>
          <div className='event-details'>
            <div>
              <Heading type={4} color='white' text='Event details' />
              <div className='paragraph-container white'>
                <p className='white'>{event.description}</p>
              </div>
            </div>

            {/* Tickets */}
            <div>
              <div className='ticket-box'>
                <div className='ticket-box-header'>
                  <Heading type={4} color='black' text='Tickets' />
                </div>
                <TicketForm
                  data={event.ticketTypes.map((ticket: any) => ({
                    id: ticket.id,
                    name: ticket.name,
                    price: `Rp ${Number(ticket.price).toLocaleString('id-ID')}`,
                    ordering: ticket.ordering || 1,
                    soldout: ticket.stock <= 0,
                    information: 'Stock: ' + ticket.stock,
                    stock: ticket.stock,
                    quantity: 0,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Venue Info */}
      <Section className='white-background'>
        <div className='container'>
          <Heading type={4} color='white' text={event.venue?.name ?? 'Venue'} />
          <Heading type={6} color='white' text='Address' />
          <div className='paragraph-container'>
            <p className='white'>{event.venue?.address ?? 'No address provided'}</p>
          </div>

          <Heading type={6} color='white' text='How to get there?' />
          <div className='paragraph-container'>
            {/*<p className='white'>{event.venue?.directions ?? 'Directions not available'}</p>*/}
            <p className='white'>
              {/*<Link href={`/venue/${event.venue?.id}`} className='blue'>*/}
              {/*  Venue details*/}
              {/*</Link>*/}
              {/*&nbsp; • &nbsp;*/}
              {/*<a href='/' target='_blank' className='blue'>*/}
              {/*  Get directions*/}
              {/*</a>*/}
              {/*&nbsp; • &nbsp;*/}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue?.address ?? '')}`}
                target='_blank'
                rel='noopener noreferrer'
                className='red'
              >
                Show in map
              </a>
            </p>
          </div>
        </div>
      </Section>

      {/* Other Events */}
      {otherEvents.length > 0 && (
        <CardGroup url='events' title='Other events' color='red' background='white'>
          {otherEvents.map((e: any) => (
            <EventCard
              key={e.id}
              url={e.url}
              from={e.from}
              color={e.stock != 0 ? 'red' : 'white'}
              when={e.when}
              name={e.title}
              venue={e.venue || 'Unknown Venue'}
              image={e.image || '/default-banner.jpg'}
              stock={e.stock}
            />
          ))}
        </CardGroup>
      )}
    </Master>
  );
};

export default EventDetailPage;
