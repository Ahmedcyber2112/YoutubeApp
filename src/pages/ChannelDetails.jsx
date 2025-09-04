import { useEffect, useState } from "react";
import { fetchFromAPI } from "../utils/fetchFromURL.JS";
import { useParams } from "react-router-dom";
import { Videos } from "../components/index";
import { Box, LinearProgress } from "@mui/material";
import ChannelCart from "../components/ChannelCart";
const ChannelDetails = () => {
  const [channel, setchannel] = useState({});
  const [videosData, setvideosData] = useState([]);
  const [loading, setloading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    setloading(true);
    fetchFromAPI(`channels?part=snippet%2Cstatistics&id=${id}`).then((res) => {
      setchannel(res.items[0]);
      setloading(false);
    });
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (res) => {
        setvideosData(res.items);
      }
    );
  }, []);

  return (
    <>
      {loading && <LinearProgress color="error" />}

      <Box>
        <div
          style={{
            background:
              " #474bff linear-gradient(0deg, #474bff 0%, #bc48ff 100%)",
            height: "300px",
          }}
        />
        <Box sx={{ mx: "auto", marginTop: "-140px", width: "fit-content" }}>
          <ChannelCart channelDetails={channel} />
        </Box>
        <Videos videosData={videosData} />
      </Box>
    </>
  );
};

export default ChannelDetails;
