import "./MetaData.css"

export const MetaData = (props) => {
  const { selectedSiteBuilding } = props
  return (
    <div className="metadata-container">
      <h2>{selectedSiteBuilding.internal_name}</h2>
      <div className="image-container">
        <img src={selectedSiteBuilding.site_image_url}></img>
      </div>
    </div>
  )
}
