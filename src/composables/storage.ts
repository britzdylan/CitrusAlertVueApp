import { Preferences } from '@capacitor/preferences'

export function useStorage() {
  const get = async (key: string) => {
    const { value } = await Preferences.get({ key })
    return value
  }
  const set = async (key: string, value: string) => {
    await Preferences.set({ key, value })
  }
  const remove = async (key: string) => {
    await Preferences.remove({ key })
  }
  return { get, set, remove }
}
