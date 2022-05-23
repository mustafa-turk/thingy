import FeatherIcons from '@expo/vector-icons/Feather'

export default function Icon({name, size = 25, color = '#fff'}) {
  return <FeatherIcons name={name} size={size} color={color} />
}
