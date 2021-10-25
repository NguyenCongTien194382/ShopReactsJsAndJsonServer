import React from "react";

function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer-address">
          <p className="footer-address-1">
            <i class="fas fa-location-arrow"></i> 351 Lac Long Quan,{" "}
            <span>Phuong 5, Quan 11, TpHCM</span>
          </p>
          <p className="footer-address-phone">
            <i class="fas fa-phone-volume"></i> +1 5555 98724
          </p>
          <p className="footer-address-email">
            <i class="far fa-envelope-open"></i> an567008@gmail.com
          </p>
        </div>
        <div className="footer-we">
          <h2 className="footer-we-title">About the MyShop</h2>
          <p className="footer-we-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </p>
          <div className="footer-we-social">
            <a href="https://www.facebook.com/an70008/">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCJeY2ZgtRzY3NSiLZYu9ddg">
              <i class="fab fa-youtube"></i>
            </a>
            <a>
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/an678-mhg">
              <i class="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
