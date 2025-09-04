import { useState, useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";
import VideoCart from "./VideoCart";
import ChannelCart from "./ChannelCart";
import InfiniteScroll from "react-infinite-scroll-component";

const Videos = ({ videosData, direction }) => {
  const [visiableVideos, setvisiableVideos] = useState([]);
  const [videsIndex, setvidesIndex] = useState(10);
  const [more, setmore] = useState(true);
  
  useEffect(() => {
    if (videosData && videosData.length > 0) {
      setvisiableVideos(videosData.slice(0, videsIndex));
      setmore(videosData.length > videsIndex);
    } else {
      setvisiableVideos([]);
      setmore(false);
    }
  }, [videosData, videsIndex]);

  const fetchMoreData = () => {
    if (visiableVideos.length < videosData.length) {
      setTimeout(() => {
        setvisiableVideos([
          ...visiableVideos,
          ...videosData.slice(videsIndex, 10 + videsIndex),
        ]);
        setvidesIndex(videsIndex + 10);
      }, 1100);
    } else {
      setmore(false);
    }
  };

  // If no videos data, show a message
  if (!videosData || videosData.length === 0) {
    return (
      <Box sx={{ textAlign: "center", color: "#fff", mt: 4 }}>
        <Typography variant="h6">
          No videos available at the moment.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
          Please try again later or select a different category.
        </Typography>
      </Box>
    );
  }

  return (
    <InfiniteScroll
      dataLength={visiableVideos.length}
      next={fetchMoreData}
      hasMore={more}
      height={"100vh"}
      loader={
        <h4 style={{ textAlign: "center", color: "white" }}>Loading...</h4>
      }
      endMessage={
        <p style={{ textAlign: "center", color: "white" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <Stack
        direction={direction || "row"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {visiableVideos?.map((item, index) => {
          // Add safety checks for item structure
          if (!item || !item.id) return null;
          
          return item.id.channelId ? (
            <ChannelCart 
              channelDetails={item} 
              key={item.id.channelId || `channel-${index}`} 
            />
          ) : (
            <VideoCart
              video={item}
              key={item.id.videoId || `video-${index}`}
              setvidesIndex={setvidesIndex}
            />
          );
        })}
      </Stack>
    </InfiniteScroll>
  );
};

export default Videos;
