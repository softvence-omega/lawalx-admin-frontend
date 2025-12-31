import Compliance from "./Components/Compliance";
import DataEncryption from "./Components/DataEncryption";
import GlobalRoleManagement from "./Components/GlobalRoleManagement";
import Session from "./Components/Session";

const SecurityPrivacy = () => {
  return (
    <div>
      <GlobalRoleManagement />
      <div className="flex gap-[22px] my-8">
        <DataEncryption />
        <Compliance />
      </div>
      <Session />
    </div>
  );
};

export default SecurityPrivacy;
