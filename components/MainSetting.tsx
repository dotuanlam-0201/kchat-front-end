import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  ArrowTurnDownRightIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/24/solid"
import { deleteCookie } from "cookies-next/client"
import { useTheme } from "next-themes"
import { redirect } from "next/navigation"

const MainSetting = () => {
  const { theme, setTheme } = useTheme()
  const handleChangeThem = () =>
    setTheme((prev) => {
      return prev === "light" ? "dark" : "light"
    })
  const handleLogout = () => {
    deleteCookie("accessToken")
    redirect("/login")
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          <Cog6ToothIcon className="muted" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit flex flex-col gap-2">
        <Button onClick={handleChangeThem} variant={"ghost"}>
          Theme {theme === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>
        <Button variant={"ghost"}>
          Profile <UserIcon />
        </Button>
        <Button onClick={handleLogout} variant={"ghost"}>
          Logout <ArrowTurnDownRightIcon />
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default MainSetting
