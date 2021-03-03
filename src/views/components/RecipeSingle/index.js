export default function RecipeSinlge({ recipe }) {
  console.log(recipe);
  return (
    <div className="mb-4">
      <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-2.5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
        <div className="flex-1 min-w-0">
          <div className="focus:outline-none hover:border-2 hover:border-blue-500 cursor-pointer">
            <p className="text-sm font-medium text-gray-900">{recipe.title}</p>
            {recipe.ingredients.map((item) => (
              <span className="inline-flex items-center px-2.5 py-0.5 mr-1.5 mb-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
