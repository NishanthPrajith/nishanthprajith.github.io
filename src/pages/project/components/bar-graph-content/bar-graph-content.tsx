import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { chartColors } from '../../../../data/chart-colors';
import { ChartProps } from '../../../../data/projects/types';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function BarChart({
  title,
  labels = [],
  datasets = [],
  yLabel = '',
  xLabel = '',
  horizontal = false,
  xTickFormat,
  yTickFormat,
  xAxisMax,
  yAxisMax,
  caption,
  hideTopPadding = false,
}: ChartProps) {
  const graphLabels = labels ?? datasets.map((d) => d.label);
  const data: ChartData<'bar'> = {
    labels: graphLabels,
    datasets: datasets.map((d, idx) => ({
      label: d.label,
      data: d.data,
      backgroundColor:
        datasets.length > 1
          ? chartColors[idx % chartColors.length]
          : chartColors,
      borderRadius: 4,
      maxBarThickness: 100,
    })),
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? 'y' : 'x',
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: datasets.length > 1 ? true : false,
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 6,
          boxHeight: 6,
        },
      },
      title: {
        display: true,
        text: title,
        padding: {
          bottom: 15,
        },
        font: {
          size: 14,
          weight: 'normal',
        },
      },
      datalabels: {
        display: true,
        anchor: 'end', // position relative to the bar (end = top of bar)
        align: horizontal ? 'end' : 'top', // align text above the anchor point
        color: '#74736e',
        font: {
          size: 11,
        },
        formatter: (value) => (yTickFormat ? yTickFormat(value) : value), // reuse your existing formatter
      },
    },
    scales: {
      x: {
        ...(xAxisMax && {
          max: xAxisMax,
        }),
        ...(xLabel && {
          title: {
            display: true,
            padding: {
              top: 15,
            },
            text: xLabel,
          },
        }),
        grid: {
          display: false,
        },
        ticks: {
          ...(xTickFormat && {
            callback: (value) => {
              console.log(value);
              return xTickFormat(Number(value));
            },
          }),
        },
      },
      y: {
        ...(yAxisMax && {
          max: yAxisMax,
        }),
        ...(yLabel && {
          title: {
            display: true,
            padding: {
              bottom: 15,
            },
            text: yLabel,
          },
        }),
        ticks: {
          ...(yTickFormat && {
            callback: (value) => {
              return yTickFormat(Number(value));
            },
          }),
        },
      },
    },
  };

  return (
    <div
      className="chart-container"
      style={hideTopPadding ? { paddingTop: '0' } : {}}
    >
      <div className="chart-canvas">
        <Bar data={data} options={options} height={100} width={100} />
      </div>
      {caption && <p className="caption short-display">{caption}</p>}
    </div>
  );
}
