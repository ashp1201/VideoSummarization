import React, { useState, useEffect } from 'react';
import NavbarWithRouter from './Components/Navbar';
import Footer from './Components/Footer';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Box,
  ThemeProvider,
  createTheme,
  Alert,
} from '@mui/material';

import {
  YouTube as YouTubeIcon,
  Description as DescriptionIcon,
  List as ListIcon,
  QuestionAnswer as QuestionAnswerIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function App() {
  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [videoId, setVideoId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const extractVideoId = (url) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };

    const id = extractVideoId(url);
    if (id) {
      setVideoId(id);
      setError('');
    } else if (url) {
      setVideoId('');
      setError('Invalid YouTube URL');
    } else {
      setVideoId('');
      setError('');
    }
  }, [url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoId) {
      // Here you would typically send the URL to your backend for processing
      console.log('Submitted URL:', url);
    } else {
      setError('Please enter a valid YouTube URL');
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
    <ThemeProvider theme={theme}>
      <NavbarWithRouter />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            YouTube Video Analyzer
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="YouTube URL"
              variant="outlined"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              margin="normal"
              error={!!error}
              helperText={error}
            />
            <div style={{display:'flex',justifyContent:'space-around'}}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<YouTubeIcon />}
              sx={{ mt: 2, mb: 2 }}
            >
               Generate Summary
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<YouTubeIcon />}
              sx={{ mt: 2, mb: 2 }}
            >
              
              Phrase Analyze
            </Button>
            </div>
          </form>
          {videoId && (
            <Box sx={{ position: 'relative', paddingTop: '56.25%', mb: 2 }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>
          )}
          {error && <Alert severity="error" sx={{ mt: 2, mb: 2 }}>{error}</Alert>}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="analysis tabs">
              <Tab icon={<DescriptionIcon />} label="Transcribe" />
              <Tab icon={<ListIcon />} label="Summarize" />
              <Tab icon={<QuestionAnswerIcon />} label="Quiz" />
              <Tab icon={<BarChartIcon />} label="Analyze" />
            </Tabs>
          </Box>
          <TabPanel value={activeTab} index={0}>
            Transcription content goes here
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            Summary content goes here
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            Quiz content goes here
          </TabPanel>
          <TabPanel value={activeTab} index={3}>
            Word analysis content goes here
          </TabPanel>
        </Paper>
      </Container>
    </ThemeProvider>
    <Footer />
    </>
  );
}

export default App;