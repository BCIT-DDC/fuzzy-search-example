/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import SearchItem from '../SearchItem';

const SearchModalItems = ({ searchList }) => {
    return (
        <>
            <div className="search-container flex-grow overflow-auto py-2 min-h-[40px] max-h-[600px]">
                <ul className="">
                    {searchList.results.length === 0 ? (
                        <div className="flex items-center justify-center my-8 text-search-dark-blue/30">
                            No Results Found
                        </div>
                    ) : (
                        searchList.results.map((item, idx) => (
                            <li
                                key={`item.title ${idx}`}
                                className="mx-2 my-1.5 rounded-md  snap-always snap-center transition duration-200 ease-in-out hover:cursor-pointer hover:bg-search-gray"
                            >
                                <SearchItem item={item} />
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </>
    );
};

export default SearchModalItems;
