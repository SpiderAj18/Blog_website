import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from "../redux/theme/themeSlice.js";


function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector((state) => state.theme);

  
  return (
    <Navbar fluid className="bg-zinc-800 text-white border-b-2">
      <Link to="/" className="logo self-center whitespace-nowrap font-semibold">
        <span className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-700 rounded-md px-2 py-1">
          Spider's
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          name="search"
          placeholder="search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-9 lg:hidden " color="gray" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2 md:order-2 items-center">
        <Button
          className="w-12 h-9 hidden sm:inline"
          outline
          gradientDuoTone="purpleToBlue"
          pill
          onClick={()=>dispatch(toggleTheme())}
        >
          { theme === 'dark' ? <FaSun/> : <FaMoon /> }
        </Button>
        {/* checking user is logedin or not */}
       
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            pill
            label={
              <Avatar
                alt="user"
                size="sm"
                img={currentUser.profilePicture}
                rounded
                className="rounded-full"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block truncate text-sm font-medium">{currentUser.email}</span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to={"/Dashboard?tab=profile"}>Profile</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/settings">Settings</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Link to="/signout">Sign out</Link>
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button outline gradientDuoTone="purpleToBlue" pill>
              Sign in
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className=" text-white">
        <Navbar.Link href="/" active={path === "/"}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/Dashboard" active={path === "/Dashboard"}>
          Dashboard
        </Navbar.Link>
        <Navbar.Link href="/About" active={path === "/About"}>
          About
        </Navbar.Link>
        <Navbar.Link href="/Projects" active={path === "/Projects"}>
          Projects
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
 