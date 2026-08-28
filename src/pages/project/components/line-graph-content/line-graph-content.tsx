import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { chartColors } from '../../../../data/chart-colors';
import { ChartProps } from '../../../../data/projects/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({
  title,
  labels = [],
  datasets = [],
  yLabel = '',
  xLabel = '',
  xTickFormat,
  yTickFormat,
  xAxisMaxTicksLimit,
  xAxisMin,
  yAxisMin,
  xAxisMax,
  yAxisMax,
  caption,
  hideTopPadding = false,
}: ChartProps) {
  const graphLabels = labels ?? datasets.map((d) => d.label);
  const data: ChartData<'line'> = {
    labels: graphLabels,
    datasets: datasets.map((d, idx) => ({
      label: d.label,
      data: d.data,
      borderColor: chartColors[idx % chartColors.length],
      backgroundColor: chartColors[idx % chartColors.length],
      showLine: !d.hideLine,
    })),
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'line',
          boxWidth: 100,
        },
      },
      ...(title && {
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
      }),
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        type: 'linear',
        ...(xAxisMax && {
          max: xAxisMax,
        }),
        ...(xAxisMin && {
          min: xAxisMin,
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
        ticks: {
          ...(xAxisMaxTicksLimit && {
            maxTicksLimit: xAxisMaxTicksLimit,
          }),
          padding: 10,
          ...(xTickFormat && {
            callback: (value) => {
              return xTickFormat(Number(value));
            },
          }),
        },
      },
      y: {
        ...(yAxisMin && {
          min: yAxisMin,
        }),
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
        <Line data={data} options={options} height={100} width={100} />
      </div>
      {caption && <p className="caption short-display">{caption}</p>}
    </div>
  );
}
