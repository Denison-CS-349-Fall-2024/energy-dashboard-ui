// import "./css/App.css"
import React from "react"
import { Routes, Route } from "react-router-dom"
import BuildingPage from "./components/BuildingPage"
import HomePage from "./HomePage"
import { useState } from "react"
import { getDateTodayInString } from "./helpers"
import * as Components from "./AuthPage"

function App() {
  const [sites, setSites] = useState([])
  const [selectedSite, setSelectedSite] = useState({})
  const [loadingSites, setLoadingSites] = useState(false)

  //Chart
  const [chartDate, setChartDate] = useState(getDateTodayInString())
  const [chartType, setChartType] = useState("Y")
  const [chartData, setChartData] = useState({})

  //insight
  const [quickInsights, setQuickInsights] = useState({})
  const [selectedQuickInsightsType, setSelectedQuickInsightsType] =
    useState(null)
  const [loadingChartData, setLoadingChartData] = useState(false)
  const [loadingQuickInsights, setLoadingQuickInsights] = useState(false)

  //error handling
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [message, setMessage] = useState("I love snacks")

  const homePageProp = {
    sites,
    selectedSite,
    setSelectedSite,
    loadingSites,
    loadingQuickInsights,
    chartType,
    setChartType,
    chartDate,
    setChartDate,
    chartData,
    loadingChartData,
    setLoadingChartData,
    setChartData,
    setMessage,
    setOpenSnackbar,
    setLoadingSites,
    setQuickInsights,
    setSelectedQuickInsightsType,
    setSites,
    setLoadingQuickInsights,
    selectedQuickInsightsType,
    quickInsights,
    openSnackbar,
    message,
  }

  const buildingPageProp = {
    sites,
    selectedSite,
    setSelectedSite,
    loadingSites,
    loadingQuickInsights,
    chartType,
    setChartType,
    chartDate,
    setChartDate,
    chartData,
    loadingChartData,
    setLoadingChartData,
    setChartData,
    // setMessage,
    // setOpenSnackbar,
    setLoadingSites,
    setQuickInsights,
    setSelectedQuickInsightsType,
    setSites,
    setLoadingQuickInsights,
    selectedQuickInsightsType,
    quickInsights,
    // openSnackbar,
    // message,
  }

  const [signIn, toggle] = useState(true);

  return (
    // <div className="App">
    //   <Routes>
    //     <Route path="/" element={<HomePage {...homePageProp} />} />
    //     <Route
    //       path="/building-overview/"
    //       element={<BuildingPage {...buildingPageProp} />}
    //     />
    //   </Routes>
    // </div>
    <Components.Container>
      <Components.SignUpContainer signinIn = {signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type="email" placeholder="Email"/>
          <Components.Input type="password" placeholder="Password"/>
          <Components.Button>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
      <Components.Form>
          <Components.Title>Sign In</Components.Title>
          <Components.Input type="email" placeholder="Email"/>
          <Components.Input type="password" placeholder="Password"/>
          <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
          <Components.Button>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
              <Components.LeftOverlayPanel signinIn={signIn}>
                  <Components.Title>Welcome Back!</Components.Title>
                  <Components.Paragraph>
                    Sign in to view the latest energy insights and stay informed.
                  </Components.Paragraph>
                  <Components.GhostButton onClick={() => toggle(true)}>
                      Sign In
                  </Components.GhostButton>
              </Components.LeftOverlayPanel>
              
              <Components.RightOverlayPanel signinIn={signIn}>
                  <Components.Title>Hello, Friend!</Components.Title>
                  <Components.Paragraph>
                        Sign up to explore energy insights tailored just for you.
                  </Components.Paragraph>
                  <Components.GhostButton onClick={() => toggle(false)}>
                        Sign Up
                  </Components.GhostButton> 
              </Components.RightOverlayPanel>
          </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>

  )

}

export default App
