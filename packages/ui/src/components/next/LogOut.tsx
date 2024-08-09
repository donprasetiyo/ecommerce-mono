'use client'
import { logout } from "@repo/next-lib/auth/logout";
import {
  DropdownMenuItem
} from "@repo/ui/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

const LogOutComponent = () => {

  const pathname = usePathname();

  return (
      <DropdownMenuItem className="cursor-pointer" onClick={() => logout(pathname)}>
        Log out
        {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
      </DropdownMenuItem>
  );
}

export default LogOutComponent;