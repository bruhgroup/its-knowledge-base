import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string | null;
  }
}

// https://next-auth.js.org/getting-started/typescript#extend-default-interface-properties
