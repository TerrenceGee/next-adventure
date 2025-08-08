# GUIDE

这个 `tsconfig` 包是 **Cal.com 项目的 TypeScript 配置集中管理中心**，它通过标准化和复用 `tsconfig.json` 配置来维护整个 monorepo 的类型检查一致性。以下是详细解析：

## detail

---

### **1. 核心作用**

- **统一 TypeScript 配置**：为不同子包（Next.js 应用、React 库等）提供预设配置。
- **减少重复**：避免每个子包重复定义相同的编译器选项。
- **强制类型安全规范**：确保全项目遵循相同的严格类型检查规则。

---

### **2. 关键文件解析**

| 文件名               | 用途                                                                 |
|----------------------|----------------------------------------------------------------------|
| **`base.json`**      | 基础配置（所有子包继承），包含通用规则如严格模式、ES 版本等。         |
| **`nextjs.json`**    | Next.js 专用的扩展配置，启用 JSX 支持、路径别名等。                   |
| **`react-library.json`** | React 组件库的配置，优化类型声明生成（如 `declaration: true`）。      |
| **`package.json`**   | 声明这是一个配置包，可能包含共享的 TS 相关依赖。                      |
| **`README.md`**      | 说明如何扩展和使用这些配置。                                          |

---

### **3. 典型配置内容示例**

#### **`base.json`**

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "target": "es2020",
    "skipLibCheck": true
  }
}
```

#### **`nextjs.json`**

```json
{
  "extends": "@calcom/tsconfig/base.json",
  "compilerOptions": {
    "jsx": "preserve",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### **4. 在子包中的使用方式**

子包的 `tsconfig.json` 通过 `extends` 继承这些预设：

```json
// packages/web/tsconfig.json
{
  "extends": "@calcom/tsconfig/nextjs.json",
  "include": ["**/*.ts", "**/*.tsx"]
}
```

---

### **5. 设计优势**

| 优势                | 说明                                                                 |
|---------------------|----------------------------------------------------------------------|
| **一致性**          | 所有子包共享相同的严格类型规则，避免隐性 any 泄露。                  |
| **可维护性**        | 修改基础配置（如升级 TS 版本）只需改动一处。                         |
| **环境适配**        | 为不同场景（Next.js/React 库）提供优化配置。                         |
| **文档化**          | `README.md` 明确使用规范，降低协作成本。                            |

---

### **6. 技术栈定位**

- **适用工具**：TypeScript + Monorepo（通过 Turborepo/pnpm/yarn workspaces 管理）。
- **同类方案**：类似 ESLint 的共享配置模式（如 `eslint-config-airbnb`）。

---

### **常见问题**

**Q：为什么不直接在每个子包写完整的 `tsconfig.json`？**  
A：避免重复配置，确保升级时同步更新（例如统一开启 `strictNullChecks`）。

**Q：如何添加自定义规则？**  
A：子包在 `extends` 后追加覆盖配置：

```json
{
  "extends": "@calcom/tsconfig/nextjs.json",
  "compilerOptions": {
    "noUnusedLocals": false  // 覆盖基础配置
  }
}
```

这种集中化管理模式是大型 TypeScript 项目的行业最佳实践。
