import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Template3.css';
import html2pdf from 'html2pdf.js';
import { Avatar } from '@mui/material';
import { stringAvatar } from '@/utils/createAvatar';

const Template3 = ({ data }) => {

    const downloadPDF = () => {
        const element = document.getElementsByClassName('main-content');
        const opt = {
            filename: 'Non-technical-resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    };

    return (
        <>
            <div className='template-3-main-wrapper'>
                <main className="main-content">
                    <section className="left-section">
                        <div className="left-content">
                            <div className="profile-details">
                                <div className="profile-image">
                                    <Avatar {...stringAvatar(data.personal?.fullName)} alt="Profile" sx={{width: "100%", height: "100%", objectFit: "fill"}}  />
                                </div>
                                <div className="name">{data.personal?.fullName}</div>
                                <div className="description">{data.personal?.professionalTitle}</div>
                                <hr style={{ width: '80%', textAlign: 'middle', marginLeft: 0 }} />
                            </div><br />
                            <div className="contact-info">
                                <div className="contact-item">
                                    <div className="personal-details">
                                        <div className="email"><FaEnvelope />&nbsp; &nbsp;{data.personal?.email}</div><br />
                                        <div className="mobile"><FaPhone /> &nbsp;{data.personal?.phone}</div><br />
                                        <div className="location"><FaMapMarkerAlt /> &nbsp;{data.personal?.address}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="skills">
                                <h6 className="right-title">SKILLS</h6>
                                {
                                    data.skills?.map((skill, index) => (
                                        <div className="skill-item" key={index}>
                                            <div className="skill-name">
                                                <p>{skill.skill}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <section className="projects">
                                <h6 className="right-title" >Projects</h6>
                                {
                                    data.projects?.map((project, index) => (
                                        <p className="para" key={index} >
                                            <h6>{project.projectTitle}</h6>{project.description}
                                        </p>
                                    ))
                                }
                            </section>
                        </div>
                    </section>
                    <section className="right-section">
                        <div className="right-main-content">
                            <section className="about sect">
                                <h2 className="right-title" >About Me</h2>
                                <ul className="about_me" >
                                    {data.personal?.profile}
                                </ul>
                            </section><br />
                            <section className="education sect">
                                <h2 className="right-title" >Education</h2>
                                <table >
                                    <thead>
                                        <tr>
                                            <th>Degree</th>
                                            <th>Year</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.education?.map((edu, index) => (
                                            <tr key={index}>
                                                <td >
                                                    {edu.degree}
                                                </td>
                                                <td >
                                                    {edu.endDate}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section><br />
                            <section className="experience sect">
                                <h2 className="right-title" >Experience</h2>
                                {
                                    data.experience?.map((exp, index) => (
                                        <p className="para" key={index} >
                                            <h6>{exp.companyName}</h6>{exp.workDescription}
                                        </p>
                                    ))
                                }
                            </section>
                        </div>
                    </section>
                </main>
                <div className='download-section'>
                    <button className='downloadpdf-btn' onClick={downloadPDF}>Download PDF</button>
                </div>
            </div>
        </>
    );
};

export default Template3;