import { useEffect, useState } from "react";
import { GetDashboard, GetReports } from "../../../services/Index";
import {
  PieChartOutlined,
  MoneyCollectOutlined,
  DollarCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  BarChartOutlined,
  LineChartOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import AdminPageHeader from "../../../components/adminPageHeader/AdminPageHeader";
import { Button, DatePicker, Spin } from "antd";
import dayjs from "dayjs";
import DashboardChart from "./DashboardChart";
import Common from "../../../hooks/common";

const Dashboard = () => {
  const today = dayjs();
  const [dashboardData, setDashboardData] = useState({});
  const [reportData, setReportData] = useState({});
  const [dateRange, setDateRange] = useState([
    today.startOf("year"),
    today.endOf("year"),
  ]);
  const [activePeriod, setActivePeriod] = useState("year");
  const [loading, setLoading] = useState(false);
  const { rupee } = Common();
  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const res = await GetDashboard();
      if (res.status === true) {
        setDashboardData(res.data);
      }
    };
    fetchDashboardData();
  }, []);

  const fetchReportData = async () => {
    setLoading(true);
    const res = await GetReports({
      start_date: dateRange[0].format("YYYY-MM-DD"),
      end_date: dateRange[1].format("YYYY-MM-DD"),
    });
    setLoading(false);
    if (res.status === true) {
      setReportData(res.data);
    }
  };

  const handleDateChange = (dates) => {
    if (dates) {
      setDateRange(dates);
    }
  };

  const setPeriod = (period) => {
    const today = dayjs();
    const startDate = today.startOf(period);
    const endDate = today.endOf(period);

    setDateRange([startDate, endDate]);
    setActivePeriod(period);
  };

  const handleButtonClick = (period) => {
    setPeriod(period);
  };

  const cardData = [
    {
      icon: <UserOutlined />,
      title: "User",
      value: dashboardData.user,
      bgColor: "#e6f7ff",
      iconBgColor: "#1890ff",
    },
    {
      icon: <MoneyCollectOutlined />,
      title: "Total Investment",
      value: dashboardData.total_investment,
      bgColor: "#f9f0f0",
      iconBgColor: "#ff4d4f",
    },
    {
      icon: <DollarCircleOutlined />,
      title: "Pending Amount",
      value: dashboardData.pending,
      bgColor: "#fffbe6",
      iconBgColor: "#faad14",
    },
    {
      icon: <CalendarOutlined />,
      title: "Today's Collection",
      value: dashboardData.toddy_collection,
      bgColor: "#e6ffed",
      iconBgColor: "#52c41a",
    },
    {
      icon: <BarChartOutlined />,
      title: "Tomorrow's Target",
      value: dashboardData.tommorow_target,
      bgColor: "#f0f5ff",
      iconBgColor: "#3B3486",
    },
    {
      icon: <WalletOutlined />,
      title: "Net Amount",
      value: dashboardData.net_amount,
      bgColor: "#f0e6ff",
      iconBgColor: "#8c4cff",
    },
    {
      icon: <LineChartOutlined />,
      title: "Total Expenses",
      value: dashboardData.total_expenses,
      bgColor: "#e6f5ff",
      iconBgColor: "#1da57a",
    },
    {
      icon: <DollarCircleOutlined />,
      title: "Profit",
      value: dashboardData.profit,
      bgColor: "#fff7e6",
      iconBgColor: "#fa8c16",
    },
  ];

  return (
    <>
      <AdminPageHeader icon={<PieChartOutlined />} title="Dashboard" />
      <div className="outlet_content_wrapper">
        <div className="button-group">
          <div>
            {["year", "month", "week", "today"].map((period) => (
              <Button
                key={period}
                type={activePeriod === period ? "primary" : "default"}
                style={{
                  borderRadius: 0,
                  padding: "20px 35px",
                }}
                onClick={() => handleButtonClick(period)}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
          <DatePicker.RangePicker
            onChange={handleDateChange}
            value={dateRange}
            format="YYYY-MM-DD"
          />
        </div>
        {loading ? (
          <div className="loader_spin">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="cards-container">
              {cardData.map((card, index) => (
                <div
                  className="card"
                  key={index}
                  style={{ backgroundColor: card.bgColor }}
                >
                  <div
                    className="card-icon"
                    style={{ backgroundColor: card.iconBgColor }}
                  >
                    {card.icon}
                  </div>
                  <div className="card_data">
                    <h3>{card.title}</h3>
                    <p>
                      {typeof card.value != "string" && rupee}
                      {card.value || 0}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <DashboardChart reportData={reportData} dateRange={dateRange} />
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
