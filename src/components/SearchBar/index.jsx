import { useState, useEffect } from 'react';
import { SearchIcon } from '@heroicons/react/solid';

import SearchModal from '../SearchModal';

const SearchBar = () => {
    const [isSearchModalOpen, setSearchModalState] = useState(false);

    const showModal = () => {
        setSearchModalState(true);
    };
    const handleKeyPress = e => {
        // CTRL + F
        if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
            if (!isSearchModalOpen) {
                e.preventDefault();
                setSearchModalState(true);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <div className="p-1">
                <a
                    href="https://github.com/BCIT-DDC"
                    aria-label="Design & Development Club (DDC) GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="/DDC.png"
                        alt="Design & Development Club (DDC) Logo"
                        className="w-8 h-8 rounded-[4px] shadow-md transition duration-500 ease-in-out hover:translate-x-1"
                    />
                </a>
            </div>
            <div className="flex items-center justify-center flex-grow w-full">
                <button
                    type="button"
                    className="flex items-center w-screen h-12 max-w-5xl px-4 mx-8 space-x-3 text-left transition duration-100 ease-in-out bg-white border rounded-lg cursor-text border-search-dark-blue/20 hover:border-0 text-search-dark-blue/30 md:h-14 lg:h-16 hover:drop-shadow-lg"
                    onClick={() => showModal()}
                >
                    <SearchIcon
                        className="w-5 h-5 md:h-6 md:w-6 lg:h-7 lg:w-7"
                        aria-hidden="true"
                    />
                    <span className="flex-auto font-ibm-plex md:text-xl lg:text-2xl">
                        Search
                    </span>
                    <kbd className="font-sans font-semibold">
                        <abbr
                            title="Control"
                            className="text-gray-300 no-underline"
                        >
                            Ctrl{' '}
                        </abbr>{' '}
                        F
                    </kbd>
                </button>
            </div>
            <SearchModal
                setState={setSearchModalState}
                show={isSearchModalOpen}
            />
        </div>
    );
};

export default SearchBar;
