import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import NotFoundView from 'src/views/errors/NotFoundView';
import AddCardView from 'src/views/AddCard/AddCardView';
import Subjects from './views/Cards/Subjects';
import CardsView from './views/Cards/index';

const routes = [
  {
    path: 'informatik',
    element: <DashboardLayout />,
    children: [
      { path: 'programmieren', element: <CardsView /> },
      { path: '/', element: <Navigate to="/programmieren" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Subjects /> },
      { path: 'addCard', element: <AddCardView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
