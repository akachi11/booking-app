"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { signOut } from '@/auth';

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = params;

  try {
    const result = await signIn("credentials", {
      email,
      password, 
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, "Signin error");
    return { success: false, error: "Signin error" };
  }
};

export const signUp = async(params: AuthCredentials) => {
    const { fullName, email, password, role } = params;

    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if(existingUser.length > 0) {
        return {success: false, error: "User already exists"};
    }

    const hashedPassword = await hash(password, 10);

    try {
        await db.insert(users).values({
            fullName,
            email,
            password: hashedPassword,
            role
        })

        // try {
        //   console.log("Triggering Upstash Workflow...");
        //   const response = await workflowClient.trigger({
        //     url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
        //     body: { email, fullName }
        //   });
        
        //   console.log("Workflow Trigger Response:", response);
        // } catch (error) {
        //   console.error("Failed to trigger workflow:", error);
        // }       

        // await signInWithCredentials({email, password});
        return {success: true};
    } catch (error) {
        console.log(error, "Sign up error");
        return {success: false, error: "Sign up error"};
    }
}

export async function signOutFunction() {
    await signOut()
}