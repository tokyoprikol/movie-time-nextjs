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

export default function SignIn() {
  return (
    <div className="flex flex-1 items-center justify-center bg-neutral-900/98">
      <Card className="w-full max-w-lg border-neutral-700 bg-neutral-800 text-neutral-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription className="text-neutral-300">
            Enter your email below to login to your account
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  className="border-neutral-700 bg-neutral-900/40 focus-visible:ring-0"
                  type="password"
                  id="password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full bg-neutral-900">Sign In</Button>
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
