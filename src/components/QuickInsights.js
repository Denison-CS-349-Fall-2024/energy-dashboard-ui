import "./QuickInsights.css";
import QuickInsightsSelect from "./QuickInsightsSelect";

export const QuickInsights = () => {
    return (
        <div class="container">
        <div class="insights-header">
            <h2>Quick Insights</h2>
            <QuickInsightsSelect></QuickInsightsSelect>
        </div>

        <div class="insights-cards">
            <div class="insight-card card-red">
                <div class="icon-wrapper icon-red">
                    📊
                </div>
                <div class="insight-title">Installed on</div>
                <div class="insight-value">10/20/2020</div>
            </div>

            <div class="insight-card card-orange">
                <div class="icon-wrapper icon-orange">
                    💡
                </div>
                <div class="insight-title">Energy this month</div>
                <div class="insight-value">496 kWh</div>
            </div>

            <div class="insight-card card-green">
                <div class="icon-wrapper icon-green">
                    🌱
                </div>
                <div class="insight-title">Lifetime Energy</div>
                <div class="insight-value">172 mWh</div>
            </div>
        </div>
    </div>
    );
  };
  