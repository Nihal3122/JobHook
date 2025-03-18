import { Burger, Button, Drawer } from "@mantine/core";
import { IconBriefcase, IconX } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import NotiMenu from "./NotiMenu";
import { useDisclosure } from "@mantine/hooks";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state:any) => state.user);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (!user?.id) {
      console.warn("User ID is missing, skipping profile fetch.");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await getProfile(user.id);
        dispatch(setProfile(response));
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [dispatch, user?.id]);

  return (
    location.pathname !== "/sign-up" &&
    location.pathname !== "/login" && (
      <header className="w-full bg-[#2d2d2d] h-20 px-6 flex text-white justify-between items-center">
        {/* Logo */}
        <Link to={"/"} className="flex gap-3 items-center text-[#ffbd20]">
          <IconBriefcase className="h-10 w-10" stroke={2} />
          <div className="text-2xl sm:text-3xl font-medium">JobHook</div>
        </Link>

        {/* Navigation (Hidden on mobile) */}
        <nav className="hidden md:flex">
          <NavLinks />
        </nav>

        {/* Right Section */}
        <div className="flex gap-4 items-center">
          {user ? (
            <ProfileMenu />
          ) : (
            <Link to={"/login"}>
              <Button variant="subtle" color="brightSun.4">
                Login
              </Button>
            </Link>
          )}
          {user && <NotiMenu />}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Burger
              opened={opened}
              onClick={open}
              aria-label="Toggle navigation"
            />
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <Drawer
          opened={opened}
          onClose={close}
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          position="right"
          size={"xs"}
          closeButtonProps={{ icon: <IconX size={30} /> }}
        >
          <div className="flex flex-col gap-4 font-normal items-center text-lg">
            <NavLinks />
          </div>
        </Drawer>
      </header>
    )
  );
};

export default Header;
