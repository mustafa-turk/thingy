import DotsPagination from 'react-native-dots-pagination'

function Dots({length, index}) {
  return (
    <DotsPagination
      length={length}
      active={index}
      passiveColor="#222222"
      activeColor="#fff"
    />
  )
}

export default Dots
