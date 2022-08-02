const svg = d3.select("svg");

//* Editing the svg values
svg.attr("width", 800).attr("height", data.length * 150);

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

monthGroups
	.append("rect")
	.attr("x", 0)
	.attr("y", 0)
	.attr("width", 40)
	.attr("height", 140)
	.style("fill", "red");
