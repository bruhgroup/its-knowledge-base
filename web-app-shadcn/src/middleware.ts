import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req: { cookies } }) => {
      const secure = process.env.NODE_ENV === "production" ? "__Secure-" : "";
      const sessionToken = cookies.get(`${secure}next-auth.session-token`);
      return sessionToken != null;
    },
  },
});

export const config = {
  matcher: ["/history/:page*", "/analytics/:page*"],
};

// https://github.com/nextauthjs/next-auth/discussions/4265#discussioncomment-7547821
