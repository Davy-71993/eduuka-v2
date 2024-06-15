"use client"

import Submit from "@/components/SubmitButton";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { useState, useTransition } from "react";

export default function Form() {
  
  const [transition, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string>()

  const handleSubmit = (formdata: FormData) => {
    const supabase = createClient()
    const password = formdata.get('password') as string;
    const confirm_password = formdata.get('confirm_password') as string;

    if(password != confirm_password){
      setErrorMessage("The two passwords didn't match")
      return
    }

    startTransition(async() => {
      const { error } = await supabase.auth.updateUser({
        password
      })

      if(error){
        setErrorMessage(error.message)
        return
      }
      return redirect('/')
    })
  }


  return (
    <div className="animate-in flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center">
      <h1 className="text-center text-2xl font-thin mb-5">Create your new password.</h1>
      { errorMessage && (
        <div className="text-center">
          <p className="text-red-400">{ errorMessage }</p>
        </div>
      )}
      <form
        className="flex-1 flex flex-col w-full justify-center text-foreground"
        action={ handleSubmit }
      >
        <label className="text-md" htmlFor="email">
          New Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="password"
          type="password"
          placeholder="••••••••"
          required
        />

        <label className="text-md" htmlFor="email">
          Retype Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="confirm_password"
          type="password"
          placeholder="••••••••"
          required
        />
        
        <button className="rounded-md bg-btn-background hover:bg-btn-background/70 transition-colors px-4 py-2 text-foreground mb-2">
          <Submit loadingText="Signing In" laodingState={ transition } btnText="Change Password" />
        </button>
      </form>
      
    </div>
  );
}
