/* eslint-disable react/prop-types */
import { ArrowCircleRightIcon } from '@heroicons/react/solid';

const SearchModalFooter = ({ searchItemsCount }) => {
    return (
        <>
            <footer className="flex-shrink-0 my-2 ">
                <div className="flex flex-row items-center justify-center mx-2">
                    {searchItemsCount === 0 ? (
                        <></>
                    ) : (
                        <div className="transition duration-200 ease-in-out rounded-md text-search-dark-blue hover:cursor-pointer hover:bg-search-gray search-item">
                            <article className="flex items-center justify-center px-2 py-1 space-x-2">
                                <div className="flex-auto min-w-0">
                                    <div className="flex flex-col">
                                        <h2 className="flex items-start font-semibold text-gray-600 truncate">
                                            See All Results
                                        </h2>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-center search-btn">
                                    <div>
                                        <span className="sr-only">Select</span>
                                        <ArrowCircleRightIcon className="w-5 h-5 text-blue-600 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                                    </div>
                                </div>
                            </article>
                        </div>
                    )}
                </div>
            </footer>
        </>
    );
};

export default SearchModalFooter;
