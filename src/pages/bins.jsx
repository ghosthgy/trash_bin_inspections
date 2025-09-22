// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, MapPin, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function BinsList(props) {
  const {
    $w
  } = props;
  const [bins, setBins] = useState([{
    id: 1,
    location: '光明路88号',
    status: 'normal',
    fillLevel: 45,
    lastCollection: '2024-01-15 09:30',
    temperature: 22,
    humidity: 65
  }, {
    id: 2,
    location: '人民广场东侧',
    status: 'full',
    fillLevel: 95,
    lastCollection: '2024-01-14 16:45',
    temperature: 25,
    humidity: 70
  }, {
    id: 3,
    location: '科技园A区',
    status: 'error',
    fillLevel: 30,
    lastCollection: '2024-01-15 08:15',
    temperature: 20,
    humidity: 60
  }]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const getStatusBadge = status => {
    const statusMap = {
      normal: {
        label: '正常',
        color: 'default'
      },
      full: {
        label: '满溢',
        color: 'destructive'
      },
      error: {
        label: '故障',
        color: 'destructive'
      },
      offline: {
        label: '离线',
        color: 'secondary'
      }
    };
    return statusMap[status] || statusMap.normal;
  };
  const filteredBins = bins.filter(bin => {
    const matchesSearch = bin.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bin.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  return <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">垃圾桶管理</h1>
              <p className="text-gray-600 mt-1">查看和管理所有垃圾桶状态</p>
            </div>

            {/* 筛选栏 */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="搜索位置..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="状态筛选" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部</SelectItem>
                      <SelectItem value="normal">正常</SelectItem>
                      <SelectItem value="full">满溢</SelectItem>
                      <SelectItem value="error">故障</SelectItem>
                      <SelectItem value="offline">离线</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    高级筛选
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 垃圾桶列表 */}
            <Card>
              <CardHeader>
                <CardTitle>垃圾桶列表</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>位置</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>填充度</TableHead>
                      <TableHead>温度</TableHead>
                      <TableHead>湿度</TableHead>
                      <TableHead>上次清运</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBins.map(bin => <TableRow key={bin.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            {bin.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(bin.status).color}>
                            {getStatusBadge(bin.status).label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className={`h-2 rounded-full ${bin.fillLevel > 80 ? 'bg-red-500' : bin.fillLevel > 60 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{
                        width: `${bin.fillLevel}%`
                      }} />
                            </div>
                            <span className="text-sm">{bin.fillLevel}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{bin.temperature}°C</TableCell>
                        <TableCell>{bin.humidity}%</TableCell>
                        <TableCell>{bin.lastCollection}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">查看详情</Button>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>;
}