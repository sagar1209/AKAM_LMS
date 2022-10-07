import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Profile",
      path: "/User-profile",
      icon: "ri-home-line",
    },
    {
      name: "Apply Leave",
      path: "/book-appointment/633fbb47e1977d174f8b19c1",
      icon: "ri-hospital-line",
    },
    {
      name: "Applied Leaves",
      path: "/appointments",
      icon: "ri-file-list-line",
    }
    
  ];

  const doctorMenu = [
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
    {
      name: "Employee's List",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
    {
      name: "Employee's leave",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Leave",
      path: "/doctor-book-appointment/633fbb47e1977d174f8b19c1",
      icon: "ri-hospital-line",
    },
    {
      name: "Applied Leaves",
      path: "/appointments",
      icon: "ri-file-list-line",
    }
  ];

  const adminMenu = [
    {
      name: "Profile",
      path: "/admin/profile",
      icon: "ri-user-line",
    },
    {
      name: "Managers List",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Manager",
      path: "/admin/doctorslist",
      icon: "ri-user-star-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Manager" : "employee";
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">LMS</h1>
            <h1 className="role">{role}</h1>
          </div>

          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item `}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            <div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>

              {/* <Link className="anchor mx-2" to="/profile"> */}
                {user?.name}
              {/* </Link> */}
            </div>
          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
