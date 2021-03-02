import { useEffect, useState } from 'react';
import { getIngredients } from 'services/ingredients';
import { API } from 'utils';

export default function App() {

  const [date, setDate] = useState(new Date());
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    setTimeout(async () => {
      try {
        const res = await getIngredients();
        setIngredients(res);
      } catch (e) {
        console.log(e);
      }
    }, 200);
  }, [])

  const changeDate = (e) => {
    console.log(e.target.value)
  }

  return (
    <div className='container mx-auto'>
      <div className='w-2/3 mx-auto my-16'>
        <div className='bg-white px-4 py-6 shadow overflow-hidden sm:rounded-lg'>
          <div className='my-4'>
            <h3 className='text-xl leading-6 font-medium text-gray-900'>Find Recipe.</h3>
          </div>

          <div className='my-4'>
            <div className='sm:col-span-3'>
              <label htmlFor='first_name' className='block text-sm font-medium text-gray-700'>
                Lunch Date
              </label>
              <div className='mt-1'>
                <input
                  type='date' name='date' id='date'
                  onChange={changeDate}
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
