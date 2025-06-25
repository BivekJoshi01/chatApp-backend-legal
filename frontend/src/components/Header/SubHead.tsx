import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import {
  Drawer,
  DrawerContent,
} from "../ui/drawer";
import { Link } from "react-router";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import LetterHead from "./SubHeadAction/LetterHead";

// Menu config (excluding Letter Head)
const menuItems = [
  { label: "Note", href: "/docs" },
  { label: "Docs", href: "/docs" },
  {
    label: "List",
    links: ["Componentss", "Documentations", "Blockss"],
  },
  {
    label: "Simple",
    links: ["Components", "Documentation", "Blocks"],
  },
];

const SubHead = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <div className="relative z-50 border-b border-stone-200 mb-4">
      <div className="p-1.5">
        <div className="flex justify-between items-center">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {/* Home */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            Beautifully designed components built with Tailwind CSS.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Introduction">
                      Re-usable components built using Radix UI and Tailwind CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem
                      href="/docs/primitives/typography"
                      title="Typography"
                    >
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Render remaining items */}
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  {item.href ? (
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-4">
                          <li>
                            {item.links.map((text) => (
                              <NavigationMenuLink asChild key={text}>
                                <Link
                                  href="#"
                                  className="flex-row items-center gap-2"
                                >
                                  {text}
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}

              {/* Letter Head with Drawer Trigger */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                  onClick={() => setOpenDrawer(true)}
                >
                  <button>Letter Head</button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Icons */}
          <div className="flex gap-3 mr-2.5">
            <IoMdNotificationsOutline size={20} />
            <IoSettingsOutline size={20} />
          </div>
        </div>
      </div>
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent
          className="fixed top-0 left-0 h-screen w-full bg-white"
        >
          <LetterHead />
        </DrawerContent>
      </Drawer>

    </div>
  );
};

export default SubHead;

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props} className="rounded-md hover:bg-accent transition-colors p-2">
      <NavigationMenuLink asChild>
        <Link href={href} className="block space-y-1">
          <div className="text-sm font-medium text-foreground">{title}</div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
