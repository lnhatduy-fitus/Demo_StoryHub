'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import styles from './CardChart.module.css';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const defaultOptions = {
  chart: {
    type: 'area',
    animations: {
      easing: 'linear',
      speed: 300,
    },
    stacked: true,
    toolbar: {
      show: false,
    },
    fontFamily: 'Inter, sans-serif',
    foreColor: '#666',
  },
  xaxis: {
    categories: [2025, 2025, 1993, 1994, 1995, 1996, 1997],
    labels: {
      style: {
        colors: '#999',
        fontFamily: 'Inter, sans-serif',
      },
    },
    axisBorder: {
      color: '#ddd',
    },
    axisTicks: {
      color: '#ddd',
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#999',
        fontFamily: 'Inter, sans-serif',
      },
    },
  },
  tooltip: {
    enabled: true,
  },
  grid: {
    show: true,
    borderColor: '#eee',
    strokeDashArray: 0,
  },
  stroke: {
    curve: 'smooth',
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.1,
      stops: [0, 90, 100],
    },
  },
  markers: {
    size: 0,
  },
};

export const CardChart = ({
  series = [],
  options = {},
  height = 425,
}) => {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    chart: {
      ...defaultOptions.chart,
      ...(options.chart || {}),
    },
    xaxis: {
      ...defaultOptions.xaxis,
      ...(options.xaxis || {}),
    },
    yaxis: {
      ...defaultOptions.yaxis,
      ...(options.yaxis || {}),
    },
    stroke: {
      ...defaultOptions.stroke,
      ...(options.stroke || {}),
    },
    fill: {
      ...defaultOptions.fill,
      ...(options.fill || {}),
    },
    grid: {
      ...defaultOptions.grid,
      ...(options.grid || {}),
    },
  };

  return (
    <div className={styles.wrapper}>
      <div id="chart">
        <Chart options={mergedOptions} series={series} type="area" height={height} />
      </div>
    </div>
  );
};
