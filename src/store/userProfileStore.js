import { create } from "zustand"

const useUserProfileStore = create((set) => ({
  userProfile: null,
  setUserProfile: (userProfile) => set({ userProfile }),
  //addpost 
}))

export default useUserProfileStore;