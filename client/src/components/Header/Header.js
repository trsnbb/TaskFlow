import "./style_header.css"

import search from "./../../img/icons/header/search.svg"
import notification from "./../../img/icons/header/notification.svg"
import calendary from "./../../img/icons/header/calendary.svg"
import logo from "./../../img/logo.svg"
import profile_photo from "./../../img/icons/header/profile_photo.svg"


const Header = () => {
    return ( 
        <>
            <div className="container_header">
                <div className="flex center_item header_navbar">
                    <div className="logo_block">
                        <img src={logo} alt="logo TaskFlow" className="logo_img"/>
                        <h1 className="logo_title">TaskFlow</h1>
                    </div>
                    <div className="header_wrapper_left">
                        <div className="search flex">
                                <img src={search} alt="icon search" className="search_icon"/>
                                <p className="search_title">Пошук...</p>
                        </div>

                        {/* <Button/> */}

                        {/* <div className="flex center_item g-16">
                                <div className="notification">
                                    <img src={notification} />
                            </div>

                                <div className="calendary">
                                    <img src={calendary} />
                                </div>

                                <div className="account center_item flex">
                                    <img src={profile_photo} alt="profile photo" className="account_photo" />
                                    <div className="account-text">
                                        <p className="account_title">Кошеня</p>
                                        <p className="account_position">Проєкт - менеджер</p>
                                    </div>
                                    <span class="circle-arrow"></span>
                                </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Header;