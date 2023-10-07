import React from "react";
import "./styles/Landing.css";
import ContentBox from "./ContentBox";

function Landing() {
  return (
    <>
      <div style={{ marginTop: "15px" }}>
        <h2>Connect with your 1:1 Tutor Now Free!!</h2>
        <div className="content">
          <div className="title">
            <b>Why Choose us?</b>
          </div>
          <div className="impcontent">
            <div className="Box-row">
              <ContentBox
                className="Box"
                title="Verified Well-Trained Tutors"
                description="Our platform connects you with verified, well-trained tutors who are passionate about helping you improve your English communication skills"
              />
              <ContentBox
                className="Box"
                title="A Non-Judgmental Environment"
                description="We understand that learning a new language can be challenging, and that's why our tutors create a supportive and non-judgmental learning environment."
              />
              <ContentBox
                className="Box"
                title="Guidance Every Step of the Way"
                description="Even if you're unsure about what to talk about, our tutors take the responsibility of finding engaging topics for your conversations."
              />
              <ContentBox
                className="Box"
                title="Enhance Your Communication Skills"
                description="Whether you're a beginner or looking to refine your skills, our platform is here to assist you in your journey towards enhanced communication abilities."
              />
            </div>
            <div className="Box-row">
              <ContentBox
                className="Box"
                title="Connect with Experts"
                description="Engage with professionals from diverse fields—Science, Commerce, Engineering—to broaden your knowledge and network effectively."
              />
              <ContentBox
                className="Box"
                title="Your Privacy Matters"
                description="We prioritize your privacy and data security. Our platform is built with robust privacy measures, ensuring that your personal information and communication data are kept confidential."
              />
              <ContentBox
                className="Box"
                title="Dedicated Support"
                description="we provide dedicated support to assist you every step of the way. Whether you have questions, encounter technical issues, or need guidance, our responsive customer support team is here to help."
              />
              <ContentBox
                className="Box"
                title="Polite and Casual Environment"
                description="We believe that the best learning happens in a relaxed and friendly atmosphere. You can converse naturally without fear of judgment. Our tutors are here to encourage and support you, making every interaction a positive and enriching experience."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
