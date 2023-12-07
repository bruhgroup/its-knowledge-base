"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Icons } from "@/components/Icons";

interface LogoutButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export function LogoutButton({ ...props }: LogoutButtonProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  return (
    <Button
      variant="ghost"
      type="button"
      onClick={() => {
        setClicked(true);
        return signOut({ callbackUrl });
      }}
      {...props}
    >
      {clicked ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "Logout"
      )}
    </Button>
  );
}
