import Card from '@/components/ui/Card'
import CardHeader from '@/components/ui/CardHeader'
import CardTitle from '@/components/ui/CardTitle'
import CardContent from '@/components/ui/CardContent'
import Button from '@/components/ui/Button'
import { Download, TrendingUp, TrendingDown } from 'lucide-react'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
)

const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  datasets: [
    {
      label: 'Revenue',
      data: [185000, 198000, 192000, 225000, 210000, 245000, 235000, 260000, 280000, 295000],
      borderColor: 'rgb(66, 184, 131)',
      backgroundColor: 'rgba(66, 184, 131, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
}

const revenueOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: false,
      ticks: {
        callback: (value) => '$' + (Number(value) / 1000).toFixed(0) + 'k'
      }
    }
  }
}

const dealStageData = {
  labels: ['Qualified', 'Proposal', 'Negotiation', 'Closed Won'],
  datasets: [
    {
      data: [35, 25, 22, 18],
      backgroundColor: [
        'rgba(66, 184, 131, 0.9)',
        'rgba(66, 184, 131, 0.7)',
        'rgba(66, 184, 131, 0.5)',
        'rgba(66, 184, 131, 0.3)'
      ],
      borderColor: [
        'rgb(66, 184, 131)',
        'rgb(66, 184, 131)',
        'rgb(66, 184, 131)',
        'rgb(66, 184, 131)'
      ],
      borderWidth: 1
    }
  ]
}

const dealStageOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">View your performance metrics</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">$234,567</div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500">+18% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">28.5%</div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500">+3.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Average Deal Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">$42,300</div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingDown className="h-4 w-4 text-red-500" />
              <span className="text-red-500">-2.1% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue by Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <Line data={revenueData} options={revenueOptions} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Enterprise Solution</span>
                <span className="text-sm text-muted-foreground">$125,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cloud Migration</span>
                <span className="text-sm text-muted-foreground">$89,500</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Data Analytics Platform</span>
                <span className="text-sm text-muted-foreground">$67,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">CRM Implementation</span>
                <span className="text-sm text-muted-foreground">$45,000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deal Stage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <Doughnut data={dealStageData} options={dealStageOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
