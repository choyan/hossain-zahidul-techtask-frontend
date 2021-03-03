import { useEffect, useState } from 'react';
import { getIngredients } from 'services/ingredients';
import { API, formatDate } from 'utils';


export default function App() {

  const [date, setDate] = useState('2020-11-19');
  const [ingredients, setIngredients] = useState([])
  const [currentIngredients, setCurrentIngredients] = useState([]);

  const changeDate = (e) => setDate(formatDate(new Date(e.target.value)));

  const addToCurrentIngredients = (e) => setCurrentIngredients(currentIngredients => [...currentIngredients, e.target.value]);

  const removeFromCurrentIngredients = (index) => {
    console.log(index);
  }

  const compareDate = (useBy) => {
    if ((new Date(date).getTime()) <= (new Date(useBy).getTime())) {
      return false
    }
    return true;
  }

  const getRecipes = () => {
    setTimeout(() => {
      console.log(currentIngredients);
      // try {
      //   // getRecipes()
      // } catch(e) {
      //   console.log(e);
      // }
    }, 200);
  }

  useEffect(() => {
    console.log(currentIngredients);
  }, [currentIngredients])

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
                  value={date}
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md' />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-1 mr-3">
            <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
              Kullanıcı Adı
            </label>

            {ingredients.length > 0 ? (
              <select
                id="user_id"
                name="user_id"
                onChange={addToCurrentIngredients}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {ingredients.map((user) => (
                  <option key={user.title} value={user.title} disabled={(compareDate(user['use-by'])) ? true : null}>
                    {user.title}
                  </option>
                ))}
              </select>
            ) : (
                <span className="text-sm">Hiç User Bulunamadık</span>
              )}
          </div>

          

          <div className="px-4 py-2.5 bg-indigo-500" onClick={getRecipes}>Search</div>

        </div>
      </div>
    </div>
  );
}
