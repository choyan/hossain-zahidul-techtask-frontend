export default function CurrentIngredientList({
  currentIngredients,
  removeFromCurrentIngredients,
}) {
  return (
    <div className='my-4'>
      {currentIngredients.length > 0 &&
        currentIngredients.map((ingredient) => (
          <span
            key={ingredient}
            className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 mr-1.5 mb-1.5 text-sm font-medium bg-indigo-100 text-indigo-700"
          >
            {ingredient}
            <button
              type="button"
              onClick={() => removeFromCurrentIngredients(ingredient)}
              className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
            >
              <span className="sr-only">Remove Ingredient</span>
              <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
        ))}
    </div>
  );
}
