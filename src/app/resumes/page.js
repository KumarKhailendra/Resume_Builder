"use client";
import { useState } from "react";
import { templates } from "@/data/templates";
import dynamic from "next/dynamic";
import styles from "@/style/Dashboard.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import { FaAddressCard } from "react-icons/fa";
import { GrProjects, GrUserWorker } from "react-icons/gr";
import { SiCoursera, SiMinds } from "react-icons/si";
import { IoMdSchool } from "react-icons/io";
import PersonalDetailsForm from "@/components/ResumeSections/PersonalDetailsForm";
import ExperienceDetailsForm from "@/components/ResumeSections/ExperienceDetailsForm";
import EducationDetailsForm from "@/components/ResumeSections/EducationDetailsForm";
import SkillsDetailsForm from "@/components/ResumeSections/SkillsDetailsForm";
import ProjectsDetailsForm from "@/components/ResumeSections/ProjectsDetailsForm";
import CoursesDetailsForm from "@/components/ResumeSections/CoursesDetailsForm";
import { useAppSelector } from "@/redux/hooks";

export default function Resumes() {
  const [collapsed, setCollapsed] = useState(false);
  const [openResumeDetaile, setOpenResumeDetaile] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { resume } = useAppSelector(state => state)

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const DynamicTemplate = selectedTemplate
    ? dynamic(() =>
        import(`@/components/templates/${selectedTemplate.component}`)
      )
    : null;

  return (
    <div style={{ display: "flex", height: "100vh", minHeight: "400px", width: "100%" }}>
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
          <div style={{ display: "flex", height: "100vh", minHeight: "400px" }}>
            <Sidebar
              collapsed={collapsed}
              roostyle={{ height: "100vh", minHeight: "400px" }}
            >
              <Menu>
                <MenuItem
                  onClick={() => setCollapsed(!collapsed)}
                  icon={
                    collapsed ? (
                      <TbLayoutSidebarRightCollapseFilled />
                    ) : (
                      <TbLayoutSidebarLeftCollapseFilled />
                    )
                  }
                >
                  {" "}
                  collapse
                </MenuItem>
                <MenuItem icon={<FaAddressCard />} active={openResumeDetaile===0? true: false} onClick={()=>setOpenResumeDetaile(0)}> Personal Details</MenuItem>
                <MenuItem icon={<GrUserWorker />} onClick={()=>setOpenResumeDetaile(1)}> Experience</MenuItem>
                <MenuItem icon={<IoMdSchool />} onClick={()=>setOpenResumeDetaile(2)}> Education</MenuItem>
                <MenuItem icon={<SiMinds />} onClick={()=>setOpenResumeDetaile(3)}> Skills</MenuItem>
                <MenuItem icon={<GrProjects />} onClick={()=>setOpenResumeDetaile(4)}> Projects</MenuItem>
                <MenuItem icon={<SiCoursera />} onClick={()=>setOpenResumeDetaile(5)}> Courses</MenuItem>
              </Menu>
            </Sidebar>
            <div className={styles.container}>
            {
              openResumeDetaile === 0 && (
                <PersonalDetailsForm setOpenResumeDetaile={setOpenResumeDetaile} />
              )
            }
            {
              openResumeDetaile === 1 && (
                <ExperienceDetailsForm setOpenResumeDetaile={setOpenResumeDetaile} />
              )
            }
            {
              openResumeDetaile === 2 && (
                <EducationDetailsForm setOpenResumeDetaile={setOpenResumeDetaile} />
              )
            }
            {
              openResumeDetaile === 3 && (
                <SkillsDetailsForm setOpenResumeDetaile={setOpenResumeDetaile} />
              )
            }
            {
              openResumeDetaile === 4 && (
                <ProjectsDetailsForm setOpenResumeDetaile={setOpenResumeDetaile} />
              )
            }
            {
              openResumeDetaile === 5 && (
                <CoursesDetailsForm setOpenResumeDetaile={setOpenResumeDetaile} />
              )
            }
            {
              openResumeDetaile === 6 && (
                <div className={styles.preview}>
                  {selectedTemplate && <DynamicTemplate data={resume} />}
                </div>
              )
            }
            </div>
          </div>
        )}
    </div>
  );
}
