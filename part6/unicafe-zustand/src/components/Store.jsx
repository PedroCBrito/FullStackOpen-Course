import { create } from 'zustand'

const useCounterStore = create((set) => ({

    data: {
        good: 0,
        neutral: 0,
        bad: 0,
        all: 0,
        average: 0,
        positive: 0,
    },

    actions: {
        incrementGood: () => set(state => {
            const good = state.data.good + 1
            const all = state.data.all + 1
            return { data: { ...state.data, good, all, average: (good - state.data.bad) / all, positive: good / all * 100 } }
        }),
        incrementNeutral: () => set(state => {
            const neutral = state.data.neutral + 1
            const all = state.data.all + 1
            return { data: { ...state.data, neutral, all, average: (state.data.good - state.data.bad) / all, positive: state.data.good / all * 100 } }
        }),
        incrementBad: () => set(state => {
            const bad = state.data.bad + 1
            const all = state.data.all + 1
            return { data: { ...state.data, bad, all, average: (state.data.good - bad) / all, positive: state.data.good / all * 100 } }
        }),
    }
}))

export const useData = () => useCounterStore(state => state.data)
export const useActions = () => useCounterStore(state => state.actions)
