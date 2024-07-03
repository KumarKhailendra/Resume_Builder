import React from "react";
import styles from "./Template4.module.css";
import html2pdf from "html2pdf.js";

const Template4 = ({ data }) => {
  const downloadPDF = () => {
    const element = document.getElementsByClassName(styles.resume)[0];
    if (element) {
      const opt = {
        filename: "teaching-resume-1.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };
      html2pdf().from(element).set(opt).save();
    } else {
      console.error("Element not found");
    }
  };

  return (
    <div className={styles.main_content_template}>
      <div className={styles.resume}>
        <header className={styles.header}>
          <div className={styles.header_name}>
            <div className={styles.name} >
              {data.personal?.fullName}
            </div>
            <div className={styles.title} >
              {data.personal?.professionalTitle}
            </div>
          </div>
          <div className={styles.contact_info}>
            <div >Email: {data.personal?.email}</div>
            <div >Phone: {data.personal?.phone}</div>
            <div >Location: {data.personal?.address}</div>
          </div>
        </header>
        <main className={styles.main_content}>
          <section className={styles.about}>
            <h2 className={styles.section_heading}>About Me</h2>
            <p >{data.personal?.profile}</p>
          </section>
          <section className={styles.skills}>
            <h2 className={styles.section_heading}>Skills</h2>
            <ul>
              {data.skills?.map((skill, index) => (
                <li key={index}>{skill.skill}</li>
              ))}
            </ul>
          </section>
          <section className={styles.education}>
            <h2 className={styles.section_heading}>Education</h2>
            <ul >
            {
                data.education?.map((edu, index) =>{
                    <li key={index}>{edu.degree}, {edu.college}, {edu.startDate} - {edu.endDate}</li>
                })
            }
            </ul>
          </section>
          <section className={styles.experience}>
            <h2 className={styles.section_heading}>Experience</h2>
            <ul >
            {
                data.experience?.map((exp, index) =>{
                    <li key={index}>{exp.designation}, {exp.companyName}, {exp.startDate} - {exp.endDate}</li>
                })
            }
            </ul>
          </section>
        </main>
      </div>
      <div className={styles.download_section}>
        <button className={styles.downloadpdf_btn} onClick={downloadPDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Template4;
