import React, { useCallback, useMemo, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const ItemCard = React.memo(function ItemCard({ name }: { name: string }) {
  console.log(`Rendering: ${name}`);
  return <Text style={styles.list}>{name}</Text>;
});

const items = ["Apple", "Banana", "Cherry", "Grape", "Watermelon"];

export default function PerformanceDemo() {
  const [filter, setFilter] = useState("");
  const [count, setCount] = useState(0);

  const filteredItems = useMemo(() => {
    console.log("Recalculating filter...");
    return items.filter((item) =>
      item.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter]);

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <View>
      <TextInput
        placeholder="Filter items..."
        value={filter}
        onChangeText={setFilter}
        style={styles.textInput}
      />
      {filteredItems.map((item) => (
        <ItemCard key={item} name={item} />
      ))}
      <TouchableOpacity onPress={handleIncrement} style={styles.counter}>
        <Text>Count: {count}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "1px solid #ccc",
    borderRadius: 10,
    padding: 10,
  },
  list: {
    marginTop: 15,
    gap: 10,
    fontSize: 14,
  },
  counter: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "1px solid #ccc",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
});
