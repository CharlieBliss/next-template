import { useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useRouter } from 'next/router'

const a11yProps = (index) => ({
	id: `simple-tab-${index}`,
	'aria-controls': `simple-tabpanel-${index}`,
})

export default ({ options, defaultOption, onChange }) => {
	const router = useRouter()
	const [value, setValue] = useState(defaultOption)
	const handleChange = (event, newValue) => {
		onChange(newValue)
		setValue(newValue)
	}
	return (
		<Tabs
			value={value}
			onChange={handleChange}
			headerColor="primary"
		>
			{options.map(
				(option, index) => (
					<Tab
						color="primary"
						value={option.value}
						label={option.label}
						{...a11yProps(index)}

					/>
				),
			)}
		</Tabs>
	)
}
