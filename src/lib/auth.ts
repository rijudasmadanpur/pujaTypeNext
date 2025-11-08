// // lib/auth.ts
// import { NextAuthOptions, User } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// // Type declarations
// declare module "next-auth" {
//     interface User {
//         id: string;
//         email: string;
//         name?: string | null;
//         role?: string;
//     }

//     interface Session {
//         user: User;
//     }
// }

// declare module "next-auth/jwt" {
//     interface JWT {
//         id?: string;
//         role?: string;
//     }
// }

// // Mock user database - replace this with your actual data source
// const users = [
//     {
//         id: "1",
//         email: "user@example.com",
//         password: "password123", // In real app, never store plain passwords
//         name: "Test User",
//         role: "user"
//     },
//     {
//         id: "2",
//         email: "admin@example.com",
//         password: "admin123",
//         name: "Admin User",
//         role: "admin"
//     }
// ];

// export const authOptions: NextAuthOptions = {
//     providers: [
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {
//                 email: { label: "Email", type: "email", placeholder: "user@example.com" },
//                 password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials): Promise<User | null> {
//                 if (!credentials?.email || !credentials?.password) {
//                     throw new Error("Email and password are required");
//                 }

//                 try {
//                     // Find user by email
//                     const user = users.find(u => u.email === credentials.email);

//                     if (!user) {
//                         throw new Error("No user found with this email");
//                     }

//                     // Check password (plain text comparison for demo - NOT for production)
//                     if (user.password !== credentials.password) {
//                         throw new Error("Invalid password");
//                     }

//                     // Return user object without password
//                     return {
//                         id: user.id,
//                         email: user.email,
//                         name: user.name,
//                         role: user.role,
//                     };
//                 } catch (error) {
//                     console.error("Auth error:", error);
//                     throw error;
//                 }
//             }
//         })
//     ],
//     session: {
//         strategy: "jwt",
//         maxAge: 30 * 24 * 60 * 60, // 30 days
//     },
//     callbacks: {
//         async jwt({ token, user, trigger, session }) {
//             // Add user info to token on sign in
//             if (user) {
//                 token.id = user.id;
//                 token.role = user.role;
//                 token.email = user.email;
//                 token.name = user.name;
//             }

//             // Update token with session data if updating session
//             if (trigger === "update" && session) {
//                 token = { ...token, ...session };
//             }

//             return token;
//         },
//         async session({ session, token }) {
//             // Add user info to session
//             if (token) {
//                 session.user.id = token.id as string;
//                 session.user.role = token.role as string;
//                 session.user.email = token.email as string;
//                 session.user.name = token.name as string;
//             }
//             return session;
//         },
//         async redirect({ url, baseUrl }) {
//             // Redirect to dashboard after login
//             if (url.startsWith("/")) return `${baseUrl}${url}`;
//             else if (new URL(url).origin === baseUrl) return url;
//             return baseUrl;
//         }
//     },
//     pages: {
//         signIn: "/auth/signin",
//         signUp: "/auth/signup",
//         error: "/auth/error",
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     debug: process.env.NODE_ENV === "development",
// };