import { useEffect, useState } from 'react';
import { getIngredients } from 'services/ingredients';
import { API, formatDate } from 'utils';


export default function App() {

  const [date, setDate] = useState('2020-11-19');
  const [ingredients, setIngredients] = useState([])
  const [currentIngredients, setCurrentIngredients] = useState([]);

  const changeDate = (e) => setDate(formatDate(new Date(e.target.value)));

  const addToCurrentIngredients = (e) => setCurrentIngredients(currentIngredients => [...currentIngredients, e.target.value]);

  const removeFromCurrentIngredients = (item) => {
    setCurrentIngredients(currentIngredients => currentIngredients.filter((ingredient) => ingredient !== item));
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

          {
            currentIngredients.length > 0 && (
              currentIngredients.map((ingredient, index) => (
                <span class="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700">
                  {ingredient}
                  <button type="button" onClick={() => removeFromCurrentIngredients(ingredient)} class="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white">
                    <span class="sr-only">Remove Ingredient</span>
                    <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                      <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                    </svg>
                  </button>
                </span>
              ))
            )
          }

          <div className="px-4 py-2.5 bg-indigo-500" onClick={getRecipes}>Search</div>

        </div>
      </div>
    </div>
  );
}
