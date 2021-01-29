import {
	Grid,
	IconButton,
	Select,
	MenuItem
} from "@material-ui/core";
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles'
import React from "react";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { setMonth, getMonth, setYear, getYear } from "date-fns";
//import { MARKERS } from "../markers";

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

const styles = createStyles({
	iconContainer: {
		padding: 5
	},
	icon: {
		padding: 10,
		"&:hover": {
			background: "none"
		}
	},
	input: {
		"&:before": {
			borderBottom: "1px solid transparent"
		}
	}
});

const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"June",
	"July",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec"
];

const generateYears = (relativeTo: Date, count: number, marker: symbol, minDate?: Date, maxDate?: Date) => {
	if (minDate && maxDate) {
		console.log(marker);
		return [minDate.getFullYear(), maxDate.getFullYear()];
	} else {
		const half = Math.floor(count / 2);
		return Array(count)
			.fill(0)
			.map((_, i) => {
				return relativeTo.getFullYear() - half + i;
			}); // TODO: make part of the state
	}
};

const Header: React.FunctionComponent<HeaderProps> = ({
	date,
	classes,
	setDate,
	nextDisabled,
	prevDisabled,
	onClickNext,
	onClickPrevious,
	months = MONTHS,
	minDate,
	maxDate,
	marker
}) => {
	const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setDate(setMonth(date, parseInt(event.target.value)));
	};

	const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setDate(setYear(date, parseInt(event.target.value)));
	};

	return (
		<Grid container justify="space-between" alignItems="center">
			<Grid item className={classes.iconContainer}>
				<IconButton
					className={classes.icon}
					disabled={prevDisabled}
					onClick={onClickPrevious}>
					<ChevronLeft color={prevDisabled ? "disabled" : "action"} />
				</IconButton>
			</Grid>
			<Grid item>
				<Select
					value={getMonth(date)}
					onChange={handleMonthChange}
					className={classes.input}
					MenuProps={{ disablePortal: true }}>
					{months.map((month, idx) => (
						<MenuItem key={month} value={idx}>
							{month}
						</MenuItem>
					))}
				</Select>
			</Grid>

			<Grid item>
				<Select
					value={getYear(date)}
					onChange={handleYearChange}
					className={classes.input}
					MenuProps={{ disablePortal: true }}>
					{generateYears(date, 30, marker, minDate, maxDate).map(year => (
						<MenuItem key={year} value={year}>
							{year}
						</MenuItem>
					))}
				</Select>

				{/* <Typography>{format(date, "MMMM YYYY")}</Typography> */}
			</Grid>
			<Grid item className={classes.iconContainer}>
				<IconButton className={classes.icon} disabled={nextDisabled} onClick={onClickNext}>
					<ChevronRight color={nextDisabled ? "disabled" : "action"} />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(Header);
