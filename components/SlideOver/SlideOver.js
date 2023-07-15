import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Search from "./../Search/Search";
import NavItem from "../Navigation/NavItem";

export default function SlideOver({ open, Closebtn, overlay, close }) {
  const [isOpen, setIsOpen] = useState(open);
  const router = useRouter();
  const { pathname } = router;

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="absolute inset-0 overflow-hidden "
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {() => overlay()}
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition transform ease-in-out duration-300"
          enterFrom="-translate-x-[90%]"
          enterTo="translate-x-0"
          leave="transition transform ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="absolute inset-y-0 left-0 z-50 w-full max-w-md p-4 bg-black shadow-xl ">
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {() => Closebtn()}
            </Transition.Child>
            <div
              className="z-50 flex flex-col h-full py-6"
              style={{ zIndex: 100 }}
            >
              <div className="relative flex-1 ">
                <Search forSlideOver={true} />
                <NavItem
                  url="/"
                  bg="white"
                  title="صفحه اصلی"
                  active={pathname == "/"}
                  close={(stat) => close(stat)}
                />
                <NavItem
                  url="news"
                  title="خبر ها"
                  bg="white"
                  close={(stat) => close(stat)}
                  active={pathname == "/news"}
                />
                <NavItem
                  url="sports"
                  close={(stat) => close(stat)}
                  title="ورزش"
                  bg="white"
                  active={pathname == "/sports"}
                />
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
