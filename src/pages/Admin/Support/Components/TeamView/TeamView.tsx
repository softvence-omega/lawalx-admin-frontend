import { TeamStats } from "./Components/TeamStats";
import { TeamTicketsTable } from "./Components/TeamTicketsTable";

const TeamView = () => {
  return (
    <div className="space-y-14">
      {/* Stats Cards Section */}
      <TeamStats />
      {/* Main Table Section */}
      <TeamTicketsTable />
    </div>
  );
};

export default TeamView;
