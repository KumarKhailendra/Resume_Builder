import React, { useState } from 'react';
import './Template5.css';
import html2pdf from 'html2pdf.js';
import { Avatar } from '@mui/material';
import { stringAvatar } from '@/utils/createAvatar';

const Template5 = ({data}) => {

    const downloadPDF = () => {
        const element = document.getElementsByClassName('template-3-resume-container')[0];
        const opt = {
            filename: 'Resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    };

    return (
        <div className="template-3-main-wrapper">
            <div className="template-3-resume-container">
                <div className="template-3-left-column">
                    <div className="template-3-profile-image" onClick={() => document.getElementById('profilePhotoInput').click()}>
                        <Avatar {...stringAvatar(data.personal?.fullName? data.personal?.fullName : "Unknown Persone")} alt="Profile" sx={{width: "120px", height: "120px", borderRadius: "50%"}}  />
                    </div>
                    <div className="template-3-section">
                        <h3>Contact</h3>
                        <p >{data.personal?.phone}</p>
                        <p >{data.personal?.email}</p>
                        <p >{data.personal?.address}</p>
                    </div>
                    <div className="template-3-section">
                        <h3>Career Objective</h3>
                        <p >{data.personal?.profile}</p>
                    </div>
                    <div className="template-3-section">
                        <h3>Languages</h3>
                        {data.languages?.map((language, index) => (
                            <li key={index}>{language.language}</li>
                        ))}
                    </div>
                    <div className="template-3-section">
                        <h3>Skills</h3>
                        <ul>
                        {data.skills?.map((skill, index) => (
                            <li key={index}>{skill.skill}</li>
                        ))}
                        </ul>
                    </div>
                    <div className="template-3-section">
                        <h3>Interests</h3>
                        <ul>
                        {data.interests?.map((interest, index) => (
                            <li key={index}>{interest.interest}</li>
                        ))}
                        </ul>
                    </div>
                </div>
                <div className="template-3-right-column">
                    <h2 >{data.personal?.fullName}</h2>
                    <p className="template-3-job-title" >{data.personal?.professionalTitle}</p>
                    <div className="template-3-section">
                        <h3 className='template-3-right-column-heading'>Education</h3>
                        {
                            data.education?.map((edu, index) =>{
                                <div key={index}>
                                    <h4>{edu.degree}</h4>
                                    <p >{edu.college} | {edu.startDate} - {edu.endDate}</p>
                                    <ul>
                                        <li >{edu.description}</li>
                                    </ul>
                                </div>
                            })
                        }
                    </div>
                    <div className="template-3-section">
                        <h3 className='template-3-right-column-heading'>Professional Experience</h3>
                        {
                            data.experience?.map((exp, index) =>{
                                <div key={index}>
                                    <h4>{exp.designation}</h4>
                                    <p >{exp.companyName} | {exp.startDate} - {exp.endDate}</p>
                                    <ul>
                                        <li >{exp.workDescription}</li>
                                    </ul>
                                </div>
                            })
                        }
                    </div>
                    <div className="template-3-section">
                        <h3 className='template-3-right-column-heading'>Volunteer</h3>
                        {
                            data.volunteers?.map((vol, index) =>{
                                <div key={index}>
                                    <h4>{vol.designation}</h4>
                                    <p >{vol.companyName} | {exp.startDate} - {exp.endDate}</p>
                                    <ul>
                                        <li >{vol.workDescription}</li>
                                    </ul>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='download-section'>
                <button className='downloadpdf-btn' onClick={downloadPDF}>Download PDF</button>
            </div>
        </div>
    );
};

export default Template5;