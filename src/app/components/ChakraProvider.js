"use client";

import { ChakraProvider } from "@chakra-ui/react";

export default function ChakraClientProvider({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
