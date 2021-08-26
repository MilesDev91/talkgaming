import { computed } from 'vue'
import { useStore } from 'vuex'

// Vue composition API doesn't work correctly with built in store helpers for mapping, so we create our own helpers. Each function returns a map of the appropriate store object. Credit goes to Coding with Justin youtube channel for the idea
export function useState (array) {
  const store = useStore()
  const keyPair = array.map(i => [i, computed(() => store.state[i])])
  return Object.fromEntries(keyPair)
}

export function useGetters (array) {
  const store = useStore()
  const keyPair = array.map(i => [i, computed(() => store.getters[i])])
  return Object.fromEntries(keyPair)
}

export function useMutations (array) {
  const store = useStore()
  const keyPair = array.map(i => [i, input => store.commit[i, input]])
  return Object.fromEntries(keyPair)
}

export function useActions (array) {
  const store = useStore()
  const keyPair = array.map(i => [i, computed(() => store.actions[i])])
  return Object.fromEntries(keyPair)
}