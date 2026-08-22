import { cn } from '@/lib/utils'

export function CardContent({ className, ...props }) {
  return <div className={cn('p-3 pt-0', className)} {...props} />
}

export default CardContent
