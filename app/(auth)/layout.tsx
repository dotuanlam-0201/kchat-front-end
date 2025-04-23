import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <BackgroundBeamsWithCollision className="min-h-dvh">
      {children}
    </BackgroundBeamsWithCollision>
  )
}

export default AuthLayout
