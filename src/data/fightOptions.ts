import { type Action } from '@/types/Action'
import missile from '@/assets/icons/missile.svg'

export const fightOptions: Action[] = [
  { id: 1, description: 'Lancer un missile', image: missile, testId: 'btn-launch-missile', isDisabled: true },
]
