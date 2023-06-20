import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function LineChart({ title, chartData, label }) {
    const options = {
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    boxWidth: '6',
                    boxHeight: '6',
                },
            },
            title: {
                display: true,
                text: title,
            },
        }
    };
    const data = {
        labels: chartData?.label,
        datasets: [
            {
                label: label,
                data: chartData?.data,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return <>
        <div className='max-w-screen-xl'>
            <Line options={options} data={data} />
        </div>
    </>;
}
