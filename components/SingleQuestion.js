import { useRef, useState } from "react";
import { Box, Image, Flex, Center } from "@chakra-ui/react";

function SingleQuestion({
  onSubmitAnswer,
  question: { option1, option2, correctOption }
}) {
  const [clicked, setClicked] = useState(false);
  const [answerState, setAnswerState] = useState("");

  const firstOptionRef = useRef();
  const secondOptionRef = useRef();

  const firstImageStatusRef = useRef();
  const secondImageStatusRef = useRef();

  const optionHandler = (selectedOptionNumber) => {
    if (!clicked) {
      setClicked(true);
      const status = selectedOptionNumber === correctOption;
      setAnswerState(status ? "correct" : "wrong");
      if (selectedOptionNumber === 1) {
        firstOptionRef.current.style.opacity = 0.5;
        firstImageStatusRef.current.style.visibility = "visible";
      } else {
        secondOptionRef.current.style.opacity = 0.5;
        secondImageStatusRef.current.style.visibility = "visible";
      }
      setTimeout(() => {
        onSubmitAnswer(status);
        if (firstOptionRef.current) restoreQuestionsState();
        setClicked(false);
      }, 1200);
    }
  };

  const restoreQuestionsState = () => {
    firstOptionRef.current.style.opacity = 1;
    secondOptionRef.current.style.opacity = 1;
    firstImageStatusRef.current.style.visibility = "hidden";
    secondImageStatusRef.current.style.visibility = "hidden";
    setAnswerState("");
  };

  return (
    <>
      <Flex align="center" mt="10" justify="center">
        <Box
          borderRadius="lg"
          bg="#F9F9F9"
          border="2px"
          borderColor="gray.200"
          mr="10"
          cursor="pointer"
          onClick={() => optionHandler(1)}
        >
          <Center maxW="400px" h="300" p="5">
            <Image
              src={option1}
              alt="option1"
              ref={firstOptionRef}
              maxH="100%"
            />
            <Image
              src={`images/${answerState}_answer.png`}
              alt="correct_answer"
              maxW="40%"
              maxH="50%"
              pos="fixed"
              visibility="hidden"
              ref={firstImageStatusRef}
            />
          </Center>
        </Box>
        <Box
          borderRadius="lg"
          bg="#F9F9F9"
          border="2px"
          borderColor="gray.200"
          cursor="pointer"
          onClick={() => optionHandler(2)}
        >
          <Center maxW="400px" h="300" p="5">
            <Image
              src={option2}
              alt="option2"
              ref={secondOptionRef}
              maxH="100%"
            />
            <Image
              src={`images/${answerState}_answer.png`}
              alt="wrong_answer"
              maxW="40%"
              maxH="50%"
              pos="fixed"
              visibility="hidden"
              ref={secondImageStatusRef}
            />
          </Center>
        </Box>
      </Flex>
    </>
  );
}

export default SingleQuestion;
