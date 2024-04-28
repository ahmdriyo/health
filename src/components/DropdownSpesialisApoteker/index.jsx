import React, { useState } from 'react';
  import { StyleSheet } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import { FontAwesome6 } from '@expo/vector-icons';

  const data = [
    { label: 'Apoteker', value: '1' },
  ];

  const DropdownComponentSpesialisApoteker = ({ onSelect }) => {
    const [value, setValue] = useState(null);
    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Spesialis"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
          onSelect(item);
        }}
        renderLeftIcon={() => (
          <FontAwesome6 style={styles.icon} name="user-doctor" size={18} color="#6069e9" />
        )}
      />
    );
  };

  export default DropdownComponentSpesialisApoteker;

  const styles = StyleSheet.create({
    dropdown: {
      width:'75%',
      marginTop:5,
      height: 45,
      borderWidth:2,
      borderRadius:10,
      opacity:0.7,
      borderColor:'#C5B6F9',
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 8,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });