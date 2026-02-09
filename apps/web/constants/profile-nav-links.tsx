import {
  EditIcon,
  LogOutIcon,
  SettingsIcon,
  type LucideIcon,
} from "lucide-react";

type ProfileNavLink = {
  title: string;
  href?: string;
  icon: LucideIcon;
};

const profileNavLinks: ProfileNavLink[] = [
  {
    title: "Edit Profile",
    href: "/profile/edit",
    icon: EditIcon,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
  {
    title: "Logout",
    icon: LogOutIcon,
  },
];

export { profileNavLinks };
