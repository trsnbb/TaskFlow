import React, { useState, useEffect } from "react";
import "./style_header.css";

import search from "./../../img/icons/header/search.svg";
import notification from "./../../img/icons/header/notification.svg";
import calendary from "./../../img/icons/header/calendary.svg";
import logo from "./../../img/logo.svg";
import axios from "./../../axios";

import Button from "../Modal/Button";
import { useAuth } from "../../AuthContext";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (user && user.avatarUrl) {
      setAvatarUrl(
        `${axios.defaults.baseURL}${user.avatarUrl}?t=${new Date().getTime()}`
      );
    }
  }, [user]); 

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleDropdown = () => {
    if (isDropdownVisible) {
      setIsAnimating(true);
      setTimeout(() => {
        setDropdownVisible(false);
        setIsAnimating(false);
      }, 400); 
    } else {
      setDropdownVisible(true);
    }
  };

  return (
    <div className='container_header'>
      <div className='flex center_item header_navbar'>
        <div className='logo_block'>
          <img src={logo} alt='logo TaskFlow' className='logo_img' />
          <h1 className='logo_title'>TaskFlow</h1>
        </div>
        <div className='header_wrapper_left'>
          <div className='search flex'>
            <img src={search} alt='icon search' className='search_icon' />
            <p className='search_title'>Пошук...</p>
          </div>

          {!isAuthenticated && <Button />}

          {isAuthenticated && (
            <div className='flex center_item g-16'>
              <div className='notification'>
                <img src={notification} alt='notification icon' />
              </div>
              <div className='calendary'>
                <img src={calendary} alt='calendary icon' />
              </div>
              <div className='account center_item flex'>
                <div className='avatar_profile'>
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt='Avatar'
                      className='account_photo'
                    />
                  ) : (
                    <div className='account_placeholder'></div>
                  )}
                </div>
                <p className='account_title'>{user?.fullName}</p>
                <span
                  onClick={toggleDropdown}
                  className={`circle-arrow ${
                    isDropdownVisible ? "rotate" : ""
                  }`}
                ></span>
              </div>

              {(isDropdownVisible || isAnimating) && (
                <button
                  className={`dropdown-content ${
                    isDropdownVisible && !isAnimating ? "slidedown" : "slideup"
                  }`}
                  onClick={logout}
                >
                  Вийти
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
