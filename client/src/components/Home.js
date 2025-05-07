import React from "react";
import Typography from '@mui/material/Typography';
import { BarChart } from "@mui/x-charts/BarChart";

function Home({ tickets }) {
    const statusColors = {
        open: "#FFD54F",
        "in progress": "#4FC3F7",
        resolved: "#81C784",
        closed: "#E57373",
    };

    const statusCounts = tickets.reduce((counts, ticket) => {
        const status = ticket.status.toLowerCase();
        counts[status] = (counts[status] || 0) + 1;
        return counts;
    }, {});

    const statuses = Object.keys(statusCounts);

    return (
        <div>
            <Typography variant="h4">Welcome to The Ticket Board</Typography>
            <Typography variant="body1">Here’s a quick overview of the ticketing system:</Typography>
            <BarChart
                xAxis={[{ scaleType: 'band', data: ["Tickets"] }]}
                series={statuses.map((status) => ({
                    data: [statusCounts[status]],
                    label: status,
                    color: statusColors[status],
                }))}
                width={500}
                height={300}
            />
        </div>
    );
}


export default Home;