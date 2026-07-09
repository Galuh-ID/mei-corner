import React, { useEffect, useState } from 'react';
import type { Data, Layout, Config } from 'plotly.js';
import type { PlotParams } from 'react-plotly.js';

interface ChartProps {
    data: Data[];
    layout?: Partial<Layout>;
    config?: Partial<Config>;
}

export default function PlotlyChart({ data, layout, config }: ChartProps) {
    const [PlotComponent, setPlotComponent] = useState<React.ComponentType<PlotParams> | null>(null);

    useEffect(() => {
        Promise.all([
            import('plotly.js-dist-min'),
            import('react-plotly.js/factory')
        ]).then(([PlotlyModule, createPlotlyComponent]) => {
            const Plotly = PlotlyModule.default || PlotlyModule;
            const factory = createPlotlyComponent.default || createPlotlyComponent;
        
            setPlotComponent(() => factory(Plotly));
        });
    }, []);

    const defaultLayout: Partial<Layout> = {
        font: { family: 'Inter, system-ui, sans-serif', color: '#000000' },
        paper_bgcolor: '#ffffff',
        plot_bgcolor: '#ffffff',
        margin: { t: 40, r: 20, l: 40, b: 40 },
        xaxis: { showgrid: true, gridcolor: '#e5e5e5', zerolinecolor: '#000000' },
        yaxis: { showgrid: true, gridcolor: '#e5e5e5', zerolinecolor: '#000000' },
        ...layout
    };

    const defaultConfig: Partial<Config> = {
        displayModeBar: false,
        responsive: true,
        ...config
    };

    if (!PlotComponent) {
        return (
        <div 
            className="border-4 border-black my-8 flex items-center justify-center uppercase font-bold tracking-widest text-sm" 
            style={{ height: '400px', boxShadow: '8px 8px 0px 0px #000000', backgroundColor: '#ffffff' }}
        >
            Memuat Visualisasi Data...
        </div>
        );
    }

    return (
        <div className="border-4 border-black my-8" style={{ boxShadow: '8px 8px 0px 0px #000000' }}>
        <PlotComponent
            data={data}
            layout={defaultLayout}
            config={defaultConfig}
            style={{ width: '100%', height: '400px' }}
            useResizeHandler={true}
        />
        </div>
    );
}