import React from 'react';
import styles from './Template2.module.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

const Template2 = ({ data }) => {

  const generatePDF = () => {
    const input = document.getElementById('resume-content');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save(`${data.personal?.name}_resume.pdf`);
      });
  };

  const generateDOCX = () => {
    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: data.personal?.name || 'N/A',
                bold: true,
                size: 32,
                color: "333333",
              }),
            ],
            alignment: "center",
          }),
          new Paragraph({
            text: `${data.contact?.email || 'N/A'} | ${data.contact?.phone || 'N/A'}`,
            alignment: "center",
          }),
          new Paragraph({
            text: "Profile",
            heading: "Heading2",
          }),
          new Paragraph(data.profile?.summary || 'N/A'),
          new Paragraph({
            text: "Experience",
            heading: "Heading2",
          }),
          ...data.experience?.map(exp => (
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.jobTitle || 'N/A'} at ${exp.company || 'N/A'} (${exp.startDate || 'N/A'} - ${exp.endDate || 'N/A'})`,
                  bold: true,
                }),
                new TextRun(`\n${exp.description || 'N/A'}`),
              ],
            })
          )) || [],
          new Paragraph({
            text: "Education",
            heading: "Heading2",
          }),
          ...data.education?.map(edu => (
            new Paragraph({
              children: [
                new TextRun({
                  text: `${edu.degree || 'N/A'} at ${edu.institution || 'N/A'} (${edu.startDate || 'N/A'} - ${edu.endDate || 'N/A'})`,
                  bold: true,
                }),
                new TextRun(`\n${edu.year || 'N/A'}`),
              ],
            })
          )) || [],
          new Paragraph({
            text: "Skills",
            heading: "Heading2",
          }),
          ...data.skills?.map(skill => (
            new Paragraph(skill.skill || 'N/A')
          )) || [],
          new Paragraph({
            text: "Projects",
            heading: "Heading2",
          }),
          ...data.projects?.map(project => (
            new Paragraph({
              children: [
                new TextRun({
                  text: `${project.title || 'N/A'} (${project.date || 'N/A'})`,
                  bold: true,
                }),
                new TextRun(`\n${project.description || 'N/A'}`),
              ],
            })
          )) || [],
          new Paragraph({
            text: "Courses",
            heading: "Heading2",
          }),
          ...data.courses?.map(course => (
            new Paragraph({
              children: [
                new TextRun({
                  text: `${course.course || 'N/A'} at ${course.institution || 'N/A'} (${course.date || 'N/A'})`,
                  bold: true,
                }),
              ],
            })
          )) || [],
        ],
      }],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `${data.personal?.name || 'resume'}.docx`);
    });
  };

  return (
    <div>
      <div className={styles.template} id="resume-content">
        <header className={styles.header}>
          <h1>{data.personal?.name || 'Your Name'}</h1>
          <p>{data.contact?.email || 'Your Email'} | {data.contact?.phone || 'Your Phone'}</p>
        </header>
        <section className={styles.section}>
          <h2>Profile</h2>
          <p>{data.profile?.summary || 'Your profile summary...'}</p>
        </section>
        <section className={styles.section}>
          <h2>Experience</h2>
          {data.experience?.map((exp, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.itemHeader}>
                <h3>{exp.jobTitle || 'Job Title'}</h3>
                <p className={styles.date}>{exp.startDate || 'Start Date'} - {exp.endDate || 'End Date'}</p>
              </div>
              <p>{exp.company || 'Company Name'}</p>
              <p>{exp.description || 'Job Description'}</p>
            </div>
          )) || <p>No experience added.</p>}
        </section>
        <section className={styles.section}>
          <h2>Education</h2>
          {data.education?.map((edu, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.itemHeader}>
                <h3>{edu.degree || 'Degree'}</h3>
                <p className={styles.date}>{edu.startDate || 'Start Date'} - {edu.endDate || 'End Date'}</p>
              </div>
              <p>{edu.institution || 'Institution Name'}</p>
              <p>{edu.year || 'Year'}</p>
            </div>
          )) || <p>No education added.</p>}
        </section>
        <section className={styles.section}>
          <h2>Skills</h2>
          <ul className={styles.skillsList}>
            {data.skills?.map((skill, index) => (
              <li key={index} className={styles.skillItem}>{skill.skill || 'Skill'}</li>
            )) || <p>No skills added.</p>}
          </ul>
        </section>
        <section className={styles.section}>
          <h2>Projects</h2>
          {data.projects?.map((project, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.itemHeader}>
                <h3>{project.title || 'Project Title'}</h3>
                <p className={styles.date}>{project.date || 'Date'}</p>
              </div>
              <p>{project.description || 'Project Description'}</p>
            </div>
          )) || <p>No projects added.</p>}
        </section>
        <section className={styles.section}>
          <h2>Courses</h2>
          {data.courses?.map((course, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.itemHeader}>
                <h3>{course.course || 'Course'}</h3>
                <p className={styles.date}>{course.date || 'Date'}</p>
              </div>
              <p>{course.institution || 'Institution Name'}</p>
            </div>
          )) || <p>No courses added.</p>}
        </section>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={generatePDF} className={styles.button}>Download PDF</button>
        <button onClick={generateDOCX} className={styles.button}>Download DOCX</button>
      </div>
    </div>
  );
};

export default Template2;
