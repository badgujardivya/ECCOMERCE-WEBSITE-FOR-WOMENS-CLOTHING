import { Outlet } from "react-router-dom";
function AuthLayout() {
  return (
    <div className="flex min-h-screen ">
      <div className="w-1/2 bg-[url('/fashion.png')] bg-cover bg-center">

      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        {/*this image is used in half of webside in login page  */}
        <Outlet />
      </div>
    </div>
  );
}
export default AuthLayout;
{/*formatting file for login page and registerastion page */}