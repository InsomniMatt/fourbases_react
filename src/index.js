import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import App from './App';
import ErrorPage from './components/ErrorPage';
import About from './components/About';
import CardIndex from './components/CardIndex';
import PlayerCard from './components/PlayerCard';
import TeamCard from './components/TeamCard';
import { Provider } from 'react-redux';
import store from './store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/players/:playerId",
        element: <PlayerCard />
      },
      {
        path: "/teams/:teamId",
        element: <TeamCard />
      }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </React.StrictMode>
);
