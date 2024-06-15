"use server";

import { APP_URL } from "../defaults";
import { createClient } from "../supabase/server";
import { cookies } from "next/headers";

const supabase = createClient(cookies());

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};


export const signUp = async (email: string, password: string) => {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${APP_URL}/auth/callback`,
    },
  });
}

export const requestPasswordReset = async ( email: string ) => {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${APP_URL}/auth/callback`
  })
} 