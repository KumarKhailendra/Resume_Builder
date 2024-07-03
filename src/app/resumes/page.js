"use client";
import React, { useState } from "react";
import { templates } from "@/data/templates";
import dynamic from "next/dynamic";
import styles from "@/style/Dashboard.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import PersonalDetailsForm from "@/components/ResumeSections/PersonalDetailsForm";
import ExperienceDetailsForm from "@/components/ResumeSections/ExperienceDetailsForm";
import EducationDetailsForm from "@/components/ResumeSections/EducationDetailsForm";
import SkillsDetailsForm from "@/components/ResumeSections/SkillsDetailsForm";
import ProjectsDetailsForm from "@/components/ResumeSections/ProjectsDetailsForm";
import CoursesDetailsForm from "@/components/ResumeSections/CoursesDetailsForm";
import { useAppSelector } from "@/redux/hooks";
import { Box, Button, Step, StepButton, Stepper } from "@mui/material";
import LanguagesDetailsForm from "@/components/ResumeSections/LanguagesDetailsForm";
import VolunteersDetailsForm from "@/components/ResumeSections/VolunteersDetailsForm";
import InterestsDetailsForm from "@/components/ResumeSections/InterestsDetailsForm";

const steps = [
  "Personal Details",
  "Experience",
  "Education",
  "Skills",
  "Projects",
  "Courses",
  "Languages",
  "Volunteers",
  "Interests",
];

export default function Resumes() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const { resume } = useAppSelector((state) => state);

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep = isLastStep() && !allStepsCompleted()
      ? steps.findIndex((step, i) => !(i in completed))
      : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

  const handleSelectTemplate = (template) => setSelectedTemplate(template);

  const handleStep = (step) => () => setActiveStep(step);

  const handleComplete = () => {
    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };

  const DynamicTemplate = selectedTemplate
    ? dynamic(() => import(`@/components/templates/${selectedTemplate.component}`))
    : null;

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      {!selectedTemplate ? (
        <div className={styles.container_slider}>
          <h1>Select a Resume Template</h1>
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            loop
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={{ clickable: true }}
            navigation
            modules={[EffectCoverflow, Pagination, Navigation]}
            className={styles.templateSelection}
          >
            {templates.map((template) => (
              <SwiperSlide key={template.id}>
                <div
                  className={styles.templateCard}
                  onClick={() => handleSelectTemplate(template)}
                >
                  <Image
                    src={template.image}
                    alt={template.name}
                    width={100}
                    height={150}
                    layout="responsive"
                    className={styles.swiper_slide}
                  />
                  <p>{template.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className={styles.container}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleComplete} sx={{ mr: 1 }}>
              {isLastStep() ? "Finish" : "Next"}
            </Button>
          </Box>
          {activeStep === 0 && <PersonalDetailsForm setOpenResumeDetaile={handleComplete} />}
          {activeStep === 1 && <ExperienceDetailsForm setOpenResumeDetaile={handleComplete} />}
          {activeStep === 2 && <EducationDetailsForm setOpenResumeDetaile={handleComplete} />}
          {activeStep === 3 && <SkillsDetailsForm setOpenResumeDetaile={handleComplete} />}
          {activeStep === 4 && <ProjectsDetailsForm setOpenResumeDetaile={handleComplete} />}
          {activeStep === 5 && <CoursesDetailsForm setOpenResumeDetaile={handleComplete} />}
          {activeStep === 6 && <LanguagesDetailsForm setOpenResumeDetaile={handleComplete} />}
          {activeStep === 7 && <VolunteersDetailsForm setOpenResumeDetaile={handleComplete} />}
          {activeStep === 8 && <InterestsDetailsForm setOpenResumeDetaile={handleComplete} />}
          {activeStep === 9 && (
            <div className={styles.preview}>
              {selectedTemplate && <DynamicTemplate data={resume} />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
