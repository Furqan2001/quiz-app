import { useRef, useState } from "react";
import { Box, Flex, Center } from "@chakra-ui/react";
// import { OptionImage, StatusImage } from "../util/ImageConverter";
import Image from "next/image";

function SingleQuestion({
  onSubmitAnswer,
  question: { option1, option2, correctOption, height }
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
      }, 1000);
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
            <Box ref={firstOptionRef} maxH="100%">
              <Image
                src={option1}
                alt="option1"
                width="400"
                height={height || "200"}
                // priority="true"
              />
            </Box>
            <Box
              ref={firstImageStatusRef}
              maxW="30%"
              maxH="50%"
              pos="fixed"
              visibility="hidden"
            >
              {answerState !== "" ? (
                <Image
                  src={`/images/${answerState}_answer.png`}
                  alt="correct_answer"
                  width="400"
                  height="280"
                />
              ) : null}
            </Box>
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
            <Box ref={secondOptionRef} maxH="100%">
              <Image
                src={option2}
                alt="option2"
                width="400"
                height={height || "200"}
                // priority="true"
              />
            </Box>
            <Box
              ref={secondImageStatusRef}
              maxW="30%"
              maxH="50%"
              pos="fixed"
              visibility="hidden"
            >
              {answerState !== "" ? (
                <Image
                  src={`/images/${answerState}_answer.png`}
                  alt="wrong_answer"
                  width="400"
                  height="280"
                />
              ) : null}
            </Box>
          </Center>
        </Box>
      </Flex>
    </>
  );
}

export default SingleQuestion;
