// import { useContext,useEffect } from "react";
// import { AuthContext } from "../AuthContext";
// import { login,register ,logout} from "../Services/authApi";
// import {getMe} from "../Services/authApi"

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   const { user, setUser, loading, setLoading } = context;

//   const handleLogin = async ({ email, password }) => {
//     try {
//       setLoading(true);
//       const data = await login({ email, password });
//       setUser(data.user); 
//     } catch (err) {
//       console.log("Login failed:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegister =async ({username,email,password})=>{
//     try{
//         setLoading(true)
//         const data=await register({username,email,password})
//         setUser(data.user);

//     }
//     catch(e){
//         console.log("Login failed:", e);
//     }
//     finally{
//         setLoading(false)

//     }

//   }

//   const handleLogout=async()=>{
//     setLoading(true)
//     const data=await logout()
//     setUser(null);
//     setLoading(false)

//   }
  
//   useEffect(() => {
//     const getAndSetUser = async  () => {
//       try{
//       const data = await getMe()
//       setUser(data.user)
//       }
//       catch(e){ console.error(e);}
//       finally{
//         setLoading(false)
//       }
//     }
//     getAndSetUser();
//   }, [])
  
//   return { user, loading, handleLogin,handleLogout ,handleRegister};
// };







import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { login, register, logout, getMe } from "../Services/authApi";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
  
      const data = await login({ email, password });
  
      if (!data || !data.user) {
        return {
          success: false,
          message: data?.message || "Invalid credentials",
        };
      }
  
      setUser(data.user);
  
      return {
        success: true,
        message: "Login successful",
      };
    } catch (err) {
      return {
        success: false,
        message:
          err?.response?.data?.message ||
          "Something went wrong. Try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    try {
      setLoading(true);

      const data = await register({ username, email, password });

      if (!data || !data.user) {
        return false;
      }

      setUser(data.user);

      return true;
    } catch (e) {
      console.log("Register failed:", e);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      setUser(null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe();

        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (e) {
        console.log("errr",e)
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, []);

  return { user, loading, handleLogin, handleLogout, handleRegister };
};