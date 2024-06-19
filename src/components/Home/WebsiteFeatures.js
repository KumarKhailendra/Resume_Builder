'use client';
import React from 'react';
import '@/style/WebsiteFeatures.css';

const features = [
  {
    label: "Easy online resume builder",
    text: "Create an awesome resume in minutes, without leaving your web browser.",
    imageClass: "builder"
  },
  {
    label: "Automatic spell-checker",
    text: "Our built-in spell-checker takes care of the grammar for you. Create a resume with zero typos or errors.",
    imageClass: "writing"
  },
  {
    label: "Your data is safe",
    text: "Your data is kept private and protected by strong 256-bit encryption.",
    imageClass: "ok-hand"
  },
  {
    label: "Automatic summary generator",
    text: "Create a powerful resume profile or cover letter in one click. Writer’s block is no longer an obstacle. Try for free!",
    imageClass: "grammar"
  },
  {
    label: "Approved templates",
    text: "Professionally-designed resume templates and examples. Just edit and download in 5 minutes.",
    imageClass: "templates"
  },
  {
    label: "AI pre-written phrases",
    text: "Use the power of AI and data analysis, choose pre-generated effective phrases and keywords.",
    imageClass: "job-tracking"
  },
  {
    label: "Optimized resumes",
    text: "Formats and designs are optimized for resume-filtering algorithms. Ensure humans see your application!",
    imageClass: "security"
  },
  {
    label: "Multi-format resume options",
    text: "Save your perfect resume in any common format, including Microsoft Word and PDF in a single click.",
    imageClass: "word"
  },
  {
    label: "Cover letters",
    text: "Our cover letter builder works with the same ease and use of elegant templates as the resume creator.",
    imageClass: "cover-letter"
  }
];

const WebsiteFeatures = () => {
  return (
    <div className="website-features section">
      <div className="grid-container">
        <h2 className="website-features__title section__title">Features designed to help you win your dream job</h2>
        <div className="website-features__list">
          {features.map((feature, index) => (
            <div className="website-features__item" key={index}>
              <div
                className={`website-features__image website-features__image--${feature.imageClass}`}
                style={{ backgroundImage: `url(/images/features/features_sprite.svg)` }}
              ></div>
              <div className="website-features__item-content">
                <div className="website-features__label">{feature.label}</div>
                <div className="website-features__text">{feature.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebsiteFeatures;
