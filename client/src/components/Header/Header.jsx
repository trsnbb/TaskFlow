import React, { useState, useEffect } from "react";
import "./style_header.css";

import search from "./../../img/icons/header/search.svg";
import logo from "./../../img/logo.svg";

import Button from "../Authorization/Button";

const Header = () => {
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

          <Button />
        </div>
      </div>
    </div>
  );
};

export default Header;
