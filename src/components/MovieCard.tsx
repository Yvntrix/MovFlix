import {
  ActionIcon,
  Card,
  Center,
  Grid,
  Group,
  Image,
  Loader,
  NumberInput,
  Paper,
  Stack,
} from "@mantine/core";
import { useLocalStorage, useViewportSize } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const MovieCard = () => {
  const [page, setPage] = useLocalStorage({
    key: "page",
    defaultValue: 1,
  });
  const [data, setData] = useState<any[]>([]);
  const [value, setValue] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);
  const { height, width } = useViewportSize();
  const API_KEY = "api_key=9e65816b3f3d83bf8de27dd4de9ec9f3";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_URL = "https://image.tmdb.org/t/p/w342";
  const POPULAR =
    BASE_URL + "/movie/popular?" + API_KEY + "&language=en-US&page=";
  let datas: any[] = [];
  useEffect(() => {
    getMovies();
  }, [page]);

  async function getMovies() {
    setLoading(true);
    setValue(page);
    datas = [];
    if (page <= 500) {
      axios
        .get(POPULAR + page)
        .then(async (result) => {
          const res = await result.data.results;
          for (let i in res) {
            datas.push(await res[i]);
          }
          setData(datas);
          setTimeout(() => {
            setLoading(false);
          }, 700);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }

  function inputPage(ind: any) {
    setPage(ind);
    getMovies();
  }
  return (
    <>
      <Stack align="center" spacing="xs" pb="xs">
        <Group position="center" align="center">
          <ActionIcon
            disabled={page == 1}
            variant="outline"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <IconChevronLeft size={16} />
          </ActionIcon>

          <NumberInput
            style={{ width: 65 }}
            min={0}
            max={500}
            hideControls
            defaultValue={1}
            value={value}
            onChange={(val) => {
              inputPage(val);
              setValue(val);
            }}
          />
          <ActionIcon
            variant="outline"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <IconChevronRight size={16} />
          </ActionIcon>
        </Group>
        <span>
          Page <strong>{page} of 500</strong>
        </span>
      </Stack>

      {loading ? (
        <>
          <Center sx={{ minHeight: height }}>
            <Loader color="violet" />
          </Center>
        </>
      ) : (
        <>
          <Grid justify="center" align="center">
            {data.map((info, idx) => {
              return (
                <Grid.Col span={6} sm={4} md={3} lg={2.3} key={idx}>
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.09,
                      delay: idx * 0.07,
                      type: "tween",
                    }}
                  >
                    <Paper
                      sx={(theme) => ({
                        transition: " transform .2s",
                        "&:hover": {
                          transform: " scale(1.05)",
                        },
                      })}
                      shadow="xl"
                      radius="md"
                      withBorder
                    >
                      <Link to={`/movies/${info.id}`}>
                        <Card radius="md" withBorder p="xl">
                          <Card.Section>
                            <Image
                              src={IMG_URL + info.poster_path}
                              height={360}
                              withPlaceholder
                              alt={info.title}
                            />
                          </Card.Section>
                        </Card>
                      </Link>
                    </Paper>
                  </motion.div>
                </Grid.Col>
              );
            })}
          </Grid>
        </>
      )}
    </>
  );
};
