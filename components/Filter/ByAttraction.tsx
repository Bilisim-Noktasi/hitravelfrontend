import Link from 'next/link'

export default function ByAttraction({ uniqueAttractions, filter, handleCheckboxChange }: any) {
	return (
		<>
			<div className="box-collapse scrollFilter">
				<ul className="list-filter-checkbox">
					{uniqueAttractions.map((attraction: any) => (
						<li key={attraction}>
							<label className="cb-container">
								<input
									type="checkbox"
									checked={filter.attractions.includes(attraction)}
									onChange={handleCheckboxChange("attractions", attraction)}
								/>

								<span className="text-sm-medium">{attraction}</span>
								<span className="checkmark" />
							</label>
							<span className="number-item">{attraction.length}</span>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}
