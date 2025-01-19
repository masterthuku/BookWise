import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./database/drizzle";
import { eq } from "drizzle-orm";
import { Users } from "./database/schema";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db
          .select()
          .from(Users)
          .where(eq(Users.email, credentials.email.toString()))
          .limit(1);

        if (user.length > 0) return null;

        const isPasswordValid = await compare(
          credentials.password.toString(),
          user[0].password
        );

        if (!isPasswordValid) return null;

        return {
          id: user[0].id.toString(),
          name: user[0].fullName,
          email: user[0].email,
        } as User;
      },
    }),
  ],
});
