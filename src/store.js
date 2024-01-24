import {configureStore} from '@reduxjs/toolkit';
import baselinePlayerReducer from './features/baselinePlayer/baselinePlayerSlice';
import {playerReducer} from './features/player/playerSlice';
import {teamReducer} from './features/team/teamSlice';
import {searchReducer} from './features/search/searchSlice';
import rollingStatsReducer from './features/rollingStats/rollingStatsSlice';
import chartModeReducer from './features/chartMode/chartModeSlice';
import activePageReducer from './features/activePage/activePageSlice';
import queryAttributesReducer from './features/queryAttributes/queryAttributes';

export default configureStore({
  reducer: {
    activePage: activePageReducer,
    player: playerReducer,
    team: teamReducer,
    search: searchReducer,
    baselinePlayer: baselinePlayerReducer,
    chartMode: chartModeReducer,
    rollingStats: rollingStatsReducer,
    queryAttributes: queryAttributesReducer,
  },
});