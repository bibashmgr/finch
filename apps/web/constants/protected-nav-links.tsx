import {
  ArrowRightLeftIcon,
  ChartPieIcon,
  HomeIcon,
  PlusIcon,
  UserIcon,
  type LucideIcon,
} from "lucide-react";

type ProtectedNavLink = {
  title: string;
  icon: LucideIcon;
  href: string;
  isHighlighted: boolean;
};

const protectedNavLinks: ProtectedNavLink[] = [
  {
    title: "Home",
    icon: HomeIcon,
    href: "/dashboard",
    isHighlighted: false,
  },
  {
    title: "Transactions",
    icon: ArrowRightLeftIcon,
    href: "/transactions",
    isHighlighted: false,
  },
  {
    title: "Add Transaction",
    icon: PlusIcon,
    href: "/transactions/create",
    isHighlighted: true,
  },
  {
    title: "Budgets",
    icon: ChartPieIcon,
    href: "/budgets",
    isHighlighted: false,
  },
  {
    title: "Profile",
    icon: UserIcon,
    href: "/profile",
    isHighlighted: false,
  },
];

export { protectedNavLinks };
