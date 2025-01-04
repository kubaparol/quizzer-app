import { Outlet } from "react-router-dom";

export function BaseLayout() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <Outlet />
    </main>
  );
}
