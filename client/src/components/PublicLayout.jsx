import SimpleBackground from "./SimpleBackground";

const PublicLayout = ({children}) => {
  return (
    <>
      <SimpleBackground />
      <main>{children}</main>
    </>
  );
};

export default PublicLayout;
