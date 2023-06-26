import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { Input, Button, Textarea, Flex } from "@chakra-ui/react";
import axios from "axios";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "black",
        color: "white",
      },
    },
  },
});

function App() {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [transcript, setTranscript] = useState("");

  var fileDownload = require("js-file-download");

  const handleLinkChange = (e) => {
    setYoutubeLink(e.target.value);
  };

  const handleTranscript = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/transcript/?video_link=${youtubeLink}`
      );
      console.log(response.data.transcript);
      setTranscript(response.data.transcript);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = async () => {
    fileDownload(transcript, "transcript.txt");
  };

  return (
    <Flex
      width="100vw"
      height="100vh"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Input
        placeholder="Enter YouTube Link"
        value={youtubeLink}
        onChange={handleLinkChange}
        mb={4}
        w="80%"
        size="lg"
      />
      <Button
        onClick={handleTranscript}
        colorScheme="teal"
        mb={4}
        w="80%"
        size="lg"
      >
        Transcript
      </Button>{" "}
      <Textarea
        placeholder="Transcript"
        value={transcript}
        readOnly
        w="80%"
        size="lg"
        h="460px"
      />{" "}
      <Button
        onClick={handleDownload}
        colorScheme="teal"
        mt={4}
        w="80%"
        size="lg"
        disabled={transcript === ""}
      >
        Download
      </Button>
    </Flex>
  );
}
export default function WrappedApp() {
  return (
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  );
}
