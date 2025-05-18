"use client"

import { Icon } from "@/components/icons"
import MainSetting from "@/components/MainSetting"
import PopupNewConversation from "@/components/PopupNewConversation"
import Room from "@/components/Room"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar"
import UserInfo from "@/components/UserInfo"
import { useQueryCache } from "@/hooks/useQueryCache"
import useRoom from "@/hooks/useRoom"
import { QUERY_ME_KEY } from "@/lib/actions/user.query"
import { User } from "@/lib/model/user"
import { useRoomStore } from "@/zustand/store"
import { map } from "lodash"

const AppSidebar = () => {
  const { rooms, isFetching } = useRoom()
  const currentUser: User = useQueryCache<User>({
    key: QUERY_ME_KEY,
    initValue: new User(),
  })

  const { selectedRoom } = useRoomStore()

  if (isFetching) return null

  return (
    <Sidebar className="border-r-1" collapsible="icon" variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex items-center justify-between gap-4">
            <Icon.AppLogo className="text-primary max-h-10 max-w-30 rounded-full" />
            <nav className="space-x-3">
              <PopupNewConversation />
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <Input className="rounded-2xl" placeholder="Search..." />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="flex-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {map(rooms, (room, i) => {
                const isActive = room._id === selectedRoom._id
                return (
                  <Room
                    isFetching={isFetching}
                    key={i}
                    isActive={isActive}
                    room={room}
                  />
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="sticky backdrop-blur-md rounded-3xl bottom-0">
          <SidebarGroupContent>
            <UserInfo rightSide={<MainSetting />} user={currentUser.data} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
