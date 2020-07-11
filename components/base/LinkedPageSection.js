import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { orNull } from 'util/ramdaPlus'
import Grid from '@material-ui/core/Grid'

import Link from 'next/Link'

const useStyles = makeStyles(({ breakpoints, typography, palette }) => ({
	sectionWrapper: {
		marginTop: 48,
		padding: [[0, 16]],
		width: '100%',
		position: 'relative',
		[breakpoints.up('lg')]: {
			padding: [[0, 62]],
		},
		[breakpoints.only('xs')]: {
			marginTop: 24,
		},
	},
	noPadding: {
		padding: 0,
	},
	noMargin: {
		marginTop: 0,
	},
	chev: {
		height: 32,
		width: 32,
	},
	childWrapper: {
		margin: [[24, 0]],
		width: '100%',
	},
	linkHover: {
		color: typography.color,
	},
	linkContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		boxSizing: 'border-box',
		justifyContent: 'flex-end',
		[breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	linkLeft: {
		justifyContent: 'flex-start',
	},
}))

export const LinkedPageSection = ({
	title, linkText, to, children, onClick,
	noPadding, linkLeft, noMargin,
}) => {
	const classes = useStyles()
	return (
		<Grid
			direction="column"
			container
			className={clsx(
				classes.sectionWrapper,
				{ [classes.noPadding]: noPadding },
				{ [classes.noMargin]: noMargin },

			)}
		>
			<Grid item>
				<Grid container justify="space-between">
					<Grid item>
						{title}
					</Grid>
					{orNull(
						linkText && to,
						<Grid
							item
							className={clsx(
								classes.linkContainer,
								{ [classes.linkLeft]: linkLeft },
							)}
						>
							<Link
								href={to}
								linkClassName={classes.linkHover}
								onClick={onClick}
							>
								<Grid container alignItems="center">
									{linkText}
								</Grid>
							</Link>
						</Grid>,
					)}
				</Grid>
			</Grid>
			<Grid item className={classes.childWrapper}>
				{children}
			</Grid>
		</Grid>
	)
}

export default LinkedPageSection
