import { Card, Center, Grid, Image, Loader } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "api_key=9e65816b3f3d83bf8de27dd4de9ec9f3";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const POPULAR =
  BASE_URL + "/movie/popular?" + API_KEY + "&language=en-US&page=1";

export const MovieCard = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { height, width } = useViewportSize();
  let datas: any[] = [];

  getMovies();

  function getMovies() {
    axios
      .get(POPULAR)
      .then(async (result) => {
        const res = await result.data.results;
        for (let i in res) {
          datas.push(res[i]);
        }
        setLoading(false);
        setData(datas);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  return (
    <>
      {loading ? (
        <>
          <Center sx={{ minHeight: height }}>
            <Loader color="violet" />
          </Center>
        </>
      ) : (
        <Grid justify="center" align="center">
          {data.map((info, idx) => {
            return (
              <Grid.Col xs={6} md={4} lg={3} key={idx}>
                <Link to={`/movies/${info.id}`}>
                  <Card radius="md" withBorder shadow="xl" p="xl">
                    <Card.Section>
                      <Image
                        sx={(theme) => ({
                          backgroundColor: theme.colors.gray[0],
                          "&:hover": {
                            backgroundColor: theme.colors.gray[1],
                          },
                        })}
                        src={IMG_URL + info.poster_path}
                        height={360}
                        alt={info.title}
                      />
                    </Card.Section>
                  </Card>
                </Link>
              </Grid.Col>
            );
          })}
        </Grid>
      )}
    </>
  );
};
