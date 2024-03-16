import React, { useEffect } from "react";
import "./ImageSlider.scss";

const ArtSlider: React.FC = () => {
  const handleNavigation = (direction: "next" | "prev") => {
    const slider = document.querySelector(".art-slider .slider");
    const items = document.querySelectorAll(".art-slider .item");

    if (slider) {
      if (direction === "next" && items.length > 0) {
        slider.append(items[0]);
      } else if (direction === "prev" && items.length > 0) {
        slider.prepend(items[items.length - 1]);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNavigation("next");
    }, 3000); // Adjust the interval duration (in milliseconds) as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="art-slider">
      <ul className="slider">
        <li
          className="item"
          style={{
            backgroundImage:
              "url('https://kriptomat.io/wp-content/uploads/2021/12/what-is-blockchain-oracle-1180x500.png')",
          }}
        >
          <div className="content">
            <h2 className="title">
              "Welcome to Our E-Portfolio Blockchain System{" "}
            </h2>
            <p className="description">
              Empowering individuals and institutions with a secure and
              efficient e-portfolio experience.
            </p>
          </div>
        </li>
        {/* Repeat for other items */}
        <li
          className="item"
          style={{
            backgroundImage:
              "url('https://cdn.route-fifty.com/media/img/cd/2023/06/06/06062023_chare_blockchain/860x394.jpg')",
          }}
        >
          <div className="content">
            <h2 className="title">"Certificate Verification</h2>
            <p className="description">
              Step into the future with our E-Portfolio Blockchain System,
              redefining certificate originality and security. Leveraging
              advanced blockchain technology, our platform ensures each
              certificate is unalterably recorded, providing a transparent and
              tamper-proof verification process.
            </p>
          </div>
        </li>
        <li
          className="item"
          style={{
            backgroundImage:
              "url('https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-blue-blockchain-bitcoin-technology-banner-image_196339.jpg')",
          }}
        >
          <div className="content">
            <h2 className="title">
              "Revolutionizing E-Portfolios with Blockchain Technology
            </h2>
            <p className="description">
              Welcome to our state-of-the-art E-Portfolio Blockchain System,
              where the convergence of cutting-edge blockchain technology sets a
              new standard for security and trust in the realm of academic and
              professional certifications. Discover how our advanced system
              stands out
            </p>
          </div>
        </li>

        {/* Add more items as needed */}
      </ul>
    </main>
  );
};

export default ArtSlider;
