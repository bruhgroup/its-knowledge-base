"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/Icons";
import { signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({
  className,
  action,
  ...props
}: UserAuthFormProps & { action: "signin" | "signout" }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  return (
    <div className={cn("self-center", className)} {...props}>
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          setIsLoading(true);
          action === "signin"
            ? signIn("google", { callbackUrl })
            : signOut({ callbackUrl });
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        {action === "signin" ? "Login" : "Logout"} with Google
      </Button>
    </div>
  );
}
