import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, Card, CardContent, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { VolunteersDetailsAction } from '@/redux/actions/resumeAction';

export default function VolunteersDetailsForm({setOpenResumeDetaile}) {
  const {resume} = useAppSelector((state)=>state)

  const [volunteers, setVolunteers] = useState(resume.volunteers || []);
  const [formData, setFormData] = useState({
    designation: '',
    companyName: '',
    workDescription: '',
    startDate: '',
    endDate: '',
    location: '',
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
    setVolunteers([...volunteers, formData]);
    setFormData({
      designation: '',
      companyName: '',
      workDescription: '',
      startDate: '',
      endDate: '',
      location: '',
    });
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(VolunteersDetailsAction([...volunteers, formData]));
    setOpenResumeDetaile(2)
  };

  const handleAddVolunteers = () => {
    setShowForm(true);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom align="center">
      Volunteer Experience Details
      </Typography>
      {!showForm ? (
        <>
          <Box textAlign="center" mt={2}>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddVolunteers}
            >
              Add Volunteer Experience
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
            {volunteers.map((volunteer, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {volunteer.designation}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {volunteer.companyName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {volunteer.startDate} to {volunteer.endDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {volunteer.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {volunteer.workDescription}
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
                label="Designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Work Description"
                name="workDescription"
                value={formData.workDescription}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
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
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                margin="normal"
                required
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
