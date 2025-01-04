import { Outlet } from "react-router-dom";

export function BaseLayout() {
  return (
    <main className="min-h-screen container mx-auto grid place-items-center">
      <Outlet />
    </main>
  );
}
