import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "./Colors";

export const ReadMoreText = ({ contents, MAX_LINES }) => {
  const [showText, setShowText] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState(undefined);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const onTextLayout = useCallback(
    (e) => {
      if (e.nativeEvent.lines.length > MAX_LINES && !showText) {
        setShowMoreButton(true);
        setNumberOfLines(MAX_LINES);
      }
    },
    [showText]
  );

  useEffect(() => {
    if (showMoreButton) {
      setNumberOfLines(showText ? undefined : MAX_LINES);
    }
  }, [showText, showMoreButton]);

  return (
    <View>
      <Text onTextLayout={onTextLayout} numberOfLines={numberOfLines}>
        {contents}
      </Text>
      {showMoreButton && (
        <TouchableOpacity onPress={() => setShowText((showText) => !showText)} accessibilityRole="button">
          <Text style={!showText ? {color: Colors.gray2}: {color: Colors.gray2}}>{!showText ? "Read More" : "Read Less"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
