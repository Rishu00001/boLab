"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/EmptyOrg";
import { useSearchParams } from "next/navigation";
import { BoardList } from "./_components/Board-list";

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const { organization } = useOrganization();

  // Convert URLSearchParams to plain object for display
  const paramsObj = Object.fromEntries(searchParams.entries());

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={paramsObj} />
      )}
    </div>
  );
};

export default DashboardPage;
