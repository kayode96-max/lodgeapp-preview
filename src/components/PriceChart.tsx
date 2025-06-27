'use client';

import { Line } from 'react-chartjs-2';
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface PriceHistoryData {
  month: string;
  price: number;
  averagePrice: number;
}

interface PriceChartProps {
  data: PriceHistoryData[];
  currentPrice: number;
  lodgeName: string;
}

export default function PriceChart({ data, currentPrice, lodgeName }: PriceChartProps) {
  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: lodgeName,
        data: data.map(item => item.price),
        borderColor: 'rgb(147, 51, 234)', // purple-600
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgb(147, 51, 234)',
        pointBorderColor: 'rgb(147, 51, 234)',
        pointHoverBackgroundColor: 'rgb(126, 34, 206)', // purple-700
        pointHoverBorderColor: 'rgb(126, 34, 206)',
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
      },
      {
        label: 'Area Average',
        data: data.map(item => item.averagePrice),
        borderColor: 'rgb(107, 114, 128)', // gray-500
        backgroundColor: 'rgba(107, 114, 128, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: 'rgb(107, 114, 128)',
        pointBorderColor: 'rgb(107, 114, 128)',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(229, 231, 235)', // gray-200
          padding: 20,
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
      },
      title: {
        display: true,
        text: 'Price History (Last 12 Months)',
        color: 'rgb(255, 255, 255)',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgb(17, 24, 39)', // gray-900
        titleColor: 'rgb(255, 255, 255)',
        bodyColor: 'rgb(229, 231, 235)', // gray-200
        borderColor: 'rgb(75, 85, 99)', // gray-600
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${formatPrice(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.3)', // gray-600 with opacity
        },
        ticks: {
          color: 'rgb(156, 163, 175)', // gray-400
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.3)', // gray-600 with opacity
        },
        ticks: {
          color: 'rgb(156, 163, 175)', // gray-400
          font: {
            size: 11,
          },
          callback: function(value) {
            return formatPrice(Number(value));
          },
        },
      },
    },
    elements: {
      line: {
        borderJoinStyle: 'round',
        borderCapStyle: 'round',
      },
    },
  };

  // Calculate price change
  const oldestPrice = data[0]?.price || currentPrice;
  const priceChange = currentPrice - oldestPrice;
  const priceChangePercent = oldestPrice ? ((priceChange / oldestPrice) * 100) : 0;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      {/* Header with Price Summary */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Price Trends</h3>
            <p className="text-gray-400 text-sm">Track pricing history and market trends</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white mb-1">
              {formatPrice(currentPrice)}
            </div>
            <div className={`text-sm font-medium flex items-center gap-1 ${
              priceChange >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              <span>{priceChange >= 0 ? '↗' : '↘'}</span>
              {Math.abs(priceChangePercent).toFixed(1)}% this year
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 relative">
        <Line data={chartData} options={options} />
      </div>

      {/* Price Analysis */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3">
          <div className="text-purple-300 text-xs font-medium uppercase tracking-wide mb-1">
            Market Position
          </div>
          <div className="text-white font-semibold">
            {currentPrice > data[data.length - 1]?.averagePrice ? 'Above' : 'Below'} Average
          </div>
        </div>
        <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
          <div className="text-blue-300 text-xs font-medium uppercase tracking-wide mb-1">
            Price Stability
          </div>
          <div className="text-white font-semibold">
            {Math.abs(priceChangePercent) < 5 ? 'Stable' : Math.abs(priceChangePercent) < 15 ? 'Moderate' : 'Volatile'}
          </div>
        </div>
      </div>
    </div>
  );
}
