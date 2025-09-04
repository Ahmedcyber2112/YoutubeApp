import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { NavBar } from "./components/index.jsx";

const LazyFeed = lazy(() => import("./pages/Feed"));
const LazyVideoDetails = lazy(() => import("./pages/VideoDetails"));
const LazyChannelDetails = lazy(() => import("./pages/ChannelDetails"));
const LazySearchFeed = lazy(() => import("./pages/SearchFeed"));

// Loading component
const LoadingFallback = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '50vh',
      flexDirection: 'column',
      gap: 2
    }}
  >
    <CircularProgress color="error" />
    <Typography color="#fff">Loading...</Typography>
  </Box>
);

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: "#000", minHeight: "100vh" }}>
        <NavBar />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LazyFeed />} />
            <Route path="/video/:id" element={<LazyVideoDetails />} />
            <Route path="/channel/:id" element={<LazyChannelDetails />} />
            <Route path="/search/:searchTerm" element={<LazySearchFeed />} />
          </Routes>
        </Suspense>
      </Box>
    </BrowserRouter>
  );
}

export default App;
