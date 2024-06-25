import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, MenuItem, Select, InputLabel, FormControl, Card, CardContent, Stack } from '@mui/material';
import { useAppDispatch } from '@/redux/hooks';
import { SkillsDetailsAction } from '@/redux/actions/resumeAction';

export default function SkillsDetailsForm({setOpenResumeDetaile}) {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    skill: '',
    information: '',
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
    setSkills([...skills, formData]);
    setFormData({
      skill: '',
      information: '',
      level: ''
    });
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SkillsDetailsAction([...skills, formData]));
    setOpenResumeDetaile(4)
  }

  const handleAddSkill = () => {
    setShowForm(true);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Skills Details
      </Typography>
      {!showForm ? (
        <>
          <Box textAlign="center" mt={2}>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddSkill}
            >
              Add Skill
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
            {skills.map((skill, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {skill.skill}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {skill.information}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Level: {skill.level}
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
                label="Skill"
                name="skill"
                value={formData.skill}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Information / Sub-skills"
                name="information"
                value={formData.information}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="level-label">Skill Level</InputLabel>
                <Select
                  labelId="level-label"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  label="Skill Level"
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
