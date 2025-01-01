import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { BaseLayout } from "../components/layouts/BaseLayout";
import { MainPage } from "../pages/MainPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { QuizPage } from "../pages/QuizPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "quiz",
        element: <QuizPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes);

export function Routes() {
  return <RouterProvider router={router} />;
}
