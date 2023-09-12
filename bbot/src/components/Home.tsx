import { Button } from "@/components/ui";
import { hero1, hero2 } from "@/assets";
import { Link } from "react-router-dom";

function Home() {
  console.log("Home rendered .....");

  return (
    <div className="pb-2 rounded-xl ml-2 mr-4 shadow-xl">
      {/*   HERO SECTION */}

      <div className="grid grid-cols-1 min-h-[45vh] bg-secondary md:grid-cols-2">
        <div className="pl-4 pb-8 flex flex-col gap-8 justify-center">
          <div className="font-bold text-center text-[50px]">
            THE LEAGUE <br />
            OF WINNERS
          </div>

          <p className="text-[18px]">
            Experience the future of sports betting on our virtual platform.
            Join a community of enthusiasts and elevate your betting game today!
            Your next victory awaits in the world of virtual sports.
          </p>

          <div className="flex justify-end gap-4">
            <Button>
              <Link to="/signup">join now</Link>
            </Button>
            <Button variant="outline" className="border border-primary">
              <Link to="/login">sign in</Link>
            </Button>
            <Button variant="outline" className="border border-primary">
              <Link to="/vfl">play now</Link>
            </Button>
          </div>
        </div>
        <img src={hero2} />
      </div>

      <div className="flex mt-8 gap-4">
        <section className="flex flex-col-reverse items-center lg:flex-row">
          <img src={hero1} />
          <div className="flex flex-col gap-8">
            <div className="text-[24px] font-bold ">Features</div>

            <div className="text-[18px]">Virtual Football League (vfl)</div>
            <ul className="text-[18px]">
              <li>{"=>  "} Real-time sports betting on virtual events</li>
              <li>{"=>  "} Wide range of sports and events to choose from</li>
              <li>{"=>  "} User-friendly interface for placing bets</li>
              <li>{"=>  "} Secure and reliable payment options</li>
              <li>{"=>  "} Live updates and statistics for informed betting</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="justify-around bg-secondary">
        <section className="pl-4 pt-8 pb-12 flex flex-col gap-8 text-[18px]">
          <div className="text-[24px] font-bold ml-[30%]">About</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="r">
              BetBot Virtual Sports Betting was born from a shared passion for
              sports and technology in todays world. It all started with a
              simple idea: to create an immersive and exciting virtual sports
              betting platform that would bring the thrill of real sports events
              to the digital world.
            </p>

            <p>
              This project is not just a requirement; it's a testament to my
              commitment to innovation and learning at Holberton School. <br />{" "}
              I am proud to present BeBot as a Portfolio Project, showcasing the
              skills and passion i have poured into it.
            </p>
          </div>

          <p className="mx-auto">
            You can find more about me and follow my journey through the
            following links:
          </p>
          <ul className="flex gap-4 mx-auto">
            <li>
              <a
                className="text-lime-400"
                href="https://www.linkedin.com/in/clintonkefa/"
              >
                my LinkedIn handle
              </a>
            </li>
            <li>
              <a className="text-lime-400" href="https://github.com/Ckefa">
                my GitHub handle
              </a>
            </li>
            <li>
              <a
                className="text-lime-400"
                href="https://twitter.com/clintonkefa65"
              >
                my Twitter handle
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Home;
