// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Progress, Alert, AlertDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { Trash2, MapPin, Clock, CheckCircle, AlertTriangle, Navigation } from 'lucide-react';

export default function Dashboard(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [stats, setStats] = useState({
    totalBins: 156,
    abnormalBins: 12,
    todayTasks: 8,
    completionRate: 87
  });
  const [tasks, setTasks] = useState([{
    id: 1,
    location: '光明路88号',
    type: '满溢报警',
    priority: 'high',
    time: '10:30',
    status: 'pending'
  }, {
    id: 2,
    location: '人民广场东侧',
    type: '设备故障',
    priority: 'medium',
    time: '11:15',
    status: 'pending'
  }, {
    id: 3,
    location: '科技园A区',
    type: '常规巡查',
    priority: 'low',
    time: '14:00',
    status: 'pending'
  }]);
  const handleTaskComplete = taskId => {
    setTasks(tasks.map(task => task.id === taskId ? {
      ...task,
      status: 'completed'
    } : task));
    toast({
      title: "任务完成",
      description: "巡查任务已成功标记为完成"
    });
  };
  const StatCard = ({
    icon: Icon,
    title,
    value,
    color,
    trend
  }) => <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {title}
            </CardTitle>
            <Icon className={`h-4 w-4 ${color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {trend && <p className="text-xs text-muted-foreground mt-1">
                {trend > 0 ? '+' : ''}{trend}% 较昨日
              </p>}
          </CardContent>
        </Card>;
  return <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            {/* 头部 */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">垃圾桶巡查监管平台</h1>
              <p className="text-gray-600 mt-1">实时监控 · 智能管理 · 高效运营</p>
            </div>

            {/* 统计卡片 */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <StatCard icon={Trash2} title="总垃圾桶数" value={stats.totalBins} color="text-blue-600" trend={5} />
              <StatCard icon={AlertTriangle} title="异常垃圾桶" value={stats.abnormalBins} color="text-red-600" trend={-12} />
              <StatCard icon={Clock} title="今日巡查任务" value={stats.todayTasks} color="text-green-600" trend={8} />
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">
                    处理完成率
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{stats.completionRate}%</div>
                  <Progress value={stats.completionRate} className="h-2 bg-white/20" />
                </CardContent>
              </Card>
            </div>

            {/* 主要内容区域 */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* 地图区域 */}
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      垃圾桶分布地图
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                      {/* 模拟地图 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
                        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>正常</span>
                          <div className="w-3 h-3 bg-red-500 rounded-full ml-2"></div>
                          <span>异常</span>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full ml-2"></div>
                          <span>待巡查</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 任务列表 */}
              <div>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>待办任务</span>
                      <Badge variant="secondary">{tasks.filter(t => t.status === 'pending').length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tasks.map(task => <div key={task.id} className="border rounded-lg p-3 hover:bg-gray-50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{task.location}</span>
                                <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'} className="text-xs">
                                  {task.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{task.type}</p>
                              <p className="text-xs text-gray-500 mt-1">{task.time}</p>
                            </div>
                            {task.status === 'pending' && <Button size="sm" variant="ghost" onClick={() => handleTaskComplete(task.id)}>
                                <CheckCircle className="h-4 w-4" />
                              </Button>}
                          </div>
                        </div>)}
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      <Navigation className="h-4 w-4 mr-2" />
                      开始巡查
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 底部提示 */}
            <Alert className="mt-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                系统检测到3个垃圾桶需要紧急处理，请尽快安排人员前往处理。
              </AlertDescription>
            </Alert>
          </div>
        </div>;
}