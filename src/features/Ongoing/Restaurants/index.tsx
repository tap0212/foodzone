import React from 'react'
import SuperScreen from '../../../components/SuperScreen'
import { StyleSheet } from 'react-native'

export default function Restaurants() {
  return (
    <SuperScreen
      noBottomButton={true}
      mainContainerStyle={styles.mainContainerStyle}>
				<></>
    </SuperScreen>
  )
}

const styles = StyleSheet.create({
	mainContainerStyle: {
			padding: 0,
	},
})