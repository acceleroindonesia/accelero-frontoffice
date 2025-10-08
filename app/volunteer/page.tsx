"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Master from "@components/Layout/Master";

const VolunteerPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interests: [] as string[],
    availability: "",
    experience: "",
    motivation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const volunteerAreas = [
    "Education & Tutoring",
    "Healthcare & Medical",
    "Environmental Conservation",
    "Community Development",
    "Technology & Digital Skills",
    "Arts & Culture",
    "Animal Welfare",
    "Disaster Relief",
  ];

  const availabilityOptions = ["Weekdays", "Weekends", "Evenings", "Flexible"];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleInterest = (area: string) => {
    setFormData((prev) => {
      const isSelected = prev.interests.includes(area);
      return {
        ...prev,
        interests: isSelected
          ? prev.interests.filter((item) => item !== area)
          : [...prev.interests, area],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Thank you for your interest! We will contact you soon.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          interests: [],
          availability: "",
          experience: "",
          motivation: "",
        });
        setTimeout(() => router.push("/home"), 3000);
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to submit. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Master>
      <div className="volunteer-page">
        <section className="volunteer-hero">
          <div className="container">
            <h1>Become a Volunteer</h1>
            <p>
              Make a difference in your community. Join our team of dedicated
              volunteers and help create positive change.
            </p>
          </div>
        </section>

        <section className="volunteer-content">
          <div className="container">
            <div className="volunteer-grid">
              <div className="volunteer-info">
                <h2>Why Volunteer?</h2>
                <div className="benefits">
                  <div className="benefit-item">
                    <div className="benefit-icon">🤝</div>
                    <h3>Make an Impact</h3>
                    <p>
                      Directly contribute to meaningful projects that change
                      lives
                    </p>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">🌱</div>
                    <h3>Learn & Grow</h3>
                    <p>Develop new skills and gain valuable experience</p>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">👥</div>
                    <h3>Connect</h3>
                    <p>
                      Meet like-minded people and build lasting relationships
                    </p>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">💪</div>
                    <h3>Empower</h3>
                    <p>
                      Help empower communities to reach their full potential
                    </p>
                  </div>
                </div>
              </div>

              <div className="volunteer-form-wrapper">
                <h2>Volunteer Application</h2>
                {message && (
                  <div
                    className={`message ${
                      message.includes("Thank you") ? "success" : "error"
                    }`}
                  >
                    {message}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="volunteer-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">
                        Email <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Areas of Interest <span className="required">*</span>
                    </label>
                    <div className="checkbox-group">
                      {volunteerAreas.map((area) => {
                        const isChecked = formData.interests.includes(area);
                        return (
                          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                          <div
                            key={area}
                            className={`checkbox-label ${isChecked ? "checked" : ""}`}
                            onClick={() => toggleInterest(area)}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <span>{area}</span>
                          </div>
                        );
                      })}
                    </div>
                    {formData.interests.length === 0 && (
                      <small className="form-hint">
                        Please select at least one area of interest
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="availability">
                      Availability <span className="required">*</span>
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select your availability</option>
                      {availabilityOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="experience">
                      Relevant Experience (Optional)
                    </label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us about any relevant experience or skills you have..."
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="motivation">
                      Why do you want to volunteer?{" "}
                      <span className="required">*</span>
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      rows={4}
                      required
                      placeholder="Share your motivation for volunteering with us..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting || formData.interests.length === 0}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Master>
  );
}

export default VolunteerPage;
