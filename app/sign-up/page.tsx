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

export default function SignUp() {
  return (
    <div className="flex flex-1 items-center justify-center bg-neutral-900/98">
      <Card className="w-full max-w-lg border-neutral-700 bg-neutral-800 text-neutral-200">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription className="text-neutral-300">
            Enter your credentials below to create account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  className="border-neutral-700 bg-neutral-900/40 focus-visible:ring-0"
                  type="text"
                  id="name"
                  placeholder="John Doe"
                />
              </div>
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
          <Button className="w-full bg-neutral-900">Sign Up</Button>
          <span>
            Already have an account?{" "}
            <Link href={"/sign-in"} className="font-bold hover:underline">
              Sign in
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
