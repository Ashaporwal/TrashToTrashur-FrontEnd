import { Navigate } from "react-router-dom";

export const isUserExist = () => !!sessionStorage.getItem("current-user");

export const getCurrentUser = () => {
  const currentUser = sessionStorage.getItem("current-user");
  return currentUser ? JSON.parse(currentUser) : null;
};

function Auth({ children }) {
  if (isUserExist()) return children;
  return <Navigate to="/signIn" />;
}

export default Auth;



// import { Navigate } from "react-router-dom";


// export const isUserExist=()=>{
//     return !!sessionStorage.getItem("current-user");

// }
// export const getCurrentUser=()=>{
//     let currentUser = sessionStorage.getItem("current-user");
//     currentUser=JSON.parse(currentUser);
//     return currentUser;
// }
// function Auth({children}){
//     if(isUserExist())
//         return children;
//     // return  <Navigate to="signIn"/>
//      return <Navigate to="/signIn" />;
    
// }
// export default Auth;