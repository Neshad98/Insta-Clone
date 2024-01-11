import { useState } from "react"
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";

const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore(state => state.user)
  const showToast = useShowToast();
  const { setUserProfile } = useUserProfileStore();
}

export default useGetFeedPosts