import { Row, Col, Button } from "antd";
import { hero1, hero2, hero3, hero4 } from "../assets";
import { Link } from "react-router-dom";

function Home() {
  console.log("Home rendered .....");

  return (
    <div
      className="pb-2 
  rounded-xl ml-2 mr-4 shadow-xl"
    >
      {/*   HERO SECTION */}

      <Row className="justify-around min-h-[60vh] bg-[var(--secondary)]">
        <Col md={16} lg={13} className="flex flex-col gap-[var(--pgap)]">
          <div className="font-bold text-center text-[50px]">
            THE LEAGUE <br />
            OF WINNERS
          </div>

          <p className="text-[18px]">
            Experience the future of sports betting on our virtual platform.
            Join a community of enthusiasts and elevate your betting game today!
            Your next victory awaits in the world of virtual sports.
          </p>

          <div
            className="mt-[var(--smargin-top)] justify-end flex 
          gap-[var(--sgap)] text-[var(--secondary)]"
          >
            <Link
              to="/signup"
              className="link rounded-xl bg-[var(--important)] border
               border-[var(--tertiary)] text-[20px]"
            >
              join now
            </Link>
            <Link
              to="/login"
              className="link rounded-xl text-[20px] text-white border
               border-[var(--tertiary)]"
            >
              sign in
            </Link>
            <Link
              to="/vfl"
              className="link rounded-xl text-[20px] text-white border
               border-[var(--tertiary)]"
            >
              play now
            </Link>
          </div>
        </Col>
        <Col span={9} className="hero"></Col>
      </Row>

      <Row className="flex justify-around mt-4 gap-4">
        <section className="flex flex-col">
          <div className="text-[24px] font-bold mx-auto">Features</div>
          <div className="flex gap-4 justify-center">
            <img src={hero1} />
            <div className="flex flex-col gap-8 mt-12">
              <div className="text-[18px]">Virtual Football League (vfl)</div>

              <ul className="text-[18px]">
                <li>{"=>  "}Real-time sports betting on virtual events</li>
                <li>{"=>  "} Wide range of sports and events to choose from</li>
                <li>{"=>  "} User-friendly interface for placing bets</li>
                <li>{"=>  "} Secure and reliable payment options</li>
                <li>
                  {"=>  "} Live updates and statistics for informed betting
                </li>
              </ul>
            </div>
          </div>
        </section>
      </Row>

      <Row className="justify-around bg-[var(--secondary)]">
        <section className="pb-12 text-[18px]">
          <div className="text-[24px] font-bold mx-auto">About</div>
          <div className="flex gap-12 mt-4">
            <p className="gap-4 justify-center">
              BetBot Virtual Sports Betting was born from a shared passion for
              <br />
              sports and technology in todays world. It all started with a
              <br />
              simple idea: to create an immersive and exciting virtual sports
              <br />
              betting platform that would bring the thrill of real sports events
              <br />
              to the digital world.
            </p>

            <p>
              This project is not just a requirement; it's a testament to my
              <br />
              commitment to innovation and learning at Holberton School. <br />{" "}
              I am proud to present BeBot as a Portfolio Project,
              <br /> showcasing the skills and passion i have poured into it.
            </p>
          </div>

          <p className="mt-4">
            You can find more about me and follow my journey through the
            following links:
          </p>
          <ul className=" mt-4 flex gap-8">
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
      </Row>
    </div>
  );
}

export default Home;
