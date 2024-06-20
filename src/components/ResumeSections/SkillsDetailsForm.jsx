import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useAppDispatch } from '@/redux/hooks';
import { SkillsDetailsAction } from '@/redux/actions/resumeAction';

export default function SkillsDetailsForm() {
  const [formData, setFormData] = useState({
    skill: '',
    information: '',
    level: ''
  });

  const dispatch = useAppDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SkillsDetailsAction(formData));
    console.log('Form Data Submitted:', formData);
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Skills Details
        </Typography>
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}
