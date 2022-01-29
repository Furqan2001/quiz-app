import { useState } from "react";
import Head from "next/head";
import questions from "../util/questions";
import SingleQuestion from "../components/SingleQuestion";
import Result from "../components/Result";
import { Text, Container } from "@chakra-ui/react";

function Home({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  const evaluateScore = (correctAnswer) => {
    if (correctAnswer) setUserScore(userScore + 1);
    if (currentQuestion + 1 === 15) return setAllQuestionsAnswered(true);
    setCurrentQuestion(currentQuestion + 1);
  };

  const quizMarkup = !allQuestionsAnswered ? (
    <>
      <Text pt="18px" textAlign="center" className="text">
        {`${
          currentQuestion + 1
        }/ Which of these sh*tposts was written by Elon?`}
      </Text>
      <SingleQuestion
        question={questions[currentQuestion]}
        onSubmitAnswer={evaluateScore}
      />
      <Text
        className="text"
        textAlign="right"
        mr="50"
      >{`Score: ${userScore}/15`}</Text>
    </>
  ) : (
    <Result userScore={userScore} />
  );

  return (
    <>
      <Head>
        <title>Quiz App</title>
      </Head>
      <Container
        maxW="container.xl"
        minW="100vw"
        minH="100vh"
        backgroundImage="url('images/background.png')"
        backgroundSize="cover"
      >
        {quizMarkup}
      </Container>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      questions
    }
  };
}

export default Home;
