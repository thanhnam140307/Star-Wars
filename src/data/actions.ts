import { type Action } from '@/types/Action'
import rocket from '@/assets/icons/rocket_launch.svg'
import publicIcon from '@/assets/icons/public.svg'
import build from '@/assets/icons/build.svg'
import bolt from '@/assets/icons/electric_bolt.svg'
import destruction from '@/assets/icons/destruction.svg'

export const actions: Action[] = [
  { id: 1, description: 'Partir en mission', image: rocket, testId: 'btn-start-mission', isDisabled: false },
  { id: 2, description: 'Terminer la mission', image: publicIcon, testId: 'btn-end-mission', isDisabled: true },
  { id: 3, description: 'Réparer le vaisseau', image: build, testId: 'btn-repair', isDisabled: true },
  { id: 4, description: 'Activer les propulseurs', image: bolt, testId: 'btn-activate-thrusters', isDisabled: true },
  { id: 5, description: 'Combattre', image: destruction, testId: 'btn-fight', isDisabled: true },
]