import type { PlasmoContentScript, PlasmoGetInlineAnchor } from "plasmo";
import { Button, Tooltip } from "antd";
import { useStorage } from "@plasmohq/storage/hook";
import { BaseUrl, Logo, Style } from "~tools";

export const config: PlasmoContentScript = {
  matches: ["https://leetcode.com/problems/*"]
};

export const getStyle = () => Style();


export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(".select__2iyW");

// Use this to optimize unmount lookups
export const getShadowHostId = () => "leetcode-editor-open-id";

const LeetcodeComItem = () => {
  const [showIcon] = useStorage("ShowIcon", true);
  const logo = Logo(20, { paddingTop: 0.2 + "em" });
  const url = BaseUrl("slug");

  function click() {
    const slug = window.location.pathname.split("/")[2];
    window.open(url + slug);
  }

  return (
    <Tooltip title={chrome.i18n.getMessage("open_ide")}>
      <Button hidden={!showIcon} type="text" onClick={click} icon={logo} target="_blank"
              style={{ paddingTop: 0.25 + "em" }} />
    </Tooltip>

  );
};

export default LeetcodeComItem;