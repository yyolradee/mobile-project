import { Text} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Flex, Checkbox } from "@ant-design/react-native";
import Colors from "../../constants/Colors";

export const chevronRender = (state) => {
  let name = state ? "chevron-thin-down" : "chevron-thin-right";
  return <Entypo name={name} size={16} color="black" style={{ paddingRight: 1.5 }} />;
};

export const renderFilterDataContent = (item, open) => {
  if (open) {
    return (
      <Flex direction="column" align="start" style={{ gap: 15, marginTop: 10 }}>
        {item.contents.map((content, index) => (
          <Flex key={index} style={{ width: "100%" }}>
            <Checkbox
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={{ color: Colors.gray2 }}>{content}</Text>
            </Checkbox>
          </Flex>
        ))}
      </Flex>
    );
  }
};
