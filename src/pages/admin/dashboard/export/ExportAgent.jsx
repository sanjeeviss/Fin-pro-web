import { ExportOutlined } from "@ant-design/icons";
import { Button } from "antd";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";
import { useState } from "react";
import dayjs from "dayjs";

const ExportAgent = ({ exportLabel, fileName, agentData, dateRange }) => {
  const [loading, setLoading] = useState(false);

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const transformData = (data) => {
    return data.map((item) => ({
      "Agent Name": item.agent_name,
      "Loan Count": item.loan_count,
      "Total Collection Amount": item.total_collection_amount,
      "Route Detail":
        item.route && item.route.collection_route
          ? `${item.route.collection_route.starting_point} to ${item.route.collection_route.ending_point}`
          : "No Route",
    }));
  };

  const handleExport = async () => {
    setLoading(true);
    const transformedData = transformData(agentData); // Transform agentData for export
    const dataChunks = chunkArray(transformedData, 300); // Adjust chunk size if needed

    // Format the date range properly for the file name
    const startDate = dayjs(dateRange[0]).format("DD_MM_YY");
    const endDate = dayjs(dateRange[1]).format("DD_MM_YY");

    for (const [index, chunk] of dataChunks.entries()) {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(chunk);
      XLSX.utils.book_append_sheet(wb, ws, `Sheet${index + 1}`);

      const filePath = `${fileName}_${startDate}_to_${endDate}_Part${index + 1}.xlsx`;
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

ExportAgent.propTypes = {
  fileName: PropTypes.string.isRequired,
  exportLabel: PropTypes.string.isRequired,
  agentData: PropTypes.array.isRequired,
  dateRange: PropTypes.array.isRequired,
};

export default ExportAgent;
