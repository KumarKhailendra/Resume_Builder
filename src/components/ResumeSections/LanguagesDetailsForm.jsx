import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, MenuItem, Select, InputLabel, FormControl, Card, CardContent, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { LanguagesDetailsAction } from '@/redux/actions/resumeAction';

export default function LanguagesDetailsForm({setOpenResumeDetaile}) {
  const {resume} = useAppSelector((state)=>state)
  const [languages, setLanguages] = useState(resume?.languages || []);
  const [formData, setFormData] = useState({
    language: '',
    level: ''
  });
  const [showForm, setShowForm] = useState(false);

  const dispatch = useAppDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    setLanguages([...languages, formData]);
    setFormData({
      language: '',
      level: ''
    });
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LanguagesDetailsAction([...languages, formData]));
    setOpenResumeDetaile(4)
  }

  const handleAddLanguage = () => {
    setShowForm(true);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom align="center">
      Languages Details
      </Typography>
      {!showForm ? (
        <>
          <Box textAlign="center" mt={2}>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddLanguage}
            >
              Add Language
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Save & Next
            </Button>
          </Stack>
          </Box>
          <Grid container spacing={3} mt={2}>
            {languages.map((language, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {language.language}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Level: {language.level}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Box
          component="form"
          onSubmit={handleSaveSubmit}
          sx={{
            mt: 4,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="level-label">Language Level</InputLabel>
                <Select
                  labelId="level-label"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  label="Language Level"
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Amateur">Amateur</MenuItem>
                  <MenuItem value="Competent">Competent</MenuItem>
                  <MenuItem value="Proficient">Proficient</MenuItem>
                  <MenuItem value="Expert">Expert</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Stack spacing={2} direction="row">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => setShowForm(false)}
            >
              Close
            </Button>
          </Stack>
        </Box>
      )}
    </Container>
  );
}
