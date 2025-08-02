'use client';

import { useState } from "react";
import Link from "next/link";
import styles from "./menu-list.module.css"; // dùng chung CSS với Navbar

const MenuList = ({ list }) => {
  return (
    <div className={styles.dropdownlist}>
      {list.map((item) => (
        <Dropdown key={item.title} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

const Dropdown = ({ title, content }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div
      className={styles.dropdownItem}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className={styles.button}>{title}</button>

      {isOpen && (
        <div className={styles.dropMenu}>
          <div className={styles.item}>
            {content.map((subItem) => (
              <div key={subItem.title}>
                {subItem.href ? (
                  <Link href={subItem.href}>{subItem.title}</Link>
                ) : (
                  <span style={{ color: "gray", fontStyle: "italic" }}>
                    {subItem.title}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuList;
