import { useSearchParams, Link } from 'react-router-dom';
import { SearchAll } from './partials/SearchAll';
import { SearchSets } from './partials/SearchSets';
import SearchClasses from './partials/SearchClasses';
import { SearchUsers } from './partials/SearchUsers';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const stringSearch = searchParams.get('query');
  const typeSearch = searchParams.get('type');

  const renderComponent = (type) => {
    switch (type) {
      case 'all':
        return <SearchAll stringSearch={stringSearch} />;
      case 'sets':
        return <SearchSets stringSearch={stringSearch} />;
      case 'classes':
        return <SearchClasses stringSearch={stringSearch} />;
      case 'users':
        return <SearchUsers stringSearch={stringSearch} />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <div className='font-bold text-2xl'>Results for "{stringSearch}"</div>
      <ul className='flex w-2/5 justify-between mt-10'>
        <li
          className={`px-4 py-1 border-2 rounded-xl shadow-2xl ${
            typeSearch === 'all'
              ? 'border-blue-700 text-white bg-blue-700'
              : 'text-black bg-white border-black hover:bg-blue-700 hover:text-white hover:border-blue-700'
          }`}
        >
          <Link
            to={`/search?query=${stringSearch}&type=all`}
            onClick={() => {
              window.location.href = `/search?query=${stringSearch}&type=all`;
            }}
            className='flex items-center justify-center'
          >
            All Results
          </Link>
        </li>
        <li
          className={`px-4 py-1 border-2 rounded-xl shadow-2xl ${
            typeSearch === 'sets'
              ? 'border-blue-700 text-white bg-blue-700'
              : 'text-black bg-white border-black hover:bg-blue-700 hover:text-white hover:border-blue-700'
          }`}
        >
          <Link
            to={`/search?query=${stringSearch}&type=sets`}
            onClick={() => {
              window.location.href = `/search?query=${stringSearch}&type=sets`;
            }}
            className='flex items-center justify-center'
          >
            Sets
          </Link>
        </li>
        <li
          className={`px-4 py-1 border-2 rounded-xl shadow-2xl ${
            typeSearch === 'classes'
              ? 'border-blue-700 text-white bg-blue-700'
              : 'text-black bg-white border-black hover:bg-blue-700 hover:text-white hover:border-blue-700'
          }`}
        >
          <Link
            onClick={() => {
              window.location.href = `/search?query=${stringSearch}&type=classes`;
            }}
            className='flex items-center justify-center'
          >
            Classes
          </Link>
        </li>
        <li
          className={`px-4 py-1 border-2 rounded-xl shadow-2xl ${
            typeSearch === 'users'
              ? 'border-blue-700 text-white bg-blue-700'
              : 'text-black bg-white border-black hover:bg-blue-700 hover:text-white hover:border-blue-700'
          }`}
        >
          <Link
            to={`/search?query=${stringSearch}&type=users`}
            onClick={() => {
              window.location.href = `/search?query=${stringSearch}&type=users`;
            }}
            className='flex items-center justify-center'
          >
            Users
          </Link>
        </li>
      </ul>
      <hr className='mt-4 mb-8' />
      <section className='pb-20'>{renderComponent(typeSearch)}</section>
    </>
  );
};
