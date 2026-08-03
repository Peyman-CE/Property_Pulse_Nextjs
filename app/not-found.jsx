import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
    return ( <section classname="bg-blue-50 min-h-screen flex-grow">
      <div classname="container m-auto max-w-2xl py-24">
        <div
          classname="bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <div classname="flex justify-center">
            <FaExclamationTriangle classname="text-8xl text-yellow-400 fa-5x" />
          </div>
          <div classname="text-center">
            <h1 classname="text-3xl font-bold mt-4 mb-2">Page Not Found</h1>
            <p classname="text-gray-500 text-xl mb-10">
              The page you are looking for does not exist.
            </p>
            <Link
              href="/"
              classname="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <div classname="flex-grow"></div>
    </section> );
}
 
export default NotFoundPage;