import React, { useState } from 'react';
  import { StyleSheet } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import { MaterialIcons } from '@expo/vector-icons';

  const data = [
    { label: '1 Tahun', value: '1' },
    { label: '1,5 Tahun', value: '2' },
    { label: '2 Tahun', value: '3' },
    { label: '2,5 Tahun', value: '4' },
    { label: '3 Tahun', value: '5' },
    { label: '3,5 Tahun', value: '6' },
    { label: '4 Tahun', value: '7' },
    { label: '4,5 Tahun', value: '8' },
  ];

  const DropdownComponentExperience = ({onSelect}) => {
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
        placeholder="Long Experience"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
          onSelect(item);
        }}
        renderLeftIcon={() => (
          <MaterialIcons style={styles.icon} name="work-history"  size={18} color="#6069e9" />
        )}
      />
    );
  };

  export default DropdownComponentExperience;

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