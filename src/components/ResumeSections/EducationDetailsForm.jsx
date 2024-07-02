import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, Card, CardContent, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { EducationDetailsAction } from '@/redux/actions/resumeAction';

export default function EducationDetailsForm({setOpenResumeDetaile}) {
  const {education} = useAppSelector((state)=>state.resume)
  const [educations, setEducations] = useState(education || []);
  const [formData, setFormData] = useState({
    degree: '',
    college: '',
    startDate: '',
    endDate: '',
    description: ''
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
    setEducations([...educations, formData]);
    setFormData({
      degree: '',
      college: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(EducationDetailsAction([...educations, formData]));
    setOpenResumeDetaile(3)
  };

  const handleAddEducation = () => {
    setShowForm(true);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Education Details
      </Typography>
      {!showForm ? (
        <>
          <Box textAlign="center" mt={2}>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddEducation}
            >
              Add Education
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
            {educations.map((education, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {education.degree}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {education.college}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {education.startDate} to {education.endDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {education.description}
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Degree and Stream"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="College or University"
                name="college"
                value={formData.college}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
              />
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
