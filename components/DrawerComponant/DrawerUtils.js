import React from 'react';
import { TouchableOpacity, Text, FlatList, View } from 'react-native';
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Flex, Checkbox } from "@ant-design/react-native";
import Colors from "../../constants/Colors";

export const chevronRender = (state) => {
  let name = state ? "chevron-thin-down" : "chevron-thin-right";
  return <Entypo name={name} size={16} color="black" style={{ paddingRight: 1.5 }} />;
};

export const renderFilterDataContent = (item, open, onChange) => {
    return (
      <Flex direction="column" align="start" style={[{ gap: 15, marginTop: 10}, !open ? {display: "none"} : {}]}>
        {item.contents.map((content, index) => (
          <Flex key={index} style={{ width: "100%" }}>
            <Checkbox
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "space-between",
                width: "100%",
              }}
              onChange={() => {onChange(content)}}
            >
              <Text style={{ color: Colors.gray2 }}>{content}</Text>
            </Checkbox>
          </Flex>
        ))}
      </Flex>
    );
};

export const renderFilterData = ({ item, openStatus, openHandler, onChange }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: '#C8C8C8',
      }}
    >
      <Flex direction="column" align="start">
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            width: '100%',
          }}
          onPress={() => {
            openHandler(item.index);
          }}
        >
          <Text style={{ fontSize: 16 }}>{item.name}</Text>
          {chevronRender(openStatus[item.index])}
        </TouchableOpacity>
      </Flex>
      {renderFilterDataContent(item, openStatus[item.index], onChange)}
    </View>
  );
}
