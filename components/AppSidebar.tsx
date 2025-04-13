import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { map } from "lodash"

// Menu items.

const AppSidebar = () => {
  const rooms = [
    {
      avatarURL: "",
      name: "Chatgram",
      lastMessage: "Chatgram Web was updated.",
      lastMessageAt: "19:48",
    },
    {
      avatarURL: "",
      name: "Chatgram",
      lastMessage: "Chatgram Web was updated.",
      lastMessageAt: "19:48",
    },
    {
      avatarURL: "",
      name: "Chatgram",
      lastMessage: "Chatgram Web was updated.",
      lastMessageAt: "19:48",
    },
    {
      avatarURL: "",
      name: "Chatgram",
      lastMessage: "Chatgram Web was updated.",
      lastMessageAt: "19:48",
    },
    {
      avatarURL: "",
      name: "Chatgram",
      lastMessage: "Chatgram Web was updated.",
      lastMessageAt: "19:48",
    },
    {
      avatarURL: "",
      name: "Chatgram",
      lastMessage: "Chatgram Web was updated.",
      lastMessageAt: "19:48",
    },
    {
      avatarURL: "",
      name: "Chatgram",
      lastMessage: "Chatgram Web was updated.",
      lastMessageAt: "19:48",
    },
    {
      avatarURL: "",
      name: "Chatgram",
      lastMessage: "Chatgram Web was updated.",
      lastMessageAt: "19:48",
    },
    {
      avatarURL: "",
      name: "Chatgram",
      lastMessage: "Chatgram Web was updated.",
      lastMessageAt: "19:48",
    },
    {
      avatarURL: "",
      name: "Chatgram",
      lastMessage: "Chatgram Web was updated.",
      lastMessageAt: "19:48",
    },
    {
      avatarURL: "",
      name: "Chatgram",
      lastMessage: "Chatgram Web was updated.",
      lastMessageAt: "19:48",
    },
  ]
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <Input className="rounded-2xl" placeholder="Search..." />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {map(
                rooms,
                ({ avatarURL, lastMessage, lastMessageAt, name }, i) => (
                  <SidebarMenuItem className="h-fit" key={i}>
                    <SidebarMenuButton className="h-fit rounded-2xl items-center flex gap-4">
                      <Avatar className="size-12">
                        <AvatarImage src={avatarURL} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 flex flex-col gap-2">
                        <span className="font-bold">{name}</span>
                        <span className="text-muted-foreground">
                          {lastMessage}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-muted-foreground">
                          {lastMessageAt}
                        </span>
                        <Badge className="rounded-full">2</Badge>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
