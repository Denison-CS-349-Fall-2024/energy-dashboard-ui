import "./MetaData.css"

export const MetaData = (props) => {
  const { selectedSite } = props
  return (
    <div className="metadata-container">
      <h2>{selectedSite.internal_name}</h2>
      <div className="image-container">
        <img src={selectedSite.site_image_url}></img>
      </div>
    </div>
  )
}
