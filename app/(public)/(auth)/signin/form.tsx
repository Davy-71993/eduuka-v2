"use client"

import Submit from "@/components/SubmitButton";
import Google from "@/components/icons/Google";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";

export default function Form() {
  const supabase = createClient()

  // console.log(await supabase.auth.getUser())
  const [transition, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [success, setSuccess] = useState(false)

  const handleSignin = async(formdata: FormData) => {
    
    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string

    startTransition(async() => {
      const { data, error } = await supabase.auth.signInWithPassword({email, password})
      if(error){
        setErrorMessage(error.message)
        return
      }

      setSuccess(true)

      location.reload()
    })
  }


  return (
    <div className="animate-in flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center border-2 py-10 rounded-sm border-primary">
      <h1 className="text-center text-2xl font-thin mb-5">Welcom back, Login.</h1>
      { errorMessage && (
        <div className="text-center">
          <p className="text-red-400">{ errorMessage }</p>
        </div>
      )}

      <form
        className="flex-1 flex flex-col w-full justify-center text-foreground"
        action={ handleSignin }
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          id="email"
          name="email"
          autoComplete="false"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          id="password"
          autoComplete="false"
          name="password"
          placeholder="••••••••"
          required
        />
        <Button className={`transition-colors ${ success && 'bg-green-500'} py-5 text-primary-foreground flex space-x-5 mb-2 text-xl`}>
          {
            success && 
            <Check />
          }
          <Submit loadingText="Signing In" laodingState={ transition } btnText="Sign In" />
        </Button>
      </form>
      <Google />
      <div className="mt-5">
        <Link href="/auth/reset-password">
          <p className="text-center text-sm underline">Forgot password?</p>
        </Link>
        <Link href="/signup">
          <p className="text-center text-sm underline">Do not have an account? Sign Up now</p>
        </Link>
      </div>
    </div>
  );
}
