import {
  RiBehanceLine,
  RiInstagramLine,
  RiPinterestLine,
  RiTiktokLine,
  RiTwitterLine,
  RiYoutubeLine,
} from "react-icons/ri";

const YOUR_NICK_HERE = "";

export const socialNetworks = [
  {
    logo: <RiInstagramLine size="35" />,
    src: `https://www.instagram.com/${YOUR_NICK_HERE}`,
  },
  {
    logo: <RiYoutubeLine size="35" />,
    src: `https://www.youtube.com/@${YOUR_NICK_HERE}`,
  },
  {
    logo: <RiTiktokLine size="35" />,
    src: `https://www.tiktok.com/@${YOUR_NICK_HERE}`,
  },
  {
    logo: <RiPinterestLine size="35" />,
    src: `https://www.pinterest.com/${YOUR_NICK_HERE}`,
  },
  {
    logo: <RiTwitterLine size="35" />,
    src: `https://www.twitter.com/${YOUR_NICK_HERE}`,
  },
  {
    logo: <RiBehanceLine size="35" />,
    src: `https://www.behance.net/${YOUR_NICK_HERE}`,
  },
];
