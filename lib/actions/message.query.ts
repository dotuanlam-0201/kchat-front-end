import { getMessages } from "@/lib/actions/message"
import { Messages } from "@/lib/model/message"
import { useQuery } from "@tanstack/react-query"

export const QUERY_MESSAGES_KEY = 'QUERY_MESSAGES_KEY'
export const useQueryMessages = (roomId?: string) => {
  return useQuery({
    queryFn: () => getMessages(roomId),
    queryKey: [`${QUERY_MESSAGES_KEY}-${roomId}`, roomId],
    enabled: Boolean(roomId),
    initialData: new Messages()
  })
}