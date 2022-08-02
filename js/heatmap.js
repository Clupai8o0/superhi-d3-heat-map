const svg = d3.select("svg");

//* Editing the svg values
svg.attr("width", 800).attr("height", data.length * 150);

//* scale
const colorScale = d3
	.scaleLinear()
	.domain([-10, 0, 7, 14, 21, 24])
	.range(["#814ee7", "#3f24ec", "#79e87C", "#fbe157", "#ff9737", "#fe3b3b"]);
const boxScale = d3.scaleLinear().domain([-20, 45]).range([150, 0]);
const lineGenerator = d3
	.line()
	.x((_, i) => 225 + 50 * i)
	.y((d) => boxScale(d));
const unitScale = d3.scaleLinear().domain([0, 100]).rangeRound([32, 212])

//* Group
const dataPoints = svg
	.selectAll("g.data-point")
	.data(data)
	.enter()
	.append("g")
	.attr("class", "data-point")
	.attr("transform", (_, i) => `translate(0, ${i * 150})`);

//* text
dataPoints
	.append("text")
	.attr("x", 175)
	.attr("y", 70)
	.attr("class", "city")
	.text((d) => d.city);
dataPoints
	.append("text")
	.attr("x", 175)
	.attr("y", 100)
	.attr("class", "country")
	.text((d) => d.country);

//* Groups
const months = dataPoints
	.append("g")
	.attr("class", "months")
	.attr("transform", "translate(200, 0)");
const monthGroups = months
	.selectAll("g.month")
	.data((d) => d.months)
	.enter()
	.append("g")
	.attr("class", "month")
	.attr("transform", (_, i) => `translate(${i * 50}, 0)`);

// Chart
monthGroups
	.append("rect")
	.attr("x", 0)
	.attr("y", 0)
	.attr("width", 50)
	.attr("height", 150)
	.style("fill", (d) => colorScale(d));

monthGroups
	.append("circle")
	.attr("cx", 25)
	.attr("cy", (d) => boxScale(d))
	.attr("r", 15);

//* Temperature texts
const temperatures = monthGroups
	.append("text")
	.attr("class", "temp")
	.attr("x", 25)
	.attr("y", (d) => boxScale(d) + 2)
	.text((d) => d)
	.style("fill", (d) => colorScale(d));

//* Line path
dataPoints
	.append("path")
	.datum((d) => d.months)
	.attr("d", (d) => lineGenerator(d));

//* Watching for cel/fah change
const selectTag = document.querySelector("select");
selectTag.addEventListener("input", () => {
	if (this.value === "c") {
		temperatures.text((d) => d);
	} else {
		temperatures.text((d) => unitScale(d));
	}
});
