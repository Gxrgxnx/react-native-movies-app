import httpClient from './httpClient';

export const getTvSeries = async ({
  searchPhrase,
  page,
}: {
  searchPhrase?: string;
  page?: number;
}) => {
  let url = 'shows';

  if (!!searchPhrase) {
    url = `search/shows?q=${searchPhrase}`;
  }

  if (!!page && !searchPhrase) {
    url += `?page=${page}`;
  }

  const res = await httpClient.get(url);

  return res.data;
};
