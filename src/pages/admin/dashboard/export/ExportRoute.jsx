import { ExportOutlined } from "@ant-design/icons";
import { Button } from "antd";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";
import { useState } from "react";
import dayjs from "dayjs";

const ExportRoute = ({ exportLabel, fileName, routeData, dateRange }) => {
  const [loading, setLoading] = useState(false);

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const transformData = (data) => {
    const transformed = [];

    data.forEach((route) => {
      const { route_name, loan_count, total_collection_amount, loans } = route;

      // For each route, map the loans into individual rows
      loans.forEach((loan) => {
        transformed.push({
          "Route Name": route_name,
          "Loan Count": loan_count,
          "Total Collection Amount": total_collection_amount,
          "Loan Amount": loan.loan_amount,
          "Due Amount": loan.due_amount,
          "Balance Amount": loan.balance_amount,
          "Collection Amount": loan.collection_amount,
          "Collected Date": loan.collected_date,
        });
      });

      // If there are no loans, add a row with just route information
      if (loans.length === 0) {
        transformed.push({
          "Route Name": route_name,
          "Loan Count": loan_count,
          "Total Collection Amount": total_collection_amount,
          "Loan Amount": "",
          "Due Amount": "",
          "Balance Amount": "",
          "Collection Amount": "",
          "Collected Date": "",
        });
      }
    });

    return transformed;
  };

  const handleExport = async () => {
    setLoading(true);
    const transformedData = transformData(routeData);
    const dataChunks = chunkArray(transformedData, 300);

    // Format the date range properly for the file name
    const startDate = dayjs(dateRange[0]).format("DD_MM_YY");
    const endDate = dayjs(dateRange[1]).format("DD_MM_YY");

    for (const [index, chunk] of dataChunks.entries()) {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(chunk);
      XLSX.utils.book_append_sheet(wb, ws, `Sheet${index + 1}`);

      const filePath = `${fileName}_${startDate}_to_${endDate}_Part${
        index + 1
      }.xlsx`;
      XLSX.writeFile(wb, filePath);
    }

    setLoading(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <Button
        type="primary"
        icon={<ExportOutlined />}
        onClick={handleExport}
        loading={loading}
      >
        {exportLabel}
      </Button>
    </div>
  );
};

ExportRoute.propTypes = {
  fileName: PropTypes.string,
  exportLabel: PropTypes.string,
  routeData: PropTypes.array,
  dateRange: PropTypes.array,
};

export default ExportRoute;
