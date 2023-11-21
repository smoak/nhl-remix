import { Tab } from "@headlessui/react";
import { Conference } from "../Conference";

const tabClasses =
  "my-2 border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 text-lg font-medium leading-tight hover:border-transparent hover:bg-nhl-gray-100 focus:border-transparent ui-selected:bg-black ui-selected:text-white";

export const StandingsTabs = () => {
  return (
    <Tab.Group>
      <Tab.List>
        <Tab className={tabClasses}>Conference</Tab>
      </Tab.List>
      <Tab.Panels className="py-3">
        <Tab.Panel id="conference">
          <Conference />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
