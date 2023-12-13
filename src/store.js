import { configureStore } from '@reduxjs/toolkit';
import baselinePlayerReducer from './features/baselinePlayer/baselinePlayerSlice';
import activePlayerReducer from './features/activePlayer/activePlayerSlice';
import rollingStatsReducer from './features/rollingStats/rollingStatsSlice';
import chartModeReducer from './features/chartMode/chartModeSlice';

export default configureStore({
  reducer: {
    baselinePlayer: baselinePlayerReducer,
    activePlayer: activePlayerReducer,
    rollingStats: rollingStatsReducer,
    chartMode: chartModeReducer,
  },
});