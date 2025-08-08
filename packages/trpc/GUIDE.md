# 123

这个 `trpc` 包是 Cal.com（原 Calendly 替代品）的核心 API 通信层，基于 **tRPC + Next.js 全栈架构**设计。以下是目录结构的专业解读：

## 1234

---

### **1. 整体架构**

```
trpc/
├─components/          # 共享的 React UI 组件（与 tRPC 绑定）
├─react/               # 前端 tRPC 客户端逻辑
│  └─hooks/            # 封装 tRPC 的 React Hooks
└─server/              # tRPC 服务端实现
    ├─adapters/        # 第三方服务适配器（如 Stripe、Google）
    ├─middlewares/     # tRPC 中间件（认证、日志等）
    └─routers/         # 核心路由分层（按业务域拆分）
```

---

### **2. 关键目录解析**

#### **(1) `server/routers/` - 业务路由分层**

采用 **垂直领域（Vertical Slicing）** 设计，每个子目录对应一个业务模块：

- **`loggedInViewer/`**  
  登录用户专属 API（如仪表盘数据）
- **`publicViewer/`**  
  公开 API（如事件类型查询）
- **`viewer/`**  
  混合权限 API（根据上下文动态鉴权）
  - `admin/`：管理员操作
  - `bookings/`：预约管理
  - `teams/`：团队协作
  - `workflows/`：自动化流程

**特点**：  

- 每个模块包含 `procedures/`（具体 API 实现）和 `__tests__/`（单元测试）。
- 例如 `bookings/procedures/create.ts` 对应创建预约的 tRPC 过程。

#### **(2) `server/middlewares/` - 跨切面逻辑**

- **认证中间件**：校验 JWT、API Key  
- **日志中间件**：记录请求耗时  
- **限流中间件**：防止 API 滥用  
- **权限中间件**（如 `pbac/`）：基于策略的访问控制

#### **(3) `react/hooks/` - 前端封装**

提供类型安全的 React Hooks，例如：

```typescript
// 调用后端 'viewer.eventTypes.get' 过程
const { data } = trpc.viewer.eventTypes.get.useQuery();
```

自动继承后端类型，无需手动定义请求/响应类型。

---

### **3. 技术亮点**

#### **(1) 类型安全的全栈通信**

- 后端定义过程（Procedure）：

  ```typescript
  // server/routers/viewer/eventTypes/procedures/get.ts
  export const get = t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return prisma.eventType.findUnique({ where: { id: input.id } });
    });
  ```

- 前端直接调用：

  ```typescript
  const event = trpc.viewer.eventTypes.get.useQuery({ id: "123" });
  // event.data 类型自动推断为 Prisma 返回的 EventType
  ```

#### **(2) 分层权限控制**

通过 tRPC 上下文（Context）动态注入用户权限：

```typescript
// server/middlewares/auth.ts
export const authMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next({ ctx: { user: ctx.user } }); // 向下传递用户信息
});
```

#### **(3) 模块化设计**

- **适配器模式**：`adapters/` 隔离第三方服务（如支付、日历）。  
- **依赖注入**：通过 tRPC 上下文共享数据库（Prisma）、配置等。

---

### **4. 与 Next.js 的集成**

Cal.com 使用 Next.js 的 **App Router** 托管 tRPC：

```
app/
└─api/
    └─trpc/
        └─[trpc]/
            └─route.ts  # tRPC 请求入口
```

通过 `@trpc/next` 适配器将 tRPC 路由挂载到 `/api/trpc`，实现无缝集成。

---

### **5. 性能优化**

- **请求批处理**：自动合并前端多个 tRPC 调用为单个 HTTP 请求。  
- **缓存策略**：利用 React Query 的缓存机制（`staleTime`、`refetchOnWindowFocus`）。  
- **代码分割**：按路由懒加载 tRPC 过程。

---

### **总结**

该目录结构体现了 **现代全栈应用的最佳实践**：

1. **类型安全**：tRPC + TypeScript 覆盖前后端。  
2. **领域驱动**：路由按业务域垂直拆分。  
3. **分层清晰**：中间件、适配器、Hooks 各司其职。  
4. **高效协作**：前端直接调用后端方法，省去 API 契约维护。  

这种设计特别适合复杂 SaaS 系统（如 Cal.com），既能保证开发效率，又能维护长期代码质量。
