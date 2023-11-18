import { UserAuthForm } from "@/components/authentication/UserAuthForm";
import React from "react";

export default function LogoutPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Logout</h1>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to log out?
        </p>
      </div>
      <UserAuthForm action={"signout"} />
    </>
  );
}
