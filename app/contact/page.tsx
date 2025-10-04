import { type Metadata } from 'next';

// components
import Master from '@components/Layout/Master';
import Section from '@components/Section/Section';
import Heading from '@components/Heading/Heading';
import ButtonLink from '@components/Button/ButtonLink';

const Page: React.FC = () => (
  <Master>
    <Section className='white-background'>
      <div className='container'>
        <div className='padding-bottom center'>
          <Heading type={1} color='white' text='Contact us' />
          <p className='white form-information'>
            Please feel free to contact us through the following communication channels for any
            questions, concerns, or suggestions you may have.
          </p>
        </div>
      </div>
    </Section>
    <Section className='gray-background'>
      <div className='container'>
        <div className='center'>
          <Heading type={5} color='white' text='Customer service' />
          <p className='white form-information'>
            Our customer service is available Monday through Friday from <strong>9:00 AM</strong> to{' '}
            <strong>6:00 PM</strong>, and on weekends from <strong>10:00 AM</strong> to{' '}
            <strong>6:00 PM</strong>. Please click the button below for live assistance.
          </p>
          <div className='button-container'>
            <ButtonLink
              color='red-overlay'
              text='Live assistance'
              rightIcon='arrow_forward'
              url='https://wa.me/6281292207121?text=Hi%20there!%20I%20need%20assistance%20regarding%20tickets.'
            />
            &nbsp; &nbsp;
            <ButtonLink
              color='red-filled'
              text='Drop us an e-mail'
              rightIcon='arrow_forward'
              url='mailto:tiketordal.hosting@gmail.com?subject=Ticketing%20Inquiry&body=Hi%20TiketOrdal%2C%0A%0AI%20have%20a%20question%20about%20...'
            />
          </div>
        </div>
      </div>
    </Section>
    <Section className='white-background'>
      <div className='container'>
        <div className='center'>
          <Heading type={5} color='white' text='How can we help you?' />
          <p className='white form-information'>
            Would you like to browse through the help section to find the answer to your question
            before asking us?
          </p>
          <div className='button-container'>
            <ButtonLink color='red-filled' text='Help page' rightIcon='arrow_forward' url='help' />
          </div>
        </div>
      </div>
    </Section>
    <Section className='gray-background'>
      <div className='container'>
        <div className='center'>
          <Heading type={5} color='white' text='Communication details' />
          <div className='paragraph-container'>
            <p className='white'>
              You can directly write us to
              <br />
              <strong>tiketordal.hosting@gmail.com</strong>
              <br />
              <br />
              or call us at
              <br />
              <strong>+62 812-9220-7121</strong>
              <br />
              <br />
              <strong>Our office address is</strong>
              <br />
              233 North Road, Southbank, W2 2UL, London, UK
            </p>
          </div>
          <div className='button-container'>
            <ButtonLink color='red-filled' text='Open maps' rightIcon='arrow_forward' url='' />
          </div>
        </div>
      </div>
    </Section>
  </Master>
);

const title = 'Contact us';
const mainUrl = 'https://www.accelero-ticketing.com';
const canonical = `${mainUrl}/contact`;
const description = 'accelero ticketing is a accelero ticketing solution';

export const metadata: Metadata = {
  title,
  description,
  keywords: 'accelero ticketing',
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    type: 'website',
    siteName: 'accelero ticketing',
    images: `${mainUrl}/logo192.png`,
  },
};

export default Page;
