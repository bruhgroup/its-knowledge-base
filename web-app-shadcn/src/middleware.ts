import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req: { cookies } }) => {
      const sessionToken = cookies.get("next-auth.session-token");
      return sessionToken != null;
    },
  },
});

export const config = {
  matcher: ["/history/:page*"],
};

// https://github.com/nextauthjs/next-auth/discussions/4265#discussioncomment-7547821
