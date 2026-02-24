import pixToRem from "./utils.js";

const MatchMedia = {
    mobile: window.matchMedia(`(width <= ${pixToRem(767.98)}rem)`),
};

export default MatchMedia;
