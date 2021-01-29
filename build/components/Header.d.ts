import { WithStyles } from '@material-ui/core/styles';
import React from "react";
interface HeaderProps extends WithStyles<typeof styles> {
    date: Date;
    setDate: (date: Date) => void;
    nextDisabled: boolean;
    prevDisabled: boolean;
    onClickNext: () => void;
    onClickPrevious: () => void;
    marker: symbol;
    months?: [string, string, string, string, string, string, string, string, string, string, string, string];
    minDate?: Date;
    maxDate?: Date;
}
declare const styles: Record<"iconContainer" | "icon" | "input", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<HeaderProps>, "marker" | "date" | "setDate" | "nextDisabled" | "prevDisabled" | "onClickNext" | "onClickPrevious" | "months" | "minDate" | "maxDate" | "children"> & import("@material-ui/core").StyledComponentProps<"iconContainer" | "icon" | "input">>;
export default _default;
