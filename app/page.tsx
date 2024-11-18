import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";

const Home = () => {
  return (
    <div className="container px-8 mx-auto min-h-screen flex flex-col">
      <Header />
      <Form />
      <Footer />
    </div>
  );
};

export default Home;
