import type { PlasmoContentScript, PlasmoGetInlineAnchor } from "plasmo";
import { Button, Tooltip } from "antd";
import { useStorage } from "@plasmohq/storage/hook";
import { BaseUrl, Logo, Style } from "~tools";

export const config: PlasmoContentScript = {
  matches: ["https://leetcode.cn/problems/*"]
};

export const getStyle = () => Style();

// Use this to optimize unmount lookups
export const getShadowHostId = () => "leetcode-editor-open-id";

export const getInlineAnchor: PlasmoGetInlineAnchor = () => document.querySelector("#lang-select");

const LeetcodeCnItem = () => {

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

export default LeetcodeCnItem;