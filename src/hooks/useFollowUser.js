import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
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

      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
      })

      await updateDoc(userToFollowOrUnfollowRef, {
        following: isFollowing ? arrayRemove(authuser.uid) : arrayUnion(authuser.uid)
      })

      if (isFollowing) {
        //unfollow 
        setAuthUser({
          ...authuser,
          following: authuser.following.filter(uid => uid !== userId)
        })
        setUserProfile({
          ...userProfile,
          followers: userProfile.followers.filter(uid => uid !== authuser.uid)
        })

        localStorage.setItem("user-info", JSON.stringify({
          ...authuser,
          following: authuser.following.filter(uid => uid !== userId)
        }))
        setIsFollowing(false);

      } else {
        setAuthUser({
          ...authuser,
          following: [...authuser.following, userId]
        })
        setUserProfile({
          ...userProfile,
          followers: [...userProfile.followers, authuser.uid]
        })

        localStorage.setItem("user-info", JSON.stringify({
          ...authuser,
          following: [...authuser.following, userId]
        }))
        setIsFollowing(true);

      }

    } catch (error) {
      showToast("Error", error.message, "error")
    } finally {
      setIsUpdating(false);
    }
  }

  useEffect(() => {
    const isFollowing = authuser.following.includes(userId);
    setIsFollowing(isFollowing);
  }, [authuser, userId]);

  return { isUpdating, isFollowing, handleFollowUser };
}

export default useFollowUser