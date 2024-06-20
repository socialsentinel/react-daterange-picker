import React from "react";
import {
  Paper,
  Grid,
  Typography,
  Divider,
  Button
} from "@material-ui/core";
import {
  createStyles,
  WithStyles,
  Theme,
  withStyles
} from '@material-ui/core/styles'
import { format, differenceInCalendarMonths } from "date-fns";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import Month from "./Month";
import DefinedRanges from "./DefinedRanges";
import { DateRange, DefinedRange, Setter, NavigationAction } from "../types";
import { MARKERS } from "../markers";

const styles = (theme: Theme) =>
  createStyles({
    header: {
      padding: "20px 70px"
    },
    headerItem: {
      flex: 1,
      textAlign: "center"
    },
    divider: {
      borderLeft: '1px solid #E4E7E7'
    },
    monthContainer: {
      borderBottom: '1px solid #E4E7E7'
    },
    footerGrid: {
      backgroundColor: theme.palette.common.white
    },
    actionButton: {
      margin: theme.spacing(1)
    },
    errorMsg: {
      paddingLeft: theme.spacing(2)
    }
});

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

const Menu: React.FunctionComponent<MenuProps> = props => {
  const {
    classes,
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
    translation,
    showHeader,
    closeButtonHandler,
    errorMessage,
    showError
  } = props;
  const translationText = {
    ...{
      startDate: "Start Date",
      endDate: "End Date"
    },
    ...translation,
  } as MenuProps['translation'];

  const { startDate, endDate } = dateRange;
  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = { dateRange, minDate, maxDate, helpers, handlers };

  return (
    <Paper elevation={5} square>
      <Grid container direction="row" wrap="nowrap">
        <Grid>
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
          />
        </Grid>
        <div className={classes.divider} />
        <Grid>
          {showHeader ?
            <React.Fragment>
              <Grid container className={classes.header} alignItems="center">
                <Grid item className={classes.headerItem}>
                  <Typography variant="subtitle1">
                    {startDate ? format(startDate, "MMMM dd, yyyy", { locale: translation?.locale }) : translationText?.startDate as string}
                  </Typography>
                </Grid>
                <Grid item className={classes.headerItem}>
                  <ArrowRightAlt color="action" />
                </Grid>
                <Grid item className={classes.headerItem}>
                  <Typography variant="subtitle1">
                    {endDate ? format(endDate, "MMMM dd, yyyy", { locale: translation?.locale }) : translationText?.endDate as string}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
            </React.Fragment>
          : null}
          <Grid container direction="row" justify="center" wrap="nowrap" className={classes.monthContainer}>
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
              weekDays={translationText?.weekDays}
              months={translationText?.months}
            />
            <div className={classes.divider} />
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
              weekDays={translationText?.weekDays}
              months={translationText?.months}
            />
          </Grid>
          <Grid container
            justify="space-between"
            alignItems="center"
            className={classes.footerGrid}>
            <Grid item className={classes.errorMsg}>
              {!showError ? <Typography color="error">{errorMessage}</Typography> : null}
            </Grid>
            <Grid item>
              <Button
                  aria-label="update"
                  color="primary"
                  onClick={closeButtonHandler}
                  className={classes.actionButton}>
                  Done
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withStyles(styles)(Menu);
