"use client";
import { useState } from "react";
import axios from "axios";
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
import { BiSolidContact } from "react-icons/bi";
import { FaAddressCard } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { GrProjects, GrUserWorker } from "react-icons/gr";
import { SiCoursera, SiMinds } from "react-icons/si";
import { IoMdSchool } from "react-icons/io";
import PersonalDetailsForm from "@/components/ResumeSections/PersonalDetailsForm";
import ExperienceDetailsForm from "@/components/ResumeSections/ExperienceDetailsForm";
import EducationDetailsForm from "@/components/ResumeSections/EducationDetailsForm";
import SkillsDetailsForm from "@/components/ResumeSections/SkillsDetailsForm";
import ProjectsDetailsForm from "@/components/ResumeSections/ProjectsDetailsForm";
import CoursesDetailsForm from "@/components/ResumeSections/CoursesDetailsForm";

export default function Resumes() {
  const [collapsed, setCollapsed] = useState(false);
  const [openResumeDetaile, setOpenResumeDetaile] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    contact: {},
    personal: {},
    profile: {},
    experience: [],
    education: [],
    skills: [],
    projects: [],
    courses: [],
  });

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const handleChange = (section, e) => {
    const { name, value } = e.target;
    if (Array.isArray(formData[section])) {
      const index = e.target.getAttribute("data-index");
      const newItems = [...formData[section]];
      newItems[index] = { ...newItems[index], [name]: value };
      setFormData({
        ...formData,
        [section]: newItems,
      });
    } else {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [name]: value },
      });
    }
  };

  const handleAddItem = (section) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], {}],
    });
  };

  const handleRemoveItem = (section, index) => {
    const newItems = formData[section].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [section]: newItems,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/resume", {
        template: selectedTemplate,
        data: formData,
      });
      alert("Resume saved successfully");
    } catch (err) {
      alert("Error saving resume");
    }
  };

  const DynamicTemplate = selectedTemplate
    ? dynamic(() =>
        import(`@/components/templates/${selectedTemplate.component}`)
      )
    : null;

  return (
    <div style={{ display: "flex", height: "100vh", minHeight: "400px" }}>
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
        {/* {selectedTemplate && (
        <div className={styles.editorContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Editing: {selectedTemplate.name}</h2>
            <section id="contact" className={styles.section}>
              <h3>Contact Details</h3>
              <input className={styles.formInput} name="email" placeholder="Email" onChange={(e) => handleChange('contact', e)} />
              <input className={styles.formInput} name="phone" placeholder="Phone" onChange={(e) => handleChange('contact', e)} />
            </section>
            <section id="personal" className={styles.section}>
              <h3>Personal Details</h3>
              <input className={styles.formInput} name="name" placeholder="Name" onChange={(e) => handleChange('personal', e)} />
              <input className={styles.formInput} name="address" placeholder="Address" onChange={(e) => handleChange('personal', e)} />
            </section>
            <section id="profile" className={styles.section}>
              <h3>Profile</h3>
              <textarea className={styles.formInput} name="summary" placeholder="Profile Summary" onChange={(e) => handleChange('profile', e)} />
            </section>
            <section id="experience" className={styles.section}>
              <h3>Experience</h3>
              {formData.experience.map((_, index) => (
                <div key={index} className={styles.item}>
                  <input className={styles.formInput} name="jobTitle" placeholder="Job Title" data-index={index} onChange={(e) => handleChange('experience', e)} />
                  <input className={styles.formInput} name="company" placeholder="Company" data-index={index} onChange={(e) => handleChange('experience', e)} />
                  <textarea className={styles.formInput} name="description" placeholder="Description" data-index={index} onChange={(e) => handleChange('experience', e)} />
                  <button type="button" className={styles.removeButton} onClick={() => handleRemoveItem('experience', index)}>Remove</button>
                </div>
              ))}
              <button type="button" className={styles.addButton} onClick={() => handleAddItem('experience')}>Add Experience</button>
            </section>
            <section id="education" className={styles.section}>
              <h3>Education</h3>
              {formData.education.map((_, index) => (
                <div key={index} className={styles.item}>
                  <input className={styles.formInput} name="degree" placeholder="Degree" data-index={index} onChange={(e) => handleChange('education', e)} />
                  <input className={styles.formInput} name="institution" placeholder="Institution" data-index={index} onChange={(e) => handleChange('education', e)} />
                  <input className={styles.formInput} name="year" placeholder="Year" data-index={index} onChange={(e) => handleChange('education', e)} />
                  <button type="button" className={styles.removeButton} onClick={() => handleRemoveItem('education', index)}>Remove</button>
                </div>
              ))}
              <button type="button" className={styles.addButton} onClick={() => handleAddItem('education')}>Add Education</button>
            </section>
            <section id="skills" className={styles.section}>
              <h3>Skills</h3>
              {formData.skills.map((_, index) => (
                <div key={index} className={styles.item}>
                  <input className={styles.formInput} name="skill" placeholder="Skill" data-index={index} onChange={(e) => handleChange('skills', e)} />
                  <button type="button" className={styles.removeButton} onClick={() => handleRemoveItem('skills', index)}>Remove</button>
                </div>
              ))}
              <button type="button" className={styles.addButton} onClick={() => handleAddItem('skills')}>Add Skill</button>
            </section>
            <section id="projects" className={styles.section}>
              <h3>Projects</h3>
              {formData.projects.map((_, index) => (
                <div key={index} className={styles.item}>
                  <input className={styles.formInput} name="title" placeholder="Project Title" data-index={index} onChange={(e) => handleChange('projects', e)} />
                  <textarea className={styles.formInput} name="description" placeholder="Description" data-index={index} onChange={(e) => handleChange('projects', e)} />
                  <button type="button" className={styles.removeButton} onClick={() => handleRemoveItem('projects', index)}>Remove</button>
                </div>
              ))}
              <button type="button" className={styles.addButton} onClick={() => handleAddItem('projects')}>Add Project</button>
            </section>
            <section id="courses" className={styles.section}>
              <h3>Courses</h3>
              {formData.courses.map((_, index) => (
                <div key={index} className={styles.item}>
                  <input className={styles.formInput} name="course" placeholder="Course" data-index={index} onChange={(e) => handleChange('courses', e)} />
                  <input className={styles.formInput} name="institution" placeholder="Institution" data-index={index} onChange={(e) => handleChange('courses', e)} />
                  <button type="button" className={styles.removeButton} onClick={() => handleRemoveItem('courses', index)}>Remove</button>
                </div>
              ))}
              <button type="button" className={styles.addButton} onClick={() => handleAddItem('courses')}>Add Course</button>
            </section>
            <button className={styles.formButton} type="submit">Save Resume</button>
          </form>
          <div className={styles.preview}>
            {selectedTemplate && <DynamicTemplate data={formData} />}
          </div>
        </div>
      )} */}
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
                <PersonalDetailsForm />
              )
            }
            {
              openResumeDetaile === 1 && (
                <ExperienceDetailsForm />
              )
            }
            {
              openResumeDetaile === 2 && (
                <EducationDetailsForm />
              )
            }
            {
              openResumeDetaile === 3 && (
                <SkillsDetailsForm />
              )
            }
            {
              openResumeDetaile === 4 && (
                <ProjectsDetailsForm />
              )
            }
            {
              openResumeDetaile === 5 && (
                <CoursesDetailsForm />
              )
            }
            </div>
          </div>
        )}
    </div>
  );
}
