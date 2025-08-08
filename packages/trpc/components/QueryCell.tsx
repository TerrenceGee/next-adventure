import type {
    QueryObserverLoadingErrorResult,
    QueryObserverPendingResult,
    QueryObserverRefetchErrorResult,
    QueryObserverSuccessResult,
    UseQueryResult
} from "@tanstack/react-query";
import type { ReactNode } from "react";
/*
- 自动处理数据请求状态 
- 支持自定义渲染逻辑
- 多语言支持
*/


// basic type
type ErrorLike = {
    message: string
};
type JSXElementOrNull = JSX.Element | null;

interface QueryCellOptionsBase<TData, TError extends ErrorLike> {
    query: UseQueryResult<TData, TError>;
    customLoader?: ReactNode;
    // 可选属性，其值是一个函数，括号中是函数的参数
    error?: (
        query: QueryObserverLoadingErrorResult<TData, TError> | QueryObserverRefetchErrorResult<TData, TError>
    ) => JSXElementOrNull;
    loading?: (query: QueryObserverPendingResult<TData, TError> | null) => JSXElementOrNull;
}

interface QueryCellOptionsNoEmpty<TData, TError extends ErrorLike> extends QueryCellOptionsBase<TData, TError> {
    success: (query: QueryObserverSuccessResult<TData, TError>) => JSXElementOrNull;
}