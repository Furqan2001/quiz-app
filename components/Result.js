import { useRouter } from "next/router";
import { Text, Flex, Box, Image, Button } from "@chakra-ui/react";

function Result({ userScore }) {
  const router = useRouter();
  return (
    <Flex
      // direction="column "
      justify="center"
      align="center"
      className="text"
      fontSize="28"
    >
      <Flex direction="column" align="flex-start" mr="20">
        <Text lineHeight="10">{`Your score: ${userScore}/15`}</Text>
        <Text>IMPRESSIVE!</Text>
      </Flex>
      <Flex direction="column" align="center">
        <Text textAlign="center" lineHeight="10" pt="12">
          Share your 💩 performance on Twitter!
        </Text>
        <Box
          display="flex"
          justifyContent="space-around"
          maxW="800"
          border="1px"
          borderColor="black"
          p="8"
          fontSize="24"
          background="#FFF"
          borderRadius="5px"
          filter="drop-shadow(8px 8px 20px rgba(0, 0, 0, 0.25))"
        >
          <Flex direction="column" align="flex-start">
            <Text>{`Score ${userScore}/15`}</Text>
            <Text lineHeight="10">
              Take the Elon Sh*tposts 💩 quiz and beat me!
            </Text>
            <Button
              color="#FFF"
              background="#FF4D00"
              pt="5"
              pb="5"
              pl="7"
              pr="7"
              mt="5"
              borderRadius="14"
              onClick={() => {
                router.reload("/");
              }}
              _hover={{
                background: "#ff0000"
              }}
            >
              Quiz Me
            </Button>
          </Flex>
          <Image src="images/elon_result.png" alt="result" />
        </Box>
        <Button
          color="#FFF"
          background="#55ADED"
          pt="5"
          pb="5"
          pl="7"
          pr="7"
          mt="5"
          borderRadius="14"
          width="fit-content"
          _hover={{
            background: "#2296ec"
          }}
        >
          Tweet My Score
        </Button>
      </Flex>
    </Flex>
  );
}

export default Result;
