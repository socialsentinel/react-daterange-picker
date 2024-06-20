import React from "react";
import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { DefinedRange, DateRange } from "../types";
import { isSameDay } from "date-fns";

type DefinedRangesProps = {
	setRange: (range: DateRange) => void;
	selectedRange: DateRange;
	ranges: DefinedRange[];
};

const styles = makeStyles({
	list: {
		paddingLeft: 16,
		paddingRight: 16
	},

	listItem: {
		margin: 0,
		width: 140,
		borderRadius: 6
	}
});

const isSameRange = (first: DateRange, second: DateRange) => {
	const { startDate: fStart, endDate: fEnd } = first;
	const { startDate: sStart, endDate: sEnd } = second;
	if (fStart && sStart && fEnd && sEnd) {
		return isSameDay(fStart, sStart) && isSameDay(fEnd, sEnd);
	}
	return false;
};

const DefinedRanges: React.FunctionComponent<DefinedRangesProps> = props => {
	let classes = styles();
	console.log('classes', classes);

	return (
		<List className={classes.list}>
			{props.ranges.map((range, idx) => (
				<ListItem button key={idx} onClick={() => props.setRange(range)} className={classes.listItem}>
					<ListItemText
						primaryTypographyProps={{
							variant: "body2",
							color: "textSecondary",
							style: {
								fontWeight: isSameRange(range, props.selectedRange)
									? "bold"
									: "normal"
							}
						}}>
						{range.label}
					</ListItemText>
				</ListItem>
			))}
		</List>
	);
};

export default DefinedRanges;
