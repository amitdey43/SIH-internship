"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../component/ui/resizable-navbar";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // fetch token + role
  useEffect(() => {
    axios
      .get("http://localhost:8000/app/mentor/check", { withCredentials: true })
      .then((res) => {
        setToken(res.data?.token || "");
        setRole(res.data?.role || "");
      })
      .catch((err) => console.error(err));
  }, []);

  // links for navbar
  const navItems = [
    { name: "Features", link: "#features" },
    { name: "AI Generator", link: "#generator" },
    { name: "Pricing", link: "#pricing" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} className="text-black"/>

          <div className="flex items-center gap-4 text-black">
            {token === "" ? (
              <NavbarButton
                variant="primary"
                onClick={() => navigate("/login")}
              >
                Sign Up
              </NavbarButton>
            ) : (
              <> 
                <NavbarButton
                  variant="secondary"
                  onClick={() =>
                    navigate(
                      `/${
                        role === "Student"
                          ? "user"
                          : role.toLowerCase()
                      }/dashboard`
                    )
                  }
                >
                  Dashboard
                </NavbarButton>
                <NavbarButton
                  variant="primary"
                  onClick={() => navigate("/internships")}
                >
                  Internships
                </NavbarButton>
              </>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}

            <div className="flex w-full flex-col gap-4">
              {token === "" ? (
                <NavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/login");
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Sign Up
                </NavbarButton>
              ) : (
                <>
                  <NavbarButton
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate(
                        `/${
                          role === "Student"
                            ? "user"
                            : role.toLowerCase()
                        }/dashboard`
                      );
                    }}
                    variant="secondary"
                    className="w-full"
                  >
                    Dashboard
                  </NavbarButton>
                  <NavbarButton
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/internships");
                    }}
                    variant="primary"
                    className="w-full"
                  >
                    Internships
                  </NavbarButton>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default Header;
 