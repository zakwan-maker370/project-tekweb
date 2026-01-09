import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const isDetail = location.pathname.startsWith("/kost/");

  return (
    <div className="relative min-h-screen">
      
      {/* HOME (TETAP MOUNTED) */}
      <div className={isDetail ? "pointer-events-none blur-[1px]" : ""}>
        <Outlet />
      </div>

      {/* DETAIL OVERLAY */}
      {isDetail && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
