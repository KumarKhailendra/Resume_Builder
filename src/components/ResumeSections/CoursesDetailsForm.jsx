import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  List,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Stack,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add'; 
import { useAppDispatch } from "@/redux/hooks";
import { CoursesDetailsAction } from "@/redux/actions/resumeAction";

export default function CoursesDetailsForm({setOpenResumeDetaile}) {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseTitle: "",
    institution: "",
    city: "",
    country: "",
    startDate: "",
    endDate: "",
    description: "",
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
    setCourses([...courses, formData]);
    setFormData({
      courseTitle: "",
      institution: "",
      city: "",
      country: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CoursesDetailsAction([...courses, formData]));
    setOpenResumeDetaile(6);
  };

  const handleAddCourse = () => {
    setShowForm(true);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Courses Details
      </Typography>
      {!showForm ? (
        <>
          <Box textAlign="center" mt={2}>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCourse}
              startIcon={<AddIcon />}
            >
              Add Course
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
            {courses.map((course, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {course.courseTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.institution}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.city}, {course.country}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.startDate} to {course.endDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.description}
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
            bgcolor: "background.paper",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course Title"
                name="courseTitle"
                value={formData.courseTitle}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
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
