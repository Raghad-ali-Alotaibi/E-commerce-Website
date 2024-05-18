import { Link } from "react-router-dom"
import { AiFillTwitterCircle, AiFillInstagram, AiFillYoutube } from "react-icons/ai"
import { MdFacebook } from "react-icons/md"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div>
          <h3 className="footer__title">Shop Categories</h3>
          <ul>
            <li>
              <Link to="#" className="footer__list">
                Phones
              </Link>
            </li>
            <li>
              <Link to="#" className="footer__list">
                Laptops
              </Link>
            </li>
            <li>
              <Link to="#" className="footer__list">
                Watches
              </Link>
            </li>
            <li>
              <Link to="#" className="footer__list">
                TVs
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="footer__title">Customer Service</h3>
          <ul>
            <li>
              <Link to="#" className="footer__list">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="footer__list">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="footer__list">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link to="#" className="footer__list">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer__about">
          <h3 className="footer__title">About Us</h3>
          <p className="about__description">
            At our electronics store, we are dedicated to providing the latest and greatest devices
            and accessories to our customers. With a wide selection of phones, TVs, laptops,
            watches, and accessories.
          </p>
          <p>© {new Date().getFullYear()} Tech Hive. All rights reserved.</p>
        </div>
        <div>
          <h3 className="footer__title">Follow Us</h3>
          <div className="icon">
            <a
              href="https://twitter.com"
              className="footer__active"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillTwitterCircle size={30} />
            </a>
            <a
              href="https://www.instagram.com"
              className="footer__active"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillInstagram size={30} />
            </a>
            <a
              href="https://www.facebook.com"
              className="footer__active"
              target="_blank"
              rel="noreferrer"
            >
              <MdFacebook size={30} />
            </a>
            <a
              href="https://www.youtube.com"
              className="footer__active"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillYoutube size={30} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
