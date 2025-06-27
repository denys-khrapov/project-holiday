document.addEventListener("DOMContentLoaded", function () {
	initInViewport()

	function initInViewport() {
		const sections = document.querySelectorAll(
			"#about-section, #attractions-section, #amenities-section, #contacts-section"
		)

		const observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 0.3,
		}

		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				const section = entry.target

				const lineObserver = new IntersectionObserver(
					(lineEntries, lineObserver) => {
						lineEntries.forEach(lineEntry => {
							if (lineEntry.isIntersecting) {
								section.classList.add("section-loaded")
								lineObserver.disconnect()
							}
						})
					},
					observerOptions
				)
				if (entry.isIntersecting) {
					section.classList.add("section-loaded")
					observer.unobserve(section)
				}
			})
		}, observerOptions)

		sections.forEach(section => observer.observe(section))
	}
})
