"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { handleSignup } from "@/lib/actions/auth"
import { signupSchema } from "@/lib/types/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

const SignupPage = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: handleSignup,
  })
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
    resolver: zodResolver(signupSchema),
  })
  const onSignup = async (values: z.infer<typeof signupSchema>) => {
    try {
      await mutateAsync(values)
      router.push("/login")
    } catch (error: any) {
      toast(error?.message, {
        type: "error",
      })
    }
  }
  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Signup your new account</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 w-screen max-w-xs">
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Peter@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="0707080767" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            isPending={isPending}
            onClick={form.handleSubmit(onSignup)}
            className="w-full"
          >
            Signup
          </Button>

          <Link href={"/login"}>
            <small className="muted underline text-xs">Login </small>
          </Link>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SignupPage
