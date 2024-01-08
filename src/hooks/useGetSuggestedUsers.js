import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";


const useGetSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const authUser = useAuthStore(state => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(firestore, "users")
        const q = query(
          usersRef,
          //modified a bit to prevent error. slice option is 
          where("uid", "not-in", [authUser.uid, ...authUser.following.slice(0, 3)]),
          orderBy("uid"),
          limit(3)
        )
        const querySnapshot = await getDocs(q)
        const users = [];
        querySnapshot.forEach(doc => {
          users.push({ ...doc.data(), id: doc.id })
        })

        setSuggestedUsers(users);

      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);

      }
    }

    if (authUser) getSuggestedUsers();
  }, [authUser, showToast])

  return { isLoading, suggestedUsers }
}

export default useGetSuggestedUsers;







///////////////////////////////////////// chatgpt code


// const usersRef = collection(firestore, "users");

// // Get the first batch of users excluding the authenticated user and the first 10 from their following list
// const q1 = query(
//   usersRef,
//   where("uid", "not-in", [authUser.uid, ...authUser.following.slice(0, 10)]),
//   orderBy("uid"),
//   limit(3)
// );

// // Get the second batch of users excluding the authenticated user and the next 10 from their following list
// const q2 = query(
//   usersRef,
//   where("uid", "not-in", [authUser.uid, ...authUser.following.slice(10, 20)]),
//   orderBy("uid"),
//   limit(3)
// );

// // ... continue this pattern for remaining users

// // Then execute the queries using Promise.all to combine the results
// const [querySnapshot1, querySnapshot2] = await Promise.all([
//   getDocs(q1),
//   getDocs(q2),
//   // ... getDocs for remaining queries
// ]);

// // Merge the results from different query snapshots
// const users = [];
// querySnapshot1.forEach((doc) => {
//   users.push(doc.data());
// });
// querySnapshot2.forEach((doc) => {
//   users.push(doc.data());
// });
// // Merge data from remaining query snapshots in a similar way

// // 'users' array now contains data from multiple queries
