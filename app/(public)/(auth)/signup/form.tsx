"use client"


import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, useTransition } from "react";
import Submit from "@/components/SubmitButton";
import { signUp } from "@/lib/actions/auth-actions";
import { Button } from "@/components/ui/button";

export default function Form() {

  const [transistion, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string>()
 
  const handleSignUp = async (formData: FormData) => {
    // Get the the cedentials form the form data
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirm_password = formData.get("confirm_password") as string;

    // Check if the password was confirmed
    if(password != confirm_password){
      setErrorMessage("The two passwords didn't match")
      return
    }

    startTransition(async()=>{
      const { error } = await  signUp(email, password)
      if (error) {
        setErrorMessage(error.message);
        return
      }
      return redirect("/auth/verify-email");
    })

  };

  return (
    <div className="animate-in flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center border-2 py-10 border-primary rounded-sm">
      <h1 className="text-center text-2xl font-thin mb-5">Welcom, Please Sign Up.</h1>
      { errorMessage && (
        <div className="text-center">
          <p className="text-red-400">{ errorMessage }</p>
        </div>
      )}
      <form
        className="flex-1 flex flex-col w-full justify-center text-foreground"
        action={handleSignUp}
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
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <label className="text-md" htmlFor="password">
          Confirm Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="confirm_password"
          placeholder="••••••••"
          required
        />
        <Button
          className="transition-colors py-5 text-xl text-secondary mb-2"
        >
          <Submit laodingState={transistion} loadingText="Signing Up" btnText="Sign Up"/>
        </Button>
      </form>
        <Link href="/signin">
          <p className="text-center mt-5 text-sm underline">Already have an account? Login here</p>
        </Link>
    </div>
  );
}
