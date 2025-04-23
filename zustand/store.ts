import { IRoom } from '@/lib/model/room'
import { ROOM_TYPE } from '@/lib/types/room'
import { create } from 'zustand'

interface IRoomState {
  selectedRoom: IRoom
  setSelectedRoom: (room: IRoom) => void
}

export const useRoomStore = create<IRoomState>()((set) => ({
  selectedRoom: {
    _id: '',
    participants: [],
    message: [],
    type: ROOM_TYPE.single
  },
  setSelectedRoom: (room: IRoom) => set({ selectedRoom: room })
}))