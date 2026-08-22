import Card from '@/components/ui/Card'
import CardContent from '@/components/ui/CardContent'
import Button from '@/components/ui/Button'
import { Plus, Calendar, User } from 'lucide-react'

export default function Tasks() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage your todo list and assignments</p>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-4">
          <div className="font-semibold text-sm text-muted-foreground">TO DO</div>
          <Card>
            <CardContent className="pt-3">
              <div className="flex items-start gap-3 mb-3">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-input" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Call with prospect</h3>
                  <p className="text-sm text-muted-foreground mb-3">Discuss project requirements and timeline</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Today at 2:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>Assigned to you</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-3">
              <div className="flex items-start gap-3 mb-3">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-input" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Prepare presentation</h3>
                  <p className="text-sm text-muted-foreground mb-3">Create slides for client meeting</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Tomorrow at 10:00 AM</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>Assigned to you</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="font-semibold text-sm text-muted-foreground">IN PROGRESS</div>
          <Card>
            <CardContent className="pt-3">
              <div className="flex items-start gap-3 mb-3">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-input" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Draft proposal</h3>
                  <p className="text-sm text-muted-foreground mb-3">Write detailed proposal for Enterprise Solution</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Due in 2 days</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>Assigned to you</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="font-semibold text-sm text-muted-foreground">COMPLETED</div>
          <Card>
            <CardContent className="pt-3">
              <div className="flex items-start gap-3 mb-3">
                <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 rounded border-input" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 line-through text-muted-foreground">Follow-up email</h3>
                  <p className="text-sm text-muted-foreground mb-3">Send follow-up to Jane Smith</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Completed yesterday</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-3">
              <div className="flex items-start gap-3 mb-3">
                <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 rounded border-input" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 line-through text-muted-foreground">Update CRM records</h3>
                  <p className="text-sm text-muted-foreground mb-3">Add new contacts from conference</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Completed 2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
