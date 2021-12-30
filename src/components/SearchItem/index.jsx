/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import { ArrowCircleRightIcon } from '@heroicons/react/solid';

const SearchItem = ({ item }) => {
    return (
        <>
            <article className="flex h-16 p-2 space-x-6">
                <img
                    src={item.img}
                    alt=""
                    className="flex-none object-cover rounded-[2.5px] aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4"
                />
                <div className="flex-auto min-w-0">
                    <div className="flex flex-col h-full">
                        <h2 className="flex items-start font-semibold truncate text-search-dark-blue">
                            {item.title}
                        </h2>

                        <div className="flex items-end w-full">
                            <dt className="sr-only">Author</dt>
                            <dd className="text-sm truncate text-search-dark-blue/30">
                                {item.author}
                            </dd>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-1 search-btn">
                    <div>
                        <span className="sr-only">Select</span>
                        <ArrowCircleRightIcon className="w-5 h-5 text-search-dark-blue md:h-6 md:w-6 lg:h-7 lg:w-7" />
                    </div>
                </div>
            </article>
        </>
    );
};

export default SearchItem;
