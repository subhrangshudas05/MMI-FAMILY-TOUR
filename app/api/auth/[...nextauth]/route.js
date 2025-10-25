// app/api/auth/[...nextauth]/route.js
import NextAuthModule from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

// Handle both import formats for both NextAuth and GoogleProvider
const NextAuth = NextAuthModule.default || NextAuthModule;
const Provider = GoogleProvider.default || GoogleProvider;



export const authOptions = {
  providers: [
    Provider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectDb();

          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const ADMIN_EMAILS = process.env.ADMIN_EMAILS
              ? process.env.ADMIN_EMAILS.split(",").map((email) => email.trim())
              : [];

            const role = ADMIN_EMAILS.includes(user.email) ? "admin" : "user";

            existingUser = await User.create({
              email: user.email,
              username: user.email.split("@")[0],
              role,
            });
          }

          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return false;
    },

    async session({ session }) {
      try {
        await connectDb();
        const dbUser = await User.findOne({ email: session.user.email });

        if (dbUser) {
          session.user.name = dbUser.username;
          session.user.role = dbUser.role;
        } else {
          session.user.role = "user";
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        session.user.role = "user";
        return session;
      }
    },
  },

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };