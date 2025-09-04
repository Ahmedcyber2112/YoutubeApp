import { useState, useEffect } from "react";
import { Stack, Box } from "@mui/material";
import VideoCart from "./VideoCart";
import ChannelCart from "./ChannelCart";
import InfiniteScroll from "react-infinite-scroll-component";

const Videos = ({ videosData, direction }) => {
  const [visiableVideos, setvisiableVideos] = useState([]);
  const [videsIndex, setvidesIndex] = useState(10);
  const [more, setmore] = useState(true);
  useEffect(() => {
    setvisiableVideos(videosData.slice(0, videsIndex));
  }, [videosData]);

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
        {visiableVideos?.map((item) =>
          item.id.channelId ? (
            <ChannelCart channelDetails={item} key={item.id.channelId} />
          ) : (
            <VideoCart
              video={item}
              key={item.id.videoId}
              setvidesIndex={setvidesIndex}
            />
          )
        )}
      </Stack>
    </InfiniteScroll>
  );
};

export default Videos;
