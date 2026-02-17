<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps<{
  labels: string[]
  values: number[]
  totalExpenses: number
}>()

const chartSeries = computed(() => [{
  name: 'Расходы',
  data: props.values
}])

const chartOptions = computed(() => ({
  colors: ['#2A7956'],
  chart: {
    height: 350,
    type: 'bar',
    toolbar: {show: false}
  },
  labels: props.labels,
  xaxis: {
    categories: props.labels,
    position: 'bottom',
    axisBorder: {show: false},
    axisTicks: {show: false},
    labels: {
      rotate: -45,
      rotateAlways: false,
      style: {
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    labels: {
      formatter: (val: number) => val.toLocaleString('ru-RU') + ' ₽'
    }
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => Math.round(val).toLocaleString('ru-RU') + ' ₽',
    offsetY: -20,
    style: {
      fontSize: '13px',
      colors: ['#304758']
    }
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      dataLabels: {position: 'top'},
      columnWidth: '60%'
    }
  },
  legend: {show: false},
  tooltip: {
    y: {
      formatter: (val: number) => val.toLocaleString('ru-RU') + ' ₽'
    }
  },
  // Адаптивность
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: {height: 300},
        plotOptions: {
          bar: {columnWidth: '70%'}
        },
        dataLabels: {
          style: {fontSize: '11px'}
        },
        xaxis: {
          labels: {
            style: {fontSize: '10px'},
            rotate: -45
          }
        }
      }
    },
    {
      breakpoint: 480,
      options: {
        chart: {height: 280},
        plotOptions: {
          bar: {columnWidth: '80%'}
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          labels: {
            style: {fontSize: '9px'}
          }
        }
      }
    }
  ]
}))
</script>

<template>
  <div class="expenses-chart">
    <h3 class="chart-title">Расходы по категориям</h3>

    <div v-if="totalExpenses === 0" class="no-data">
      Нет расходов за период
    </div>

    <apexchart
        v-else
        type="bar"
        height="380"
        :options="chartOptions"
        :series="chartSeries"
    />
  </div>
</template>

<style scoped>
.expenses-chart {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.chart-title {
  text-align: center;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
}

.no-data {
  text-align: center;
  color: #6b7280;
  padding: 40px 0;
  font-size: 16px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .expenses-chart {
    padding: 16px;
  }

  .chart-title {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .expenses-chart {
    padding: 12px;
  }

  .chart-title {
    font-size: 14px;
    margin-bottom: 12px;
  }

  .no-data {
    padding: 30px 0;
    font-size: 14px;
  }
}
</style>