import { TvSeries } from '../../models/tvSeries';
import { SET_TV_SERIES } from '../actions/tvSeries';

const initialState = {
  tvSeries: [],
};

export default (
  state = initialState,
  action: { type: string; tvSeries: TvSeries[] },
) => {
  switch (action.type) {
    case SET_TV_SERIES:
      return {
        tvSeries: action.tvSeries,
      };
  }
  return state;
};
