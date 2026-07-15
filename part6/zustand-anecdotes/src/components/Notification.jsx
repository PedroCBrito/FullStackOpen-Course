import { useNotification } from "./store"

const Notification = () => {
  const notificationText = useNotification()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  if (notificationText) {
    return <div style={style}>{notificationText}</div>
  }
  return null
}

export default Notification