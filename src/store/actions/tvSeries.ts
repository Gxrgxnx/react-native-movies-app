import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTvSeries } from '../../httpClient/tvSeries';
import { TvSeries } from '../../models/tvSeries';

export const SET_TV_SERIES = 'SET_TV_SERIES';

export const fetchTvSeries = ({
  searchPhrase,
  page,
  offline,
}: {
  searchPhrase?: string;
  page?: number;
  offline?: boolean;
}) => {
  return async (dispatch: Function, getState: Function) => {
    try {
      let data: any = await getTvSeries({ searchPhrase, page });
      let loadedTvSeries = [];

      if (!!searchPhrase) {
        data = data.map((item: { score: number; show: object }) => item.show);
        loadedTvSeries = [];
      }

      if (!searchPhrase && page === 1) {
        loadedTvSeries = [];
      }
      if (!searchPhrase && page && page > 1) {
        loadedTvSeries = getState().tvSeries.tvSeries;
      }

      for (const key in data) {
        loadedTvSeries.push(new TvSeries(data[key]));
      }

      if (offline) {
        const value = await AsyncStorage.getItem('LOADED_TV_SERIES');

        if (value !== null) {
          loadedTvSeries = JSON.parse(value);
        }
      } else {
        await AsyncStorage.setItem(
          'LOADED_TV_SERIES',
          JSON.stringify(loadedTvSeries),
        );
      }

      dispatch({
        type: SET_TV_SERIES,
        tvSeries: loadedTvSeries,
      });
    } catch (err) {
      throw err;
    }
  };
};
