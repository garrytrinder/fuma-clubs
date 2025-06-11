'use client';

import { clearCache } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

const Dashboard = () => {
  const [state, formAction] = useFormState(clearCache, { message: '' });

  return (
    <div className="flex flex-col gap-5 p-10">
      <div className="flex items-center justify-start">
        <div className="mr-10 flex w-2/3 flex-col gap-2">
          <h1>Cache</h1>
          <form action={formAction}>
            <button 
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Clear Cache
            </button>
          </form>
          {state?.message && (
            <div className="mt-2 rounded bg-green-100 p-3 text-green-700">
              {state.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
