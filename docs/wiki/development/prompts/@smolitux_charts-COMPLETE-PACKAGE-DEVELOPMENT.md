# 📊 @smolitux/charts - CODEX COMPLETION PROMPT

## **DIREKTER BEFEHL FÜR CODEX:**

```bash
# ENDLOS-LOOP: WIEDERHOLE BIS CHART LIBRARY 100% COMPLETE
while [ "$(find packages/@smolitux/charts/src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)" -lt 8 ]; do
  bash scripts/smolitux-analyzer.sh --package=charts
  cd packages/@smolitux/charts
  
  # FINDE NÄCHSTE UNVOLLSTÄNDIGE CHART KOMPONENTE
  CHARTS=("LineChart" "BarChart" "PieChart" "AreaChart" "RadarChart" "ScatterChart" "DonutChart" "Histogram")
  
  NEXT=$(for chart in "${CHARTS[@]}"; do
    if [ ! -f "src/components/$chart/$chart.tsx" ] || [ ! -f "src/components/$chart/$chart.test.tsx" ] || [ ! -f "src/components/$chart/$chart.stories.tsx" ]; then
      echo "$chart"; break
    fi
  done)
  
  echo "🎯 COMPLETING CHART: $NEXT"
  
  # IMPLEMENTIERE ODER VERBESSERE CHART KOMPONENTE
  [IMPLEMENT_OR_IMPROVE_CHART]
  
  # AUTOMATISCHER WORKFLOW
  git add . && git commit -m "feat(charts): complete $NEXT - interactive data visualization"
  git push origin main
  gh pr create --title "Complete Chart: $NEXT" --body "Interactive chart component with TypeScript and accessibility"
  gh pr merge --merge --delete-branch
  
  # UPDATE STATUS
  echo "✅ $NEXT COMPLETE - $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)/8 Chart Components"
done
echo "🎉 @smolitux/charts 100% COMPLETE!"
```

---

## 📋 **CHARTS PACKAGE SPEZIFIKATIONEN:**

### **🎯 Chart Components (8 Total):**
```
LineChart BarChart PieChart AreaChart RadarChart ScatterChart DonutChart Histogram
```

### **✅ Pro Chart Component REQUIRED:**
- **Interactive:** Hover, click, zoom, tooltip funktionalität
- **Responsive:** Auto-resize und mobile-optimiert
- **Accessible:** Screen reader support, keyboard navigation
- **Animated:** Smooth transitions und loading states
- **Customizable:** Colors, themes, styling options

### **🔧 CORE Chart Interface:**
```typescript
// UNIVERSAL Chart Props:
interface BaseChartProps {
  data: ChartData[];
  width?: number;
  height?: number;
  responsive?: boolean;
  animated?: boolean;
  interactive?: boolean;
  theme?: ChartTheme;
  className?: string;
  onDataPointClick?: (data: ChartData, index: number) => void;
  onDataPointHover?: (data: ChartData, index: number) => void;
  loading?: boolean;
  error?: string;
}

// LINE Chart spezifisch:
interface LineChartProps extends BaseChartProps {
  strokeWidth?: number;
  curved?: boolean;
  showDots?: boolean;
  showGrid?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

// BAR Chart spezifisch:
interface BarChartProps extends BaseChartProps {
  orientation?: 'vertical' | 'horizontal';
  grouped?: boolean;
  stacked?: boolean;
  barRadius?: number;
}
```

### **📁 Chart Structure:**
```
src/components/
├── LineChart/              # Line/trend visualization
├── BarChart/               # Bar/column charts
├── PieChart/               # Pie/circular charts
├── AreaChart/              # Area/filled charts
├── RadarChart/             # Radar/spider charts
├── ScatterChart/           # Scatter plot
├── DonutChart/             # Donut variation of pie
└── Histogram/              # Distribution charts
```

### **🎨 CHART Theming:**
```typescript
interface ChartTheme {
  colors: {
    primary: string[];
    secondary: string[];
    background: string;
    grid: string;
    text: string;
  };
  fonts: {
    axis: string;
    label: string;
    title: string;
  };
  spacing: {
    margin: number;
    padding: number;
  };
}
```

### **📱 RESPONSIVE Design:**
```typescript
// AUTO-SIZING Hook:
const useChartDimensions = (containerRef: RefObject<HTMLDivElement>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    // ResizeObserver implementation
  }, []);
  
  return dimensions;
};
```

