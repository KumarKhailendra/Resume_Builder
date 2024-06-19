// components/templates/Template1.js
import React from 'react';
import styles from './Template1.module.css';

const Template1 = ({ data }) => (
  <div className={styles.template}>
    <header className={styles.header}>
      <h1>{data.personal.name}</h1>
      <p>{data.contact.email} | {data.contact.phone}</p>
      <p>{data.personal.address}</p>
    </header>
    {
      data.profile.summary ? 
        <section className={styles.section}>
          <h2>Profile</h2>
          <p>{data.profile.summary}</p>
        </section>
        : <></>
    }
    {
      data?.experience.length !== 0  ?
        <section className={styles.section}>
          <h2>Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.itemHeader}>
                <h3>{exp.jobTitle}</h3>
                <p className={styles.date}>{exp.startDate} - {exp.endDate}</p>
              </div>
              <p>{exp.company}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      :<></>
    }
    {
      data?.education.length !== 0  ? 
        <section className={styles.section}>
          <h2>Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.itemHeader}>
                <h3>{edu.degree}</h3>
                <p className={styles.date}>{edu.startDate} - {edu.endDate}</p>
              </div>
              <p>{edu.institution}</p>
              <p>{edu.year}</p>
            </div>
          ))}
        </section>
      :<></>
    }
    {
      data.skills.length !== 0  ?
        <section className={styles.section}>
          <h2>Skills</h2>
          <ul className={styles.skillsList}>
            {data.skills.map((skill, index) => (
              <li key={index} className={styles.skillItem}>{skill.skill}</li>
            ))}
          </ul>
        </section>
       :<></>
    }
    {
      data.projects.length !== 0 ?
        <section className={styles.section}>
          <h2>Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className={styles.item}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </section>
       :<></>
    }
    {
      data.courses.length !== 0 ? 
        <section className={styles.section}>
          <h2>Courses</h2>
          {data.courses.map((course, index) => (
            <div key={index} className={styles.item}>
              <h3>{course.course}</h3>
              <p>{course.institution}</p>
            </div>
          ))}
        </section>
        :<></>
    }
  </div>
);

export default Template1;
