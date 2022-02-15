import LogOut from "components/LogOut";

const Footer = () => {
  return (
    <>
      <LogOut />
      <footer>&copy; {new Date().getFullYear()}Uplant</footer>
    </>
  );
};

export default Footer;
