import { IMessage } from '@/lib/model/message'
import { IRoom } from '@/lib/model/room'
import { ROOM_TYPE } from '@/lib/types/room'
import { create } from 'zustand'

interface IRoomState {
  selectedRoom: IRoom
  setSelectedRoom: (room: IRoom) => void
}
interface ILastMessageState {
  lastMessage: Record<string, IMessage>
  setLastMessage: (roomId: string, msg: IMessage) => void
}

interface IScrollState {
  autoScrollEnabled: boolean,
  enableAutoScroll: VoidFunction,
  disableAutoScroll: VoidFunction,
  toggleAutoScroll: VoidFunction,
}

export const useRoomStore = create<IRoomState>()((set) => ({
  selectedRoom: {
    _id: '',
    participants: [],
    lastMessage: {},
    type: ROOM_TYPE.single
  },
  setSelectedRoom: (room: IRoom) => set({ selectedRoom: room })
}))

export const useLastMessageStore = create<ILastMessageState>((set) => ({
  lastMessage: {},
  setLastMessage: (roomId: string, msg: IMessage) => set((state) => ({
    lastMessage: {
      ...state.lastMessage,  // Preserve existing messages
      [roomId]: msg          // Update just this room's message
    }
  })),
}))

export const useScrollStore = create<IScrollState>((set) => ({
  autoScrollEnabled: true,
  enableAutoScroll: () => set({ autoScrollEnabled: true }),
  disableAutoScroll: () => set({ autoScrollEnabled: false }),
  toggleAutoScroll: () => set((state: { autoScrollEnabled: boolean }) => ({ autoScrollEnabled: !state.autoScrollEnabled })),
}))




