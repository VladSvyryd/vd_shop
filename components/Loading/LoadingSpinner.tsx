import React, { FC } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const LoadingSpinner: FC<{ isLoading: boolean; local?: boolean }> = ({
  isLoading,
  local = false
}) => {
  return isLoading ? (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${!!local ? '100%' : '100vw'}`,
        height: `${!!local ? '100%' : '100vh'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
        zIndex: 2000
      }}
    >
      <CircularProgress />
    </div>
  ) : null
}

export default LoadingSpinner
