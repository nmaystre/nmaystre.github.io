import { Chart, ChartData, ChartDataSets } from 'chart.js';

const statsGraph: HTMLElement | null = document.querySelector('.stats__graph');
// import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js';
// import { AnyTypeAnnotation } from 'babel-types';

type Keys = 'electricity' | 'water' | 'gas';

type DataValue = { [K in Keys]: Array<Array<string | number>> };

type Data = {
	type: string;
	values: Array<DataValue>;
};

class Plot {
	index: number;
	data: Data;
}

declare let plotters: Array<Plot>;

class Set {
	data: Array<number>;
	backgroundColor: Array<string>;
	borderColor: Array<string>;
	borderWidth: number;
	cubicInterpolationMode: string;
}

class PlotOptions {
	labels: Array<string>;
	datasets: Array<Set>;
}

// declare let Chart: any;

if (statsGraph) {
	plotters.forEach(function(data: Plot) {
		const canvas: HTMLCanvasElement = document.querySelector('#myChart' + data.index);
		const chartWrp: RenderingContext | CanvasRenderingContext2D = canvas.getContext('2d');

		let plotOptions: ChartData = {
			labels: [ '1', '2', '3', '4', '5', '6', '7' ],
			datasets: []
		};

		data.data.values.forEach(function(category) {
			let set: ChartDataSets = {
				data: [],
				backgroundColor: [ 'rgba(0, 0, 0, 0.1)' ],
				borderColor: [ 'transparent' ],
				borderWidth: 1,
				cubicInterpolationMode: 'monotone'
			};

			for (let value of (<any>Object)['values'](category)) {
				value.forEach(function(val: [string, number]) {
					(set.data as number[]).push(val[1] as number);
				});
			}
			plotOptions.datasets.push(set);
		});

		let myChart = new Chart(chartWrp, {
			type: 'line',
			data: plotOptions,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				legend: null,
				scales: {
					yAxes: [
						{
							gridLines: {
								display: false,
								drawBorder: false
							},
							ticks: {
								beginAtZero: true,
								display: false
							}
						}
					],
					xAxes: [
						{
							gridLines: {
								display: false,
								drawBorder: false
							},
							ticks: {
								beginAtZero: true,
								display: false
							}
						}
					]
				},
				elements: {
					point: {
						radius: 0
					}
				}
			}
		});
	});
}
