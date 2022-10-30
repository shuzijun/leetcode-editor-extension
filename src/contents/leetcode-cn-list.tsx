import type { PlasmoContentScript } from "plasmo";
import { Button, Tooltip } from "antd";
import { useStorage } from "@plasmohq/storage/hook";
import { BaseUrl, Logo, Style } from "~tools";

export const config: PlasmoContentScript = {
  matches: ["https://leetcode.cn/problemset/all/*"]
};

export const getStyle = () => Style();

export const getShadowHostId = () => "leetcode-editor-open-id";

export const getInlineAnchorList = () => document.querySelectorAll("div[role=rowgroup] > div > div:nth-child(1)");

const LeetcodeCnList = ({ anchor }) => {

  const [showIcon] = useStorage("ShowIcon", true);
  const logo = Logo(20, { paddingTop: 0.2 + "em" });
  const url = BaseUrl("slug");

  function click() {
    const slug = anchor.element.nextSibling.nextSibling.getElementsByTagName("a")[0].getAttribute("href").split("/")[2];
    window.open(url + slug);
  }

  return (
    <Tooltip title={chrome.i18n.getMessage("open_ide")}>
      <Button hidden={!showIcon} type="text" onClick={click} icon={logo} target="_blank"
              style={{ paddingTop: 0.5 + "em" }} />
    </Tooltip>

  );
};

export default LeetcodeCnList;