import { useUnit } from 'effector-react';
import { $reposStore, fetchReposFx, fetchUserFx } from './model';
import { useEffect, useState } from 'react';

export const HomePage = () => {
  console.log();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const repos = useUnit($reposStore).repos;
  const pageInfo = useUnit($reposStore).pageInfo;

  useEffect(() => {
    fetchUserFx();
  }, []);

  useEffect(() => {
    const query = search ? `${search} in:name` : '';
    if (query) {
      fetchReposFx({ searchQuery: query, after: null });
    } else {
      fetchUserFx();
    }
  }, [search, currentPage]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchReposFx({ searchQuery: search ? `${search} in:name` : '', after: null });
  };

  const renderPaginator = () => {
    const pages = Math.min(10, pageInfo.hasNextPage ? currentPage + 1 : currentPage);
    return (
      <div>
        {Array.from({ length: pages }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>GitHub Repositories</h1>
      <input
        type='text'
        value={search}
        onChange={handleSearch}
        placeholder='Search repositories...'
      />
      <ul>
        {repos.map(({ node }) => (
          <li key={node.id}>
            {node.name} - {node.stargazerCount} stars -{' '}
            {new Date(node.updatedAt).toLocaleDateString()} - {node.url}
          </li>
        ))}
      </ul>
      {renderPaginator()}
    </div>
  );
};
