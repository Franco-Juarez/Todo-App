import { User } from "lucide-react";
import { Settings } from "lucide-react";
import { Clock } from "lucide-react";
import { Mail } from "lucide-react";
import { Home } from "lucide-react";
import { CheckCheck } from "lucide-react";

const SideBarMenu = () => {
  return (
    <div className="flex flex-col items-center gap-8 p-2">
      <div className="p-4 flex justify-center max-w-20 mx-auto bg-violet-400 rounded-full mt-2 mb-6">
        <CheckCheck
        className="text-white"
        />
      </div>
      <Home />
      <User />
      <Mail />
      <Clock />
      <Settings />
    </div>
  );
}

export default SideBarMenu;