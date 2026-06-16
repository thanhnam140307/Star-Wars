import { type Action } from '@/types/Action'

export function getAction(actionsList: Action[], actionId: number): Action {
  return (
    actionsList.find((action) => action.id === actionId) ?? 
    {
      id: 0,
      description: '',
      image: '',
      testId: '',
      isDisabled: true,
    }
  )
}
