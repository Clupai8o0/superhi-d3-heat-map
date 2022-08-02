const svg = d3.select("svg");

svg.attr("width", 800).attr("height", data.length * 150);

const dataPoints = svg
	.selectAll("g.data-point")
	.data(data)
	.enter()
	.append("g")
	.attr("class", "data-point")
	.attr("transform", (_, i) => `translate(0, ${i * 150})`);

// text
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
