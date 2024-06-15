"use client"

import Submit from "@/components/SubmitButton";
import { APP_URL } from "@/lib/defaults";
import { createClient } from "@/lib/supabase/client";
import { useState, useTransition } from "react";

export default function Form() {

  const supabase = createClient()

  const [transition, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string>()

  const handleSubmit = async(formdata: FormData) => {
    const email = formdata.get('email') as string;

    startTransition(async() => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${APP_URL}/auth/change-password`
      })

      if(error){
        setErrorMessage(error.message)
      }
      
    })
  }


  return (
    <div className="animate-in flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center">
      <h1 className="text-center text-2xl font-thin mb-5">You are requesting to change your password.</h1>

      {
        errorMessage && <p className="text-red-500 text-center">{ errorMessage }</p>
      }
      
      <form
        className="flex-1 flex flex-col w-full justify-center text-foreground"
        action={ handleSubmit }
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        
        <button className="rounded-md bg-btn-background hover:bg-btn-background/70 transition-colors px-4 py-2 text-foreground mb-2">
          <Submit loadingText="Sending" laodingState={ transition } btnText="Request Password Reset" />
        </button>
      </form>
      
    </div>
  );
}
