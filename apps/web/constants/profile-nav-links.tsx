import {
  EditIcon,
  LogOutIcon,
  SettingsIcon,
  ShapesIcon,
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
    title: "Category",
    href: "/categories",
    icon: ShapesIcon,
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
