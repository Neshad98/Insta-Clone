import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { doc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";


const useFollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { authuser, setAuthUser } = useAuthStore();
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    setIsUpdating(true)
    try {
      const currentUserRef = doc(firestore, "users", authuser.uid);
      const userToFollowOrUnfollowRef = doc(firestore, "users", userId);
    } catch (error) {
      showToast("Error", error.message, "error")
    } finally {
      setIsUpdating(false);
    }
  }

  useEffect(() => {
    const isFollowing = authuser.following.includes(userId)
    setIsFollowing(isFollowing);
  }, [authuser, userId]);

  return { isUpdating, isFollowing, handleFollowUser };
}

export default useFollowUser