'use client';

import { useEffect, useState } from 'react';
import Master from '@components/Layout/Master';
import Section from '@components/Section/Section';
import Heading from '@components/Heading/Heading';
import EventCard from '@components/Card/EventCard';
import CardGroup from '@components/Card/CardGroup';

import FormSearch from './home/components/FormSearch';
import CircleButtons from './home/components/CircleButtons';
import Banner from '@components/Banner/Banner';
import Request, { type IResponse } from '@utils/Request';

interface IEvent {
  url: string;
  name: string;
  when: string;
  from: string;
  venue: string;
  image: string;
  stock: number;
}

const Page: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const res: IResponse = await Request.getResponse({
        url: '/api/event',
        method: 'GET',
      });

      if (res?.data?.results) {
        setEvents(res.data.results);
      }
      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <div className='flex-banner'>
        <div className='banner-image w-full'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className='h-52 w-full bg-gray-300 rounded-lg relative overflow-hidden'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_1.5s_infinite]'></div>
              </div>
            ))}
          </div>
        </div>

        {/* Add shimmer keyframes */}
        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          .animate-[shimmer_1.5s_infinite] {
            animation: shimmer 1.5s infinite linear;
            background-size: 200% 100%;
          }
        `}</style>
      </div>
    );
  }
  return (
    <Master>
      <Banner />
      <Section className='white-background'>
        {/*<div className='container'>*/}
        {/*  <div className='center'>*/}
        {/*    <Heading type={1} color='gray' text='Discover' />*/}
        {/*    <p className='gray'>Discover, search and filter best events in Indonesia.</p>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className='center'>
          <div className='container'>
            <div className='top-search'>
              <FormSearch onSearchResult={(results) => setEvents(results)} />
            </div>
          </div>
          {/*<div className='circle-buttons'>*/}
          {/*  <CircleButtons />*/}
          {/*</div>*/}
        </div>
      </Section>

      <CardGroup url='events' title='Latest events' color='red' background='gray'>
        {events.map((event, idx) => (
          <EventCard
            key={idx}
            url={event.url}
            from={event.from}
            color={event.stock != 0 ? 'red' : 'gray'}
            when={event.when}
            name={event.name}
            venue={event.venue}
            image={event.image}
            stock={event.stock}
          />
        ))}
      </CardGroup>
    </Master>
  );
};

export default Page;
