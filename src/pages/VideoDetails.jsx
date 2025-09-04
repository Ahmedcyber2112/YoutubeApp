import { useState, useEffect } from "react";
import { fetchFromAPI } from "../utils/fetchFromURL.JS";
import { useParams } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  LinearProgress,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactPlayer from "react-player/youtube";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { Videos } from "../components/index";
const VideoDetails = () => {
  const { id } = useParams();
  const [videoInfo, setvideoInfo] = useState({});
  const [relatedVideos, setrelatedVideos] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    fetchFromAPI(`videos?part=snippet&statistic&id=${id}`).then((res) => {
      setvideoInfo(res.items[0]);
      fetchFromAPI(
        `search?part=snippet&relatedToVideoId=${id}&type=video`
      ).then((res) => {
        setrelatedVideos(res.items);
        setloading(false);
      });
    });
  }, [id]);

  if (!videoInfo?.snippet) return "loading..";
  const {
    snippet: { title, channelId, channelTitle, description },
    statistics: { viewCount, likeCount },
  } = videoInfo;

  return (
    <>
      {loading && <LinearProgress color="error" />}
      <Box min-height="100vh" px={{ xs: 1, md: 3, lg: 4 }}>
        <Stack direction={{ xm: "column", md: "row" }} gap={2}>
          <Box flex={0.98} mb={{ xs: 4, md: 0 }}>
            <Box sx={{ width: "100%", position: "static", top: "86px" }}>
              <ReactPlayer
                className="react-player"
                url={`https://www.youtube.com/watch?v=${id}`}
                controls
              />
              <Typography variant="h5" color="#fff" p={2} fontWeight="bold">
                {title}
              </Typography>
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                px={2}
                py={1}
                gap={2}
                alignItems="start"
                color="#fff"
              >
                <Link to={"/channel/" + channelId}>
                  <Typography color="#fff" variant="subtitle1">
                    {channelTitle}
                    <CheckCircleIcon
                      sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                    />
                  </Typography>
                </Link>
                <Stack direction="row" gap="20px" alignItems="center">
                  <Typography sx={{ opacity: 0.7 }} variant="body1">
                    {parseInt(viewCount).toLocaleString()} views
                  </Typography>
                  <Typography sx={{ opacity: 0.7 }} variant="body1">
                    {parseInt(likeCount).toLocaleString()} likes
                  </Typography>
                  <Box
                    sx={{
                      opacity: 0.7,
                      display: "flex",
                      cursor: "pointer",
                      color: "white",
                      ":hover": {
                        opacity: 1,
                      },
                    }}
                    alignItems={"center"}
                    component={"a"}
                    href={`https://ar.savefrom.net/245/https://www.youtube.com/watch?v=${id}`}
                    target={"_blank"}
                  >
                    <DownloadIcon />
                    Download
                  </Box>
                </Stack>
              </Stack>
              <Accordion sx={{ background: "#272727", color: "#fff", mt: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{description}</Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
          <Box sx={{ ml: { xs: 0, md: 2 } }}>
            <Videos videosData={relatedVideos} direction="column" />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default VideoDetails;
