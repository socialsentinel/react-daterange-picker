import React from "react";
import { WithStyles, Theme } from '@material-ui/core/styles';
import { DateRange, DefinedRange, Setter, NavigationAction } from "../types";
declare const styles: (theme: Theme) => Record<"header" | "headerItem" | "divider" | "monthContainer" | "footerGrid" | "actionButton" | "errorMsg", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
interface MenuProps extends WithStyles<typeof styles> {
    dateRange: DateRange;
    ranges: DefinedRange[];
    minDate: Date;
    maxDate: Date;
    firstMonth: Date;
    secondMonth: Date;
    setFirstMonth: Setter<Date>;
    setSecondMonth: Setter<Date>;
    setDateRange: Setter<DateRange>;
    helpers: {
        inHoverRange: (day: Date) => boolean;
    };
    handlers: {
        onDayClick: (day: Date) => void;
        onDayHover: (day: Date) => void;
        onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
    };
    translation?: {
        startDate?: string;
        endDate?: string;
        months?: [string, string, string, string, string, string, string, string, string, string, string, string];
        weekDays?: [string, string, string, string, string, string, string];
        locale?: object;
    };
    showHeader?: boolean;
    closeButtonHandler?: () => void;
    errorMessage?: string;
    showError?: boolean;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<MenuProps>, "dateRange" | "ranges" | "minDate" | "maxDate" | "firstMonth" | "secondMonth" | "setFirstMonth" | "setSecondMonth" | "setDateRange" | "helpers" | "handlers" | "translation" | "showHeader" | "closeButtonHandler" | "errorMessage" | "showError" | "children"> & import("@material-ui/core").StyledComponentProps<"header" | "headerItem" | "divider" | "monthContainer" | "footerGrid" | "actionButton" | "errorMsg">>;
export default _default;
