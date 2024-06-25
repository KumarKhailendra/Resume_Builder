"use client"
import React from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { TbTemplate } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";
import { IoNewspaper } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";
import { RiServiceFill } from "react-icons/ri";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
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
          <MenuItem icon={<CgProfile  />} onClick={()=> router.push('/profile')}> Profile</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ width: "100%" }}>{children}</main>
    </div>
  );
};

export default SideBar;
