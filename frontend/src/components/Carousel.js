import React, { useState, useEffect } from "react";
import "./css/Carousel.css"; // Import the CSS for styling

const Carousel = () => {
  const images = [
    {
      url: "https://www.lifewood.com/public/vector-11@2x.png",
      title: "AI Data Extraction",
      description:
        "Using AI, we optimize the acquisition of images and text from multiple sources through onsite scanning, drone photography, negotiations with archives, and partnerships with corporations, religious organizations, and governments.",
      link: "https://www.lifewood.com/data-extraction.html", // URL for the "Learn More" button
    },
    {
      url: "https://www.lifewood.com/public/vector-31@2x.png",
      title: "Machine Learning Enablement",
      description:
        "From simple data to deep learning, our flexible data solutions enable a wide variety of machine learning systems, regardless of the model's complexity.",
      link: "https://www.lifewood.com/m-l.html", // URL for the "Learn More" button
    },
    {
      url: "https://www.lifewood.com/public/vector-52@2x.png",
      title: "Genealogy",
      description:
        "Powered by AI, Lifewood processes genealogical material rapidly and at scale to preserve and highlight family histories, national archives, corporate records, and registers in any language, era, or condition.",
      link: "https://www.lifewood.com/genealogy.html", // URL for the "Learn More" button
    },
    {
      url: "https://www.lifewood.com/public/vector-71@2x.png",
      title: "Natural Language Processing",
      description:
        "We have partnered with some of the world’s leading NLP development companies and, with a globally distributed workforce, offer solutions in over 50 languages.",
      link: "https://www.lifewood.com/language-processing.html", // URL for the "Learn More" button
    },
    {
      url: "https://www.lifewood.com/public/vector-91@2x.png",
      title: "AI-Enabled Customer Service",
      description:
        "AI-enabled customer service is the fastest and most effective way for institutions to provide personalized, proactive experiences that enhance customer engagement.",
      link: "https://www.lifewood.com/customer-service.html", // URL for the "Learn More" button
    },
    {
      url: "https://www.lifewood.com/public/ai-projects-computer-vision.png",
      title: "Computer Vision",
      description:
        "Training AI to see and understand the world requires a vast amount of high-quality training data. Lifewood offers comprehensive data solutions for CV development, including collection, annotation, classification, and more, for video and image datasets.",
      link: "https://www.lifewood.com/computer-vision.html", // URL for the "Learn More" button
    },
    {
      url: "https://www.lifewood.com/public/vector-13@2x.png",
      title: "Autonomous Driving Technologies",
      description:
        "At Lifewood, innovation propels us forward, particularly in our contributions to the development of Autonomous Driving Technology.",
      link: "https://www.lifewood.com/autonomous-driving.html", // URL for the "Learn More" button
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Auto-next every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3500); // 3500ms = 3.5 seconds
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []); // Empty dependency array to run only once on mount

  // Handle the "Learn More" button click
  const handleLearnMore = (link) => {
    window.open(link, "_blank"); // Open the link in a new tab
  };

  return (
    <div className="carousel-container">
      <div className="carousel-slide-wrapper">
        {/* Map through the images and display the current slide */}
        <div
          className="carousel-slides"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease", // Smooth sliding effect
          }}
        >
          {images.map((image, index) => (
            <div className="carousel-slide" key={index}>
              <img src={image.url} alt={`Slide ${index + 1}`} />
              <div className="carousel-caption">
                <h2>{image.title}</h2>
                <p>{image.description}</p>
                <button
                  className="learn-more"
                  onClick={() => handleLearnMore(image.link)}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
