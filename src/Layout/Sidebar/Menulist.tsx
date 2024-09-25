import React, { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { Link, useLocation } from "react-router-dom";
import { MenuListType, SidebarItemTypes } from "../../Types/Layout/SidebarType";
import { handlePined } from "../../ReduxToolkit/Reducers/LayoutSlice";
import { LI, SVG, UL } from "../../AbstractElements";
import { Href } from "../../utils/Constant";
import { useTranslation } from "react-i18next";

const Menulist: React.FC<MenuListType> = ({ menu, setActiveMenu, activeMenu, level, className }) => {
  const { pinedMenu } = useAppSelector((state) => state.layout);
  const { sidebarIconType } = useAppSelector((state) => state.themeCustomizer);
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isActiveNavLink = useCallback((path?: string): boolean => {
    return location.pathname === path;
  }, [location.pathname]);

  const shouldSetActive = useCallback(({ item }: SidebarItemTypes): boolean => {
    if (item?.path === location.pathname) return true;
    if (item?.children) {
      return item.children.some(subItem => shouldSetActive({ item: subItem }));
    }
    return false;
  }, [location.pathname]);

  const handleClick = useCallback((item: string) => {
    setActiveMenu((prev: any) => {
      const temp = [...prev];
      temp[level] = item !== temp[level] ? item : "";
      return temp;
    });
  }, [level, setActiveMenu]);

  useEffect(() => {
    menu?.forEach((item: any) => {
      if (shouldSetActive({ item })) {
        setActiveMenu((prev: any) => {
          const temp = [...prev];
          temp[level] = item.title;
          return temp;
        });
      }
    });
  }, [menu, shouldSetActive, level, setActiveMenu]);

  const renderMenuItem = (item: any, index: number) => {
    const isActive = item.children
      ? item.children.some((innerItem: any) => isActiveNavLink(innerItem.path))
      : isActiveNavLink(item.path);
    const isOpen = activeMenu[level] === item.title;

    return (
      <LI
        key={index}
        className={`
          ${level === 0 ? "sidebar-list" : ""}
          ${pinedMenu.includes(item.title || "") ? "pined" : ""}
          ${isActive || isOpen ? "active" : ""}
        `}
      >
        <Link
          className={`
            ${!className && level !== 2 ? "sidebar-link sidebar-title" : ""}
            ${isActive || isOpen ? "active" : ""}
          `}
          to={item.path || Href}
          onClick={() => handleClick(item.title)}
        >
          {item.icon && (
            <SVG className={`${sidebarIconType}-icon`} iconId={`${sidebarIconType}-${item.icon}`} />
          )}
          <span className={item.lanClass}>{t(item.title)}</span>
          {item.children && (
            <div className="according-menu">
              <i className={`fa fa-angle-${isOpen ? 'down' : 'right'}`} />
            </div>
          )}
        </Link>
        {item.children && (
          <UL
            className={`simple-list ${
              level !== 0 ? "nav-sub-childmenu submenu-content" : "sidebar-submenu"
            }`}
            style={{ display: isActive || isOpen ? "block" : "none" }}
          >
            <Menulist
              menu={item.children}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              level={level + 1}
              className="sidebar-submenu"
            />
          </UL>
        )}
      </LI>
    );
  };

  return <>{menu?.map(renderMenuItem)}</>;
};

export default React.memo(Menulist);