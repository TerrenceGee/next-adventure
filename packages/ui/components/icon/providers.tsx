import { TrpcProvider } from "app/_trpc/trpc-provider";
import { SessionProvider } from "next-auth/react";
type ProvidersProps = {
    isEmbed: boolean;
    children: React.ReactNode;
};

export function Providers({ }: ProvidersProps) {
    return (
        <SessionProvider>
            <TrpcProvider>

            </TrpcProvider>

        </SessionProvider>

    );
}