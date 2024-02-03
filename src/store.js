import {configureStore} from '@reduxjs/toolkit';
import {playerReducer} from './features/player/playerSlice';
import {teamReducer} from './features/team/teamSlice';
import {searchReducer} from './features/search/searchSlice';
import {trendingReducer} from './features/trending/trendingSlice';
import queryAttributesReducer from './features/queryAttributes/queryAttributes';

export default configureStore({
  reducer: {
    player: playerReducer,
    team: teamReducer,
    search: searchReducer,
    trending: trendingReducer,
    queryAttributes: queryAttributesReducer,
  },
});