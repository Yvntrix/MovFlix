import {
  ActionIcon,
  BackgroundImage,
  Badge,
  Center,
  Group,
  Image,
  Loader,
  Overlay,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useViewportSize } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY =
  "?api_key=9e65816b3f3d83bf8de27dd4de9ec9f3&language=en-US&append_to_response=videos";
const BASE_URL = "https://api.themoviedb.org/3/movie/";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const BG_URL = "https://image.tmdb.org/t/p/w1280";

export const Movie = () => {
  const [loading, setLoading] = useState(true);
  const { height, width } = useViewportSize();
  const [details, setDetails] = useState<any[]>([]);
  let datas: any[] = [];
  let { id } = useParams();

  function getMovieDetails() {
    axios
      .get(BASE_URL + id + API_KEY)
      .then(async (res) => {
        datas.push(res.data);
        setDetails(datas);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Center sx={{ minHeight: height }}>
            <Loader color="violet" />
          </Center>
        </>
      ) : (
        details.map((info, idx) => {
          return (
            <div key={idx}>
              <BackgroundImage
                sx={{ zIndex: 1, minHeight: height }}
                src={
                  info.backdrop_path == null
                    ? "https://www.globalpharmatek.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg"
                    : BG_URL + info.backdrop_path
                }
              >
                <Overlay opacity={0.6} color="#000" zIndex={1} />
                <Stack p="md">
                  <Group position="left">
                    <ActionIcon<"a">
                      sx={{ zIndex: 3 }}
                      color="violet"
                      variant="filled"
                      component="a"
                      href="/"
                    >
                      <IconChevronLeft size={16} />
                    </ActionIcon>
                  </Group>
                  <Group sx={{ zIndex: 3 }} position="center" align="center">
                    <Image
                      height={360}
                      radius="md"
                      src={IMG_URL + info.poster_path}
                      alt={info.title}
                    />
                    <Space w="xl" />
                    <Stack
                      align="flex-start"
                      justify="flex-start"
                      sx={{ minWidth: 360 }}
                    >
                      <Title sx={{ color: "white", maxWidth: 480 }} order={2}>
                        {info.title}
                      </Title>
                      <Text size="md" sx={{ color: "#e9e9e8" }}>
                        "{info.tagline == "" ? "N/A" : info.tagline}"
                      </Text>
                      <Text size="md" sx={{ color: "white", maxWidth: 480 }}>
                        {info.overview}
                      </Text>
                      <Group>
                        {info.genres.map((genre: any, idex: any) => (
                          <Badge
                            key={idex}
                            color="violet"
                            size="lg"
                            variant="filled"
                          >
                            {genre.name}
                          </Badge>
                        ))}
                      </Group>
                    </Stack>
                  </Group>
                </Stack>
              </BackgroundImage>
            </div>
          );
        })
      )}
    </>
  );
};
