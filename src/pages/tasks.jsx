// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { Calendar, MapPin, Clock, CheckCircle, AlertTriangle, Navigation } from 'lucide-react';

export default function Tasks(props) {
  const {
    $w
  } = props;
  const [tasks, setTasks] = useState([{
    id: 1,
    title: '光明路88号满溢处理',
    location: '光明路88号',
    type: '满溢报警',
    priority: 'high',
    assignee: '张师傅',
    deadline: '2024-01-15 12:00',
    status: 'pending',
    description: '垃圾桶已满，需要立即清运'
  }, {
    id: 2,
    title: '人民广场设备检修',
    location: '人民广场东侧',
    type: '设备故障',
    priority: 'medium',
    assignee: '李师傅',
    deadline: '2024-01-15 16:00',
    status: 'in_progress',
    description: '传感器异常，需要检查维修'
  }, {
    id: 3,
    title: '科技园常规巡查',
    location: '科技园A区',
    type: '常规巡查',
    priority: 'low',
    assignee: '王师傅',
    deadline: '2024-01-15 18:00',
    status: 'completed',
    description: '日常巡查，检查垃圾桶状态'
  }]);
  const getPriorityBadge = priority => {
    const priorityMap = {
      high: {
        label: '紧急',
        color: 'destructive'
      },
      medium: {
        label: '中等',
        color: 'default'
      },
      low: {
        label: '一般',
        color: 'secondary'
      }
    };
    return priorityMap[priority] || priorityMap.low;
  };
  const getStatusBadge = status => {
    const statusMap = {
      pending: {
        label: '待处理',
        color: 'secondary'
      },
      in_progress: {
        label: '进行中',
        color: 'default'
      },
      completed: {
        label: '已完成',
        color: 'default'
      }
    };
    return statusMap[status] || statusMap.pending;
  };
  const TaskCard = ({
    task
  }) => <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{task.title}</h3>
                  <Badge variant={getPriorityBadge(task.priority).color}>
                    {getPriorityBadge(task.priority).label}
                  </Badge>
                  <Badge variant={getStatusBadge(task.status).color}>
                    {getStatusBadge(task.status).label}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                <div className="space-y-1 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{task.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>截止时间: {task.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>负责人: {task.assignee}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="sm">
                  <Navigation className="h-4 w-4 mr-1" />
                  导航
                </Button>
                {task.status === 'pending' && <Button size="sm" variant="outline">
                    开始处理
                  </Button>}
              </div>
            </div>
          </CardContent>
        </Card>;
  return <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">任务管理</h1>
              <p className="text-gray-600 mt-1">管理和跟踪所有巡查任务</p>
            </div>

            <Tabs defaultValue="pending" className="space-y-4">
              <TabsList>
                <TabsTrigger value="pending">待处理</TabsTrigger>
                <TabsTrigger value="in_progress">进行中</TabsTrigger>
                <TabsTrigger value="completed">已完成</TabsTrigger>
              </TabsList>

              <TabsContent value="pending">
                {tasks.filter(t => t.status === 'pending').map(task => <TaskCard key={task.id} task={task} />)}
              </TabsContent>

              <TabsContent value="in_progress">
                {tasks.filter(t => t.status === 'in_progress').map(task => <TaskCard key={task.id} task={task} />)}
              </TabsContent>

              <TabsContent value="completed">
                {tasks.filter(t => t.status === 'completed').map(task => <TaskCard key={task.id} task={task} />)}
              </TabsContent>
            </Tabs>
          </div>
        </div>;
}