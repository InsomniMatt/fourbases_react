import { configureStore } from '@reduxjs/toolkit';
import baselinePlayerReducer from './features/baselinePlayer/baselinePlayerSlice';
import activePlayerReducer from './features/activePlayer/activePlayerSlice';
import rollingStatsReducer from './features/rollingStats/rollingStatsSlice';
import chartModeReducer from './features/chartMode/chartModeSlice';
import activePageReducer from './features/activePage/activePageSlice';
import queryAttributesReducer from './features/queryAttributes/queryAttributes';

export default configureStore({
  reducer: {
    activePage: activePageReducer,
    activePlayer: activePlayerReducer,
    baselinePlayer: baselinePlayerReducer,
    chartMode: chartModeReducer,
    rollingStats: rollingStatsReducer,
    queryAttributes: queryAttributesReducer,
  },
});