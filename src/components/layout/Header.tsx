"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/site";

export function Header() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const current = navigation
        .filter(
          (item) =>
            (document.getElementById(item.id)?.getBoundingClientRect().top ?? Infinity) <= 180,
        )
        .at(-1);
      if (current) setActive(current.id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);
  function close() {
    dialog.current?.close();
    setIsOpen(false);
    opener.current?.focus();
  }
  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner container">
          <a className="wordmark" href="#home" aria-label="Dineth Madhuranga, home">
            dm<span>.</span>
          </a>
          <span className="header-name">
            DINETH
            <br />
            MADHURANGA
          </span>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? "active" : ""}
                aria-current={active === item.id ? "location" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a className="header-cta" href="#contact">
            Let’s talk <ArrowUpRight size={17} />
          </a>
          <button
            className="menu-button"
            ref={opener}
            onClick={() => {
              dialog.current?.showModal();
              setIsOpen(true);
            }}
            aria-label="Open navigation"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <Menu />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="mobile-menu"
        aria-label="Navigation menu"
        className="mobile-menu"
        onCancel={close}
        onClose={() => setIsOpen(false)}
      >
        <div className="mobile-menu-top">
          <a className="wordmark" href="#home" onClick={close}>
            dm<span>.</span>
          </a>
          <button autoFocus onClick={close} aria-label="Close navigation">
            <X />
          </button>
        </div>
        <p className="eyebrow">A LITTLE DIRECTION</p>
        <nav aria-label="Mobile navigation">
          {navigation.map((item, i) => (
            <a key={item.id} href={`#${item.id}`} onClick={close}>
              <span className="mono">0{i + 1}</span>
              {item.label}
              <ArrowUpRight />
            </a>
          ))}
        </nav>
        <p className="mobile-menu-note">
          Thoughtful interfaces.
          <br />
          Dependable engineering.
        </p>
      </dialog>
    </>
  );
}
