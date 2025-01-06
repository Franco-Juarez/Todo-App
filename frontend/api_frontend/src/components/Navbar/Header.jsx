import { Bell } from "lucide-react";
import { User } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <nav className="w-full flex justify-between items-center px-2">
      <div className="flex items-center gap-4">
        <span className="flex gap-4 bg-white border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <Search />
          <input className="bg-transparent md:min-w-80" type="text" placeholder="Search"  />
        </span>
      </div>
      <ul className="gap-4 items-center justify-center p-4 hidden md:flex">
        <li>
          <a href="#" className="text-slate-800 hover:underline">
            <Bell />
          </a>
        </li>
        <li>
          <a href="#" className="text-slate-800 hover:underline flex gap-2">
          <CalendarDays />
          </a>
        </li>
        <li>
          <a href="#" className="text-slate-800 hover:underline flex items-center gap-2">
            <User />
            Sullivan 
            <ChevronDown />
          </a>
        </li>
      </ul>
      
    </nav>
  );
};

export default Header;
