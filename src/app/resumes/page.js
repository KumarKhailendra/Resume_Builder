"use client";
import React, { useState } from "react";
import { templates } from "@/data/templates";
import dynamic from "next/dynamic";
import styles from "@/style/Dashboard.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import PersonalDetailsForm from "@/components/ResumeSections/PersonalDetailsForm";
import ExperienceDetailsForm from "@/components/ResumeSections/ExperienceDetailsForm";
import EducationDetailsForm from "@/components/ResumeSections/EducationDetailsForm";
import SkillsDetailsForm from "@/components/ResumeSections/SkillsDetailsForm";
import ProjectsDetailsForm from "@/components/ResumeSections/ProjectsDetailsForm";
import CoursesDetailsForm from "@/components/ResumeSections/CoursesDetailsForm";
import { useAppSelector } from "@/redux/hooks";
import { Box, Button, Step, StepButton, Stepper, Typography } from "@mui/material";

const steps = [
  "Personal Details",
  "Experience",
  "Education",
  "Skills",
  "Projects",
  "Courses",
];

export default function Resumes() {
  const [openResumeDetaile, setOpenResumeDetaile] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const { resume } = useAppSelector((state) => state);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const handleStep = (step) => () => {
    completedSteps()
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const DynamicTemplate = selectedTemplate
    ? dynamic(() =>
        import(`@/components/templates/${selectedTemplate.component}`)
      )
    : null;

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        minHeight: "400px",
        width: "100%",
      }}
    >
      {!selectedTemplate && (
        <div className={styles.container}>
          <h1>Select a Resume Template</h1>
          <Swiper
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={3}
            modules={[Pagination]}
            breakpoints={{
              1024: {
                slidesPerView: 3,
              },
              600: {
                slidesPerView: 2,
              },
              480: {
                slidesPerView: 1,
              },
            }}
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
                    style={{ width: "100%", height: "100%" }}
                  />
                  <p>{template.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {selectedTemplate && (
        <div style={{ display: "flex", height: "100vh", minHeight: "400px", width: "100%" }}>
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
          <React.Fragment>
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
              {activeStep !== 6 && (
              <Button onClick={handleComplete} sx={{ mr: 1 }}>
                Next
              </Button>
            )}
                <Button onClick={()=> setActiveStep(6)}>
                  preview
                </Button>
            </Box>
          </React.Fragment>
            {activeStep === 0 && (
              <PersonalDetailsForm
                setOpenResumeDetaile={setActiveStep}
              />
            )}
            {activeStep === 1 && (
              <ExperienceDetailsForm
                setOpenResumeDetaile={setActiveStep}
              />
            )}
            {activeStep === 2 && (
              <EducationDetailsForm
                setOpenResumeDetaile={setActiveStep}
              />
            )}
            {activeStep === 3 && (
              <SkillsDetailsForm setOpenResumeDetaile={setActiveStep} />
            )}
            {activeStep === 4 && (
              <ProjectsDetailsForm
                setOpenResumeDetaile={setActiveStep}
              />
            )}
            {activeStep === 5 && (
              <CoursesDetailsForm setOpenResumeDetaile={setActiveStep} />
            )}
            {activeStep === 6 && (
              <div className={styles.preview}>
                {selectedTemplate && <DynamicTemplate data={resume} />}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
