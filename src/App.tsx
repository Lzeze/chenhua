/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  Activity, 
  ShieldAlert, 
  Cpu, 
  Users, 
  TrendingDown, 
  Terminal, 
  ChevronRight,
  Zap,
  CheckCircle2,
  Lock,
  BellRing,
  RefreshCw,
  Globe,
  Info,
  X,
  BarChart2
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

type CommandState = 'init' | 'penetrate_a' | 'accelerate';

interface MarketData {
  competitorPriceDrop: number;
  inventoryRisk: '低' | '中' | '高' | '极高';
  competitorAction: string;
  lastUpdated: string;
}

export default function App() {
  const [commandState, setCommandState] = useState<CommandState>('init');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isRefreshingTalent, setIsRefreshingTalent] = useState(false);
  const [talentDataOffset, setTalentDataOffset] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    "[系统初始化] 载入历史失效分析报告...",
    "[系统初始化] 链接研发三部实时仿真数据...",
    "[系统初始化] 数字化大脑 启动完毕。"
  ]);
  const [notification, setNotification] = useState<{show: boolean, msg: string, type: 'success'|'warning'|'info'} | null>(null);

  // Market API State
  const [marketData, setMarketData] = useState<MarketData>({
    competitorPriceDrop: 15,
    inventoryRisk: '高',
    competitorAction: '低端放大器市场发生价格血战',
    lastUpdated: new Date().toLocaleTimeString()
  });
  const [isFetchingMarket, setIsFetchingMarket] = useState(false);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const showNotification = (msg: string, type: 'success'|'warning'|'info') => {
    setNotification({ show: true, msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Simulate fetching from a third-party market data API
  const fetchMarketData = async () => {
    setIsFetchingMarket(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const drops = [12, 15, 18, 20, 22, 25];
    const risks = ['中', '高', '极高'];
    const actions = [
      '低端放大器市场发生价格血战',
      '竞品B释放大量低端产能',
      '海外大厂试图通过引脚兼容抢单',
      '通用 MCU 现货库存持续积压'
    ];

    const randomDrop = drops[Math.floor(Math.random() * drops.length)];
    const randomRisk = risks[Math.floor(Math.random() * risks.length)] as any;
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    
    setMarketData({
      competitorPriceDrop: randomDrop,
      inventoryRisk: randomRisk,
      competitorAction: randomAction,
      lastUpdated: new Date().toLocaleTimeString()
    });
    
    setIsFetchingMarket(false);
  };

  useEffect(() => {
    // Initial fetch
    fetchMarketData();
    
    // Poll every 15 seconds to simulate real-time API updates
    const interval = setInterval(() => {
      fetchMarketData();
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  const handleCommand = (cmd: CommandState) => {
    setCommandState(cmd);
    if (cmd === 'penetrate_a') {
      addLog("执行指令：穿透 A...");
      setTimeout(() => {
        addLog(">> 发现异常：高低温设备被消费级芯片抢占；导致 AEC-Q100 报告缺失，标准合规审计节点严重滞后。");
        showNotification("发现 TTP 阻塞点：AEC-Q100 认证受阻！", "warning");
      }, 800);
    } else if (cmd === 'accelerate') {
      addLog("执行指令：加速...");
      setTimeout(() => {
        addLog(">> [TTP 拯救指令] 已下达！调配专有高低温设备，启动 AEC-Q100 审计绿色通道。");
        showNotification("TTP 状态发生重大变化：已从预警恢复正常！", "success");
      }, 800);
    } else {
      addLog("执行指令：初始化...");
      setTimeout(() => {
        addLog(">> 系统已重置为初始监控状态。");
      }, 800);
    }
  };

  const handleRefreshTalent = () => {
    setIsRefreshingTalent(true);
    addLog(">> 正在通过 API 拉取最新研发数字足迹...");
    setTimeout(() => {
      setTalentDataOffset(prev => prev + 1);
      setIsRefreshingTalent(false);
      addLog(">> 人才镜像数据已更新。");
      showNotification("工程师贡献数据已同步！", "success");
    }, 1500);
  };

  // Data models based on state
  const ttpData = {
    init: { 
      progress: 68, 
      nodes: [
        { 
          id: 'temp_val', name: '高低温验证', status: '滞后14天', reason: '设备排期冲突：当前仅有2台温箱可用', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', pulse: true,
          detailedAnalysis: {
            metrics: [{ label: '可用温箱', value: '2/5 台' }, { label: '排队项目', value: '12 个' }, { label: '预计延期', value: '14 天' }],
            description: '当前高低温测试设备严重不足，主要由于消费级芯片项目组临时抢占了3台设备，导致车规级 MCU 验证进度受阻。',
            action: '建议：跨部门协调设备，或外包部分非核心测试。'
          }
        },
        { 
          id: 'audit', name: '标准合规审计', status: '滞后7天', reason: 'AEC-Q100 报告缺失：前置高低温测试未完成，导致合规性文件无法提交。', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', pulse: true, tags: [{ label: 'AEC-Q100', status: 'error' }, { label: 'ISO26262', status: 'ok' }],
          detailedAnalysis: {
            metrics: [{ label: '测试机构', value: '第三方实验室' }, { label: '排队时间', value: '7 天' }, { label: '前置条件', value: '未满足' }],
            description: 'AEC-Q100 认证需要前置的高低温测试数据，目前数据缺失导致无法提交合规性文件。',
            action: '建议：优先解决高低温测试阻塞，并提前预约第三方实验室绿色通道。'
          }
        }
      ]
    },
    penetrate_a: { 
      progress: 68, 
      nodes: [
        { 
          id: 'temp_val', name: '高低温验证', status: '设备被挪用', reason: '优先级被消费级芯片项目组临时抢占', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', pulse: true,
          detailedAnalysis: {
            metrics: [{ label: '可用温箱', value: '0/5 台' }, { label: '抢占方', value: '消费级芯片组' }, { label: '状态', value: '完全阻塞' }],
            description: '优先级被消费级芯片项目组临时抢占，导致车规级 MCU 验证完全停滞。资源调度存在严重的不合理倾斜。',
            action: '紧急建议：提请 VP 级协调，强制收回至少 2 台设备。'
          }
        },
        { 
          id: 'audit', name: '标准合规审计', status: '报告驳回', reason: 'AEC-Q100 认证受阻：第三方实验室排队中，且早期送测批次因封装应力测试未达标被驳回。', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', pulse: true, tags: [{ label: 'AEC-Q100', status: 'error' }, { label: 'ISO26262', status: 'ok' }],
          detailedAnalysis: {
            metrics: [{ label: '测试机构', value: '第三方实验室' }, { label: '驳回原因', value: '应力测试未达标' }, { label: '预计等待', value: '5 天' }],
            description: 'AEC-Q100 认证受阻：第三方实验室排队中，且早期送测批次因封装应力测试未达标被驳回。需要重新流片验证。',
            action: '紧急建议：重新评估封装方案，并加急重新送测。'
          }
        }
      ]
    },
    accelerate: { 
      progress: 85, 
      nodes: [
        { 
          id: 'temp_val', name: '高低温验证', status: '强制恢复', reason: '已跨部门调配专有温箱设备', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', pulse: false,
          detailedAnalysis: {
            metrics: [{ label: '可用温箱', value: '5/5 台' }, { label: '调度状态', value: '专有独占' }, { label: '预计完成', value: '48 小时' }],
            description: '已跨部门调配专有温箱设备，当前测试资源充足，正在 24 小时满负荷运行。',
            action: '状态：风险已解除，持续监控测试进度。'
          }
        },
        { 
          id: 'audit', name: '标准合规审计', status: '加急处理', reason: 'AEC-Q100 绿色通道已开启：已协调加急重测，预计 48 小时内出具临时合规报告。', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', pulse: false, tags: [{ label: 'AEC-Q100', status: 'ok' }, { label: 'ISO26262', status: 'ok' }],
          detailedAnalysis: {
            metrics: [{ label: '测试机构', value: '第三方实验室' }, { label: '通道状态', value: '绿色加急' }, { label: '预计出表', value: '48 小时' }],
            description: 'AEC-Q100 绿色通道已开启：已协调加急重测，预计 48 小时内出具临时合规报告。',
            action: '状态：风险已解除，准备接收合规报告。'
          }
        }
      ]
    }
  };

  const radarData = {
    init: { 
      successRate: 34, 
      ragCalls: 0, 
      warning: '经验孤岛',
      chartData: [
        { subject: '设计规范', A: 40, fullMark: 100 },
        { subject: '仿真覆盖', A: 30, fullMark: 100 },
        { subject: '历史缺陷规避', A: 20, fullMark: 100 },
        { subject: '测试用例完备', A: 50, fullMark: 100 },
        { subject: '资源就绪度', A: 45, fullMark: 100 },
      ]
    },
    penetrate_a: { 
      successRate: 34, 
      ragCalls: 0, 
      warning: '未强制关联',
      chartData: [
        { subject: '设计规范', A: 40, fullMark: 100 },
        { subject: '仿真覆盖', A: 30, fullMark: 100 },
        { subject: '历史缺陷规避', A: 10, fullMark: 100 }, // Dropped
        { subject: '测试用例完备', A: 50, fullMark: 100 },
        { subject: '资源就绪度', A: 20, fullMark: 100 }, // Dropped
      ]
    },
    accelerate: { 
      successRate: 82, 
      ragCalls: 156, 
      warning: '风险解除',
      chartData: [
        { subject: '设计规范', A: 90, fullMark: 100 },
        { subject: '仿真覆盖', A: 85, fullMark: 100 },
        { subject: '历史缺陷规避', A: 95, fullMark: 100 },
        { subject: '测试用例完备', A: 80, fullMark: 100 },
        { subject: '资源就绪度', A: 85, fullMark: 100 },
      ]
    }
  };

  const talentData = {
    init: [
      { id: 'ENG-0042', rag: 985 + talentDataOffset * 12, eff: 14 + talentDataOffset, status: '👑 核心脊梁', color: 'text-emerald-600' },
      { id: 'ENG-0117', rag: 620 + talentDataOffset * 5, eff: 11 + Math.floor(talentDataOffset/2), status: '骨干力量', color: 'text-slate-500' },
      { id: 'ENG-0089', rag: 45 + talentDataOffset, eff: 2, status: '🔴 流程阻塞点', color: 'text-red-600 animate-pulse' }
    ],
    penetrate_a: [
      { id: 'ENG-0042', rag: 985 + talentDataOffset * 12, eff: 14 + talentDataOffset, status: '👑 核心脊梁', color: 'text-emerald-600' },
      { id: 'ENG-0117', rag: 620 + talentDataOffset * 5, eff: 11 + Math.floor(talentDataOffset/2), status: '骨干力量', color: 'text-slate-500' },
      { id: 'ENG-0089', rag: 45 + talentDataOffset, eff: 2, status: '🔴 拒绝调用RAG', color: 'text-red-600 animate-pulse' }
    ],
    accelerate: [
      { id: 'ENG-0042', rag: 1120 + talentDataOffset * 15, eff: 16 + talentDataOffset, status: '👑 倾斜期权', color: 'text-emerald-600' },
      { id: 'ENG-0117', rag: 750 + talentDataOffset * 8, eff: 12 + Math.floor(talentDataOffset/2), status: '骨干力量', color: 'text-slate-500' },
      { id: 'ENG-0089', rag: '-', eff: '-', status: '⚠️ PIP 淘汰中', color: 'text-amber-600' }
    ]
  };

  const currentTTP = ttpData[commandState];
  const currentRadar = radarData[commandState];
  const currentTalent = talentData[commandState];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-mono selection:bg-blue-500/30 flex flex-col relative overflow-x-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 pointer-events-none"></div>
      
      {/* Real-time Notification Popup */}
      <AnimatePresence>
        {notification && notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-xl border flex items-center gap-3 backdrop-blur-md ${
              notification.type === 'success' 
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-700 shadow-emerald-500/20' 
                : 'bg-red-50/90 border-red-200 text-red-700 shadow-red-500/20'
            }`}
          >
            {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <BellRing className="w-5 h-5 animate-bounce" />}
            <span className="font-bold tracking-wide">{notification.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Status Bar */}
      <header className="border-b border-slate-200 bg-white/80 p-3 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-blue-600 font-bold tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <Activity className="w-4 h-4" />
            <span className="text-xs">系统运行状态：正常</span>
          </div>
          <div className={`flex items-center gap-2 font-bold tracking-widest px-3 py-1 rounded-full border ${
            commandState === 'accelerate' 
              ? 'text-emerald-600 bg-emerald-50 border-emerald-100' 
              : 'text-red-600 bg-red-50 border-red-100 animate-pulse'
          }`}>
            <ShieldAlert className="w-4 h-4" />
            <span className="text-xs">当前北极星指标：{commandState === 'accelerate' ? 'TTP 恢复' : 'TTP 预警'}</span>
          </div>
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-2 font-bold bg-slate-100 px-3 py-1 rounded-full">
          <Lock className="w-3 h-3" />
          数字化大脑 
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-screen-2xl mx-auto w-full relative z-10">
        
        {/* Module A: TTP Dashboard */}
        <motion.section 
          layout
          className="border border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm rounded-2xl p-6 flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
          <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
            <CompassIcon /> 模块 A：北极星实时罗盘 (TTP Dashboard)
          </h2>
          <div className="text-xs text-slate-500 mb-8 font-semibold bg-slate-100 inline-block px-2 py-1 rounded">监控对象：ZH-RV32M 高可靠 RISC-V MCU 系列</div>
          
          <div className="flex items-center justify-between mb-10 relative px-4">
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 -z-10 -translate-y-1/2"></div>
            {['立项', '设计', '流片'].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-500 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs text-slate-600 font-bold">{step}</span>
              </div>
            ))}
            
            {/* The Bottleneck Nodes */}
            {currentTTP.nodes.map((node) => (
              <div 
                key={node.id} 
                className="flex flex-col items-center gap-2 bg-white px-1 relative group cursor-pointer"
                onClick={() => setSelectedNodeId(selectedNodeId === node.id ? null : node.id)}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm transition-all duration-300 ${selectedNodeId === node.id ? 'scale-110 ring-4 ring-blue-500/20' : 'hover:scale-105'} ${node.bg} ${node.border} ${node.color} ${node.pulse ? 'animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]' : ''}`}>
                  {commandState === 'accelerate' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                </div>
                <div className="text-center">
                  <span className={`text-[10px] font-bold ${node.color} block leading-tight`}>{node.name}</span>
                  <span className={`text-[10px] font-bold ${node.color} block opacity-80 leading-tight mt-0.5`}>{node.status}</span>
                </div>
                
                {/* Tooltip for specific reason */}
                {selectedNodeId !== node.id && (
                  <div className="absolute top-full mt-2 w-48 bg-slate-800 text-white text-[10px] p-2.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="font-bold mb-1.5 border-b border-slate-600 pb-1.5 text-slate-200 flex items-center gap-1">
                      <Activity className="w-3 h-3" /> 点击查看详细分析
                    </div>
                    <div className="leading-relaxed text-slate-300 mb-2">{node.reason}</div>
                    
                    {/* Render tags if available (e.g. AEC-Q100 status) */}
                    {node.tags && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {node.tags.map((tag, idx) => (
                          <span key={idx} className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${tag.status === 'error' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                            {tag.label}: {tag.status === 'error' ? '缺失/异常' : '正常'}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-800"></div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-col items-center gap-2 bg-white px-2 opacity-60">
              <div className="w-8 h-8 rounded-full border border-slate-300 border-dashed flex items-center justify-center text-slate-400 bg-slate-50">
                <TrendingDown className="w-4 h-4" />
              </div>
              <span className="text-xs text-slate-500 font-bold">量产</span>
            </div>
          </div>

          {/* Detailed Analysis Panel */}
          <AnimatePresence>
            {selectedNodeId && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="mb-6 overflow-hidden"
              >
                {currentTTP.nodes.filter(n => n.id === selectedNodeId).map(node => (
                  <div key={node.id} className={`p-4 rounded-xl border relative ${node.bg.replace('50', '100/50')} ${node.border}`}>
                    <button 
                      onClick={() => setSelectedNodeId(null)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart2 className={`w-4 h-4 ${node.color}`} />
                      <h3 className={`font-bold text-sm ${node.color}`}>{node.name} - 深度诊断报告</h3>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {node.detailedAnalysis.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-white/60 rounded-lg p-2 border border-white/40 shadow-sm">
                          <div className="text-[10px] text-slate-500 font-bold mb-1">{metric.label}</div>
                          <div className={`text-sm font-black ${node.color}`}>{metric.value}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-white/60 rounded-lg p-3 border border-white/40 shadow-sm mb-3">
                      <div className="text-xs font-bold text-slate-700 mb-1">根因分析 (Root Cause)</div>
                      <div className="text-xs text-slate-600 leading-relaxed">{node.detailedAnalysis.description}</div>
                    </div>
                    
                    <div className={`text-xs font-bold flex items-start gap-2 ${commandState === 'accelerate' ? 'text-emerald-700' : 'text-red-700'}`}>
                      <Zap className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{node.detailedAnalysis.action}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between text-xs font-bold mb-2 text-slate-700">
              <span>TTP 总进度</span>
              <span className={commandState === 'accelerate' ? 'text-emerald-600' : 'text-red-600'}>{currentTTP.progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                className={`h-full ${commandState === 'accelerate' ? 'bg-emerald-500' : 'bg-red-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${currentTTP.progress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </motion.section>

        {/* Module B: R&D Radar */}
        <motion.section 
          layout
          className="border border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm rounded-2xl p-6 flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400"></div>
          <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-500" /> 模块 B：研发“排雷”监控器 (R&D Radar)
          </h2>
          <div className="text-xs text-slate-500 mb-4 font-semibold bg-slate-100 inline-block px-2 py-1 rounded">交互式雷达：点击区域查看详情</div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-1 flex flex-col gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm h-full relative overflow-hidden">
                {currentRadar.successRate < 50 && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
                )}
                {currentRadar.successRate >= 50 && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                )}
                <span className="text-[10px] text-slate-500 font-bold mb-2">一板流片成功率预测</span>
                <motion.span 
                  key={currentRadar.successRate}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`text-3xl font-black ${currentRadar.successRate < 50 ? 'text-red-600' : 'text-emerald-600'}`}
                >
                  {currentRadar.successRate}%
                </motion.span>
                
                <div className="mt-2 h-10 flex items-center justify-center">
                  {currentRadar.successRate < 50 ? (
                    <div className="flex flex-col items-center animate-pulse">
                      <span className="flex items-center gap-1 text-[10px] text-red-700 font-bold bg-red-100 border border-red-300 px-2 py-1 rounded shadow-sm">
                        <AlertTriangle className="w-3 h-3" /> 极高报废风险 (预计损失 &gt; 500W)
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-100 border border-emerald-300 px-2 py-1 rounded shadow-sm">
                        <CheckCircle2 className="w-3 h-3" /> 风险解除
                      </span>
                      <span className="text-[8px] text-emerald-600 mt-1 font-semibold">成功案例：RV32M 引入 RAG，一次性点亮</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm h-full">
                <span className="text-[10px] text-slate-500 font-bold mb-2">RAG 知识库调用 (近72h)</span>
                <motion.span 
                  key={currentRadar.ragCalls}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`text-3xl font-black ${currentRadar.ragCalls === 0 ? 'text-red-600' : 'text-blue-600'}`}
                >
                  {currentRadar.ragCalls}
                </motion.span>
                <span className="text-[9px] text-slate-400 font-bold mt-1">次</span>
              </div>
            </div>

            <div className="col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-2 shadow-sm h-48 flex items-center justify-center relative group">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={currentRadar.chartData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="当前评估" dataKey="A" stroke={commandState === 'accelerate' ? '#10b981' : '#f59e0b'} fill={commandState === 'accelerate' ? '#10b981' : '#f59e0b'} fillOpacity={0.4} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '10px', color: '#f8fafc', fontWeight: 'bold' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <div className="absolute top-2 right-2 text-slate-400 opacity-50 group-hover:opacity-100 transition-opacity">
                <Info className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className={`mt-auto p-4 rounded-xl border shadow-sm ${commandState === 'accelerate' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
            <div className="flex items-center gap-2 font-bold text-sm mb-2">
              {commandState === 'accelerate' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              系统判定：[{commandState === 'accelerate' ? '正常' : '黄色警示 🟡'}] [风险：{currentRadar.warning}]
            </div>
            <p className="text-xs font-medium opacity-90 leading-relaxed">
              {commandState === 'accelerate' 
                ? '已强制引入 RAG 审查机制，流片预算解冻，风险解除。' 
                : '研发三部正在无视历史失效分析报告，重复踩坑。建议立即冻结流片预算，强制引入 RAG 审查机制，并协调高低温设备排期。'}
            </p>
          </div>
        </motion.section>

        {/* Module C: Market Map */}
        <motion.section 
          layout
          className="border border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm rounded-2xl p-6 flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-400"></div>
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-indigo-500" /> 模块 C：市场“降维打击”看板
            </h2>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-full">
              <Globe className="w-3 h-3" />
              <span>API 实时连接</span>
              {isFetchingMarket ? (
                <RefreshCw className="w-3 h-3 animate-spin ml-1" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-emerald-500 ml-1 animate-pulse"></span>
              )}
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between text-xs font-bold mb-3">
              <span className="text-slate-600">RISC-V 芯片 + AI 算法套件客户渗透率</span>
              <span className="text-indigo-600">18.5% <span className="text-slate-400 font-normal">/ 目标 45%</span></span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
              <div className="h-full bg-indigo-500 w-[18.5%] relative">
                <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-sm relative overflow-hidden">
              <div className="text-[10px] text-slate-500 font-bold mb-1">竞品价格波动 (API)</div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-red-600">-{marketData.competitorPriceDrop}%</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 truncate" title={marketData.competitorAction}>
                {marketData.competitorAction}
              </div>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-sm relative overflow-hidden">
              <div className="text-[10px] text-slate-500 font-bold mb-1">库存跌价风险 (API)</div>
              <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-black ${marketData.inventoryRisk === '极高' || marketData.inventoryRisk === '高' ? 'text-red-600' : 'text-amber-500'}`}>
                  {marketData.inventoryRisk}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                更新于 {marketData.lastUpdated}
              </div>
            </div>
          </div>

          <div className="mt-auto p-4 rounded-xl border shadow-sm bg-amber-50 border-amber-200 text-amber-700">
            <div className="flex items-center gap-2 font-bold text-sm mb-2">
              <AlertTriangle className="w-4 h-4" />
              市场副总决策辅助：[黄色警示 🟡] 毛利保卫战
            </div>
            <p className="text-xs font-medium opacity-90 leading-relaxed">
              渗透率尚未形成绝对壁垒。严禁在裸芯片上进行降价拼杀！必须通过“芯片+TinyML算法”的软硬一体化方案锁定 Tier-1 客户，死守 31% 的核心毛利率。
            </p>
          </div>
        </motion.section>

        {/* Module D: Mirror Profile */}
        <motion.section 
          layout
          className="border border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm rounded-2xl p-6 flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-500" /> 模块 D：人才镜像 (Mirror Profile)
            </h2>
            <button 
              onClick={handleRefreshTalent}
              disabled={isRefreshingTalent}
              className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingTalent ? 'animate-spin' : ''}`} />
              <span>{isRefreshingTalent ? '同步中...' : '刷新数据'}</span>
            </button>
          </div>
          <div className="text-xs text-slate-500 font-semibold bg-slate-100 inline-block px-2 py-1 rounded mb-6 self-start">监控对象：核心研发团队数字足迹（不看打卡，看贡献）</div>
          
          <div className="overflow-x-auto relative">
            {isRefreshingTalent && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-lg">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-white px-4 py-2 rounded-full shadow-md border border-emerald-100">
                  <RefreshCw className="w-4 h-4 animate-spin" /> 正在拉取最新贡献值...
                </div>
              </div>
            )}
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-slate-100 text-slate-500">
                  <th className="pb-3 font-bold">工程师代码</th>
                  <th className="pb-3 font-bold">知识贡献值</th>
                  <th className="pb-3 font-bold">仿真效率</th>
                  <th className="pb-3 font-bold">系统判定</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {currentTalent.map((t) => (
                    <motion.tr 
                      key={t.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-4 font-bold text-slate-700">{t.id}</td>
                      <td className="py-4 text-slate-600 font-medium">{t.rag}</td>
                      <td className="py-4 text-slate-600 font-medium">{t.eff}</td>
                      <td className={`py-4 font-bold ${t.color}`}>{t.status}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.section>
      </main>

      {/* Action Console */}
      <footer className="border-t border-slate-200 bg-white/90 backdrop-blur-md p-6 relative z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-8">
          
          {/* Terminal Logs (Keep dark for tech contrast) */}
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-4 h-36 overflow-y-auto font-mono text-xs text-slate-400 flex flex-col gap-1.5 shadow-inner">
            <div className="flex items-center gap-2 text-slate-500 mb-2 border-b border-slate-800 pb-2 font-bold tracking-widest">
              <Terminal className="w-4 h-4" /> 战略指挥终端日志
            </div>
            {logs.map((log, i) => (
              <div key={i} className={log.includes('>>') ? 'text-emerald-400 ml-4 font-bold' : ''}>
                {log}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 min-w-[320px]">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">战略交互终端 (Action Required)</div>
            
            <button 
              onClick={() => handleCommand('init')}
              className={`text-left px-5 py-2.5 rounded-lg text-sm border-2 transition-all flex items-center justify-between group font-bold ${commandState === 'init' ? 'bg-slate-800 border-slate-800 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
            >
              <span>&gt; 初始化看板</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <button 
              onClick={() => handleCommand('penetrate_a')}
              className={`text-left px-5 py-2.5 rounded-lg text-sm border-2 transition-all flex items-center justify-between group font-bold ${commandState === 'penetrate_a' ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'}`}
            >
              <span>&gt; 穿透 A (查看研发细节)</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <button 
              onClick={() => handleCommand('accelerate')}
              className={`text-left px-5 py-2.5 rounded-lg text-sm border-2 transition-all flex items-center justify-between group font-bold ${commandState === 'accelerate' ? 'bg-red-50 border-red-500 text-red-700 shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50'}`}
            >
              <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> 指令：加速 (强行调度资源)</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
        
        <div className="text-center text-[10px] text-slate-400 font-bold mt-6 tracking-widest uppercase">
          [数据环境：私有云物理隔离 | 国产算力集群运行中]
        </div>
      </footer>
    </div>
  );
}

function CompassIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  );
}

