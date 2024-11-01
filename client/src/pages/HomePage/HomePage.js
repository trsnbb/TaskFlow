import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Home from "../../components/Home/Home";

const HomePage = () => {
  return (
    <>
      <Header />

      <div className='flex'>
        <Navbar />

        <Home />
      </div>
    </>
  );
};

export default HomePage;
