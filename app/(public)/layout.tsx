import React from "react";

import Navbar from "./_components/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 lg:px-8">{children}</main>
    </>
  );
};

export default MainLayout;
