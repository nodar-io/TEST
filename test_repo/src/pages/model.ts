import { createEffect, createStore } from 'effector';
import { client } from '../shared/api/graphql';
import SearchRepos from '../shared/api/graphql/docs/repositories.gql';
import GetUserRepos from '../shared/api/graphql/docs/user.gql';

export const fetchReposFx = createEffect(async ({ searchQuery, after }) => {
  const variables = {
    query: searchQuery,
    after
  };

  return await client.request(SearchRepos, variables);
});

export const fetchUserFx = createEffect(async () => {
  return await client.request(GetUserRepos);
});

// Состояние для хранения репозиториев и информации о пагинации
export const $reposStore = createStore({ repos: [], pageInfo: {}, searchQuery: '' })
  .on(fetchReposFx.doneData, (_, { search }) => ({
    repos: search.edges,
    pageInfo: search.pageInfo
  }))
  .on(fetchUserFx.doneData, (_, { viewer }) => ({
    repos: viewer.repositories.edges,
    pageInfo: viewer.repositories.pageInfo
  }));
