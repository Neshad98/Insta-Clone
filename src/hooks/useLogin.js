import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast"


const useLogin = () => {
  const showToast = useShowToast();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const login = async (inputs) => {
    if (!inputs.email || inputs.password) {
      return showToast("Error", "Please fill all the fields", "error")
    }
    try {
      const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);
    }
    catch (error) {
      showToast("Error", error.message, "error")
    }
  }
}

export default useLogin