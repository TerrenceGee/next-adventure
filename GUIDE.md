#

`calcom/cal.com` 是一个基于 **Next.js** 的开源日程安排工具（类似 Calendly），它的目录结构清晰，前端代码主要分布在 `apps/web` 目录下。以下是详细解析：

## 123

---

### **📂 项目目录结构概览**

```bash
calcom/
├── apps/
│   ├── web/               # 前端 Next.js 应用（核心）
│   ├── api/               # 后端 API (tRPC + Prisma)
│   └── ...                # 其他子应用（如 Booker 等）
├── packages/              # 共享代码（UI、工具、类型等）
├── prisma/                # 数据库 schema (PostgreSQL)
├── public/                # 静态资源（图片、字体等）
├── scripts/               # 部署/开发脚本
├── .env.example           # 环境变量示例
└── ...
```

---

### **🌐 前端核心目录：`apps/web`**

这是主要的 Next.js 前端应用，结构如下：

```bash
apps/web/
├── pages/                 # Next.js 页面路由（关键！）
│   ├── api/               # API 路由（Next.js API 路由）
│   ├── auth/              # 认证相关页面（登录/注册）
│   ├── booking/           # 预约页面（核心功能）
│   ├── event-types/       # 事件类型管理
│   ├── settings/          # 用户设置
│   └── ...                # 其他页面（如 404、仪表盘等）
│
├── components/            # 可复用 React 组件
│   ├── ui/                # 基础 UI 组件（按钮、模态框等）
│   ├── booking/           # 预约相关组件
│   └── ...
│
├── lib/                   # 前端工具函数
│   ├── trpc/              # tRPC 客户端配置
│   ├── i18n/              # 国际化
│   └── ...
│
├── styles/                # 全局 CSS/Tailwind 配置
├── public/                # 前端静态资源（覆盖根目录的 public）
├── next.config.js         # Next.js 配置
└── ...
```

---

### **🔍 关键页面路径**

| 页面功能          | 文件路径 (相对 `apps/web/pages`) |
|-------------------|----------------------------------|
| 主页              | `/index.tsx`                     |
| 用户预约页面       | `/booking/[uid].tsx`             |
| 事件类型管理       | `/event-types/[type].tsx`        |
| 登录/注册         | `/auth/[type].tsx`               |
| 用户设置          | `/settings/[section].tsx`        |

---

### **💡 技术栈特点**

1. **路由**：基于 Next.js 文件路由（`pages/` 目录）。  
2. **API 交互**：使用 `tRPC`（类型安全的 API 调用）替代传统 REST。  
3. **样式**：Tailwind CSS + 自定义组件库（部分在 `packages/ui`）。  
4. **状态管理**：React Query + Zustand（少量全局状态）。  
5. **数据库**：Prisma + PostgreSQL（后端在 `apps/api` 处理）。  

---

### **🚀 如何运行前端？**

```bash
# 1. 克隆项目
git clone https://github.com/calcom/cal.com.git
cd cal.com

# 2. 安装依赖
pnpm install

# 3. 运行前端开发服务器
pnpm dev:web
```

访问 `http://localhost:3000` 即可看到前端页面。

---

### **📌 总结**

- **前端入口**：`apps/web/pages/` 是 Next.js 页面核心，所有路由在此定义。  
- **组件化**：可复用代码放在 `apps/web/components/` 和 `packages/ui`。  
- **前后端分离**：前端通过 tRPC 调用 `apps/api` 的接口，而非直接操作数据库。  

如果需要深入某个功能（如预约流程），可以重点看 `apps/web/pages/booking/` 和相关的组件代码。
