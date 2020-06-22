import React from "react";
import { Helmet } from "react-helmet";
import IosLinkOutline from "react-ionicons/lib/IosLinkOutline";
import MdClock from "react-ionicons/lib/MdClock";
import MdBulb from "react-ionicons/lib/MdBulb";
// import M from "materialize-css";
import swal from "@sweetalert/with-react";
// import ParticlesBg from "particles-bg"

// import questions from "../data/questions.json";
import isEmpty from "../../utilis/is-empty";
import correctNotification from "../../assets/sound/right-answer2.mp3";
import wrongNotification from "../../assets/sound/wrong-answer2.mp3";
import buttonSound from "../../assets/sound/button-sound.mp3";
import axios from "axios";

const TITLE = "Quiz App | Play";

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestion: [],
      nextQuestion: [],
      previousQuestion: [],
      answer: "",
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 2,
      previousRandomNumbers: [],
      time: {},
    };
    this.interval = null;
    this.correctSound = React.createRef();
    this.wrongSound = React.createRef();
    this.buttonSound = React.createRef();
  }

  getQuestion = async () => {
    axios({
      method: "GET",
      url: "https://backend.rielcoin.com/question",
      body: JSON.stringify({
        questions: this.state.question,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        const questions = res.data;
        console.log(questions);
        this.setState({ questions });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.startTimer();
    this.getQuestion();
    this.readyAlert();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // function for displayquestion + option + next and prev

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState(
        {
          currentQuestion,
          nextQuestion,
          previousQuestion,
          numberOfQuestions: questions.length,
          answer,
          previousRandomNumbers: [],
        },
        () => {
          this.showOptions();
        }
      );
    }
  };

  handleNextButtonClick = () => {
    this.playButtonSound();
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handlePreviousButtonClick = () => {
    this.playButtonSound();
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  //  for event button click

  handleButtonClick = (e) => {
    switch (e.target.id) {
      case "next-button":
        this.handleNextButtonClick();
        break;

      case "previous-button":
        this.handlePreviousButtonClick();
        break;

      default:
        break;
    }
  };

  //  for event click answer options

  handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctTimeout = setTimeout(() => {
        this.correctSound.current.play();
      }, 100);
      this.correctAnswer();
    } else {
      this.wrongTimeout = setTimeout(() => {
        this.wrongSound.current.play();
      }, 100);
      this.wrongAnswer();
    }
  };

  // make button sound

  playButtonSound = () => {
    this.buttonSound.current.play();
  };

  //  for verify that point is correct or incorrect

  correctAnswer = () => {
    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  wrongAnswer = () => {
    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  // for show the option

  showOptions = () => {
    const options = Array.from(document.querySelectorAll(".option"));
    options.forEach((option) => {
      option.style.visibility = "visible";
    });
  };

  // for event button get help. it's will close some button that it not correct

  handleHints = () => {
    this.playButtonSound();
    if (this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll(".option"));
      let indexOfAnswer;
      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });

      while (true) {
        const randomNumber = Math.round(Math.random() * 3);
        if (
          randomNumber !== indexOfAnswer &&
          !this.state.previousRandomNumbers.includes(randomNumber)
        ) {
          options.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = "hidden";
              this.setState((prevState) => ({
                hints: prevState.hints - 1,
                previousRandomNumbers: prevState.previousRandomNumbers.concat(
                  randomNumber
                ),
              }));
            }
          });
          break;
        }
        if (this.state.previousRandomNumbers.length >= 3) break;
      }
    }
  };

  //  for set time

  startTimer = () => {
    const countDownTime = Date.now() + 600600;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0,
            },
          },
          () => {
            this.endGame();
          }
        );
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
            distance,
          },
        });
      }
    }, 1000);
  };

  // for countdown time

  endGame = () => {
    this.endAlert();
    const { state } = this;
    const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      hintsUsed: 2 - state.hints,
    };
    setTimeout(() => {
      this.props.history.push("/result", playerStats);
    }, 2000);
  };

  // there are alert

  endAlert = () => {
    swal({
      title: "Good job!",
      text: "Your game has ended!",
      icon: "success",
      closeOnClickOutside: false,
      // buttons:{
      //   confirm: "Submit to win",
      // },
    });
  };

  readyAlert = () => {
    swal({
      title: "Are you ready?",
      icon: "info",
      closeOnClickOutside: false,
      button: true,
    }).then(() => {
      this.playButtonSound();
      this.displayQuestions();
      swal.close();
    });
  };

  render() {
    const quitAlert = () => {
      this.playButtonSound();
      swal({
        title: "Are you sure to close it?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willClose) => {
        if (willClose) {
          this.playButtonSound();
          swal("Thank you so much!", {
            icon: "success",
            timer: "3000",
          }).then(() => {
            this.playButtonSound();
            this.props.history.push("/profile");
          });
        }
      });
    };

    const {
      currentQuestion,
      currentQuestionIndex,
      hints,
      numberOfQuestions,
      time,
    } = this.state;
    console.log(this.state.questions);
    return (
      <React.Fragment>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <React.Fragment>
          <audio ref={this.correctSound} src={correctNotification}></audio>
          <audio ref={this.wrongSound} src={wrongNotification}></audio>
          <audio ref={this.buttonSound} src={buttonSound}></audio>
        </React.Fragment>
        {/* <h4 className="mt-6 text-center text-6xl">Quiz Time</h4> */}
        <form
          id="backgrond"
          className=" bg-gray-200 container shadow-xl rounded-lg pb-8 mb-4 mx-auto h-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#273036"
              fillOpacity="0.2"
              d="M0,320L26.7,309.3C53.3,299,107,277,160,245.3C213.3,213,267,171,320,160C373.3,149,427,171,480,181.3C533.3,192,587,192,640,160C693.3,128,747,64,800,53.3C853.3,43,907,85,960,133.3C1013.3,181,1067,235,1120,218.7C1173.3,203,1227,117,1280,101.3C1333.3,85,1387,139,1413,165.3L1440,192L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
            ></path>
            <path
              fill="#ffd700"
              fillOpacity="0.4"
              d="M0,256L34.3,218.7C68.6,181,137,107,206,69.3C274.3,32,343,32,411,69.3C480,107,549,181,617,224C685.7,267,754,277,823,240C891.4,203,960,117,1029,117.3C1097.1,117,1166,203,1234,229.3C1302.9,256,1371,224,1406,208L1440,192L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            ></path>
            <path
              fill="#e7008a"
              fillOpacity="0.6"
              d="M0,160L34.3,181.3C68.6,203,137,245,206,240C274.3,235,343,181,411,165.3C480,149,549,171,617,181.3C685.7,192,754,192,823,160C891.4,128,960,64,1029,48C1097.1,32,1166,64,1234,112C1302.9,160,1371,224,1406,256L1440,288L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            ></path>
            <path
              fill="#5000ca"
              fillOpacity="0.5"
              d="M0,224L20,202.7C40,181,80,139,120,112C160,85,200,75,240,101.3C280,128,320,192,360,192C400,192,440,128,480,128C520,128,560,192,600,213.3C640,235,680,213,720,224C760,235,800,277,840,288C880,299,920,277,960,229.3C1000,181,1040,107,1080,69.3C1120,32,1160,32,1200,64C1240,96,1280,160,1320,208C1360,256,1400,288,1420,304L1440,320L1440,0L1420,0C1400,0,1360,0,1320,0C1280,0,1240,0,1200,0C1160,0,1120,0,1080,0C1040,0,1000,0,960,0C920,0,880,0,840,0C800,0,760,0,720,0C680,0,640,0,600,0C560,0,520,0,480,0C440,0,400,0,360,0C320,0,280,0,240,0C200,0,160,0,120,0C80,0,40,0,20,0L0,0Z"
            ></path>
          </svg>
          <div className=" fill-current text-xl pr-8 pl-8 pb-8 flex justify-between">
            <div className="transition duration-200 ease-in-out transform hover:-translate-y-1 text-gray-900 lg:ml-48">
              <IosLinkOutline fontSize="35px" rotate={true} />
              {currentQuestionIndex + 1} of {numberOfQuestions}
            </div>
            <div className="transition duration-200 ease-in-out transform hover:-translate-y-1 text-red-600">
              <MdClock fontSize="35px" color="red" beat={true} />
              {time.minutes}:{time.seconds}
            </div>
            <div
              onClick={this.handleHints}
              className="transition duration-200 ease-in-out transform hover:-translate-y-1 text-blue-600 lg:mr-48"
            >
              <MdBulb shake={true} fontSize="35px" color="orange" />
              {hints}
            </div>
          </div>
          <div className="max-w-4xl mx-auto justify-center flex p-8 bg-white rounded-lg shadow-xl h-auto text-2xl">
            <h5>{currentQuestion.question}</h5>
          </div>
          <div className="mx-auto justify-center px-12 mt-6">
            <div className="sm:flex">
              <button
                type="button"
                onClick={this.handleOptionClick}
                className="focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 blok mt-3 option bg-teal-400 ml-10  sm:ml-0 w-3/4 sm:w-2/4 lg:w-2/4 xs:w-2/4 text-white font-bold py-3 px-4 rounded-full "
              >
                {currentQuestion.optionA}
              </button>
              <button
                type="button"
                onClick={this.handleOptionClick}
                className="focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 sm:ml-6 mt-3 block option bg-teal-400 ml-10 sm:ml-0 w-3/4 sm:w-2/4  text-white font-bold py-3 px-4 rounded-full"
              >
                {currentQuestion.optionB}
              </button>
            </div>
            <div className="sm:flex mt-3">
              <button
                type="button"
                onClick={this.handleOptionClick}
                className="focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 block mt-3 option bg-teal-400  ml-10 sm:ml-0 w-3/4 sm:w-2/4 text-white font-bold py-3 px-4 rounded-full"
              >
                {currentQuestion.optionC}
              </button>
              <button
                type="button"
                onClick={this.handleOptionClick}
                className="focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 mt-3 sm:ml-6 block option bg-teal-400  ml-10 sm:ml-0 w-3/4 sm:w-2/4 text-white font-bold py-3 px-4 rounded-full"
              >
                {currentQuestion.optionD}
              </button>
            </div>
          </div>
          <div className="pl-12">
            <button
              id="previous-button"
              type="button"
              onClick={this.handleButtonClick}
              className="bg-yellow-600 hover:bg-yellow-800 rounded mt-10 mx-2 w-32 shadow-lg text-white font-bold py-2 px-4 rounded justify-center text-center"
            >
              Prev
            </button>
            <button
              id="next-button"
              type="button"
              onClick={this.handleButtonClick}
              className="bg-indigo-600 hover:bg-indigo-800 rounded mt-10 w-32 shadow-lg text-white font-bold py-2 px-4 rounded justify-center text-center"
            >
              Next
            </button>
            <button
              type="button"
              onClick={quitAlert}
              className="bg-red-600 hover:bg-red-800 rounded mt-10 mx-2 w-32 shadow-lg text-white font-bold py-2 px-4 rounded justify-center text-center"
            >
              quit
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Play;
