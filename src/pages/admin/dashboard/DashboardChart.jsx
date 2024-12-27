import { Card, Row, Col } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut, Bar, Pie } from "react-chartjs-2";
import ExportLoan from "./export/ExportLoan";
import ExportAgent from "./export/ExportAgent";
import ExportRoute from "./export/ExportRoute";
import PropTypes from "prop-types";
import { NoData } from "../../../components/NoData";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Utility function to generate chart data
const generateChartData = (labels, data, colors) => ({
  datasets: [
    {
      labels,
      data,
      backgroundColor: colors,
      barThickness: 15,
    },
  ],
});

const generateChartDataBar = (labels, data, colors, label) => ({
  labels,
  datasets: [
    {
      label,
      data,
      backgroundColor: colors,
      barThickness: 15,
    },
  ],
});

// Color schemes for the charts
const colorSchemes = {
  customers: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
  agents: [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FFBB28",
  ],
  routes: ["#FF6384", "#36A2EB", "#FFCE56", "#FFBB28", "#4BC0C0"],
};

// DashboardChart Component
const DashboardChart = ({ reportData, dateRange }) => {
  const customers = reportData.customers || [];
  const collectionAgents = reportData.collection_agent || [];
  const collectionRoutes = reportData.collection_route || [];

  // Check if all loan_counts are zero
  const allCustomersZero = customers.every((c) => c.loan_count === 0);
  const allAgentsZero = collectionAgents.every((a) => a.loan_count === 0);
  const allRoutesZero = collectionRoutes.every((r) => r.loan_count === 0);

  // Generate chart data only if there is data
  const customerChartData = !allCustomersZero
    ? generateChartData(
        customers.map((c) => c.customer_name),
        customers.map((c) => c.loan_count),
        colorSchemes.customers
      )
    : {};

  const agentChartData = !allAgentsZero
    ? generateChartDataBar(
        collectionAgents.map((a) => a.agent_name),
        collectionAgents.map((a) => a.loan_count),
        colorSchemes.agents,
        "Loan Count"
      )
    : {};

  const routeChartData = !allRoutesZero
    ? generateChartData(
        collectionRoutes.map((r) => r.route_name),
        collectionRoutes.map((r) => r.loan_count),
        colorSchemes.routes
      )
    : {};

  // Chart options for Doughnut and Pie charts
  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 10,
          },
        },
      },
      tooltip: {
        enabled: true, // Enable tooltips
        callbacks: {
          label: (tooltipItem) => {
            const index = tooltipItem.dataIndex; // Get the data index
            const labels = tooltipItem.dataset.labels; // Access the labels array from the dataset
            const label = labels[index] || ""; // Get the corresponding label
            const value = tooltipItem.raw || 0; // Get the raw value
            return `${label}: ${value}`; // Return the label and value
          },
        },
      },
    },
  };
  return (
    <div className="charts-container">
      <Row gutter={16}>
        <Col span={12}>
          <Card hoverable className="chart_section">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ textAlign: "center" }}>
                Customer Loan Distribution
              </h3>
              {!allCustomersZero && (
                <ExportLoan
                  loanData={customers}
                  fileName={"Collection_loan"}
                  exportLabel={"Export"}
                  dateRange={dateRange}
                />
              )}
            </div>
            {allCustomersZero ? (
              <NoData />
            ) : (
              <>
                <div className="graph_card">
                  <div className="graph_cardContainer">
                    <Doughnut data={customerChartData} options={chartOptions} />
                  </div>
                </div>
              </>
            )}
          </Card>
        </Col>

        <Col span={12}>
          <Card hoverable className="chart_section">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ textAlign: "center" }}>
                Collection Route Distribution
              </h3>
              {!allRoutesZero && (
                <ExportRoute
                  routeData={collectionRoutes}
                  fileName={"Collection_route"}
                  exportLabel={"Export"}
                  dateRange={dateRange}
                />
              )}
            </div>

            {allRoutesZero ? (
              <NoData />
            ) : (
              <>
                <div className="graph_card">
                  <div className="graph_cardContainer">
                    <Pie data={routeChartData} options={chartOptions} />
                  </div>
                </div>
              </>
            )}
          </Card>
        </Col>

        <Col span={12}>
          <Card hoverable className="chart_section">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ textAlign: "center" }}>
                Collection Agent Loan Count
              </h3>

              {!allAgentsZero && (
                <ExportAgent
                  agentData={collectionAgents}
                  fileName={"Collection_agent"}
                  exportLabel={"Export"}
                  dateRange={dateRange}
                />
              )}
            </div>
            {allAgentsZero ? (
              <NoData />
            ) : (
              <>
                <div className="graph_card">
                  <Bar
                    data={agentChartData}
                    options={{
                      responsive: true,
                      scales: {
                        x: {
                          ticks: {
                            autoSkip: false,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

DashboardChart.propTypes = {
  dateRange: PropTypes.array,
  reportData: PropTypes.object,
};

export default DashboardChart;
