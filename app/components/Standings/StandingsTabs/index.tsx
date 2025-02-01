import { Tab } from "@headlessui/react";
import { Conference } from "../Conference";
import { Division } from "../Division";
import { WildCard } from "../WildCard";
import { League } from "../League";

const tabClasses =
  "my-2 border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 text-lg font-medium leading-tight hover:border-transparent hover:bg-nhl-gray-600 hover:text-black focus:border-transparent ui-selected:bg-black ui-selected:text-white";

export const StandingsTabs = () => {
  return (
    <Tab.Group>
      <Tab.List>
        <Tab className={tabClasses}>Division</Tab>
        <Tab className={tabClasses}>Conference</Tab>
        <Tab className={tabClasses}>Wild Card</Tab>
        <Tab className={tabClasses}>League</Tab>
      </Tab.List>
      <Tab.Panels className="py-3">
        <Tab.Panel id="division">
          <Division />
        </Tab.Panel>
        <Tab.Panel id="conference">
          <Conference />
        </Tab.Panel>
        <Tab.Panel id="wild-card">
          <WildCard />
        </Tab.Panel>
        <Tab.Panel id="league">
          <League />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
