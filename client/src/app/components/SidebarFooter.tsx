import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries/user";
import Image from "next/image";
import Link from "next/link";
import { IoSettingsSharp } from "react-icons/io5"; 

const userId = "cm6riizex0001ts4wwjbxz18n"; 

const SidebarFooter = ({ isSidebarOpen }) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userId },
  });

  return (
    <div className="border-t border-gray-700 pt-4">
      {/* User Profile Section */}
      <div className="mt-6 flex items-center space-x-3">
        <div className="relative w-8 h-8">
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-gray-500 animate-pulse"></div>
          ) : error ? (
            <div className="w-8 h-8 rounded-full bg-red-500"></div>
          ) : (
            <Image
              src={data?.user?.avatar || "/default-avatar.png"}
              alt={data?.user?.name || "User Avatar"}
              fill
              className="rounded-full object-cover"
            />
          )}
        </div>

        {isSidebarOpen && !loading && !error && (
          <span className="text-sm">{data?.user?.name}</span>
        )}
      </div>

      
      <ul className={`${isSidebarOpen ? "space-y-4" : "space-y-2"} mt-4`}>
        <li className="flex items-center">
          <Link href="/account" className="flex items-center text-sm hover:text-gray-300 transition-colors">
            <IoSettingsSharp className="text-xl mr-6  mt-2 text-gray-400" /> {/* Account icon */}
            {isSidebarOpen && <span>Account</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarFooter;
