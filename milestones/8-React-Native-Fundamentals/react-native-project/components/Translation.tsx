import React from "react";
import { useTranslation } from "react-i18next";
import {
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getSupportedLanguages } from "../services/i18next";

const LANGUAGE_NAMES = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    color: "#666",
  },
  currentLang: {
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  modalCard: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    opacity: 0.95,
    padding: 20,
  },
  buttonLanguages: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8,
    marginLeft: 0,
    alignItems: "flex-start",
    borderRadius: 10,
  },
  buttonTextLanguages: {
    color: "black",
    fontSize: 14,
    fontWeight: "500",
  },
  activeButton: {
    borderLeftWidth: 3,
    borderLeftColor: "#56e60e",
  },
});

export default function Translation() {
  const { t, i18n } = useTranslation();
  const languages = getSupportedLanguages();

  const [modalVisible, setModalVisible] = React.useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t("welcome")}</Text>

      <View>
        <Text style={styles.sectionTitle}>Current Language</Text>
        <Text style={styles.currentLang}>
          {LANGUAGE_NAMES[i18n.language as keyof typeof LANGUAGE_NAMES] ||
            i18n.language}
        </Text>
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalCard}>
          <FlatList
            data={languages}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => changeLanguage(item)}
                style={[
                  styles.buttonLanguages,
                  item === i18n.language
                    ? styles.activeButton
                    : styles.buttonLanguages,
                ]}
              >
                <Text style={styles.buttonTextLanguages}>
                  {LANGUAGE_NAMES[item as keyof typeof LANGUAGE_NAMES]}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>{t("change-language")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
