import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "../layouts/Navbar";
// import ParticlesBg from "particles-bg";
// import Sound from "react-sound";

const TITLE = "Koompi play | Quiz";

const Start = () => (
  <React.Fragment>
    <Helmet>
      <title>{TITLE}</title>
    </Helmet>
    <Navbar />
    {/* <Sound
      url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
      playStatus={Sound.status.PLAYING}
      playFromPosition={300}
      volume={50}
    /> */}
    <div id="home">
      {/* <ParticlesBg type="random" bg={true} /> */}
      <section style={{ marginTop: "90px" }} id="section">
        <h1 className="app text-gray-100 text-center text-current">Quiz Game</h1>
        <ul>
          <li id="button">
            <Link to="/quiz">
              <button
                id="play-button"
                className="transition duration-300  ease-in-out transform hover:-translate-y-1 hover:scale-110 w-full text-white font-bold py-2 px-4 mt-48 h-12 rounded-full"
              >
                Play{" "}
              </button>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  </React.Fragment>
);

export default Start;
