import AbstractScreen from "../abstract-screen";
import ScreenType from "../enum/screen-type.enum";

interface ScreensData {
  [name: ScreenType | string]: AbstractScreen;
}

export default ScreensData;