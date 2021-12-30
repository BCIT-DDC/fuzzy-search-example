/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import Fuse from 'fuse.js';
import { Fragment, useState, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition';

import content from '../../content/searchableContent';
import SearchModalHeader from '../SearchModalHeader';
import SearchModalFooter from '../SearchModalFooter';
import SearchModalItems from '../SearchModalContainer';

const searchCategories = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Movies' },
    { id: 4, name: 'Shows' },
];

const defaultSearchList = {
    recent: [
        {
            img: 'https://images-na.ssl-images-amazon.com/images/I/810dEwTg54L.jpg',
            genre: 'Psychological Horror',
            title: 'The Mist',
            author: 'Stephen King',
            category: 'book',
        },
        {
            img: 'https://images-na.ssl-images-amazon.com/images/I/6130bODeEIL.jpg',
            genre: 'Dark Fantasy',
            title: 'The Dark Tower',
            author: 'Stephen King',
            category: 'book',
        },
        {
            img: 'https://images-na.ssl-images-amazon.com/images/I/91hX+QhbRML.jpg',
            genre: 'Science Fiction',
            title: 'The Aurora Cycle',
            author: 'Amie Kaufman & Jay Kristoff',
            category: 'book',
        },
    ],
    results: [...content],
};

const options = {
    shouldSort: true,
    includeMatches: true,
    threshold: 0.1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['title', 'author'],
};

const fuse = new Fuse(content, options);

function handleCategoryFilter(results, category) {
    if (category === 'All') {
        return results;
    }

    return results.filter(item => item.category === category);
}

const SearchModal = ({ show, setState }) => {
    const inputRef = useRef(null);
    const [searchList, setSearchList] = useState(defaultSearchList);
    const [selectedCategory, setSelectedCategory] = useState(
        searchCategories[0],
    );
    const { listening, transcript, browserSupportsSpeechRecognition } =
        useSpeechRecognition();

    const handleSearch = () => {
        const searchQuery = inputRef.current.value;

        if (searchQuery) {
            const searchResults = fuse.search(searchQuery, { limit: 20 });
            let filteredSearchList = searchResults.map(result => result.item);

            filteredSearchList = handleCategoryFilter(
                filteredSearchList,
                selectedCategory.name,
            );

            setSearchList({
                recent: searchList.recent,
                results: filteredSearchList,
            });
        } else {
            const filteredSearchList = handleCategoryFilter(
                content,
                selectedCategory.name,
            );

            setSearchList({
                recent: searchList.recent,
                results: filteredSearchList,
            });
        }
    };

    const handleSetSelectedCategory = value => {
        setSelectedCategory(value);
    };

    useEffect(() => {
        if (inputRef.current) {
            handleSearch();
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = transcript;
            handleSearch();
        }
    }, [transcript, listening]);

    const clearSearch = () => {
        inputRef.current.value = '';
        handleSearch();
    };

    const closeSearchModal = () => {
        setState(false);
    };

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog
                as="div"
                auto-reopen="true"
                initialFocus={inputRef}
                className="fixed inset-0 z-50"
                onClose={closeSearchModal}
            >
                <div className="flex items-center justify-center text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 transition-opacity bg-search-dark-blue bg-opacity-30" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="false"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="flex flex-col font-ibm-plex w-screen max-w-5xl max-h-[95vh] min-w-[320px] mx-8 my-4 text-left align-middle transition-all transform bg-white rounded-lg shadow-xl flex-nowrap">
                            {/* Search Bar */}
                            <SearchModalHeader
                                inputRef={inputRef}
                                listening={listening}
                                clearSearch={clearSearch}
                                handleSearch={handleSearch}
                                selectedCategory={selectedCategory}
                                searchCategories={searchCategories}
                                SpeechRecognition={SpeechRecognition}
                                handleSetSelectedCategory={
                                    handleSetSelectedCategory
                                }
                                browserSupportsSpeechRecognition={
                                    browserSupportsSpeechRecognition
                                }
                            />

                            {/* H-Divider */}
                            <div className="border-t border-search-dark-blue/10" />

                            {/* Search Items Container */}
                            <SearchModalItems searchList={searchList} />

                            {searchList.results.length === 0 ? (
                                <></>
                            ) : (
                                <>
                                    {/* H-Divider */}
                                    <div className="border-t border-search-dark-blue/10" />

                                    {/* Search Footer */}
                                    <SearchModalFooter
                                        searchItemsCount={content.length}
                                    />
                                </>
                            )}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default SearchModal;
