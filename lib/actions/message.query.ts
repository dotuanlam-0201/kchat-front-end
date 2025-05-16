import { getMessages } from "@/lib/actions/message"
import { Messages } from "@/lib/model/message"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export const QUERY_MESSAGES_KEY = 'QUERY_MESSAGES_KEY'
export const useQueryMessages = (roomId?: string, query?: Record<string, string | number>) => {
  return useQuery({
    queryFn: () => getMessages(roomId, query),
    queryKey: [`${QUERY_MESSAGES_KEY}-${roomId}`, roomId, query],
    enabled: Boolean(roomId),
    initialData: new Messages(),
    placeholderData: keepPreviousData,
  })
}