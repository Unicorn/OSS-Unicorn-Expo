import Svg, { Path } from "react-native-svg";

// Simple fix for an outstanding issue with react-native-svg
// https://github.com/software-mansion/react-native-svg/issues/1484
export class PathPatched extends Path {
  public override render() {
    const newProps = {
      ...this.props,
      collapsable: undefined,
    };
    return <Path {...newProps} />;
  }
}
