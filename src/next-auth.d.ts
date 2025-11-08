import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"];
    backendUser?: {
      GoogleUserID: number;
      GoogleID: string;
      Email: string | null;
      RawPhone: string | null;
      CountryCode: string | null;
      UserType: number;
      Active: number;
      EntryTimeStamp: string;
      Message: string | null;
      StatusCode: number | null; // allow null from backend
    } | null; // backendUser itself can be null
    statusCode?: number | null; // allow null
  }

  interface User extends DefaultUser {
    id?: string; // Google gives "id"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendUser?: Session["backendUser"];
    statusCode?: number | null; // allow null
  }
}
