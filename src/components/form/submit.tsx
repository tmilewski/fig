import { Button } from '@/ui/button'

export type SubmitProps = React.ComponentPropsWithoutRef<'button'>

export function Submit(props: SubmitProps) {
  return <Button type="submit" {...props} shadow />
}
