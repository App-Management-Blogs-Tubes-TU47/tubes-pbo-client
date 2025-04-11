import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ThemeToggleButton from "@/feature/theme/components/theme-toggle";

const LandingLayouts: React.FC = () => {
  const { users, clearUsers } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="sticky top-0">
        <div className="flex justify-between items-center border-b p-4 shadow-md px-4">
          <div className="text-2xl font-bold">NulisAja</div>
          <div className="space-x-4 flex items-center">
            <ThemeToggleButton />
            {users.token ? (
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant={"outline"}>Hi {users.name}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={()=> navigate('/dashboard')}>Dashboard</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => clearUsers()}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button color="primary" onClick={() => navigate("signin")}>
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LandingLayouts;
