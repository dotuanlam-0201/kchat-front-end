"use client"

import AppSidebar from "@/components/AppSidebar"
import { ReactNode } from "react"

const MainLayoutWithSidebar = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-screen">
      <AppSidebar />
      {children}
    </main>
  )
}

export default MainLayoutWithSidebar
