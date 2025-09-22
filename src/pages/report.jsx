// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { Camera, MapPin, Upload, AlertCircle, CheckCircle, Clock, ChevronRight } from 'lucide-react';

export default function Report(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [step, setStep] = useState(1);
  const [reportData, setReportData] = useState({
    type: '',
    description: '',
    location: '',
    images: [],
    urgency: 'medium'
  });
  const [reports, setReports] = useState([{
    id: 1,
    type: '满溢',
    location: '光明路88号',
    status: 'pending',
    time: '2024-01-15 10:30',
    description: '垃圾桶已满，垃圾溢出'
  }, {
    id: 2,
    type: '损坏',
    location: '人民广场东侧',
    status: 'processing',
    time: '2024-01-15 09:15',
    description: '垃圾桶盖子损坏'
  }]);
  const problemTypes = [{
    value: 'overflow',
    label: '满溢',
    icon: '🗑️'
  }, {
    value: 'damage',
    label: '损坏',
    icon: '🔧'
  }, {
    value: 'smell',
    label: '异味',
    icon: '👃'
  }, {
    value: 'location',
    label: '位置不当',
    icon: '📍'
  }, {
    value: 'other',
    label: '其他',
    icon: '❓'
  }];
  const handleImageUpload = e => {
    const files = Array.from(e.target.files);
    if (files.length + reportData.images.length > 3) {
      toast({
        title: "上传限制",
        description: "最多只能上传3张照片",
        variant: "destructive"
      });
      return;
    }
    const newImages = files.map(file => URL.createObjectURL(file));
    setReportData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };
  const handleSubmit = () => {
    if (!reportData.type || !reportData.description) {
      toast({
        title: "信息不完整",
        description: "请填写问题类型和描述",
        variant: "destructive"
      });
      return;
    }
    const newReport = {
      id: Date.now(),
      type: problemTypes.find(t => t.value === reportData.type)?.label || '其他',
      location: reportData.location || '自动定位中...',
      status: 'pending',
      time: new Date().toLocaleString('zh-CN'),
      description: reportData.description,
      images: reportData.images
    };
    setReports([newReport, ...reports]);
    setReportData({
      type: '',
      description: '',
      location: '',
      images: [],
      urgency: 'medium'
    });
    setStep(1);
    toast({
      title: "上报成功",
      description: "您的异常上报已提交，我们会尽快处理"
    });
  };
  const getStatusBadge = status => {
    const statusMap = {
      pending: {
        label: '待处理',
        color: 'secondary'
      },
      processing: {
        label: '处理中',
        color: 'default'
      },
      completed: {
        label: '已完成',
        color: 'default'
      }
    };
    return statusMap[status] || statusMap.pending;
  };
  const StepIndicator = () => <div className="flex items-center justify-center mb-6">
      {[1, 2, 3].map(s => <React.Fragment key={s}>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= s ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
            {s}
          </div>
          {s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-blue-500' : 'bg-gray-200'}`} />}
        </React.Fragment>)}
    </div>;
  return <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">异常上报</h1>
          <p className="text-gray-600 mt-1">快速上报垃圾桶异常情况</p>
        </div>

        <div className="grid gap-6">
          {/* 上报表单 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>上报新异常</span>
                <span className="text-sm font-normal text-gray-500">
                  步骤 {step}/3
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StepIndicator />
              
              {step === 1 && <div className="space-y-4">
                  <h3 className="font-medium mb-3">选择问题类型</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {problemTypes.map(type => <button key={type.value} onClick={() => setReportData(prev => ({
                  ...prev,
                  type: type.value
                }))} className={`p-4 border rounded-lg text-center transition-all ${reportData.type === type.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="text-2xl mb-2">{type.icon}</div>
                        <div className="text-sm font-medium">{type.label}</div>
                      </button>)}
                  </div>
                </div>}

              {step === 2 && <div className="space-y-4">
                  <h3 className="font-medium mb-3">拍照和描述</h3>
                  
                  {/* 拍照区域 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">上传照片（最多3张）</label>
                    <div className="grid grid-cols-3 gap-2">
                      {reportData.images.map((img, index) => <div key={index} className="relative">
                          <img src={img} alt={`照片${index + 1}`} className="w-full h-24 object-cover rounded" />
                          <button onClick={() => setReportData(prev => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== index)
                    }))} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs">
                            ×
                          </button>
                        </div>)}
                      {reportData.images.length < 3 && <label className="border-2 border-dashed border-gray-300 rounded-lg h-24 flex items-center justify-center cursor-pointer hover:border-gray-400">
                          <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                          <Camera className="h-6 w-6 text-gray-400" />
                        </label>}
                    </div>
                  </div>

                  {/* 问题描述 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">问题描述</label>
                    <Textarea placeholder="请详细描述遇到的问题..." value={reportData.description} onChange={e => setReportData(prev => ({
                  ...prev,
                  description: e.target.value
                }))} rows={4} />
                  </div>

                  {/* 紧急程度 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">紧急程度</label>
                    <Select value={reportData.urgency} onValueChange={value => setReportData(prev => ({
                  ...prev,
                  urgency: value
                }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">一般</SelectItem>
                        <SelectItem value="medium">紧急</SelectItem>
                        <SelectItem value="high">非常紧急</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>}

              {step === 3 && <div className="space-y-4">
                  <h3 className="font-medium mb-3">确认位置信息</h3>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">当前位置</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {reportData.location || '正在获取位置信息...'}
                    </p>
                    <Button size="sm" variant="outline" className="mt-2" onClick={() => {
                  // 模拟获取位置
                  setReportData(prev => ({
                    ...prev,
                    location: '广东省深圳市南山区科技园中区'
                  }));
                }}>
                      重新定位
                    </Button>
                  </div>

                  {/* 信息确认 */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">上报信息确认</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">问题类型：</span>{problemTypes.find(t => t.value === reportData.type)?.label}</p>
                      <p><span className="font-medium">紧急程度：</span>{reportData.urgency === 'high' ? '非常紧急' : reportData.urgency === 'medium' ? '紧急' : '一般'}</p>
                      <p><span className="font-medium">描述：</span>{reportData.description}</p>
                      <p><span className="font-medium">照片：</span>{reportData.images.length}张</p>
                    </div>
                  </div>
                </div>}

              {/* 操作按钮 */}
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
                  上一步
                </Button>
                {step < 3 ? <Button onClick={() => setStep(step + 1)}>
                    下一步
                  </Button> : <Button onClick={handleSubmit}>
                    提交上报
                  </Button>}
              </div>
            </CardContent>
          </Card>

          {/* 上报记录 */}
          <Card>
            <CardHeader>
              <CardTitle>上报记录</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reports.map(report => <div key={report.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{report.type}</span>
                          <Badge variant={getStatusBadge(report.status).color}>
                            {getStatusBadge(report.status).label}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{report.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {report.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {report.time}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
}