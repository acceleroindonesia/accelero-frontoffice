'use client';

import { useState } from 'react';
import useAlert from '@hooks/useAlert';
import Input from '@components/Form/Input';
import Request, { IResponse } from '@utils/Request';

interface IFormProps {
  keyword: string;
}

interface IEvent {
  url: string;
  name: string;
  when: string;
  from: string;
  venue: string;
  image: string;
  stock: number;
}

interface Props {
  onSearchResult: (events: IEvent[]) => void;
}

const FormSearch: React.FC<Props> = ({ onSearchResult }) => {
  const { showAlert } = useAlert();
  const [formValues, setFormValues] = useState<IFormProps>({ keyword: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { keyword } = formValues;

    if (!keyword || keyword.length < 3) {
      showAlert({ type: 'error', text: 'Please enter minimum 3 characters for search.' });
      return;
    }

    setIsLoading(true);
    try {
      const res: IResponse = await Request.getResponse({
        url: '/api/event/search',
        method: 'POST',
        postData: { keyword },
      });

      if (!res.status) {
        throw new Error(res.message || 'Search failed.');
      }

      const events = res.data?.results || [];
      onSearchResult(events);
      showAlert({ type: 'success', text: `Found ${events.length} results.` });
    } catch (error: any) {
      showAlert({ type: 'error', text: error.message || 'Something went wrong.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className='search-inputs flex flex-h-center flex-space-between'>
        <Input
          type='text'
          name='keyword'
          value={formValues.keyword}
          maxLength={64}
          placeholder='Event, venue, artist, keyword'
          required
          onChange={handleChange}
          disabled={isLoading}
        />
        <button type='submit' disabled={isLoading}>
          <span className='material-symbols-outlined'>
            {isLoading ? 'hourglass_top' : 'search'}
          </span>
        </button>
      </div>
    </form>
  );
};

export default FormSearch;
