import React from 'react'
import ContentLoader from 'react-content-loader'

const ContentLoaderReffer = (props: any) => (
  <ContentLoader
    width={350}
    height={250}
    viewBox="0 0 450 400"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
    {...props}
  >
    <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
  </ContentLoader>
)

ContentLoaderReffer.metadata = {
  name: 'Nic Bovee', // My name
  github: 'ghettifish', // Github username
  description: 'A simple favorite from the DoorDash local favorites.', // Little tagline
  filename: 'DoorDashFavorite', // filename of your loader
}

export default ContentLoaderReffer