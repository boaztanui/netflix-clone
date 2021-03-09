import React, {useState, useEffect} from 'react';
import './Nav.css';
import avatar from './avatar.png'

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
         window.addEventListener("scroll", () => {
             if(window.scrollY > 100) {
                handleShow(true);
             }else handleShow(false);
         })
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);
    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo" className="nav__logo"/>

            <img src={avatar} alt="Avator logo" className="nav__avatar"/>
        </div>
    )
}

export default Nav;
