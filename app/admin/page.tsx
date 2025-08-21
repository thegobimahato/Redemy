import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { DataTable } from "@/components/sidebar/data-table";
import { SectionCards } from "@/components/sidebar/section-cards";

import data from "./data.json";

export const metadata = {
  title: "Admin Dashboard",
  description:
    "Manage courses, users, and settings in the Redemy admin dashboard.",
};

const AdminIndexPage = () => {
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>

      <DataTable data={data} />
    </>
  );
};

export default AdminIndexPage;
