import { useEffect, useState } from 'react';
import { getIngredients } from 'services/ingredients';
import { getAllRecipies } from 'services/recipies';
import { formatDate } from 'utils';
import { CurrentIngredientsList, RecipeList } from './components';
import { Loading } from '../shared';

export default function App() {
  const [date, setDate] = useState(formatDate(new Date()));
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [ingredientsLoading, setIngredientsLoading] = useState(false);
  const [recipeLoading, setRecipeLoading] = useState(false);

  const changeDate = (e) => setDate(formatDate(new Date(e.target.value)));

  const addToCurrentIngredients = (e) => {
    const exist = currentIngredients.find((item) => item === e.target.value);
    if (!exist) {
      setCurrentIngredients((currentIngredients) => [...currentIngredients, e.target.value]);
    }
  };

  const removeFromCurrentIngredients = (item) => {
    setCurrentIngredients((currentIngredients) =>
      currentIngredients.filter((ingredient) => ingredient !== item),
    );
  };

  const compareDate = (useBy) => {
    if (new Date(date).getTime() <= new Date(useBy).getTime()) {
      return false;
    }
    return true;
  };

  const getRecipes = () => {
    setRecipeLoading(true);
    setTimeout(async () => {
      try {
        const res = await getAllRecipies(currentIngredients.toString());
        setRecipes(res);
      } catch (e) {
        console.log(e);
      }
      setRecipeLoading(false);
    }, 200);
  };

  useEffect(() => {
    setIngredientsLoading(true)
    setTimeout(async () => {
      try {
        const res = await getIngredients();
        setIngredients(res);
      } catch (e) {
        console.log(e);
      }
      setIngredientsLoading(false)
    }, 200);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="w-2/3 mx-auto my-16">
        <div className="bg-white px-4 py-6 shadow overflow-hidden sm:rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="my-4">
                <h3 className="text-xl leading-6 font-medium text-gray-900">Search Criterias</h3>
              </div>

              <div className="my-4">
                <div className="sm:col-span-3">
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                    Lunch Date
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      onChange={changeDate}
                      value={date}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="my-4">
                <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                  Available Ingredients
                </label>

                {
                  ingredientsLoading ? (
                    <Loading />
                  ) : (
                    <>
                      {ingredients.length > 0 ? (
                        <select
                          id="user_id"
                          name="user_id"
                          onChange={addToCurrentIngredients}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          {ingredients.map((user) => (
                            <option
                              key={user.title}
                              value={user.title}
                              disabled={compareDate(user['use-by']) ? true : null}
                            >
                              {user.title}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-sm">Could not find any Ingredient.</span>
                      )}
                      </>
                  )
                }
              </div>

              <CurrentIngredientsList
                currentIngredients={currentIngredients}
                removeFromCurrentIngredients={removeFromCurrentIngredients}
              />

              <button
                onClick={getRecipes}
                type="button"
                disabled={currentIngredients.length === 0}
                className="inline-flex disabled:cursor-not-allowed items-center justify-center px-4 py-2 w-full border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                Search
              </button>
            </div>

            <div>
              <RecipeList recipes={recipes} loading={recipeLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
