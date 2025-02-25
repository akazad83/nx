import { useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useDebounce } from '../hooks/use-debounce';

export interface TextFilterPanelProps {
  textFilter: string;
  resetTextFilter: () => void;
  updateTextFilter: (textFilter: string) => void;
  toggleIncludeLibsInPathChange: () => void;
  includePath: boolean;
}

export function TextFilterPanel({
  textFilter,
  resetTextFilter,
  updateTextFilter,
  toggleIncludeLibsInPathChange,
  includePath,
}: TextFilterPanelProps) {
  const [currentTextFilter, setCurrentTextFilter] = useState('');

  const [debouncedValue, setDebouncedValue] = useDebounce(
    currentTextFilter,
    500
  );

  function onTextFilterKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      updateTextFilter(event.currentTarget.value);
    }
  }

  function onTextInputChange(change: string) {
    if (change === '') {
      setCurrentTextFilter('');
      setDebouncedValue('');

      resetTextFilter();
    } else {
      setCurrentTextFilter(change);
    }
  }

  function resetClicked() {
    setCurrentTextFilter('');
    setDebouncedValue('');

    resetTextFilter();
  }

  useEffect(() => {
    updateTextFilter(debouncedValue);
  }, [debouncedValue, updateTextFilter]);

  return (
    <div>
      <div className="mt-10 px-4">
        <form
          className="group relative flex rounded-md shadow-sm"
          onSubmit={(event) => event.preventDefault()}
        >
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-300 bg-slate-50 p-2 dark:border-slate-900 dark:bg-slate-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </span>
          <input
            type="text"
            className={`block w-full flex-1 rounded-none rounded-r-md border border-slate-300 bg-white p-1.5 font-light text-slate-400 placeholder:font-light placeholder:text-slate-400 dark:border-slate-900 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700`}
            placeholder="lib name, other lib name"
            data-cy="textFilterInput"
            name="filter"
            value={currentTextFilter}
            onKeyUp={onTextFilterKeyUp}
            onChange={(event) => onTextInputChange(event.currentTarget.value)}
          ></input>
          {currentTextFilter.length > 0 ? (
            <button
              data-cy="textFilterReset"
              type="reset"
              onClick={resetClicked}
              className="absolute top-1 right-1 inline-block rounded-md bg-slate-50 p-1 text-slate-400 dark:bg-slate-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                />
              </svg>
            </button>
          ) : null}
        </form>
      </div>

      <div className="mt-4 px-4">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              disabled={textFilter.length === 0}
              id="includeInPath"
              name="textFilterCheckbox"
              type="checkbox"
              value="includeInPath"
              className="accent-green-nx-base h-4 w-4"
              checked={includePath}
              onChange={toggleIncludeLibsInPathChange}
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="includeInPath"
              className="cursor-pointer font-medium text-slate-600 dark:text-slate-400"
            >
              Include related libraries
            </label>
            <p className="text-slate-400 dark:text-slate-500">
              Show libraries that are related to your search.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextFilterPanel;
