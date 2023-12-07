"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface LogoutButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export function LogoutButton({ ...props }: LogoutButtonProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  return (
    <Button
      variant="ghost"
      type="button"
      onClick={() => signOut({ callbackUrl })}
      {...props}
    >
      Logout
    </Button>
  );
}
