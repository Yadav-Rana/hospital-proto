import Navbar from "./Navbar";
import SimpleBackground from "./SimpleBackground";

const AuthenticatedLayout = ({children}) => {
  return (
    <>
      <SimpleBackground />
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default AuthenticatedLayout;
