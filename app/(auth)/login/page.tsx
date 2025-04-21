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
import { handleLogin } from "@/lib/actions/auth"
import { loginSchema } from "@/lib/types/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { setCookie } from "cookies-next/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

const LoginPage = () => {
  const router = useRouter()
  const { isPending, mutateAsync } = useMutation({
    mutationFn: handleLogin,
  })
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  })
  const onLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      const res = await mutateAsync(values)
      setCookie("accessToken", res.data.accessToken)
      router.push("/")
    } catch (error: any) {
      toast(error?.message, {
        type: "error",
      })
    }
  }
  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
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

          <Button
            isPending={isPending}
            onClick={form.handleSubmit(onLogin)}
            className="w-full"
          >
            Login
          </Button>

          <Link href={"/signup"}>
            <small className="muted underline text-xs">
              Signup new account
            </small>
          </Link>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LoginPage
