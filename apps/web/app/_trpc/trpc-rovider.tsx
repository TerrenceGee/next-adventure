import { trpc } from "./trpc";

// 定义一个对象
// type 类似于 typedef ，相当于一个结构体，即ts中的对象定义
type Props = {
    children: React.ReactNode;
};
export const TrpcProvider = ({ children }: Props) => {
    return (
        <trpc.Provider>

        </trpc.Provider>
    );

} 
