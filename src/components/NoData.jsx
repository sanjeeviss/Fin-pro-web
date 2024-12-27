import nodataImage from "../assets/nodata_image.jpg";
export const NoData = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img src={nodataImage} className="nodata" />
    </div>
  );
};
