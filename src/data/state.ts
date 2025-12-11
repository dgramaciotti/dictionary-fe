import { create } from 'zustand'
import { Word } from '../models/Word'

interface AppState {
    selectedWord: Word | null
    setSelectedWord: (word: Word | null) => void
}

interface WordleState {
    word: Word | null
    tries: string[]
    setTries: (word: string[]) => void
    setWord: (word: Word) => void
    reset: () => void
}

const useQuizState = create<WordleState>((set, _, store) => ({
    word: null,
    tries: [],
    setTries: (tries: string[]) => set({ tries: [...tries] }),
    setWord: (word: Word) => set({ word: { ...word } }),
    reset: () => {
        set(store.getInitialState())
    },
}))

const useAppState = create<AppState>((set) => ({
    selectedWord: null,
    setSelectedWord: (word: Word | null) =>
        set({ selectedWord: word ? { ...word } : null }),
}))

export { useAppState, useQuizState }
