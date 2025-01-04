import { Outlet } from "react-router-dom";

export function BaseLayout() {
  return (
    <main className="min-h-screen w-full p-4 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <Outlet />
    </main>
  );
}
