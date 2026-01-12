import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

export const timeAgo = (date: Date | string) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: id,
  })
}
