interface Item {
  start: Date
  end: Date
  name: string
}

interface ItemExtended extends Item {
  id: string
  display: {
    color: CSSProperties['backgroundColor']
    date: {
      start: string
      end: string
    }
    offset: (offsetUnixStart: number) => CSSProperties['marginLeft']
    width: CSSProperties['width']
  }
  ref?: ActorRefWithDeprecatedState<ItemExtended>
  unix: {
    start: number
    end: number
  }
}
