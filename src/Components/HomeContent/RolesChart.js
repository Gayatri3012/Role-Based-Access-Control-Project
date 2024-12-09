import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

import styles from './HomeContent.module.css'

export default function RolesChart({roleCounts}) {
    const [roleChartData, setRoleChartData] = useState([]);
    const [roleLabels, setRoleLabels] = useState([]);

    useEffect(() => {
        if(roleCounts){
            setRoleLabels(roleCounts.map(role => role.name));
            setRoleChartData(roleCounts.map(role => role.count));
        }
    }, roleCounts);

    const options = {
        chart: {
            type: "pie",
        },
        labels: roleLabels,
        colors: ['#2E93fA', '#E91E63','#66DA26', '#FF9800'],
        dataLabels: {
            enabled: true,
            style: {
                fontSize: "12px",
                fontWeight: "bold",
            },
            dropShadow: {
                enabled: false,
            },
        },
        legend: {
            position: "bottom",
            fontSize: "16px",
            fontWeight: "bold",
            markers: {
                width: 14,
                height: 14,
                radius: 4, 
                offsetX: -2,
                offsetY: 0,
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: '100%',
                    }
                },
            },
            {
                breakpoint: 768,
                options: {
                    chart: {
                        width: '100%',
                    }
                },
            },
            {
                breakpoint: 1024,
                options: {
                    chart: {
                        width: '80%',
                    }
                },
            },
        ],
        animations: {
            enabled: true,
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        }
    };

    const series = roleChartData; 

    return <div className={styles.chartContainer}>
        <p>Role Distribution</p>
        <ReactApexChart options={options} series={series} type="donut"/>
    </div>
}