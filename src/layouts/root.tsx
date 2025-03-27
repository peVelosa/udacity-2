import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <div className="p-4">
      <Outlet />
    </div>
  );
};
