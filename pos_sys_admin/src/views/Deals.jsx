import Card from '@/components/ui/Card'
import CardContent from '@/components/ui/CardContent'
import Button from '@/components/ui/Button'
import { Plus, DollarSign } from 'lucide-react'

export default function Deals() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Deals Pipeline</h1>
          <p className="text-muted-foreground">Track your sales opportunities</p>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Deal
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="space-y-4">
          <div className="font-semibold text-sm text-muted-foreground">QUALIFIED</div>
          <Card>
            <CardContent className="pt-3">
              <h3 className="font-semibold mb-2">Enterprise Solution</h3>
              <p className="text-sm text-muted-foreground mb-3">Acme Corporation</p>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-3 w-3" />
                <span className="font-semibold">$45,000</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-3">
              <h3 className="font-semibold mb-2">Cloud Migration</h3>
              <p className="text-sm text-muted-foreground mb-3">Tech Solutions</p>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-3 w-3" />
                <span className="font-semibold">$32,000</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="font-semibold text-sm text-muted-foreground">PROPOSAL</div>
          <Card>
            <CardContent className="pt-3">
              <h3 className="font-semibold mb-2">CRM Implementation</h3>
              <p className="text-sm text-muted-foreground mb-3">InnovateCo</p>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-3 w-3" />
                <span className="font-semibold">$28,500</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="font-semibold text-sm text-muted-foreground">NEGOTIATION</div>
          <Card>
            <CardContent className="pt-3">
              <h3 className="font-semibold mb-2">Data Analytics Platform</h3>
              <p className="text-sm text-muted-foreground mb-3">DataCorp</p>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-3 w-3" />
                <span className="font-semibold">$67,000</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-3">
              <h3 className="font-semibold mb-2">Mobile App Development</h3>
              <p className="text-sm text-muted-foreground mb-3">StartupXYZ</p>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-3 w-3" />
                <span className="font-semibold">$52,000</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="font-semibold text-sm text-muted-foreground">CLOSED WON</div>
          <Card>
            <CardContent className="pt-3">
              <h3 className="font-semibold mb-2">Website Redesign</h3>
              <p className="text-sm text-muted-foreground mb-3">DesignHub</p>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-3 w-3" />
                <span className="font-semibold">$18,000</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
