import "./QuickInsights.css";
import QuickInsightsSelect from "./QuickInsightsSelect";
import React from "react";

export const QuickInsights = (props) => {
  const { quickInsights } = props;

  return (
    <div className="container">
      <div className="insights-header">
        <h2>Quick Insights</h2>
        <QuickInsightsSelect {...props}></QuickInsightsSelect>
      </div>

      <div className="insights-cards">
        <div className="insight-card card-red">
          <div className="icon-wrapper icon-red">
            <svg
              width="35"
              height="35"
              viewBox="0 0 16 16"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill="#FFE2E5"
                  d="M10.3 8.2l-0.9 0.9 0.9 0.9-1.2 1.2 4.3 4.3c0.6 0.6 1.5 0.6 2.1 0s0.6-1.5 0-2.1l-5.2-5.2zM14.2 15c-0.4 0-0.8-0.3-0.8-0.8 0-0.4 0.3-0.8 0.8-0.8s0.8 0.3 0.8 0.8c0 0.5-0.3 0.8-0.8 0.8z"
                ></path>{" "}
                <path
                  fill="#FFE2E5"
                  d="M3.6 8l0.9-0.6 1.5-1.7 0.9 0.9 0.9-0.9-0.1-0.1c0.2-0.5 0.3-1 0.3-1.6 0-2.2-1.8-4-4-4-0.6 0-1.1 0.1-1.6 0.3l2.9 2.9-2.1 2.1-2.9-2.9c-0.2 0.5-0.3 1-0.3 1.6 0 2.1 1.6 3.7 3.6 4z"
                ></path>{" "}
                <path
                  fill="#FFE2E5"
                  d="M8 10.8l0.9-0.8-0.9-0.9 5.7-5.7 1.2-0.4 1.1-2.2-0.7-0.7-2.3 1-0.5 1.2-5.6 5.7-0.9-0.9-0.8 0.9c0 0 0.8 0.6-0.1 1.5-0.5 0.5-1.3-0.1-2.8 1.4-0.5 0.5-2.1 2.1-2.1 2.1s-0.6 1 0.6 2.2 2.2 0.6 2.2 0.6 1.6-1.6 2.1-2.1c1.4-1.4 0.9-2.3 1.3-2.7 0.9-0.9 1.6-0.2 1.6-0.2zM4.9 10.4l0.7 0.7-3.8 3.8-0.7-0.7z"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="insight-title">Installed on</div>
          <div className="insight-value">{quickInsights?.installedOn}</div>
        </div>

        <div className="insight-card card-orange">
          <div className="icon-wrapper icon-orange">
            <svg
              width="35"
              height="35"
              fill="#FFF4DF"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#FFF4DF"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M19,8H14.724l3.144-5.5A1,1,0,0,0,17,1H10a1,1,0,0,0-.895.553l-5,10A1,1,0,0,0,5,13H9.656L7.042,21.713a1,1,0,0,0,1.722.933l11-13A1,1,0,0,0,19,8Zm-8.663,9.689,1.621-5.4A1,1,0,0,0,11,11H6.618l4-8h4.658L12.132,8.5A1,1,0,0,0,13,10h3.844Z"></path>
              </g>
            </svg>
          </div>
          <div className="insight-title">Energy last month</div>
          <div className="insight-value">{`${quickInsights?.recentMonthEnergy} ${quickInsights?.energyUnit}`}</div>
        </div>

        <div className="insight-card card-green">
          <div className="icon-wrapper icon-green">
            <svg
              height="800px"
              width="800px"
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              fill="#DCFCE7"
              stroke="#DCFCE7"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <style type="text/css"> </style>{" "}
                <g>
                  {" "}
                  <path
                    className="st0"
                    d="M424.97,168.97c0.008-46.627-18.929-88.94-49.494-119.482C344.94,18.93,302.62-0.008,256,0 c-46.619-0.008-88.94,18.93-119.474,49.495C105.96,80.03,87.023,122.343,87.03,168.97c-0.007,31.187,8.51,60.472,23.298,85.538 c0.008,0.008,0.016,0.015,0.016,0.015c0.047,0.094,0.094,0.189,0.142,0.267l0.015-0.007c10.372,18.449,25.294,36.702,37.41,54.122 c6.082,8.714,11.433,17.169,15.134,24.9c3.732,7.74,5.704,14.654,5.791,20.21v93.623c0.008,28.892,23.408,52.292,52.3,52.3h10.552 C237.338,507.223,246.076,512,256,512c9.924,0,18.662-4.777,24.312-12.061h10.552c28.893-0.008,52.293-23.408,52.3-52.3V341.695 h-12.069H191.332c-1.438-6.27-3.677-12.376-6.521-18.332c-6.954-14.427-17.02-28.382-26.983-42.006 c-9.972-13.57-19.856-26.794-26.41-38.597l-0.11-0.196l-0.055-0.079c-12.76-21.545-20.076-46.618-20.084-73.515 c0.008-40.034,16.194-76.164,42.423-102.408C179.836,40.325,215.966,24.147,256,24.138c40.034,0.008,76.164,16.187,102.408,42.424 c26.228,26.244,42.415,62.373,42.422,102.408c-0.007,26.897-7.323,51.97-20.091,73.515l-0.087,0.15l-0.086,0.157 c-9.885,17.828-22.984,30.417-37.332,38.683c-14.34,8.25-29.992,12.124-44.709,12.124c-17.169,0.016-32.884-5.288-43.838-14.34 c-5.5-4.526-9.86-9.963-12.909-16.32c-3.042-6.365-4.801-13.704-4.809-22.307c0-0.88,0.181-1.886,0.22-2.798 c18.521-16.579,69.454-15.354,79.833-70.2c6.593-34.896-11.676-63.639-14.748-84.485c-93.875-8.046-136.785,76.438-91.816,143.424 c1.179,1.752,2.145,3.135,2.962,4.384c-0.345,3.276-0.589,6.514-0.589,9.673c-0.008,11.967,2.53,23.046,7.174,32.726 c6.961,14.56,18.528,25.797,32.271,33.198c13.759,7.426,29.718,11.174,46.25,11.182c18.913-0.008,38.651-4.943,56.747-15.346 c18.002-10.34,34.298-26.166,46.234-47.601c0.008-0.015,0.016-0.032,0.031-0.047c0.048-0.094,0.102-0.173,0.15-0.26l-0.008-0.007 C416.468,229.418,424.978,200.148,424.97,168.97z M192.974,365.834h126.051v37.575l-126.051-26.802V365.834z M192.974,393.06 l126.051,26.803v27.776c0,1.721-0.212,3.387-0.503,5.014L192.974,425.96V393.06z M192.974,442.422l117.864,25.058 c-0.024,0.024-0.04,0.047-0.064,0.071c-5.13,5.116-12.093,8.242-19.911,8.25h-69.728c-7.818-0.008-14.78-3.135-19.911-8.25 c-5.115-5.131-8.242-12.093-8.25-19.911V442.422z M228.514,199.771c0-6.49,0-17.318,11.912-48.732 c11.912-31.407,42.234-51.978,44.402-47.649c-37.896,45.488-45.778,97.568-46.571,100.719 C237.174,208.446,228.514,206.277,228.514,199.771z"
                  />{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
          <div className="insight-title">Lifetime Energy</div>
          <div className="insight-value">{`${quickInsights?.lifetimeEnergy} ${quickInsights?.energyUnit}`}</div>
        </div>
      </div>
    </div>
  );
};
