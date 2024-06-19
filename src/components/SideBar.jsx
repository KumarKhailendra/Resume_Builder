"use client"
import React from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { TbTemplate } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";
import { FaDemocrat } from "react-icons/fa6";
import { IoNewspaper } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";
import { RiServiceFill } from "react-icons/ri";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { useRouter } from "next/navigation";

const SideBar = ({ children }) => {
    const [collapsed, setCollapsed] = React.useState(false);
    const router = useRouter();
  return (
    <div style={{ display: "flex", height: "100vh", minHeight: "400px" }}>
      <Sidebar collapsed={collapsed} roostyle={{height: "100vh", minHeight: "400px" }}>
        <Menu>
          <MenuItem onClick={() => setCollapsed(!collapsed)} icon={collapsed? <TbLayoutSidebarRightCollapseFilled  /> : <TbLayoutSidebarLeftCollapseFilled />}> collapse</MenuItem>
          <MenuItem icon={<IoMdHome  />} onClick={()=> router.push('/')}> Home</MenuItem>
          <MenuItem icon={<TbTemplate  />} > Templates</MenuItem>
          <MenuItem icon={<RiServiceFill  />}> Examples</MenuItem>
          <MenuItem icon={<IoNewspaper  />} onClick={()=> router.push('/resumes')}> Resume Builder</MenuItem>
          <MenuItem icon={<FcAbout  />}> About</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ padding: 10, width: "100%" }}>{children}</main>
    </div>
  );
};

export default SideBar;
