import './MetaData.css';

export const MetaData = (props) => {
    const {selectedSite} = props
    return (
      <div className="metadata-container" >
        <h2>{selectedSite.siteName}</h2>
        <div className='image-container'>
          <img src={selectedSite.imageUrl}></img>
        </div>
      </div>
    );
  };
  