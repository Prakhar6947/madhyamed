import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { user_server } from "@/models/user";
import mongoConnect from "@/lib/mongo"
import { doctor_server } from "@/models/doctor";

const handler = NextAuth({
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            id: 'patient-login',
            name: 'Patient_login',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await mongoConnect()
                console.log(credentials)
                const user = await user_server.findOne({ email: credentials.email });
                if (!user) throw new Error("No user found");
                const valid = credentials.password == user.password;
                if (!valid) throw new Error("Invalid password");
                return user;
            }
        }),
        CredentialsProvider({
            id: 'doctor-login',
            name: 'Doctor_login',
            credentials: {
                contact: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await mongoConnect()
                console.log(credentials)
                const user = await doctor_server.findOne({ contact: credentials.contact });
                console.log(user)
                if (!user) throw new Error("No user found");
                const valid = credentials.password == user.password;
                if (!valid) throw new Error("Invalid password");
                return user;
            }
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {

            if (account.provider == 'google') {
                if (!profile?.email) {
                    throw new Error("No email found")
                }

                await mongoConnect()

                const existingUser = await user_server.findOne({ email: profile.email })


                if (existingUser) {
                    existingUser.name = profile.name
                    existingUser.image = profile.picture
                    existingUser.type = 'Patient'
                    await existingUser.save()
                }

                if (!existingUser) {
                    await user_server.create({
                        email: profile.email,
                        name: profile.name,
                        image: profile.picture,
                        type: "Patient",
                        password: null
                    });

                }
            }
            return true
        },
        async jwt({ token, profile, user }) {
            if (profile) {
                await mongoConnect();
                const user_g = await user_server.findOne({ email: profile.email })
                if (user_g) {
                    token.id = user_g._id
                    token.contact = profile.email
                    token.name = profile.name
                    token.image = profile.picture
                    token.password = user_g.password
                    token.type = user_g.type
                } else {
                    throw new Error("User not found!")
                }
            } else if (user) {
                token.id = user._id
                token.name = user.name
                token.qualifications = user.qualifications || null
                token.specialization = user.specialization || null
                token.experience = user.experience || null
                token.hospital = user.hospital || null
                token.location = user.location || null
                token.availability = user.availability || null
                token.contact = user.contact || user.email
                token.password = user.password 
                token.image = user.image
                token.type = user.type
            }
            return token
        },
        async session({ session, token }) {
            if (token?.id) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.qualifications = token.qualifications 
                session.user.specialization = token.specialization 
                session.user.experience = token.experience 
                session.user.hospital = token.hospital 
                session.user.location = token.location 
                session.user.availability = token.availability 
                session.user.contact = token.contact 
                session.user.email = token.contact
                session.user.password = token.password
                session.user.image = token.image
                session.user.type = token.type
            }
            return session
        },

    }
})

export { handler as GET, handler as POST };