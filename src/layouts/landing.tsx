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
import { PenTool } from "lucide-react";

const LandingLayouts: React.FC = () => {
  const { users, clearUsers } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50 bg-background">
        <div className="flex justify-between items-center border-b p-4 shadow-md px-4">
          <div
            className="text-2xl font-bold cursor-pointer flex items-center gap-1"
            onClick={() => navigate("/")}
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-accent-foreground/20">
              <PenTool className="h-5 w-5" />
            </div>
            NulisAja
          </div>
          <div className="space-x-4 flex items-center">
            <ThemeToggleButton />
            {users.token ? (
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant={"outline"}>Hi {users.user.name}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                        Dashboard
                      </DropdownMenuItem>
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
      <div className="w-screen flex items-center self-center justify-center">
        <div className="md:w-[80vw] w-screen p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LandingLayouts;
