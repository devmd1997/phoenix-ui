import { useState } from "react";
import type { TabItem } from "../components/Tab/Tab";

export function useTabs(tabs: Array<TabItem>, initialActiveTabIndex?: number) {
  const [currentTab, setActiveTab] = useState(
    initialActiveTabIndex ?? getFirstNonDisabledIndex(tabs),
  );

  const navigateToTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return { currentTab, navigateToTab };
}

function getFirstNonDisabledIndex(tabs: TabItem[]) {
  tabs.forEach((tab, index) => {
    if (!tab.disabled) {
      return index;
    }
  });
  return -1;
}
