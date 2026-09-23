// import style from './ProtededRoute.module.css';
import {Navigate} from "react-router-dom";






export default function ProtededRoute(props) {
  // console.log(props);
  if (localStorage.getItem("userToken") !== null) {
    return props.children;
  }
  else {
    return <Navigate to="/login" />;
  }


}