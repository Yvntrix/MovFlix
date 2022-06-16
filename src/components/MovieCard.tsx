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
} from "@mantine/core";
import { useLocalStorage, useViewportSize } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  const IMG_URL = "https://image.tmdb.org/t/p/w500";
  const POPULAR =
    BASE_URL + "/movie/popular?" + API_KEY + "&language=en-US&page=";
  let datas: any[] = [];
  useEffect(() => {
    getMovies();
  }, [page]);

  function getMovies() {
    setLoading(true);
    setValue(page);
    datas = [];
    if (page <= 500) {
      axios
        .get(POPULAR + page)
        .then(async (result) => {
          const res = await result.data.results;
          for (let i in res) {
            datas.push(res[i]);
          }
          setData(datas);
          setTimeout(() => {
            setLoading(false);
          }, 400);
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
      <Group position="center" p="md">
        <span>
          Page <strong>{page} of 500</strong>
        </span>
        <ActionIcon
          disabled={page == 1}
          variant="outline"
          onClick={() => {
            setPage(page - 1);
            getMovies();
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
            getMovies();
          }}
        >
          <IconChevronRight size={16} />
        </ActionIcon>
      </Group>
      {loading ? (
        <>
          <Center sx={{ minHeight: height }}>
            <Loader color="violet" />
          </Center>
        </>
      ) : (
        <>
          <Grid justify="center" align="center" p="xl">
            {data.map((info, idx) => {
              return (
                <Grid.Col xs={6} md={4} lg={2.3} key={idx}>
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
                            alt={info.title}
                          />
                        </Card.Section>
                      </Card>
                    </Link>
                  </Paper>
                </Grid.Col>
              );
            })}
          </Grid>
        </>
      )}
    </>
  );
};
