<script setup lang="ts">
import { computed } from 'vue'

// Принимаем данные через props
const props = defineProps<{
  labels: string[]
  values: number[]
  totalExpenses: number
}>()

const chartSeries = computed(() => props.values)

const chartOptions = computed(() => ({
  chart: {
    type: 'donut',
    height: 350,
    toolbar: { show: false }
  },
  labels: props.labels,
  legend: {
    position: 'bottom',
    fontSize: '14px',
    offsetY: 0
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => Math.round(val) + '%'
  },
  tooltip: {
    y: {
      formatter: (val: number) => val.toLocaleString('ru-RU') + ' ₽'
    }
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Всего расходов',
            fontSize: '16px',
            fontWeight: 600,
            formatter: () => props.totalExpenses.toLocaleString('ru-RU') + ' ₽'
          }
        }
      }
    }
  },
  // Адаптивность
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: { height: 320 },
        legend: {
          fontSize: '13px',
          position: 'bottom'
        },
        plotOptions: {
          pie: {
            donut: {
              size: '60%',
              labels: {
                total: {
                  fontSize: '14px'
                }
              }
            }
          }
        }
      }
    },
    {
      breakpoint: 480,
      options: {
        chart: {
          height: 300,
          width: '100%'
        },
        legend: {
          fontSize: '12px',
          position: 'bottom'
        },
        plotOptions: {
          pie: {
            donut: {
              size: '55%',
              labels: {
                total: {
                  fontSize: '12px',
                  label: 'Всего'
                }
              }
            }
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '10px'
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
        type="donut"
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