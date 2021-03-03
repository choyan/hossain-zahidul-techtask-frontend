import { RecipeSingle } from '../index';

export default function RecipeList({ loading, recipes }) {
  return (
    <div className="px-4 py-4">
      <h3 className="text-xl mb-4 leading-6 font-medium text-gray-900">Available Recipes.</h3>
      {loading
        ? 'loading'
        : recipes.map((recipe) => {
            return <RecipeSingle recipe={recipe} />;
          })}
    </div>
  );
}
