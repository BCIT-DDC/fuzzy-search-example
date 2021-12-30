/* eslint-disable react/prop-types */
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
    CheckIcon,
    SearchIcon,
    XCircleIcon,
    SelectorIcon,
    MicrophoneIcon,
} from '@heroicons/react/solid';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const SearchModalHeader = ({
    inputRef,
    listening,
    clearSearch,
    handleSearch,
    selectedCategory,
    searchCategories,
    SpeechRecognition,
    handleSetSelectedCategory,
    browserSupportsSpeechRecognition,
}) => {
    return (
        <>
            <header className="flex-shrink-0 mx-4 my-2 ">
                <div className="relative flex flex-col-reverse items-center justify-between sm:flex-row">
                    <Listbox
                        value={selectedCategory}
                        onChange={handleSetSelectedCategory}
                    >
                        {({ open }) => (
                            <>
                                <div className="relative w-full my-2 sm:my-0 sm:w-auto sm:min-w-[100px]">
                                    <Listbox.Button className="relative w-full sm:w-auto sm:min-w-[100px] py-2 pl-3 pr-10 text-left bg-white border rounded-md shadow-sm cursor-default hover:cursor-pointer border-search-gray focus:outline-none sm:text-sm">
                                        <span className="block truncate">
                                            {selectedCategory.name}
                                        </span>
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 ">
                                            <SelectorIcon
                                                className="w-5 h-5 text-search-dark-blue/30"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        enter="transition ease-out duration-300"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-200"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white border rounded-md shadow-lg max-h-60 border-search-gray focus:outline-none sm:text-sm">
                                            {searchCategories.map(category => (
                                                <Listbox.Option
                                                    key={category.id}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active
                                                                ? 'text-search-dark-blue bg-search-gray cursor-pointer'
                                                                : 'text-search-dark-blue',
                                                            'cursor-default select-none relative py-2 pl-8 pr-4',
                                                        )
                                                    }
                                                    value={category}
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span
                                                                className={classNames(
                                                                    selected
                                                                        ? 'font-semibold'
                                                                        : 'font-normal',
                                                                    'block truncate',
                                                                )}
                                                            >
                                                                {category.name}
                                                            </span>

                                                            {selected ? (
                                                                <span className="text-search-dark-blue absolute inset-y-0 left-0 flex items-center pl-1.5">
                                                                    <CheckIcon
                                                                        className="w-5 h-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                    <div
                        className="flex flex-row w-full sm:ml-4"
                        onClick={() => {
                            inputRef.current.focus();
                        }}
                        aria-hidden="true"
                    >
                        <div
                            className="flex items-center pointer-events-none"
                            aria-hidden="true"
                        >
                            <SearchIcon
                                className="w-5 h-5 text-search-dark-blue/30 md:h-6 md:w-6 lg:h-7 lg:w-7"
                                aria-hidden="true"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            ref={inputRef}
                            onChange={handleSearch}
                            className="w-full pl-5 border-none focus:ring-0 placeholder-search-dark-blue/10 text-search-dark-blue md:h-14 lg:h-16"
                        />

                        {inputRef.current && inputRef.current.value.trim() && (
                            <button
                                type="button"
                                className="flex items-center"
                                onClick={clearSearch}
                            >
                                <XCircleIcon
                                    className="w-5 h-5 transition duration-200 ease-in text-search-dark-blue/30 hover:text-red-500 md:h-6 md:w-6 lg:h-7 lg:w-7"
                                    aria-hidden="true"
                                />
                            </button>
                        )}

                        {/* V-Divider */}
                        {inputRef.current &&
                            inputRef.current.value.trim() &&
                            browserSupportsSpeechRecognition && (
                                <div className="mx-2 my-1 border-l border-search-dark-blue/10" />
                            )}

                        {browserSupportsSpeechRecognition && (
                            <>
                                <span className="relative inline-flex">
                                    <button
                                        type="button"
                                        className="flex items-center"
                                        onClick={
                                            SpeechRecognition.startListening
                                        }
                                    >
                                        <MicrophoneIcon
                                            className="w-5 h-5 text-blue-600 md:h-6 md:w-6 lg:h-7 lg:w-7"
                                            aria-hidden="true"
                                        />
                                    </button>
                                    {listening && (
                                        <span className="absolute top-0 right-0 flex w-2 h-2 my-2 -mr-1">
                                            <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping" />
                                            <span className="relative inline-flex w-2 h-2 bg-red-500 rounded-full" />
                                        </span>
                                    )}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default SearchModalHeader;
