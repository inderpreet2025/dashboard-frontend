import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL)
            .then(response => {
                setData(response.data);
                // Use D3.js to create visualizations
                createChart(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const createChart = (data) => {
        // D3.js code to create interactive charts
        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", 800)
            .attr("height", 400);

        // Example: Create a bar chart
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 50)
            .attr("y", d => 400 - d.intensity * 10)
            .attr("width", 40)
            .attr("height", d => d.intensity * 10)
            .attr("fill", "blue");
    };

    return (
        <div>
            <h1>Data Visualization Dashboard</h1>
            <div id="chart"></div>
        </div>
    );
};

export default Dashboard;
