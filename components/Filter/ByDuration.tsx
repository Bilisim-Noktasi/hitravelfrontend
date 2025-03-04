import { useTranslations } from "next-intl"

export default function ByDuration({ filter, handleDurationRangeChange }: any) {
	const t=useTranslations("tourGrid")
	return (
		<>

			<label>
				{t("minDuration(days)")}
				<input
					type="number"
					name="minDuration"
					min="0"
					max="30"
					value={filter.durationRange[0]}
					onChange={handleDurationRangeChange}
				/>
			</label>
			<label>
			{t("maxDuration(days)")}
				<input
					type="number"
					name="maxDuration"
					min="0"
					max="30"
					value={filter.durationRange[1]}
					onChange={handleDurationRangeChange}
				/>
			</label>
		</>
	)
}
