'use client';
import { ClipLoader } from "react-spinners";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const LoadingPage = () => {
    return ( <ClipLoader color="#3b82f6" cssOverride={override} size={150} aria-label="Loading Spinner" /> );
}
 
export default LoadingPage;