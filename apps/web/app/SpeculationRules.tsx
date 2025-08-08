// 优化第三方脚本加载
import Script from "next/script";


export function SpeculationRules({ }: {}) {
    const speculationRules = {
        prefetch: [],
        prerender: [],
    };
    return (
        <Script
            dangerouslySetInnerHTML={{ __html: `${JSON.stringify(speculationRules)}`, }}
            type="speculationrules"
            id="speculation-rules" />
    );
}