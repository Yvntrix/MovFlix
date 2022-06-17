import { Container, Group, Stack, Title } from "@mantine/core";
import { DarkModeButton } from "./DarkModeButton";
import { MovieCard } from "./MovieCard";
import { motion } from "framer-motion";
export const Home = () => {
  return (
    <>
      <Stack p="md">
        <Group position="right">
          <DarkModeButton />
        </Group>
        
        <Title align="center">What's Popular?</Title>
        <Container size="xl">
          <MovieCard />
        </Container>
      </Stack>
    </>
  );
};
