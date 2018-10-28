// CURRENT YEAR //

let now = new Date();
let year = now.getFullYear();
document.querySelector('.currentyear').innerHTML = year;
let menuOpen = false;
const menuBtn = document.querySelector('.hamburger__icon');
const menuNav = document.querySelector('.menu');

menuBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (menuOpen) {
    this.classList.remove('hamburger__icon--open');
    menuNav.classList.remove('menu--open');
  } else {
    this.classList.add('hamburger__icon--open');
    menuNav.classList.add('menu--open');
  }
  menuOpen = !menuOpen;
});
import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js'

plotters.forEach(function (data) {
  const chartWrp = document.querySelector('#myChart' + data.index).getContext('2d');

  let plotOptions = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: []
  };

  data.data.values.forEach(function (category) {
    let set = {
      data: [],
      backgroundColor: [
        'rgba(0, 0, 0, 0.1)'
      ],
      borderColor: [
        'transparent',
      ],
      borderWidth: 1,
      cubicInterpolationMode: 'monotone'
    };

    for (const value of Object.values(category)) {
      value.forEach(function (val) {
        set.data.push(val[1]);
      })
    }
    plotOptions.datasets.push(set);
  });

  let myChart = new Chart(chartWrp, {
    type: 'line',
    data: plotOptions,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: false,
      scales: {
        yAxes: [{
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            beginAtZero: true,
            display: false,
          }
        }],
        xAxes: [{
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            beginAtZero: true,
            display: false,
          }
        }]
      },
      elements: {
        point: {
          radius: 0
        }
      }
    }
  });
});