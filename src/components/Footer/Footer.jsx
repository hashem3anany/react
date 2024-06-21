import "./Footer.css";
import logo from "../../images/footerLogo.png";
import qrcode from "../../images/Qrcode.png"
import play from '../../images/storelogo.png'
import apple from '../../images/appstore.png'
export default function Footer() {
  return (
    <div className="footer text-white overflow-auto">
      <div className="container p-5">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-2">
            <div className="item">
              <img src={logo} alt="medico logo" />
            </div>
          </div>
          <div className="col-4">
            <div className="item">
                <h3>Support</h3>
                <div className="support d-flex flex-nowrap">
                    <p className="w-50 ">111 Bijoy sarani, Dhaka,<br/> DH 1515, Bangladesh.</p>
                    <p className="w-50 px-2">Medico@gmail.com <br/>+88015-88888-9999</p>
                </div>
            </div>
          </div>
          <div className="col-4">
            <div className="item d-flex">
                <div className="col-2">
                    <div className="icons mt-2">
                    <ul>
                        <li className="mb-2"><i className="fa-brands fa-sm fa-facebook-f"></i></li>
                        <li className="mb-2"><i className="fa-brands fa-sm fa-instagram"></i></li>
                        <li className="mb-2"><i className="fa-brands fa-sm fa-twitter"></i></li>
                        <li className=""><i className="fa-brands fa-sm fa-linkedin-in"></i></li>
                    </ul>
                    </div>
                </div>
                <div className="col-10 mt-2">
                    <div className="apps">
                        <h3>Download App</h3>
                        <div className="code d-flex">
                            <div className="left">
                                <div>
                                    <img src={qrcode} alt="Qrcode"/>
                                </div>
                            </div>
                            <div className="right ms-3">
                                <div className="w-100">
                                    <img src={play} alt="Qrcode"/>
                                </div>
                                <div className="w-100 mt-3">
                                    <img src={apple} alt="Qrcode"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center mb-3">&copy; Copyright Rimel 2022. All right reserved</p>
    </div>
  );
}
