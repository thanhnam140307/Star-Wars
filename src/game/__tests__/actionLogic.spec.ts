import { describe, it, expect } from 'vitest'
import { type Action } from '@/types/Action'
import { getAction } from '@/game/actionLogic'

const ID: number = 1

describe('getAction', () => {
  it('devrait une action de la list', () => {
    const actions: Action[] = [
      {
        id: ID,
        description: 'Partir en mission',
        image: 'rocket',
        testId: 'btn-start-mission',
        isDisabled: false,
      },
    ]

    const action: Action = getAction(actions, ID)

    expect(action.id).toEqual(ID)
    expect(action.description).toEqual('Partir en mission')
    expect(action.image).toEqual('rocket')
    expect(action.testId).toEqual('btn-start-mission')
    expect(action.isDisabled).toBeFalsy()
  })

  it("devrait une action par défaut si ID n'est pas dans la list", () => {
    const actions: Action[] = [
      {
        id: ID + ID,
        description: 'Partir en mission',
        image: 'rocket',
        testId: 'btn-start-mission',
        isDisabled: false,
      },
    ]

    const action: Action = getAction(actions, ID)

    expect(action.id).toEqual(0)
    expect(action.description).toEqual('')
    expect(action.image).toEqual('')
    expect(action.testId).toEqual('')
    expect(action.isDisabled).toBeTruthy()
  })

  it('devrait une action par défaut si la list est vide', () => {
    const actions: Action[] = []

    const action: Action = getAction(actions, ID)

    expect(action.id).toEqual(0)
    expect(action.description).toEqual('')
    expect(action.image).toEqual('')
    expect(action.testId).toEqual('')
    expect(action.isDisabled).toBeTruthy()
  })
})
