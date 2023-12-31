import { Avatar, Card } from "react-native-paper";
import {
  checkIfSameDay,
  formatLocalDate,
  formatLocalTime,
} from "../utils/DateFormat";
import eventListStyles from "../styles/EventList";
import { eventCategories } from "../constants/EventCategories";

export default function EventCard(props) {
  const getCardIcon = () => {
    switch (props.data.category) {
      case eventCategories.MEETING:
        return "account-group";
      case eventCategories.REMINDER:
        return "clock-alert";
      case eventCategories.TODO:
        return "clipboard-list";
      case eventCategories.OTHER:
        return "dots-horizontal-circle";
      default:
        return "dots-horizontal-circle";
    }
  };

  return (
    <Card
      onPress={() => props.onCardClick(props.data)}
      style={eventListStyles.eventCard}
    >
      <Card.Title
        title={props.data.title}
        subtitle={
          formatLocalTime(props.data.startDate) +
          " - " +
          (checkIfSameDay(props.data.startDate, props.data.endDate)
            ? formatLocalTime(props.data.endDate)
            : formatLocalDate(props.data.endDate))
        }
        left={(props) => <Avatar.Icon {...props} icon={getCardIcon()} />}
      ></Card.Title>
    </Card>
  );
}
