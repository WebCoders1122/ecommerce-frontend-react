import Navbar from "../components/Navbar";
import Orders from "../features/order/components/Orders";
import UserProfile from "../features/user/components/UserProfile";

const MyProfilePage = () => {
  return (
    <>
      <Navbar></Navbar>
      <UserProfile></UserProfile>
    </>
  );
};

export default MyProfilePage;
