import { FiChevronsRight } from "react-icons/fi";
import ProfileUserEdit from "./components/ProfileUserEdit";

const Setting = () => {
  return (
    <div className="pb-40"> 
      <div className="flex items-center gap-x-2 mb-10 md:mb-14">
        <FiChevronsRight size={20} />
        <p className="text-sm font-medium">Pengaturan account</p>
      </div>
      <ProfileUserEdit />
    </div>
  );
};

export default Setting;