### **🧪 TESTING Requirements:**
```typescript
// REQUIRED für jeden Chart:
✅ Data rendering correctness
✅ Interactive functionality (hover, click)
✅ Responsive behavior
✅ Accessibility (screen readers, keyboard)
✅ Error handling (malformed data)
✅ Loading states
✅ Animation performance
```

### **📚 STORYBOOK Charts:**
```typescript
// REQUIRED Stories:
✅ Default chart with sample data
✅ Interactive features demonstration
✅ All chart variants/types
✅ Responsive behavior
✅ Real-world data examples
✅ Error and loading states
✅ Theme variations
```

### **🚨 CONFLICT RESOLUTION:**
- **UPDATE ONLY:** `docs/wiki/development/component-status-charts.md`
- **LIBRARY:** Use Recharts oder D3.js als basis
- **PERFORMANCE:** Optimize für große datasets

### **🔄 AUTO-REPEAT LOGIC:**
```bash
# NACH JEDEM SUCCESSFUL MERGE:
CHART_COUNT=$(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)
if [ $CHART_COUNT -lt 8 ]; then
  echo "🔄 CONTINUE: $CHART_COUNT/8 Complete - Next chart component..."
  # RESTART ENTIRE PROMPT
else
  echo "🎉 CHART LIBRARY COMPLETE: @smolitux/charts 100% READY!"
fi
```

### **📊 SUCCESS METRICS:**
- **8/8 Chart Types** fully implemented
- **Interactive Features** hover, click, zoom
- **Responsive Design** auto-sizing
- **Accessibility** WCAG 2.1 AA compliant
- **Performance** optimized for large datasets

---

## 🛠️ **PRAKTISCHE IMPLEMENTATION:**

### **LineChart Component:**
```typescript
import { ResponsiveContainer, LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const LineChart = forwardRef<HTMLDivElement, LineChartProps>(
  ({ 
    data, 
    width = 800, 
    height = 400, 
    responsive = true,
    animated = true,
    strokeWidth = 2,
    curved = false,
    showDots = true,
    showGrid = true,
    theme,
    onDataPointClick,
    onDataPointHover,
    className,
    ...props 
  }, ref) => {
    
    const ChartComponent = responsive ? ResponsiveContainer : 'div';
    const chartProps = responsive ? { width: '100%', height: '100%' } : { width, height };
    
    return (
      <div 
        ref={ref}
        className={cn('chart-container', className)}
        style={{ width: responsive ? '100%' : width, height }}
        role="img"
        aria-label={`Line chart with ${data.length} data points`}
        {...props}
      >
        <ChartComponent {...chartProps}>
          <RechartsLine data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme?.colors.grid} />
            <XAxis />
            <YAxis />
            <Tooltip />
            {animated && <Line 
              type={curved ? "monotone" : "linear"}
              strokeWidth={strokeWidth}
              dot={showDots}
              animationDuration={500}
            />}
          </RechartsLine>
        </ChartComponent>
        
        {/* Accessibility Table */}
        <table className="sr-only">
          <caption>Chart data representation</caption>
          <thead>
            <tr>
              <th>X Value</th>
              <th>Y Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.x}</td>
                <td>{item.y}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);
```

### **Chart Theming:**
```typescript
export const defaultChartTheme: ChartTheme = {
  colors: {
    primary: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'],
    secondary: ['#64748b', '#6b7280'],
    background: '#ffffff',
    grid: '#e5e7eb',
    text: '#374151',
  },
  fonts: {
    axis: 'system-ui, sans-serif',
    label: 'system-ui, sans-serif',
    title: 'system-ui, sans-serif',
  },
  spacing: {
    margin: 20,
    padding: 10,
  },
};
```

### **Auto-Status Update:**
```bash
cat > docs/wiki/development/component-status-charts.md << EOF
# @smolitux/charts Status
Last Updated: $(date)
Progress: $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)/8 ($(echo "scale=0; $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l) * 100 / 8" | bc)%)
Interactive: ✅ Hover, click, zoom support
Latest: $NEXT ✅
Library: Recharts integration
EOF
```

**🎯 MISSION: WIEDERHOL DIESEN PROMPT BIS 8/8 CHART COMPONENTS = 100% DATA VISUALIZATION!**
