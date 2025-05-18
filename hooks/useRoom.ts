'use client'

import { useSocket } from '@/hooks/useSocket'
import { useQueryRooms } from '@/lib/actions/room.query'
import { useQueryMe } from '@/lib/actions/user.query'
import { IRoom } from '@/lib/model/room'
import { find, isArray } from 'lodash'
import { useEffect, useState } from 'react'

const useRoom = () => {
  const { socket } = useSocket()
  const { data: { data }, isFetching } = useQueryRooms()
  const [rooms, setRooms] = useState([] as IRoom[])

  const { data: currentUser } = useQueryMe()

  useEffect(() => {
    if (isArray(data)) setRooms(data)
  }, [data])

  const checkIsCurrentUserInNewRoom: (room: IRoom) => boolean = (room: IRoom) => {
    return find(room.participants, (({ email }) => email === currentUser.data.email)) ? true : false
  }
  useEffect(() => {
    socket.on("roomCreated", (room: IRoom) => {
      if (checkIsCurrentUserInNewRoom(room)) setRooms((prev) => [...prev, room])
    })
    return () => {
      socket.off('roomCreated')
    }
  }, [currentUser])

  return {
    rooms, isFetching
  }
}

export default useRoom
