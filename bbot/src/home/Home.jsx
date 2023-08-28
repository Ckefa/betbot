import { Button, Divider } from "antd";
import { hero1, hero2, hero3, hero4 } from "../assets";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div
        className="flex flex-col bg-black gap-10 h-[60vw] w-[100%] justify-center"
        style={{
          backgroundImage: `url(${hero2})`,
          backgroundSize: "cover",
        }}
      >
        <h1 className="ml-12 text-lime-400 text-6xl">THE LEAGUE OF WINNERS</h1>
        <h4 className="ml-12 text-white text-xl w-[30vw]">
          Experience the future of sports betting on our virtual platform.
          Immerse yourself in lifelike simulations, from soccer to horse racing.
          Navigate intuitive interfaces, access real-time updates, and bet with
          confidence. Join a community of enthusiasts and elevate your betting
          game today! Your next victory awaits in the world of virtual sports.
        </h4>
        <div className="ml-12 flex gap-6">
          <Button className="bg-orange-900 text-yellow-300 text-xl">
            <Link to="/signup">Join now</Link>
          </Button>
          <Button className="bg-blue-300 text-black text-xl">
            <Link to={"/login"}>Sign In</Link>
          </Button>
          <Link to="/vfl">
            <Button className="bg-white text-black text-xl">Play Now</Button>
          </Link>
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default Home;
