import { useState } from "react"
import useShowToast from "./useShowToast";


const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

}

export default useSearchUser