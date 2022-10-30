import {
  IntellijIdeaLogo,
  AppcodeLogo,
  ClionLogo,
  PycharmLogo,
  PhpstormLogo,
  RubymineLogo,
  WebstormLogo,
  RiderLogo,
  GolandLogo
} from "@jetbrains/logos/react";

import { useStorage } from "@plasmohq/storage/hook";
import cssText from "data-text:~/src/index.less";
import cssDarkText from "data-text:~/src/index.dark.less";

export const Style = (dark?:boolean) => {
  const style = document.createElement("style");
  if (dark){
    style.textContent = cssDarkText
  }else {
    style.textContent = cssText;
  }
  return style;
}

export const Icon = () => (
  <svg xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" width={40} height={40}>
    <path d="M20.017 19.311 5.222 11.043 20.017 2.5l14.83 8.543-14.83 8.268Z" fill="#f89f1c" />
    <path d="M19.534 20.413 4.74 11.87l-.034 17.087 14.83 8.543V20.413Z" fill="#002e9b" />
    <path d="M20.5 20.413V37.5l14.795-8.543.035-17.087-14.83 8.543Z" />
    <path
      d="M23.363 30.61v2.205l7.173-4.134v-2.205l-7.174 4.134ZM16.768 12.892c-.24-.16-.485-.3-.697-.48-.356-.304-.5-.697-.438-1.17.04-.31.042-.623.063-.934.032-.466.07-.932.1-1.398.024-.39.048-.782.06-1.173.013-.443.17-.546.627-.61a.789.789 0 0 1 .52.08c.163.094.208.217.192.392-.021.223-.027.448-.03.671 0 .025.066.077.086.07.498-.165 1.01-.205 1.531-.202.521.002 1.043-.014 1.564-.024a.89.89 0 0 1 .464.11c.118.067.215.158.213.295-.001.14-.11.24-.231.282-.177.06-.365.102-.55.118-.239.02-.48.001-.719.005-.405.006-.812.001-1.216.03a1.666 1.666 0 0 0-1.029.44c-.126.116-.142.275-.145.435-.01.51-.023 1.02-.031 1.531-.007.413.197.69.59.828.307.109.62.165.948.159.328-.006.656.014.984.023l.879.026c.32.009.641-.004.957.032.417.047.817.014 1.195-.167.157-.075.308-.18.43-.303a.48.48 0 0 0 .107-.311c.002-.343-.01-.687-.034-1.03-.027-.378.056-.447.375-.55a1.263 1.263 0 0 1 1.046.11c.178.101.203.273.22.458.033.359.095.715.12 1.075.026.369-.154.662-.428.885a3.182 3.182 0 0 1-.693.456c-.307.136-.636.239-.966.303-.326.063-.665.08-.998.082-.457.002-.915-.03-1.372-.048l-.592-.026c-.462-.018-.924-.027-1.386-.054-.414-.025-.83-.062-1.223-.208-.164-.06-.322-.137-.493-.208Z"
      fill="#fff" />
    <path
      d="M24.217 8.631c.025.169-.089.249-.196.311-.497.29-1 .568-1.5.854-.56.321-1.117.65-1.68.97-.254.144-.507.3-.778.406-.327.127-.653.06-.944-.136-.203-.137-.188-.384.034-.519.338-.205.682-.399 1.023-.596.39-.225.778-.45 1.168-.673.324-.186.65-.37.975-.554.193-.109.389-.215.582-.325.208-.118.435-.146.665-.12.201.023.4.074.551.224.042.04.067.098.1.158ZM13.346 28.482c.213.123.422.246.634.363.053.03.072.06.072.121 0 .556.005 1.112.008 1.668v.062l-.144-.08-.371-.214-.419-.241-.343-.198-.554-.318c-.122-.07-.244-.137-.365-.207l-.418-.242-.412-.235-.438-.253-.407-.233-.49-.282c-.097-.055-.193-.109-.288-.165-.012-.007-.026-.024-.026-.037l-.001-1.782 1.553.891v-5.376l-1.533-.88v1.798L7.85 21.75v-3.6l.2.11.354.205.55.317c.12.07.243.138.364.207l.418.242.412.235c.162.094.324.188.486.28.121.07.243.138.364.207l.419.242c.137.08.274.157.411.235l.439.253.403.231.495.285c.138.08.277.157.416.236l.481.28c.144.082.29.161.433.244.161.092.321.186.482.28l.407.233.211.119v3.6c-.04-.022-.078-.04-.113-.06l-.419-.242c-.162-.094-.324-.188-.486-.28-.121-.07-.243-.138-.364-.207-.051-.029-.103-.056-.152-.088-.012-.008-.019-.033-.019-.05V23.54c0-.03-.01-.043-.035-.058-.164-.092-.327-.187-.49-.281l-.417-.236-.482-.28c-.034-.02-.07-.037-.11-.058v5.374l.76.434.08.046Z"
      fill="#fff" />
  </svg>
);

export const Logo = (size: number, property?,myProduct?:string) => {
  const [product] = useStorage("Product", "idea");
  if (!myProduct){
     myProduct = product
  }

  if (myProduct == "idea") {
    return <IntellijIdeaLogo height={size} width={size} style={property} />;
  } else if (myProduct == "pycharm") {
    return <PycharmLogo height={size} width={size} style={property} />;
  } else if (myProduct == "clion") {
    return <ClionLogo height={size} width={size} style={property} />;
  } else if (myProduct == "goland") {
    return <GolandLogo height={size} width={size} style={property} />;
  } else if (myProduct == "phpstorm") {
    return <PhpstormLogo height={size} width={size} style={property} />;
  } else if (myProduct == "webstorm") {
    return <WebstormLogo height={size} width={size} style={property} />;
  } else if (myProduct == "rider") {
    return <RiderLogo height={size} width={size} style={property} />;
  } else if (myProduct == "rubymine") {
    return <RubymineLogo height={size} width={size} style={property} />;
  } else if (myProduct == "appcode") {
    return <AppcodeLogo height={size} width={size} style={property} />;
  }
  return <IntellijIdeaLogo height={size} width={size} style={property} />;
};

export const BaseUrl = (appendName?:string) => {
  const [editor] = useStorage("Editor", "leetcode-editor-pro")
  const [product] = useStorage("Product", "idea")
  const [project] = useStorage("Project", "")

  let url = "jetbrains://" + product + "/" + editor + "/open?project=" + project;

  if (appendName) {
    return url + "&"+ appendName +"="
  }
  return url
}