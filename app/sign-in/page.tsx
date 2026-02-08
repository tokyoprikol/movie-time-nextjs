"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignIn = async () => {
    setError("");

    try {
      const { data, error } = await signIn.email(
        {
          email,
          password,
        },
        {
          onRequest: (ctx) => {
            setIsLoading(true);
          },
          onSuccess: (ctx) => {
            setSuccess("Sign-in complete! Redirecting you now...");
            router.push("/movie/popular");
          },
          onError: (ctx) => {
            let errorMes = ctx.error.message;
            const lastBracketIdx = errorMes.lastIndexOf("]");
            if (lastBracketIdx !== -1) {
              errorMes = errorMes.slice(lastBracketIdx + 1).trim();
              setError(errorMes);
            }

            setIsLoading(false);
          },
        },
      );
    } catch (e) {
      setError("Something went wrong. Try again");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-neutral-900/98">
      <Card className="w-full max-w-lg border-neutral-700 bg-neutral-800 text-neutral-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription className="flex flex-col text-neutral-300">
            Enter your email below to login to your account
            {error && (
              <span className="mt-2 rounded-sm border border-red-300 bg-red-200 p-2 text-red-500">
                {error}
              </span>
            )}
            {success && (
              <span className="mt-2 rounded-sm border border-green-300 bg-green-200 p-2 text-green-500">
                {success}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="border-neutral-700 bg-neutral-900/40 focus-visible:ring-0"
                  type="email"
                  id="email"
                  placeholder="johndoe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  className="border-neutral-700 bg-neutral-900/40 focus-visible:ring-0"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            className="w-full bg-neutral-900"
            disabled={isLoading}
            onClick={handleSignIn}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
          <span>
            Dont have an account?{" "}
            <Link href={"/sign-up"} className="font-bold hover:underline">
              Sign Up
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
